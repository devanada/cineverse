"use client";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel as MainCarousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Props {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
}

const Carousel = (props: Props) => {
  return (
    <div className="w-full h-full relative flex justify-center">
      <MainCarousel
        opts={{
          align: "start",
        }}
        className="w-full h-full max-w-[80%] md:max-w-[90%] lg:max-w-[95%]"
        orientation={props.orientation}
      >
        <CarouselContent className="w-full h-full ml-0">
          {props.children}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </MainCarousel>
    </div>
  );
};

const AutoCarousel = (props: Props) => {
  return (
    <div className="w-full h-full">
      <MainCarousel
        plugins={[
          Autoplay({
            delay: 10000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full h-full"
      >
        <CarouselContent className="ml-0">{props.children}</CarouselContent>
      </MainCarousel>
    </div>
  );
};

export { Carousel, AutoCarousel };
