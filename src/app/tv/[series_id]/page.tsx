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
import { MovieCard } from "@/components/movie-card";
import { Carousel } from "@/components/carousel";
import Heading from "@/components/heading";
import ActionBtn from "./action-btn";

import {
  handleAddFavorite,
  handleAddWatchlist,
  handleRemoveFavorite,
  handleRemoveWatchlist,
} from "@/utils/actions/user";
import { getDetailTV } from "@/utils/apis/tv";

interface Props {
  params: { series_id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const detail = await getDetailTV(params.series_id);

  return {
    title: `${detail.name} (${dayjs(detail.first_air_date).format(
      "YYYY"
    )}) - CineVerse`,
  };
}

export default async function Page({ params }: Props) {
  const detail = await getDetailTV(params.series_id);

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-3xl tracking-widest">{detail.name}</p>
          <p className="text-sm tracking-wider">
            {dayjs(detail.first_air_date).format("YYYY")} |{" "}
            {detail.number_of_seasons} seasons | {detail.number_of_episodes}{" "}
            episodes | {detail.vote_average.toFixed(1)} ★ ({detail.vote_count})
          </p>
          <div className="flex gap-3">
            {detail.genres.map((genre) => (
              <Link
                className={badgeVariants({ variant: "outline" })}
                key={genre.id}
                href={`/tv?with_genres=${genre.id}`}
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
            alt={detail.name}
            width={250}
            height={500}
            priority
          />
          <ActionBtn
            actionFn={
              detail.account_states?.watchlist
                ? handleRemoveWatchlist
                : handleAddWatchlist
            }
            inputValue={params.series_id}
            label={
              detail.account_states?.watchlist
                ? "Remove from watchlist"
                : "Add to watchlist"
            }
            variant="secondary"
          />
          <ActionBtn
            actionFn={
              detail.account_states?.favorite
                ? handleRemoveFavorite
                : handleAddFavorite
            }
            inputValue={params.series_id}
            label={
              detail.account_states?.favorite
                ? "Remove from favorite"
                : "Add to favorite"
            }
          />
          <input
            type="hidden"
            name="media_id"
            form="form-favorite"
            value={params.series_id}
          />
        </div>
        <div className="flex flex-col w-full md:w-2/3 lg:w-4/5">
          <ul className="[&>*]:flex [&>*]:gap-3 [&_span]:font-bold flex flex-col gap-3">
            <li>
              <span>Overview</span>
              <p>{detail.overview}</p>
            </li>
            <li>
              <span>Tagline</span>
              <p>{detail.tagline ? detail.tagline : "-"}</p>
            </li>
            <li>
              <span>First Air Date</span>
              <p>{dayjs(detail.first_air_date).format("DD MMMM YYYY")}</p>
            </li>
            <li>
              <span>Last Air Date</span>
              <p>{dayjs(detail.last_air_date).format("DD MMMM YYYY")}</p>
            </li>
            <li>
              <span>Creator</span>
              <div className="flex flex-wrap gap-3">
                {detail.created_by?.map((creator) => (
                  <p
                    className={badgeVariants({ variant: "outline" })}
                    key={creator.id}
                  >
                    {creator.name}
                  </p>
                ))}
              </div>
            </li>
            <li>
              <span>Stars</span>
              <div className="flex flex-wrap gap-3">
                {detail.credits?.cast.slice(0, 3).map((cast) => (
                  <p
                    className={badgeVariants({ variant: "outline" })}
                    key={cast.id}
                  >
                    {cast.name}
                  </p>
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
                  <p className="font-bold">{cast.name}</p>
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
                  <p className="font-bold">{crew.name}</p>
                  <p className="text-muted-foreground">{crew.department}</p>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Heading title="Videos" />
      <Carousel>
        {detail.videos?.results.map((video) => (
          <CarouselItem key={video.id}>
            <iframe
              key={video.id}
              className="h-full w-full aspect-video"
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </CarouselItem>
        ))}
      </Carousel>
      <Heading
        title="User Reviews"
        showSeeMore
        navigate={`/tv/${params.series_id}/reviews`}
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
            <p className="text-justify tracking-wider line-clamp-3">
              {review.content}
            </p>
          </div>
        ))}
      </div>
      <Heading title="More Like This" />
      <Carousel>
        {detail.similar?.results.map((show) => (
          <CarouselItem
            className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            key={show.id}
          >
            <MovieCard
              href={`/tv/${show.id}`}
              title={show.title}
              overview={show.overview}
              image={show.poster_path}
            />
          </CarouselItem>
        ))}
      </Carousel>
    </>
  );
}
