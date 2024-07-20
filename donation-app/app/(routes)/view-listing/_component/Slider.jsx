import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image.js";

function Slider({ imageList }) {
  return (
    <div className="flex justify-center overflow-hidden relative">
      {imageList && imageList.length > 0 ? (
        <Carousel
          slidesToShow={1}
          slidesToScroll={1}
          infinite
          className="w-full max-w-screen-lg"
        >
          <CarouselContent className="flex">
            {imageList.map((item, index) => (
              <CarouselItem key={index} className="relative w-full h-[300px]">
                <div className="relative w-full h-full">
                  <Image
                    src={item.url}
                    layout="fill"
                    objectFit="cover"
                    alt={`Image ${index}`}
                    className="rounded-xl"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 hover:bg-gray-300 transition-colors duration-300"
            style={{ width: "40px", height: "40px", fontSize: "24px" }}
          />
          <CarouselNext
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 hover:bg-gray-300 transition-colors duration-300"
            style={{ width: "40px", height: "40px", fontSize: "24px" }}
          />
        </Carousel>
      ) : (
        <div className="w-[700px] h-[300px] bg-slate-200 animate-pulse rounded-xl"></div>
      )}
    </div>
  );
}

export default Slider;
