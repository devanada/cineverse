import { join, map, words, head } from "lodash";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import dayjs from "dayjs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CarouselItem } from "@/components/ui/carousel";
import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MovieCard from "@/components/movie-card";
import Carousel from "@/components/carousel";
import Heading from "@/components/heading";
import WatchlistBtn from "./watchlist-btn";

import { getDetailMovie } from "@/utils/actions/movies";
import { postWatchlistMovie, postFavoriteMovie } from "@/utils/actions/user";
import FavoriteBtn from "./favorite-btn";

interface Props {
  params: { movie_id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const detail = await getDetailMovie(params.movie_id);

  return {
    title: `${detail.title} (${dayjs(detail.release_date).format(
      "YYYY"
    )}) - CineVerse`,
  };
}

export default async function Page({ params }: Props) {
  const detail = await getDetailMovie(params.movie_id);

  async function handleFavorite() {
    "use server";

    try {
      const payload = {
        media_type: "movie",
        media_id: +params.movie_id,
        favorite: true,
      };

      await postFavoriteMovie(payload);

      return { message: "Success added to favorite" };
    } catch (error) {
      return { message: "Failed to add to favorite" };
    }
  }

  async function handleWatchlist() {
    "use server";

    try {
      const payload = {
        media_type: "movie",
        media_id: +params.movie_id,
        watchlist: true,
      };

      await postWatchlistMovie(payload);

      return { message: "Success added to watchlist" };
    } catch (error) {
      return { message: "Failed to add to watchlist" };
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-3xl tracking-widest">{detail.title}</p>
          <p className="text-sm tracking-wider">
            {dayjs(detail.release_date).format("YYYY")} | {detail.runtime}{" "}
            minutes | {detail.vote_average.toFixed(1)} ★ ({detail.vote_count})
          </p>
          <div className="flex gap-3">
            {detail.genres.map((genre) => (
              <Link
                className={badgeVariants({ variant: "outline" })}
                key={genre.id}
                href={`/movies?with_genres=${genre.id}`}
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-3 md:flex-row md:items-start">
        <div className="flex flex-col w-full md:w-1/3 lg:w-1/5 items-center gap-3">
          <Image
            className="object-contain"
            src={
              detail.poster_path
                ? `https://image.tmdb.org/t/p/w500/${detail.poster_path}`
                : "/movie_placeholder.png"
            }
            alt={detail.title}
            width={250}
            height={500}
            priority
          />
          <WatchlistBtn actionFn={handleWatchlist} />
          <FavoriteBtn actionFn={handleFavorite} />
        </div>
        <div className="flex flex-col w-full md:w-2/3 lg:w-4/5">
          <ul className="[&>*]:flex [&>*]:gap-3 [&_span]:font-bold flex flex-col gap-3">
            <li>
              <span>Overview</span>
              <p>{detail.overview}</p>
            </li>
            <li>
              <span>Release Date</span>
              <p>{dayjs(detail.release_date).format("DD MMMM YYYY")}</p>
            </li>
            <li>
              <span>Directing</span>
              <Link
                className={badgeVariants({ variant: "outline" })}
                href={`/movies?with_crew=${
                  detail.credits?.crew.find(
                    (crew) => crew.department === "Directing"
                  )?.id
                }`}
              >
                {
                  detail.credits?.crew.find(
                    (crew) => crew.department === "Directing"
                  )?.name
                }
              </Link>
            </li>
            <li>
              <span>Budget</span>
              <p>
                {detail.budget.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </li>
            <li>
              <span>Revenue</span>
              <p>
                {parseInt(detail.revenue).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </li>
            <li>
              <span>Stars</span>
              <div className="flex flex-wrap gap-3">
                {detail.credits?.cast.slice(0, 3).map((cast) => (
                  <Link
                    className={badgeVariants({ variant: "outline" })}
                    key={cast.id}
                    href={`/movies?with_cast=${cast.id}`}
                  >
                    {cast.name}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="cast">
          <AccordionTrigger className="text-2xl">Cast</AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {detail.credits?.cast.map((cast) => (
              <div key={cast.credit_id} className="flex gap-3">
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                        : "/avatar_placeholder.png"
                    }
                  />
                  <AvatarFallback>
                    {join(
                      map(words(cast.name), (word) => head(word)),
                      ""
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <Link
                    className="font-bold hover:underline"
                    href={`/movies?with_cast=${cast.id}`}
                  >
                    {cast.name}
                  </Link>
                  <p className="text-muted-foreground">{cast.character}</p>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="crew">
          <AccordionTrigger className="text-2xl">Crew</AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {detail.credits?.crew.map((crew) => (
              <div key={crew.credit_id} className="flex gap-3">
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src={
                      crew.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${crew.profile_path}`
                        : "/avatar_placeholder.png"
                    }
                  />
                  <AvatarFallback>
                    {join(
                      map(words(crew.name), (word) => head(word)),
                      ""
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <Link
                    className="font-bold hover:underline"
                    href={`/movies?with_crew=${crew.id}`}
                  >
                    {crew.name}
                  </Link>
                  <p className="text-muted-foreground">{crew.department}</p>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Heading title="Videos" />
      <Carousel>
        {detail.videos?.results.map((movie) => (
          <CarouselItem key={movie.id}>
            <iframe
              key={movie.id}
              className="h-full w-full aspect-video"
              src={`https://www.youtube.com/embed/${movie.key}`}
              title={movie.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </CarouselItem>
        ))}
      </Carousel>
      <Heading
        title="User Reviews"
        showSeeMore
        navigate={`/movies/${params.movie_id}/reviews`}
      />
      <div className="flex flex-col gap-3">
        {detail.reviews?.results.slice(0, 3).map((review) => (
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
      <Heading title="More Like This" />
      <Carousel>
        {detail.similar.results.map((movie) => (
          <CarouselItem
            className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            key={movie.id}
          >
            <MovieCard {...movie} />
          </CarouselItem>
        ))}
      </Carousel>
    </>
  );
}
