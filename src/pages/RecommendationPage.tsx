import { useNavigate } from "react-router";
import { HelpCircle, Rocket, Mountain, type LucideIcon } from "lucide-react";
import Footer from "../components/Footer";
import MovieBanner from "../components/MovieBanner";
import MovieDetails from "../components/MovieDeatails";
import StreamingAvailability from "../components/StreamingAvailability";
import TryAnotherMatch from "../components/TryAnotherMatch";
import LoadingMovie from "../components/LoadingMovie";
import { useRecommendationStore } from "../store/recommendationStore";
import { useFavorites } from "../context/FavoritesContext";
import { MOODS } from "../constants/moods";
import { GENRES } from "../constants/genres";
import { TIME_OPTIONS } from "../constants/timeOptons";

export default function RecommendationPage() {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const {
    answers,
    suggestion,
    movie,
    credits,
    trailerUrl,
    trailerThumbnail,
    providers,
    isLoading,
    error,
    generateRecommendation,
  } = useRecommendationStore();

  const openTrailer = () => {
    if (trailerUrl) window.open(trailerUrl, "_blank", "noopener,noreferrer");
  };

  const handleTryAnother = () => {
    if (answers) void generateRecommendation(answers);
    else navigate("/questionnaire");
  };

  // Build the "Why we picked this" reasons from the user's questionnaire answers.
  const reasons: { icon: LucideIcon; label: string; color: string }[] = [];
  if (answers?.mood) {
    const label =
      MOODS.find((m) => m.id === answers.mood)?.label ?? answers.mood;
    reasons.push({
      icon: HelpCircle,
      label: `You're feeling ${label}`,
      color: "amber",
    });
  }
  if (answers?.genre && answers.genre !== "suprise me") {
    const label =
      GENRES.find((g) => g.id === answers.genre)?.label ?? answers.genre;
    reasons.push({ icon: Rocket, label: `You love ${label}`, color: "red" });
  }
  if (answers?.time) {
    const option = TIME_OPTIONS.find((t) => t.id === answers.time);
    if (option) {
      reasons.push({
        icon: Mountain,
        label: `You wanted ${option.label}`,
        color: "teal",
      });
    }
  }

  // Adapt the TMDB watch providers to what StreamingAvailability expects
  // (id as a string, optional logo, and a clickable url).
  const streamingPlatforms = providers.map((platform) => ({
    id: String(platform.id),
    name: platform.name,
    color: "text-white",
    url: platform.url,
    logo: platform.logo,
  }));

  if (isLoading) return <LoadingMovie />;

  // No recommendation resolved yet (direct visit, or a failed generation).
  if (!movie) {
    return (
      <div>
        <section className="w-full bg-[#0a0e1a] px-6 py-24 text-center md:px-12">
          <p className="text-sm font-semibold text-amber-400">
            No recommendation yet.
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
            {error ??
              "Complete the questionnaire to get a personalized movie pick."}
          </p>
          <button
            type="button"
            onClick={() => navigate("/questionnaire")}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-[#0a0e1a] transition-colors hover:bg-amber-400"
          >
            Start the Questionnaire
          </button>
        </section>
        <Footer />
      </div>
    );
  }

  const year = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : undefined;

  return (
    <div>
      <MovieBanner
        eyebrow="Cine Match Recommends"
        title={movie.title}
        moodTags={suggestion?.moodTags ?? []}
        tagline={suggestion?.tagline ?? movie.overview}
        rating={movie.rating}
        year={year}
        runtime={movie.runtime ?? ""}
        genres={movie.genres}
        backdrop={movie.backdrop}
        onPlayTrailer={trailerUrl ? openTrailer : undefined}
        isFavorite={isFavorite(movie.id)}
        onToggleFavorite={() => toggleFavorite(movie)}
      />

      <MovieDetails
        poster={movie.poster}
        title={movie.title}
        description={movie.overview}
        director={credits?.director ?? ""}
        cast={credits?.cast ?? []}
        releaseDate={movie.releaseDate}
        runtime={movie.runtime ?? ""}
        reasons={reasons}
        whyBlurb={suggestion?.whyBlurb ?? ""}
      />

      <StreamingAvailability
        platforms={streamingPlatforms}
        trailerThumbnail={trailerThumbnail || movie.backdrop}
        trailerDuration={trailerUrl ? "Trailer" : undefined}
        onPlayTrailer={trailerUrl ? openTrailer : undefined}
      />

      <TryAnotherMatch onClick={handleTryAnother} />
      <Footer />
    </div>
  );
}
