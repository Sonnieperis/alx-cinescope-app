import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { fetchTrendingMovies } from "@/services/movieApi";
import { Movie } from "@/types/movie";

// Styled Components
const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.a`
  display: block;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;
`;

const MovieInfo = styled.div`
  padding: 0.75rem;
`;

const MovieTitle = styled.h2`
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
`;

const ReleaseDate = styled.p`
  font-size: 0.8rem;
  color: #777;
  margin: 0;
`;

const ErrorMessage = styled.p`
  color: red;
`;

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data.results);
      } catch (err) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) return <Container>Loading movies...</Container>;
  if (error) return <Container><ErrorMessage>{error}</ErrorMessage></Container>;

  return (
    <Container>
      <Title>Trending Movies</Title>
      <Grid>
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`} passHref>
            <Card>
              <Poster
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/assets/images/logo.png"
                }
                alt={movie.title}
              />
              <MovieInfo>
                <MovieTitle>{movie.title}</MovieTitle>
                <ReleaseDate>{movie.release_date}</ReleaseDate>
              </MovieInfo>
            </Card>
          </Link>
        ))}
      </Grid>
    </Container>
  );
}
