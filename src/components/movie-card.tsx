import { truncate } from "lodash";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface Props {
  title: string;
  poster_path: string;
  overview: string;
  id: number;
  gridDisplay?: boolean;
}

const MovieCard = (props: Props) => {
  return (
    <Card key={props.id}>
      <CardContent
        className={cn(
          "flex flex-col items-center justify-center gap-3 relative",
          props.gridDisplay && "p-0 pb-2"
        )}
      >
        <Image
          className={cn("object-contain", props.gridDisplay && "rounded-t-xl")}
          src={
            props.poster_path
              ? `https://image.tmdb.org/t/p/w500/${props.poster_path}`
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
            <Link href={`/movies/${props.id}`}>See more</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
