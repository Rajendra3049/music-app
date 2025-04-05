'use client';

import { FeaturedCard } from '@/components/music-cards/FeaturedCard';
import { media } from '@/db/media';
import { useCarouselGestures } from '@/hooks/useCarouselGestures';
import {
  bounceScale,
  carouselVariants,
  glowVariants,
  staggerChildren,
} from '@/lib/animations';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

// Get top tracks from media database
const topTracks = media
  .filter((item) => item.metadata?.isTopTrack)
  .map((item) => ({
    id: item.id,
    title: item.title,
    artist: item.metadata?.artist || '',
    audioUrl: item.url,
    coverImage: item.thumbnailUrl || '',
    description: item.description,
    genre: item.metadata?.genre,
    releaseDate: item.metadata?.releaseDate,
    isTopTrack: true,
  }));

export function TopTrack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : topTracks.length - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1 >= topTracks.length ? 0 : prev + 1));
  };

  const { containerRef, isDragging } = useCarouselGestures({
    onNext: handleNext,
    onPrevious: handlePrevious,
    isEnabled: topTracks.length > 1,
  });

  return (
    <motion.section
      className="relative overflow-hidden bg-gradient-to-r from-black via-purple-900/20 to-black py-16"
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 flex items-center justify-between">
          <motion.h2
            className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
            variants={bounceScale}
          >
            Top Tracks
          </motion.h2>

          {topTracks.length > 1 && (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-400">
                {currentIndex + 1} / {topTracks.length}
              </span>
              <div className="flex items-center space-x-2">
                <motion.button
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-5 w-5" />
                </motion.button>
                <motion.button
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          )}
        </div>

        <div
          ref={containerRef}
          className={`relative touch-pan-y ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              className="w-full"
              custom={direction}
              variants={carouselVariants}
              initial={shouldReduceMotion ? 'center' : 'enter'}
              animate="center"
              exit="exit"
              drag={topTracks.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -50) {
                  handleNext();
                } else if (swipe > 50) {
                  handlePrevious();
                }
              }}
            >
              <FeaturedCard
                track={topTracks[currentIndex]}
                className="w-full transform transition-transform duration-300 hover:scale-[1.02]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          {topTracks.length > 1 && (
            <div className="mt-8 flex justify-center space-x-3">
              {topTracks.map((_, index) => (
                <motion.button
                  key={index}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'w-6 bg-purple-500'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Background Glow Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        variants={glowVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 blur-3xl" />
      </motion.div>

      {/* Navigation Arrows Overlay */}
      {topTracks.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white/75 opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/50 hover:text-white focus:opacity-100 group-hover:opacity-100"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white/75 opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/50 hover:text-white focus:opacity-100 group-hover:opacity-100"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </motion.section>
  );
}
