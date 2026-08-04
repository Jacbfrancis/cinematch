import Footer from "../components/Footer";
import MovieBanner from "../components/MovieBanner";
import MovieDetails from "../components/MovieDeatails";
import StreamingAvailability from "../components/StreamingAvailability";
import TryAnotherMatch from "../components/TryAnotherMatch";

export default function RecommendationPage() {
  return (
    <div>
      <MovieBanner />
      <MovieDetails />
      <StreamingAvailability />
      <TryAnotherMatch />
      <Footer />
    </div>
  );
}
