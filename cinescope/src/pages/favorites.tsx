import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";
import { getFavorites, removeFavorite, isFavorite } from "@/services/movieApi";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
  gap: 1.5rem;
  padding: 2rem;
`;

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const reloadFavorites = () => {
    setFavorites(getFavorites());
  };

  useEffect(() => {
    reloadFavorites();
  }, []);

  const handleToggleFavorite = (movie: Movie) => {
    if (isFavorite(movie)) {
      removeFavorite(movie);
    }
    reloadFavorites();
  };

  if (favorites.length === 0) return <p style={{ textAlign: "center", marginTop: "2rem" }}>No favorites yet!</p>;

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "1rem" }}>Your Favorites</h1>
      <Grid>
        {favorites.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={isFavorite(movie)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </Grid>
    </div>
  );
};

export default FavoritesPage;
