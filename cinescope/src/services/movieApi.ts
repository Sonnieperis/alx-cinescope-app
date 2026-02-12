import { Movie } from "@/types/movie";
import { OMDB_API_KEY, OMDB_BASE_URL } from "@/services/constants";

// Fetch movies using a search query
export async function fetchMovies(
  search: string = "batman"
): Promise<Movie[]> {
  try {
    if (!OMDB_API_KEY) {
      console.error("OMDB API key is missing.");
      return [];
    }

    const response = await fetch(
      `${OMDB_BASE_URL}?s=${encodeURIComponent(
        search
      )}&apikey=${OMDB_API_KEY}`
    );

    if (!response.ok) {
      console.error("Network response was not ok");
      return [];
    }

    const data = await response.json();

    console.log("OMDB Response:", data); // Keep this for debugging

    if (data.Response === "False") {
      console.error("OMDB Error:", data.Error);
      return [];
    }

    return data.Search ?? [];
  } catch (err) {
    console.error("Failed to fetch movies:", err);
    return [];
  }
}

// Fetch multiple movies by IDs
export async function fetchMoviesByIds(
  ids: string[]
): Promise<Movie[]> {
  try {
    if (!OMDB_API_KEY) {
      console.error("OMDB API key is missing.");
      return [];
    }

    const requests = ids.map((id) =>
      fetch(
        `${OMDB_BASE_URL}?i=${id}&apikey=${OMDB_API_KEY}`
      ).then((res) => res.json())
    );

    const movies = await Promise.all(requests);

    return movies.filter((movie) => movie.Response !== "False");
  } catch (error) {
    console.error("Failed to fetch movies by IDs:", error);
    return [];
  }
}
