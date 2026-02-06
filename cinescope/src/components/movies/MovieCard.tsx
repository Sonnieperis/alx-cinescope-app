import styled from "styled-components";
import { Movie } from "@/types/movie";
import { addFavorite, removeFavorite, isFavorite } from "@/services/movieApi";
import { useState } from "react";

const Card = styled.div`
  background: #111;
  color: #fff;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 6px;
`;

const Button = styled.button`
  margin-top: 0.5rem;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
`;

export default function MovieCard({ movie }: { movie: Movie }) {
  const [fav, setFav] = useState(isFavorite(movie.id));

  const toggleFavorite = () => {
    if (fav) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
    setFav(!fav);
  };

  return (
    <Card>
      <Poster src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
      <Button onClick={toggleFavorite}>
        {fav ? "Remove Favorite" : "Add to Favorites"}
      </Button>
    </Card>
  );
}
