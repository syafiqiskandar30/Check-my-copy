// src/code.ts — single Gemini handler, UI loaded from manifest
import guidelineReference from "./guideline.json";

const describeError = (err: any) =>
  err && err.message ? String(err.message) : String(err);

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

type ToneConfig = { label: string; notes: string[] };
type RewriteIntent = "rewrite" | "prompt";

const collectToneConfigs = (guide: any): ToneConfig[] => {
  const palette = guide?.tone_palette;
  const available = palette?.available_tones;
  if (available && typeof available === "object") {
    return Object.entries(available)
      .map(([key, entry]) => {
        if (!entry || typeof entry !== "object") return null;
        const labelCandidate = formatGuideText((entry as any).ui_label) || toFriendlyCase(key);
        if (!labelCandidate) return null;
        const notes: string[] = [];
        const blend = formatGuideText((entry as any).blend);
        if (blend) notes.push(`Blend: ${blend}.`);
        const when = formatGuideText((entry as any).when);
        if (when) notes.push(`Context: ${when}.`);
        const qualities = formatGuideText((entry as any).qualities);
        if (qualities) notes.push(`Qualities: ${qualities}.`);
        const how = formatGuideText((entry as any).how);
        if (how) notes.push(`How: ${how}.`);
        const avoid = formatGuideText((entry as any).avoid);
        if (avoid) notes.push(`Avoid: ${avoid}.`);
        const example = formatGuideText((entry as any).example);
        if (example) notes.push(`Example tone: ${example}.`);
        return { label: labelCandidate, notes };
      })
      .filter((tone): tone is ToneConfig => Boolean(tone && tone.label))
      .slice(0, DEFAULT_TONE_NAMES.length);
  }
  return DEFAULT_TONE_NAMES.map((label) => ({ label, notes: [] }));
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

const deriveGuidePrompt = (guide: any) => {
  if (!guide || typeof guide !== "object") {
    return { overview: "", requirements: [] as string[] };
  }

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
  const bannedTerms = takeStrings(bannedTermsSource, 6);
  if (bannedTerms.length) {
    requirements.push(`Banned terms: ${bannedTerms.join(", ")}.`);
  }

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
      ? `You are Setel’s UX writing assistant. ${overviewParts.join(" ")}`
      : "";

  return { overview, requirements };
};

const getToneSequence = (guide: any): string[] => {
  return collectToneConfigs(guide).map((tone) => tone.label);
};

const buildRewriteInstructions = (
  guide: any,
  options?: { sourceText?: string; targetToneName?: string; toneNotes?: string[]; intent?: RewriteIntent }
) => {
  const fallbackOverview =
    "You are a UX writing assistant for Setel, Malaysia’s all‑in‑one motoring app at PETRONAS.";
  if (!guide || typeof guide !== "object") {
    return fallbackOverview;
  }

  const promptCfg = (guide as any).rewritePrompt || {};
  const derived = deriveGuidePrompt(guide);
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
  const pushRequirement = (value?: string) => {
    if (!value) return;
    const trimmed = value.trim();
    if (trimmed.length) enrichedRequirements.push(trimmed);
  };

  pushRequirement(
    "Provide a mix of short (≤45 characters), medium (~65 characters), and longer (≤110 characters) rewrites, but output only the final copy text with no labels or descriptors."
  );
  pushRequirement(
    "Output exactly one rewrite for this request—no introductions, lists, or conversational framing."
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
  pushRequirement("Use at most two short sentences and state each fact only once (no repetition).");
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
    toneNotes.forEach((note) => pushRequirement(note));
  } else if (toneNames.length) {
    pushRequirement(
      `Provide one variant per tone (in this order: ${toneNames.join(
        ", "
      )}); write each in its tone without referencing tone names in the copy.`
    );
  }
  pushRequirement(
    "Return each variant on its own line with no bullets, numbering, headers, or conversational lead-ins—only the rewritten copy."
  );

  const usageContext =
    typeof (guide as any).usageContext === "string" ? (guide as any).usageContext.trim() : "";
  if (usageContext) {
    pushRequirement(`Follow this context and custom guidance: ${usageContext}`);
  }

  const haystackParts = [];
  if (options && typeof options.sourceText === "string") {
    haystackParts.push(options.sourceText);
  }
  if (usageContext) {
    haystackParts.push(usageContext);
  }
  const haystackSource = haystackParts.join(" ");
  collectScenarioHints(guide, haystackSource).forEach((hint) => pushRequirement(hint));

  const finalRequirements = [...baseRequirements, ...enrichedRequirements];
  const joinedRequirements = finalRequirements.length
    ? finalRequirements.map((req) => "- " + req).join("\n") + "\n\n"
    : "\n";

  return overview + "\n" + joinedRequirements;
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

const UI_WIDTH = 400;
const MIN_UI_HEIGHT = 400;
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

      // REWRITE: Call Gemini
      if (msg.type === "rewrite") {
        const key: string = String(msg.key || "");
        const text: string = String(msg.text || "");
        const guideline = msg.guideline || guidelineReference || {};
        let output = "";
        let encounteredError = false;

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

        try {
          const intent: RewriteIntent = msg.mode === "prompt" ? "prompt" : "rewrite";
          const toneConfigs = collectToneConfigs(guideline);
          const variants: string[] = [];
          for (const toneConfig of toneConfigs) {
            const toneName = toneConfig.label;
            const toneGuide =
              guideline && typeof guideline === "object"
                ? Object.assign({}, guideline, { tonePreference: toneName })
                : { tonePreference: toneName };
            const instructions = buildRewriteInstructions(toneGuide, {
              sourceText: text,
              targetToneName: toneName,
              toneNotes: toneConfig.notes,
              intent,
            });
            const prompt =
              instructions +
              "Return exactly one unique variant with no extra commentary.\n\n" +
              (intent === "prompt" ? "User prompt:\n" : "User copy:\n") +
              text;
            const variantText = await callModel(prompt);
            const cleanedVariant = typeof variantText === "string" ? variantText.trim() : "";
            if (cleanedVariant) {
              variants.push(cleanedVariant);
            }
          }
          output = variants.map((line, idx) => `${idx + 1}. ${line}`).join("\n\n");
        } catch (err: any) {
          encounteredError = true;
          output = "Request failed: " + describeError(err);
        }

        figma.ui.postMessage({ type: "rewrite-done", output, error: encounteredError });
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
