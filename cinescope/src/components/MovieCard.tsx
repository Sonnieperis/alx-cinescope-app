import React from "react";
import styled from "styled-components";
import { Movie } from "@/types/movie";
import { useRouter } from "next/router";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.03);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#34967C")};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite, onToggleFavorite }) => {
  const router = useRouter();

  const handleClickCard = () => {
    router.push(`/movie/${movie.imdbID}`);
  };

  return (
    <Card>
      <Poster src={movie.Poster} alt={movie.Title} onClick={handleClickCard} />
      <Info>
        <Title onClick={handleClickCard}>{movie.Title}</Title>
        <p>{movie.Year}</p>
        <Button onClick={() => onToggleFavorite(movie)}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Info>
    </Card>
  );
};

export default MovieCard;
