import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchTrendingMovies } from "@/services/movieApi";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";
import { getFavorites, toggleFavorite } from "@/services/localStorage";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
`;

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
    setFavorites(getFavorites());
  }, []);

  const handleToggleFavorite = (movie: Movie) => {
    toggleFavorite(movie);
    setFavorites(getFavorites());
  };

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
