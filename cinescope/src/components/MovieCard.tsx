"use client";

import styled from "styled-components";
import { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 0.5rem 1rem;
  flex-grow: 1;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const Year = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;

const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  background: ${({ isFavorite }) => (isFavorite ? "#ff4d4f" : "#1890ff")};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  margin: 0.5rem 0;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    opacity: 0.85;
  }
`;

export default function MovieCard({ movie, isFavorite, onToggleFavorite }: MovieCardProps) {
  return (
    <Card>
      <Poster src={movie.Poster} alt={movie.Title} />
      <Info>
        <Title>{movie.Title}</Title>
        <Year>{movie.Year}</Year>
        <FavoriteButton isFavorite={isFavorite} onClick={() => onToggleFavorite(movie)}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </FavoriteButton>
      </Info>
    </Card>
  );
}
