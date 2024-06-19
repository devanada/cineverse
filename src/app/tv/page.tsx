import { Metadata } from "next";
import React from "react";

import { MovieCard } from "@/components/movie-card";
import Pagination from "@/components/pagination";

import { getDiscoverTV } from "@/utils/apis/tv";
import { IParams } from "@/utils/types/api";

interface Props {
  searchParams: IParams;
}

export const metadata: Metadata = {
  title: "Discover TV Show - CineVerse",
};

export default async function Page({ searchParams }: Props) {
  const shows = await getDiscoverTV({ ...searchParams });

  return (
    <>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {shows.results.map((show) => (
          <MovieCard
            key={show.id}
            href={`/tv/${show.id}`}
            title={show.name}
            overview={show.overview}
            image={show.poster_path}
            gridDisplay
          />
        ))}
      </div>
      <Pagination
        page={shows.page}
        total_pages={shows.total_pages}
        query={searchParams}
      />
    </>
  );
}
