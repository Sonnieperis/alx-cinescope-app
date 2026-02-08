import MovieCard from "../components/MovieCard";
import { useFavorites } from "../hooks/useFavorites";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <p>No favorite movies yet.</p>;
  }

  return (
    <div>
      <h2>My Favorites</h2>
      <div className="movie-grid">
        {favorites.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}
