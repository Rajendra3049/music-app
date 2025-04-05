'use client';

import { Video } from '@/db/videos';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { CarouselControls } from '../ui/CarouselControls';
import { TooltipWrapper } from '../ui/TooltipWrapper';
import { NowPlayingEqualizer } from './NowPlayingEqualizer';

interface VideoCarouselProps {
  videos: Video[];
  currentVideoId?: string;
  onVideoSelect: (video: Video) => void;
  isPlaying?: boolean;
}

export function VideoCarousel({ 
  videos, 
  currentVideoId, 
  onVideoSelect,
  isPlaying = false 
}: VideoCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const videosPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(videos.length / videosPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      if (containerRef.current) {
        const scrollAmount = newPage * containerRef.current.clientWidth;
        containerRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    
    // Update current page based on scroll position
    const newPage = Math.round(scrollLeft / clientWidth);
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <div className="relative space-y-6">
      <div className="relative group">
        {/* Navigation Arrows */}
        {showLeftArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => handlePageChange(currentPage - 1)}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </motion.button>
        )}
        {showRightArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => handlePageChange(currentPage + 1)}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </motion.button>
        )}

        {/* Scrollable Container */}
        <div className="overflow-hidden px-3">
          {/* Video List */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth py-6 px-3"
            style={{
              paddingLeft: 'calc(max(16px, env(safe-area-inset-left)))',
              paddingRight: 'calc(max(16px, env(safe-area-inset-right)))',
            }}
          >
            {videos.map((video) => {
              const isSelected = currentVideoId === video.id;
              const isCurrentlyPlaying = isSelected && isPlaying;
              
              return (
                <motion.div
                  key={video.id}
                  initial={{ scale: 1 }}
                  whileHover={{ 
                    scale: isSelected ? 1 : 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative flex-shrink-0 w-[300px] cursor-pointer
                    transform transition-all duration-300
                    ${isSelected ? 'z-20' : 'hover:z-10'}
                  `}
                  onClick={() => onVideoSelect(video)}
                >
                  {/* Selection Indicator */}
                  {isSelected && (
                    <motion.div
                      layoutId="selection-outline"
                      className={`
                        absolute -inset-3 rounded-2xl
                        ${isCurrentlyPlaying 
                          ? 'bg-primary-500/5 shadow-[0_0_30px_-5px] shadow-primary-500/30' 
                          : 'bg-white/5'
                        }
                        ${isCurrentlyPlaying 
                          ? 'border-2 border-primary-500/50 animate-pulse-border' 
                          : 'border border-white/20'
                        }
                      `}
                      initial={false}
                      animate={{
                        scale: isCurrentlyPlaying ? [1, 1.02, 1] : 1,
                      }}
                      transition={{ 
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                        repeat: isCurrentlyPlaying ? Infinity : 0,
                        repeatDelay: 2
                      }}
                    />
                  )}

                  {/* Card Content */}
                  <div className={`
                    relative rounded-xl overflow-hidden
                    transform transition-all duration-300
                    ${isSelected 
                      ? 'bg-gray-800/80 backdrop-blur-sm shadow-xl shadow-black/20' 
                      : 'bg-gray-900/60 hover:bg-gray-800/80 backdrop-blur-sm'
                    }
                  `}>
                    {/* Thumbnail */}
                    <div className="relative aspect-video">
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className={`
                          object-cover transition-all duration-300
                          ${isCurrentlyPlaying ? 'scale-105' : ''}
                        `}
                      />
                      
                      {/* Playing Indicator */}
                      {isCurrentlyPlaying && (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full backdrop-blur-sm z-30">
                          <NowPlayingEqualizer />
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className={`
                        absolute inset-0 flex items-center justify-center
                        bg-gradient-to-t from-black/90 via-black/40 to-transparent
                        transition-opacity duration-300 z-20
                        ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                      `}>
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ 
                            scale: isSelected ? 1 : 0.8,
                            opacity: isSelected ? 1 : 0
                          }}
                          whileHover={{ scale: 1.1 }}
                          className={`
                            p-4 rounded-full backdrop-blur-sm
                            ${isCurrentlyPlaying 
                              ? 'bg-primary-500 shadow-lg shadow-primary-500/30 border border-primary-500/50' 
                              : 'bg-white/20 border border-white/20'
                            }
                          `}
                        >
                          <PlayIcon className={`
                            w-8 h-8 text-white
                            ${isCurrentlyPlaying ? 'animate-pulse' : ''}
                          `} />
                        </motion.div>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded-md backdrop-blur-sm z-30 border border-white/10">
                        {video.duration}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-4">
                      <TooltipWrapper 
                        content={video.title}
                        side="bottom"
                        align="start"
                        delayDuration={300}
                      >
                        <h3 className={`
                          text-base font-medium line-clamp-2
                          ${isCurrentlyPlaying ? 'text-primary-400' : 'text-gray-100'}
                        `}>
                          {video.title}
                        </h3>
                      </TooltipWrapper>
                      
                      <div className="flex items-center gap-2 mt-2">
                        {isCurrentlyPlaying && (
                          <span className="text-xs text-primary-400 font-medium flex items-center gap-1.5 bg-primary-500/10 px-2 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                            Now Playing
                          </span>
                        )}
                        <span className="text-xs text-gray-400">
                          {formatViews(video.views)} views
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <CarouselControls
        currentPage={currentPage + 1}
        totalPages={totalPages}
        onPrevious={() => handlePageChange(currentPage - 1)}
        onNext={() => handlePageChange(currentPage + 1)}
        onPageSelect={(page) => handlePageChange(page)}
        showControls={true}
        showProgress={true}
        className="mt-8"
      />
    </div>
  );
} 