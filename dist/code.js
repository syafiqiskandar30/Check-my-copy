"use strict";
(() => {
  // src/guideline.json
  var guideline_default = {
    name: "UX Writing Assistant \u2014 Simplified Ruleset",
    description: "A compact style guide for AI to generate consistent, user-friendly UX copy.",
    objectives: [
      "Standardise language and structure across all interfaces.",
      "Humanise communication with warmth and empathy.",
      "Ensure clarity, brevity, and measurable readability."
    ],
    brandVoice: {
      coreTraits: ["warm", "friendly", "caring"],
      personalityTone: ["approachable", "conversational", "empathetic", "helpful"],
      rules: [
        "Always sound human, not robotic.",
        "Use simple and positive language.",
        "Be polite, clear, and supportive."
      ]
    },
    tone: {
      adaptable: true,
      guidance: [
        "Choose one tone per message.",
        "Match tone with context and emotional intent."
      ],
      types: {
        friendly_conversational: "Casual, human, and comforting.",
        empathetic_reassuring: "Supportive, gentle, and calm.",
        persuasive_compelling: "Energetic, action-driven, motivating.",
        informative_neutral: "Clear, objective, and factual.",
        playful_humorous: "Witty, light, and entertaining when suitable.",
        urgent_action: "Direct, concise, and time-sensitive."
      }
    },
    grammarAndStyle: {
      casing: {
        sentenceCase: "Default for all content including headings.",
        allCaps: "Use only for button labels or CTAs."
      },
      spelling: "British English only.",
      voice: "Use active voice for clarity. Passive voice only for short system status.",
      abbreviations: "Avoid unless official or space-limited.",
      numbers: [
        "Use commas for 4+ digits (RM1,000).",
        "Currency always uppercase RM with no space (RM50)."
      ],
      dates: "Write as Day Month Year (e.g. 18 August 2025).",
      time: "Use 12-hour format with AM/PM."
    },
    syntaxRules: {
      verbs: {
        tense: "Use simple present or past. Avoid perfect tense.",
        mood: "Use imperative for commands, indicative for info."
      },
      pronouns: {
        userFacing: "Use 'you' for direct guidance.",
        empathetic: "Use 'we' for shared accountability."
      },
      lists: [
        "Start each list item with a capital letter.",
        "Avoid full stops unless it\u2019s a full sentence.",
        "Use bullet points for unordered lists; numbers when sequence matters."
      ]
    },
    diction: {
      preferred: [
        "login -> log in (verb)",
        "checkout -> check out (verb)",
        "topup -> top up (verb)",
        "okay -> okay (not ok)"
      ],
      avoid: ["slang", "jargon", "regional contractions"],
      brandTerms: ["Setel Wallet", "Mesra Rewards", "One-tap fuelling"],
      toneSensitiveTerms: {
        positive: ["rewarding", "seamless", "hassle-free"],
        avoidNegative: ["blocked", "fraud", "disabled"]
      }
    },
    callsToAction: {
      format: "Keep CTA short, clear, and in ALL CAPS.",
      examples: ["PROCEED", "LEARN MORE", "SUBMIT", "TRY AGAIN", "I UNDERSTAND", "CONTINUE", "SKIP FOR NOW"]
    },
    emojiUsage: {
      principle: "Use sparingly; only when they enhance tone or clarity.",
      examples: {
        fuel: "\u26FD",
        parking: "\u{1F17F}",
        cashback: "\u{1F4B0}",
        celebration: "\u{1F389}"
      }
    },
    translationGuidelines: {
      methods: {
        literal: "Word-for-word for precise technical text.",
        semantic: "Preserve tone and intent over exact wording.",
        phrasal: "Use descriptive or idiomatic equivalents for natural flow."
      },
      culturalFocus: "Prioritise meaning and local relevance."
    },
    complianceRules: {
      reviewRequired: ["user agreement", "user consent", "product transparency"],
      strictlyAvoid: ["racial or religious references", "political content", "misinformation", "cultural appropriation"]
    },
    outputBehavior: {
      structure: [
        "Start with clarity of intent.",
        "Focus on human connection.",
        "Keep sentences short and direct.",
        "End with reassurance or clear next step."
      ],
      exampleFormat: {
        heading: "short, lower case",
        body: "conversational and helpful",
        button: "ALL CAPS, single action"
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
  figma.on("run", () => {
    figma.showUI(__html__, { width: 360, height: 420 });
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
            const prompt = "You are a UX writing assistant. Rewrite the following copy into 3 short, mobile-friendly headings in lower case (2\u20136 words each). Tone: warm, appreciative, enthusiastic. Avoid emojis unless asked.\n\n" + (guidelineText ? "Writing guideline:\n" + guidelineText + "\n\n" : "") + "User copy:\n" + text;
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
