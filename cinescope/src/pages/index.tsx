"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";
import { fetchMovies } from "@/services/movieApi";
import useFavorites from "@/hooks/useFavorites";
import { GlobalStyles } from "@/styles/GlobalStyles";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  padding: 2rem;
`;

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { toggleFavorite, isFavorite } = useFavorites(movies);

  useEffect(() => {
    async function loadMovies() {
      const data = await fetchMovies();
      setMovies(data);
    }
    loadMovies();
  }, []);

  return (
    <>
      <GlobalStyles />
      <h1 style={{ padding: "1rem" }}>Cinescope Dashboard</h1>
      {movies.length === 0 ? (
        <p style={{ padding: "2rem" }}>Loading movies...</p>
      ) : (
        <Grid>
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={isFavorite(movie)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </Grid>
      )}
    </>
  );
}
