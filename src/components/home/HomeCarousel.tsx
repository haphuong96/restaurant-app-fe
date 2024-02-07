import { Carousel } from "@material-tailwind/react";
import HomeCarouselImg from "../../assets/homecarousel.jpg";

export function HomeCarousel() {
  return (
    <Carousel className="mt-2" placeholder="carousel">
      <img
        src={HomeCarouselImg}
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src={HomeCarouselImg}
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src={HomeCarouselImg}
        alt="image 1"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}