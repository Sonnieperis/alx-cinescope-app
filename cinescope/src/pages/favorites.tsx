import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";
import useFavorites from "@/hooks/useFavorites";
import { fetchMoviesByIds } from "@/services/movieApi"; 
import { GlobalStyles } from "@/styles/GlobalStyles";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  padding: 2rem;
`;

export default function FavoritesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { toggleFavorite, favorites } = useFavorites(movies);

  useEffect(() => {
    
    if (favorites.length > 0) {
      fetchMoviesByIds(favorites).then(setMovies);
    } else {
      setMovies([]);
    }
  }, [favorites]);

  if (movies.length === 0) {
    return <p style={{ padding: "2rem" }}>You have no favorite movies yet!</p>;
  }

  return (
    <>
      <GlobalStyles />
      <h1 style={{ padding: "1rem" }}>Your Favorites</h1>
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
    </>
  );
}
