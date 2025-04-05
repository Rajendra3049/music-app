'use client';

import { OWNER_NAME } from '@/constants/owner-info';
import { AnimatePresence, motion } from 'framer-motion';
import { Music2, Play } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { CarouselControls } from '../ui/CarouselControls';
import { TooltipWrapper } from '../ui/TooltipWrapper';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration?: string;
}

interface VideoCarouselProps {
  videos: Video[];
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const videosPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(videos.length / videosPerPage);
  
  // Get current page videos
  const currentVideos = videos.slice(
    currentPage * videosPerPage,
    (currentPage + 1) * videosPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative space-y-8">
      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            <div className="relative w-full max-w-5xl aspect-video">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 px-4 py-2 text-white hover:text-purple-400 transition-colors"
              >
                Close
              </motion.button>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {currentVideos.map((video) => (
          <motion.div
            key={video.id}
            variants={itemVariants}
            className="group relative"
            onMouseEnter={() => setHoveredVideo(video.id)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            {/* Card Container */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-xl"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                
                {/* Hover Overlay with Play Button */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: hoveredVideo === video.id ? 1 : 0
                  }}
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedVideo(video.id)}
                    className="relative group"
                  >
                    {/* Pulse Effect */}
                    <div className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping" />
                    <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-purple-500 text-white shadow-lg shadow-purple-500/30">
                      <Play className="w-8 h-8" />
                    </div>
                  </motion.button>
                </motion.div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded-md backdrop-blur-sm">
                  {video.duration || '3:45'}
                </div>

                {/* Sound Wave Animation */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-end justify-center h-full gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: ['20%', '80%', '20%'],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                        className="w-0.5 bg-purple-500/50 rounded-t"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <Music2 className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <TooltipWrapper content={video.title}>
                      <h3 className="font-medium text-white line-clamp-1">
                        {video.title}
                      </h3>
                    </TooltipWrapper>
                    <p className="text-sm text-gray-400">{OWNER_NAME}</p>
                    <TooltipWrapper content={video.description}>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {video.description}
                      </p>
                    </TooltipWrapper>
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                initial={false}
                animate={{
                  opacity: hoveredVideo === video.id ? 1 : 0,
                  scale: hoveredVideo === video.id ? 1 : 0.8,
                }}
                className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl -z-10"
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Carousel Controls */}
      <CarouselControls
        currentPage={currentPage + 1}
        totalPages={totalPages}
        onPrevious={() => handlePageChange(Math.max(0, currentPage - 1))}
        onNext={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
        onPageSelect={handlePageChange}
        showControls={true}
        showProgress={true}
        className="mt-8"
      />
    </div>
  );
}
