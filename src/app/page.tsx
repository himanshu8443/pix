"use client";
import Hero from "../components/component/Hero";
import Thumbnail from "../components/component/Thumbnail";
import { createClient, ErrorResponse, Photos } from "pexels";
import { useEffect, useState } from "react";
import { Gallery } from "react-grid-gallery";
import { MdOutlineBookmarks } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { RiDownloadLine } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import { Kalam } from "next/font/google";

const kalam = Kalam({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  const pexelsClient = createClient(process.env.NEXT_PUBLIC_PIXEL_API_KEY!);
  const [photos, setPhotos] = useState<Photos["photos"]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<
    Photos["photos"][0] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setLoading(true);
    pexelsClient.photos
      .curated({ per_page: 20, page: page })
      .then((response) => {
        if ("photos" in response) {
          const nonDuplicatePhotos = response.photos.filter((photo) => {
            return !photos.some((existingPhoto) => {
              return existingPhoto.id === photo.id;
            });
          });
          setPhotos((prev) => [...prev, ...nonDuplicatePhotos]);
          setLoading(false);
          console.log(response.photos);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page]);
  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <section className="mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-gray-900 dark:text-gray-100 relative pb-4 mb-8">
            <span className="relative z-10">Curved Elegance</span>
            <span className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl">
            Discover the beauty of our curated collection of curved photos, each
            one a masterpiece of form and light.
          </p>
        </div>
        <div className="">
          <Gallery
            enableImageSelection={false}
            rowHeight={550}
            margin={8}
            thumbnailImageComponent={Thumbnail}
            onClick={(index) => setSelectedPhoto(photos[index])}
            images={photos.map((photo) => ({
              src: photo.src.large2x,
              thumbnail: photo.src.large2x,
              metadata: photo,
              height: photo.height,
              width: photo.width,
            }))}
          />
          {loading && (
            <div className="flex items-center justify-center m-10">
              <span className="loader"></span>
            </div>
          )}
        </div>
      </section>
      {selectedPhoto && (
        <AnimatePresence>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="bg-gray-900 p-1 rounded-lg relative"
              onClick={(event) => event.stopPropagation()}
            >
              {/* black to transparent gradient */}
              <div className="absolute w-[99%] h-10 bottom-0 bg-gradient-to-t from-black to-transparent rounded-lg" />
              <div className="absolute w-[99%] h-20 bg-gradient-to-b from-black to-transparent" />
              <div className="flex items-center justify-between relative">
                <h3 className="text-white text-xl font-bold p-2 absolute top-1 left-3">
                  {selectedPhoto.photographer}
                </h3>
                <MdOutlineBookmarks
                  size={30}
                  className="text-white absolute top-3 right-3 cursor-pointer hover:scale-110 active:scale-100 transition-transform"
                />
              </div>
              <motion.img
                layoutId={selectedPhoto.id.toString()}
                src={selectedPhoto.src.large2x}
                alt="Selected"
                className="object-cover w-full h-[600px] mt-1"
              />
              {/* download button */}
              <a
                href={selectedPhoto.src.original}
                download
                target="_blank"
                className="flex text-sm absolute bottom-3 right-3 items-center justify-center mt-4 p-2 bg-slate-700 text-white rounded-full hover:bg-slate-800 transition-colors"
              >
                <RiDownloadLine className="mr-2" />
                Download
              </a>
              <h4
                className={`${kalam.className} text-white text-sm absolute bottom-2 left-2 max-w-[60%]`}
              >
                {selectedPhoto.alt}
              </h4>
            </div>
            <IoCloseOutline
              size={30}
              className="text-white absolute top-5 right-5 cursor-pointer hover:scale-110 active:scale-100 transition-transform"
              onClick={() => setSelectedPhoto(null)}
            />
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
