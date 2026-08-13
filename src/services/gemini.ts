// Client wrapper for the movie recommendation service.
//
// The Gemini API key lives SERVER-SIDE in a Netlify Function
// (netlify/functions/recommend.mjs). The client only sends the questionnaire
// answers to /.netlify/functions/recommend and receives a finished suggestion
// back — so no API key is ever bundled into the browser.

import { MOODS } from "../constants/moods";
import { GENRES } from "../constants/genres";
import { TIME_OPTIONS } from "../constants/timeOptons";

// Relative path — Netlify serves this on the same origin in production and
// proxies it locally when you run `netlify dev`.
const RECOMMEND_ENDPOINT = "/.netlify/functions/recommend";

/** A movie recommendation returned by the recommendation service. */
export type MovieSuggestion = {
  title: string;
  year: string;
  tagline: string;
  moodTags: string[];
  whyBlurb: string;
};

/** The answers collected by the questionnaire, ready to send to the service. */
export type RecommendInput = {
  mood: string | null;
  genre: string | null;
  time: string | null;
  experience: string;
};

/**
 * Sends the questionnaire answers to the Netlify Function, which asks the
 * recommendation service for a movie. Pass `excludeTitles` (previously shown
 * movies) so each "Try another match" returns a fresh pick.
 */
export async function recommendMovie(
  answers: RecommendInput,
  excludeTitles: string[] = [],
): Promise<MovieSuggestion> {
  // Map the stored ids back to readable labels so the prompt reads naturally.
  const mood = MOODS.find((m) => m.id === answers.mood)?.label ?? "any";
  const genre =
    GENRES.find((g) => g.id === answers.genre)?.label ?? "surprise me";
  const time =
    TIME_OPTIONS.find((t) => t.id === answers.time)?.description ??
    "a comfortable length";
  const experience = answers.experience.trim() || "nothing specific";

  // A compact, human-readable profile of the viewer. The Netlify Function
  // assembles the full prompt and calls the model.
  const viewerDescription = [
    `- Current mood: ${mood}`,
    `- Genre: ${genre}`,
    `- Time available: ${time}`,
    `- Their note: "${experience}"`,
  ].join("\n");

  let response: Response;
  try {
    response = await fetch(RECOMMEND_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ viewerDescription, excludeTitles }),
    });
  } catch {
    throw new Error(
      "We couldn't reach our recommendation service. Please try again.",
    );
  }

  if (!response.ok) {
    throw new Error("We couldn't pick a movie this time. Please try again.");
  }

  const data = (await response.json()) as { suggestion?: MovieSuggestion };
  if (!data.suggestion) {
    throw new Error("We couldn't pick a movie this time. Please try again.");
  }

  return data.suggestion;
}
