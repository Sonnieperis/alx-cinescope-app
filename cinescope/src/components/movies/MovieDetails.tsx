import { Movie } from "@/types/movie";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1``;
const Overview = styled.p``;
const Poster = styled.img`
  width: 300px;
  border-radius: 10px;
`;

type Props = { movie: Movie };

export default function MovieDetails({ movie }: Props) {
  return (
    <Container>
      <Title>{movie.title}</Title>
      <Poster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      <Overview>{movie.overview}</Overview>
    </Container>
  );
}
