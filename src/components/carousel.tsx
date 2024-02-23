import {
  Carousel as MainCarousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Props {
  children: React.ReactNode;
}

const Carousel = (props: Props) => {
  return (
    <div className="w-full relative flex justify-center">
      <MainCarousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-[80%] md:max-w-[90%] lg:max-w-[95%]"
      >
        <CarouselContent>{props.children}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </MainCarousel>
    </div>
  );
};

export default Carousel;
