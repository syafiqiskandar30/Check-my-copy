"use strict";
(() => {
  // src/guideline.json
  var guideline_default = {
    ux_writing_guide: {
      meta: {
        version: "1.0-expanded",
        purpose: "Reference JSON for AI writing assistants to APPLY rules at runtime (not for fine-tuning).",
        locale: "en-GB",
        brand_voice: ["warm", "friendly", "caring"]
      },
      objectives: {
        standardisation: "Keep writing consistent across experiences.",
        humanisation: "Be conversational, supportive, and respectful.",
        effectiveness: "Be clear, concise, and actionable."
      },
      voice: {
        traits: ["approachable", "helpful", "understanding", "polite", "positive"],
        rules: [
          "Sound human, not corporate.",
          "Prefer simple, concrete words.",
          "Offer solutions and reassurance."
        ],
        encouraged_examples: [
          "Insufficient balance. Take a moment to top up and you\u2019re good to go!",
          "We\u2019re investigating this and will update you soon."
        ],
        avoid_examples: [
          "Your account has been blocked due to fraud.",
          "We regret to inform you that your request has been declined."
        ]
      },
      tone: {
        guidance: [
          "Choose one tone per message.",
          "Match tone to context (e.g., empathetic for issues; persuasive for promos)."
        ],
        types: {
          friendly_conversational: {
            description: "Casual, human, comforting.",
            examples: [
              "Fuel up with Setel and enjoy up to 3x points\u2014easy and rewarding!"
            ]
          },
          professional_authoritative: {
            description: "Formal, clear, confident.",
            examples: [
              "Fuel with Setel to earn up to 3x Mesra Rewards points."
            ]
          },
          persuasive_compelling: {
            description: "Action-driven, energetic.",
            examples: [
              "Don\u2019t miss out\u2014fuel now and unlock up to 3x points."
            ]
          },
          empathetic_reassuring: {
            description: "Supportive, gentle, calm.",
            examples: [
              "We know every point counts. That\u2019s why fuelling with Setel lets you earn up to 3x points effortlessly."
            ]
          },
          playful_humorous: {
            description: "Light, witty, sparing use.",
            examples: [
              "Triple the points, triple the fun."
            ]
          },
          inspirational_motivational: {
            description: "Uplifting, aspirational.",
            examples: [
              "Take your journey to the next level\u2014earn up to 3x points."
            ]
          },
          informative_neutral: {
            description: "Objective, factual.",
            examples: [
              "Earn up to 3x Mesra Rewards points when you fuel with Setel."
            ]
          },
          urgent_action: {
            description: "Direct, time-sensitive.",
            examples: [
              "Act now to earn up to 3x points before the promo ends."
            ]
          },
          luxurious_exclusive: {
            description: "Refined, premium.",
            examples: [
              "Experience premium rewards\u2014earn up to 3x points."
            ]
          },
          analytical_technical: {
            description: "Data-led, precise.",
            examples: [
              "Fuelling with Setel can increase your total points by up to 3x over time."
            ]
          }
        }
      },
      grammar_style: {
        sentence_case: {
          rule: "Use sentence case for all text, including headings.",
          do: ["Seamless and smarter fuelling"],
          dont: ["Seamless and Smarter Fuelling"]
        },
        buttons_all_caps: {
          rule: "Buttons/CTAs use ALL CAPS.",
          examples: ["PROCEED", "LEARN MORE", "SUBMIT"]
        },
        proper_nouns: {
          rule: "Capitalise brand names and proper nouns exactly.",
          do: ["PETRONAS", "Lembaga Hasil Dalam Negeri", "Pulau Pinang"],
          dont: ["Petronas", "Lembaga hasil dalam negeri", "Pulau pinang"]
        },
        product_names: {
          rule: "Generic features are lowercase; unique/marketable products are capitalised.",
          do: ["Seamless fuelling", "Setel Cashback", "Family Wallet"],
          dont: ["Seamless Fuelling", "setel cashback", "family wallet"]
        },
        british_spelling: {
          rule: "Use British English.",
          pairs: [
            ["authorise", "authorize"],
            ["analyse", "analyze"],
            ["colour", "color"],
            ["centre", "center"],
            ["fuelling", "fueling"],
            ["manoeuvre", "maneuver"],
            ["offence/defence", "offense/defense"]
          ]
        },
        active_voice: {
          preferred: true,
          do: ["We\u2019ve credited your cashback.", "The store is preparing your order."],
          dont: ["Your cashback has been credited.", "Your order is being prepared by the store."]
        },
        passive_voice_status_ok: {
          rule: "Passive is fine for tiny status UI.",
          examples: ["Changes saved.", "Profile updated.", "Card added."]
        },
        verb_tense: {
          rule: "Use simple present/past; avoid perfect unless necessary.",
          do: ["Tap to proceed.", "Payment completed."],
          dont: ["We have processed the payment.", "Payment had been made."]
        },
        pronouns: {
          you: "Use 'you/your' for guidance.",
          we: "Use 'we/our' to express accountability in negative or empathetic contexts.",
          i: "Use 'I' only for user consents/agreements."
        }
      },
      capitalisation: {
        rules: [
          "Sentence case everywhere except buttons.",
          "Capitalise branded products and proper nouns.",
          "Marketing may occasionally use different capitalisation for campaign names."
        ],
        one_tap_exception: "Write One-tap fuelling (capitalize only 'One')."
      },
      abbreviations_acronyms: {
        abbreviations: {
          rule: "Avoid unless official name or space-limited; include a period.",
          do: ["Setel Ventures Sdn. Bhd.", "Tax invoice no.", "e.g."],
          dont: ["addr.", "Amt.", "Yr."],
          eg_rules: [
            "Write e.g. in lowercase.",
            "No comma after e.g.",
            "Word after e.g. is lowercase unless proper noun.",
            "Capitalise E only if at sentence start."
          ],
          eg_examples: {
            do: [
              "There are various rewards (e.g. points, cashback).",
              "Find whatever is closest to you. E.g. landmarks, nearest highway"
            ],
            dont: [
              "There are various rewards (e.g, points, cashback).",
              "The offer is available in various locations, E.G Kuala Lumpur."
            ]
          },
          short_forms_that_are_words: [
            "app",
            "demo",
            "sync"
          ]
        },
        acronyms: {
          rule: "Spell out on first mention, acronym in brackets; then use acronym. Always uppercase.",
          do_sequence: [
            "Lembaga Hasil Dalam Negeri (LHDN) will review your details.",
            "LHDN has approved your request."
          ],
          dont_first_mention: [
            "LHDN will review your details."
          ],
          slang_acronyms: {
            allowed_sparingly: ["FYI", "ICYMI"],
            note: "Use carefully for older or broad audiences."
          }
        }
      },
      common_mistakes: {
        subject_verb_agreement: {
          do: ["The Setel app offers cashless payment options."],
          dont: ["The Setel app offer cashless payment options."]
        },
        its_vs_its: {
          its_possessive: "Setel will introduce its new EV charging feature.",
          it_is: "It\u2019s been five years since the launch of Setel."
        },
        your_vs_youre: {
          your: "Your account is activated.",
          youre: "You\u2019re going to love this update."
        },
        affect_vs_effect: {
          affect: "The downtime may affect your payment experience.",
          effect: "The effect of the campaign was higher fuel sales."
        },
        each_vs_every: {
          note: "\u2018Each\u2019 focuses on individuals; \u2018Every\u2019 on the whole group."
        },
        checkout_vs_check_out: {
          noun: "Proceed to checkout",
          verb: "Would you like to check out now?"
        },
        login_vs_log_in: {
          noun: "Failed to load the login page",
          verb: "Log in now"
        },
        top_up_hyphenation: {
          noun: "Top-up amount",
          verb: "Top up your wallet"
        },
        compliment_vs_complement: {
          compliment: "Many people complimented him.",
          complement: "The piano complemented the violin."
        },
        inquiry_vs_enquiry: {
          inquiry: "An inquiry will be conducted.",
          enquiry: "Please contact the bank for any enquiries."
        },
        using_the: {
          tip: "Use \u2018the\u2019 for specific/previously mentioned items, ordinals, and superlatives."
        },
        okay_vs_ok: {
          preferred: "Okay"
        },
        copy_uncountable: {
          rule: "Use \u2018copy\u2019 as uncountable even for multiple pieces."
        }
      },
      prepositions: {
        in: {
          time: ["in a few minutes", "in August", "in the morning"],
          place: ["in the office", "in the sky", "in space"]
        },
        on: {
          time: ["on Sunday", "on Saturday night", "on 15 January 2025"],
          place: ["on the table", "on the fifth floor", "life on Mars"]
        },
        at: {
          time: ["at 8:00 PM", "at dinner", "at night"],
          place: ["at Jalan Petaling", "at the launching ceremony", "at Level 11, Vertical Corporate Tower B"]
        },
        omit_rules: {
          next: ["The limit will reset next month."],
          last: ["The offer ended last Friday."]
        },
        dont_end_with_at: ["Where can I claim my cashback?"]
      },
      spelling: {
        british_rules: [
          "Use -ise not -ize",
          "Use -our not -or",
          "Use -re not -er",
          "Use -yse not -yze",
          "Double \u2018l\u2019 in fuelled/fuelling"
        ],
        pairs: [
          ["authorise", "authorize"],
          ["analyse", "analyze"],
          ["colour", "color"],
          ["centre", "center"],
          ["fuelling", "fueling"],
          ["manoeuvre", "maneuver"],
          ["paediatric", "pediatric"],
          ["encyclopaedia", "encyclopedia"],
          ["offence/defence", "offense/defense"],
          ["analogue", "analog"]
        ]
      },
      punctuation: {
        ampersand: {
          rule: "Use & in space-limited UI, official names, or titles.",
          example: "Terms & conditions"
        },
        apostrophe: {
          contractions_do: ["Let\u2019s", "Can\u2019t", "You\u2019ll", "It\u2019s"],
          contractions_dont: ["Ain\u2019t", "Shan\u2019t", "Y\u2019all"],
          possessive_rules: [
            "Singular: add \u2019s (owner\u2019s wallet).",
            "Plural not ending in s: \u2019s (women\u2019s).",
            "Plural ending in s: add \u2019 (users\u2019).",
            "Joint possession: one apostrophe (Jack and Jill\u2019s design)."
          ]
        },
        asterisk: {
          rule: "Avoid *. Use \u2018up to\u2019, \u2018until\u2019, etc."
        },
        brackets_parentheses: {
          rule: "Use ( ) in running text; avoid [] {} in UI.",
          full_stop_rules: [
            "If parenthetical ends the sentence and is part of it, full stop outside.",
            "If parenthetical is a full sentence, full stop inside.",
            "Labels don\u2019t need full stops."
          ]
        },
        colon: {
          avoid_in_sentence: true,
          use_for: ["lists/steps", "dates and times labels"]
        },
        comma_oxford: {
          rule: "Use Oxford comma in lists.",
          do: ["safety, convenience, and productivity"]
        },
        ellipsis: {
          use_for: ["broad searches", "background/loading state"],
          spacing: "No space before ellipsis"
        },
        exclamation: {
          rules: [
            "Use sparingly.",
            "Prefer single words/short phrases.",
            "Don\u2019t stack !! or mix !?"
          ]
        },
        full_stop: {
          rule: "End sentences with a full stop (not for titles, buttons, one-line status)."
        },
        hyphen: {
          noun_vs_verb: [
            ["Top-up", "Top up"],
            ["Add-on", "Add on"],
            ["Sing-along", "Sing along"],
            ["Stay-at-home", "Stay at home"]
          ],
          adjective_with_number: [
            "100-metre run",
            "14-day return",
            "6-hour period"
          ]
        },
        question_marks: {
          use_cases: ["decisions", "CLM suspense"],
          examples: ["Cancel fuelling?", "Proceed with payment?"]
        },
        quotation_marks: {
          single_for_titles: ["Go to 'Profile'"],
          double_for_speech: ["\u201COur users are our top priority,\u201D said the CEO."]
        },
        semicolons: {
          avoid: true,
          allow_in_longform: [
            "Connect related independent clauses when necessary."
          ]
        },
        slash: {
          use_for: ["per", "or"],
          no_spaces: true,
          avoid_in_math_ui: ["Write 50.000 L x RM2.05 (not /L)"]
        }
      },
      currency: {
        symbol: "RM",
        format: {
          uppercase: true,
          no_space: true,
          examples_do: ["RM50", "RM1,000", "RM15,000.00"],
          examples_dont: ["rm50", "MYR50", "RM1000"]
        },
        dynamic_ui: "Show decimals in dynamic amounts (wallet, payment).",
        designer_exception: "Large-scale UI may use a space for readability if design requires."
      },
      date_time: {
        dates: {
          preferred: "18 August 2025",
          abbrev: "18 Aug 2025",
          avoid: ["2022/08/18", "05/06/2022"],
          ranges: [
            "18\u201320 August 2025",
            "18 July\u201318 August 2025",
            "18 August 2025\u201318 August 2026"
          ]
        },
        time: {
          format: "12-hour, e.g., 8:00 AM",
          ranges: ["8:00\u201310:00 AM", "8:00 AM\u201310:00 PM"]
        },
        approximate: {
          past: ["just now", "x minutes ago", "yesterday", "1 week ago"],
          future: ["shortly", "in x minutes", "tomorrow", "in 1 week"]
        },
        avoid_bi: [
          "Use 'every 2 weeks/months/years' instead of bimonthly/biannual/biennial."
        ]
      },
      lists: {
        rules: [
          "Use a heading/intro phrase.",
          "Capitalize first word of each item.",
          "No full stop unless full sentence.",
          "Use numbered lists for sequences."
        ],
        bulleted_do: [
          "Small",
          "Medium",
          "Large"
        ],
        numbered_do: [
          "Go to 'Profile'.",
          "Select your voucher.",
          "Swipe the voucher at the outlet."
        ]
      },
      si_units: {
        spacing: "Add a space between number and unit (except \xB0).",
        examples_do: ["15 L", "6 kg"],
        examples_dont: ["15L", "6kg"]
      },
      registered_numbers: {
        vehicle_plate: "Use official format (e.g., ABC1234).",
        mobile_number: {
          with_country: "+60123456789",
          without_country: "0123456789"
        },
        landline: {
          with_country: "+60340071331",
          without_country: "0340071331"
        },
        hotline: "1300-888-333"
      },
      diction: {
        brand_terms_preferred: [
          "seamless",
          "hassle-free",
          "rewarding",
          "skip the queue",
          "earn Mesra Rewards points",
          "scan and pay",
          "One-tap fuelling"
        ],
        security_terms_preferred: [
          "restricted",
          "temporarily frozen",
          "under review for safety purposes"
        ],
        security_terms_avoid: [
          "blocked",
          "disabled due to fraud",
          "suspicious activities"
        ],
        term_pairs: [
          ["mobile number", "phone number (if context requires mobile specifically)"],
          ["fuel", "petrol (use 'fuel' to include diesel)"]
        ]
      },
      connotations: {
        emotional: "Choose words that evoke positive, respectful feelings.",
        cultural: [
          "Avoid culturally insensitive references.",
          "Be aware of regional variations and symbolism."
        ],
        examples_positive_neutral_negative: [
          ["Seamless", "Steady", "Trouble-free"],
          ["Secure", "Safe", "Closed"],
          ["Rewarding", "Beneficial", "Satisfying"]
        ]
      },
      emoji_usage: {
        principle: "Use sparingly and only to enhance clarity or tone.",
        examples: {
          fuel: "\u26FD",
          parking: "\u{1F17F}",
          vehicle: "\u{1F699}",
          battery: "\u{1F50B}",
          cashback: "\u{1F4B0}",
          play: "\u25B6",
          pin: "\u{1F4CC}",
          coffee: "\u2615",
          pastry: "\u{1F950}",
          celebration: "\u{1F389}",
          warning: "\u26A0\uFE0F",
          gift: "\u{1F381}"
        }
      },
      cta: {
        format: "Short verbs, ALL CAPS, single action.",
        standard: [
          "PROCEED",
          "CONTINUE",
          "SUBMIT",
          "LEARN MORE",
          "TRY AGAIN",
          "CANCEL",
          "GO BACK",
          "RETURN TO (PAGE)",
          "I UNDERSTAND",
          "SKIP FOR NOW",
          "VISIT HELP CENTRE",
          "REFRESH",
          "RELOAD",
          "CHAT WITH US"
        ]
      },
      materials_reference: {
        ux_product: ["UI text", "In-app messaging", "FAQs/Help Centre"],
        marketing: ["promo pages", "EDM", "push promos", "social posts", "press release"],
        corporate: ["memos", "formal letters", "HR comms"],
        customer_support: ["live chat", "LOD"]
      },
      nouns_pronouns: {
        singular_plural: {
          do: ["This form", "A user", "That location"],
          dont: ["This forms", "A users", "That locations"]
        },
        irregular_plural_examples: ["children", "women", "men", "people"],
        uncountable_examples: ["fuel", "cashback", "data", "access"],
        possessive_examples: ["owner\u2019s wallet balance", "users\u2019 credit card"],
        compound_nouns_vs_verbs: [
          ["Top-up amount", "Top up your wallet"],
          ["Proceed to checkout", "Check out now"],
          ["Login failed", "Log in to view your profile"]
        ],
        pronoun_guidance: {
          use_you: ["You have unlocked a badge."],
          avoid_blame: ["Incorrect password. Please try again."]
        }
      },
      verbs: {
        tense_rules: [
          "Prefer simple present/past for clarity.",
          "Avoid perfect tenses unless timeline matters."
        ],
        voice_rules: [
          "Prefer active voice for clarity.",
          "Passive allowed for compact status messages."
        ],
        agreement: "Match subject and verb in number.",
        mood: {
          indicative: ["Automated parking is available at KLCC."],
          imperative: ["Enable notifications to receive updates."],
          interrogative: ["Forgot your password?"],
          conditional: ["If you close this page, your progress will be lost."],
          subjunctive: ["Imagine having all your vehicle needs in one app."]
        },
        mood_consistency_tip: "Don\u2019t mix moods in one sentence unless intentional."
      },
      compliance: {
        review_required: [
          "user agreement",
          "user consent",
          "product transparency and disclosure"
        ],
        forbidden_topics: [
          "racial/religious slurs",
          "political content",
          "problematic KOLs/brands",
          "unverified claims",
          "cultural appropriation"
        ]
      },
      product_transparency: {
        clear_not_misleading: [
          "Avoid calling a conditional gift \u2018free\u2019.",
          "Use \u2018complimentary\u2019 with clear conditions."
        ],
        bnm_avoid: [
          "Do not use Bank Negara Malaysia\u2019s name or logo.",
          "Use general phrasing like \u2018for security purposes\u2019 or \u2018to comply with national regulations\u2019."
        ],
        wording_examples: {
          do: [
            "Collect 3 Caf\xE9 Mesra stamps and get 1 complimentary doughnut.",
            "Redeem your points to pay for fuel."
          ],
          dont: [
            "Collect 3 Caf\xE9 Mesra stamps and get 1 FREE doughnut.",
            "Redeem your points to free fuel."
          ]
        }
      },
      translations: {
        types: {
          literal: "Word-for-word for precise/technical text.",
          semantic: "Preserve meaning/tone over literal words.",
          phrasal: "Use a descriptive phrase if no direct equivalent."
        },
        examples: {
          literal: [["Balance", "Baki"], ["Rewards", "Ganjaran"]],
          semantic: [["Top up", "Tambah nilai"], ["Payment history", "Rekod pembayaran"]],
          phrasal: [["Rooted device", "Peranti yang telah diubah suai"], ["Every point counts", "Setiap mata ada nilainya"]]
        }
      },
      loan_words: {
        rule: "Prefer proper BM terms; use loan words if widely accepted and semantically accurate.",
        check_source: "PRPM (Dewan Bahasa dan Pustaka)"
      },
      output_behavior: {
        structure: [
          "Lead with the key message.",
          "Be human and respectful.",
          "Keep sentences short.",
          "End with a clear next step."
        ],
        example_format: {
          heading: "short, lower case",
          body: "conversational, supportive",
          button: "ALL CAPS, single action"
        }
      }
    }
  };

  // src/code.ts
  var describeError = (err) => err && err.message ? String(err.message) : String(err);
  var describeGuideline = (guide) => {
    if (!guide) return "";
    if (typeof guide === "string") return guide;
    try {
      return JSON.stringify(guide, null, 2);
    } catch (err) {
      return String(guide) || String(err);
    }
  };
  var buildRewriteInstructions = (guide) => {
    if (!guide || typeof guide !== "object") return "You are a UX writing assistant.";
    const promptCfg = guide.rewritePrompt || {};
    const overview = typeof promptCfg.overview === "string" && promptCfg.overview.trim().length ? promptCfg.overview.trim() : "You are a UX writing assistant.";
    const requirements = Array.isArray(promptCfg.requirements) ? promptCfg.requirements.filter((item) => typeof item === "string" && item.trim().length > 0) : [];
    const joinedRequirements = requirements.length ? requirements.map((req) => "- " + req.trim()).join("\n") + "\n\n" : "\n";
    return overview + "\n" + joinedRequirements;
  };
  figma.on("run", () => {
    figma.showUI(__html__, { width: 400, height: 600 });
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
        if (msg.type === "rewrite") {
          const key = String(msg.key || "");
          const text = String(msg.text || "");
          const guideline = msg.guideline || guideline_default;
          let output = "";
          let encounteredError = false;
          try {
            const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=" + encodeURIComponent(key);
            const guidelineText = describeGuideline(guideline);
            const rewriteInstructions = buildRewriteInstructions(guideline);
            const prompt = rewriteInstructions + "Return exactly five unique variants as a numbered list (1.-5.) with no extra commentary.\n\n" + (guidelineText ? "Writing guideline:\n" + guidelineText + "\n\n" : "") + "User copy:\n" + text;
            const body = {
              contents: [
                {
                  parts: [
                    {
                      text: prompt
                    }
                  ]
                }
              ]
            };
            const res = await fetch(endpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body)
            });
            if (!res.ok) {
              encounteredError = true;
              output = "API error " + res.status + ": " + await res.text();
            } else {
              const data = await res.json();
              let textOut = "";
              if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text) {
                textOut = String(data.candidates[0].content.parts[0].text);
              }
              output = textOut ? textOut.trim() : "No response.";
            }
          } catch (err) {
            const msgErr = err && err.message ? String(err.message) : String(err);
            encounteredError = true;
            output = "Request failed: " + msgErr;
          }
          figma.ui.postMessage({ type: "rewrite-done", output, error: encounteredError });
          return;
        }
      } catch (e) {
        figma.ui.postMessage({ type: "error", error: describeError(e) });
      }
    };
  });
})();
