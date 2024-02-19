import type { Metadata, ResolvingMetadata } from "next";
import { join, map, words, head } from "lodash";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import dayjs from "dayjs";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { badgeVariants } from "@/components/ui/badge";
import MovieCard from "@/components/movie-card";
import Heading from "@/components/heading";

import { Movie } from "@/utils/types/movies";

interface Props {
  params: { movie_id: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const detail = await getDetailMovie(params.movie_id);

  return {
    title: `${detail.title} (${dayjs(detail.release_date).format(
      "YYYY"
    )}) - CineVerse`,
  };
}

async function getDetailMovie(movie_id: string) {
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

export default async function Page({ params }: Props) {
  const detail = await getDetailMovie(params.movie_id);

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-4xl tracking-widest">{detail.title}</p>
          <p className="text-sm tracking-wider">
            {dayjs(detail.release_date).format("YYYY")} | {detail.runtime}{" "}
            minutes | {detail.vote_average.toFixed(1)} ★ ({detail.vote_count})
          </p>
          <div className="flex gap-3">
            {detail.genres.map((genre) => (
              <Link
                className={badgeVariants({ variant: "outline" })}
                key={genre.id}
                href={"/"}
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>
        <div></div>
      </div>
      <div className="w-full flex gap-3">
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
        <div>
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
              <div className="flex gap-3">
                {detail.credits?.cast.slice(0, 3).map((cast) => (
                  <Link
                    className={badgeVariants({ variant: "outline" })}
                    href={"/"}
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
          <AccordionContent className="grid grid-cols-5 gap-3">
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
          <AccordionContent className="grid grid-cols-5 gap-3">
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
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
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
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Heading title="User Reviews" />
      <div className="flex flex-col gap-3">
        {detail.reviews?.results.map((review) => (
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
            <p>{review.content}</p>
          </div>
        ))}
      </div>
      <Heading title="More Like This" />
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {detail.similar.results.map((movie) => (
            <CarouselItem
              className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              key={movie.id}
            >
              <MovieCard {...movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
