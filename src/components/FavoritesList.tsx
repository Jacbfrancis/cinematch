import { useNavigate } from "react-router";
import { FavoriteCard } from "./FavoriteCard";
import EmptyFavorites from "./EmptyFavorites";
import Loading from "./Loading";
import type { SortOption } from "./FavoritesHeader";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";

type FavoritesListProps = {
  search?: string;
  sort?: SortOption;
};

export default function FavoritesList({
  search = "",
  sort = "recent",
}: FavoritesListProps) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { favorites, isLoading, removeFavorite } = useFavorites();

  // Show the app loader while auth or favorites are still loading.
  if (loading || isLoading) {
    return <Loading />;
  }

  // Not signed in — prompt them to sign in.
  if (!user) {
    return (
      <div className="flex w-full flex-col items-center px-6 py-20 text-center md:px-12">
        <h2 className="text-xl font-bold text-white md:text-2xl">
          Sign in to see your favorites
        </h2>
        <p className="mt-3 max-w-md text-sm text-gray-400">
          Create an account to save movies and build your personal watchlist.
        </p>
        <button
          type="button"
          onClick={() => navigate("/auth?mode=signup")}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-amber-400 to-amber-500 px-6 py-3 text-sm font-bold text-[#0a0e1a] shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.02] active:scale-[0.99]"
        >
          Create an Account
        </button>
      </div>
    );
  }

  if (favorites.length === 0) {
    return <EmptyFavorites />;
  }

  // Filter by search query.
  const query = search.trim().toLowerCase();
  const filtered = query
    ? favorites.filter((movie) => movie.title.toLowerCase().includes(query))
    : favorites;

  // Sort according to the selected option.
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "alphabetical":
        return a.title.localeCompare(b.title);
      case "rating":
        return b.rating - a.rating;
      case "year":
        return b.year - a.year;
      case "recent":
      default:
        return (b.addedAt ?? 0) - (a.addedAt ?? 0);
    }
  });

  if (sorted.length === 0) {
    return (
      <div className="flex w-full flex-col items-center px-6 py-20 text-center md:px-12">
        <h2 className="text-xl font-bold text-white md:text-2xl">
          No matching favorites
        </h2>
        <p className="mt-3 max-w-md text-sm text-gray-400">
          Try a different search term or sort option.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-6 pb-16 md:px-12">
      <div className="space-y-4 lg:grid lg:grid-cols-6 lg:gap-6 lg:space-y-0">
        {sorted.map((movie) => (
          <FavoriteCard
            key={movie.id}
            movie={movie}
            onRemove={removeFavorite}
          />
        ))}
      </div>
    </div>
  );
}
