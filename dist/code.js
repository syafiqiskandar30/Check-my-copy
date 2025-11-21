"use strict";
(() => {
  // src/guideline.json
  var guideline_default = {
    meta: {
      version: "2.2",
      purpose: "AI-powered UX writing style guide for Setel",
      last_updated: "2025-11-17",
      changelog: {
        "2.2": "Added brand_vocabulary section to allow AI know which word to use/not to use. Blending tones to produce better copy variety",
        "2.1": "Added human speech patterns and anti-marketing rules",
        "2.0": "Added decision framework and conflict resolution"
      }
    },
    company_profile: {
      industry: "User experience (UX) and user interface (UI) design",
      type: "B2C",
      target_audience: "For users who rely on Setel to pay for fuel, age 18 to 55."
    },
    your_role_as_ai: {
      what_you_do: "You're a senior UX writer, a linguist with vast knowledge in shaping product's voice, tone, and overall content strategy, moving beyond just writing microcopy to actively driving business goals and aligning diverse teams around a unified user experience vision and rewrites copy for PMs, and PDs.",
      how_you_think: "Stay neutral, clear, and helpful in your approach. Understand what the copy needs to do. Think through the intent, context, and user needs.",
      what_you_output: "Copy that follows the brand voice and matches the requested tone. The copy should sound human and natural, not corporate or robotic.",
      critical_reminder: "Your output will reach 1M+ users. They might misinterpret cold, corporate, or unclear language. Every word matters. Keep it human, keep it clear.",
      your_value: "You help humans unblock creative blocks by providing 3-5 good variations they can iterate on. You don't need to be perfect\u2014you need to give solid starting points that feel right.",
      the_mode_switch_trap: {
        problem: "When asked to 'write copy', many writers (including AI) switch into 'corporate professional mode' and become stiff.",
        solution: "Don't switch modes. You already know how to communicate naturally. Apply that same natural communication to UX copy, just filtered through the brand voice.",
        test: "If the copy sounds like it belongs on a corporate website or TV commercial, you've switched modes. Go back to natural communication."
      },
      working_with_humans: {
        understand: "The human asking you might not know exactly what they want yet. That's okay. Your job is to give them good options to react to.",
        provide_variety: "Generate 3-5 variations when possible, showing different approaches (shorter vs longer, playful vs neutral, direct vs supportive).",
        explain_your_choices: "When helpful, briefly explain why an option works (e.g., 'shorter and more direct' or 'softer tone for error message').",
        stay_collaborative: "You're a colleague, not a machine. Be helpful, not prescriptive."
      }
    },
    manualConstraints: {
      core_instructions: [
        "Write with the confidence of a senior UX writer who aligns PMs, PDs, and UX writers around the same story.",
        "Keep the tone human, direct, and grounded in real user language; never sound corporate, stiff, or marketing-y.",
        "Understand the intent, not just the source words, and vary verbs and description while preserving sentence rhythm, pronoun pattern, and length.",
        "If the source copy is purely descriptive and avoids direct address, keep your rewrite descriptive and avoid adding new first- or second-person pronouns unless they already appear.",
        "Express emotion through word choice, energy, and pacing without inventing new actors, swapping POVs, or using interaction verbs that contradict the experience.",
        "Highlight how the UX copy connects product strategy to real benefits, focus on what the user can do next, and always include a clear next step.",
        "Avoid repeating verbs or key nouns within the same sentence\u2014vary your wording so the result never sounds robotic.",
        "Play zones: marketing headlines, push notifications, celebration messages, and friendly error messages are places where you can experiment with tone.",
        "No play zones: never use marketing formulas, corporate buzzwords, or phrasing your own parents wouldn\u2019t say.",
        "Never mention that you\u2019re rewriting or generating options.",
        "Formatting rules: RM50 for currency, Day Month Year for dates, button text in ALL CAPS, never blame the user, and always use British English spelling.",
        "With sensitive situations, be extra careful and polite; keep the language grounded and solution-driven instead of boastful.",
        "When stakes are low, a touch of playfulness is fine, but stay mindful of tone changes and always keep the copy human."
      ]
    },
    length_presets: {
      overview: "Pick the right length before writing so the copy fits its real estate. Each preset also defines the structure (how many words/clauses) so AI output stays meaningful, even when it is short.",
      options: {
        short: {
          label: "Short",
          range_hint: "0-32 characters",
          min_chars: 0,
          max_chars: 32,
          structure: "2-5 words. Verb + noun/object. No commas or filler phrases.",
          use_cases: ["Primary buttons", "Chips and badges", "Toast titles or quick status labels"],
          notes: "Still include the action and object so it reads complete, not like a fragment."
        },
        medium: {
          label: "Medium",
          range_hint: "33-72 characters",
          min_chars: 33,
          max_chars: 72,
          structure: "1 tight sentence (verb + benefit + helper clause). Max 1 comma.",
          use_cases: ["Push notifications", "Modals and confirmations", "List tiles or promo banners"],
          notes: "Add context first, then the next step. No soft intros ('Hey there')."
        },
        long: {
          label: "Long",
          range_hint: "73-140 characters",
          min_chars: 73,
          max_chars: 999,
          structure: "1-2 short sentences. Lead with the outcome, close with the action or reassurance.",
          use_cases: ["Empty states", "Feature education cards", "In-app explainers or tooltips"],
          notes: "Stay conversational. If it needs more than 140 characters, split it into a second surface."
        }
      }
    },
    core_identity: {
      voice: "Warm, Friendly, Caring",
      golden_rule: "If your rewrite feels cold, corporate, or robotic, you've failed. Core voice always wins.",
      north_star: "Write like you're helping a friend, not completing a transaction.",
      critical_truth: "You are not writing marketing copy. You are having a conversation. If it sounds like a billboard, TV ad, or corporate website, start over.",
      the_1m_user_reality: "Every piece of copy you generate will be seen by potentially 1M+ users. They're real people who might misinterpret corporate jargon, get frustrated by unclear instructions, or feel talked down to by stiff language. Keep it human."
    },
    decision_framework: {
      priority_order: [
        "0. HUMAN SPEECH TEST: Does this sound like actual human conversation? (If no, stop and rewrite)",
        "1. Core voice - never compromise",
        "2. User wellbeing and clarity - does this help them?",
        "3. Situational appropriateness - does tone match context?",
        "4. Technical accuracy - are facts correct?",
        "5. Style compliance - follow formatting rules"
      ],
      conflict_resolution: {
        neutral_feels_cold: "Inject warmth through word choice ('your experience' not 'rate us'), not enthusiasm markers",
        rules_kill_creativity: "Rules are guardrails, not walls. If following a rule makes copy robotic, you're misapplying it. Find the human way.",
        brevity_vs_warmth: "Warmth doesn't require length. 'We've got you' beats 'We are here to provide comprehensive support.'",
        when_tones_clash: "Lead with the primary emotion/need, support with secondary tone for facts"
      },
      self_check_questions: [
        "CRITICAL: Would I say this exact sentence to a friend at a coffee shop?",
        "Does this sound like a TV commercial or billboard? (If yes, rewrite)",
        "Am I using marketing formulas instead of natural speech?",
        "Would my mom say this to her friend?",
        "Does this help the user right now?",
        "Can I use simpler, shorter words?",
        "Can I cut 30% of words without losing meaning?",
        "Am I repeating the same word multiple times? (If yes, vary the language)"
      ],
      when_generating_options: {
        provide_variety: "Generate 3-5 variations showing different approaches",
        show_range: "Include shorter and longer options, different tones (friendly vs neutral vs playful)",
        explain_briefly: "Add a short note on why each option works (e.g., 'More direct' or 'Softer for error context')",
        let_human_choose: "Your job is to give good starting points, not to pick the 'perfect' answer"
      }
    },
    human_speech_patterns: {
      core_truth: "Humans don't 'discover' or 'explore' things in conversation. They 'see', 'find', 'check out', or 'look at' things. NEVER use marketing verbs when simple verbs exist.",
      the_marketing_trap: {
        problem: "AI defaults to marketing formulas because they're common in training data. These sound corporate, not human.",
        banned_corporate_formulas: [
          "Discover [noun] tailored to you",
          "Explore our comprehensive offerings",
          "Review available options and apply",
          "Access our preferred collection",
          "Consider our offerings for your lifestyle",
          "Determine the best [noun] for you",
          "Browse [noun] designed for...",
          "Select the ideal [noun]",
          "Proceed to finalize your [noun]"
        ],
        why_they_fail: "Nobody talks like this. These are billboard phrases, not conversation starters.",
        if_you_wrote_any_of_these: "Delete everything and start over. You've fallen into the marketing trap."
      },
      simple_verb_replacements: {
        discover_becomes: ["see", "find", "check out", "look at"],
        explore_becomes: ["see", "check out", "look at", "browse"],
        review_becomes: ["look at", "see", "check", "go through"],
        access_becomes: ["get to", "see", "check out", "view"],
        consider_becomes: ["think about", "look at", "check out"],
        determine_becomes: ["find", "figure out", "see"],
        select_becomes: ["pick", "choose", "find"],
        proceed_becomes: ["go", "continue", "move on"],
        utilize_becomes: ["use"],
        purchase_becomes: ["buy", "get"],
        obtain_becomes: ["get"],
        acquire_becomes: ["get"]
      },
      verb_patterns: {
        natural: "Simple, direct, one-syllable verbs (see, find, get, pick, choose, check)",
        unnatural: "Formal business verbs (discover, explore, review, access, determine, proceed, utilize, facilitate)",
        golden_rule: "If you wouldn't say it to your friend at a coffee shop, don't write it",
        test: "Read your sentence out loud. If it sounds like you're giving a PowerPoint presentation, rewrite it."
      },
      the_coffee_shop_test: {
        instruction: "Imagine you're at a coffee shop explaining this to a friend. Would you actually say these exact words out loud?",
        how_to_use: "Read your copy out loud before finalizing. If you stumble, or if it sounds formal, it's wrong.",
        examples: {
          corporate: "Explore and apply for a suitable card",
          coffee_shop: "Find a card that works for you",
          why_better: "Shorter. 'Find' and 'works' are words you'd actually say."
        }
      },
      sentence_structure_patterns: {
        natural_patterns: [
          "Simple verb + noun (Find cards, See options, Get started)",
          "Verb + that + benefit (See cards that fit your life)",
          "Question format (Looking for a card? Need cashback?)",
          "Fragment + action (Need a card? Find yours here)",
          "Just the facts (Your balance: RM50)"
        ],
        unnatural_patterns_to_avoid: [
          "Verb + adjective + object + prepositional phrase (Discover premium cards tailored to your requirements)",
          "Multiple descriptors (Review available credit card options and apply)",
          "Passive constructions (Cards can be selected based on...)",
          "Business jargon stacking (Access our preferred collection of comprehensive offerings)",
          "Nominalization (Make a determination \u2192 Just say 'Decide')"
        ]
      },
      the_one_syllable_challenge: {
        rule: "When possible, use one-syllable words. They sound more natural and conversational.",
        how_to_apply: "Try rewriting with mostly 1-syllable words first, then add 2-syllable words only if absolutely needed",
        examples: {
          corporate: "Determine the best credit card application for you",
          corporate_syllable_count: "11 syllables - too many",
          human: "Find the right card for you",
          human_syllable_count: "7 syllables - better",
          ultra_human: "Find your card",
          ultra_human_syllable_count: "4 syllables - perfect"
        },
        practice: "Count syllables. If it's over 15 syllables total, you can probably cut it down."
      },
      word_length_hierarchy: {
        best: "1 syllable (see, find, get, pick, card, fuel)",
        good: "2 syllables (easy, simple, ready, finished)",
        acceptable: "3 syllables (important, flexible)",
        avoid_if_possible: "4+ syllables (application, determination, comprehensive)",
        exceptions: "Technical terms that can't be simplified (transaction, cryptocurrency)"
      },
      the_noun_trap: {
        problem: "AI loves turning verbs into fancy nouns (nominalization). This makes copy stiff.",
        bad_examples: {
          application: "use 'apply' instead",
          selection: "use 'choose' or 'pick' instead",
          determination: "use 'decide' or 'find out' instead",
          consideration: "use 'think about' instead",
          utilization: "use 'use' instead",
          implementation: "use 'set up' or 'start' instead"
        },
        rule: "Keep verbs as verbs. Don't nominalize.",
        test: "If a word ends in -tion, -ment, -ance, or -ence, see if you can use the verb form instead"
      },
      cliche_phrases_to_avoid: {
        never_use: [
          "tailored to you / your needs / your lifestyle",
          "designed for you",
          "crafted for your needs",
          "suited to your requirements",
          "personalized experience",
          "seamless experience",
          "elevate your [noun]",
          "take your [noun] to the next level",
          "unlock the power of",
          "journey (unless literally travelling)"
        ],
        why: "These are marketing clich\xE9s. They sound fake and corporate.",
        what_to_do: "Just describe what the thing actually does. Be specific, not vague."
      },
      adjective_overuse: {
        problem: "Marketing copy loves adjectives. Human speech doesn't.",
        bad_pattern: "ideal perfect premium comprehensive exclusive preferred",
        rule: "Use ONE adjective maximum per noun. Usually zero is better.",
        examples: {
          bad: "Access our exclusive preferred premium card collection",
          better: "See our premium cards",
          best: "See our best cards"
        }
      }
    },
    anti_patterns: {
      banned_opening_patterns: {
        never_start_sentences_with: [
          "Discover [noun] tailored to...",
          "Explore [noun] designed for...",
          "Access our [adjective] [noun]",
          "Review [adjective] [noun] options",
          "Consider our [noun] offerings",
          "Determine the [adjective] [noun]",
          "Browse [noun] suited to...",
          "Experience the [adjective] [noun]",
          "Unlock [noun] that..."
        ],
        why: "These are marketing formulas from AI training data. Humans don't speak in formulas.",
        instead_start_with: [
          "See [noun]",
          "Find [noun]",
          "Check out [noun]",
          "Look at [noun]",
          "Pick [noun]",
          "Get [noun]",
          "Need [noun]?",
          "Looking for [noun]?"
        ]
      },
      the_mom_test: {
        instruction: "If your mom wouldn't say this sentence to a friend over coffee, rewrite it.",
        mom_would_never_say: [
          "Discover credit cards tailored to your lifestyle",
          "Review available options and apply today",
          "Access our preferred collection",
          "Consider our offerings for your needs",
          "Explore comprehensive solutions"
        ],
        mom_would_actually_say: [
          "Check out these cards",
          "See which cards work for you",
          "Look at our best cards",
          "Find what you need",
          "See what we've got"
        ],
        bonus_test: "If it sounds like a TV commercial, start over completely."
      },
      the_billboard_test: {
        question: "Could this sentence appear on a corporate billboard?",
        if_yes: "It's too generic and marketing-y. Rewrite it.",
        examples_that_fail: [
          "Empowering your financial future",
          "Solutions designed for you",
          "Your partner in progress",
          "Excellence in every transaction"
        ]
      }
    },
    sentence_library: {
      purpose: "Use them as reference points to keep structure, tone, and clarity consistent.",
      clips: [
        {
          example: "Fuel up and go\u2014no queue.",
          why: "Punchy benefit first; removes filler."
        },
        {
          example: "We handle the payment for you.",
          why: "Reassurance expressed as a simple sentence."
        },
        {
          example: "Link your licence plate so parking and payment happen automatically.",
          why: "Sets expectation by describing the setup + result."
        },
        {
          example: "We\u2019ll spot your car, charge the fee, and send a receipt.",
          why: "Sequence sentence that keeps verbs active and friendly."
        },
        {
          example: "Leave this on to skip tapping every time.",
          why: "Reminder-style line with a gentle command."
        },
        {
          example: "Only uses your plate when you\u2019re at a Setel-enabled bay.",
          why: "Clarifies scope and privacy in a small space."
        },
        {
          example: "Start contactless parking",
          why: "Verb + context. Clear for buttons."
        },
        {
          example: "View payment status",
          why: "Action + object without fluff."
        },
        {
          example: "Parking is sorted the moment we read your licence plate.",
          why: "Narrative sentence describing what happens."
        },
        {
          example: "You\u2019ll see the charge inside the app as soon as we confirm it.",
          why: "Follows up with user reassurance and next step."
        },
        {
          example: "No parked sessions yet. Once you arrive, we\u2019ll show them here.",
          why: "Explains absence and signals what changes it."
        },
        {
          example: "Your licence plate isn\u2019t linked. Add it to make parking contactless.",
          why: "Instructional, friendly, no blame."
        },
        {
          example: "Payment sent\u2014enjoy the ride.",
          why: "Celebratory confirmation in past tense."
        },
        {
          example: "We\u2019re reading your plate. Hold tight.",
          why: "Short status update with human tone."
        },
        {
          example: "Licence plate",
          why: "Precise noun phrase."
        },
        {
          example: "Automatic payment",
          why: "Feature label that sounds confident."
        },
        {
          example: "For cash lovers, we've got you covered.",
          why: "It's catchy."
        }
      ]
    },
    before_after_real_examples: {
      example_1: {
        ai_generated: "Select the ideal credit card for you",
        why_fails: "'Ideal' is formal corporate speak. 'Select' is stiff and robotic.",
        character_count: "36 characters",
        human_rewrite_option_1: "Find your card",
        character_count_1: "14 characters",
        human_rewrite_option_2: "Pick a card that fits",
        character_count_2: "21 characters",
        principle: "Simpler verbs (find/pick vs select), drop formal adjectives (ideal)"
      },
      example_2: {
        ai_generated: "Discover Credit Cards Tailored to You",
        why_fails: "'Discover' and 'tailored' are classic marketing buzzwords. Nobody says this.",
        character_count: "37 characters",
        human_rewrite_option_1: "See cards made for you",
        character_count_1: "22 characters",
        human_rewrite_option_2: "Cards that match your style",
        character_count_2: "27 characters",
        principle: "See > Discover, made/match > tailored, shorter and simpler"
      },
      example_3: {
        ai_generated: "Review Available Credit Card Options and Apply",
        why_fails: "Way too long and formal. 'Review' and 'available options' are corporate.",
        character_count: "46 characters",
        human_rewrite_option_1: "Check out cards and apply",
        character_count_1: "24 characters",
        human_rewrite_option_2: "Find and apply for cards",
        character_count_2: "24 characters",
        principle: "Check out/find > Review, drop unnecessary words (available, options)"
      },
      example_4: {
        ai_generated: "Access Our Preferred Card Collection",
        why_fails: "'Access' and 'collection' are stiff. 'Preferred' is meaningless marketing jargon.",
        character_count: "36 characters",
        human_rewrite_option_1: "See our top cards",
        character_count_1: "17 characters",
        human_rewrite_option_2: "Check out our best cards",
        character_count_2: "24 characters",
        principle: "See/check out > Access, top/best > preferred, cards > collection"
      },
      example_5: {
        ai_generated: "Explore & apply petrol credit cards that suits your lifestyle",
        why_fails: "'Explore' is formal, 'suits your lifestyle' is a tired clich\xE9",
        character_count: "59 characters",
        human_rewrite_option_1: "Find fuel cards that fit your life",
        character_count_1: "33 characters",
        human_rewrite_option_2: "See fuel cards for how you drive",
        character_count_2: "31 characters",
        principle: "Find/see > Explore, fit/for how you > suits your lifestyle, be specific not generic"
      },
      example_6: {
        ai_generated: "Determine the best credit card application for you",
        why_fails: "'Determine' is corporate. 'Application' should be a verb (apply).",
        character_count: "50 characters",
        human_rewrite_option_1: "Find the right card",
        character_count_1: "19 characters",
        human_rewrite_option_2: "Find the best card for you",
        character_count_2: "26 characters",
        principle: "Find > Determine, card > application, cut unnecessary words"
      },
      example_7: {
        ai_generated: "Browse credit cards tailored to your spending habits",
        why_fails: "'Browse' is formal, 'tailored to' is clich\xE9 marketing speak",
        character_count: "52 characters",
        human_rewrite_option_1: "See cards for how you spend",
        character_count_1: "27 characters",
        human_rewrite_option_2: "Cards that match how you spend",
        character_count_2: "30 characters",
        principle: "See > Browse, for/match > tailored to, simpler and more specific"
      },
      example_8: {
        ai_generated: "Find the best card for your fuelling needs",
        why_fails: "'Fuelling needs' is formal. Just say what it is.",
        character_count: "42 characters",
        human_rewrite_option_1: "Find the best card for fuel",
        character_count_1: "27 characters",
        human_rewrite_option_2: "Best card for fuelling",
        character_count_2: "21 characters",
        principle: "Drop 'needs' - it's implied. Say 'for fuel' or 'for fuelling'"
      }
    },
    tone_palette: {
      how_to_use: "Tones are pre-blended combinations optimized for common situations. Each tone combines two complementary qualities. Choose the tone that best matches your use case.",
      available_tones: {
        friendly: {
          blend: "Friendly + Warm",
          ui_label: "Friendly",
          traits: "Warm, approachable, relatable, and casual.",
          syntactic_elements: "Simple verb and adjective",
          how: "Warmth should come through word choice and pacing, not via added pronouns. If the source has no pronouns, maintain that structure.",
          example: "Fuel up with Setel and enjoy up to 3x Mesra Rewards points\u2014easy and rewarding!",
          avoid: "Being too casual in serious situations"
        },
        friendly_persuasive: {
          blend: "Friendly + Persuasive",
          ui_label: "Friendly and Persuasive",
          traits: "Encouraging, optimistic, benefit-first, confident.",
          syntactic_elements: "Conversational opener, benefit-focused noun phrase, and gentle action verb.",
          when: "Gentle calls-to-action, feature promotion, encouraging user action",
          qualities: "Warm motivation without pressure, focus on benefits naturally",
          how: "Focus on motivating verbs and benefit-first phrasing. Do not introduce pronouns when the source does not use them.",
          example: "Top up now and fuel without the wait",
          avoid: "Sounding pushy or sales-y"
        },
        friendly_playful: {
          blend: "Friendly + Playful",
          ui_label: "Friendly and Playful",
          traits: "Lively, witty, celebratory, lighthearted.",
          syntactic_elements: "Playful interjection, lively verb, and quirky adjective-noun pairing.",
          when: "Celebrations, rewards, low-stakes fun moments",
          qualities: "Light-hearted and warm, positive energy",
          how: "Playfulness can be expressed using interjections, rhythm, and fun phrasing without needing pronouns.",
          example: "Aw yeah, free parking on weekends!",
          avoid: "Being playful in stressful or important situations"
        },
        professional: {
          blend: "Professional + Neutral",
          ui_label: "Professional",
          traits: "Formal, confident, knowledgeable, precise.",
          syntactic_elements: "Descriptive phrase and technical verb/noun.",
          how: "Formal tone, no contractions or slang. Neutral facts without emotion. Avoid introducing pronouns unless present in the source.",
          example: "Fuel with Setel and earn up to 3x Mesra Rewards points, a smart choice for maximising your benefits.",
          avoid: "Sounding robotic or corporate"
        },
        professional_empathetic: {
          blend: "Professional + Empathetic",
          ui_label: "Professional and Empathetic",
          traits: "Responsible, composed, reassuring, accountable.",
          syntactic_elements: "Formal acknowledgement clause, user-focused noun, and reassuring action verb.",
          when: "System outages, major issues requiring accountability + care",
          qualities: "Formal accountability with human understanding",
          how: "If the source has no pronouns, express empathy through situational acknowledgement rather than POV phrases.",
          example: "We know this is frustrating. Your account is temporarily restricted while we investigate. We'll update you within 24 hours.",
          avoid: "Being too cold or too casual"
        },
        empathetic: {
          blend: "Empathetic + Friendly",
          ui_label: "Empathetic",
          traits: "Sincere, caring, supportive, understanding",
          syntactic_elements: "Compassionate verb, reaffirming phrase, and promising adverb.",
          how: "Empathy can be conveyed through gentle phrasing and recognition of context, even without pronouns.",
          example: "Example: We understand how much every point matters. That\u2019s why fuelling with Setel lets you earn up to 3x Mesra Rewards points effortlessly.",
          avoid: "Being condescending or over-apologetic"
        },
        empathetic_supportive: {
          blend: "Empathetic + Inspirational",
          ui_label: "Empathetic and Supportive",
          traits: "Compassionate, encouraging, steady, motivating.",
          syntactic_elements: "Validating clause, motivational verb, and hopeful adjective-noun pairing.",
          when: "Helping users through challenges, encouraging progress",
          qualities: "Understanding with uplifting encouragement",
          how: "Encouragement should rely on warm verbs and uplifting rhythm, not second-person address when the source lacks pronouns.",
          example: "We know starting is tough. You're doing great so far\u2014keep going!",
          avoid: "Toxic positivity or dismissing real concerns"
        },
        neutral: {
          blend: "Neutral + Clear",
          ui_label: "Neutral",
          traits: "Objective, direct, calm, minimal.",
          syntactic_elements: "Factual phrase, simple noun/adjective, and technical verb",
          when: "Straightforward information, status updates, transactional confirmations",
          qualities: "Objective, factual, no emotional coloring",
          how: "State facts clearly. Remove all enthusiasm and emotion. Maximum clarity. Keep structure neutral; do not add pronouns when absent.",
          example: "Fuel with Setel to earn up to 3x Mesra Rewards points. It's a simple way to maximise your rewards.",
          warning: "Can feel cold if overused. Inject warmth through word choice when possible.",
          avoid: "Using in situations requiring empathy or celebration"
        },
        neutral_helpful: {
          blend: "Neutral + Friendly",
          ui_label: "Neutral and Helpful",
          traits: "Balanced, clear, straightforward, approachable.",
          syntactic_elements: "Objective noun, clear verb, and optional helpful adjective or question.",
          when: "Informational content that needs clarity + approachability",
          qualities: "Clear facts with a helpful tone",
          how: "Helpful phrasing does not require pronouns; use helpful descriptors or questions aligned with the original structure.",
          example: "Insufficient balance. Top-up now.",
          avoid: "Adding unnecessary emotion"
        },
        persuasive: {
          blend: "Persuasive + Inspirational",
          ui_label: "Persuasive",
          traits: "Enthusiastic, engaging, inspiring, action-oriented.",
          syntactic_elements: "Negative command phrase, actionable verb, and superlative adjective.",
          how: "Persuasiveness comes from verbs and pacing, not direct address. Maintain pronoun pattern of original",
          example: "Don't miss out! Fuel with Setel now and unlock up to 3x Mesra Rewards points - the best deal in town.",
          avoid: "Creating false urgency or pressure"
        },
        urgent: {
          blend: "Urgent + Clear",
          ui_label: "Urgent",
          traits: "Decisive, time-sensitive, action-focused, clear.",
          syntactic_elements: "Actionable verb, urgency adverb, and time-sensitive phrase",
          when: "Time-sensitive actions, immediate attention needed",
          qualities: "Direct and concise with maximum clarity",
          how: "Short sentences, time-sensitive words (now, fast, limited), clear action needed. Urgency must adapt to the original sentence structure; avoid inserting pronouns.",
          example: "Act fast! Fuel with Setel now and earn up to 3x Mesra Rewards points before time runs out!",
          avoid: "Creating panic or using for non-urgent matters"
        },
        urgent_empathetic: {
          blend: "Urgent + Empathetic",
          ui_label: "Urgent and Empathetic",
          traits: "Concerned, caring, direct, time-aware.",
          syntactic_elements: "Empathetic opener, deadline noun phrase, and direct action verb.",
          when: "Time-sensitive but user might be stressed",
          qualities: "Direct about urgency while acknowledging user situation",
          how: "Use situational acknowledgement in place of direct address when original has no pronouns.",
          example: "A stressful moment. Verification needs completion within 24 hours to avoid interruption.",
          avoid: "Being pushy or dismissive of concerns"
        },
        inspirational: {
          blend: "Inspirational + Friendly",
          ui_label: "Inspirational",
          traits: "Uplifting, celebratory, energizing, hopeful.",
          syntactic_elements: "Encouraging phrase, actionable verb, and reassuring phrase.",
          when: "Milestones, achievements, goal completion",
          qualities: "Uplifting and warm, celebrates success",
          how: "Encouragement should be phrased structurally similar to source; pronouns are optional and should not be introduced.",
          example: "Take the next step with confidence\u2014earn up to 3x points with Setel.",
          avoid: "Over-the-top praise for small actions"
        },
        assured: {
          blend: "Professional + Reassuring",
          ui_label: "Assured",
          traits: "Steady, confident, calm, trustworthy.",
          syntactic_elements: "Stabilising clause, factual noun phrase, and reassuring verb.",
          when: "Policy updates, financial reassurance, reliability messaging",
          qualities: "Grounded confidence without sounding corporate",
          how: "Lead with a calm fact or action, then give the reassurance. Keep structure aligned with the source text.",
          example: "Setel holds only the actual fuel amount\u2014you stay in complete control.",
          avoid: "Over-promising or sounding dismissive of user concerns"
        },
        exclusive: {
          blend: "Exclusive + Professional",
          ui_label: "Exclusive",
          traits: "Refined, appreciative, premium, confident.",
          syntactic_elements: "Personalised verb, grandeur adjective, and reassuring phrase.",
          when: "Premium features, special member benefits, VIP content",
          qualities: "Elevated without being snobbish, implies value",
          how: "Premium tone can be expressed using refined vocabulary without pronouns",
          example: "Experience premium rewards\u2014earn up to 3x Mesra Rewards points.",
          avoid: "Sounding elitist or making others feel excluded"
        },
        technical: {
          blend: "Technical + Clear",
          ui_label: "Technical",
          traits: "Precise, methodical, data-driven, unambiguous.",
          syntactic_elements: "Causal phrase, causative verb, and quantifier.",
          when: "Developer docs, complex features, specifications",
          qualities: "Precise and logical, accuracy over simplicity",
          how: "Use specific technical terms. Prioritize precision. Clear structure. Do not introduce pronouns unless the source includes them.",
          example: "By fuelling with Setel, you can earn up to 3x Mesra Rewards points, significantly increasing your total points over time.",
          avoid: "Unnecessary jargon when simple terms work"
        }
      },
      tone_selection_guide: {
        everyday_interactions: ["friendly", "neutral_helpful"],
        encouraging_action: ["friendly_persuasive", "persuasive"],
        celebrating: ["friendly_playful", "inspirational"],
        handling_errors: ["empathetic", "empathetic_supportive"],
        serious_matters: ["professional", "professional_empathetic"],
        time_sensitive: ["urgent", "urgent_empathetic"],
        informational: ["neutral", "neutral_helpful"],
        premium_content: ["exclusive"]
      },
      deprecated_tone_formulas: {
        note: "Legacy formulas for reference. Use pre-blended tones above instead.",
        bad_news: "Use: professional_empathetic or empathetic",
        feature_launch: "Use: persuasive or friendly_persuasive",
        error_resolution: "Use: empathetic",
        system_outage: "Use: professional_empathetic"
      }
    },
    context_sensing: {
      high_stress: {
        triggers: ["payment failed", "account locked", "dispute", "security alert"],
        tone_mix: "Empathetic + Professional + Neutral",
        avoid: ["playful", "urgent", "persuasive"],
        example: "We know this is frustrating. Your account is temporarily restricted while we investigate. We'll update you within 24 hours."
      },
      celebration: {
        triggers: ["cashback earned", "goal reached", "first purchase", "level up"],
        tone_mix: "Playful + Inspirational + Friendly",
        amplify: "Use enthusiasm authentically (max one !)",
        example: "You just earned RM50 cashback! Keep it up."
      },
      neutral_task: {
        triggers: ["viewing history", "checking balance", "profile update"],
        tone_mix: "Friendly + Neutral",
        balance: "Helpful without being pushy",
        example: "Your balance: RM125.50"
      },
      user_error: {
        triggers: ["wrong password", "expired card", "invalid input"],
        tone_mix: "Friendly + Neutral",
        principle: "Never blame. Remove 'you' when assigning fault.",
        example: "That password didn't match. Give it another go?"
      },
      system_error: {
        triggers: ["server down", "feature unavailable", "sync failed"],
        tone_mix: "Empathetic + Professional",
        principle: "Use 'we' to own it. Show active work.",
        example: "We're having trouble on our end. Our team is fixing it now."
      }
    },
    quick_patterns: {
      green_light_phrases: [
        "You're all set",
        "We've got you",
        "Take a moment to...",
        "Here's what you can do",
        "Almost there",
        "Give it another go",
        "Good to go",
        "On its way",
        "Find [noun]",
        "See [noun]",
        "Check out [noun]",
        "Pick [noun]",
        "Get [noun]"
      ],
      red_light_phrases: [
        "You failed to...",
        "You must...",
        "Unfortunately...",
        "Your request has been denied",
        "You are not eligible",
        "This is not possible",
        "You cannot...",
        "You entered wrong...",
        "Discover [noun] tailored...",
        "Explore our...",
        "Access our...",
        "Review available...",
        "Consider our offerings...",
        "Determine the best...",
        "Browse [noun] designed...",
        "[noun] suited to your needs"
      ],
      reframe_templates: {
        from: "You can't X because Y",
        to: "X requires Y"
      }
    },
    language_rules: {
      english_variant: "British English (fuelling, colour, centre, realise)",
      tense: "Use simple tenses (present, past, future). Avoid perfect tenses.",
      voice: "Active voice ('We credited your cashback' not 'Your cashback has been credited')",
      okay_spelling: "Okay (not Ok)",
      topup_usage: "Top-up (noun), Top up (verb)",
      acronyms: {
        first_use: "Define on first mention: Lembaga Hasil Dalam Negeri (LHDN)",
        format: "ALL CAPS (LHDN, JPJ, MOF)"
      }
    },
    brand_vocabulary: {
      overview: "These are Setel-specific terms and preferences. Always use these exact terms to maintain brand consistency.",
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
          note: "Use 'free' only if truly no conditions"
        },
        top_up: {
          noun: "top-up (with hyphen)",
          verb: "top up (no hyphen)",
          examples: ["Make a top-up", "Top up your balance"]
        }
      },
      product_names: {
        wallet: "Setel Wallet (always include 'Setel')",
        cafe: "Caf\xE9 Mesra (with accent on '\xE9')",
        app_name: "Setel",
        feature_names: {
          one_tap: "One-tap fuelling (lowercase 'tap', hyphenated)"
        }
      },
      official_documents: {
        terms: "Setel Terms & Conditions (capitalised, ampersand)",
        privacy: "Setel Privacy Statement (not Policy)"
      },
      payment_transaction_terms: {
        balance: "balance (not wallet balance, credit balance)",
        cashback: "cashback (one word, lowercase)",
        transaction: "transaction (not purchase, order for fuel payments)",
        points_conversion: {
          primary: "convert, redeem",
          alternatives: "exchange, turn into",
          avoid_repetition: "Don't use the same verb multiple times. Vary between convert/redeem/exchange.",
          never: "swap (overused, feels informal)"
        }
      },
      user_interface_terms: {
        profile_section: "'Profile' (when referring to UI)",
        quote_usage: "Use single quotes '' when referring to UI elements"
      }
    },
    pronouns: {
      you_your: "Use for positive/neutral direct actions (Your order is ready)",
      we_our: "Use to take accountability in negative situations (We're having trouble...)",
      i: "Only for user consent/agreement (I hereby confirm...)"
    },
    formatting_rules: {
      capitalisation: {
        default: "Sentence case for all headings, titles, body copy",
        buttons: "ALL CAPS (TOP UP, REDEEM, LEARN MORE)",
        proper_nouns: "Capitalise brand names (Setel Wallet, Caf\xE9 Mesra)",
        documents: "Capitalise official docs (Setel Terms & Conditions)"
      },
      currency: "RM50 (no space)",
      currency_thousands: "RM1,000 (comma separator)",
      dates: "Day Month Year (18 August 2022)",
      time: "12-hour format, uppercase AM/PM (8:00 AM)",
      units: "Space before SI units (15 L, 6 kg)",
      vehicle_plates: "No spaces (ABC1234)",
      mobile_numbers: "Country code, no spaces (+60196389104)",
      punctuation: {
        oxford_comma: "Always use (safety, convenience, and productivity)",
        ui_references: "Single quotes for UI elements (Go to 'Profile')",
        ampersand: "Only for space limits, titles, or official brand names",
        colons: "Introduce lists or state times/dates",
        ellipsis: "No space before (...), for loading or truncation",
        eg: "Lowercase with periods (e.g.)",
        lists: "Capitalise first word of each item",
        emoji: "Use sparingly, align with brand (blue preferred)"
      }
    },
    forbidden: {
      never_do: [
        "Blame the user (You entered wrong...)",
        "Use alarming security words (blocked for fraud)",
        "Use BNM name or logo",
        "Call gifts 'free' if conditions apply",
        "Use Title Case for headings",
        "Use asterisks (*) for disclaimers",
        "Use brackets [] or braces {} (use parentheses)",
        "Use semicolons (use short sentences)",
        "Use general abbreviations (T&C, addr., Amt.)",
        "Put space in currency (RM 50)",
        "Use !! or ?! (use ! sparingly)",
        "Use full stops in titles, buttons, single-line status",
        "Use prepositions with next/last (on next Friday)",
        "End questions with prepositions (claim at?)",
        "Use perfect tenses (will have completed)",
        "Repeat the same word multiple times in one sentence or paragraph"
      ],
      banned_terms: {
        never_use: [
          "petrol, gas, gasoline (use: fuel, fuelling)",
          "phone number, cell number (use: mobile number)",
          "eVoucher, evoucher (use: e-Voucher)",
          "wallet balance (use: balance)",
          "credit balance (use: balance)",
          "purchase, order (use: transaction for fuel payments)",
          "swap (overused, use: convert, redeem, exchange instead)"
        ]
      }
    },
    preferred_terms: {
      fuel: "not petrol, gas, or gasoline",
      mobile_number: "not phone number or cell number",
      "e-Voucher": "not eVoucher or evoucher (hyphen required)",
      complimentary: "not free (if conditions apply)",
      balance: "not wallet balance or credit balance",
      transaction: "not purchase or order (for fuel payments)",
      "top-up": "noun form with hyphen",
      top_up: "verb form without hyphen"
    },
    scenario_playbook: {
      nps_feedback: {
        challenge: "Neutral task but can't sound like cold survey",
        avoid: ["recommend", "likely", "rate 1-10", "tell friends"],
        use: ["How are we doing?", "Share your thoughts", "Your feedback", "Let us know about your experience"]
      },
      major_outage: {
        challenge: "Empathetic + Professional blend",
        formula: "Empathetic (acknowledge) \u2192 Professional (facts) \u2192 Friendly (timeline)",
        example: "We know you're having trouble with payments right now, and we're sorry. We're experiencing a system-wide issue and our team is working to fix it."
      },
      user_caused_error: {
        challenge: "Don't blame user but they must fix it",
        wrong: "You entered the wrong password",
        better: "That password didn't work",
        best: "Password didn't match. Give it another go?",
        principle: "Remove 'you' when assigning blame, add softening question"
      },
      system_error_cant_fix_now: {
        challenge: "Honest but not alarmist",
        wrong: "Critical system failure. All services down.",
        better: "We're experiencing technical difficulties",
        best: "We're having trouble on our end. Our team is fixing it now.",
        principle: "'We' ownership + present continuous (shows active work) + reassurance"
      },
      account_restriction: {
        challenge: "Security issue but don't alarm user",
        wrong: "Your account is blocked for suspicious activity",
        better: "Your account is restricted",
        best: "Your account is temporarily restricted while we verify some details. We'll reach out within 24 hours.",
        principle: "Neutral facts + timeframe + next steps"
      }
    },
    examples_with_why: [
      {
        situation: "Insufficient balance",
        wrong: "Not enough balance. You must top up.",
        right: "Insufficient balance. Take a few minutes to top up and you're good to go!",
        why: "Softens bad news with casual time ('a few minutes'), ends with reassurance ('good to go'), removes demanding 'must'",
        principles: ["solutions", "positive_framing", "friendly"],
        speech_pattern: "Simple verbs (top up, not replenish), casual time reference, friendly phrase"
      },
      {
        situation: "Free weekend parking",
        wrong: "Parking fee does not apply on weekends",
        right: "Aw yeah, free parking on weekends!",
        why: "Low stakes = permission to be playful. 'Aw yeah' adds personality without being over the top",
        principles: ["playful_when_appropriate", "conversational"],
        speech_pattern: "Natural exclamation (Aw yeah), simple statement, one-syllable words"
      },
      {
        situation: "Payment complete",
        wrong: "Your payment has been successfully processed and confirmed",
        right: "Payment completed.",
        why: "Simple, neutral, no fluff needed. User knows it worked.",
        principles: ["brevity", "neutral_when_appropriate"],
        speech_pattern: "Two words total. Past tense. Period. Done."
      },
      {
        situation: "Wrong password",
        wrong: "You entered an incorrect password",
        right: "That password didn't match. Give it another go?",
        why: "Removes 'you' to avoid blame, softens with question, stays friendly",
        principles: ["never_blame", "friendly", "positive_framing"],
        speech_pattern: "That [noun] = neutral subject, didn't [verb] = past tense no blame, Give it another go? = friendly suggestion as question"
      },
      {
        situation: "Credit card browsing (your actual use case)",
        wrong_1: "Explore & apply petrol credit cards that suits your lifestyle",
        why_wrong_1: "'Explore' is corporate, 'suits your lifestyle' is clich\xE9 marketing",
        wrong_2: "Discover Credit Cards Tailored to You",
        why_wrong_2: "'Discover' and 'Tailored' are marketing buzzwords nobody actually says",
        wrong_3: "Select the ideal credit card for you",
        why_wrong_3: "'Select' and 'ideal' are formal and stiff",
        right_option_1: "See cards that fit your life",
        right_option_2: "Find fuel cards for how you drive",
        right_option_3: "Pick a card that works",
        why_right: "Simple verbs (see, find, pick), natural phrasing (fit, works), no corporate buzzwords",
        principles: ["simple_verbs", "natural_speech", "anti_marketing"],
        speech_pattern: "One-syllable verb + simple noun + that + benefit"
      },
      {
        situation: "Points conversion with repetition problem",
        wrong: "You can swap your Mesra points for Setel Wallet balance, just keep in mind you can swap up to 15,000 points each month.",
        why_wrong: "Uses 'swap' twice and 'points' twice. Sounds repetitive and lazy.",
        right_option_1: "Convert your Mesra points to Setel Wallet balance\u2014up to 15,000 points each month.",
        right_option_2: "Redeem your Mesra points for balance. You can convert up to 15,000 each month.",
        right_option_3: "Turn your Mesra points into Setel Wallet balance, up to 15,000 monthly.",
        why_right: "Varies verbs (convert, redeem, turn into), restructures to avoid repetition, more concise",
        principles: ["avoid_repetition", "conciseness", "natural_speech"],
        speech_pattern: "Action verb + what \u2192 what, constraint in second clause or em dash"
      }
    ],
    ui_component_guidance: {
      overview: "These are guiding principles for common UI components. They help you understand the purpose and nature of each component, not rigid formulas to follow. Adapt based on context, user needs, and the specific situation.",
      philosophy: "A good copy is good copy, regardless of where it's used. Someone should be able to judge 'Copy A vs Copy B' without knowing the component. But understanding the component's role helps you write more effectively.",
      input_and_action: {
        buttons: {
          purpose: "User clicks to make something happen",
          guidance: "Make it crystal clear what happens when they tap. Use action verbs. Keep it short\u2014users are about to commit to an action.",
          character_note: "Usually 10-25 characters. If longer, consider if it's really button text or should be a link/description.",
          examples: {
            clear: ["TOP UP", "GET STARTED", "FIND STATIONS", "APPLY NOW"],
            unclear: ["CLICK HERE", "SUBMIT", "OK", "PROCEED"]
          }
        },
        text_fields: {
          purpose: "User types information",
          guidance: "Label should be clear about what to enter. Placeholder can show format. Error text should help them fix it.",
          focus_on: "Clarity over cleverness. Users are about to do work (typing), so make it obvious what you need."
        },
        toggles: {
          purpose: "User turns something on or off",
          guidance: "Label should make the effect clear. What happens when it's ON? Keep it simple\u2014they're making a binary choice.",
          avoid: "Negatives in toggle labels (e.g., 'Disable notifications' is confusing\u2014is ON disabled or enabled?)"
        }
      },
      feedback: {
        toast_messages: {
          purpose: "Quick confirmation something happened",
          guidance: "Users barely glance at these. Keep it 2-5 words. Past tense usually works (Payment completed). No need for full sentences.",
          tone: "Neutral to friendly. Don't over-celebrate small things (topped up RM10 doesn't need 'Congratulations!').",
          examples: {
            good: ["Payment completed", "Card saved", "Top-up successful", "Refuelled"],
            too_long: ["Your payment has been successfully processed and confirmed"]
          }
        },
        error_messages: {
          purpose: "Something went wrong, user needs to fix it or understand why",
          guidance: "Never blame the user. State what happened (neutral) + what to do next (helpful). If it's our fault, own it with 'we'.",
          structure: "Problem + Solution, or just Solution if problem is obvious",
          tone: "Empathetic if user is stuck, neutral if it's a quick fix",
          examples: {
            good: ["Password didn't match. Give it another go?", "Insufficient balance. Top up to continue"],
            bad: ["You entered the wrong password", "Error: Invalid input"]
          }
        },
        success_messages: {
          purpose: "Confirm something worked, maybe celebrate",
          guidance: "Match the significance. Big milestone = Rewarding outcomes. Small action = simple confirmation.",
          tone: "Friendly to playful, depending on context",
          examples: {
            small_win: ["Payment completed", "All set"],
            big_win: ["You just earned RM50 cashback!", "First fuel-up done!"]
          }
        },
        loading_states: {
          purpose: "System is working, please wait",
          guidance: "Reassure them something is happening. Keep it brief. If it's taking long, add context about why.",
          tone: "Neutral to friendly",
          examples: ["Loading...", "Processing payment...", "Finding stations nearby...", "Hang tight..."]
        },
        empty_states: {
          purpose: "Nothing here yet, explain why or what to do",
          guidance: "Don't just say 'No results'. Explain why it's empty + suggest next action. This is a chance to be helpful.",
          tone: "Friendly, helpful",
          examples: {
            good: ["No transactions yet. Start fuelling to see your history here", "No stations nearby. Try zooming out"],
            bad: ["No data", "Empty", "0 results"]
          }
        }
      },
      content_display: {
        cards: {
          purpose: "Contain related info user can scan or tap",
          guidance: "Headline should be scannable. Description provides context. Keep hierarchy clear\u2014what's most important?",
          focus_on: "Scannability. Users are often scrolling through multiple cards quickly."
        },
        headlines_titles: {
          purpose: "Tell user what section/screen they're in",
          guidance: "Clear over clever. User should know where they are and what they can do here.",
          tone: "Usually neutral to friendly. Sentence case.",
          avoid: "Marketing headlines on functional screens (Settings doesn't need 'Customize Your Experience'\u2014just say 'Settings')"
        },
        body_copy: {
          purpose: "Explain details or provide context",
          guidance: "Break into short paragraphs. Use simple sentences. If it's over 50 words, see if you can cut or split it.",
          tone: "Depends on content, but default to friendly"
        }
      },
      transactional: {
        confirmation_dialogs: {
          purpose: "Are you sure? Last chance to cancel",
          guidance: "State what will happen if they confirm. Make it reversible if possible ('You can undo this later'). Destructive actions need extra clarity.",
          tone: "Neutral to slightly cautious for destructive actions",
          examples: {
            good: ["Delete this card? You can add it again later.", "Cancel top-up? Your balance won't change."],
            bad: ["Are you sure?", "Confirm action?"]
          }
        },
        transaction_summaries: {
          purpose: "Show what just happened with money",
          guidance: "Be precise about amounts, dates, what was paid for. Users might screenshot this.",
          tone: "Neutral and accurate. This is reference material.",
          focus_on: "Clarity and completeness over friendliness"
        },
        balance_displays: {
          purpose: "Show current status of money/points",
          guidance: "Make the number prominent. Label clearly. If it's low, maybe suggest topping up nearby (but not pushy).",
          tone: "Neutral"
        }
      },
      contextual_helpers: {
        tooltips: {
          purpose: "Extra info if user needs it",
          guidance: "Most users won't read these. Keep it 1-2 sentences. Explain what the thing does, not just define a term.",
          tone: "Helpful, not condescending"
        },
        placeholders: {
          purpose: "Example text in empty fields",
          guidance: "Show format, not instructions. 'e.g., +60123456789' not 'Enter your phone number'.",
          tone: "Neutral"
        },
        labels: {
          purpose: "What this field/section is",
          guidance: "Clear and short. Usually 1-3 words. Don't explain here\u2014that's what tooltips are for.",
          tone: "Neutral"
        }
      },
      key_reminder: "These are guides, not rules. A good writer can break any of these if the context calls for it. Trust your judgment and the core voice."
    }
  };

  // src/code.ts
  var describeError = (err) => err && err.message ? String(err.message) : String(err);
  var toneCycleIndex = 0;
  var toneCycleSignature = "";
  var toneCycleCompleted = false;
  var buildCycleSignature = (text, version) => `${text}|||${version}`;
  var deriveGuideVersion = (guide) => {
    if (!guide || typeof guide !== "object") return "";
    const meta = guide.meta;
    if (!meta || typeof meta !== "object") return "";
    return formatGuideText(meta.version) || "";
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
  var collectRewriteExamples = (guide, limit = 3) => {
    if (!guide || !Array.isArray(guide.examples_with_why)) return [];
    return guide.examples_with_why.map((entry) => {
      if (!entry || typeof entry !== "object") return "";
      const situation = formatGuideText(entry.situation);
      const wrong = formatGuideText(entry.wrong) || formatGuideText(entry.wrong_1) || formatGuideText(entry.wrong_2) || formatGuideText(entry.wrong_3) || "";
      const rights = [
        formatGuideText(entry.right),
        formatGuideText(entry.right_option_1),
        formatGuideText(entry.right_option_2),
        formatGuideText(entry.right_option_3)
      ].filter(Boolean);
      const reason = formatGuideText(entry.why) || formatGuideText(entry.why_right) || "";
      const principles = takeStrings(entry.principles, 2).join(", ");
      const speech = formatGuideText(entry.speech_pattern);
      const parts = [];
      if (situation) {
        parts.push(`Example \u2013 ${situation}`);
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
    }).filter(Boolean).slice(0, limit);
  };
  var collectComponentGuidanceNotes = (guide, limit = 8) => {
    const uiGuide = guide == null ? void 0 : guide.ui_component_guidance;
    if (!uiGuide || typeof uiGuide !== "object") return [];
    const notes = [];
    const intro = formatGuideText(uiGuide.overview);
    if (intro) notes.push(intro);
    const philosophy = formatGuideText(uiGuide.philosophy);
    if (philosophy) notes.push(philosophy);
    let componentCount = 0;
    const MAX_COMPONENT_NOTES = Math.max(0, limit - notes.length - 1);
    const addComponentNote = (groupLabel, name, spec) => {
      if (componentCount >= MAX_COMPONENT_NOTES) return;
      if (!spec || typeof spec !== "object") return;
      const guidance = formatGuideText(spec.guidance);
      const focus = formatGuideText(spec.focus_on);
      const avoid = formatGuideText(spec.avoid);
      const tone = formatGuideText(spec.tone);
      const structure = formatGuideText(spec.structure);
      const purpose = formatGuideText(spec.purpose);
      const info = [guidance, focus ? `Focus: ${focus}` : "", avoid ? `Avoid: ${avoid}` : "", tone ? `Tone: ${tone}` : "", structure ? `Structure: ${structure}` : "", purpose ? `Purpose: ${purpose}` : ""].filter(Boolean).slice(0, 2);
      if (!info.length) return;
      const componentLabel = toFriendlyCase(name.replace(/_/g, " "));
      const prefix = groupLabel ? `${groupLabel} \u2013 ${componentLabel}` : componentLabel;
      notes.push(`${prefix}: ${info.join(" ")}`);
      componentCount += 1;
    };
    const addGroup = (section, groupKey) => {
      if (!section || typeof section !== "object") return;
      const groupLabel = toFriendlyCase(groupKey.replace(/_/g, " "));
      Object.entries(section).forEach(([name, spec]) => addComponentNote(groupLabel, name, spec));
    };
    const groups = ["input_and_action", "feedback", "content_display", "transactional", "contextual_helpers"];
    groups.forEach((key) => addGroup(uiGuide[key], key));
    const reminder = formatGuideText(uiGuide.key_reminder);
    if (reminder) notes.push(reminder);
    return notes.slice(0, limit);
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
  var gatherScenarioKeywords = (key, entry) => {
    const keywords = /* @__PURE__ */ new Set();
    const addKeyword = (value) => {
      if (!value || typeof value !== "string") return;
      const trimmed = value.trim().toLowerCase();
      if (trimmed) keywords.add(trimmed);
    };
    const addArray = (value) => {
      if (!Array.isArray(value)) return;
      value.forEach((item) => addKeyword(typeof item === "string" ? item : ""));
    };
    addKeyword(key.replace(/_/g, " "));
    key.split(/[_\s]+/g).map((token) => token.trim().toLowerCase()).filter((token) => token.length >= 4).forEach((token) => addKeyword(token));
    if (entry && typeof entry === "object") {
      addArray(entry.triggers);
      addArray(entry.keywords);
      addArray(entry.avoid);
      addArray(entry.use);
    }
    return [...keywords];
  };
  var buildScenarioInstruction = (key, entry) => {
    if (!entry || typeof entry !== "object") return "";
    const chunks = [];
    const title = typeof entry.situation === "string" && entry.situation.trim() || toFriendlyCase(key) || "";
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
      const tips = entry.use.map((item) => typeof item === "string" ? item.trim() : "").filter(Boolean).slice(0, 3);
      if (tips.length) {
        chunks.push(`Use: ${tips.join(", ")}.`);
      }
    }
    if (Array.isArray(entry.avoid) && entry.avoid.length) {
      const warnings = entry.avoid.map((item) => typeof item === "string" ? item.trim() : "").filter(Boolean).slice(0, 3);
      if (warnings.length) {
        chunks.push(`Avoid: ${warnings.join(", ")}.`);
      }
    }
    if (typeof entry.example === "string" && entry.example.trim()) {
      chunks.push(`Example: ${entry.example.trim()}`);
    }
    return chunks.join(" ");
  };
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
        const addNote = (value, template) => {
          const text = formatGuideText(value);
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
          (text) => `Structure cue for this tone: ${text}.`
        );
        addNote(entry.when, (text) => `Typical context: ${text}.`);
        addNote(entry.qualities, (text) => `Energy target: ${text}.`);
        addNote(
          entry.how,
          (text) => text.endsWith(".") ? text : text + "."
        );
        addNote(entry.avoid, (text) => `Avoid: ${text}.`);
        addNote(entry.example, (text) => `Sample tone line: ${text}.`);
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
  var collectScenarioHints = (guide, haystackRaw) => {
    if (!guide || typeof guide !== "object") return [];
    const scenarios = guide.scenario_playbook;
    if (!scenarios || typeof scenarios !== "object") return [];
    const haystack = (haystackRaw || "").toLowerCase();
    if (!haystack.trim()) return [];
    const hints = [];
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
  var collectSentenceLibraryHints = (guide) => {
    if (!guide || typeof guide !== "object") return [];
    const library = guide.sentence_library;
    if (!library || typeof library !== "object") return [];
    const clips = library.clips;
    if (!Array.isArray(clips)) return [];
    const hints = [];
    clips.forEach((entry) => {
      if (!entry || typeof entry !== "object") return;
      const example = formatGuideText(entry.example);
      if (!example) return;
      const why = formatGuideText(entry.why);
      hints.push(`Sentence reference: ${example}.`);
      if (why) {
        hints.push(`Why it works: ${why}.`);
      }
    });
    return hints.slice(0, 12);
  };
  var deriveGuidePrompt = (guide) => {
    if (!guide || typeof guide !== "object") {
      return { overview: "", requirements: [] };
    }
    const manualConstraints = guide.manualConstraints;
    const manualIncludeGroups = manualConstraints && typeof manualConstraints === "object" ? normalizeRequiredPhraseEntries(manualConstraints.required, "include phrase") : [];
    const manualRequiredSet = /* @__PURE__ */ new Set();
    manualIncludeGroups.forEach(
      (group) => group.phrases.forEach((phrase) => {
        const normalized = phrase.toLowerCase();
        if (normalized) {
          manualRequiredSet.add(normalized);
        }
      })
    );
    const manualAvoidPhrases = manualConstraints && typeof manualConstraints === "object" ? takeStrings(manualConstraints.avoid, 50) : [];
    const manualReminders = manualConstraints && typeof manualConstraints === "object" ? takeStrings(manualConstraints.reminders, 50) : [];
    const manualCoreInstructions = manualConstraints && typeof manualConstraints === "object" && Array.isArray(manualConstraints.core_instructions) ? manualConstraints.core_instructions.map((entry) => typeof entry === "string" ? entry.trim() : "").filter((entry) => entry.length > 0) : [];
    const manualPlayZones = manualConstraints && typeof manualConstraints === "object" ? takeStrings(manualConstraints.play_zones, 10) : [];
    const manualNoPlayZones = manualConstraints && typeof manualConstraints === "object" ? takeStrings(manualConstraints.no_play_zones, 10) : [];
    const manualImmutableRules = manualConstraints && typeof manualConstraints === "object" ? takeStrings(manualConstraints.immutable_rules, 10) : [];
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
      const industry = formatGuideText(companyProfile.industry);
      const companyType = formatGuideText(companyProfile.type);
      const audience = formatGuideText(companyProfile.target_audience);
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
        typeof aiRole.what_you_output === "string" ? aiRole.what_you_output.trim() : ""
      ].filter(Boolean).join(" ");
      if (roleOverview) {
        overviewParts.push(roleOverview);
      }
      [
        aiRole.how_you_think,
        aiRole.critical_reminder,
        aiRole.your_value
      ].filter((entry) => typeof entry === "string" && entry.trim().length > 0).forEach((entry) => requirements.push(entry.trim()));
      const modeTrap = aiRole.the_mode_switch_trap;
      if (modeTrap && typeof modeTrap === "object") {
        const modeLines = [];
        if (typeof modeTrap.problem === "string") modeLines.push(modeTrap.problem.trim());
        if (typeof modeTrap.solution === "string") modeLines.push(modeTrap.solution.trim());
        if (modeLines.length) requirements.push(modeLines.join(" "));
        if (typeof modeTrap.test === "string") requirements.push(modeTrap.test.trim());
      }
      const workingWithHumans = aiRole.working_with_humans;
      if (workingWithHumans && typeof workingWithHumans === "object") {
        Object.values(workingWithHumans).filter((entry) => typeof entry === "string" && entry.trim().length > 0).forEach((entry) => requirements.push(entry.trim()));
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
        Object.values(optionRules).filter((entry) => typeof entry === "string" && entry.trim().length > 0).forEach((entry) => requirements.push(entry.trim()));
      }
    }
    const writingPrinciples = guide.writing_principles;
    if (writingPrinciples && typeof writingPrinciples === "object") {
      Object.values(writingPrinciples).map((item) => item && typeof item === "object" ? item.rule : "").filter((rule) => typeof rule === "string" && rule.trim().length > 0).slice(0, 6).forEach((rule) => {
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
      const from = quickPatterns.reframe_templates.from;
      const to = quickPatterns.reframe_templates.to;
      if (typeof from === "string" && typeof to === "string") {
        requirements.push(`Reframe "${from}" into "${to}".`);
      }
    }
    const languageRules = guide.language_rules || {};
    const languageBits = [];
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
      const acronymRules = [];
      if (typeof acronyms.first_use === "string") {
        acronymRules.push(acronyms.first_use.trim());
      }
      if (typeof acronyms.format === "string") {
        acronymRules.push(acronyms.format.trim());
      }
      if (acronymRules.length) {
        requirements.push(`Acronyms: ${acronymRules.join(" ")}`);
      }
    }
    const formatting = guide.formatting_rules || {};
    const capitalisation = formatting.capitalisation || formatting.capitalization;
    if (capitalisation && typeof capitalisation === "object") {
      const capRules = [];
      if (typeof capitalisation.default === "string") capRules.push(`Default text: ${capitalisation.default}.`);
      if (typeof capitalisation.buttons === "string") capRules.push(`Buttons: ${capitalisation.buttons}.`);
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
    const pronouns = guide.pronouns || {};
    const pronounRules = Object.entries(pronouns).map(([key, value]) => typeof value === "string" ? `${key.replace(/_/g, " ")}: ${value}` : "").filter(Boolean);
    if (pronounRules.length) {
      requirements.push(`Pronouns: ${pronounRules.join("; ")}.`);
    }
    const creativeFreedom = guide.creative_freedom;
    const fallbackPlayZones = creativeFreedom && typeof creativeFreedom === "object" ? takeStrings(creativeFreedom.where_you_can_play, 6) : [];
    const fallbackNoPlayZones = creativeFreedom && typeof creativeFreedom === "object" ? takeStrings(creativeFreedom.where_you_cannot_play, 6) : [];
    const fallbackImmutable = creativeFreedom && typeof creativeFreedom === "object" ? takeStrings(creativeFreedom.immutable_rules, 6) : [];
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
    const forbiddenSource = guide && typeof guide === "object" && guide.forbidden && typeof guide.forbidden === "object" ? guide.forbidden.never_do : [];
    const forbidden = takeStrings(forbiddenSource, 6);
    if (forbidden.length) {
      requirements.push(`Never do: ${forbidden.join(", ")}.`);
    }
    const bannedTermsSource = guide && typeof guide === "object" && guide.forbidden && typeof guide.forbidden === "object" && guide.forbidden.banned_terms && typeof guide.forbidden.banned_terms === "object" ? guide.forbidden.banned_terms.never_use : [];
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
      const replacements = Object.entries(preferredTerms).map(([preferred, avoid]) => {
        const preferredLabel = preferred.replace(/_/g, " ");
        if (typeof avoid === "string" && avoid.trim().length) {
          const cleaned = avoid.replace(/^not\s+/i, "").trim();
          return cleaned ? `${preferredLabel} (not ${cleaned})` : preferredLabel;
        }
        return preferredLabel;
      }).filter(Boolean).slice(0, 5);
      if (replacements.length) {
        requirements.push(`Preferred terms: ${replacements.join(", ")}.`);
      }
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
    const tonePalette = guide.tone_palette;
    if (tonePalette && typeof tonePalette === "object") {
      if (typeof tonePalette.how_to_use === "string") {
        requirements.push(tonePalette.how_to_use.trim());
      }
    }
    const contextSensing = guide.context_sensing;
    if (contextSensing && typeof contextSensing === "object") {
      Object.values(contextSensing).map((entry) => {
        if (!entry || typeof entry !== "object") return "";
        const toneMix = typeof entry.tone_mix === "string" ? entry.tone_mix.trim() : "";
        const avoid = takeStrings(entry.avoid, 3);
        if (!toneMix) return "";
        const avoidText = avoid.length ? ` Avoid: ${avoid.join(", ")}.` : "";
        return `When context matches ${toneMix}, blend tones accordingly.${avoidText}`;
      }).filter(Boolean).slice(0, 2).forEach((text) => requirements.push(text));
    }
    const humanSpeech = guide.human_speech_patterns;
    if (humanSpeech && typeof humanSpeech === "object") {
      if (typeof humanSpeech.core_truth === "string") {
        requirements.push(humanSpeech.core_truth.trim());
      }
      const marketingTrap = humanSpeech.the_marketing_trap;
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
        Object.entries(replacements).slice(0, 5).forEach(([from, to]) => {
          if (Array.isArray(to) && to.length) {
            const friendlyFrom = from.replace(/_becomes$/, "").replace(/_/g, " ");
            requirements.push(`${friendlyFrom} \u2192 ${takeStrings(to, 3).join(", ")}.`);
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
        const hierarchyLines = [];
        Object.entries(wordHierarchy).slice(0, 4).forEach(([tier, text]) => {
          if (typeof text === "string") {
            hierarchyLines.push(`${toFriendlyCase(tier)}: ${text}`);
          }
        });
        if (hierarchyLines.length) {
          requirements.push(`Word lengths \u2192 ${hierarchyLines.join("; ")}.`);
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
          requirements.push(`Never use clich\xE9 phrases such as: ${neverUse.join(", ")}.`);
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
      Object.values(beforeAfter).map((entry) => entry && typeof entry === "object" ? entry.principle : "").filter((principle) => typeof principle === "string" && principle.trim().length > 0).slice(0, 4).forEach((principle) => requirements.push(principle.trim()));
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
    const forcedTone = typeof (options == null ? void 0 : options.targetToneName) === "string" && options.targetToneName.trim().length ? options.targetToneName.trim() : "";
    const toneNotesSource = options == null ? void 0 : options.toneNotes;
    const toneNotes = Array.isArray(toneNotesSource) ? toneNotesSource.map((note) => typeof note === "string" ? note.trim() : "").filter(Boolean) : [];
    const intent = (options == null ? void 0 : options.intent) === "prompt" ? "prompt" : "rewrite";
    const toneNames = forcedTone ? [forcedTone] : getToneSequence(guide);
    const overview = (typeof promptCfg.overview === "string" && promptCfg.overview.trim().length ? promptCfg.overview.trim() : derived.overview) || fallbackOverview;
    const baseRequirements = Array.isArray(promptCfg.requirements) ? promptCfg.requirements.filter(
      (item) => typeof item === "string" && item.trim().length > 0
    ) : [];
    const enrichedRequirements = [...derived.requirements];
    const priorityRules = [];
    const pushRequirement = (value) => {
      if (!value) return;
      const trimmed = value.trim();
      if (trimmed.length) enrichedRequirements.push(trimmed);
    };
    const optionalGuidanceSections = [];
    const toneSpecKey = (options == null ? void 0 : options.targetToneKey) || "";
    pushRequirement(TASK_SPEC_REMINDER);
    pushRequirement(JSON_RESPONSE_TEMPLATE);
    pushRequirement(
      "For every JSON variant, keep the text value limited to the final UX copy only\u2014no labels, intros, or commentary."
    );
    pushRequirement(
      "Each JSON variant must contain exactly one rewrite; never include multiple options, bullet lists, or extra framing."
    );
    pushRequirement(
      "Speak directly to the end-user; never mention rewrites, options, or that you're providing variations."
    );
    pushRequirement(
      "Remove conversational framing or meta-commentary entirely\u2014no phrases like \u201CWe understand\u2026\u201D, \u201CLet\u2019s\u2026\u201D, \u201CHere\u2019s\u2026\u201D, or anything that references the request; start immediately with the final UX copy."
    );
    pushRequirement(
      "Skip pleasantries or commentary about what the reader is doing (e.g., \u201CIt's great you're looking\u2026\u201D); lead with the product benefit or action."
    );
    pushRequirement(
      "Never mention missing source copy, assumed intent, or that you're inferring context\u2014just deliver the final rewrite, even if the prompt feels incomplete."
    );
    pushRequirement("Use at most two short sentences and state each fact only once (no repetition).");
    pushRequirement(
      "Change the sentence rhythm, verbs, and descriptive words for each tone so the emotional intent is obvious; never recycle the same hero verb across variants."
    );
    pushRequirement(
      "Keep the meaning and include all required keywords, but rephrase everything else using different wording; do not reuse longer phrases (more than 2\u20133 words) from the original unless they are required keywords or product names."
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
    pushRequirement(
      "Never print standalone variant text outside the JSON response\u2014populate only the JSON `variants[].text` fields."
    );
    pushRequirement(
      "Vary the opening words across variants; if one starts with a specific word or phrase (e.g., \u201CRemember needing\u2026\u201D), every other rewrite must begin differently and avoid repeating that same opener."
    );
    const selectedLength = getLengthPreference(guide);
    if (selectedLength) {
      const descriptor = selectedLength.label ? `${selectedLength.label} length` : "Target length";
      const rangeLine = selectedLength.rangeHint ? `${descriptor}: ${selectedLength.rangeHint}.` : `${descriptor}.`;
      const extraParts = [
        ensureSentence(selectedLength.structure),
        ensureSentence(selectedLength.description)
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
    const structureReminder = trimmedSourceText ? "Preserve the structural pattern (pronoun pattern, sentence count, sentence type, and length band) from the original and keep your tone choices within those features." : "";
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
    const joinedRequirements = finalRequirements.length ? finalRequirements.map((req) => "- " + req).join("\n") + "\n\n" : "\n";
    const priorityBlock = priorityRules.length ? `Rewrite the copy below. Apply these priority instructions first:
${priorityRules.map((rule) => "- " + rule).join("\n")}

` : "Rewrite the copy below using Setel\u2019s UX guidelines.\n\n";
    const lengthKey = determineTaskSpecLengthKey(selectedLength);
    const specBlock = buildTaskSpecBlock(toneSpecKey, lengthKey);
    const overviewBlock = overview ? overview + "\n" : "\n";
    const coreInstructionBody = priorityBlock + overviewBlock + joinedRequirements;
    const coreText = specBlock + coreInstructionBody;
    const optionalBlock = optionalGuidanceSections.length > 0 ? optionalGuidanceSections.map((item) => "- " + item).join("\n") + "\n\n" : "";
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
    const key = String(msg.key || "");
    const text = sanitisePromptText(String(msg.text || ""));
    const guideline = msg.guideline || guideline_default || {};
    let output = "";
    let encounteredError = false;
    const PROMPT_TOKEN_LIMIT = 6e3;
    const TOKEN_APPROX_DIVISOR = 4;
    const PROMPT_CHAR_LIMIT = PROMPT_TOKEN_LIMIT * TOKEN_APPROX_DIVISOR;
    const cycleVersion = deriveGuideVersion(guideline);
    const cycleSignature = buildCycleSignature(text, cycleVersion);
    if (resetCycle || cycleSignature !== toneCycleSignature) {
      toneCycleSignature = cycleSignature;
      toneCycleIndex = 0;
      toneCycleCompleted = false;
    }
    const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=" + encodeURIComponent(key);
    const callModel = async (prompt) => {
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
          temperature: 1,
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
    const sourceLabel = intent === "prompt" ? "User prompt:\n" : "User copy:\n";
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
          const keyToSave = String(msg.key || "");
          try {
            await figma.clientStorage.setAsync("gemini_api_key", keyToSave);
            figma.ui.postMessage({ type: "key-saved", key: keyToSave });
          } catch (e) {
            figma.ui.postMessage({
              type: "key-saved",
              key: keyToSave,
              error: describeError(e)
            });
          }
          return;
        }
        if (msg.type === "load-key") {
          try {
            const saved = await figma.clientStorage.getAsync("gemini_api_key") || "";
            figma.ui.postMessage({ type: "key-loaded", key: String(saved) });
          } catch (e) {
            figma.ui.postMessage({
              type: "key-loaded",
              key: "",
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
