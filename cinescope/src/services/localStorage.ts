import { Movie } from "@/types/movie";

const FAVORITES_KEY = "favorites";

/**
 * Returns array of favorite movie IDs
 */
export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Add or remove a movie from favorites
 */
export function toggleFavorite(movie: Movie): void {
  if (typeof window === "undefined") return;

  const favorites = getFavorites();
  const exists = favorites.includes(movie.id);

  const updated = exists
    ? favorites.filter((id) => id !== movie.id)
    : [...favorites, movie.id];

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

/**
 * Fetch full movie objects for favorites (mock-safe)
 * This prevents your app from breaking if API fails
 */
export async function fetchFavoriteMovies(): Promise<Movie[]> {
  const favorites = getFavorites();

  // TEMP: mock movie objects so UI never crashes
  return favorites.map((id) => ({
    id,
    title: "Favorite Movie",
    poster: "https://via.placeholder.com/300x450?text=Movie",
    year: "2024",
  }));
}
