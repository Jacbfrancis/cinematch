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
      <div className="mx-auto max-w-7xl">
        {!user && (
          <div className="mb-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-white">
                These favorites are saved on this device.
              </p>
              <p className="mt-0.5 text-xs text-gray-400">
                Create a free account to keep them synced across your devices.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/auth?mode=signup")}
              className="shrink-0 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-[#0a0e1a] transition-colors hover:bg-amber-400"
            >
              Create Account
            </button>
          </div>
        )}

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
    </div>
  );
}
