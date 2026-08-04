import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  ArrowDownAZ,
  Star,
  Calendar,
  Clock,
} from "lucide-react";

type SortOption = "recent" | "alphabetical" | "rating" | "year";

const SORT_OPTIONS: { id: SortOption; label: string; icon: typeof Clock }[] = [
  { id: "recent", label: "Recently Added", icon: Clock },
  { id: "alphabetical", label: "Alphabetically", icon: ArrowDownAZ },
  { id: "rating", label: "Rating", icon: Star },
  { id: "year", label: "Year", icon: Calendar },
];

interface FavoritesHeaderProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  sortValue?: SortOption;
  onSortChange?: (value: SortOption) => void;
}

export default function FavoritesHeader({
  searchValue,
  onSearchChange,
  sortValue,
  onSortChange,
}: FavoritesHeaderProps) {
  const [localSearch, setLocalSearch] = useState("");
  const [localSort, setLocalSort] = useState<SortOption>("recent");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const search = searchValue ?? localSearch;
  const sort = sortValue ?? localSort;

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearchChange?.(value);
  };

  const handleSortChange = (value: SortOption) => {
    setLocalSort(value);
    onSortChange?.(value);
    setSortOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeSort = SORT_OPTIONS.find((o) => o.id === sort) ?? SORT_OPTIONS[0];

  return (
    <div className="bg-[#0a0e1a] w-full px-6 py-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white md:text-3xl">
              My Favorites
            </h1>
            <span className="mt-1 block h-0.5 w-10 rounded-full bg-amber-500" />
            <p className="mt-4 text-sm text-gray-400">
              Movies you&apos;ve saved to watch later.
            </p>
          </div>

          {/* Sort dropdown */}
          <div ref={sortRef} className="relative flex-shrink-0">
            <button
              type="button"
              onClick={() => setSortOpen((o) => !o)}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#0f1424] px-3 py-2 text-xs font-medium text-gray-300 transition-colors hover:border-amber-500/40 md:px-4 md:py-2.5 md:text-sm"
            >
              {activeSort.label}
              <ChevronDown
                className={`h-3.5 w-3.5 text-gray-500 transition-transform ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full z-10 mt-2 w-48 rounded-xl border border-white/10 bg-[#0d1224] p-1.5 shadow-xl"
                >
                  {SORT_OPTIONS.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleSortChange(id)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        sort === id
                          ? "bg-amber-500/10 text-amber-400"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mt-6">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search your favorites..."
            className="w-full rounded-lg border border-white/10 bg-[#0f1424] py-3 pl-11 pr-4 text-sm text-white placeholder:text-gray-500 focus:border-amber-500 focus:outline-none md:max-w-md"
          />
        </div>
      </div>
    </div>
  );
}
