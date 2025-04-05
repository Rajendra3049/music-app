'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onPageSelect?: (page: number) => void;
  showControls?: boolean;
  showProgress?: boolean;
  className?: string;
}

export function CarouselControls({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onPageSelect,
  showControls = true,
  showProgress = true,
  className = '',
}: CarouselControlsProps) {
  return (
    <div className={className}>
      {/* Progress Indicators */}
      {showProgress && totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <motion.button
              key={index}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                currentPage === index + 1
                  ? 'w-6 bg-purple-500'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              onClick={() => onPageSelect?.(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      )}

      {/* Navigation Controls */}
      {showControls && totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm font-medium text-gray-400">
            {currentPage} / {totalPages}
          </span>
          <div className="flex items-center space-x-2">
            <motion.button
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onPrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onNext}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
} 