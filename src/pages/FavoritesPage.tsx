import FavoritesHeader from "../components/FavoritesHeader";
import FavoritesList from "../components/FavoritesList";

export default function FavoritesPage() {
  return (
    <div className="bg-[#0a0e1a] min-h-screen">
      <FavoritesHeader />
      <FavoritesList />
    </div>
  );
}
