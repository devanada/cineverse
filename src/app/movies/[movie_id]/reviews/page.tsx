import { join, map, words, head } from "lodash";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import dayjs from "dayjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Pagination from "@/components/pagination";

import { getDetailMovie } from "@/utils/actions/movies";
import { Params, Response } from "@/utils/types/api";
import { IReview } from "@/utils/types/movies";

interface Props {
  params: { movie_id: string };
  searchParams: Params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const detail = await getDetailMovie(params.movie_id);

  return {
    title: `Review - ${detail.title} (${dayjs(detail.release_date).format(
      "YYYY"
    )}) - CineVerse`,
  };
}

async function getMovieReviews(movie_id: string, params: Params) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/reviews?language=en-US`,
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

    return result as Response<IReview[]>;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Page({ params, searchParams }: Props) {
  const reviews = await getMovieReviews(params.movie_id, { ...searchParams });

  return (
    <>
      <div className="flex flex-col gap-3">
        {reviews?.results.map((review) => (
          <div className="flex flex-col gap-3" key={review.id}>
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage
                  className="object-cover"
                  src={`https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}`}
                />
                <AvatarFallback>
                  {join(
                    map(words(review.author), (word) => head(word)),
                    ""
                  )}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-lg">{review.author}</p>
                <p className="text-sm text-muted-foreground">
                  {dayjs(review.updated_at).format("DD MMMM YYYY")}
                </p>
              </div>
            </div>
            <p className="text-justify tracking-wider">{review.content}</p>
          </div>
        ))}
      </div>
      <Pagination
        page={reviews.page}
        total_pages={reviews.total_pages}
        query={searchParams}
      />
    </>
  );
}
