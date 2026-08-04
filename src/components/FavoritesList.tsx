import { FavoriteCard } from "./FavoriteCard";
import EmptyFavorites from "./EmptyFavorites";

type FavoriteMovie = {
  id: string;
  title: string;
  poster: string;
  rating: number;
  year: number;
  runtime: string;
  genres: string[];
  description: string;
};

type FavoritesListProps = {
  movies?: FavoriteMovie[];
  onToggleFavorite?: (id: string) => void;
  onMore?: (id: string) => void;
};

const DUMMY_FAVORITES: FavoriteMovie[] = [
  {
    id: "interstellar",
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.7,
    year: 2014,
    runtime: "2h 49m",
    genres: ["Sci-Fi", "Drama"],
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: "dark-knight",
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 9.0,
    year: 2008,
    runtime: "2h 32m",
    genres: ["Action", "Crime", "Drama"],
    description:
      "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and D.A. Harvey Dent.",
  },
  {
    id: "inception",
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    rating: 8.8,
    year: 2010,
    runtime: "2h 28m",
    genres: ["Sci-Fi", "Thriller"],
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the ultimate task.",
  },
  {
    id: "shawshank-redemption",
    title: "The Shawshank Redemption",
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    rating: 9.3,
    year: 1994,
    runtime: "2h 22m",
    genres: ["Drama"],
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption.",
  },
  {
    id: "the-martian",
    title: "The Martian",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png",
    rating: 8.0,
    year: 2015,
    runtime: "2h 21m",
    genres: ["Sci-Fi", "Adventure"],
    description:
      "An astronaut becomes stranded on Mars and must use his wits to survive and signal for help.",
  },
  {
    id: "interstellar",
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.7,
    year: 2014,
    runtime: "2h 49m",
    genres: ["Sci-Fi", "Drama"],
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
];

export default function FavoritesList({
  movies = DUMMY_FAVORITES,
}: FavoritesListProps) {
  if (movies.length === 0) {
    return <EmptyFavorites />;
  }

  return (
    <div className="w-full px-6 pb-16 md:px-12">
      <div className="space-y-4 lg:grid lg:grid-cols-6 lg:gap-6 lg:space-y-0">
        {movies.map((movie) => (
          <FavoriteCard key={movie.id} movie={movie} />
        ))}
        ;
      </div>
    </div>
  );
}
