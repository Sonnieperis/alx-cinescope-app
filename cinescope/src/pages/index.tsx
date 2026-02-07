import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";
import { fetchMovies } from "@/services/movieApi";
import { GlobalStyles } from "@/styles/GlobalStyles";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  padding: 2rem;
`;

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]); // For now empty

  useEffect(() => {
    fetchMovies().then(setMovies);
  }, []);

  const handleToggleFavorite = (movie: Movie) => {
    console.log("Toggling favorite for", movie.Title);
    // We'll implement localStorage later
  };

  return (
    <>
      <GlobalStyles />
      <h1 style={{ padding: "1rem" }}>Cinescope Dashboard</h1>
      <Grid>
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={favorites.includes(movie.imdbID)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </Grid>
    </>
  );
}
