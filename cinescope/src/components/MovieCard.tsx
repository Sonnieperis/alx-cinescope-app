"use client";

import Link from "next/link";
import { Movie } from "../types/movie";
import useFavorites from "../hooks/useFavorites";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(movie.imdbID);

  return (
    <div className="movie-card">
      <Link href={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
        />
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </Link>

      <button onClick={() => toggleFavorite(movie.imdbID)}>
        {isFavorite ? "Remove Favorite" : "Add to Favorites"}
      </button>
    </div>
  );
}
