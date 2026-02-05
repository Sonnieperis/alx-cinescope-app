import Link from "next/link";

const MovieCard = ({ movie }: any) => {
  return (
    <Link href={`/movies/${movie.id}`}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ width: "100%", borderRadius: "8px" }}
      />
    </Link>
  );
};

export default MovieCard;
