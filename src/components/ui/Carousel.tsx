'use client';

import { useCarouselGestures } from '@/hooks/useCarouselGestures';
import { carouselVariants } from '@/lib/animations';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { CarouselControls } from './CarouselControls';

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

  const handlePageSelect = (page: number) => {
    const newIndex = page * itemsPerPage;
    setDirection(page > currentPage - 1 ? 1 : -1);
    setCurrentIndex(newIndex);
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

        {/* Carousel Controls */}
        <CarouselControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onPageSelect={handlePageSelect}
          showControls={showControls}
          showProgress={showProgress}
          className="mt-8"
        />
      </div>
    </div>
  );
} 