import { React } from "react";
import { useSwiper } from "swiper/react";
import { cn } from "@/lib/utils";

import { ChevronRight } from "lucide-react";

export default function SlideNextButton({ className, ...props }) {
  const swiper = useSwiper();

  return (
    <button
      className={cn(
        `z-50 cursor-pointer rounded-full bg-linear-to-l from-[#1A2A19] to-[#131A13] p-2 text-white`,
        className
      )}
      {...props}
      onClick={() => swiper.slideNext()}
    >
      <ChevronRight />
    </button>
  );
}
