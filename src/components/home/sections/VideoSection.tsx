'use client';

import { VideoCarousel } from '@/components/video/VideoCarousel';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import { Video, videos } from '@/db/videos';
import { glowVariants, pulseVariants, staggerChildren } from '@/lib/animations';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

export function VideoSection() {
  const [currentVideo, setCurrentVideo] = useState<Video>(videos[0]);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const videoPlayerRef = useRef<HTMLDivElement>(null);

  const handleVideoSelect = (video: Video) => {
    setCurrentVideo(video);
    setShouldAutoPlay(true);
    // Scroll to video player for better UX
    videoPlayerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleVideoEnd = () => {
    // Play next video when current one ends
    const currentIndex = videos.findIndex(v => v.id === currentVideo.id);
    const nextVideo = videos[(currentIndex + 1) % videos.length];
    setCurrentVideo(nextVideo);
    setShouldAutoPlay(true);
  };

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
        <motion.h2 
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-12"
          variants={pulseVariants}
        >
          Latest Videos
        </motion.h2>

        <div className="space-y-8">
          {/* Main Video Player */}
          <div 
            ref={videoPlayerRef}
            className="aspect-video w-full max-w-5xl mx-auto"
          >
            <VideoPlayer
              key={currentVideo.id} // Force remount on video change
              src={currentVideo.videoUrl}
              poster={currentVideo.thumbnailUrl}
              onEnded={handleVideoEnd}
              autoPlay={shouldAutoPlay}
            />
          </div>

          {/* Video Info */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
              {currentVideo.title}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {currentVideo.description}
            </p>
          </div>

          {/* Video Carousel */}
          <div className="mt-8">
            <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              More Videos
            </h4>
            <VideoCarousel
              videos={videos}
              currentVideoId={currentVideo.id}
              onVideoSelect={handleVideoSelect}
            />
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