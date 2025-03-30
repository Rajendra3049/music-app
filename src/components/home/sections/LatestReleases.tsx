'use client';

import { GridCard } from '@/components/music-cards/GridCard';
import { useCarouselGestures } from '@/hooks/useCarouselGestures';
import { carouselVariants, glowVariants, pulseVariants, staggerChildren } from '@/lib/animations';
import { LatestRelease } from '@/types';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  latestReleases: LatestRelease[];
}

export function LatestReleases({ latestReleases }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [direction, setDirection] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const totalPages = Math.ceil(latestReleases.length / itemsPerPage);

  
  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // Tablet
      } else {
        setItemsPerPage(3); // Desktop
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev > 0 ? prev - itemsPerPage : latestReleases.length - itemsPerPage));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + itemsPerPage >= latestReleases.length ? 0 : prev + itemsPerPage));
  };

  const { containerRef, isDragging } = useCarouselGestures({
    onNext: handleNext,
    onPrevious: handlePrevious,
    isEnabled: latestReleases.length > itemsPerPage,
  });

  const currentPage = Math.floor(currentIndex / itemsPerPage) + 1;

  return (
    <motion.section 
      className="relative py-20 px-6 overflow-visible"
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ isolation: 'isolate' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <motion.h2 
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
            variants={pulseVariants}
          >
            Latest Releases
          </motion.h2>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-400">
              {currentPage} / {totalPages}
            </span>
            <div className="flex items-center space-x-2">
              <motion.button
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevious}
                disabled={latestReleases.length <= itemsPerPage}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                disabled={latestReleases.length <= itemsPerPage}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          className={`relative touch-pan-y ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          <AnimatePresence
            mode="wait"
            initial={false}
            custom={direction}
          >
            <motion.div
              key={currentIndex}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              custom={direction}
              variants={carouselVariants}
              initial={shouldReduceMotion ? "center" : "enter"}
              animate="center"
              exit="exit"
              drag={latestReleases.length > itemsPerPage ? "x" : false}
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
              style={{ 
                isolation: 'isolate',
                perspective: '1000px'
              }}
            >
              {latestReleases
                .slice(currentIndex, currentIndex + itemsPerPage)
                .map((release, index) => (
                  <GridCard
                    key={release.id}
                    track={release}
                    isActive={index === 0}
                    className="relative"
                  />
                ))}
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentPage === index + 1
                    ? 'bg-purple-500'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                onClick={() => {
                  setDirection(index > (currentPage - 1) ? 1 : -1);
                  setCurrentIndex(index * itemsPerPage);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={glowVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 blur-3xl" />
      </motion.div>
    </motion.section>
  );
} 