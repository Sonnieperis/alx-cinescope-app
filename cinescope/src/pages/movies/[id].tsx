import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import { fetchTrendingMovies, isFavorite, addFavorite, removeFavorite } from "@/services/movieApi";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Poster = styled.img`
  width: 100%;
  max-width: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: #34967C;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!id) return;

    fetchTrendingMovies().then((movies) => {
      const m = movies.find((movie) => movie.imdbID === id);
      if (m) setMovie(m);
    });
  }, [id]);

  const toggleFavorite = () => {
    if (!movie) return;
    if (isFavorite(movie)) removeFavorite(movie);
    else addFavorite(movie);
    setMovie({ ...movie }); // re-render
  };

  if (!movie) return <p>Loading movie details...</p>;

  return (
    <Container>
      <h1>{movie.Title}</h1>
      <Poster src={movie.Poster} alt={movie.Title} />
      <p>Year: {movie.Year}</p>
      <Button onClick={toggleFavorite}>
        {isFavorite(movie) ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
    </Container>
  );
};

export default MovieDetails;
