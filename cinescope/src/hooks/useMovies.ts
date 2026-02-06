import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "@/services/movieApi";
import { Movie } from "@/types/movie";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrendingMovies()
      .then((res) => setMovies(res.results))
      .catch(() => setError("Failed to load movies"))
      .finally(() => setLoading(false));
  }, []);

  return { movies, loading, error };
}
