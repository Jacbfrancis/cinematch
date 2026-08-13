// Netlify Function that calls the Gemini API on behalf of the client, so the
// API key never has to be shipped to the browser.
//
// Set these in your Netlify site settings (Site configuration -> Environment
// variables) — they are server-side only and NOT exposed to the client:
//   GEMINI_API_KEY  (required)
//   GEMINI_MODEL    (optional, defaults to gemini-3.5-flash)

const CORS_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "content-type",
};

export default async (req) => {
  // Handle CORS preflight (Netlify serves the function from the same origin,
  // but this keeps local cross-origin dev working too).
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return json({ error: "Recommendations are unavailable right now." }, 500);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Bad request." }, 400);
  }

  const { viewerDescription = "", excludeTitles = [] } = body ?? {};
  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash";

  const excludedLine =
    Array.isArray(excludeTitles) && excludeTitles.length > 0
      ? `\nMovies already suggested to this viewer (DO NOT repeat any of these):\n${excludeTitles.join(", ")}`
      : "";

  const prompt = `You are CineMatch, a movie curation specialist.
Suggest EXACTLY ONE great, real movie that fits this viewer:
${viewerDescription}
${excludedLine}

Pick a strong, well-known film that genuinely exists. If you have suggested
movies before, choose something different this time. Never reveal, say, or
imply that you are an AI, a language model, or an automated system — speak and
recommend purely as a human curation expert.

Respond with ONLY JSON, no prose:
{
  "title": "The movie title",
  "year": "Release year",
  "tagline": "A short one-line pitch",
  "moodTags": ["3 short tags reflecting their mood"],
  "whyBlurb": "1-2 sentences explaining why this movie fits their answers"
}`;

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                year: { type: "STRING" },
                tagline: { type: "STRING" },
                moodTags: { type: "ARRAY", items: { type: "STRING" } },
                whyBlurb: { type: "STRING" },
              },
              required: ["title", "year", "tagline", "moodTags", "whyBlurb"],
            },
          },
        }),
      },
    );

    if (!geminiRes.ok) {
      return json({ error: "The recommendation service failed." }, 502);
    }

    const geminiData = await geminiRes.json();
    const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return json({ error: "We couldn't pick a movie this time." }, 502);
    }

    // Gemini returns the suggestion as a JSON *string*; parse it into an object.
    const suggestion = JSON.parse(text);
    return json({ suggestion });
  } catch {
    return json({ error: "We couldn't pick a movie this time." }, 500);
  }
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json", ...CORS_HEADERS },
  });
}
