"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Episode = {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  external_urls: { spotify: string };
};

export default function PodcastPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch Spotify Episodes (ganti showId sesuai podcast-mu)
  useEffect(() => {
    const fetchEpisodes = async () => {
      const res = await fetch(`/api/spotify?showId=4ne6bsylYJdVmMrfG3mLCG`);
      const data = await res.json();
      setEpisodes(data.episodes || []);
    };
    fetchEpisodes();
  }, []);

  const nextEpisode = () => {
    setCurrentIndex((prev) => (prev + 1) % episodes.length);
  };

  const prevEpisode = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? episodes.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center py-12 px-4">
      {/* Judul */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        🎙️ Podcast Inspiratif
      </motion.h1>

      {/* Deskripsi */}
      <motion.p
        className="text-gray-300 text-lg md:text-xl max-w-2xl text-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        Dengarkan cerita, wawasan, dan diskusi menarik langsung dari Spotify.  
        Geser untuk menikmati episode berikutnya!
      </motion.p>

      {/* Carousel Podcast */}
      <div className="relative w-full max-w-3xl flex items-center justify-center">
        <AnimatePresence mode="wait">
          {episodes.length > 0 && (
            <motion.div
              key={episodes[currentIndex].id}
              className="bg-gray-800/70 p-6 rounded-2xl shadow-xl w-full relative"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <iframe
                src={`https://open.spotify.com/embed/episode/${episodes[currentIndex].id}?utm_source=generator`}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              ></iframe>

              <p className="mt-4 text-center text-sm text-gray-400">
                {episodes[currentIndex].name}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tombol Prev */}
        <button
          onClick={prevEpisode}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 p-3 rounded-full shadow-md"
        >
          ⬅
        </button>

        {/* Tombol Next */}
        <button
          onClick={nextEpisode}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 p-3 rounded-full shadow-md"
        >
          ➡
        </button>
      </div>
    </div>
  );
}
