import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchTrendingMovies } from "@/services/movieApi";
import { Movie } from "@/types/movie";

// Styled components
const Container = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  background-color: #34967c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #2b7a62;
  }
`;

const MovieWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Poster = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 12px;
  object-fit: cover;
`;

const Info = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 1rem;
`;

const Overview = styled.p`
  font-size: 1rem;
  color: #555;
`;

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const data = await fetchTrendingMovies(); // using mock API
        const found = data.results.find((m) => m.id === Number(id));
        if (!found) throw new Error("Movie not found");
        setMovie(found);
      } catch (err) {
        setError("Failed to load movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <Container>Loading movie details...</Container>;
  if (error) return <Container>{error}</Container>;
  if (!movie) return <Container>No movie found</Container>;

  return (
    <Container>
      <BackButton onClick={() => router.back()}>← Back</BackButton>
      <MovieWrapper>
        <Poster
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/assets/images/logo.png"
          }
          alt={movie.title}
        />
        <Info>
          <Title>{movie.title}</Title>
          <Subtitle>Release Date: {movie.release_date}</Subtitle>
          <Overview>{movie.overview}</Overview>
        </Info>
      </MovieWrapper>
    </Container>
  );
}
