import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../components/Navbar";
import { FavoritesProvider } from "../context/FavoritesContext";
import { useMovieStore } from "../store/movieStore";

export default function MainLayout() {
  const fetchPopularMovies = useMovieStore(
    (state) => state.fetchPopularMovies,
  );

  // Kick off the popular-movies fetch once when the app mounts. This layout
  // wraps every route and stays mounted across navigation, so the data is only
  // fetched again when the user reloads the page.
  useEffect(() => {
    fetchPopularMovies();
  }, [fetchPopularMovies]);

  return (
    <FavoritesProvider>
      <Navbar />
      <Outlet />
      <ScrollRestoration />
    </FavoritesProvider>
  );
}
