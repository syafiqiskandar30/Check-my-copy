// src/code.ts — single Gemini handler, UI loaded from manifest
import guidelineReference from "./guideline.json";

const describeError = (err: any) =>
  err && err.message ? String(err.message) : String(err);
let toneCycleIndex = 0;
let toneCycleSignature = "";
let toneCycleCompleted = false;
const buildCycleSignature = (text: string, version: string) => `${text}|||${version}`;
const deriveGuideVersion = (guide: any): string => {
  if (!guide || typeof guide !== "object") return "";
  const meta = (guide as any).meta;
  if (!meta || typeof meta !== "object") return "";
  return formatGuideText((meta as any).version) || "";
};

const takeStrings = (value: unknown, limit = 4): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
    .filter(Boolean)
    .slice(0, limit);
};

const formatGuideText = (value: unknown, limit = 4): string => {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) {
    return takeStrings(value, limit).join(", ");
  }
  return "";
};

const mergeUniqueStrings = (...lists: string[][]): string[] => {
  const seen = new Set<string>();
  const merged: string[] = [];
  lists.forEach((list) => {
    list.forEach((value) => {
      const trimmed = value.trim();
      if (!trimmed) return;
      const key = trimmed.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      merged.push(trimmed);
    });
  });
  return merged;
};

const sanitisePromptText = (input: string): string =>
  String(input || "")
    .replace(/\s+/g, " ")
    .replace(/[\u0000-\u001F]/g, "")
    .trim();

const obliterateEmDash = (value: string): string => value.replace(/[–—]/g, "-");

const normalizeVariantForComparison = (value: string): string =>
  obliterateEmDash(String(value || ""))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const normalizeToneKeyValue = (value?: string): string =>
  typeof value === "string"
    ? value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_")
    : "";

const stripModelResponsePreface = (value: string): string => {
  if (!value) return "";
  let cleaned = value.trim();
  if (/^```/.test(cleaned)) {
    cleaned = cleaned.replace(/^```(?:json)?/i, "").trim();
    if (cleaned.endsWith("```")) {
      cleaned = cleaned.slice(0, -3).trim();
    }
  }
  const removePreface = (keyword: string) => {
    const regex = new RegExp(`^${keyword}\\b[:\\-\\s]*`, "i");
    if (regex.test(cleaned)) {
      const remainder = cleaned.replace(regex, "").trimStart();
      if (remainder.startsWith("{") || remainder.startsWith("[")) {
        cleaned = remainder.trim();
      }
    }
  };
  removePreface("json");
  removePreface("response");
  return cleaned;
};

const normaliseJsonQuotes = (value: string): string =>
  value.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");

const ACTION_TRIGGER_KEYWORDS = [
  "pay",
  "use",
  "tap",
  "scan",
  "pump",
  "top up",
  "top-up",
  "reload",
  "load",
  "link",
  "activate",
  "start",
  "shop",
  "buy",
  "spend",
  "transfer",
  "withdraw",
  "deposit",
  "swipe",
  "refuel",
];

const OUTCOME_KEYWORDS = [
  "earn",
  "collect",
  "get",
  "unlock",
  "receive",
  "redeem",
  "enjoy",
  "access",
  "save",
  "secure",
  "claim",
  "gain",
  "stack",
];

const getPreviousNonWhitespaceChar = (input: string, index: number): string => {
  for (let i = index - 1; i >= 0; i -= 1) {
    const char = input[i];
    if (!/\s/.test(char)) {
      return char;
    }
  }
  return "";
};

type SourceTokenType = "number" | "allcaps" | "title" | "mixed" | "other";
type SourceToken = {
  value: string;
  lower: string;
  type: SourceTokenType;
  isSentenceStart: boolean;
};

const classifySourceToken = (value: string): SourceTokenType => {
  if (/^[0-9]+(?:[./][0-9]+)?$/.test(value)) return "number";
  if (/^[A-Z0-9]+$/.test(value) && value.length > 1) return "allcaps";
  if (/^[A-Z][a-z]+$/.test(value) && value.length > 1) return "title";
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) return "mixed";
  return "other";
};

const collectSourceKeywords = (text: string, limit = 6): string[] => {
  const trimmed = typeof text === "string" ? text.trim() : "";
  if (!trimmed) return [];
  const tokens: SourceToken[] = [];
  const wordRegex = /\b[^\s]+\b/g;
  let match: RegExpExecArray | null;
  while ((match = wordRegex.exec(trimmed))) {
    const raw = match[0];
    const cleaned = raw.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, "");
    if (!cleaned) continue;
    const type = classifySourceToken(cleaned);
    if (type === "other") continue;
    const prevChar = getPreviousNonWhitespaceChar(trimmed, match.index || 0);
    const isSentenceStart = !prevChar || /[.!?]/.test(prevChar);
    tokens.push({
      value: cleaned,
      lower: cleaned.toLowerCase(),
      type,
      isSentenceStart,
    });
  }
  const keywords: string[] = [];
  const addKeyword = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue || keywords.length >= limit) return;
    if (!keywords.some((existing) => existing.toLowerCase() === trimmedValue.toLowerCase())) {
      keywords.push(trimmedValue);
    }
  };
  tokens.forEach((token) => {
    if (token.type === "number") {
      addKeyword(token.value);
    } else if (token.type === "allcaps" || token.type === "mixed") {
      addKeyword(token.value);
    } else if (token.type === "title" && !token.isSentenceStart) {
      addKeyword(token.value);
    }
  });
  let buffer: string[] = [];
  tokens.forEach((token) => {
    if (token.type === "title" && (!token.isSentenceStart || buffer.length > 0)) {
      buffer.push(token.value);
    } else {
      if (buffer.length >= 2) {
        addKeyword(buffer.join(" "));
      }
      buffer = [];
    }
  });
  if (buffer.length >= 2) {
    addKeyword(buffer.join(" "));
  }
  return keywords.slice(0, limit);
};

const sliceClauseFragment = (text: string, startIndex: number): string => {
  if (!text || startIndex < 0 || startIndex >= text.length) return "";
  const remainder = text.slice(startIndex);
  const match = remainder.match(
    /^(.*?)(?:,|;|:|\b(?:and|but|so|then|because|while|when|if)\b|\.|!|\?)/i
  );
  const fragment = match ? match[1] : remainder;
  return fragment.replace(/\s+/g, " ").trim();
};

type SourceKeywordSnippet = {
  keyword: string;
  snippet: string;
  index: number;
};

const findKeywordSnippet = (text: string, keywords: string[]): SourceKeywordSnippet | null => {
  if (!text) return null;
  const lower = text.toLowerCase();
  let best: SourceKeywordSnippet | null = null;
  keywords.forEach((keyword) => {
    const idx = lower.indexOf(keyword);
    if (idx >= 0 && (best === null || idx < best.index)) {
      const snippet = sliceClauseFragment(text, idx);
      if (snippet) {
        best = { keyword, snippet, index: idx };
      }
    }
  });
  return best;
};

const deriveActionOutcomeHint = (text: string): string | null => {
  if (!text) return null;
  const trigger = findKeywordSnippet(text, ACTION_TRIGGER_KEYWORDS);
  const outcome = findKeywordSnippet(text, OUTCOME_KEYWORDS);
  if (trigger && outcome && trigger.index < outcome.index) {
    return `Keep the trigger-to-reward promise explicit: ${trigger.snippet} leads to ${outcome.snippet}.`;
  }
  return null;
};

const VOICE_DESCRIPTOR_WORDS = new Set([
  "warm",
  "friendly",
  "caring",
  "human",
  "conversational",
]);

const normalizeDescriptorValue = (value?: string) => {
  if (!value || typeof value !== "string") return "";
  return value
    .trim()
    .toLowerCase()
    .replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, "");
};

const isVoiceDescriptorWord = (value?: string) => {
  const normalized = normalizeDescriptorValue(value);
  return Boolean(normalized && VOICE_DESCRIPTOR_WORDS.has(normalized));
};

const collectRewriteExamples = (guide: any, limit = 3): string[] => {
  if (!guide || !Array.isArray(guide.examples_with_why)) return [];
  return guide.examples_with_why
    .map((entry: any) => {
      if (!entry || typeof entry !== "object") return "";
      const situation = formatGuideText(entry.situation);
      const wrong =
        formatGuideText(entry.wrong) ||
        formatGuideText(entry.wrong_1) ||
        formatGuideText(entry.wrong_2) ||
        formatGuideText(entry.wrong_3) ||
        "";
      const rights = [
        formatGuideText(entry.right),
        formatGuideText(entry.right_option_1),
        formatGuideText(entry.right_option_2),
        formatGuideText(entry.right_option_3),
      ].filter(Boolean);
      const reason = formatGuideText(entry.why) || formatGuideText(entry.why_right) || "";
      const principles = takeStrings(entry.principles, 2).join(", ");
      const speech = formatGuideText(entry.speech_pattern);
      const parts: string[] = [];
      if (situation) {
        parts.push(`Example – ${situation}`);
      }
      if (wrong && rights.length) {
        parts.push(`Replace "${wrong}" with "${rights[0]}".`);
      } else if (rights.length) {
        parts.push(`Aim for "${rights[0]}".`);
      }
      if (reason) {
        parts.push(reason.endsWith(".") ? reason : reason + ".");
      } else if (principles) {
        parts.push(`Principles: ${principles}.`);
      }
      if (speech) {
        parts.push(`Pattern: ${speech}.`);
      }
      return parts.join(" ").trim();
    })
    .filter(Boolean)
    .slice(0, limit);
};

const collectComponentGuidanceNotes = (guide: any, limit = 8): string[] => {
  const uiGuide = guide?.ui_component_guidance;
  if (!uiGuide || typeof uiGuide !== "object") return [];
  const notes: string[] = [];
  const intro = formatGuideText((uiGuide as any).overview);
  if (intro) notes.push(intro);
  const philosophy = formatGuideText((uiGuide as any).philosophy);
  if (philosophy) notes.push(philosophy);
  let componentCount = 0;
  const MAX_COMPONENT_NOTES = Math.max(0, limit - notes.length - 1);
  const addComponentNote = (groupLabel: string, name: string, spec: any) => {
    if (componentCount >= MAX_COMPONENT_NOTES) return;
    if (!spec || typeof spec !== "object") return;
    const guidance = formatGuideText((spec as any).guidance);
    const focus = formatGuideText((spec as any).focus_on);
    const avoid = formatGuideText((spec as any).avoid);
    const tone = formatGuideText((spec as any).tone);
    const structure = formatGuideText((spec as any).structure);
    const purpose = formatGuideText((spec as any).purpose);
    const info = [guidance, focus ? `Focus: ${focus}` : "", avoid ? `Avoid: ${avoid}` : "", tone ? `Tone: ${tone}` : "", structure ? `Structure: ${structure}` : "", purpose ? `Purpose: ${purpose}` : ""]
      .filter(Boolean)
      .slice(0, 2);
    if (!info.length) return;
    const componentLabel = toFriendlyCase(name.replace(/_/g, " "));
    const prefix = groupLabel ? `${groupLabel} – ${componentLabel}` : componentLabel;
    notes.push(`${prefix}: ${info.join(" ")}`);
    componentCount += 1;
  };
  const addGroup = (section: any, groupKey: string) => {
    if (!section || typeof section !== "object") return;
    const groupLabel = toFriendlyCase(groupKey.replace(/_/g, " "));
    Object.entries(section).forEach(([name, spec]) => addComponentNote(groupLabel, name, spec));
  };
  const groups = ["input_and_action", "feedback", "content_display", "transactional", "contextual_helpers"];
  groups.forEach((key) => addGroup((uiGuide as any)[key], key));
  const reminder = formatGuideText((uiGuide as any).key_reminder);
  if (reminder) notes.push(reminder);
  return notes.slice(0, limit);
};

type RequiredPhraseGroup = { label: string; phrases: string[] };

const normalizeRequiredPhraseEntries = (
  source: unknown,
  defaultLabel = "required phrase"
): RequiredPhraseGroup[] => {
  const groups: RequiredPhraseGroup[] = [];
  const addGroup = (phrases: string[], label = defaultLabel) => {
    const merged = mergeUniqueStrings(phrases);
    if (!merged.length) return;
    groups.push({ label, phrases: merged });
  };
  const normalizeLabel = (label?: string) => (label && label.trim().length ? label.trim() : defaultLabel);
  const normalizeString = (value: unknown) =>
    typeof value === "string" ? value.trim() : "";
  const splitOptionsFromString = (value: string): string[] => {
    if (!value) return [];
    const hasDelimiter = /[,/|;]/.test(value) || /\bor\b/i.test(value);
    if (!hasDelimiter) return [];
    return value
      .split(/\s*(?:[,/|;]|\bor\b)\s*/i)
      .map((segment) => segment.trim())
      .filter(Boolean);
  };
  const handleEntry = (entry: unknown, label = defaultLabel) => {
    if (!entry) return;
    if (Array.isArray(entry)) {
      const phrases = entry.map((item) => normalizeString(item)).filter(Boolean);
      if (phrases.length) addGroup(phrases, label);
      return;
    }
    if (typeof entry === "object") {
      const data: any = entry;
      const customLabel = normalizeLabel(typeof data.label === "string" ? data.label : label);
      const optionFields = ["any_of", "one_of", "phrases", "options"];
      for (const field of optionFields) {
        if (Array.isArray(data[field])) {
          handleEntry(data[field], customLabel);
          return;
        }
      }
      if (typeof data.phrase === "string") {
        const text = normalizeString(data.phrase);
        if (text) {
          addGroup([text], customLabel);
        }
      }
      return;
    }
    const text = normalizeString(entry);
    if (text) {
      const options = splitOptionsFromString(text);
      if (options.length > 1) {
        addGroup(options, label);
      } else {
        addGroup([text], label);
      }
    }
  };

  if (Array.isArray(source)) {
    source.forEach((entry) => handleEntry(entry, defaultLabel));
  } else {
    handleEntry(source, defaultLabel);
  }
  return groups;
};

const extractTermOptions = (value: unknown): string[] => {
  const results: string[] = [];
  const normalise = (input: string) =>
    input
      .split(/[,/]|(?:\bor\b)|(?:\band\b)/gi)
      .map((chunk) =>
        chunk
          .replace(/["'()\[\]]/g, " ")
          .replace(/\buse:\b/gi, " ")
          .replace(/\bavoid\b/gi, " ")
          .trim()
      )
      .map((chunk) => chunk.replace(/^not\s+/i, "").trim())
      .filter(Boolean);
  const walk = (entry: unknown) => {
    if (typeof entry === "string") {
      normalise(entry).forEach((token) => results.push(token));
      return;
    }
    if (Array.isArray(entry)) {
      entry.forEach((item) => walk(item));
    }
  };
  walk(value);
  return results;
};

const collectGuideBannedTerms = (guide: any): string[] => {
  if (!guide || typeof guide !== "object") return [];
  const bucket = new Map<string, string>();
  const addValue = (value?: string) => {
    if (!value) return;
    const trimmed = value.trim();
    if (!trimmed) return;
    if (isVoiceDescriptorWord(trimmed)) return;
    const normalized = trimmed.toLowerCase();
    if (!bucket.has(normalized)) {
      bucket.set(normalized, trimmed);
    }
  };
  const addList = (values: string[]) => values.forEach((value) => addValue(value));
  const forbidden = guide.forbidden || {};
  addList(takeStrings(forbidden.never_do, 100));
  if (forbidden.banned_terms && typeof forbidden.banned_terms === "object") {
    addList(takeStrings((forbidden.banned_terms as any).never_use, 100));
  }
  const quickPatterns = guide.quick_patterns || {};
  addList(takeStrings(quickPatterns.red_light_phrases, 100));
  const speech = guide.human_speech_patterns || {};
  if (speech.the_marketing_trap && typeof speech.the_marketing_trap === "object") {
    addList(takeStrings((speech.the_marketing_trap as any).banned_corporate_formulas, 100));
  }
  if (speech.cliche_phrases_to_avoid && typeof speech.cliche_phrases_to_avoid === "object") {
    addList(takeStrings((speech.cliche_phrases_to_avoid as any).never_use, 100));
  }
  const preferredTerms = guide.preferred_terms;
  if (preferredTerms && typeof preferredTerms === "object") {
    Object.values(preferredTerms).forEach((entry) => {
      extractTermOptions(entry).forEach((token) => addValue(token));
    });
  }
  const brandVocabulary = guide.brand_vocabulary;
  if (brandVocabulary && typeof brandVocabulary === "object") {
    const requiredTerms = (brandVocabulary as any).required_terms;
    if (requiredTerms && typeof requiredTerms === "object") {
      Object.values(requiredTerms).forEach((entry) => {
        if (!entry || typeof entry !== "object") return;
        extractTermOptions((entry as any).never).forEach((token) => addValue(token));
      });
    }
  }
  const validationCfg = (guide as any).validation;
  if (validationCfg && typeof validationCfg === "object") {
    const avoidLists = [
      takeStrings((validationCfg as any).avoid_phrases, 50),
      takeStrings((validationCfg as any).banned_phrases, 50),
      takeStrings((validationCfg as any).forbidden_phrases, 50),
      takeStrings((validationCfg as any).blocked_phrases, 50),
      takeStrings((validationCfg as any).never_use, 50),
    ];
    avoidLists.forEach((list) => list.forEach((value) => addValue(value)));
  }
  const manualConstraints = (guide as any).manualConstraints;
  if (manualConstraints && typeof manualConstraints === "object") {
    const manualGroups = normalizeRequiredPhraseEntries(
      (manualConstraints as any).required,
      "include phrase"
    );
    manualGroups.forEach((group) =>
      group.phrases.forEach((phrase) => {
        const lowered = phrase.toLowerCase();
        if (lowered && bucket.has(lowered)) {
          bucket.delete(lowered);
        }
      })
    );
  }
  return [...bucket.values()];
};

const collectRequiredPhraseGroups = (guide: any): RequiredPhraseGroup[] => {
  if (!guide || typeof guide !== "object") return [];
  const groups: RequiredPhraseGroup[] = [];
  const pushGroups = (entries: RequiredPhraseGroup[]) => {
    entries.forEach((entry) => {
      if (!entry || !entry.phrases || !entry.phrases.length) return;
      groups.push({
        label: entry.label || "required phrase",
        phrases: entry.phrases,
      });
    });
  };
  pushGroups(normalizeRequiredPhraseEntries((guide as any).required_phrases, "required phrase"));
  const promptCfg = (guide as any).rewritePrompt;
  if (promptCfg && typeof promptCfg === "object") {
    pushGroups(
      normalizeRequiredPhraseEntries((promptCfg as any).required_phrases, "required phrase")
    );
  }
  const validationCfg = (guide as any).validation;
  if (validationCfg && typeof validationCfg === "object") {
    pushGroups(
      normalizeRequiredPhraseEntries((validationCfg as any).required_phrases, "required phrase")
    );
    pushGroups(
      normalizeRequiredPhraseEntries(
        (validationCfg as any).required_phrase_groups,
        "required phrase option"
      )
    );
  }
  return groups;
};

const countSentences = (text: string) => {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned.length) return 0;
  const matches = cleaned.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
  return matches ? matches.length : 1;
};

const toNumberOrUndefined = (value: unknown): number | undefined => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  return undefined;
};

const formatRangeHint = (min?: number, max?: number, fallback?: string) => {
  const trimmedFallback = typeof fallback === "string" ? fallback.trim() : "";
  if (trimmedFallback) return trimmedFallback;
  const hasMin = typeof min === "number";
  const hasMax = typeof max === "number";
  if (hasMin && hasMax) return `${min}-${max} characters`;
  if (hasMax) return `≤${max} characters`;
  if (hasMin) return `≥${min} characters`;
  return "";
};

const ensureSentence = (value?: string) => {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed) return "";
  return /[.!?]$/.test(trimmed) ? trimmed : trimmed + ".";
};

type LengthPreference = {
  label?: string;
  minChars?: number;
  maxChars?: number;
  rangeHint?: string;
  structure?: string;
  description?: string;
};

const getLengthPreference = (guide: any): LengthPreference | null => {
  if (!guide || typeof guide !== "object") return null;
  const pref = (guide as any).length_preference;
  if (!pref || typeof pref !== "object") return null;
  const label = formatGuideText((pref as any).label) || formatGuideText((pref as any).id);
  const minChars = toNumberOrUndefined((pref as any).min_chars);
  const maxChars = toNumberOrUndefined((pref as any).max_chars);
  const rangeHint = formatRangeHint(minChars, maxChars, formatGuideText((pref as any).range_hint));
  const structure = formatGuideText((pref as any).structure);
  const description = formatGuideText((pref as any).description);
  if (!label && !rangeHint && typeof minChars !== "number" && typeof maxChars !== "number") {
    return null;
  }
  return {
    label,
    minChars,
    maxChars,
    rangeHint,
    structure,
    description,
  };
};

const PRONOUN_PATTERN = /\b(?:we|us|our|ours|you|your|yours)\b/i;

type ValidationRules = {
  bannedTerms: string[];
  requiredPhraseGroups: RequiredPhraseGroup[];
  maxSentences: number;
  maxChars: number;
  minChars: number;
  pronounCheck: boolean;
};

type ValidationResult = {
  valid: boolean;
  issues: string[];
  softIssues: string[];
};


const buildValidationRules = (guide: any, sourceText?: string): ValidationRules => {
  const lengthPref = getLengthPreference(guide);
  const baseBanned = collectGuideBannedTerms(guide);
  const bannedTerms = new Map<string, string>();
  const addBannedTerm = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const normalized = trimmed.toLowerCase();
    if (!bannedTerms.has(normalized)) {
      bannedTerms.set(normalized, trimmed);
    }
  };
  baseBanned.forEach((term) => {
    if (term && typeof term === "string") {
      addBannedTerm(term);
    }
  });
  const pronounCheck =
    typeof sourceText === "string" && sourceText.trim().length > 0
      ? !PRONOUN_PATTERN.test(sourceText)
      : false;
  return {
    bannedTerms: Array.from(bannedTerms.values()),
    requiredPhraseGroups: collectRequiredPhraseGroups(guide),
    maxSentences: 2,
    maxChars: lengthPref?.maxChars ?? 0,
    minChars: lengthPref?.minChars ?? 0,
    pronounCheck,
  };
};

const validateVariant = (variant: string, rules: ValidationRules): ValidationResult => {
  const text = (variant || "").trim();
  const haystack = text.toLowerCase();
  const issues: string[] = [];
  const softIssues: string[] = [];
  if (!text.length) {
    issues.push("Empty suggestion.");
  }
  if (rules.maxSentences && countSentences(text) > rules.maxSentences) {
    issues.push(`Use at most ${rules.maxSentences} sentences.`);
  }
  if (rules.maxChars && text.length > rules.maxChars) {
    issues.push(`Keep copy ≤${rules.maxChars} characters (currently ${text.length}).`);
  }
  if (rules.minChars && text.length < rules.minChars) {
    issues.push(`Needs ≥${rules.minChars} characters (currently ${text.length}).`);
  }
  rules.bannedTerms.forEach((term) => {
    const lowered = term.toLowerCase();
    if (lowered && haystack.includes(lowered)) {
      issues.push(`Contains banned phrase "${term}".`);
    }
  });
  rules.requiredPhraseGroups.forEach((group) => {
    const satisfied = group.phrases.some((phrase) => haystack.includes(phrase.toLowerCase()));
    if (!satisfied) {
      const sample = group.phrases.slice(0, 3).join(", ");
      const descriptor = group.label || "required phrase";
      issues.push(sample ? `Missing ${descriptor} (e.g., ${sample}).` : `Missing ${descriptor}.`);
    }
  });
  if (rules.pronounCheck && PRONOUN_PATTERN.test(text)) {
    softIssues.push("Introduces first- or second-person pronouns that the source avoided.");
  }
  const valid = issues.length === 0 && softIssues.length === 0;
  return { valid, issues, softIssues };
};

const toFriendlyCase = (value: string) =>
  value
    .split(/[\s_]+/g)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase())
    .join(" ");

const gatherScenarioKeywords = (key: string, entry: any) => {
  const keywords = new Set<string>();
  const addKeyword = (value?: string) => {
    if (!value || typeof value !== "string") return;
    const trimmed = value.trim().toLowerCase();
    if (trimmed) keywords.add(trimmed);
  };
  const addArray = (value: unknown) => {
    if (!Array.isArray(value)) return;
    value.forEach((item) => addKeyword(typeof item === "string" ? item : ""));
  };
  addKeyword(key.replace(/_/g, " "));
  key
    .split(/[_\s]+/g)
    .map((token) => token.trim().toLowerCase())
    .filter((token) => token.length >= 4)
    .forEach((token) => addKeyword(token));
  if (entry && typeof entry === "object") {
    addArray((entry as any).triggers);
    addArray((entry as any).keywords);
    addArray((entry as any).avoid);
    addArray((entry as any).use);
  }
  return [...keywords];
};

const buildScenarioInstruction = (key: string, entry: any) => {
  if (!entry || typeof entry !== "object") return "";
  const chunks: string[] = [];
  const title =
    (typeof entry.situation === "string" && entry.situation.trim()) || toFriendlyCase(key) || "";
  if (title) {
    chunks.push(title);
  }
  if (typeof entry.challenge === "string" && entry.challenge.trim()) {
    chunks.push(entry.challenge.trim());
  }
  if (typeof entry.formula === "string" && entry.formula.trim()) {
    chunks.push(`Formula: ${entry.formula.trim()}`);
  }
  if (typeof entry.principle === "string" && entry.principle.trim()) {
    chunks.push(entry.principle.trim());
  }
  if (Array.isArray(entry.use) && entry.use.length) {
    const tips = entry.use
      .map((item: unknown) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean)
      .slice(0, 3);
    if (tips.length) {
      chunks.push(`Use: ${tips.join(", ")}.`);
    }
  }
  if (Array.isArray(entry.avoid) && entry.avoid.length) {
    const warnings = entry.avoid
      .map((item: unknown) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean)
      .slice(0, 3);
    if (warnings.length) {
      chunks.push(`Avoid: ${warnings.join(", ")}.`);
    }
  }
  if (typeof entry.example === "string" && entry.example.trim()) {
    chunks.push(`Example: ${entry.example.trim()}`);
  }
  return chunks.join(" ");
};

const DEFAULT_TONE_NAMES = [
  "Friendly",
  "Professional",
  "Empathetic",
  "Persuasive",
  "Playful",
  "Inspirational",
  "Neutral",
  "Urgent",
  "Exclusive",
  "Technical",
];

const MAX_ACTIVE_TONES = 16;
const TONES_PER_CYCLE = 4;

type ToneConfig = { key: string; label: string; notes: string[] };
type RewriteIntent = "rewrite" | "prompt";

const collectToneConfigs = (guide: any): ToneConfig[] => {
  const palette = guide?.tone_palette;
  const available = palette?.available_tones;
  const requestedTonePreference =
    typeof (guide as any).requestedTone === "string"
      ? (guide as any).requestedTone.trim()
      : typeof (guide as any).tonePreference === "string"
      ? (guide as any).tonePreference.trim()
      : "";
  let resolvedRequestedTone = requestedTonePreference;
  if (resolvedRequestedTone && available && typeof available === "object") {
    if (!available[resolvedRequestedTone]) {
      const fallbackKey =
        "neutral_helpful" in available
          ? "neutral_helpful"
          : Object.keys(available)[0] || "";
      if (fallbackKey && fallbackKey !== resolvedRequestedTone) {
        if (typeof console !== "undefined" && typeof console.warn === "function") {
          console.warn(
            `Unknown tone "${resolvedRequestedTone}" requested; falling back to "${fallbackKey}".`
          );
        }
        resolvedRequestedTone = fallbackKey;
      }
    }
  }

  if (available && typeof available === "object") {
    const toneList = Object.entries(available)
      .map(([key, entry]) => {
        if (!entry || typeof entry !== "object") return null;
        const labelCandidate = formatGuideText((entry as any).ui_label) || toFriendlyCase(key);
        if (!labelCandidate) return null;
        const notes: string[] = [];
        const addNote = (value?: string, template?: (text: string) => string) => {
          const text = formatGuideText(value);
          if (!text) return;
          notes.push(template ? template(text) : text);
        };
        addNote((entry as any).blend, (text) => `Blend both qualities: ${text}.`);
        addNote(
          (entry as any).traits,
          (text) => `Let verbs and adjectives broadcast these traits: ${text}.`
        );
        addNote(
          (entry as any).syntactic_elements,
          (text) => `Structure cue for this tone: ${text}.`
        );
        addNote((entry as any).when, (text) => `Typical context: ${text}.`);
        addNote((entry as any).qualities, (text) => `Energy target: ${text}.`);
        addNote(
          (entry as any).how,
          (text) => (text.endsWith(".") ? text : text + ".")
        );
        addNote((entry as any).avoid, (text) => `Avoid: ${text}.`);
        addNote((entry as any).example, (text) => `Sample tone line: ${text}.`);
        return { key, label: labelCandidate, notes };
      })
      .filter((tone): tone is ToneConfig => Boolean(tone && tone.label));

    if (resolvedRequestedTone) {
      toneList.sort((a, b) => {
        if (a.key === resolvedRequestedTone) return -1;
        if (b.key === resolvedRequestedTone) return 1;
        return 0;
      });
    }

    if (toneList.length) {
      const limit = Math.max(MAX_ACTIVE_TONES, toneList.length);
      const selected = toneList.slice(0, limit);
      if (selected.length < limit) {
        const missingCount = limit - selected.length;
        const filler = DEFAULT_TONE_NAMES.filter(
          (label) =>
            !selected.some((tone) => tone.label.toLowerCase() === label.toLowerCase())
        )
          .slice(0, missingCount)
          .map((label) => ({
            key: label.toLowerCase().replace(/\s+/g, "_"),
            label,
            notes: [],
          }));
        selected.push(...filler);
      }
      return selected;
    }
  }

  return DEFAULT_TONE_NAMES.slice(0, MAX_ACTIVE_TONES).map((label) => ({
    key: label.toLowerCase().replace(/\s+/g, "_"),
    label,
    notes: [],
  }));
};

const collectScenarioHints = (guide: any, haystackRaw: string) => {
  if (!guide || typeof guide !== "object") return [];
  const scenarios = guide.scenario_playbook;
  if (!scenarios || typeof scenarios !== "object") return [];
  const haystack = (haystackRaw || "").toLowerCase();
  if (!haystack.trim()) return [];
  const hints: string[] = [];
  Object.entries(scenarios).forEach(([key, entry]) => {
    if (!entry || typeof entry !== "object") return;
    const keywords = gatherScenarioKeywords(key, entry);
    if (!keywords.length) return;
    if (keywords.some((keyword) => haystack.includes(keyword))) {
      const instruction = buildScenarioInstruction(key, entry);
      if (instruction) {
        hints.push(instruction);
      }
    }
  });
  return hints.slice(0, 3);
};

const collectSentenceLibraryHints = (guide: any): string[] => {
  if (!guide || typeof guide !== "object") return [];
  const library = guide.sentence_library;
  if (!library || typeof library !== "object") return [];
  const clips = library.clips;
  if (!Array.isArray(clips)) return [];
  const hints: string[] = [];
  clips.forEach((entry) => {
    if (!entry || typeof entry !== "object") return;
    const example = formatGuideText((entry as any).example);
    if (!example) return;
    const why = formatGuideText((entry as any).why);
    hints.push(`Sentence reference: ${example}.`);
    if (why) {
      hints.push(`Why it works: ${why}.`);
    }
  });
  return hints.slice(0, 12);
};

const deriveGuidePrompt = (guide: any) => {
  if (!guide || typeof guide !== "object") {
    return { overview: "", requirements: [] as string[] };
  }

  const manualConstraints = (guide as any).manualConstraints;
  const manualIncludeGroups =
    manualConstraints && typeof manualConstraints === "object"
      ? normalizeRequiredPhraseEntries((manualConstraints as any).required, "include phrase")
      : [];
  const manualRequiredSet = new Set<string>();
  manualIncludeGroups.forEach((group) =>
    group.phrases.forEach((phrase) => {
      const normalized = phrase.toLowerCase();
      if (normalized) {
        manualRequiredSet.add(normalized);
      }
    })
  );
  const manualAvoidPhrases =
    manualConstraints && typeof manualConstraints === "object"
      ? takeStrings((manualConstraints as any).avoid, 50)
      : [];
  const manualReminders =
    manualConstraints && typeof manualConstraints === "object"
      ? takeStrings((manualConstraints as any).reminders, 50)
      : [];
  const manualCoreInstructions: string[] =
    manualConstraints && typeof manualConstraints === "object" && Array.isArray((manualConstraints as any).core_instructions)
      ? (manualConstraints as any).core_instructions
          .map((entry: unknown) => (typeof entry === "string" ? entry.trim() : ""))
          .filter((entry: string): entry is string => entry.length > 0)
      : [];
  const manualPlayZones =
    manualConstraints && typeof manualConstraints === "object"
      ? takeStrings((manualConstraints as any).play_zones, 10)
      : [];
  const manualNoPlayZones =
    manualConstraints && typeof manualConstraints === "object"
      ? takeStrings((manualConstraints as any).no_play_zones, 10)
      : [];
  const manualImmutableRules =
    manualConstraints && typeof manualConstraints === "object"
      ? takeStrings((manualConstraints as any).immutable_rules, 10)
      : [];
  const requirements: string[] = [];
  const overviewParts: string[] = [];
  const coreIdentity = guide.core_identity || {};
  const voice = typeof coreIdentity.voice === "string" ? coreIdentity.voice.trim() : "";
  const northStar = typeof coreIdentity.north_star === "string" ? coreIdentity.north_star.trim() : "";
  const goldenRule = typeof coreIdentity.golden_rule === "string" ? coreIdentity.golden_rule.trim() : "";
  if (voice) {
    overviewParts.push(`Stay ${voice.toLowerCase()}.`);
  }
  if (northStar) {
    overviewParts.push(northStar);
  }
  if (goldenRule) {
    requirements.push(goldenRule);
  }
  if (typeof coreIdentity.critical_truth === "string") {
    requirements.push(coreIdentity.critical_truth.trim());
  }
  if (typeof coreIdentity.the_1m_user_reality === "string") {
    requirements.push(coreIdentity.the_1m_user_reality.trim());
  }

  const meta = guide.meta;
  if (meta && typeof meta === "object") {
    const purpose = formatGuideText((meta as any).purpose);
    if (purpose) {
      overviewParts.push(purpose);
    }
    const version = formatGuideText((meta as any).version);
    const lastUpdated = formatGuideText((meta as any).last_updated);
    if (version && lastUpdated) {
      requirements.push(`Guide version ${version}, updated ${lastUpdated}.`);
    } else if (version) {
      requirements.push(`Guide version ${version}.`);
    } else if (lastUpdated) {
      requirements.push(`Guide updated ${lastUpdated}.`);
    }
    const changelog = (meta as any).changelog;
    if (changelog && typeof changelog === "object") {
      const entries = Object.entries(changelog)
        .filter(([, note]) => typeof note === "string" && note.trim().length > 0)
        .sort(([verA], [verB]) => (verA < verB ? 1 : -1));
      if (entries.length) {
        const [latestVersion, latestNote] = entries[0];
        requirements.push(`Latest change (${latestVersion}): ${String(latestNote).trim()}`);
      }
    }
  }

  const companyProfile = guide.company_profile;
  if (companyProfile && typeof companyProfile === "object") {
    const industry = formatGuideText((companyProfile as any).industry);
    const companyType = formatGuideText((companyProfile as any).type);
    const audience = formatGuideText((companyProfile as any).target_audience);
    let descriptor = "";
    if (industry && companyType) {
      descriptor = `Setel is a ${companyType} company in the ${industry} space.`;
    } else if (industry) {
      descriptor = `Setel operates in the ${industry} space.`;
    } else if (companyType) {
      descriptor = `Setel is a ${companyType} company.`;
    }
    if (descriptor) {
      overviewParts.push(descriptor);
    }
    if (audience) {
      requirements.push(`Write for ${audience}.`);
    }
  }

  const aiRole = guide.your_role_as_ai;
  if (aiRole && typeof aiRole === "object") {
    const roleOverview = [
      typeof aiRole.what_you_do === "string" ? aiRole.what_you_do.trim() : "",
      typeof aiRole.what_you_output === "string" ? aiRole.what_you_output.trim() : "",
    ]
      .filter(Boolean)
      .join(" ");
    if (roleOverview) {
      overviewParts.push(roleOverview);
    }
    [
      aiRole.how_you_think,
      aiRole.critical_reminder,
      aiRole.your_value,
    ]
      .filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0)
      .forEach((entry) => requirements.push(entry.trim()));
    const modeTrap = (aiRole as any).the_mode_switch_trap;
    if (modeTrap && typeof modeTrap === "object") {
      const modeLines = [];
      if (typeof modeTrap.problem === "string") modeLines.push(modeTrap.problem.trim());
      if (typeof modeTrap.solution === "string") modeLines.push(modeTrap.solution.trim());
      if (modeLines.length) requirements.push(modeLines.join(" "));
      if (typeof modeTrap.test === "string") requirements.push(modeTrap.test.trim());
    }
    const workingWithHumans = (aiRole as any).working_with_humans;
    if (workingWithHumans && typeof workingWithHumans === "object") {
      Object.values(workingWithHumans)
        .filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0)
        .forEach((entry) => requirements.push(entry.trim()));
    }
  }

  const decisionFramework = guide.decision_framework || {};
  const selfChecks = takeStrings(decisionFramework.self_check_questions, 4);
  if (selfChecks.length) {
    requirements.push(`Before finalising, ask yourself: ${selfChecks.join("; ")}.`);
  }
  if (decisionFramework && typeof decisionFramework === "object") {
    const optionRules = decisionFramework.when_generating_options;
    if (optionRules && typeof optionRules === "object") {
      Object.values(optionRules)
        .filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0)
        .forEach((entry) => requirements.push(entry.trim()));
    }
  }

  const writingPrinciples = guide.writing_principles;
  if (writingPrinciples && typeof writingPrinciples === "object") {
    Object.values(writingPrinciples)
      .map((item) => (item && typeof item === "object" ? (item as any).rule : ""))
      .filter((rule): rule is string => typeof rule === "string" && rule.trim().length > 0)
      .slice(0, 6)
      .forEach((rule) => {
        const trimmed = rule.trim();
        requirements.push(trimmed.endsWith(".") ? trimmed : trimmed + ".");
      });
  }

  const quickPatterns = guide.quick_patterns || {};
  const greenPhrases = takeStrings(quickPatterns.green_light_phrases, 4);
  if (greenPhrases.length) {
    requirements.push(`Lean on reassuring phrases like ${greenPhrases.join(", ")}.`);
  }
  const redPhrases = takeStrings(quickPatterns.red_light_phrases, 4);
  if (redPhrases.length) {
    requirements.push(`Avoid harsh phrases like ${redPhrases.join(", ")}.`);
  }
  if (quickPatterns.reframe_templates && typeof quickPatterns.reframe_templates === "object") {
    const from = (quickPatterns.reframe_templates as any).from;
    const to = (quickPatterns.reframe_templates as any).to;
    if (typeof from === "string" && typeof to === "string") {
      requirements.push(`Reframe "${from}" into "${to}".`);
    }
  }

  const languageRules = guide.language_rules || {};
  const languageBits: string[] = [];
  if (typeof languageRules.english_variant === "string") {
    languageBits.push(`Use ${languageRules.english_variant}.`);
  }
  if (typeof languageRules.tense === "string") {
    languageBits.push(languageRules.tense);
  }
  if (typeof languageRules.voice === "string") {
    languageBits.push(languageRules.voice);
  }
  if (typeof languageRules.okay_spelling === "string") {
    languageBits.push(languageRules.okay_spelling.trim());
  }
  if (typeof languageRules.topup_usage === "string") {
    languageBits.push(languageRules.topup_usage.trim());
  }
  if (languageBits.length) {
    requirements.push(languageBits.join(" "));
  }
  const acronyms = languageRules.acronyms;
  if (acronyms && typeof acronyms === "object") {
    const acronymRules: string[] = [];
    if (typeof (acronyms as any).first_use === "string") {
      acronymRules.push((acronyms as any).first_use.trim());
    }
    if (typeof (acronyms as any).format === "string") {
      acronymRules.push((acronyms as any).format.trim());
    }
    if (acronymRules.length) {
      requirements.push(`Acronyms: ${acronymRules.join(" ")}`);
    }
  }

  const formatting = guide.formatting_rules || {};
  const capitalisation = formatting.capitalisation || formatting.capitalization;
  if (capitalisation && typeof capitalisation === "object") {
    const capRules: string[] = [];
    if (typeof capitalisation.default === "string") capRules.push(`Default text: ${capitalisation.default}.`);
    if (typeof capitalisation.buttons === "string") capRules.push(`Buttons: ${capitalisation.buttons}.`);
    if (capRules.length) {
      requirements.push(capRules.join(" "));
    }
  }
  if (typeof formatting.currency === "string" || typeof formatting.currency_thousands === "string") {
    const parts = [
      typeof formatting.currency === "string" ? `Currency: ${formatting.currency}` : "",
      typeof formatting.currency_thousands === "string" ? `Thousands: ${formatting.currency_thousands}` : "",
    ]
      .filter(Boolean)
      .join(", ");
    if (parts) {
      requirements.push(parts + ".");
    }
  }
  if (typeof formatting.dates === "string" || typeof formatting.time === "string") {
    const parts = [
      typeof formatting.dates === "string" ? `Dates: ${formatting.dates}` : "",
      typeof formatting.time === "string" ? `Time: ${formatting.time}` : "",
    ]
      .filter(Boolean)
      .join(", ");
    if (parts) {
      requirements.push(parts + ".");
    }
  }

  const pronouns = guide.pronouns || {};
  const pronounRules = Object.entries(pronouns)
    .map(([key, value]) => (typeof value === "string" ? `${key.replace(/_/g, " ")}: ${value}` : ""))
    .filter(Boolean);
  if (pronounRules.length) {
    requirements.push(`Pronouns: ${pronounRules.join("; ")}.`);
  }

  const creativeFreedom = guide.creative_freedom;
  const fallbackPlayZones =
    creativeFreedom && typeof creativeFreedom === "object"
      ? takeStrings((creativeFreedom as any).where_you_can_play, 6)
      : [];
  const fallbackNoPlayZones =
    creativeFreedom && typeof creativeFreedom === "object"
      ? takeStrings((creativeFreedom as any).where_you_cannot_play, 6)
      : [];
  const fallbackImmutable =
    creativeFreedom && typeof creativeFreedom === "object"
      ? takeStrings((creativeFreedom as any).immutable_rules, 6)
      : [];
  const playZones = mergeUniqueStrings(manualPlayZones, fallbackPlayZones);
  if (playZones.length) {
    requirements.push(`You can experiment more with tone when working on: ${playZones.join(", ")}.`);
  }
  const noPlayZones = mergeUniqueStrings(manualNoPlayZones, fallbackNoPlayZones);
  if (noPlayZones.length) {
    requirements.push(`Stay literal and conservative for: ${noPlayZones.join(", ")}.`);
  }
  const immutableRules = mergeUniqueStrings(manualImmutableRules, fallbackImmutable);
  if (immutableRules.length) {
    requirements.push(`Immutable rules you must never break: ${immutableRules.join(", ")}.`);
  }

  const forbiddenSource =
    guide && typeof guide === "object" && guide.forbidden && typeof guide.forbidden === "object"
      ? (guide.forbidden as any).never_do
      : [];
  const forbidden = takeStrings(forbiddenSource, 6);
  if (forbidden.length) {
    requirements.push(`Never do: ${forbidden.join(", ")}.`);
  }

  const bannedTermsSource =
    guide &&
    typeof guide === "object" &&
    guide.forbidden &&
    typeof guide.forbidden === "object" &&
    (guide.forbidden as any).banned_terms &&
    typeof (guide.forbidden as any).banned_terms === "object"
      ? ((guide.forbidden as any).banned_terms as any).never_use
      : [];
  const bannedTerms = takeStrings(bannedTermsSource, 6).filter((term) => {
    const normalized = term.trim().toLowerCase();
    if (!normalized) return false;
    if (manualRequiredSet.has(normalized)) return false;
    if (isVoiceDescriptorWord(term)) return false;
    return true;
  });
  if (bannedTerms.length) {
    requirements.push(`Banned terms: ${bannedTerms.join(", ")}.`);
  }

  const validationCfg = guide.validation;
  if (validationCfg && typeof validationCfg === "object") {
    const mustUsePhrases = normalizeRequiredPhraseEntries(
      (validationCfg as any).required_phrases,
      "required phrase"
    );
    const optionalChoiceGroups = normalizeRequiredPhraseEntries(
      (validationCfg as any).required_phrase_groups,
      "required phrase option"
    );
    const combinedRequiredGroups = [...mustUsePhrases, ...optionalChoiceGroups].slice(0, 6);
    combinedRequiredGroups.forEach((group) => {
      if (!group.phrases.length) return;
      if (group.phrases.length === 1) {
        requirements.push(`Include the phrase "${group.phrases[0]}" naturally in the copy.`);
      } else {
        const descriptor = group.label || "required phrase option";
        requirements.push(
          `Use at least one of these ${descriptor}s (rotate across variants when it makes sense): ${group.phrases.join(
            ", "
          )}.`
        );
      }
    });
    const avoidBuckets = [
      takeStrings((validationCfg as any).avoid_phrases, 6),
      takeStrings((validationCfg as any).banned_phrases, 6),
      takeStrings((validationCfg as any).forbidden_phrases, 6),
      takeStrings((validationCfg as any).blocked_phrases, 6),
      takeStrings((validationCfg as any).never_use, 6),
    ];
    const avoidPhrases: string[] = [];
    const seenAvoid = new Set<string>();
    avoidBuckets.forEach((bucket) =>
      bucket.forEach((phrase) => {
        const trimmed = phrase.trim();
        if (!trimmed) return;
        const key = trimmed.toLowerCase();
        if (seenAvoid.has(key)) return;
        seenAvoid.add(key);
        avoidPhrases.push(trimmed);
      })
    );
    const avoidPhrasesFiltered = avoidPhrases.filter((phrase) => !isVoiceDescriptorWord(phrase));
    if (avoidPhrasesFiltered.length) {
      requirements.push(`Avoid these phrases entirely: ${avoidPhrasesFiltered.join(", ")}.`);
    }
  }
  if (manualIncludeGroups.length) {
    manualIncludeGroups.forEach((group) => {
      if (!group.phrases.length) return;
      if (group.phrases.length === 1) {
        requirements.push(
          `Optional keyword—use it only when it makes the copy clearer: "${group.phrases[0]}".`
        );
      } else {
        const descriptor = group.label || "keyword option";
        requirements.push(
          `Optional ${descriptor} set: ${group.phrases.join(
            ", "
          )}. Rotate them across variants when they genuinely help, but skip them if they feel forced.`
        );
      }
    });
  }
  const manualAvoidPhrasesFiltered = manualAvoidPhrases.filter((phrase) => !isVoiceDescriptorWord(phrase));
  if (manualAvoidPhrasesFiltered.length) {
    requirements.push(
      `Never use these manual avoid phrases: ${manualAvoidPhrasesFiltered.join(", ")}.`
    );
  }
  if (manualReminders.length) {
    manualReminders.forEach((reminder) => {
      const text = reminder.endsWith(".") ? reminder : reminder + ".";
      requirements.push(text);
    });
  }
  if (manualCoreInstructions.length) {
    manualCoreInstructions.forEach((instruction) => {
      if (instruction) {
        requirements.push(instruction);
      }
    });
  }
  collectRewriteExamples(guide).forEach((example) => {
    const cleaned = sanitisePromptText(example);
    if (cleaned) requirements.push(cleaned);
  });
  collectComponentGuidanceNotes(guide).forEach((note) => {
    const cleaned = sanitisePromptText(note);
    if (cleaned) requirements.push(cleaned);
  });

  const preferredTerms = guide.preferred_terms;
  if (preferredTerms && typeof preferredTerms === "object") {
    const replacements = Object.entries(preferredTerms)
      .map(([preferred, avoid]) => {
        const preferredLabel = preferred.replace(/_/g, " ");
        if (typeof avoid === "string" && avoid.trim().length) {
          const cleaned = avoid.replace(/^not\s+/i, "").trim();
          return cleaned ? `${preferredLabel} (not ${cleaned})` : preferredLabel;
        }
        return preferredLabel;
      })
      .filter(Boolean)
      .slice(0, 5);
    if (replacements.length) {
      requirements.push(`Preferred terms: ${replacements.join(", ")}.`);
    }
  }

  const brandVocabulary = guide.brand_vocabulary || {};
  const describeBrandRule = (label: string, spec: any) => {
    if (!spec || typeof spec !== "object") return "";
    const parts: string[] = [];
    const useText = formatGuideText((spec as any).use);
    if (useText) parts.push(`Use ${useText}`);
    const nounForm = formatGuideText((spec as any).noun);
    if (nounForm) parts.push(`Noun: ${nounForm}`);
    const verbForm = formatGuideText((spec as any).verb);
    if (verbForm) parts.push(`Verb: ${verbForm}`);
    const neverText = formatGuideText((spec as any).never);
    if (neverText) parts.push(`Never say ${neverText}`);
    const contextText = formatGuideText((spec as any).context);
    if (contextText) parts.push(contextText);
    const noteText = formatGuideText((spec as any).note);
    if (noteText) parts.push(noteText);
    const examples = takeStrings((spec as any).examples, 2);
    if (examples.length) parts.push(`Examples: ${examples.join("; ")}`);
    return parts.length ? `${toFriendlyCase(label)} → ${parts.join(", ")}.` : "";
  };
  const requiredTerms = brandVocabulary.required_terms;
  if (requiredTerms && typeof requiredTerms === "object") {
    Object.entries(requiredTerms)
      .map(([key, spec]) => describeBrandRule(key, spec))
      .filter(Boolean)
      .slice(0, 5)
      .forEach((rule) => requirements.push(rule));
  }
  const productNames = brandVocabulary.product_names;
  if (productNames && typeof productNames === "object") {
    Object.entries(productNames)
      .forEach(([key, value]) => {
        if (typeof value === "string") {
          requirements.push(`${toFriendlyCase(key)}: ${value.trim()}`);
          return;
        }
        if (value && typeof value === "object") {
          Object.entries(value as Record<string, unknown>)
            .filter(([, text]) => typeof text === "string")
            .forEach(([subKey, text]) =>
              requirements.push(`${toFriendlyCase(subKey)}: ${String(text).trim()}`)
            );
        }
      });
  }
  const officialDocuments = brandVocabulary.official_documents;
  if (officialDocuments && typeof officialDocuments === "object") {
    Object.entries(officialDocuments)
      .filter(([, value]) => typeof value === "string")
      .forEach(([key, value]) => requirements.push(`${toFriendlyCase(key)}: ${String(value).trim()}`));
  }
  const paymentTerms = brandVocabulary.payment_transaction_terms;
  if (paymentTerms && typeof paymentTerms === "object") {
    Object.entries(paymentTerms).forEach(([key, value]) => {
      if (key === "points_conversion" && value && typeof value === "object") {
        const pcBits: string[] = [];
        ["primary", "alternatives", "avoid_repetition", "never"].forEach((field) => {
          const text = formatGuideText((value as any)[field]);
          if (!text) return;
          if (field === "never") {
            pcBits.push(`Never say ${text}`);
          } else {
            pcBits.push(text);
          }
        });
        if (pcBits.length) {
          requirements.push(`Points conversion: ${pcBits.join(" ")}.`);
        }
        return;
      }
      if (typeof value === "string") {
        const text = value.trim();
        if (text) requirements.push(`${toFriendlyCase(key)}: ${text}.`);
      }
    });
  }
  const uiTerms = brandVocabulary.user_interface_terms;
  if (uiTerms && typeof uiTerms === "object") {
    Object.entries(uiTerms)
      .filter(([, value]) => typeof value === "string")
      .forEach(([key, value]) => requirements.push(`${toFriendlyCase(key)}: ${String(value).trim()}`));
  }

  const tonePalette = guide.tone_palette;
  if (tonePalette && typeof tonePalette === "object") {
    if (typeof (tonePalette as any).how_to_use === "string") {
      requirements.push((tonePalette as any).how_to_use.trim());
    }
  }

  const contextSensing = guide.context_sensing;
  if (contextSensing && typeof contextSensing === "object") {
    Object.values(contextSensing)
      .map((entry) => {
        if (!entry || typeof entry !== "object") return "";
        const toneMix = typeof (entry as any).tone_mix === "string" ? (entry as any).tone_mix.trim() : "";
        const avoid = takeStrings((entry as any).avoid, 3);
        if (!toneMix) return "";
        const avoidText = avoid.length ? ` Avoid: ${avoid.join(", ")}.` : "";
        return `When context matches ${toneMix}, blend tones accordingly.${avoidText}`;
      })
      .filter(Boolean)
      .slice(0, 2)
      .forEach((text) => requirements.push(text));
  }

  const humanSpeech = guide.human_speech_patterns;
  if (humanSpeech && typeof humanSpeech === "object") {
    if (typeof humanSpeech.core_truth === "string") {
      requirements.push(humanSpeech.core_truth.trim());
    }
    const marketingTrap = (humanSpeech as any).the_marketing_trap;
    if (marketingTrap && typeof marketingTrap === "object") {
      if (Array.isArray(marketingTrap.banned_corporate_formulas)) {
        const banned = takeStrings(marketingTrap.banned_corporate_formulas, 6);
        if (banned.length) {
          requirements.push(`Avoid marketing formulas like ${banned.join(", ")}.`);
        }
      }
      if (typeof marketingTrap.why_they_fail === "string") {
        requirements.push(marketingTrap.why_they_fail.trim());
      }
    }
    const replacements = humanSpeech.simple_verb_replacements;
    if (replacements && typeof replacements === "object") {
      Object.entries(replacements)
        .slice(0, 5)
        .forEach(([from, to]) => {
          if (Array.isArray(to) && to.length) {
            const friendlyFrom = from.replace(/_becomes$/, "").replace(/_/g, " ");
            requirements.push(`${friendlyFrom} → ${takeStrings(to, 3).join(", ")}.`);
          }
        });
    }
    const sentencePatterns = humanSpeech.sentence_structure_patterns;
    if (sentencePatterns && typeof sentencePatterns === "object") {
      const natural = takeStrings(sentencePatterns.natural_patterns, 3);
      if (natural.length) {
        requirements.push(`Favor sentence patterns like: ${natural.join("; ")}.`);
      }
      const avoidPatterns = takeStrings(sentencePatterns.unnatural_patterns_to_avoid, 3);
      if (avoidPatterns.length) {
        requirements.push(`Avoid sentence patterns such as: ${avoidPatterns.join("; ")}.`);
      }
    }
    const oneSyllable = humanSpeech.the_one_syllable_challenge;
    if (oneSyllable && typeof oneSyllable === "object") {
      if (typeof oneSyllable.rule === "string") requirements.push(oneSyllable.rule.trim());
      if (typeof oneSyllable.practice === "string") requirements.push(oneSyllable.practice.trim());
    }
    const wordHierarchy = humanSpeech.word_length_hierarchy;
    if (wordHierarchy && typeof wordHierarchy === "object") {
      const hierarchyLines: string[] = [];
      Object.entries(wordHierarchy)
        .slice(0, 4)
        .forEach(([tier, text]) => {
          if (typeof text === "string") {
            hierarchyLines.push(`${toFriendlyCase(tier)}: ${text}`);
          }
        });
      if (hierarchyLines.length) {
        requirements.push(`Word lengths → ${hierarchyLines.join("; ")}.`);
      }
    }
    const nounTrap = humanSpeech.the_noun_trap;
    if (nounTrap && typeof nounTrap === "object") {
      if (typeof nounTrap.rule === "string") requirements.push(nounTrap.rule.trim());
      if (typeof nounTrap.test === "string") requirements.push(nounTrap.test.trim());
    }
    const cliche = humanSpeech.cliche_phrases_to_avoid;
    if (cliche && typeof cliche === "object") {
      const neverUse = takeStrings(cliche.never_use, 6);
      if (neverUse.length) {
        requirements.push(`Never use cliché phrases such as: ${neverUse.join(", ")}.`);
      }
      if (typeof cliche.what_to_do === "string") requirements.push(cliche.what_to_do.trim());
    }
    const adjectiveOveruse = humanSpeech.adjective_overuse;
    if (adjectiveOveruse && typeof adjectiveOveruse === "object") {
      if (typeof adjectiveOveruse.rule === "string") requirements.push(adjectiveOveruse.rule.trim());
    }
    const coffeeTest = humanSpeech.the_coffee_shop_test;
    if (coffeeTest && typeof coffeeTest === "object" && typeof coffeeTest.instruction === "string") {
      requirements.push(coffeeTest.instruction.trim());
    }
  }

  const antiPatterns = guide.anti_patterns;
  if (antiPatterns && typeof antiPatterns === "object") {
    const bannedOpeners = antiPatterns.banned_opening_patterns;
    if (bannedOpeners && typeof bannedOpeners === "object") {
      const starters = takeStrings(bannedOpeners.never_start_sentences_with, 6);
      if (starters.length) {
        requirements.push(`Never start sentences with: ${starters.join(", ")}.`);
      }
      const alt = takeStrings(bannedOpeners.instead_start_with, 5);
      if (alt.length) {
        requirements.push(`Start with natural hooks like: ${alt.join(", ")}.`);
      }
    }
    const momTest = antiPatterns.the_mom_test;
    if (momTest && typeof momTest === "object") {
      if (typeof momTest.instruction === "string") requirements.push(momTest.instruction.trim());
      const banned = takeStrings(momTest.mom_would_never_say, 4);
      if (banned.length) requirements.push(`Mom would never say: ${banned.join(", ")}.`);
      if (typeof momTest.bonus_test === "string") requirements.push(momTest.bonus_test.trim());
    }
    const billboard = antiPatterns.the_billboard_test;
    if (billboard && typeof billboard === "object") {
      if (typeof billboard.question === "string" && typeof billboard.if_yes === "string") {
        requirements.push(`${billboard.question.trim()} ${billboard.if_yes.trim()}`);
      }
    }
  }

  const beforeAfter = guide.before_after_real_examples;
  if (beforeAfter && typeof beforeAfter === "object") {
    Object.values(beforeAfter)
      .map((entry) => (entry && typeof entry === "object" ? (entry as any).principle : ""))
      .filter((principle): principle is string => typeof principle === "string" && principle.trim().length > 0)
      .slice(0, 4)
      .forEach((principle) => requirements.push(principle.trim()));
  }

  const overview =
    overviewParts.length > 0
      ? `Rewrite the provided copy using Setel voice and guidelines: ${overviewParts.join(" ")}`
      : "";

  return { overview, requirements };
};

const getToneSequence = (guide: any): string[] => {
  return collectToneConfigs(guide).map((tone) => tone.label);
};

type TaskSpecLength = "short" | "medium" | "long";
type RewriteInstructionBundle = {
  text: string;
  coreText: string;
  optionalText: string;
  toneKey: string;
  lengthKey: TaskSpecLength;
};
type BuildRewriteOptions = {
  sourceText?: string;
  targetToneName?: string;
  targetToneKey?: string;
  toneNotes?: string[];
  intent?: RewriteIntent;
};

const TASK_SPEC_REMINDER = "Always follow TASK_SPEC exactly when choosing tone, length, and context.";
const JSON_RESPONSE_TEMPLATE = `Respond ONLY with valid JSON in this format:
{
  "variants": [
    {
      "tone": "<TONE_KEY>",
      "length": "<LENGTH_KEY>",
      "text": "..."
    }
  ]
}`;

const determineTaskSpecLengthKey = (preference?: LengthPreference | null): TaskSpecLength => {
  const label = (preference?.label || preference?.rangeHint || "").toLowerCase();
  if (label.includes("short")) return "short";
  if (label.includes("long")) return "long";
  if (label.includes("medium")) return "medium";
  if (preference?.maxChars && preference.maxChars <= 60) return "short";
  if (preference?.maxChars && preference.maxChars <= 100) return "medium";
  if (preference?.minChars && preference.minChars >= 120) return "long";
  return "medium";
};

const buildTaskSpecBlock = (toneKey: string, lengthKey: TaskSpecLength): string =>
  [
    "TASK_SPEC:",
    "  {",
    '    "task": "rewrite",',
    `    "tone": "${toneKey || "unspecified"}",`,
    `    "length": "${lengthKey}"`,
    "  }",
    "END_TASK_SPEC",
    "",
  ].join("\n");

type ModelVariant = {
  tone?: string;
  length?: string;
  text: string;
};

const sanitiseJsonStringLiterals = (value: string): string => {
  let result = "";
  let inString = false;
  let escaped = false;
  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];
    if (char === '"' && !escaped) {
      inString = !inString;
    }
    if (inString && (char === "\n" || char === "\r")) {
      result += "\\n";
      escaped = false;
      continue;
    }
    if (char === "\\" && !escaped) {
      escaped = true;
    } else {
      escaped = false;
    }
    result += char;
  }
  return result;
};

type JsonParseOptions = {
  stageLabel?: string;
  logError?: (stage: string, snippet: string, error?: string) => void;
};

const tryParseJson = (
  value: string,
  depth = 0,
  options?: JsonParseOptions
): unknown | null => {
  if (typeof value !== "string") return null;
  const trimmed = normaliseJsonQuotes(value.trim());
  if (!trimmed) return null;
  try {
    const parsed = JSON.parse(trimmed);
    if (
      typeof parsed === "string" &&
      depth < 2 &&
      (parsed.trim().startsWith("{") || parsed.trim().startsWith("["))
    ) {
      const nested = tryParseJson(parsed, depth + 1, options);
      if (nested) {
        return nested;
      }
    }
    return parsed;
  } catch (err) {
    if (options?.stageLabel && options?.logError) {
      const message =
        err && typeof err === "object" && "message" in err ? String((err as any).message) : String(err);
      options.logError(options.stageLabel, trimmed, message);
    }
    try {
      const parsed = JSON.parse(sanitiseJsonStringLiterals(trimmed));
      if (
        typeof parsed === "string" &&
        depth < 2 &&
        (parsed.trim().startsWith("{") || parsed.trim().startsWith("["))
      ) {
        const nested = tryParseJson(parsed, depth + 1, options);
        if (nested) {
          return nested;
        }
      }
      return parsed;
    } catch (err2) {
      if (options?.stageLabel && options?.logError) {
        const message =
          err2 && typeof err2 === "object" && "message" in err2 ? String((err2 as any).message) : String(err2);
        options.logError(options.stageLabel, trimmed, message);
      }
      return null;
    }
  }
};

const extractJsonSubstring = (value: string): string | null => {
  const start = value.indexOf("{");
  const end = value.lastIndexOf("}");
  if (start >= 0 && end > start) {
    return value.slice(start, end + 1);
  }
  return null;
};

const extractLooseVariantObjects = (source: string): string[] => {
  if (!source) return [];
  const marker = source.indexOf('"variants"');
  if (marker < 0) return [];
  const startBracket = source.indexOf("[", marker);
  if (startBracket < 0) return [];
  const blocks: string[] = [];
  let depth = 0;
  let inString = false;
  let escaped = false;
  let chunk = "";
  for (let i = startBracket + 1; i < source.length; i += 1) {
    const char = source[i];
    if (char === '"' && !escaped) {
      inString = !inString;
    }
    if (!inString && char === "{") {
      if (depth === 0) {
        chunk = "{";
      } else {
        chunk += "{";
      }
      depth += 1;
    } else if (!inString && char === "}") {
      if (depth > 0) {
        chunk += "}";
        depth -= 1;
        if (depth === 0 && chunk) {
          blocks.push(chunk);
          chunk = "";
        }
      }
    } else if (depth > 0) {
      chunk += char;
    }
    if (!inString && depth === 0 && char === "]") {
      break;
    }
    if (char === "\\" && !escaped) {
      escaped = true;
    } else {
      escaped = false;
    }
  }
  return blocks;
};

const extractVariantsJsonBlock = (source: string): string | null => {
  if (!source) return null;
  const lower = source.toLowerCase();
  const marker = lower.indexOf('"variants"');
  if (marker < 0) return null;
  const start = source.lastIndexOf("{", marker);
  if (start < 0) return null;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < source.length; i += 1) {
    const char = source[i];
    if (char === '"' && !escaped) {
      inString = !inString;
    }
    if (!inString) {
      if (char === "{") {
        depth += 1;
      } else if (char === "}") {
        depth -= 1;
        if (depth <= 0) {
          return source.slice(start, i + 1);
        }
      }
    }
    if (char === "\\" && !escaped) {
      escaped = true;
    } else {
      escaped = false;
    }
  }
  return null;
};

const logVariantParsingIssue = (stage: string, snippet: string, error?: string) => {
  if (!snippet) return;
  try {
    const preview = snippet.length > 360 ? snippet.slice(0, 360) + "…" : snippet;
    const label = error ? `${stage} (${error})` : stage;
    console.warn(`[rewrite] ${label}: ${preview}`);
  } catch (err) {
    console.warn("[rewrite] logging failed", err);
  }
};

const normalizeParsedVariants = (candidate: unknown): ModelVariant[] => {
  if (!candidate) return [];
  const potentialVariants = Array.isArray((candidate as any).variants)
    ? (candidate as any).variants
    : Array.isArray(candidate)
    ? (candidate as any)
    : [];
  if (!Array.isArray(potentialVariants)) return [];
  const normalized: ModelVariant[] = [];
  potentialVariants.forEach((entry) => {
    if (!entry || typeof entry !== "object") return;
    const rawText = typeof (entry as any).text === "string" ? (entry as any).text.trim() : "";
    if (!rawText) return;
    normalized.push({
      tone: typeof (entry as any).tone === "string" ? (entry as any).tone : "",
      length: typeof (entry as any).length === "string" ? (entry as any).length : "",
      text: rawText,
    });
  });
  return normalized;
};

const parseModelResponseVariants = (
  response: string,
  fallbackTone: string,
  fallbackLength: TaskSpecLength
): ModelVariant[] => {
  const trimmed = response.trim();
  if (!trimmed) return [];
  const parseSource = stripModelResponsePreface(trimmed) || trimmed;
  const attemptParse = (payload: string, label: string): unknown | null => {
    if (!payload) return null;
    return tryParseJson(payload, 0, {
      stageLabel: label,
      logError: logVariantParsingIssue,
    });
  };
  const extractNormalized = (candidate: unknown): ModelVariant[] | null => {
    if (!candidate) return null;
    const normalized = normalizeParsedVariants(candidate);
    return normalized.length ? normalized : null;
  };
  const attemptNormalized = (payload: string, label: string): ModelVariant[] | null => {
    const candidate = attemptParse(payload, label);
    return extractNormalized(candidate);
  };
  const variantsBlock = extractVariantsJsonBlock(parseSource);
  if (variantsBlock) {
    const blockNormalized = attemptNormalized(variantsBlock, "variants block parse");
    if (blockNormalized) {
      return blockNormalized;
    }
  }
  let parsedNormalized = attemptNormalized(parseSource, "raw response JSON parse");
  if (!parsedNormalized) {
    const substring = extractJsonSubstring(parseSource);
    if (substring) {
      parsedNormalized = attemptNormalized(substring, "substring parse");
    }
  }
  if (parsedNormalized) {
    return parsedNormalized;
  }
  const looseObjects = extractLooseVariantObjects(parseSource);
  if (looseObjects.length) {
    const approximations: ModelVariant[] = [];
    looseObjects.forEach((block) => {
      const parsed = tryParseJson(block);
      if (!parsed || typeof parsed !== "object") return;
      const tone = typeof (parsed as any).tone === "string" ? String((parsed as any).tone) : "";
      const length = typeof (parsed as any).length === "string" ? String((parsed as any).length) : "";
      const text =
        typeof (parsed as any).text === "string" ? String((parsed as any).text).trim() : "";
      if (text) {
        approximations.push({ tone, length, text });
      }
    });
    if (approximations.length) {
      return approximations;
    }
  }
  const plaintextCandidates = extractPlaintextVariantCandidates(parseSource);
  if (plaintextCandidates.length) {
    logVariantParsingIssue("plaintext candidate fallback", parseSource);
    return plaintextCandidates.map((text) => ({
      tone: fallbackTone,
      length: fallbackLength,
      text,
    }));
  }
  logVariantParsingIssue("final fallback", parseSource);
  return parseSource
    ? [{ tone: fallbackTone, length: fallbackLength, text: parseSource }]
    : [];
};

const flattenVariantOutputs = (entries: string[]): string[] => {
  if (!entries.length) return entries;
  const flattened: string[] = [];
  let changed = false;
  entries.forEach((entry) => {
    const trimmed = (entry || "").trim();
    if (trimmed.startsWith("{") && trimmed.includes('"variants"')) {
      const block = extractVariantsJsonBlock(trimmed) || trimmed;
      const parsed = tryParseJson(block);
      const normalized = parsed ? normalizeParsedVariants(parsed) : [];
      if (normalized.length) {
        normalized.forEach((variant) => flattened.push(variant.text));
        changed = true;
        return;
      }
    }
    flattened.push(entry);
  });
  return changed ? flattened : entries;
};

const dedupeVariantOutputs = (entries: string[]): string[] => {
  if (!entries.length) return entries;
  const seen = new Set<string>();
  const deduped: string[] = [];
  entries.forEach((entry) => {
    const key = normalizeVariantForComparison(entry);
    if (!key) return;
    if (seen.has(key)) return;
    seen.add(key);
    deduped.push(entry);
  });
  return deduped;
};

const extractPlaintextVariantCandidates = (raw: string): string[] => {
  if (!raw) return [];
  const expanded = raw.replace(/(\d+[\.)-])/g, "\n$1");
  let blocks = expanded.split(/\n{2,}/);
  if (blocks.length === 1) {
    blocks = expanded.split(/\n+/);
  }
  const isInstructionalBlock = (value: string) =>
    /^###\s+VARIANT/i.test(value) ||
    /^TASK_SPEC/i.test(value) ||
    /^Respond\s+with/i.test(value) ||
    /^Return each variant/i.test(value) ||
    /^Rewrite the copy/i.test(value) ||
    /^JSON_RESPONSE_TEMPLATE/i.test(value) ||
    /^Your variants array/i.test(value) ||
    /^Keep these exact source terms/i.test(value);
  const isLikelyCopyLine = (value: string) => value.length >= 15 && /\s/.test(value);
  const isMetaComment = (value: string) => {
    const lower = value.toLowerCase();
    return (
      lower.includes("source copy") ||
      lower.includes("assumed intent") ||
      lower.includes("not provided in the prompt") ||
      lower.includes("based on the instructions")
    );
  };

  const cleanedBlocks = blocks
    .map((block) =>
      block
        .replace(/[*_`]/g, "")
        .replace(/^\d+[\.)-]*\s*/, "")
        .replace(/^[-•*]+\s*/, "")
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter((block) => block && !isInstructionalBlock(block));

  if (cleanedBlocks.length <= 1) {
    return cleanedBlocks.filter(isLikelyCopyLine);
  }

  return cleanedBlocks.filter((block) => {
    if (!isLikelyCopyLine(block)) return false;
    const lower = block.toLowerCase();
    if (isMetaComment(block)) return false;
    if (
      lower.startsWith('"tone"') ||
      lower.startsWith('"length"') ||
      lower.startsWith('"text"')
    )
      return false;
    if (/^(tone|length|text)\s*[:=]/i.test(block)) return false;
    if (/^\{/.test(block) && block.endsWith("}")) {
      try {
        const parsed = JSON.parse(block);
        if (typeof parsed === "object" && parsed && typeof (parsed as any).text === "string") {
          return true;
        }
      } catch (err) {
        console.warn("Ignoring malformed JSON block from model output:", err);
        return false;
      }
    }
    return true;
  });
};

const buildRewriteInstructions = (guide: any, options?: BuildRewriteOptions): RewriteInstructionBundle => {
  const fallbackOverview =
    "Rewrite provided copy for Setel, Malaysia’s all‑in‑one motoring app at PETRONAS, following every rule below.";
  if (!guide || typeof guide !== "object") {
    const lengthKey = determineTaskSpecLengthKey(null);
    const toneLabel = options?.targetToneKey || "neutral_helpful";
    const fallbackSpec = buildTaskSpecBlock(toneLabel, lengthKey);
    const text = `${fallbackSpec}${fallbackOverview}\n\n`;
    return {
      text,
      coreText: text,
      optionalText: "",
      toneKey: toneLabel,
      lengthKey,
    };
  }

  const promptCfg = (guide as any).rewritePrompt || {};
  const derived = deriveGuidePrompt(guide);
  const manualConstraints = (guide as any).manualConstraints;
  const manualAvoidPhrases =
    manualConstraints && typeof manualConstraints === "object"
      ? takeStrings((manualConstraints as any).avoid, 10)
      : [];
  const forcedTone =
    typeof options?.targetToneName === "string" && options.targetToneName.trim().length
      ? options.targetToneName.trim()
      : "";
  const toneNotesSource = options?.toneNotes;
  const toneNotes = Array.isArray(toneNotesSource)
    ? toneNotesSource.map((note) => (typeof note === "string" ? note.trim() : "")).filter(Boolean)
    : [];
  const intent: RewriteIntent = options?.intent === "prompt" ? "prompt" : "rewrite";
  const toneNames = forcedTone ? [forcedTone] : getToneSequence(guide);
  const overview =
    (typeof promptCfg.overview === "string" && promptCfg.overview.trim().length
      ? promptCfg.overview.trim()
      : derived.overview) || fallbackOverview;

  const baseRequirements: string[] = Array.isArray(promptCfg.requirements)
    ? promptCfg.requirements.filter(
        (item: unknown): item is string => typeof item === "string" && item.trim().length > 0
      )
    : [];

  const enrichedRequirements: string[] = [...derived.requirements];
  const priorityRules: string[] = [];
  const pushRequirement = (value?: string) => {
    if (!value) return;
    const trimmed = value.trim();
    if (trimmed.length) enrichedRequirements.push(trimmed);
  };
  const optionalGuidanceSections: string[] = [];
  const toneSpecKey = options?.targetToneKey || "";
  pushRequirement(TASK_SPEC_REMINDER);
  pushRequirement(JSON_RESPONSE_TEMPLATE);

  pushRequirement(
    "For every JSON variant, keep the text value limited to the final UX copy only—no labels, intros, or commentary."
  );
  pushRequirement(
    "Each JSON variant must contain exactly one rewrite; never include multiple options, bullet lists, or extra framing."
  );
  pushRequirement(
    "Speak directly to the end-user; never mention rewrites, options, or that you're providing variations."
  );
  pushRequirement(
    "Remove conversational framing or meta-commentary entirely—no phrases like “We understand…”, “Let’s…”, “Here’s…”, or anything that references the request; start immediately with the final UX copy."
  );
  pushRequirement(
    "Skip pleasantries or commentary about what the reader is doing (e.g., “It's great you're looking…”); lead with the product benefit or action."
  );
  pushRequirement(
    "Never mention missing source copy, assumed intent, or that you're inferring context—just deliver the final rewrite, even if the prompt feels incomplete."
  );
  pushRequirement("Use at most two short sentences and state each fact only once (no repetition).");
  pushRequirement(
    "Change the sentence rhythm, verbs, and descriptive words for each tone so the emotional intent is obvious; never recycle the same hero verb across variants."
  );
  pushRequirement(
    "Keep the meaning and include all required keywords, but rephrase everything else using different wording; do not reuse longer phrases (more than 2–3 words) from the original unless they are required keywords or product names."
  );
  if (intent === "prompt") {
    pushRequirement(
      "Create original UX copy that fulfils the user brief; treat their text as instructions, not content to restate."
    );
  } else {
    pushRequirement("Rewrite the provided copy so it keeps the same intent and facts while following every rule above.");
  }
  if (forcedTone) {
    pushRequirement(
      `Write this variant strictly in the ${forcedTone} tone, but never mention the tone name or describe it in the output.`
    );
    pushRequirement(
      "Make the tone felt through word choice, cadence, and punctuation; use the tone brief (traits, structure cue, how-to) to guide vocabulary."
    );
    toneNotes.forEach((note) => pushRequirement(note));
  } else if (toneNames.length) {
    pushRequirement(
      `Provide one variant per tone (in this order: ${toneNames.join(
        ", "
      )}); write each in its tone without referencing tone names in the copy.`
    );
  }
  const cleanedManualAvoid = manualAvoidPhrases
    .map((phrase) => phrase.trim())
    .filter((phrase) => phrase && !isVoiceDescriptorWord(phrase));
  if (cleanedManualAvoid.length === 1) {
    priorityRules.push(
      `Do not use the word or phrase "${cleanedManualAvoid[0]}" anywhere in your rewrite.`
    );
  } else if (cleanedManualAvoid.length > 1) {
    priorityRules.push(
      `Avoid using any of these words or phrases in your rewrite: ${cleanedManualAvoid.join(", ")}.`
    );
  }
  pushRequirement(
    "Never print standalone variant text outside the JSON response—populate only the JSON `variants[].text` fields."
  );
  pushRequirement(
    "Vary the opening words across variants; if one starts with a specific word or phrase (e.g., “Remember needing…”), every other rewrite must begin differently and avoid repeating that same opener."
  );

  const selectedLength = getLengthPreference(guide);
  if (selectedLength) {
    const descriptor = selectedLength.label ? `${selectedLength.label} length` : "Target length";
    const rangeLine = selectedLength.rangeHint
      ? `${descriptor}: ${selectedLength.rangeHint}.`
      : `${descriptor}.`;
    const extraParts = [
      ensureSentence(selectedLength.structure),
      ensureSentence(selectedLength.description),
    ].filter(Boolean);
    pushRequirement([rangeLine, ...extraParts].join(" ").trim());
  }

  const sentenceHints = collectSentenceLibraryHints(guide);
  sentenceHints.forEach((hint) => {
    const cleaned = sanitisePromptText(hint);
    if (cleaned) optionalGuidanceSections.push(cleaned);
  });

  const haystackParts = [];
  if (options && typeof options.sourceText === "string") {
    haystackParts.push(options.sourceText);
  }
  const haystackSource = haystackParts.join(" ");
  const trimmedSourceText = options && typeof options.sourceText === "string" ? options.sourceText.trim() : "";
  const scenarioHints = collectScenarioHints(guide, haystackSource);
  scenarioHints.forEach((hint) => {
    const cleaned = sanitisePromptText(hint);
    if (cleaned) optionalGuidanceSections.push(cleaned);
  });
  const pronounPattern = /\b(?:we|us|our|ours|you|your|yours)\b/i;
  const sourceHasPronoun = trimmedSourceText.length > 0 ? pronounPattern.test(trimmedSourceText) : false;
  const structureReminder = trimmedSourceText
    ? "Preserve the structural pattern (pronoun pattern, sentence count, sentence type, and length band) from the original and keep your tone choices within those features."
    : "";

  const finalRequirements = [...baseRequirements, ...enrichedRequirements];
  if (trimmedSourceText && !sourceHasPronoun) {
    finalRequirements.push(
      "If the source copy avoids first- and second-person pronouns, keep your rewrite pronoun-free unless the same pronouns appear in the prompt."
    );
  }
  if (structureReminder) {
    finalRequirements.push(structureReminder);
  }
  if (trimmedSourceText) {
    finalRequirements.push(`Core intent: ${ensureSentence(trimmedSourceText)}`);
    const actionIntent = deriveActionOutcomeHint(trimmedSourceText);
    if (actionIntent) {
      finalRequirements.push(actionIntent);
    }
  }
  const preservedTerms = collectSourceKeywords(trimmedSourceText);
  if (preservedTerms.length) {
    finalRequirements.push(
      `Keep these exact source terms (and their casing) in every rewrite: ${preservedTerms.join(
        ", "
      )}.`
    );
  }
  const joinedRequirements = finalRequirements.length
    ? finalRequirements.map((req) => "- " + req).join("\n") + "\n\n"
    : "\n";
  const priorityBlock = priorityRules.length
    ? `Rewrite the copy below. Apply these priority instructions first:\n${priorityRules
        .map((rule) => "- " + rule)
        .join("\n")}\n\n`
    : "Rewrite the copy below using Setel’s UX guidelines.\n\n";
  const lengthKey = determineTaskSpecLengthKey(selectedLength);
  const specBlock = buildTaskSpecBlock(toneSpecKey, lengthKey);
  const overviewBlock = overview ? overview + "\n" : "\n";
  const coreInstructionBody = priorityBlock + overviewBlock + joinedRequirements;
  const coreText = specBlock + coreInstructionBody;
  const optionalBlock =
    optionalGuidanceSections.length > 0
      ? optionalGuidanceSections.map((item) => "- " + item).join("\n") + "\n\n"
      : "";
  const text = coreText + optionalBlock;
  return {
    text,
    coreText,
    optionalText: optionalBlock,
    toneKey: toneSpecKey,
    lengthKey,
  };
};

const runRewriteCycle = async (msg: any, resetCycle: boolean) => {
  const key: string = String(msg.key || "");
  const text: string = sanitisePromptText(String(msg.text || ""));
  const guideline = msg.guideline || guidelineReference || {};
  let output = "";
  let encounteredError = false;
  const PROMPT_TOKEN_LIMIT = 6000;
  const TOKEN_APPROX_DIVISOR = 4;
  const PROMPT_CHAR_LIMIT = PROMPT_TOKEN_LIMIT * TOKEN_APPROX_DIVISOR;
  const cycleVersion = deriveGuideVersion(guideline);
  const cycleSignature = buildCycleSignature(text, cycleVersion);
  if (resetCycle || cycleSignature !== toneCycleSignature) {
    toneCycleSignature = cycleSignature;
    toneCycleIndex = 0;
    toneCycleCompleted = false;
  }

  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=" +
    encodeURIComponent(key);

  const callModel = async (prompt: string) => {
    const body = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 1.0,
        top_p: 0.9,
        maxOutputTokens: 512,
      },
    };
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error("API error " + res.status + ": " + (await res.text()));
    }
    const data = await res.json();
    let textOut = "";
    if (
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text
    ) {
      textOut = String(data.candidates[0].content.parts[0].text);
    }
    return textOut ? textOut.trim() : "No response.";
  };

  const intent: RewriteIntent = msg.mode === "prompt" ? "prompt" : "rewrite";
  const toneConfigs = collectToneConfigs(guideline);
  const cycleNotice = "You’ve reached the end of the tone cycle for this prompt—adjust your copy to start again.";

  if (toneCycleCompleted || toneCycleIndex >= toneConfigs.length) {
    toneCycleCompleted = true;
    figma.notify(cycleNotice);
    output = cycleNotice;
    encounteredError = true;
    figma.ui.postMessage({ type: "rewrite-done", output, error: encounteredError });
    return;
  }

  const selectedToneConfigs = toneConfigs.slice(
    toneCycleIndex,
    toneCycleIndex + TONES_PER_CYCLE
  );
  if (!selectedToneConfigs.length) {
    toneCycleCompleted = true;
    figma.notify(cycleNotice);
    output = cycleNotice;
    encounteredError = true;
    figma.ui.postMessage({ type: "rewrite-done", output, error: encounteredError });
    return;
  }

  const variants: string[] = [];
  const variantFingerprints = new Set<string>();
  const markVariantSeen = (text: string) => {
    const key = normalizeVariantForComparison(text);
    if (key) {
      variantFingerprints.add(key);
    }
  };
  const hasSeenVariant = (text: string) => {
    const key = normalizeVariantForComparison(text);
    return key ? variantFingerprints.has(key) : false;
  };
  const isDisallowedVariantText = (value: string) => {
    const lower = value.toLowerCase();
    return (
      lower.includes("source copy") ||
      lower.includes("assumed intent") ||
      lower.includes("not provided in the prompt")
    );
  };

  const sourceLabel = intent === "prompt" ? "User prompt:\n" : "User copy:\n";

  try {
    const cycleInstruction = (toneGuide: any, toneConfig: ToneConfig) =>
      buildRewriteInstructions(toneGuide, {
        sourceText: text,
        targetToneName: toneConfig.label,
        targetToneKey: toneConfig.key,
        toneNotes: toneConfig.notes,
        intent,
      });

    type ToneTask = {
      toneConfig: ToneConfig;
      instructions: RewriteInstructionBundle;
      resultText: string;
    };

    const toneTasks: ToneTask[] = selectedToneConfigs.map((toneConfig) => {
      const toneName = toneConfig.label;
      const toneGuide =
        guideline && typeof guideline === "object"
          ? Object.assign({}, guideline, { tonePreference: toneName })
          : { tonePreference: toneName };
      return {
        toneConfig,
        instructions: cycleInstruction(toneGuide, toneConfig),
        resultText: "",
      };
    });

    const buildTaskSection = (task: ToneTask, index: number, useCoreText: boolean) => {
      const body = useCoreText ? task.instructions.coreText : task.instructions.text;
      return [`### VARIANT ${index + 1} – Tone ${task.toneConfig.label}`, body].join("\n");
    };

    const uniquenessReminder = [
      "Respond with valid JSON exactly matching JSON_RESPONSE_TEMPLATE.",
      "Your variants array must contain one entry per task above, in the same order.",
      "Each entry must include the tone and length from its TASK_SPEC block.",
      "Every variant must sound distinct—rewrite it if any two openings or phrasings feel similar.",
      "Let each tone's traits dictate different verbs, cadence, and punctuation so the emotional energy clearly shifts between variants.",
    ].join(" ");

    type PromptSegments = {
      full: string;
      instructions: string;
      source: string;
    };

    const buildPromptSegments = (tasks: ToneTask[], useCoreText = false): PromptSegments => {
      const sections = tasks
        .map((task, idx) => buildTaskSection(task, idx, useCoreText))
        .join("\n\n");
      const instructionsBlock = `${sections}\n\n${uniquenessReminder}`.trim();
      const sourceBlock = `${sourceLabel}${text}`;
      const fullPrompt = instructionsBlock ? `${instructionsBlock}\n\n${sourceBlock}` : sourceBlock;
      return {
        full: fullPrompt,
        instructions: instructionsBlock,
        source: sourceBlock,
      };
    };

    const isWithinPromptLimit = (value: string) =>
      Math.floor(value.length / TOKEN_APPROX_DIVISOR) <= PROMPT_TOKEN_LIMIT;

    const clampPromptToLimit = (segments: PromptSegments): string => {
      const sourceBlock = segments.source;
      const hasSource = sourceBlock.trim().length > 0;
      if (!hasSource) {
        return segments.full.slice(0, PROMPT_CHAR_LIMIT).trim();
      }
      if (sourceBlock.length >= PROMPT_CHAR_LIMIT) {
        return sourceBlock.slice(0, PROMPT_CHAR_LIMIT);
      }
      const delimiter = "\n\n";
      const instructionsBudget = Math.max(
        PROMPT_CHAR_LIMIT - sourceBlock.length - delimiter.length,
        0
      );
      const trimmedInstructions =
        instructionsBudget > 0 ? segments.instructions.slice(0, instructionsBudget).trimEnd() : "";
      const prefix = trimmedInstructions ? `${trimmedInstructions}${delimiter}` : "";
      return `${prefix}${sourceBlock}`;
    };

    const composePrompt = (tasks: ToneTask[]) => {
      const primary = buildPromptSegments(tasks, false);
      if (isWithinPromptLimit(primary.full)) {
        return primary.full;
      }
      const fallback = buildPromptSegments(tasks, true);
      if (isWithinPromptLimit(fallback.full)) {
        return fallback.full;
      }
      return clampPromptToLimit(fallback);
    };

    const findMatchingTask = (tone?: string): ToneTask | null => {
      const normalized = normalizeToneKeyValue(tone);
      if (!normalized) return null;
      return (
        toneTasks.find((task) => {
          if (task.resultText) return false;
          const candidates = [
            normalizeToneKeyValue(task.instructions.toneKey),
            normalizeToneKeyValue(task.toneConfig.key),
            normalizeToneKeyValue(task.toneConfig.label),
          ].filter(Boolean);
          return candidates.some((candidate) => candidate === normalized);
        }) || null
      );
    };

    const assignVariants = (entries: ModelVariant[], allowDuplicates = false) => {
      entries.forEach((entry) => {
        const rawText = typeof entry.text === "string" ? entry.text.trim() : "";
        if (!rawText) return;
        if (isDisallowedVariantText(rawText)) return;
        if (!allowDuplicates && hasSeenVariant(rawText)) return;
        const targetTask = findMatchingTask(entry.tone) || toneTasks.find((task) => !task.resultText);
        if (!targetTask) return;
        const cleaned = obliterateEmDash(rawText);
        if (!allowDuplicates) {
          markVariantSeen(cleaned);
        }
        targetTask.resultText = cleaned;
      });
    };

    const getTaskResultTexts = () => toneTasks.map((task) => task.resultText || "");

    const pruneDuplicateTaskResults = () => {
      const seen = new Set<string>();
      let cleared = false;
      toneTasks.forEach((task) => {
        const text = (task.resultText || "").trim();
        if (!text) return;
        const key = normalizeVariantForComparison(text);
        if (!key) return;
        if (seen.has(key)) {
          task.resultText = "";
          cleared = true;
        } else {
          seen.add(key);
        }
      });
      return cleared;
    };

    const desiredVariantCount = selectedToneConfigs.length;
    const hasCompleteSet = () => toneTasks.every((task) => (task.resultText || "").trim().length > 0);
    const uniqueVariantCount = () =>
      dedupeVariantOutputs(getTaskResultTexts().filter((value) => value.trim().length > 0)).length;

    const selectPendingTasks = () => toneTasks.filter((task) => !(task.resultText || "").trim());

    let attempt = 0;
    while (uniqueVariantCount() < desiredVariantCount && attempt < MAX_VALIDATION_ATTEMPTS) {
      const pendingTasks = selectPendingTasks();
      if (!pendingTasks.length) {
        if (!pruneDuplicateTaskResults()) {
          break;
        }
        continue;
      }
      attempt += 1;
      const variantText = await callModel(composePrompt(pendingTasks));
      const cleanedVariant = typeof variantText === "string" ? variantText.trim() : "";
      if (!cleanedVariant) {
        continue;
      }
      const parsedVariants = parseModelResponseVariants(
        cleanedVariant,
        pendingTasks[0]?.instructions.toneKey || toneTasks[0]?.instructions.toneKey || "",
        pendingTasks[0]?.instructions.lengthKey ||
          toneTasks[0]?.instructions.lengthKey ||
          determineTaskSpecLengthKey(null)
      );
      assignVariants(parsedVariants, false);
      const fallbackEntries = extractPlaintextVariantCandidates(
        stripModelResponsePreface(cleanedVariant)
      ).map((text) => ({
        text,
      }));
      assignVariants(fallbackEntries, false);
      pruneDuplicateTaskResults();
    }
    pruneDuplicateTaskResults();

    toneTasks.forEach((task) => {
      variants.push(task.resultText || "No response.");
    });

    toneCycleIndex += selectedToneConfigs.length;
    if (toneCycleIndex >= toneConfigs.length) {
      toneCycleCompleted = true;
    }

    const flattenedVariants = flattenVariantOutputs(variants);
    const uniqueVariants = dedupeVariantOutputs(flattenedVariants);
    const suggestionLines: string[] = uniqueVariants.map((line, idx) => `${idx + 1}. ${line}`);
    if (!suggestionLines.length) {
      encounteredError = true;
      output = "No response.";
    } else {
      output = suggestionLines.join("\n\n");
    }
  } catch (err: any) {
    encounteredError = true;
    output = "Request failed: " + describeError(err);
  }

  figma.ui.postMessage({ type: "rewrite-done", output, error: encounteredError });
};

const loadFontsForNode = async (node: TextNode) => {
  const uniqueFonts: FontName[] = [];
  const registerFont = (font: FontName | typeof figma.mixed) => {
    if (font === figma.mixed) return;
    if (!uniqueFonts.some((item) => item.family === font.family && item.style === font.style)) {
      uniqueFonts.push(font);
    }
  };
  if (node.fontName === figma.mixed) {
    const length = node.characters.length;
    if (length > 0) {
      const fonts = node.getRangeAllFontNames(0, length);
      fonts.forEach((font) => registerFont(font));
    } else {
      registerFont(node.fontName);
    }
  } else {
    registerFont(node.fontName);
  }
  for (const font of uniqueFonts) {
    await figma.loadFontAsync(font);
  }
};

const MAX_VALIDATION_ATTEMPTS = 6;
const UI_WIDTH = 720;
const MIN_UI_HEIGHT = 348;
const MAX_UI_HEIGHT = 900;

figma.on("run", () => {
  figma.showUI(__html__, { width: UI_WIDTH, height: MIN_UI_HEIGHT });
  figma.ui.postMessage({
    type: "guideline-default",
    guideline: guidelineReference,
  });

  const sendSelectionToUI = () => {
    const selection = figma.currentPage.selection;
    for (const node of selection) {
      if (node.type === "TEXT") {
        const text = String(node.characters || "");
        figma.ui.postMessage({
          type: "selection-text",
          text,
        });
        return;
      }
    }

    // No text layer selected
    figma.ui.postMessage({ type: "selection-text", text: "" });
  };

  sendSelectionToUI();
  figma.on("selectionchange", sendSelectionToUI);

  figma.ui.onmessage = async (msg: any) => {
    try {
      if (!msg || !msg.type) return;

      if (msg.type === "request-guideline") {
        figma.ui.postMessage({
          type: "guideline-default",
          guideline: guidelineReference,
        });
        return;
      }

      if (msg.type === "resize-ui") {
        const requestedHeight = Number(msg.height);
        if (!Number.isFinite(requestedHeight)) return;
        const clampedHeight = Math.max(
          MIN_UI_HEIGHT,
          Math.min(Math.round(requestedHeight), MAX_UI_HEIGHT)
        );
        figma.ui.resize(UI_WIDTH, clampedHeight);
        return;
      }

      // SETTINGS: Save key
      if (msg.type === "save-key") {
        const keyToSave = String(msg.key || "");
        try {
          await figma.clientStorage.setAsync("gemini_api_key", keyToSave);
          figma.ui.postMessage({ type: "key-saved", key: keyToSave });
        } catch (e: any) {
            figma.ui.postMessage({
              type: "key-saved",
              key: keyToSave,
              error: describeError(e),
            });
        }
        return;
      }

      // SETTINGS: Load key
      if (msg.type === "load-key") {
        try {
          const saved = (await figma.clientStorage.getAsync("gemini_api_key")) || "";
          figma.ui.postMessage({ type: "key-loaded", key: String(saved) });
        } catch (e: any) {
            figma.ui.postMessage({
              type: "key-loaded",
              key: "",
              error: describeError(e),
            });
        }
        return;
      }

      if (msg.type === "rewrite" || msg.type === "cycle-tone") {
        await runRewriteCycle(msg, msg.type === "rewrite");
        return;
      }

      if (msg.type === "reset-tone-cycle") {
        toneCycleSignature = "";
        toneCycleIndex = 0;
        toneCycleCompleted = false;
        return;
      }

      if (msg.type === "apply-text") {
        const nextText = typeof msg.text === "string" ? msg.text : "";
        if (!nextText.trim().length) {
          figma.notify("Suggestion is empty. Select another option.");
          return;
        }
        const textNode = figma.currentPage.selection.find(
          (node): node is TextNode => node.type === "TEXT"
        );
        if (!textNode) {
          figma.notify("Select a text layer in Figma to apply the copy.");
          return;
        }
        try {
          await loadFontsForNode(textNode);
          textNode.characters = nextText;
          figma.ui.postMessage({ type: "selection-text", text: nextText });
          figma.notify("Copy applied to your selection.");
        } catch (err: any) {
          figma.notify("Couldn't apply copy: " + describeError(err));
        }
        return;
      }
    } catch (e: any) {
      figma.ui.postMessage({ type: "error", error: describeError(e) });
    }
  };
});
