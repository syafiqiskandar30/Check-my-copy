"use strict";
(() => {
  // src/guideline.json
  var guideline_default = {
    meta: {
      version: "3.0",
      purpose: "Lean Setel UX writing rules for LLM rewrites",
      last_updated: "2025-01-15"
    },
    company_profile: {
      target_audience: "Setel customers aged 18-55 across Malaysia"
    },
    core_identity: {
      voice: "Warm, Friendly, Caring",
      golden_rule: "If your rewrite feels cold, corporate, or robotic, you've failed. Core voice always wins.",
      north_star: "Write like you're helping a friend, not completing a transaction.",
      critical_truth: "You are not writing marketing copy. If it sounds like a billboard, TV ad, or corporate website, start over."
    },
    manualConstraints: {
      core_instructions: [
        "You are a senior UX writer for Setel-warm, friendly, caring, and human. Avoid corporate or marketing jargon.",
        "Understand the intent, not just the source words. Preserve meaning, required keywords, pronoun pattern, and the same sentence count/type and length band.",
        "Rewrite with fresh wording and a different angle; do not lift more than 2-3 consecutive words unless they are required terms or product names.",
        "Avoid marketing formulas and corporate buzzwords. Never sound like a billboard or TV ad.",
        'Never blame the user. Use "we" to own issues caused by the product.',
        "Never mention that you're rewriting or generating copy."
      ],
      must: [
        "Stay within the selected length band and keep sentences tight.",
        "Use British English and Setel formatting rules.",
        "Keep the UX actionable with a clear next step when relevant."
      ],
      avoid: [
        "Marketing hype and clich\xE9s",
        "Repeating the same hero verb or key noun in a sentence",
        "Adding new first- or second-person pronouns when the source avoided them"
      ],
      reminders: [
        "Change rhythm and verbs across variants so each feels distinct.",
        "Treat tone cues as style guidance, not templates."
      ],
      play_zones: [
        "Marketing headlines",
        "Push notifications",
        "Celebration moments",
        "Friendly error messages"
      ],
      no_play_zones: [
        "Critical errors",
        "Regulatory or payment confirmations",
        "Security or verification steps"
      ],
      immutable_rules: [
        "Follow forbidden language and banned terms.",
        "Respect brand vocabulary and product names.",
        "Keep pronoun rules intact."
      ],
      required: [],
      avoid_keywords: []
    },
    tone_palette: {
      how_to_use: "Pick the tone that fits the situation. Use traits and syntactic elements as flexible style cues, not templates or required words.",
      available_tones: {
        friendly: {
          blend: "Friendly + Warm",
          ui_label: "Friendly",
          traits: "Warm, approachable, relatable, and casual.",
          syntactic_elements: "Natural, everyday phrasing with straightforward verbs and warm descriptions. Keep the flow flexible and human.",
          tone_markers: ["easy", "warm", "all set", "good to go"],
          example: "Fuel up with Setel-easy and rewarding.",
          avoid: "Being too casual in serious situations."
        },
        friendly_persuasive: {
          blend: "Friendly + Persuasive",
          ui_label: "Friendly and Persuasive",
          traits: "Encouraging, optimistic, benefit-first, confident.",
          syntactic_elements: "Conversational lead-in that naturally highlights benefits with motivating but gentle verbs.",
          tone_markers: ["worth it", "skip the wait", "get going", "ready when you are"],
          example: "Top up now and fuel without the wait.",
          avoid: "Sounding pushy or sales-y."
        },
        friendly_playful: {
          blend: "Friendly + Playful",
          ui_label: "Friendly and Playful",
          traits: "Lively, witty, celebratory, lighthearted.",
          syntactic_elements: "Light, expressive phrasing with optional playful touches. Sentence shape stays flexible.",
          tone_markers: ["aw yeah", "nice one", "woohoo", "cheers"],
          example: "Aw yeah, free parking on weekends!",
          avoid: "Being playful in stressful or important situations."
        },
        professional: {
          blend: "Professional + Neutral",
          ui_label: "Professional",
          traits: "Confident, knowledgeable, precise.",
          syntactic_elements: "Clear, precise phrasing with appropriately technical terms. Keep structure flexible, not rigid.",
          tone_markers: ["note", "confirm", "details"],
          example: "Fuel with Setel and earn up to 3x Mesra Rewards points-a clear choice.",
          avoid: "Sounding robotic or corporate."
        },
        professional_empathetic: {
          blend: "Professional + Empathetic",
          ui_label: "Professional and Empathetic",
          traits: "Responsible, composed, reassuring, accountable.",
          syntactic_elements: "Composed phrasing that acknowledges the situation with care while keeping the structure adaptable.",
          tone_markers: ["we're on it", "we'll update you", "we understand"],
          example: "We know this is frustrating. Your account is temporarily restricted while we investigate. We'll update you within 24 hours.",
          avoid: "Being too cold or too casual."
        },
        empathetic: {
          blend: "Empathetic + Friendly",
          ui_label: "Empathetic",
          traits: "Sincere, caring, supportive, understanding.",
          syntactic_elements: "Gentle, understanding language that offers reassurance with adaptable pacing.",
          tone_markers: ["we're here", "we're with you", "happy to help"],
          example: "We understand how much every point matters. Fuelling with Setel lets you earn up to 3x Mesra Rewards points effortlessly.",
          avoid: "Being condescending or over-apologetic."
        },
        empathetic_supportive: {
          blend: "Empathetic + Inspirational",
          ui_label: "Empathetic and Supportive",
          traits: "Compassionate, encouraging, steady, motivating.",
          syntactic_elements: "Compassionate phrasing that validates the situation and offers gentle encouragement without rigid patterns.",
          tone_markers: ["keep going", "step by step", "you're doing great"],
          example: "We know starting is tough. You're doing great so far-keep going!",
          avoid: "Toxic positivity or dismissing real concerns."
        },
        neutral: {
          blend: "Neutral + Clear",
          ui_label: "Neutral",
          traits: "Objective, direct, calm, minimal.",
          syntactic_elements: "Clear, factual phrasing with straightforward nouns and verbs. Keep the tone minimal and objective.",
          tone_markers: ["status", "updated", "complete"],
          example: "Fuel with Setel to earn up to 3x Mesra Rewards points. Simple and clear.",
          avoid: "Using in situations requiring empathy or celebration."
        },
        neutral_helpful: {
          blend: "Neutral + Friendly",
          ui_label: "Neutral and Helpful",
          traits: "Balanced, clear, straightforward, approachable.",
          syntactic_elements: "Straightforward, clear phrasing with a calm, helpful tone. Sentence shape stays flexible.",
          tone_markers: ["here's what to do", "next step", "try again"],
          example: "Insufficient balance. Top up now.",
          avoid: "Adding unnecessary emotion."
        },
        persuasive: {
          blend: "Persuasive + Inspirational",
          ui_label: "Persuasive",
          traits: "Enthusiastic, engaging, inspiring, action-oriented.",
          syntactic_elements: "Confident, motivating language that encourages action with energy and clarity without templates.",
          tone_markers: ["don't miss", "act now", "best value"],
          example: "Don't miss out! Fuel with Setel now and unlock up to 3x Mesra Rewards points-the best value in town.",
          avoid: "Creating false urgency or pressure."
        },
        urgent: {
          blend: "Urgent + Clear",
          ui_label: "Urgent",
          traits: "Decisive, time-sensitive, action-focused, clear.",
          syntactic_elements: "Clear, time-sensitive phrasing that prompts immediate action while keeping wording concise.",
          tone_markers: ["now", "today", "before it ends"],
          example: "Act fast! Fuel with Setel now and earn up to 3x Mesra Rewards points before it ends.",
          avoid: "Creating panic or using for non-urgent matters."
        },
        urgent_empathetic: {
          blend: "Urgent + Empathetic",
          ui_label: "Urgent and Empathetic",
          traits: "Concerned, caring, direct, time-aware.",
          syntactic_elements: "Caring, time-aware phrasing that guides the next step clearly while keeping urgency supportive.",
          tone_markers: ["to avoid interruption", "need this soon", "please finish"],
          example: "Verification needs completion within 24 hours to avoid interruption.",
          avoid: "Being pushy or dismissive of concerns."
        }
      }
    },
    brand_vocabulary: {
      required_terms: {
        fuel_not_petrol: {
          use: "fuel, fuelling, fuelled",
          never: "petrol, gas, gasoline",
          context: "British spelling for fuelling (double L)"
        },
        mobile_number: {
          use: "mobile number",
          never: "phone number, cell number, contact number"
        },
        evoucher: {
          use: "e-Voucher",
          never: "eVoucher, evoucher, E-voucher",
          note: "Hyphen required, capital V"
        },
        complimentary: {
          use: "complimentary",
          never: "free (when conditions apply)",
          note: 'Use "free" only if truly no conditions'
        },
        top_up: {
          noun: "top-up (with hyphen)",
          verb: "top up (no hyphen)",
          examples: ["Make a top-up", "Top up your balance"]
        }
      },
      product_names: {
        wallet: "Setel Wallet",
        cafe: "Caf\xE9 Mesra",
        app_name: "Setel",
        feature_names: {
          one_tap: "One-tap fuelling"
        }
      },
      official_documents: {
        terms: "Setel Terms & Conditions",
        privacy: "Setel Privacy Statement"
      },
      payment_transaction_terms: {
        balance: "balance (not wallet balance or credit balance)",
        cashback: "cashback (one word, lowercase)",
        transaction: "transaction (not purchase or order for fuel payments)",
        points_conversion: {
          primary: "convert, redeem",
          alternatives: "exchange, turn into",
          avoid_repetition: "Vary verbs instead of repeating the same one.",
          never: "swap (overused, feels informal)"
        }
      },
      user_interface_terms: {
        profile_section: "'Profile' (when referring to UI)",
        quote_usage: "Use single quotes '' when referring to UI elements"
      }
    },
    pronoun_rules: {
      you_your: "Use for positive/neutral direct actions (Your order is ready)",
      we_our: "Use to take accountability in negative situations (We're having trouble...)",
      i: "Only for user consent/agreement (I hereby confirm...)"
    },
    formatting_rules: {
      capitalisation: {
        default: "Sentence case for all headings, titles, body copy",
        buttons: "ALL CAPS (TOP UP, REDEEM, LEARN MORE)",
        proper_nouns: "Capitalise brand names (Setel Wallet, Caf\xE9 Mesra)"
      },
      currency: "RM50 (no space)",
      currency_thousands: "RM1,000 (comma separator)",
      dates: "Day Month Year (18 August 2022)",
      time: "12-hour format, uppercase AM/PM (8:00 AM)",
      units: "Space before SI units (15 L, 6 kg)",
      mobile_numbers: "Country code, no spaces (+60196389104)",
      punctuation: {
        oxford_comma: "Always use (safety, convenience, and productivity)",
        ui_references: "Single quotes for UI elements (Go to 'Profile')",
        ampersand: "Only for space limits, titles, or official brand names",
        colons: "Introduce lists or state times/dates",
        ellipsis: "No space before (...)",
        lists: "Capitalise first word of each item",
        emoji: "Use sparingly, align with brand (blue preferred)"
      }
    },
    length_presets: {
      overview: "Choose the band that fits the surface. Only character ranges matter-no fixed sentence templates.",
      options: {
        short: {
          label: "Short",
          min_chars: 0,
          max_chars: 32,
          range_hint: "0-32 characters"
        },
        medium: {
          label: "Medium",
          min_chars: 33,
          max_chars: 72,
          range_hint: "33-72 characters"
        },
        long: {
          label: "Long",
          min_chars: 73,
          max_chars: 140,
          range_hint: "73-140 characters"
        }
      }
    },
    forbidden_language: {
      never_do: [
        "Blame the user",
        "Use alarming security words (blocked for fraud)",
        "Use BNM name or logo",
        'Call gifts "free" if conditions apply',
        "Use Title Case for headings",
        "Use asterisks (*) for disclaimers",
        "Use brackets [] or braces {} (use parentheses)",
        "Use semicolons (use short sentences)",
        "Use general abbreviations (T&C, addr., Amt.)",
        "Put space in currency (RM 50)",
        "Use !! or ?! (use ! sparingly)",
        "Use perfect tenses (will have completed)",
        "Repeat the same word multiple times in one sentence or paragraph"
      ],
      banned_terms: {
        never_use: [
          "petrol, gas, gasoline",
          "phone number, cell number",
          "eVoucher, evoucher",
          "wallet balance, credit balance",
          "purchase, order (for fuel payments)",
          "swap (for points conversion)"
        ],
        marketing_phrases: [
          "Discover [noun] tailored to you",
          "Explore our comprehensive offerings",
          "Access our preferred collection",
          "Select the ideal [noun]",
          "Proceed to finalize your [noun]",
          "tailored to your lifestyle",
          "designed for you",
          "crafted for your needs",
          "seamless experience",
          "take your [noun] to the next level"
        ],
        corporate_buzzwords: [
          "comprehensive solutions",
          "empowering your financial future",
          "preferred collection",
          "journey (unless literally travelling)"
        ]
      }
    },
    validation: {
      required_phrases: [],
      required_phrase_groups: [],
      avoid_phrases: []
    }
  };

  // src/code.ts
  var STORAGE_KEYS = {
    gemini: "gemini_api_key",
    openrouter: "openrouter_api_key",
    active: "active_api_provider",
    openrouterModel: "openrouter_model"
  };
  var describeError = (err) => err && err.message ? String(err.message) : String(err);
  var toneCycleIndex = 0;
  var toneCycleSignature = "";
  var toneCycleCompleted = false;
  var buildCycleSignature = (text, version) => `${text}|||${version}`;
  var deriveGuideVersion = (guide) => {
    if (!guide || typeof guide !== "object") return "";
    const direct = formatGuideText(guide.version);
    if (direct) return direct;
    const meta = guide.meta;
    if (!meta || typeof meta !== "object") return "";
    return formatGuideText(meta.version) || formatGuideText(meta.last_updated) || "";
  };
  var takeStrings = (value, limit = 4) => {
    if (!Array.isArray(value)) return [];
    return value.map((entry) => typeof entry === "string" ? entry.trim() : "").filter(Boolean).slice(0, limit);
  };
  var formatGuideText = (value, limit = 4) => {
    if (typeof value === "string") return value.trim();
    if (Array.isArray(value)) {
      return takeStrings(value, limit).join(", ");
    }
    return "";
  };
  var mergeUniqueStrings = (...lists) => {
    const seen = /* @__PURE__ */ new Set();
    const merged = [];
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
  var sanitisePromptText = (input) => String(input || "").replace(/\s+/g, " ").replace(/[\u0000-\u001F]/g, "").trim();
  var obliterateEmDash = (value) => value.replace(/[–—]/g, "-");
  var normalizeVariantForComparison = (value) => obliterateEmDash(String(value || "")).toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
  var normalizeToneKeyValue = (value) => typeof value === "string" ? value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_") : "";
  var stripModelResponsePreface = (value) => {
    if (!value) return "";
    let cleaned = value.trim();
    if (/^```/.test(cleaned)) {
      cleaned = cleaned.replace(/^```(?:json)?/i, "").trim();
      if (cleaned.endsWith("```")) {
        cleaned = cleaned.slice(0, -3).trim();
      }
    }
    const removePreface = (keyword) => {
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
  var normaliseJsonQuotes = (value) => value.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
  var ACTION_TRIGGER_KEYWORDS = [
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
    "refuel"
  ];
  var OUTCOME_KEYWORDS = [
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
    "stack"
  ];
  var getPreviousNonWhitespaceChar = (input, index) => {
    for (let i = index - 1; i >= 0; i -= 1) {
      const char = input[i];
      if (!/\s/.test(char)) {
        return char;
      }
    }
    return "";
  };
  var classifySourceToken = (value) => {
    if (/^[0-9]+(?:[./][0-9]+)?$/.test(value)) return "number";
    if (/^[A-Z0-9]+$/.test(value) && value.length > 1) return "allcaps";
    if (/^[A-Z][a-z]+$/.test(value) && value.length > 1) return "title";
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) return "mixed";
    return "other";
  };
  var collectSourceKeywords = (text, limit = 6) => {
    const trimmed = typeof text === "string" ? text.trim() : "";
    if (!trimmed) return [];
    const tokens = [];
    const wordRegex = /\b[^\s]+\b/g;
    let match;
    while (match = wordRegex.exec(trimmed)) {
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
        isSentenceStart
      });
    }
    const keywords = [];
    const addKeyword = (value) => {
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
    let buffer = [];
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
  var sliceClauseFragment = (text, startIndex) => {
    if (!text || startIndex < 0 || startIndex >= text.length) return "";
    const remainder = text.slice(startIndex);
    const match = remainder.match(
      /^(.*?)(?:,|;|:|\b(?:and|but|so|then|because|while|when|if)\b|\.|!|\?)/i
    );
    const fragment = match ? match[1] : remainder;
    return fragment.replace(/\s+/g, " ").trim();
  };
  var findKeywordSnippet = (text, keywords) => {
    if (!text) return null;
    const lower = text.toLowerCase();
    let best = null;
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
  var deriveActionOutcomeHint = (text) => {
    if (!text) return null;
    const trigger = findKeywordSnippet(text, ACTION_TRIGGER_KEYWORDS);
    const outcome = findKeywordSnippet(text, OUTCOME_KEYWORDS);
    if (trigger && outcome && trigger.index < outcome.index) {
      return `Keep the trigger-to-reward promise explicit: ${trigger.snippet} leads to ${outcome.snippet}.`;
    }
    return null;
  };
  var VOICE_DESCRIPTOR_WORDS = /* @__PURE__ */ new Set([
    "warm",
    "friendly",
    "caring",
    "human",
    "conversational"
  ]);
  var normalizeDescriptorValue = (value) => {
    if (!value || typeof value !== "string") return "";
    return value.trim().toLowerCase().replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, "");
  };
  var isVoiceDescriptorWord = (value) => {
    const normalized = normalizeDescriptorValue(value);
    return Boolean(normalized && VOICE_DESCRIPTOR_WORDS.has(normalized));
  };
  var normalizeRequiredPhraseEntries = (source, defaultLabel = "required phrase") => {
    const groups = [];
    const addGroup = (phrases, label = defaultLabel) => {
      const merged = mergeUniqueStrings(phrases);
      if (!merged.length) return;
      groups.push({ label, phrases: merged });
    };
    const normalizeLabel = (label) => label && label.trim().length ? label.trim() : defaultLabel;
    const normalizeString = (value) => typeof value === "string" ? value.trim() : "";
    const splitOptionsFromString = (value) => {
      if (!value) return [];
      const hasDelimiter = /[,/|;]/.test(value) || /\bor\b/i.test(value);
      if (!hasDelimiter) return [];
      return value.split(/\s*(?:[,/|;]|\bor\b)\s*/i).map((segment) => segment.trim()).filter(Boolean);
    };
    const handleEntry = (entry, label = defaultLabel) => {
      if (!entry) return;
      if (Array.isArray(entry)) {
        const phrases = entry.map((item) => normalizeString(item)).filter(Boolean);
        if (phrases.length) addGroup(phrases, label);
        return;
      }
      if (typeof entry === "object") {
        const data = entry;
        const customLabel = normalizeLabel(typeof data.label === "string" ? data.label : label);
        const optionFields = ["any_of", "one_of", "phrases", "options"];
        for (const field of optionFields) {
          if (Array.isArray(data[field])) {
            handleEntry(data[field], customLabel);
            return;
          }
        }
        if (typeof data.phrase === "string") {
          const text2 = normalizeString(data.phrase);
          if (text2) {
            addGroup([text2], customLabel);
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
  var toNumberOrUndefined = (value) => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    return void 0;
  };
  var formatRangeHint = (min, max, fallback) => {
    const trimmedFallback = typeof fallback === "string" ? fallback.trim() : "";
    if (trimmedFallback) return trimmedFallback;
    const hasMin = typeof min === "number";
    const hasMax = typeof max === "number";
    if (hasMin && hasMax) return `${min}-${max} characters`;
    if (hasMax) return `\u2264${max} characters`;
    if (hasMin) return `\u2265${min} characters`;
    return "";
  };
  var ensureSentence = (value) => {
    const trimmed = typeof value === "string" ? value.trim() : "";
    if (!trimmed) return "";
    return /[.!?]$/.test(trimmed) ? trimmed : trimmed + ".";
  };
  var getLengthPreference = (guide) => {
    if (!guide || typeof guide !== "object") return null;
    const pref = guide.length_preference;
    if (!pref || typeof pref !== "object") return null;
    const label = formatGuideText(pref.label) || formatGuideText(pref.id);
    const minChars = toNumberOrUndefined(pref.min_chars);
    const maxChars = toNumberOrUndefined(pref.max_chars);
    const rangeHint = formatRangeHint(minChars, maxChars, formatGuideText(pref.range_hint));
    const structure = formatGuideText(pref.structure);
    const description = formatGuideText(pref.description);
    if (!label && !rangeHint && typeof minChars !== "number" && typeof maxChars !== "number") {
      return null;
    }
    return {
      label,
      minChars,
      maxChars,
      rangeHint,
      structure,
      description
    };
  };
  var toFriendlyCase = (value) => value.split(/[\s_]+/g).filter(Boolean).map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()).join(" ");
  var DEFAULT_TONE_NAMES = [
    "Friendly",
    "Professional",
    "Empathetic",
    "Persuasive",
    "Playful",
    "Inspirational",
    "Neutral",
    "Urgent",
    "Exclusive",
    "Technical"
  ];
  var MAX_ACTIVE_TONES = 16;
  var TONES_PER_CYCLE = 4;
  var collectToneConfigs = (guide) => {
    const palette = guide == null ? void 0 : guide.tone_palette;
    const available = palette == null ? void 0 : palette.available_tones;
    const requestedTonePreference = typeof guide.requestedTone === "string" ? guide.requestedTone.trim() : typeof guide.tonePreference === "string" ? guide.tonePreference.trim() : "";
    let resolvedRequestedTone = requestedTonePreference;
    if (resolvedRequestedTone && available && typeof available === "object") {
      if (!available[resolvedRequestedTone]) {
        const fallbackKey = "neutral_helpful" in available ? "neutral_helpful" : Object.keys(available)[0] || "";
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
      const toneList = Object.entries(available).map(([key, entry]) => {
        if (!entry || typeof entry !== "object") return null;
        const labelCandidate = formatGuideText(entry.ui_label) || toFriendlyCase(key);
        if (!labelCandidate) return null;
        const notes = [];
        const addNote = (value, template, limit = 4) => {
          const text = formatGuideText(value, limit);
          if (!text) return;
          notes.push(template ? template(text) : text);
        };
        addNote(entry.blend, (text) => `Blend both qualities: ${text}.`);
        addNote(
          entry.traits,
          (text) => `Let verbs and adjectives broadcast these traits: ${text}.`
        );
        addNote(
          entry.syntactic_elements,
          (text) => `Stylistic rhythm cue (flexible, not a fixed template): ${text}.`
        );
        addNote(entry.when, (text) => `Typical context: ${text}.`);
        addNote(entry.qualities, (text) => `Energy target: ${text}.`);
        addNote(
          entry.how,
          (text) => text.endsWith(".") ? text : text + "."
        );
        addNote(
          entry.tone_markers,
          (text) => `Optional flavour\u2014feel free to riff on this vibe without repeating the markers: ${text}.`,
          8
        );
        addNote(entry.avoid, (text) => `Avoid: ${text}.`);
        addNote(
          entry.example,
          (text) => `Tone example for inspiration only\u2014do not copy or template: ${text}.`
        );
        return { key, label: labelCandidate, notes };
      }).filter((tone) => Boolean(tone && tone.label));
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
            (label) => !selected.some((tone) => tone.label.toLowerCase() === label.toLowerCase())
          ).slice(0, missingCount).map((label) => ({
            key: label.toLowerCase().replace(/\s+/g, "_"),
            label,
            notes: []
          }));
          selected.push(...filler);
        }
        return selected;
      }
    }
    return DEFAULT_TONE_NAMES.slice(0, MAX_ACTIVE_TONES).map((label) => ({
      key: label.toLowerCase().replace(/\s+/g, "_"),
      label,
      notes: []
    }));
  };
  var deriveGuidePrompt = (guide) => {
    var _a, _b;
    if (!guide || typeof guide !== "object") {
      return { overview: "", requirements: [] };
    }
    const manualConstraints = guide.manualConstraints || {};
    const manualIncludeGroups = normalizeRequiredPhraseEntries(
      manualConstraints.required,
      "include phrase"
    );
    const manualRequiredSet = /* @__PURE__ */ new Set();
    manualIncludeGroups.forEach(
      (group) => group.phrases.forEach((phrase) => {
        const normalized = phrase.toLowerCase();
        if (normalized) {
          manualRequiredSet.add(normalized);
        }
      })
    );
    const manualAvoidPhrases = takeStrings(manualConstraints.avoid, 50);
    const manualReminders = takeStrings(manualConstraints.reminders, 50);
    const manualCoreInstructions = Array.isArray(manualConstraints.core_instructions) ? manualConstraints.core_instructions.map((entry) => typeof entry === "string" ? entry.trim() : "").filter((entry) => entry.length > 0) : [];
    const manualMust = takeStrings(manualConstraints.must, 50);
    const manualImmutableRules = takeStrings(manualConstraints.immutable_rules, 20);
    const manualPlayZones = takeStrings(manualConstraints.play_zones, 10);
    const manualNoPlayZones = takeStrings(manualConstraints.no_play_zones, 10);
    const requirements = [];
    const overviewParts = [];
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
      const purpose = formatGuideText(meta.purpose);
      if (purpose) {
        overviewParts.push(purpose);
      }
      const version = formatGuideText(meta.version);
      const lastUpdated = formatGuideText(meta.last_updated);
      if (version && lastUpdated) {
        requirements.push(`Guide version ${version}, updated ${lastUpdated}.`);
      } else if (version) {
        requirements.push(`Guide version ${version}.`);
      } else if (lastUpdated) {
        requirements.push(`Guide updated ${lastUpdated}.`);
      }
      const changelog = meta.changelog;
      if (changelog && typeof changelog === "object") {
        const entries = Object.entries(changelog).filter(([, note]) => typeof note === "string" && note.trim().length > 0).sort(([verA], [verB]) => verA < verB ? 1 : -1);
        if (entries.length) {
          const [latestVersion, latestNote] = entries[0];
          requirements.push(`Latest change (${latestVersion}): ${String(latestNote).trim()}`);
        }
      }
    }
    const companyProfile = guide.company_profile;
    if (companyProfile && typeof companyProfile === "object") {
      const audience = formatGuideText(companyProfile.target_audience);
      if (audience) {
        requirements.push(`Write for ${audience}.`);
      }
    }
    if (manualCoreInstructions.length) {
      manualCoreInstructions.forEach((instruction) => requirements.push(ensureSentence(instruction)));
    }
    if (manualMust.length) {
      requirements.push(`Must do: ${manualMust.join("; ")}.`);
    }
    if (manualImmutableRules.length) {
      requirements.push(`Immutable: ${manualImmutableRules.join("; ")}.`);
    }
    if (manualReminders.length) {
      manualReminders.forEach((reminder) => requirements.push(ensureSentence(reminder)));
    }
    const formatting = guide.formatting_rules || {};
    const capitalisation = formatting.capitalisation || formatting.capitalization;
    if (capitalisation && typeof capitalisation === "object") {
      const capRules = [];
      if (typeof capitalisation.default === "string") capRules.push(`Default text: ${capitalisation.default}.`);
      if (typeof capitalisation.buttons === "string") capRules.push(`Buttons: ${capitalisation.buttons}.`);
      if (typeof capitalisation.proper_nouns === "string") capRules.push(`Proper nouns: ${capitalisation.proper_nouns}.`);
      if (capRules.length) {
        requirements.push(capRules.join(" "));
      }
    }
    if (typeof formatting.currency === "string" || typeof formatting.currency_thousands === "string") {
      const parts = [
        typeof formatting.currency === "string" ? `Currency: ${formatting.currency}` : "",
        typeof formatting.currency_thousands === "string" ? `Thousands: ${formatting.currency_thousands}` : ""
      ].filter(Boolean).join(", ");
      if (parts) {
        requirements.push(parts + ".");
      }
    }
    if (typeof formatting.dates === "string" || typeof formatting.time === "string") {
      const parts = [
        typeof formatting.dates === "string" ? `Dates: ${formatting.dates}` : "",
        typeof formatting.time === "string" ? `Time: ${formatting.time}` : ""
      ].filter(Boolean).join(", ");
      if (parts) {
        requirements.push(parts + ".");
      }
    }
    if (typeof formatting.units === "string") {
      requirements.push(`Units: ${formatting.units}.`);
    }
    if (typeof formatting.mobile_numbers === "string") {
      requirements.push(`Mobile numbers: ${formatting.mobile_numbers}.`);
    }
    if (formatting.punctuation && typeof formatting.punctuation === "object") {
      const punct = [];
      Object.entries(formatting.punctuation).filter(([, value]) => typeof value === "string").forEach(([key, value]) => punct.push(`${toFriendlyCase(key)}: ${String(value).trim()}`));
      if (punct.length) {
        requirements.push(`Punctuation: ${punct.join("; ")}.`);
      }
    }
    const pronouns = guide.pronoun_rules || guide.pronouns || {};
    const pronounRules = Object.entries(pronouns).map(([key, value]) => typeof value === "string" ? `${key.replace(/_/g, " ")}: ${value}` : "").filter(Boolean);
    if (pronounRules.length) {
      requirements.push(`Pronouns: ${pronounRules.join("; ")}.`);
    }
    const validationCfg = guide.validation;
    if (validationCfg && typeof validationCfg === "object") {
      const mustUsePhrases = normalizeRequiredPhraseEntries(
        validationCfg.required_phrases,
        "required phrase"
      );
      const optionalChoiceGroups = normalizeRequiredPhraseEntries(
        validationCfg.required_phrase_groups,
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
        takeStrings(validationCfg.avoid_phrases, 6),
        takeStrings(validationCfg.banned_phrases, 6),
        takeStrings(validationCfg.forbidden_phrases, 6),
        takeStrings(validationCfg.blocked_phrases, 6),
        takeStrings(validationCfg.never_use, 6)
      ];
      const avoidPhrases = [];
      const seenAvoid = /* @__PURE__ */ new Set();
      avoidBuckets.forEach(
        (bucket) => bucket.forEach((phrase) => {
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
            `Optional keyword\u2014use it only when it makes the copy clearer: "${group.phrases[0]}".`
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
    const brandVocabulary = guide.brand_vocabulary || {};
    const describeBrandRule = (label, spec) => {
      if (!spec || typeof spec !== "object") return "";
      const parts = [];
      const useText = formatGuideText(spec.use);
      if (useText) parts.push(`Use ${useText}`);
      const nounForm = formatGuideText(spec.noun);
      if (nounForm) parts.push(`Noun: ${nounForm}`);
      const verbForm = formatGuideText(spec.verb);
      if (verbForm) parts.push(`Verb: ${verbForm}`);
      const neverText = formatGuideText(spec.never);
      if (neverText) parts.push(`Never say ${neverText}`);
      const contextText = formatGuideText(spec.context);
      if (contextText) parts.push(contextText);
      const noteText = formatGuideText(spec.note);
      if (noteText) parts.push(noteText);
      const examples = takeStrings(spec.examples, 2);
      if (examples.length) parts.push(`Examples: ${examples.join("; ")}`);
      return parts.length ? `${toFriendlyCase(label)} \u2192 ${parts.join(", ")}.` : "";
    };
    const requiredTerms = brandVocabulary.required_terms;
    if (requiredTerms && typeof requiredTerms === "object") {
      Object.entries(requiredTerms).map(([key, spec]) => describeBrandRule(key, spec)).filter(Boolean).slice(0, 5).forEach((rule) => requirements.push(rule));
    }
    const productNames = brandVocabulary.product_names;
    if (productNames && typeof productNames === "object") {
      Object.entries(productNames).forEach(([key, value]) => {
        if (typeof value === "string") {
          requirements.push(`${toFriendlyCase(key)}: ${value.trim()}`);
          return;
        }
        if (value && typeof value === "object") {
          Object.entries(value).filter(([, text]) => typeof text === "string").forEach(
            ([subKey, text]) => requirements.push(`${toFriendlyCase(subKey)}: ${String(text).trim()}`)
          );
        }
      });
    }
    const officialDocuments = brandVocabulary.official_documents;
    if (officialDocuments && typeof officialDocuments === "object") {
      Object.entries(officialDocuments).filter(([, value]) => typeof value === "string").forEach(([key, value]) => requirements.push(`${toFriendlyCase(key)}: ${String(value).trim()}`));
    }
    const paymentTerms = brandVocabulary.payment_transaction_terms;
    if (paymentTerms && typeof paymentTerms === "object") {
      Object.entries(paymentTerms).forEach(([key, value]) => {
        if (key === "points_conversion" && value && typeof value === "object") {
          const pcBits = [];
          ["primary", "alternatives", "avoid_repetition", "never"].forEach((field) => {
            const text = formatGuideText(value[field]);
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
      Object.entries(uiTerms).filter(([, value]) => typeof value === "string").forEach(([key, value]) => requirements.push(`${toFriendlyCase(key)}: ${String(value).trim()}`));
    }
    const forbiddenSource = guide.forbidden_language || guide.forbidden || {};
    const forbidden = takeStrings(forbiddenSource.never_do, 12);
    if (forbidden.length) {
      requirements.push(`Never do: ${forbidden.join(", ")}.`);
    }
    const bannedTermsSource = forbiddenSource && typeof forbiddenSource === "object" && forbiddenSource.banned_terms ? forbiddenSource.banned_terms.never_use : [];
    const bannedTerms = takeStrings(bannedTermsSource, 10).filter((term) => {
      const normalized = term.trim().toLowerCase();
      if (!normalized) return false;
      if (manualRequiredSet.has(normalized)) return false;
      if (isVoiceDescriptorWord(term)) return false;
      return true;
    });
    if (bannedTerms.length) {
      requirements.push(`Banned terms: ${bannedTerms.join(", ")}.`);
    }
    const marketingBans = takeStrings((_a = forbiddenSource == null ? void 0 : forbiddenSource.banned_terms) == null ? void 0 : _a.marketing_phrases, 10);
    if (marketingBans.length) {
      requirements.push(`Avoid marketing phrases like: ${marketingBans.join(", ")}.`);
    }
    const corporateBans = takeStrings((_b = forbiddenSource == null ? void 0 : forbiddenSource.banned_terms) == null ? void 0 : _b.corporate_buzzwords, 10);
    if (corporateBans.length) {
      requirements.push(`Avoid corporate buzzwords such as: ${corporateBans.join(", ")}.`);
    }
    if (manualAvoidPhrases.length) {
      requirements.push(`Manual avoid list: ${manualAvoidPhrases.join(", ")}.`);
    }
    if (manualPlayZones.length) {
      requirements.push(`Tone play zones: ${manualPlayZones.join(", ")}.`);
    }
    if (manualNoPlayZones.length) {
      requirements.push(`No play zones: ${manualNoPlayZones.join(", ")}.`);
    }
    const tonePalette = guide.tone_palette;
    if (tonePalette && typeof tonePalette === "object") {
      if (typeof tonePalette.how_to_use === "string") {
        requirements.push(tonePalette.how_to_use.trim());
      }
    }
    const overview = overviewParts.length > 0 ? `Rewrite the provided copy using Setel voice and guidelines: ${overviewParts.join(" ")}` : "";
    return { overview, requirements };
  };
  var getToneSequence = (guide) => {
    return collectToneConfigs(guide).map((tone) => tone.label);
  };
  var TASK_SPEC_REMINDER = "Always follow TASK_SPEC exactly when choosing tone, length, and context.";
  var JSON_RESPONSE_TEMPLATE = `Respond ONLY with valid JSON in this format:
{
  "variants": [
    {
      "tone": "<TONE_KEY>",
      "length": "<LENGTH_KEY>",
      "text": "..."
    }
  ]
}`;
  var determineTaskSpecLengthKey = (preference) => {
    const label = ((preference == null ? void 0 : preference.label) || (preference == null ? void 0 : preference.rangeHint) || "").toLowerCase();
    if (label.includes("short")) return "short";
    if (label.includes("long")) return "long";
    if (label.includes("medium")) return "medium";
    if ((preference == null ? void 0 : preference.maxChars) && preference.maxChars <= 60) return "short";
    if ((preference == null ? void 0 : preference.maxChars) && preference.maxChars <= 100) return "medium";
    if ((preference == null ? void 0 : preference.minChars) && preference.minChars >= 120) return "long";
    return "medium";
  };
  var buildTaskSpecBlock = (toneKey, lengthKey) => [
    "TASK_SPEC:",
    "  {",
    '    "task": "rewrite",',
    `    "tone": "${toneKey || "unspecified"}",`,
    `    "length": "${lengthKey}"`,
    "  }",
    "END_TASK_SPEC",
    ""
  ].join("\n");
  var sanitiseJsonStringLiterals = (value) => {
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
  var tryParseJson = (value, depth = 0, options) => {
    if (typeof value !== "string") return null;
    const trimmed = normaliseJsonQuotes(value.trim());
    if (!trimmed) return null;
    try {
      const parsed = JSON.parse(trimmed);
      if (typeof parsed === "string" && depth < 2 && (parsed.trim().startsWith("{") || parsed.trim().startsWith("["))) {
        const nested = tryParseJson(parsed, depth + 1, options);
        if (nested) {
          return nested;
        }
      }
      return parsed;
    } catch (err) {
      if ((options == null ? void 0 : options.stageLabel) && (options == null ? void 0 : options.logError)) {
        const message = err && typeof err === "object" && "message" in err ? String(err.message) : String(err);
        options.logError(options.stageLabel, trimmed, message);
      }
      try {
        const parsed = JSON.parse(sanitiseJsonStringLiterals(trimmed));
        if (typeof parsed === "string" && depth < 2 && (parsed.trim().startsWith("{") || parsed.trim().startsWith("["))) {
          const nested = tryParseJson(parsed, depth + 1, options);
          if (nested) {
            return nested;
          }
        }
        return parsed;
      } catch (err2) {
        if ((options == null ? void 0 : options.stageLabel) && (options == null ? void 0 : options.logError)) {
          const message = err2 && typeof err2 === "object" && "message" in err2 ? String(err2.message) : String(err2);
          options.logError(options.stageLabel, trimmed, message);
        }
        return null;
      }
    }
  };
  var extractJsonSubstring = (value) => {
    const start = value.indexOf("{");
    const end = value.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return value.slice(start, end + 1);
    }
    return null;
  };
  var extractLooseVariantObjects = (source) => {
    if (!source) return [];
    const marker = source.indexOf('"variants"');
    if (marker < 0) return [];
    const startBracket = source.indexOf("[", marker);
    if (startBracket < 0) return [];
    const blocks = [];
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
  var extractVariantsJsonBlock = (source) => {
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
  var logVariantParsingIssue = (stage, snippet, error) => {
    if (!snippet) return;
    try {
      const preview = snippet.length > 360 ? snippet.slice(0, 360) + "\u2026" : snippet;
      const label = error ? `${stage} (${error})` : stage;
      console.warn(`[rewrite] ${label}: ${preview}`);
    } catch (err) {
      console.warn("[rewrite] logging failed", err);
    }
  };
  var normalizeParsedVariants = (candidate) => {
    if (!candidate) return [];
    const potentialVariants = Array.isArray(candidate.variants) ? candidate.variants : Array.isArray(candidate) ? candidate : [];
    if (!Array.isArray(potentialVariants)) return [];
    const normalized = [];
    potentialVariants.forEach((entry) => {
      if (!entry || typeof entry !== "object") return;
      const rawText = typeof entry.text === "string" ? entry.text.trim() : "";
      if (!rawText) return;
      normalized.push({
        tone: typeof entry.tone === "string" ? entry.tone : "",
        length: typeof entry.length === "string" ? entry.length : "",
        text: rawText
      });
    });
    return normalized;
  };
  var parseModelResponseVariants = (response, fallbackTone, fallbackLength) => {
    const trimmed = response.trim();
    if (!trimmed) return [];
    const parseSource = stripModelResponsePreface(trimmed) || trimmed;
    const attemptParse = (payload, label) => {
      if (!payload) return null;
      return tryParseJson(payload, 0, {
        stageLabel: label,
        logError: logVariantParsingIssue
      });
    };
    const extractNormalized = (candidate) => {
      if (!candidate) return null;
      const normalized = normalizeParsedVariants(candidate);
      return normalized.length ? normalized : null;
    };
    const attemptNormalized = (payload, label) => {
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
      const approximations = [];
      looseObjects.forEach((block) => {
        const parsed = tryParseJson(block);
        if (!parsed || typeof parsed !== "object") return;
        const tone = typeof parsed.tone === "string" ? String(parsed.tone) : "";
        const length = typeof parsed.length === "string" ? String(parsed.length) : "";
        const text = typeof parsed.text === "string" ? String(parsed.text).trim() : "";
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
        text
      }));
    }
    logVariantParsingIssue("final fallback", parseSource);
    return parseSource ? [{ tone: fallbackTone, length: fallbackLength, text: parseSource }] : [];
  };
  var flattenVariantOutputs = (entries) => {
    if (!entries.length) return entries;
    const flattened = [];
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
  var dedupeVariantOutputs = (entries) => {
    if (!entries.length) return entries;
    const seen = /* @__PURE__ */ new Set();
    const deduped = [];
    entries.forEach((entry) => {
      const key = normalizeVariantForComparison(entry);
      if (!key) return;
      if (seen.has(key)) return;
      seen.add(key);
      deduped.push(entry);
    });
    return deduped;
  };
  var extractPlaintextVariantCandidates = (raw) => {
    if (!raw) return [];
    const expanded = raw.replace(/(\d+[\.)-])/g, "\n$1");
    let blocks = expanded.split(/\n{2,}/);
    if (blocks.length === 1) {
      blocks = expanded.split(/\n+/);
    }
    const isInstructionalBlock = (value) => /^###\s+VARIANT/i.test(value) || /^TASK_SPEC/i.test(value) || /^Respond\s+with/i.test(value) || /^Return each variant/i.test(value) || /^Rewrite the copy/i.test(value) || /^JSON_RESPONSE_TEMPLATE/i.test(value) || /^Your variants array/i.test(value) || /^Keep these exact source terms/i.test(value);
    const isLikelyCopyLine = (value) => value.length >= 15 && /\s/.test(value);
    const isMetaComment = (value) => {
      const lower = value.toLowerCase();
      return lower.includes("source copy") || lower.includes("assumed intent") || lower.includes("not provided in the prompt") || lower.includes("based on the instructions");
    };
    const cleanedBlocks = blocks.map(
      (block) => block.replace(/[*_`]/g, "").replace(/^\d+[\.)-]*\s*/, "").replace(/^[-•*]+\s*/, "").replace(/\s+/g, " ").trim()
    ).filter((block) => block && !isInstructionalBlock(block));
    if (cleanedBlocks.length <= 1) {
      return cleanedBlocks.filter(isLikelyCopyLine);
    }
    return cleanedBlocks.filter((block) => {
      if (!isLikelyCopyLine(block)) return false;
      const lower = block.toLowerCase();
      if (isMetaComment(block)) return false;
      if (lower.startsWith('"tone"') || lower.startsWith('"length"') || lower.startsWith('"text"'))
        return false;
      if (/^(tone|length|text)\s*[:=]/i.test(block)) return false;
      if (/^\{/.test(block) && block.endsWith("}")) {
        try {
          const parsed = JSON.parse(block);
          if (typeof parsed === "object" && parsed && typeof parsed.text === "string") {
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
  var buildRewriteInstructions = (guide, options) => {
    const fallbackOverview = "Rewrite provided copy for Setel, Malaysia\u2019s all\u2011in\u2011one motoring app at PETRONAS, following every rule below.";
    if (!guide || typeof guide !== "object") {
      const lengthKey2 = determineTaskSpecLengthKey(null);
      const toneLabel = (options == null ? void 0 : options.targetToneKey) || "neutral_helpful";
      const fallbackSpec = buildTaskSpecBlock(toneLabel, lengthKey2);
      const text2 = `${fallbackSpec}${fallbackOverview}

`;
      return {
        text: text2,
        coreText: text2,
        optionalText: "",
        toneKey: toneLabel,
        lengthKey: lengthKey2
      };
    }
    const promptCfg = guide.rewritePrompt || {};
    const derived = deriveGuidePrompt(guide);
    const manualConstraints = guide.manualConstraints;
    const manualAvoidPhrases = manualConstraints && typeof manualConstraints === "object" ? takeStrings(manualConstraints.avoid, 10) : [];
    const baseRequirements = Array.isArray(promptCfg.requirements) ? promptCfg.requirements.filter(
      (item) => typeof item === "string" && item.trim().length > 0
    ) : [];
    const guardrailRequirements = [...baseRequirements, ...derived.requirements];
    const forcedTone = typeof (options == null ? void 0 : options.targetToneName) === "string" && options.targetToneName.trim().length ? options.targetToneName.trim() : "";
    const toneNotesSource = options == null ? void 0 : options.toneNotes;
    const toneNotes = Array.isArray(toneNotesSource) ? toneNotesSource.map((note) => typeof note === "string" ? note.trim() : "").filter(Boolean) : [];
    const intent = (options == null ? void 0 : options.intent) === "prompt" ? "prompt" : "rewrite";
    const toneNames = forcedTone ? [forcedTone] : getToneSequence(guide);
    const overview = (typeof promptCfg.overview === "string" && promptCfg.overview.trim().length ? promptCfg.overview.trim() : derived.overview) || fallbackOverview;
    const priorityRules = [];
    const optionalGuidanceSections = [];
    const roleVoiceRules = [
      "You are a senior UX writer for Setel\u2014warm, friendly, caring, and human. Avoid corporate or marketing jargon."
    ];
    const coreRewriteRules = [];
    const toneGuidance = [];
    const structuralGuidance = [];
    const outputFormatRules = [];
    const toneSpecKey = (options == null ? void 0 : options.targetToneKey) || "";
    const addRoleVoice = (value) => {
      const trimmed = typeof value === "string" ? value.trim() : "";
      if (trimmed) roleVoiceRules.push(trimmed);
    };
    const addCoreRule = (value) => {
      const trimmed = typeof value === "string" ? value.trim() : "";
      if (trimmed) coreRewriteRules.push(trimmed);
    };
    const addToneGuidance = (value) => {
      const trimmed = typeof value === "string" ? value.trim() : "";
      if (trimmed) toneGuidance.push(trimmed);
    };
    const addStructuralGuidance = (value) => {
      const trimmed = typeof value === "string" ? value.trim() : "";
      if (trimmed) structuralGuidance.push(trimmed);
    };
    const addOutputRule = (value) => {
      const trimmed = typeof value === "string" ? value.trim() : "";
      if (trimmed) outputFormatRules.push(trimmed);
    };
    const overviewLine = overview && overview !== fallbackOverview ? overview.replace(/^Rewrite the provided copy using\s*/i, "Core voice reminder\u2014use ") : "Core voice reminder\u2014use Setel voice and stay on-brand.";
    addRoleVoice(overviewLine);
    addOutputRule(TASK_SPEC_REMINDER);
    addOutputRule(JSON_RESPONSE_TEMPLATE);
    addOutputRule(
      "For every JSON variant, keep the text value limited to the final UX copy only\u2014no labels, intros, or commentary."
    );
    addOutputRule(
      "Each JSON variant must contain exactly one rewrite; never include multiple options, bullet lists, or extra framing."
    );
    addOutputRule("Never print standalone variant text outside the JSON response.");
    addCoreRule(
      "Speak directly to the end-user; never mention rewrites, options, or that you're providing variations."
    );
    addCoreRule(
      "Remove conversational framing or meta-commentary entirely\u2014no phrases like \u201CWe understand\u2026\u201D, \u201CLet\u2019s\u2026\u201D, \u201CHere\u2019s\u2026\u201D, or anything that references the request; start immediately with the final UX copy."
    );
    addCoreRule(
      "Skip pleasantries or commentary about what the reader is doing (e.g., \u201CIt's great you're looking\u2026\u201D); lead with the product benefit or action."
    );
    addCoreRule(
      "Never mention missing source copy, assumed intent, or that you're inferring context\u2014just deliver the final rewrite, even if the prompt feels incomplete."
    );
    addCoreRule("Preserve the meaning, required keywords, and pronoun pattern from the source.");
    addCoreRule(
      "Preserve sentence count and sentence type (statement, question, or command) while staying within the same length band."
    );
    addCoreRule(
      "Rewrite with fresh wording and a different angle\u2014never lift more than 2\u20133 consecutive words from the source unless they are required terms or product names."
    );
    addCoreRule("Avoid repeating the same hero verb or key noun within a sentence; rotate vocabulary.");
    addCoreRule(
      "Vary the opening words across variants so no two rewrites share the same opener or rhythm."
    );
    addCoreRule(
      "Within these constraints, choose fresh wording and a different angle so each variant feels like it was written by a different human, not just a paraphrase."
    );
    addCoreRule(
      "Stay inside the banned terms, required keywords, pronoun rules, and length limits while picking new verbs, benefits, and entry points."
    );
    addCoreRule(
      "Change the sentence rhythm, verbs, and descriptive words for each tone so the emotional intent is obvious; never recycle the same hero verb across variants."
    );
    if (intent === "prompt") {
      addCoreRule(
        "Create original UX copy that fulfils the user brief; treat their text as instructions, not content to restate."
      );
    } else {
      addCoreRule("Rewrite the provided copy so it keeps the same intent and facts while following every rule above.");
    }
    if (forcedTone) {
      addToneGuidance(
        `Apply the ${forcedTone} tone through rhythm, phrasing, and word choice\u2014never mention or describe the tone name in the output.`
      );
    } else if (toneNames.length) {
      addToneGuidance(
        `Provide one variant per tone (in this order: ${toneNames.join(
          ", "
        )}); make each tone feel distinct without naming the tone in the copy.`
      );
    }
    addToneGuidance(
      "Use tone briefs as stylistic cues\u2014adjust energy, formality, and vocabulary without copying any structural template."
    );
    addToneGuidance(
      "Tone markers are optional flavour; you may echo their vibe but do not repeat them verbatim or treat them as required tokens."
    );
    toneNotes.forEach((note) => addToneGuidance(note));
    const cleanedManualAvoid = manualAvoidPhrases.map((phrase) => phrase.trim()).filter((phrase) => phrase && !isVoiceDescriptorWord(phrase));
    if (cleanedManualAvoid.length === 1) {
      priorityRules.push(
        `Do not use the word or phrase "${cleanedManualAvoid[0]}" anywhere in your rewrite.`
      );
    } else if (cleanedManualAvoid.length > 1) {
      priorityRules.push(
        `Avoid using any of these words or phrases in your rewrite: ${cleanedManualAvoid.join(", ")}.`
      );
    }
    const selectedLength = getLengthPreference(guide);
    if (selectedLength) {
      const descriptor = selectedLength.label ? `${selectedLength.label} length target` : "Target length band";
      const rangeLine = selectedLength.rangeHint ? `Stay within ${selectedLength.rangeHint}.` : "Stay within the defined character band.";
      addStructuralGuidance([descriptor + ".", rangeLine, "Match sentence count and type without copying structure."].join(" "));
    }
    addStructuralGuidance(
      "Keep sentences tight\u2014keep each sentence brief and avoid padding or repetition, even when multiple sentences are needed."
    );
    const haystackSource = (options == null ? void 0 : options.sourceText) || "";
    const trimmedSourceText = options && typeof options.sourceText === "string" ? options.sourceText.trim() : "";
    const pronounPattern = /\b(?:we|us|our|ours|you|your|yours)\b/i;
    const sourceHasPronoun = trimmedSourceText.length > 0 ? pronounPattern.test(trimmedSourceText) : false;
    const structureReminder = trimmedSourceText ? "Preserve pronoun pattern, sentence count, sentence type, and the same length band as the source, but feel free to change clause order and phrasing." : "";
    if (trimmedSourceText && !sourceHasPronoun) {
      addCoreRule(
        "If the source copy avoids first- and second-person pronouns, keep your rewrite pronoun-free unless the same pronouns appear in the prompt."
      );
    }
    if (structureReminder) {
      addStructuralGuidance(structureReminder);
    }
    if (trimmedSourceText) {
      addCoreRule(`Source copy intent: ${ensureSentence(trimmedSourceText)}`);
      const actionIntent = deriveActionOutcomeHint(trimmedSourceText);
      if (actionIntent) {
        addCoreRule(actionIntent);
      }
    }
    const preservedTerms = collectSourceKeywords(trimmedSourceText);
    if (preservedTerms.length) {
      addCoreRule(
        `Keep these exact source terms (and their casing) in every rewrite: ${preservedTerms.join(", ")}.`
      );
    }
    guardrailRequirements.unshift(...priorityRules);
    const formatSection = (label, items) => items.length ? `${label}:
${items.map((item) => "- " + item).join("\n")}

` : "";
    const lengthKey = determineTaskSpecLengthKey(selectedLength);
    const specBlock = buildTaskSpecBlock(toneSpecKey, lengthKey);
    const instructionHeader = intent === "prompt" ? "Create original UX copy using Setel\u2019s UX guidelines and the rules below." : "Rewrite the copy below using Setel\u2019s UX guidelines and the rules below.";
    const sections = [
      formatSection("Role & core voice", roleVoiceRules),
      formatSection("Core rewrite rules", coreRewriteRules),
      formatSection("Tone application", toneGuidance),
      formatSection("Structural targets", structuralGuidance),
      formatSection("Language, formatting, and brand guardrails", guardrailRequirements),
      formatSection("Output & response format", outputFormatRules)
    ].join("");
    const optionalBlock = optionalGuidanceSections.length > 0 ? `Optional inspiration (for vibe only\u2014do not copy or template these lines):
${optionalGuidanceSections.map((item) => "- " + item).join("\n")}

` : "";
    const coreInstructionBody = `${instructionHeader}

${sections}`;
    const coreText = specBlock + coreInstructionBody;
    const text = coreText + optionalBlock;
    return {
      text,
      coreText,
      optionalText: optionalBlock,
      toneKey: toneSpecKey,
      lengthKey
    };
  };
  var runRewriteCycle = async (msg, resetCycle) => {
    var _a, _b, _c, _d;
    const provider = msg.provider === "openrouter" ? "openrouter" : "gemini";
    const selectedModelRaw = typeof msg.model === "string" ? msg.model : "";
    const selectedModel = provider === "openrouter" && selectedModelRaw.trim().length ? selectedModelRaw.trim() : "openrouter/auto";
    const key = String(msg.key || "");
    const text = sanitisePromptText(String(msg.text || ""));
    const guideline = msg.guideline || guideline_default || {};
    let output = "";
    let encounteredError = false;
    const PROMPT_TOKEN_LIMIT = 6e3;
    const TOKEN_APPROX_DIVISOR = 4;
    const PROMPT_CHAR_LIMIT = PROMPT_TOKEN_LIMIT * TOKEN_APPROX_DIVISOR;
    const cycleVersion = deriveGuideVersion(guideline);
    const cycleSignature = buildCycleSignature(text, `${cycleVersion}::${provider}::${selectedModel}`);
    if (resetCycle || cycleSignature !== toneCycleSignature) {
      toneCycleSignature = cycleSignature;
      toneCycleIndex = 0;
      toneCycleCompleted = false;
    }
    const callModel = async (prompt) => {
      var _a2;
      if (provider === "openrouter") {
        const body2 = {
          model: selectedModel,
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.45,
          top_p: 0.9,
          max_tokens: 512
        };
        const res2 = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://www.figma.com",
            "X-Title": "Check My Copy"
          },
          body: JSON.stringify(body2)
        });
        if (!res2.ok) {
          throw new Error("API error " + res2.status + ": " + await res2.text());
        }
        const data2 = await res2.json();
        const choice = Array.isArray(data2 == null ? void 0 : data2.choices) ? data2.choices[0] : null;
        let textOut2 = "";
        const messageContent = (_a2 = choice == null ? void 0 : choice.message) == null ? void 0 : _a2.content;
        if (typeof messageContent === "string") {
          textOut2 = messageContent;
        } else if (Array.isArray(messageContent)) {
          textOut2 = messageContent.map((part) => typeof part === "string" ? part : (part == null ? void 0 : part.text) || "").filter(Boolean).join(" ");
        } else if (typeof (choice == null ? void 0 : choice.text) === "string") {
          textOut2 = choice.text;
        }
        return textOut2 ? textOut2.trim() : "No response.";
      }
      const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=" + encodeURIComponent(key);
      const body = {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.45,
          top_p: 0.9,
          maxOutputTokens: 512
        }
      };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        throw new Error("API error " + res.status + ": " + await res.text());
      }
      const data = await res.json();
      let textOut = "";
      if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text) {
        textOut = String(data.candidates[0].content.parts[0].text);
      }
      return textOut ? textOut.trim() : "No response.";
    };
    const intent = msg.mode === "prompt" ? "prompt" : "rewrite";
    const toneConfigs = collectToneConfigs(guideline);
    const cycleNotice = "You\u2019ve reached the end of the tone cycle for this prompt\u2014adjust your copy to start again.";
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
    const variants = [];
    const variantFingerprints = /* @__PURE__ */ new Set();
    const markVariantSeen = (text2) => {
      const key2 = normalizeVariantForComparison(text2);
      if (key2) {
        variantFingerprints.add(key2);
      }
    };
    const hasSeenVariant = (text2) => {
      const key2 = normalizeVariantForComparison(text2);
      return key2 ? variantFingerprints.has(key2) : false;
    };
    const isDisallowedVariantText = (value) => {
      const lower = value.toLowerCase();
      return lower.includes("source copy") || lower.includes("assumed intent") || lower.includes("not provided in the prompt");
    };
    const sourceLabel = intent === "prompt" ? "User prompt (for intent context\u2014do not parrot the wording):\n" : "Source copy (reference only\u2014do not reuse phrases longer than 2\u20133 words):\n";
    try {
      const cycleInstruction = (toneGuide, toneConfig) => buildRewriteInstructions(toneGuide, {
        sourceText: text,
        targetToneName: toneConfig.label,
        targetToneKey: toneConfig.key,
        toneNotes: toneConfig.notes,
        intent
      });
      const toneTasks = selectedToneConfigs.map((toneConfig) => {
        const toneName = toneConfig.label;
        const toneGuide = guideline && typeof guideline === "object" ? Object.assign({}, guideline, { tonePreference: toneName }) : { tonePreference: toneName };
        return {
          toneConfig,
          instructions: cycleInstruction(toneGuide, toneConfig),
          resultText: ""
        };
      });
      const buildTaskSection = (task, index, useCoreText) => {
        const body = useCoreText ? task.instructions.coreText : task.instructions.text;
        return [`### VARIANT ${index + 1} \u2013 Tone ${task.toneConfig.label}`, body].join("\n");
      };
      const uniquenessReminder = [
        "Respond with valid JSON exactly matching JSON_RESPONSE_TEMPLATE.",
        "Your variants array must contain one entry per task above, in the same order.",
        "Each entry must include the tone and length from its TASK_SPEC block.",
        "Every variant must sound distinct\u2014rewrite it if any two openings or phrasings feel similar.",
        "Let each tone's traits dictate different verbs, cadence, and punctuation so the emotional energy clearly shifts between variants."
      ].join(" ");
      const buildPromptSegments = (tasks, useCoreText = false) => {
        const sections = tasks.map((task, idx) => buildTaskSection(task, idx, useCoreText)).join("\n\n");
        const instructionsBlock = `${sections}

${uniquenessReminder}`.trim();
        const sourceBlock = `${sourceLabel}${text}`;
        const fullPrompt = instructionsBlock ? `${instructionsBlock}

${sourceBlock}` : sourceBlock;
        return {
          full: fullPrompt,
          instructions: instructionsBlock,
          source: sourceBlock
        };
      };
      const isWithinPromptLimit = (value) => Math.floor(value.length / TOKEN_APPROX_DIVISOR) <= PROMPT_TOKEN_LIMIT;
      const clampPromptToLimit = (segments) => {
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
        const trimmedInstructions = instructionsBudget > 0 ? segments.instructions.slice(0, instructionsBudget).trimEnd() : "";
        const prefix = trimmedInstructions ? `${trimmedInstructions}${delimiter}` : "";
        return `${prefix}${sourceBlock}`;
      };
      const composePrompt = (tasks) => {
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
      const findMatchingTask = (tone) => {
        const normalized = normalizeToneKeyValue(tone);
        if (!normalized) return null;
        return toneTasks.find((task) => {
          if (task.resultText) return false;
          const candidates = [
            normalizeToneKeyValue(task.instructions.toneKey),
            normalizeToneKeyValue(task.toneConfig.key),
            normalizeToneKeyValue(task.toneConfig.label)
          ].filter(Boolean);
          return candidates.some((candidate) => candidate === normalized);
        }) || null;
      };
      const assignVariants = (entries, allowDuplicates = false) => {
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
        const seen = /* @__PURE__ */ new Set();
        let cleared = false;
        toneTasks.forEach((task) => {
          const text2 = (task.resultText || "").trim();
          if (!text2) return;
          const key2 = normalizeVariantForComparison(text2);
          if (!key2) return;
          if (seen.has(key2)) {
            task.resultText = "";
            cleared = true;
          } else {
            seen.add(key2);
          }
        });
        return cleared;
      };
      const desiredVariantCount = selectedToneConfigs.length;
      const hasCompleteSet = () => toneTasks.every((task) => (task.resultText || "").trim().length > 0);
      const uniqueVariantCount = () => dedupeVariantOutputs(getTaskResultTexts().filter((value) => value.trim().length > 0)).length;
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
          ((_a = pendingTasks[0]) == null ? void 0 : _a.instructions.toneKey) || ((_b = toneTasks[0]) == null ? void 0 : _b.instructions.toneKey) || "",
          ((_c = pendingTasks[0]) == null ? void 0 : _c.instructions.lengthKey) || ((_d = toneTasks[0]) == null ? void 0 : _d.instructions.lengthKey) || determineTaskSpecLengthKey(null)
        );
        assignVariants(parsedVariants, false);
        const fallbackEntries = extractPlaintextVariantCandidates(
          stripModelResponsePreface(cleanedVariant)
        ).map((text2) => ({
          text: text2
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
      const suggestionLines = uniqueVariants.map((line, idx) => `${idx + 1}. ${line}`);
      if (!suggestionLines.length) {
        encounteredError = true;
        output = "No response.";
      } else {
        output = suggestionLines.join("\n\n");
      }
    } catch (err) {
      encounteredError = true;
      output = "Request failed: " + describeError(err);
    }
    figma.ui.postMessage({ type: "rewrite-done", output, error: encounteredError });
  };
  var loadFontsForNode = async (node) => {
    const uniqueFonts = [];
    const registerFont = (font) => {
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
  var MAX_VALIDATION_ATTEMPTS = 6;
  var UI_WIDTH = 720;
  var MIN_UI_HEIGHT = 348;
  var MAX_UI_HEIGHT = 900;
  figma.on("run", () => {
    figma.showUI(__html__, { width: UI_WIDTH, height: MIN_UI_HEIGHT });
    figma.ui.postMessage({
      type: "guideline-default",
      guideline: guideline_default
    });
    const sendSelectionToUI = () => {
      const selection = figma.currentPage.selection;
      for (const node of selection) {
        if (node.type === "TEXT") {
          const text = String(node.characters || "");
          figma.ui.postMessage({
            type: "selection-text",
            text
          });
          return;
        }
      }
      figma.ui.postMessage({ type: "selection-text", text: "" });
    };
    sendSelectionToUI();
    figma.on("selectionchange", sendSelectionToUI);
    figma.ui.onmessage = async (msg) => {
      try {
        if (!msg || !msg.type) return;
        if (msg.type === "request-guideline") {
          figma.ui.postMessage({
            type: "guideline-default",
            guideline: guideline_default
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
        if (msg.type === "save-key") {
          const keys = msg && typeof msg.keys === "object" && msg.keys !== null ? msg.keys : {};
          const models = msg && typeof msg.models === "object" && msg.models !== null ? msg.models : {};
          const geminiKeyToSave = String(
            typeof keys.gemini === "string" ? keys.gemini : msg.key || ""
          );
          const openrouterKeyToSave = String(
            typeof keys.openrouter === "string" ? keys.openrouter : ""
          );
          const openrouterModelToSave = String(
            typeof models.openrouter === "string" ? models.openrouter : msg.model || ""
          );
          const activeProviderToSave = msg.provider === "openrouter" || msg.provider === "gemini" ? msg.provider : "";
          try {
            await figma.clientStorage.setAsync(STORAGE_KEYS.gemini, geminiKeyToSave);
            await figma.clientStorage.setAsync(STORAGE_KEYS.openrouter, openrouterKeyToSave);
            await figma.clientStorage.setAsync(STORAGE_KEYS.openrouterModel, openrouterModelToSave);
            await figma.clientStorage.setAsync(STORAGE_KEYS.active, activeProviderToSave);
            figma.ui.postMessage({
              type: "key-saved",
              keys: { gemini: geminiKeyToSave, openrouter: openrouterKeyToSave },
              models: { openrouter: openrouterModelToSave },
              activeProvider: activeProviderToSave
            });
          } catch (e) {
            figma.ui.postMessage({
              type: "key-saved",
              keys: { gemini: geminiKeyToSave, openrouter: openrouterKeyToSave },
              models: { openrouter: openrouterModelToSave },
              activeProvider: activeProviderToSave,
              error: describeError(e)
            });
          }
          return;
        }
        if (msg.type === "set-active-provider") {
          const provider = msg.provider === "openrouter" || msg.provider === "gemini" ? msg.provider : "";
          try {
            await figma.clientStorage.setAsync(STORAGE_KEYS.active, provider);
          } catch (err) {
            console.warn("Failed to persist active provider:", err);
          }
          return;
        }
        if (msg.type === "load-key") {
          const provider = msg.provider === "openrouter" ? "openrouter" : msg.provider === "gemini" ? "gemini" : "all";
          try {
            const [geminiKey, openrouterKey, openrouterModel, activeProvider] = await Promise.all([
              figma.clientStorage.getAsync(STORAGE_KEYS.gemini),
              figma.clientStorage.getAsync(STORAGE_KEYS.openrouter),
              figma.clientStorage.getAsync(STORAGE_KEYS.openrouterModel),
              figma.clientStorage.getAsync(STORAGE_KEYS.active)
            ]);
            figma.ui.postMessage({
              type: "key-loaded",
              provider,
              key: provider === "openrouter" ? String(openrouterKey || "") : provider === "gemini" ? String(geminiKey || "") : "",
              keys: {
                gemini: String(geminiKey || ""),
                openrouter: String(openrouterKey || "")
              },
              models: { openrouter: String(openrouterModel || "") },
              activeProvider: typeof activeProvider === "string" ? activeProvider : ""
            });
          } catch (e) {
            figma.ui.postMessage({
              type: "key-loaded",
              key: "",
              provider,
              keys: { gemini: "", openrouter: "" },
              models: { openrouter: "" },
              activeProvider: "",
              error: describeError(e)
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
            (node) => node.type === "TEXT"
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
          } catch (err) {
            figma.notify("Couldn't apply copy: " + describeError(err));
          }
          return;
        }
      } catch (e) {
        figma.ui.postMessage({ type: "error", error: describeError(e) });
      }
    };
  });
})();
