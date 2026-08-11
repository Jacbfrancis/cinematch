import { useState } from "react";
import FavoritesHeader, { type SortOption } from "../components/FavoritesHeader";
import FavoritesList from "../components/FavoritesList";
import Footer from "../components/Footer";

export default function FavoritesPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("recent");

  return (
    <div className="bg-[#0a0e1a] min-h-screen">
      <FavoritesHeader
        searchValue={search}
        onSearchChange={setSearch}
        sortValue={sort}
        onSortChange={setSort}
      />
      <FavoritesList search={search} sort={sort} />
      <Footer />
    </div>
  );
}
