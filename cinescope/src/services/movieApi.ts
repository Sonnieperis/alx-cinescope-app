import { Movie } from "@/types/movie";
import { OMDB_API_KEY, OMDB_BASE_URL } from "@/services/constants";


const mockMovies: Movie[] = [
  {
    Title: "The Matrix",
    Year: "1999",
    imdbID: "tt0133093",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3NjAtNjU2Ni00ZjQ4LWE3YjgtNzU0MzJlZjMzN2ZhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    Title: "Inception",
    Year: "2010",
    imdbID: "tt1375666",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjY4Nl5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
];


export async function fetchMovies(): Promise<Movie[]> {
  try {
    
    return mockMovies;
  } catch (err) {
    console.error("Failed to fetch movies:", err);
    return mockMovies;
  }
}

// Fetch multiple movies by IDs
export async function fetchMoviesByIds(ids: string[]): Promise<Movie[]> {
  const requests = ids.map((id) =>
    fetch(`${OMDB_BASE_URL}?i=${id}&apikey=${OMDB_API_KEY}`).then((res) => res.json())
  );
  const movies = await Promise.all(requests);
  return movies;
}
