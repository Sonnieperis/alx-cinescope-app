import { Movie, OMDbResponse } from "@/types/movie";
import { OMDB_API_KEY, OMDB_BASE_URL } from "./constants";

const mockMovies: Movie[] = [
  {
    imdbID: "tt0372784",
    Title: "Batman Begins",
    Year: "2005",
    Poster: "https://m.media-amazon.com/images/M/MV5BZmExZTU3Nzkt.jpg",
  },
  {
    imdbID: "tt0468569",
    Title: "The Dark Knight",
    Year: "2008",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0N15.jpg",
  },
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxMV5.jpg",
  },
];

export async function fetchMovies(search: string = "Batman"): Promise<Movie[]> {
  try {
    const res = await fetch(
      `${OMDB_BASE_URL}?s=${encodeURIComponent(search)}&apikey=${OMDB_API_KEY}`
    );
    const data: OMDbResponse = await res.json();

    if (data.Response === "True" && data.Search) {
      return data.Search;
    } else {
      console.warn("OMDb API failed, using mock movies", data.Error);
      return mockMovies;
    }
  } catch (err) {
    console.error("Fetch failed, using mock movies", err);
    return mockMovies;
  }
}
