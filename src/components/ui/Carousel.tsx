'use client';

import { useCarouselGestures } from '@/hooks/useCarouselGestures';
import { carouselVariants } from '@/lib/animations';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface CarouselProps {
  children: ReactNode[];
  itemsPerPage?: number;
  className?: string;
  showControls?: boolean;
  showProgress?: boolean;
  layout?: 'vertical' | 'horizontal';
}

export function Carousel({
  children,
  itemsPerPage = 1,
  className = '',
  showControls = true,
  showProgress = true,
  layout = 'horizontal',
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const totalPages = Math.ceil(children.length / itemsPerPage);
  const currentPage = Math.floor(currentIndex / itemsPerPage) + 1;

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev > 0 ? prev - itemsPerPage : children.length - itemsPerPage));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + itemsPerPage >= children.length ? 0 : prev + itemsPerPage));
  };

  const { containerRef, isDragging } = useCarouselGestures({
    onNext: handleNext,
    onPrevious: handlePrevious,
    isEnabled: children.length > itemsPerPage,
  });

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className={`relative touch-pan-y ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            className={`w-full ${layout === 'horizontal' ? 'flex gap-4 md:gap-6 lg:gap-8' : ''}`}
            custom={direction}
            variants={carouselVariants}
            initial={shouldReduceMotion ? 'center' : 'enter'}
            animate="center"
            exit="exit"
            drag={children.length > itemsPerPage ? 'x' : false}
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
            {children.slice(currentIndex, currentIndex + itemsPerPage)}
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicators */}
        {showProgress && children.length > itemsPerPage && (
          <div className="mt-8 flex justify-center space-x-3">
            {Array.from({ length: totalPages }).map((_, index) => (
              <motion.button
                key={index}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  currentPage === index + 1
                    ? 'w-6 bg-purple-500'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                onClick={() => {
                  setDirection(index > currentPage - 1 ? 1 : -1);
                  setCurrentIndex(index * itemsPerPage);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      {showControls && children.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm font-medium text-gray-400">
            {currentPage} / {totalPages}
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
  );
} 