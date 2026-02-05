import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "@/services/movieApi";
import MovieGrid from "@/components/movies/MovieGrid";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(data => setMovies(data.results));
  }, []);

  return (
    <Layout>
      <h1 style={{ padding: "1rem" }}>Trending Movies</h1>
      <MovieGrid movies={movies} />
    </Layout>
  );
}
