import Link from "next/link";
import { Movie } from "../types/movie";
import { useFavorites } from "../hooks/useFavorites";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(movie.imdbID);

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <Link href={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster}
          alt={movie.Title}
          style={{ width: "100%", cursor: "pointer" }}
        />
      </Link>

      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>

      <button onClick={() => toggleFavorite(movie)}>
        {favorite ? "Remove Favorite" : "Add to Favorites"}
      </button>
    </div>
  );
}
