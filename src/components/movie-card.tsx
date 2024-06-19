import { truncate } from "lodash";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface Props {
  title: string;
  image: string;
  href: string;
  overview?: string;
  gridDisplay?: boolean;
  vote_average?: number;
}

const MovieCard = (props: Props) => {
  return (
    <Card>
      <CardContent
        className={cn(
          "flex flex-col items-center justify-center gap-3 relative",
          props.gridDisplay && "p-0 pb-2"
        )}
      >
        <Image
          className={cn("object-contain", props.gridDisplay && "rounded-t-xl")}
          src={
            props.image
              ? `https://image.tmdb.org/t/p/w500/${props.image}`
              : "/movie_placeholder.png"
          }
          alt={props.title}
          width={500}
          height={750}
          priority
        />
        <p className="font-semibold text-lg text-center">{props.title}</p>
        <div className="absolute w-full h-full bg-black/70 p-6 flex flex-col justify-center gap-3 rounded-xl opacity-0 hover:opacity-100 duration-200">
          <p className="text-center">
            {truncate(props.overview, {
              length: 150,
              separator: /,?\.* +/,
            })}
          </p>
          <Button asChild>
            <Link href={props.href}>See more</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const MovieCardAlt = (props: Props) => {
  return (
    <div className="w-full h-full flex items-center gap-4">
      <Image
        className={cn("object-contain w-fit h-full")}
        src={
          props.image
            ? `https://image.tmdb.org/t/p/w92/${props.image}`
            : "/movie_placeholder.png"
        }
        alt={props.title}
        width={92}
        height={138}
        priority
      />
      <div>
        <Link href={props.href} className="text-lg font-semibold">
          {props.title}
        </Link>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{props.vote_average}</span>
        </div>
      </div>
    </div>
  );
};

const AutoMovieCard = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 relative">
      <Image
        className={cn("object-cover object-top")}
        src={
          props.image
            ? `https://image.tmdb.org/t/p/w1280/${props.image}`
            : "/movie_placeholder.png"
        }
        alt={props.title}
        fill={true}
        priority
      />
      <div className="absolute w-full h-full bg-black/20 p-6 flex flex-col justify-end items-start gap-3">
        <p className="font-semibold text-lg text-center">{props.title}</p>
        <Button asChild>
          <Link href={props.href}>See more</Link>
        </Button>
      </div>
    </div>
  );
};

export { MovieCard, MovieCardAlt, AutoMovieCard };
