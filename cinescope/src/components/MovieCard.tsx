import styled from "styled-components";
import { Movie } from "@/types/movie";
import FavoriteButton from "./FavoriteButton";

const Card = styled.div`
  background: #fff;
  border-radius: 6px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }

  h3 {
    margin-bottom: 0.25rem;
    font-size: 1rem;
  }

  p {
    font-size: 0.85rem;
    color: #555;
    margin-bottom: 0.5rem;
  }
`;

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite?: (movie: Movie) => void;
}

export default function MovieCard({ movie, isFavorite, onToggleFavorite }: MovieCardProps) {
  return (
    <Card>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      {onToggleFavorite && (
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={() => onToggleFavorite(movie)}
        />
      )}
    </Card>
  );
}
