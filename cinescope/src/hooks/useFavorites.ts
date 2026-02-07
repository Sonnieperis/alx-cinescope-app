// src/hooks/useFavorites.ts
"use client";

import { useState, useEffect } from "react";
import { Movie } from "@/types/movie";

const FAVORITES_KEY = "favorites";

export default function useFavorites(initialMovies: Movie[]) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (movie: Movie) => {
    let updated: string[];
    if (favorites.includes(movie.imdbID)) {
      updated = favorites.filter((id) => id !== movie.imdbID);
    } else {
      updated = [...favorites, movie.imdbID];
    }
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const isFavorite = (movie: Movie) => favorites.includes(movie.imdbID);

  return { favorites, toggleFavorite, isFavorite };
}
