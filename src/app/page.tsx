import { Carousel, AutoCarousel } from "@/components/carousel";
import { CarouselItem } from "@/components/ui/carousel";
import {
  MovieCard,
  AutoMovieCard,
  MovieCardAlt,
} from "@/components/movie-card";
import Heading from "@/components/heading";

import {
  getPopularMovies,
  getTopRated,
  getUpcoming,
} from "@/utils/apis/movies";
import { getOnTheAirTV, getTopRatedTV } from "@/utils/apis/tv";
import { separateIntoChunks } from "@/utils/formatter";

export default async function Page() {
  const popular = await getPopularMovies();
  const upcomingTV = await getOnTheAirTV();
  const upcoming = await getUpcoming();
  const topRatedMovie = separateIntoChunks((await getTopRated()).results, 4);
  const topRatedTV = separateIntoChunks((await getTopRatedTV()).results, 4);

  return (
    <>
      <section>
        <div className="w-full h-[50vh] bg-no-repeat">
          <AutoCarousel>
            {popular.results.map((movie) => (
              <CarouselItem className="w-full h-full pl-0" key={movie.id}>
                <AutoMovieCard
                  href={`/movies/${movie.id}`}
                  title={movie.title}
                  image={movie.backdrop_path}
                />
              </CarouselItem>
            ))}
          </AutoCarousel>
        </div>
      </section>
      <section>
        <Heading title="Upcoming Movie" />
        <div className="w-full relative flex justify-center">
          <Carousel>
            {upcoming.results.map((movie) => (
              <CarouselItem
                className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                key={movie.id}
              >
                <MovieCard
                  href={`/movies/${movie.id}`}
                  title={movie.title}
                  overview={movie.overview}
                  image={movie.poster_path}
                />
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </section>
      <section>
        <Heading title="Upcoming TV Show" />
        <Carousel>
          {upcomingTV.results.map((show) => (
            <CarouselItem
              className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              key={show.id}
            >
              <MovieCard
                href={`/tv/${show.id}`}
                title={show.name}
                overview={show.overview}
                image={show.poster_path}
              />
            </CarouselItem>
          ))}
        </Carousel>
      </section>
      <section className="w-full grid grid-cols-2 gap-6 px-6">
        <div className="w-full h-full p-6">
          <Heading title="Top Rated Movie" />
          <Carousel>
            {topRatedMovie.map((movies, index) => (
              <CarouselItem
                className="w-full grid grid-cols-1 grid-rows-4 gap-6"
                key={index}
              >
                {movies.map((movie) => (
                  <MovieCardAlt
                    key={movie.id}
                    href={`/movies/${movie.id}`}
                    title={movie.title}
                    overview={movie.overview}
                    image={movie.poster_path}
                    vote_average={movie.vote_average}
                  />
                ))}
              </CarouselItem>
            ))}
          </Carousel>
        </div>
        <div className="w-full h-full p-6">
          <Heading title="Top Rated TV Show" />
          <Carousel>
            {topRatedTV.map((shows, index) => (
              <CarouselItem
                className="w-full grid grid-cols-1 grid-rows-4 gap-6"
                key={index}
              >
                {shows.map((show) => (
                  <MovieCardAlt
                    key={show.id}
                    href={`/tv/${show.id}`}
                    title={show.name}
                    overview={show.overview}
                    image={show.poster_path}
                    vote_average={show.vote_average}
                  />
                ))}
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </section>
    </>
  );
}
