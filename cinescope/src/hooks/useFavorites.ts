// src/hooks/useFavorites.ts
"use client";

import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "favorites";

export default function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return; // ensure SSR safe
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite: add if not present, remove if present
  const toggleFavorite = useCallback((imdbID: string) => {
    setFavorites((prev) =>
      prev.includes(imdbID) ? prev.filter((id) => id !== imdbID) : [...prev, imdbID]
    );
  }, []);

  // Check if a movie is favorite
  const isFavorite = useCallback(
    (imdbID: string) => favorites.includes(imdbID),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
