import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchTrendingMovies } from "@/services/movieApi";
import { Movie } from "@/types/movie";

// Styled components
const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;
`;

const MovieInfo = styled.div`
  padding: 0.8rem;
`;

const MovieTitle = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

const ReleaseDate = styled.p`
  font-size: 0.85rem;
  color: #777;
`;

const Overview = styled.p`
  font-size: 0.8rem;
  color: #555;
  margin-top: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data.results);
      } catch (err) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <Container>Loading movies...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <Title>Trending Movies</Title>
      <Grid>
        {movies.map((movie) => (
          <Card key={movie.id}>
            <Poster
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/assets/images/logo.png" // fallback poster
              }
              alt={movie.title}
            />
            <MovieInfo>
              <MovieTitle>{movie.title}</MovieTitle>
              <ReleaseDate>{movie.release_date}</ReleaseDate>
              <Overview>{movie.overview}</Overview>
            </MovieInfo>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}
