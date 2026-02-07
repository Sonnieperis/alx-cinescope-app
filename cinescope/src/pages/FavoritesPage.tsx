"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";
import useFavorites from "@/hooks/useFavorites";
import { fetchMoviesByIds } from "@/services/movieApi";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  padding: 2rem;
`;

export default function FavoritesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    async function loadFavorites() {
      if (favorites.length === 0) return;
      const data = await fetchMoviesByIds(favorites);
      setMovies(data);
    }
    loadFavorites();
  }, [favorites]);

  if (movies.length === 0)
    return <p style={{ padding: "2rem" }}>No favorites yet!</p>;

  return (
    <Grid>
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={favorites.includes(movie.imdbID)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </Grid>
  );
}
