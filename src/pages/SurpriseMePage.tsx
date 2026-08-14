import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Dices, RefreshCw } from "lucide-react";
import Footer from "../components/Footer";
import { useRecommendationStore } from "../store/recommendationStore";

/**
 * "Surprise Me" — asks Gemini to pick a deliberately random, unexpected movie,
 * then hands off to the full results page (trailer, streaming, why-blurb) so we
 * don't duplicate that rendering here. The store's `generateSurprise` action
 * reuses the same pipeline as the questionnaire.
 */
export default function SurpriseMePage() {
  const navigate = useNavigate();
  const { movie, isLoading, error, generateSurprise } =
    useRecommendationStore();

  // Roll a fresh, random pick as soon as the page opens.
  useEffect(() => {
    void generateSurprise();
  }, [generateSurprise]);

  // When a surprise movie resolves, show it on the full results page.
  useEffect(() => {
    if (movie && !isLoading) navigate("/results", { replace: true });
  }, [movie, isLoading, navigate]);

  return (
    <div>
      <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-[#0a0e1a] px-6 py-12 md:px-12">
        {/* Background image — mobile */}
        <img
          src="/questionnaire(mobile)-bg.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover md:hidden"
        />
        {/* Background image — desktop */}
        <img
          src="/questionnaire-bg.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
        />
        <div className="absolute inset-0 bg-[#0a0e1a]/70" />

        <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
          {error ? (
            <>
              <Dices className="h-12 w-12 text-amber-500" />
              <h1 className="mt-6 text-2xl font-extrabold text-white md:text-3xl">
                We couldn't roll the dice.
              </h1>
              <p className="mt-3 max-w-md text-sm text-gray-400">{error}</p>
              <button
                type="button"
                onClick={() => void generateSurprise()}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-[#0a0e1a] transition-colors hover:bg-amber-400"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
            </>
          ) : (
            <>
              <Dices className="h-12 w-12 animate-spin text-amber-500" />
              <h1 className="mt-6 text-2xl font-extrabold text-white md:text-3xl">
                Rolling the dice…
              </h1>
              <p className="mt-3 max-w-md text-sm text-gray-400">
                Picking you a random, unexpected film gem. Give us a moment.
              </p>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

