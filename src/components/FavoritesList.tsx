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

const DUMMY_FAVORITES: FavoriteMovie[] = [];

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
