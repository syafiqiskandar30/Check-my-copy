// src/code.ts — Gemini-only
figma.on("run", () => {
    figma.showUI(__html__, { width: 360, height: 420 });
  
    figma.ui.onmessage = async (msg: any) => {
      if (!msg || msg.type !== "rewrite") return;
  
      const key: string = String(msg.key || "");
      const text: string = String(msg.text || "");
      let output = "";
  
      try {
        const endpoint =
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=" +
          encodeURIComponent(key);
  
        const body = {
          contents: [
            {
              parts: [
                {
                  text:
                    "You are a UX writing assistant. Rewrite the following copy into 3 short, mobile-friendly headings in lower case (2–6 words each). Tone: warm, appreciative, enthusiastic. Avoid emojis unless asked.\n\nUser copy:\n" +
                    text,
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
        output = "Request failed: " + msgErr;
      }
  
      figma.ui.postMessage({ type: "rewrite-done", output });
    };
  });