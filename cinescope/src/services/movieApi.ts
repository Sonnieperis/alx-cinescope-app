import { Movie, MovieResponse } from "@/types/movie";
import { OMDB_API_KEY, OMDB_BASE_URL } from "./constants";

// MOCK response so the dashboard works immediately
export const mockResponse: MovieResponse = {
  Search: [
    {
      imdbID: "tt1234567",
      Title: "The Shawshank Redemption",
      Year: "1994",
      Poster: "https://via.placeholder.com/300x450?text=Shawshank",
    },
    {
      imdbID: "tt7654321",
      Title: "Inception",
      Year: "2010",
      Poster: "https://via.placeholder.com/300x450?text=Inception",
    },
    {
      imdbID: "tt2345678",
      Title: "The Dark Knight",
      Year: "2008",
      Poster: "https://via.placeholder.com/300x450?text=Dark+Knight",
    },
  ],
  totalResults: "3",
  Response: "True",
};

const FAVORITES_KEY = "cinescope_favorites";

// Fetch trending movies (currently returns mock)
export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  // You can replace this with real fetch later
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockResponse.Search), 500);
  });
};

// Favorites storage
export const getFavorites = (): Movie[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addFavorite = (movie: Movie) => {
  const current = getFavorites();
  const exists = current.find((m) => m.imdbID === movie.imdbID);
  if (!exists) {
    current.push(movie);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(current));
  }
};

export const removeFavorite = (movie: Movie) => {
  const current = getFavorites();
  const updated = current.filter((m) => m.imdbID !== movie.imdbID);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};

export const isFavorite = (movie: Movie): boolean => {
  const current = getFavorites();
  return current.some((m) => m.imdbID === movie.imdbID);
};
