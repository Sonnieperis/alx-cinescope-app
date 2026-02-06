import { MovieResponse } from "@/types/movie";
import { OMDB_API_KEY, OMDB_BASE_URL } from "./constants";

const mockResponse: MovieResponse = {
  results: [
    {
      id: "mock-1",
      title: "Mock Movie",
      year: "2024",
      poster: "https://via.placeholder.com/300x450",
    },
  ],
};

export async function fetchTrendingMovies(): Promise<MovieResponse> {
  if (!OMDB_API_KEY) {
    console.warn("OMDb API key missing — using mock data");
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockResponse), 500)
    );
  }

  const res = await fetch(
    `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=movie&type=movie`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();

  return {
    results: data.Search.map((movie: any) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    })),
  };
}
