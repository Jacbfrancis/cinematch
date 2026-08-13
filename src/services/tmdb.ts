// TMDB (The Movie Database) API client.
//
// The API key is read from the environment. Because it uses a VITE_ prefix it is
// bundled into the client build by Vite via import.meta.env.

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export type Movie = {
  id: number;
  title: string;
  rating: number;
  genres: string[];
  runtime?: string;
  poster: string;
  backdrop: string;
  overview: string;
  releaseDate: string;
};

type TmdbGenre = {
  id: number;
  name: string;
};

type TmdbMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  release_date: string;
};

type TmdbMovieDetails = Omit<TmdbMovie, "genre_ids"> & {
  genres: TmdbGenre[];
  runtime: number | null;
};

async function getJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

function imageUrl(path: string | null): string {
  return path ? `${IMAGE_BASE_URL}${path}` : "";
}

function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
}

// Resolved once and then cached so we don't re-request the (rarely changing)
// genre list on every fetch of movies.
let genreMapPromise: Promise<Map<number, string>> | null = null;

function getGenreMap(): Promise<Map<number, string>> {
  if (!genreMapPromise) {
    genreMapPromise = fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    )
      .then(getJson<{ genres: TmdbGenre[] | undefined }>)
      .then((data) => {
        const map = new Map<number, string>();
        data.genres?.forEach((genre) => map.set(genre.id, genre.name));
        return map;
      })
      .catch((error) => {
        // Allow a retry on the next call if this one fails.
        genreMapPromise = null;
        throw error;
      });
  }
  return genreMapPromise;
}

function requiresApiKey(): void {
  if (!API_KEY) {
    throw new Error(
      "TMDB API key is missing. Add VITE_TMDB_API_KEY to your .env file.",
    );
  }
}

/**
 * Fetches the most popular movies from TMDB and maps them into the app's
 * {@link Movie} shape (including genre names via the cached genre list).
 */
export async function fetchPopularMovies(page = 1): Promise<Movie[]> {
  requiresApiKey();

  const [data, genreById] = await Promise.all([
    fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
    ).then(getJson<{ results: TmdbMovie[] | undefined }>),
    getGenreMap(),
  ]);

  return (data.results ?? []).map((movie) => ({
    id: movie.id,
    title: movie.title,
    rating: movie.vote_average,
    genres: movie.genre_ids
      .map((id) => genreById.get(id))
      .filter((name): name is string => Boolean(name)),
    poster: imageUrl(movie.poster_path),
    backdrop: imageUrl(movie.backdrop_path),
    overview: movie.overview,
    releaseDate: movie.release_date,
  }));
}

/**
 * Fetches a single movie's full details (including runtime, which the list
 * endpoints omit) from TMDB and maps them into the app's {@link Movie} shape.
 */
export async function fetchMovieDetails(id: number): Promise<Movie> {
  requiresApiKey();

  const movie = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
  ).then(getJson<TmdbMovieDetails>);

  return {
    id: movie.id,
    title: movie.title,
    rating: movie.vote_average,
    genres: movie.genres.map((genre) => genre.name),
    runtime: movie.runtime ? formatRuntime(movie.runtime) : undefined,
    poster: imageUrl(movie.poster_path),
    backdrop: imageUrl(movie.backdrop_path),
    overview: movie.overview,
    releaseDate: movie.release_date,
  };
}

export type MovieVideo = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

export type MovieTrailer = {
  youtubeUrl: string;
  thumbnail: string;
};

/**
 * Fetches the videos (trailers, teasers, etc.) attached to a movie.
 */
export async function fetchMovieVideos(id: number): Promise<MovieVideo[]> {
  requiresApiKey();

  const data = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
  ).then(getJson<{ results: MovieVideo[] | undefined }>);

  return data.results ?? [];
}

/**
 * Picks the best YouTube trailer from a list of videos.
 */
export function pickTrailer(videos: MovieVideo[]): MovieTrailer | null {
  const video =
    videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ??
    videos.find((v) => v.site === "YouTube");

  if (!video) return null;

  return {
    youtubeUrl: `https://www.youtube.com/watch?v=${video.key}`,
    thumbnail: `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`,
  };
}

export type WatchProvider = {
  id: number;
  name: string;
  logo: string;
  url: string;
};

type TmdbWatchProvider = {
  logo_path: string | null;
  provider_id: number;
  provider_name: string;
};

type TmdbRegionWatch = {
  link: string;
  flatrate?: TmdbWatchProvider[];
  rent?: TmdbWatchProvider[];
  buy?: TmdbWatchProvider[];
};

/**
 * Best-effort deep links for common platforms. TMDB only exposes a single
 * watch-page link per region (not per-platform movie URLs), so we build a
 * search link for well-known services and fall back to the TMDB watch link.
 */
function buildProviderUrl(name: string, title: string, fallback: string): string {
  const query = encodeURIComponent(title);
  const lowered = name.toLowerCase();

  if (lowered.includes("netflix")) return `https://www.netflix.com/search?q=${query}`;
  if (lowered.includes("prime") || lowered.includes("amazon"))
    return `https://www.primevideo.com/search/ref=atv_nb_sug?phrase=${query}`;
  if (lowered.includes("disney")) return `https://www.disneyplus.com/search/${query}`;
  if (lowered.includes("hulu")) return `https://www.hulu.com/search?q=${query}`;
  if (lowered.includes("apple") || lowered.includes("tv+"))
    return `https://tv.apple.com/search?term=${query}`;
  if (lowered.includes("max")) return `https://www.max.com/search?q=${query}`;
  if (lowered.includes("paramount"))
    return `https://www.paramountplus.com/search/?q=${query}`;
  if (lowered.includes("peacock")) return `https://www.peacocktv.com/search?q=${query}`;

  return fallback;
}

/**
 * Fetches where a movie can be streamed (subscription services first, then
 * rent/buy) and returns each platform with a clickable movie link.
 */
export async function fetchMovieWatchProviders(
  id: number,
  title: string,
  region = "US",
): Promise<{ link: string; platforms: WatchProvider[] }> {
  requiresApiKey();

  const data = await fetch(
    `${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`,
  ).then(getJson<{ results: Record<string, TmdbRegionWatch> | undefined }>);

  const regionWatch =
    data.results?.[region] ?? Object.values(data.results ?? {})[0] ?? null;

  if (!regionWatch) {
    return { link: "", platforms: [] };
  }

  const providers =
    regionWatch.flatrate ?? regionWatch.rent ?? regionWatch.buy ?? [];

  const platforms: WatchProvider[] = providers.map((provider) => ({
    id: provider.provider_id,
    name: provider.provider_name,
    logo: provider.logo_path ? imageUrl(provider.logo_path) : "",
    url: buildProviderUrl(provider.provider_name, title, regionWatch.link),
  }));

  return { link: regionWatch.link, platforms };
}
/**
 * Searches TMDB for a movie by title and returns its full details (including
 * runtime and genre names). Used to resolve the title Gemini recommends into
 * a real {@link Movie}.
 */
export async function searchMovie(title: string): Promise<Movie> {
  requiresApiKey();

  const data = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(title)}`,
  ).then(getJson<{ results: TmdbMovie[] | undefined }>);

  const first = data.results?.[0];
  if (!first) {
    throw new Error(`Could not find "${title}" on TMDB.`);
  }

  return fetchMovieDetails(first.id);
}

/**
 * Searches TMDB for movies matching a query and maps them into the app's
 * {@link Movie} shape. Used by the Search page to let users find movies by
 * title. Returns an empty array for blank queries.
 */
export async function searchMovies(query: string): Promise<Movie[]> {
  requiresApiKey();

  const trimmed = query.trim();
  if (!trimmed) return [];

  const [data, genreById] = await Promise.all([
    fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(trimmed)}&include_adult=false`,
    ).then(getJson<{ results: TmdbMovie[] | undefined }>),
    getGenreMap(),
  ]);

  return (data.results ?? []).map((movie) => ({
    id: movie.id,
    title: movie.title,
    rating: movie.vote_average,
    genres: movie.genre_ids
      .map((genreId) => genreById.get(genreId))
      .filter((name): name is string => Boolean(name)),
    poster: imageUrl(movie.poster_path),
    backdrop: imageUrl(movie.backdrop_path),
    overview: movie.overview,
    releaseDate: movie.release_date,
  }));
}

export type MovieCredits = {
  director: string;
  cast: string[];
};

type TmdbCredits = {
  crew?: { job: string; name: string }[];
  cast?: { name: string }[];
};

/**
 * Fetches the director and top-billed cast for a movie (used by the results
 * page's "About the movie" section).
 */
export async function fetchMovieCredits(id: number): Promise<MovieCredits> {
  requiresApiKey();

  const data = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
  ).then(getJson<TmdbCredits>);

  const director =
    data.crew?.find((person) => person.job === "Director")?.name ?? "";
  const cast = (data.cast ?? []).slice(0, 5).map((person) => person.name);

  return { director, cast };
}
