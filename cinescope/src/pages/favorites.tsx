import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";
import {
  getFavorites,
  toggleFavorite,
  fetchFavoriteMovies,
} from "@/services/localStorage";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
`;

export default function FavoritesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
    fetchFavoriteMovies().then(setMovies);
  }, []);

  const handleToggleFavorite = (movie: Movie) => {
    toggleFavorite(movie);
    setFavorites(getFavorites());
    setMovies((prev) => prev.filter((m) => m.id !== movie.id));
  };

  if (movies.length === 0) {
    return <p style={{ padding: "2rem" }}>No favorites yet!</p>;
  }

  return (
    <Grid>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={favorites.includes(movie.id)}
        />
      ))}
    </Grid>
  );
}
