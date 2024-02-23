import { Movie } from "@/utils/types/movies";

export async function getDetailMovie(movie_id: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?append_to_response=videos%2Creviews%2Ccredits%2Csimilar&language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTY3ZDAyNWNhMGI3NzE2NTcwOTg0MTcwOTY5ZTg4ZiIsInN1YiI6IjYyY2UzMDFjNGRjMzRhMDA0ZTM5NDMyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFxoj8wdfWn0QHVYxVfcn47_4-QJ2BjC2bQ7U0wR-BI",
        },
      }
    );

    const result = await response.json();

    return result as Movie;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
