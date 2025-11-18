🚧 Setel UX Writing Assistant — Backend Refactor Instructions (For Codex)

Goal: Fix backend behavior so the model consistently follows our UX writing style guide

You are editing a TypeScript codebase for a Figma-style UX writing assistant for Setel.
The main backend logic lives in src/code.ts.

This assistant currently:
	•	Injects the Setel UX writer persona into the system prompt
	•	Parses our large JSON style guide
	•	Enforces tones, banned terms, and length presets
	•	Validates outputs with validateVariant
	•	Rebuilds prompts with no memory drift

However, several backend elements are incomplete or missing, causing inconsistency.

Your task is to update src/code.ts to implement the fixes below.

⸻

✅ 1. Add explicit generation parameters (temperature, top_p, max tokens)

Problem
	•	The Gemini API call does NOT set temperature or top_p.
	•	We rely on unknown defaults.
	•	No max token guard.

Required Changes
	1.	Locate all areas where the model API is called (around src/code.ts:1362–1407).
	2.	Add explicit config: 
        temperature: 0.3,
        top_p: 0.9,
        maxOutputTokens: 512

Use correct field names depending on the API (generationConfig, samplingParams, etc.).

Acceptance Criteria
	•	Every rewrite call uses temperature=0.3, top_p=0.9, maxOutputTokens=512.

⸻

✅ 2. Add a structured TASK_SPEC header

Problem

Tone, length, and context are only present in narrative text.
The model needs a structured, machine-readable representation.

Required Changes

Inside buildRewriteInstructions (lines ~1114–1235):
	1.	Before natural-language instructions, insert a block:

TASK_SPEC:
        {
            "task": "rewrite",
             "tone": "<TONE_KEY>",
             "length": "<LENGTH_KEY>",
             "context": "<CONTEXT_KEY>"
        }
END_TASK_SPEC  

	<TONE_KEY> = exact key from tone_palette.available_tones
	•	<LENGTH_KEY> = "short" | "medium" | "long"
	•	<CONTEXT_KEY> = "button" | "toast" | "modal" | "general_ui_copy" (fallback)

	2.	Add:
“Always follow TASK_SPEC exactly when choosing tone, length, and context.”

Acceptance Criteria
	•	Every prompt contains a TASK_SPEC block.
	•	Instructions explicitly reference TASK_SPEC.

⸻

✅ 3. Require JSON-only output (structured variants)

Problem
	•	The model currently returns plain text blocks.
	•	Should instead return JSON so we can reliably parse the output.

Required Changes
	1.	Update instructions in buildRewriteInstructions:

Tell the model:

Respond ONLY with valid JSON in this format:

{
  "variants": [
    {
      "tone": "<TONE_KEY>",
      "length": "<LENGTH_KEY>",
      "text": "..."
    },
    {
      "tone": "<TONE_KEY>",
      "length": "<LENGTH_KEY>",
      "text": "..."
    }
  ]
}

2.	Update the response handler (lines ~1362–1407):
	•	Parse JSON safely.
	•	If parsing fails:
	•	attempt to extract the JSON substring OR
	•	fallback to treat the entire text as a single variant.
	3.	Pass each variant.text through validateVariant.
	4.	Remove variants.join("\n\n") and rely on parsed JSON.

Acceptance Criteria
	•	Model returns JSON only.
	•	Code parses the JSON and validates each variant.
	•	Final output is consistent and structured.

⸻

✅ 4. Add fallback logic for invalid tone inputs

Problem
	•	If UI sends an invalid tone name, backend doesn’t detect or correct it.

Required Changes

In tone resolution (collectToneConfigs in lines 346–475):
	1.	Add:

if (!tone_palette.available_tones[requestedTone]) {
    requestedTone = "neutral_helpful"; // safe fallback
}

	2.	Optionally log a warning (non-blocking).

Acceptance Criteria
	•	Invalid tone → fallback to neutral_helpful (or friendly).
	•	Backend never sends unknown tone keys to the model.

⸻

✅ 5. Add prompt sanitisation

Problem
	•	Input is not cleaned.
	•	No normalization of whitespace or removal of stray characters.

Required Changes

Create a utility function:

function sanitisePromptText(input: string): string {
  return input
    .replace(/\s+/g, " ")      // collapse whitespace
    .replace(/[\u0000-\u001F]/g, "") // remove control chars
    .trim();
}

Before building prompt:
	•	Run user input through sanitisePromptText
	•	Apply same sanitisation to any embedded examples if needed

Acceptance Criteria
	•	Sanitized user text always used in prompt creation.
	•	No weird spacing or control characters sent to model.

⸻

✅ 6. Add prompt length guard

Problem
	•	No token or length measurement.
	•	Potential for runaway prompt sizes.

Required Changes

Before sending final prompt:

const approxTokens = Math.floor(prompt.length / 4);
if (approxTokens > 6000) {
    // Trim lowest priority sections (extra examples)
    // Keep core persona, TASK_SPEC, tone rules, banned terms
}

Acceptance Criteria
	•	Prompt never grows beyond a safe threshold.
	•	Critical rules are never dropped.

⸻

⚠️ 7. Maintain existing functionality

Do not break:
	•	validateVariant
	•	collectGuideBannedTerms
	•	Setel persona injection
	•	Banned terms checks
	•	Tone + length enforcement
	•	Fresh prompt generation for each rewrite

⸻

🎯 Final Goal

After implementing these changes:
	•	Prompts are structured, stable, and machine-readable.
	•	Model obeys tone and length with far higher consistency.
	•	Outputs come back as clean JSON variants.
	•	Randomness is controlled via temperature + top_p.
	•	Invalid tones fall back safely.
	•	Prompt sanitization and size guards prevent unexpected behavior.

This will significantly improve the reliability of the UX writing assistant even before compacting the style guide.
