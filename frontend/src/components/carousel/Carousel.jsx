import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import apiPublic from "../../lib/axios/apiPublic";
import { cn } from "../../lib/utils";
import { getStrapiUrl } from "@/lib/utils";
import SlideNextButton from "../carousel/SlideNextButton";
import SlidePreviousButton from "../carousel/SlidePreviousButton";

function Carousel() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await apiPublic.get(
          "/api/carousels?populate=*&filters[isActive][$eq]=true&sort=order:asc"
        );
        setSlides(response.data.data);
      } catch (error) {
        console.error("Error fetching slides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto aspect-video w-full max-w-[94.8vw] animate-pulse rounded-2xl bg-linear-to-br from-[#223620] to-[#1b251b] md:aspect-24/9">
        <div className="flex h-full flex-col items-center justify-center space-y-4">
          <div className="h-6 w-40 rounded bg-lime-800 md:h-10 md:w-96" />
          <div className="h-4 w-60 rounded bg-lime-800 md:h-6 md:w-125" />
          <div className="h-8 w-28 rounded bg-lime-800 md:h-10 md:w-40" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={300}
        className="group relative"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img
              src={getStrapiUrl(slide.attributes.image.data.attributes.url)}
              style={{
                objectPosition: slide.attributes.image_position ?? "50% 50%",
              }}
              alt={slide.attributes.title}
              className={cn(
                `z-0 mx-auto aspect-video w-full max-w-[94.8vw] rounded-2xl object-cover brightness-[0.22] md:aspect-24/9`
              )}
            />

            {/* Navigation buttons */}

            <SlidePreviousButton className="absolute top-1/2 left-4 z-20 hidden -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex lg:left-16" />

            <SlideNextButton className="absolute top-1/2 right-4 z-20 hidden -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex lg:right-16" />

            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="max-w-62.5 space-y-4 text-white md:max-w-2xl 2xl:max-w-4xl">
                {/* TÍTULO */}
                <h1 className="text-base leading-tight font-semibold md:text-2xl xl:text-6xl">
                  {slide.attributes.title}
                </h1>

                {/* DESCRIÇÃO */}
                <p className="text-sm text-slate-200 sm:text-lg">
                  {slide.attributes.description?.[0]?.children?.[0]?.text}
                </p>

                {/* BOTÃO */}
                {slide.attributes.button_link && (
                  <a
                    href={slide.attributes.button_link}
                    target="_blank"
                    className="btn btn-sm md:btn-md md:btn-wide"
                  >
                    {slide.attributes.button_text}
                  </a>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
