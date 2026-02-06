import { Movie } from "@/types/movie";

const FAVORITES_KEY = "favorite_movies";

export const getFavorites = (): Movie[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveFavorites = (movies: Movie[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(movies));
};
