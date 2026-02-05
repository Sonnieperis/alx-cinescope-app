import { MovieResponse } from "@/types/movie";

// Mock data for development if API key is missing
const mockMovies: MovieResponse = {
  page: 1,
  results: [
    {
      id: 1,
      title: "The Mock Movie",
      overview: "This is a placeholder movie description.",
      poster_path: "/mock-poster.jpg",
      release_date: "2026-01-01",
      vote_average: 8.5,
      backdrop_path: "/mock-backdrop.jpg",
    },
    {
      id: 2,
      title: "Another Mock Movie",
      overview: "This is another placeholder movie description.",
      poster_path: "/mock2-poster.jpg",
      release_date: "2026-02-01",
      vote_average: 7.2,
      backdrop_path: "/mock2-backdrop.jpg",
    },
  ],
  total_pages: 1,
  total_results: 2,
};

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // make sure to add this to .env.local

export const fetchTrendingMovies = async (): Promise<MovieResponse> => {
  if (!API_KEY) {
    console.warn("No TMDB API key found, returning mock movies.");
    return mockMovies;
  }

  const res = await fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${API_KEY}`);

  if (!res.ok) {
    console.error(await res.text()); // log API error for debugging
    console.warn("Failed to fetch from TMDB, returning mock movies.");
    return mockMovies;
  }

  return res.json();
};
