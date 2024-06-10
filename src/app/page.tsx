"use client";
import Hero from "@/components/component/hero";
import { createClient, ErrorResponse, Photos } from "pexels";
import { useEffect, useState } from "react";
import { Gallery } from "react-grid-gallery";

export default function Home() {
  const pexelsClient = createClient(process.env.NEXT_PUBLIC_PIXEL_API_KEY!);
  const [photos, setPhotos] = useState<Photos["photos"]>([]);

  useEffect(() => {
    pexelsClient.photos
      .curated({ per_page: 100 })
      .then((response) => {
        if ("photos" in response) {
          setPhotos(response.photos);
          console.log(response.photos);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="flex flex-col">
      <Hero />
      <section className="mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50">
          Curated Photos
        </h2>
        <div className="">
          <Gallery
            enableImageSelection={false}
            rowHeight={500}
            margin={8}
            images={photos.map((photo) => ({
              src: photo.src.large,
              thumbnail: photo.src.medium,
              thumbnailWidth: photo.width,
              thumbnailHeight: photo.height,
              caption: photo.photographer,
              height: photo.height,
              width: photo.width,
            }))}
          />
        </div>
      </section>
    </div>
  );
}
