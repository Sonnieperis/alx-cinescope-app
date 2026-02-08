import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";
import { fetchMovies } from "@/services/movieApi";

const Page = styled.div`
  padding: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.25rem;
`;

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      const data = await fetchMovies();
      setMovies(data);
      setLoading(false);
    }

    loadMovies();
  }, []);

  if (loading) {
    return <Page>Loading movies…</Page>;
  }

  if (movies.length === 0) {
    return <Page>No movies found.</Page>;
  }

  return (
    <Page>
      <h1>Cinescope</h1>
      <Grid>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </Grid>
    </Page>
  );
}
