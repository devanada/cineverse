import { join, map, words, head } from "lodash";
import type { Metadata } from "next";
import React from "react";
import dayjs from "dayjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Pagination from "@/components/pagination";

import { getDetailMovie, getMovieReviews } from "@/utils/actions/movies";
import { IParams } from "@/utils/types/api";

interface Props {
  params: { movie_id: string };
  searchParams: IParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const detail = await getDetailMovie(params.movie_id);

  return {
    title: `Review - ${detail.title} (${dayjs(detail.release_date).format(
      "YYYY"
    )}) - CineVerse`,
  };
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
