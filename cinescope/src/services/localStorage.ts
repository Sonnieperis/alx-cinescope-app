import { Movie } from "@/types/movie";

const FAVORITES_KEY = "cinescope_favorites";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function toggleFavorite(movie: Movie) {
  if (typeof window === "undefined") return;

  const favorites = getFavorites();
  const index = favorites.indexOf(movie.imdbID);

  if (index > -1) {
    favorites.splice(index, 1); // remove
  } else {
    favorites.push(movie.imdbID); // add
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
