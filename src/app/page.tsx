import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MovieCard from "@/components/movie-card";
import Heading from "@/components/heading";

import { Response } from "@/utils/types/api";
import { Movie } from "@/utils/types/movies";

async function getPopularMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
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
    return result as Response<Movie[]>;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

async function getNowPlaying() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
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
    return result as Response<Movie[]>;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

async function getTopRated() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
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
    return result as Response<Movie[]>;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

async function getUpcoming() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
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
    return result as Response<Movie[]>;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Page() {
  const popular = await getPopularMovies();
  const nowPlaying = await getNowPlaying();
  const topRated = await getTopRated();
  const upcoming = await getUpcoming();

  return (
    <>
      <Heading title="Upcoming" />
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {upcoming.results.map((movie) => (
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
      <Heading title="Top Rated" />
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {topRated.results.map((movie) => (
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
      <Heading title="Hot Takes" />
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {popular.results.map((movie) => (
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
      <Heading title="Now Playing" />
      <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {nowPlaying.results.map((movie) => (
          <MovieCard key={movie.id} {...movie} gridDisplay />
        ))}
      </div>
    </>
  );
}
