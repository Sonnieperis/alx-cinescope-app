import React from "react";
import styled from "styled-components";
import { Movie } from "@/types/movie";
import FavoriteButton from "./FavoriteButton";

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
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
  margin: 0;
  font-size: 1.1rem;
`;

const Year = styled.p`
  margin: 0.3rem 0;
  color: #555;
`;

type MovieCardProps = {
  movie: Movie;
  onToggleFavorite: (movie: Movie) => void;
  isFavorite: boolean;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, onToggleFavorite, isFavorite }) => {
  return (
    <Card>
      <Poster
        src={movie.poster || "/placeholder.png"}
        alt={movie.title}
      />
      <Info>
        <Title>{movie.title}</Title>
        <Year>{movie.year}</Year>
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={() => onToggleFavorite(movie)}
        />
      </Info>
    </Card>
  );
};

export default MovieCard;
