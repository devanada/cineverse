import React from "react";

import Pagination from "@/components/pagination";
import MovieCard from "@/components/movie-card";

import { buildQueryString } from "@/utils/formatter";
import { Params, Response } from "@/utils/types/api";
import { Movie } from "@/utils/types/movies";

interface Props {
  searchParams: Params;
}

async function getMovies(params: Params) {
  try {
    const query = buildQueryString(params);
    const url = query
      ? `https://api.themoviedb.org/3/discover/movie${query}&language=en-US`
      : "https://api.themoviedb.org/3/discover/movie?language=en-US";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTY3ZDAyNWNhMGI3NzE2NTcwOTg0MTcwOTY5ZTg4ZiIsInN1YiI6IjYyY2UzMDFjNGRjMzRhMDA0ZTM5NDMyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFxoj8wdfWn0QHVYxVfcn47_4-QJ2BjC2bQ7U0wR-BI",
      },
    });
    const result = await response.json();

    return result as Response<Movie[]>;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Page({ searchParams }: Props) {
  const movies = await getMovies({ ...searchParams });

  return (
    <>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.results.map((movie) => (
          <MovieCard key={movie.id} {...movie} gridDisplay />
        ))}
      </div>
      <Pagination
        page={movies.page}
        total_pages={movies.total_pages}
        query={searchParams}
      />
    </>
  );
}
