import { Movie } from "@/types/movie";


const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Matrix Resurrections",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    overview: "The fourth installment in The Matrix series.",
    release_date: "2021-12-22",
    vote_average: 7.0,
  },
  {
    id: 2,
    title: "Spider-Man: No Way Home",
    poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    overview: "Peter Parker's secret identity is revealed to the world.",
    release_date: "2021-12-15",
    vote_average: 8.4,
  },
  {
    id: 3,
    title: "Dune",
    poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    overview: "Paul Atreides leads his family to the desert planet Arrakis.",
    release_date: "2021-10-22",
    vote_average: 8.1,
  },
];

// Simulate fetching trending movies
export async function fetchTrendingMovies(): Promise<{ results: Movie[] }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ results: mockMovies });
    }, 500);
  });
}

// Favorite movies stored in localStorage under 'favorites'
const FAVORITES_KEY = "favorites";

// Get favorites from localStorage
export function getFavoriteMovies(): Movie[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Add a movie to favorites
export function addFavorite(movie: Movie) {
  if (typeof window === "undefined") return;
  const favorites = getFavoriteMovies();
  if (!favorites.find((m) => m.id === movie.id)) {
    favorites.push(movie);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

// Remove a movie from favorites
export function removeFavorite(movieId: number) {
  if (typeof window === "undefined") return;
  let favorites = getFavoriteMovies();
  favorites = favorites.filter((m) => m.id !== movieId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Check if a movie is in favorites
export function isFavorite(movieId: number): boolean {
  return getFavoriteMovies().some((m) => m.id === movieId);
}
