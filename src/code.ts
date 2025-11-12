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

figma.on("run", () => {
  figma.showUI(__html__, { width: 360, height: 420 });
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
          const prompt =
            "You are a UX writing assistant. Rewrite the following copy into 3 short, mobile-friendly headings in lower case (2–6 words each). Tone: warm, appreciative, enthusiastic. Avoid emojis unless asked.\n\n" +
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
    } catch (e: any) {
      figma.ui.postMessage({ type: "error", error: describeError(e) });
    }
  };
});
