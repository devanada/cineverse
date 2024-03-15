import { Metadata } from "next";

import Pagination from "@/components/pagination";
import MovieCard from "@/components/movie-card";

import { IParams } from "@/utils/types/api";
import { getWatchlistMovies } from "@/utils/actions/user";

interface Props {
  searchParams: IParams;
}

export const metadata: Metadata = {
  title: "My Watchlist - CineVerse",
};

export default async function Page({ searchParams }: Props) {
  const movies = await getWatchlistMovies({ ...searchParams });

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
