import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  fetchTrendingMovies,
  addFavorite,
  removeFavorite,
  isFavorite,
} from "@/services/movieApi";
import { Movie } from "@/types/movie";

const Dashboard = styled.div`
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
`;

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
`;

const Poster = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 0.8rem;
  flex-grow: 1;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin: 0 0 0.5rem;
`;

const Button = styled.button<{ favorite?: boolean }>`
  padding: 0.5rem;
  margin-top: auto;
  width: 100%;
  background-color: ${({ favorite }) => (favorite ? "#f44336" : "#34967C")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`;

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    async function loadMovies() {
      const data = await fetchTrendingMovies();
      setMovies(data.results);

      // Initialize favorites
      setFavorites(data.results.filter((m) => isFavorite(m.id)).map((m) => m.id));
    }
    loadMovies();
  }, []);

  const toggleFavorite = (movie: Movie) => {
    if (favorites.includes(movie.id)) {
      removeFavorite(movie.id);
      setFavorites((prev) => prev.filter((id) => id !== movie.id));
    } else {
      addFavorite(movie);
      setFavorites((prev) => [...prev, movie.id]);
    }
  };

  return (
    <Dashboard>
      <h1>Trending Movies</h1>
      <Grid>
        {movies.map((movie) => (
          <Card key={movie.id}>
            <Poster
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <Info>
              <Title>{movie.title}</Title>
              <Button
                favorite={favorites.includes(movie.id)}
                onClick={() => toggleFavorite(movie)}
              >
                {favorites.includes(movie.id) ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </Info>
          </Card>
        ))}
      </Grid>
    </Dashboard>
  );
}
