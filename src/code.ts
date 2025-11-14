// src/code.ts — single Gemini handler, UI loaded from manifest
import guidelineReference from "./guideline.json";

const describeError = (err: any) =>
  err && err.message ? String(err.message) : String(err);

const describeGuideline = (guide: unknown) => {
  if (!guide) return "";
  if (typeof guide === "string") return guide;
  try {
    return JSON.stringify(guide, null, 2);
  } catch (err) {
    return String(guide) || String(err);
  }
};

const buildRewriteInstructions = (guide: any) => {
  if (!guide || typeof guide !== "object") return "You are a UX writing assistant.";
  const promptCfg = (guide as any).rewritePrompt || {};
  const overview =
    typeof promptCfg.overview === "string" && promptCfg.overview.trim().length
      ? promptCfg.overview.trim()
      : "You are a UX writing assistant.";

  const requirements: string[] = Array.isArray(promptCfg.requirements)
    ? promptCfg.requirements.filter(
        (item: unknown): item is string => typeof item === "string" && item.trim().length > 0
      )
    : [];

  const enrichedRequirements: string[] = [];
  const pushRequirement = (value?: string) => {
    if (!value) return;
    const trimmed = value.trim();
    if (trimmed.length) enrichedRequirements.push(trimmed);
  };

  const tonePreference = (guide as any).tonePreference;
  const toneList = Array.isArray(tonePreference)
    ? tonePreference
    : typeof tonePreference === "string" && tonePreference.trim().length
    ? [tonePreference]
    : [];
  const normalizedTones = toneList
    .map((tone) => (typeof tone === "string" ? tone.trim() : ""))
    .filter((tone): tone is string => Boolean(tone));
  if (normalizedTones.length) {
    pushRequirement(`Match these tones: ${normalizedTones.join(", ")}.`);
  }

  const styleFilters = (guide as any).styleFilters || {};
  if (styleFilters && typeof styleFilters === "object") {
    const elementName =
      typeof styleFilters.element === "string" && styleFilters.element.trim().length
        ? styleFilters.element.trim()
        : "";
    if (elementName) {
      pushRequirement(`This copy is for a ${elementName.toLowerCase()} use case.`);
    }
    if (typeof styleFilters.length === "number" && !Number.isNaN(styleFilters.length)) {
      const idealLength = Math.max(5, Math.round(styleFilters.length));
      const tolerance = Math.max(4, Math.round(idealLength * 0.1));
      const minLength = Math.max(5, idealLength - tolerance);
      const maxLength = idealLength + tolerance;
      pushRequirement(
        `Each variant must be between ${minLength} and ${maxLength} characters (spaces included). Prioritize staying within this range over preserving the original wording.`
      );
    }
  }

  const usageContext =
    typeof (guide as any).usageContext === "string" ? (guide as any).usageContext.trim() : "";
  if (usageContext) {
    pushRequirement(`Follow this context and custom guidance: ${usageContext}`);
  }

  const finalRequirements = [...requirements, ...enrichedRequirements];
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

figma.on("run", () => {
  figma.showUI(__html__, { width: 400, height: 600 });
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
        const guideline = msg.guideline || guidelineReference;
        let output = "";
        let encounteredError = false;

        try {
          const endpoint =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=" +
            encodeURIComponent(key);

          const guidelineText = describeGuideline(guideline);
          const rewriteInstructions = buildRewriteInstructions(guideline);
          const prompt =
            rewriteInstructions +
            "Return exactly five unique variants as a numbered list (1.-5.) with no extra commentary.\n\n" +
            (guidelineText ? "Writing guideline:\n" + guidelineText + "\n\n" : "") +
            "User copy:\n" +
            text;

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
            encounteredError = true;
            output = "API error " + res.status + ": " + (await res.text());
          } else {
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
            output = textOut ? textOut.trim() : "No response.";
          }
        } catch (err: any) {
          const msgErr = err && err.message ? String(err.message) : String(err);
          encounteredError = true;
          output = "Request failed: " + msgErr;
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
