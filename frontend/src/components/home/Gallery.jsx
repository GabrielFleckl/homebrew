import { useEffect, useRef, useState } from "react";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { BlurFade } from "../ui/blur-fade";
import apiPublic from "@/lib/axios/apiPublic";
import { getStrapiUrl } from "@/lib/utils";

const BATCH_SIZE = 12;

function Gallery() {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [images, setImages] = useState([]);
  const loaderRef = useRef(null);

  const galleryImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + BATCH_SIZE);
        }
      },
      { rootMargin: "200px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await apiPublic.get("/api/galerias?populate=*");
        setImages(response.data.data[0].attributes.Fotos.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <section className="py-12 md:py-24">
      <div className="mb-16 text-center text-white">
        <h1 className="mb-4 text-xl font-bold md:text-5xl">
          Momentos que Brindamos
        </h1>
        <p className="text-md mx-auto max-w-4xl px-4 md:px-0 md:text-2xl">
          Cada encontro é uma troca, cada copo uma história. Aqui celebramos a
          cultura cervejeira e a amizade que nos une.
        </p>
      </div>

      <PhotoProvider>
        <div className="mx-auto grid max-w-[95%] grid-cols-4 gap-3 px-8 pb-8 xl:grid-cols-5">
          {galleryImages.map((image, i) => (
            <PhotoView key={i} src={getStrapiUrl(image.attributes.url)}>
              <div className="aspect-square w-full cursor-pointer overflow-hidden rounded-2xl">
                <BlurFade
                  delay={0.1 * i + 0.01}
                  inView
                  className="h-full w-full"
                >
                  <img
                    src={getStrapiUrl(image.attributes.url)}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </BlurFade>
              </div>
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>

      {hasMore && (
        <div
          ref={loaderRef}
          className="flex animate-pulse justify-center py-10 text-white opacity-70"
        >
          Carregando mais fotos...
        </div>
      )}
    </section>
  );
}

export default Gallery;
