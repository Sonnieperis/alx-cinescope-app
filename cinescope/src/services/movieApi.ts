const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
  const res = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return res.json();
};

export const fetchMovieById = async (id: string) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie");
  }

  return res.json();
};
