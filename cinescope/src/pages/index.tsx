import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "@/components/MovieCard";
import { fetchTrendingMovies, addFavorite, removeFavorite, isFavorite } from "@/services/movieApi";
import { Movie } from "@/types/movie";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
  gap: 1.5rem;
  padding: 2rem;
`;

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoritesToggle, setFavoritesToggle] = useState<number>(0);

  useEffect(() => {
    fetchTrendingMovies().then((data) => {
      setMovies(data);
      setLoading(false);
    });
  }, []);

  const handleToggleFavorite = (movie: Movie) => {
    if (isFavorite(movie)) {
      removeFavorite(movie);
    } else {
      addFavorite(movie);
    }
    setFavoritesToggle((prev) => prev + 1); // trigger re-render
  };

  if (loading) return <p>Loading movies...</p>;

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "1rem" }}>Trending Movies</h1>
      <Grid>
        {movies.map((movie) => (
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

export default Home;
