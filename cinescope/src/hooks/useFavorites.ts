import { useEffect, useState } from "react";
import { Movie } from "../types/movie";

const STORAGE_KEY = "favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // Load from localStorage safely
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      setFavorites([]);
    }
  }, []);

  // Persist changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie: Movie) => {
    setFavorites((prev) =>
      prev.some((m) => m.imdbID === movie.imdbID) ? prev : [...prev, movie]
    );
  };

  const removeFavorite = (imdbID: string) => {
    setFavorites((prev) => prev.filter((m) => m.imdbID !== imdbID));
  };

  const isFavorite = (imdbID: string) =>
    favorites.some((m) => m.imdbID === imdbID);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
