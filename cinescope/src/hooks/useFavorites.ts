import { useState, useEffect } from "react";
import { Movie } from "@/types/movie";
import { getFavorites, addFavorite, removeFavorite } from "@/services/favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const toggleFavorite = (movie: Movie) => {
    if (favorites.find((m) => m.id === movie.id)) {
      removeFavorite(movie.id);
      setFavorites((prev) => prev.filter((m) => m.id !== movie.id));
    } else {
      addFavorite(movie);
      setFavorites((prev) => [...prev, movie]);
    }
  };

  return { favorites, toggleFavorite };
}
