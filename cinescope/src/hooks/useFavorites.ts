import { useState, useEffect } from "react";
import { Movie } from "@/types/movie";
import { getFavorites, toggleFavorite as toggleLocalFavorite } from "@/services/localStorage";

export default function useFavorites(movies: Movie[]) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const toggleFavorite = (movie: Movie) => {
    toggleLocalFavorite(movie);
    setFavorites(getFavorites());
  };

  const isFavorite = (movie: Movie) => favorites.includes(movie.imdbID);

  return { favorites, toggleFavorite, isFavorite };
}
