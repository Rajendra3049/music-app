'use client';

import { OWNER_NAME, OWNER_YOUTUBE_VIDEO } from '@/constants/owner-info';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function VideoSection() {
  const [videoUrl, setVideoUrl] = useState(
    `https://www.youtube.com/embed/${OWNER_YOUTUBE_VIDEO}?rel=0&modestbranding=1&playsinline=1&showinfo=0&controls=1&color=white&loop=1`
  );

  useEffect(() => {
    // Update video URL with enhanced parameters to prevent suggested videos and maintain brand consistency
    setVideoUrl(
      `https://www.youtube.com/embed/${OWNER_YOUTUBE_VIDEO}?` +
      new URLSearchParams({
        rel: '0',                    // Disable related videos
        modestbranding: '1',         // Reduce YouTube branding
        playsinline: '1',            // Play inline on mobile
        showinfo: '0',               // Hide video title and uploader info
        controls: '1',               // Show video controls
        color: 'white',              // Use white progress bar
        loop: '1',                   // Enable video looping
        enablejsapi: '1',            // Enable JavaScript API
        origin: window.location.origin,
        widget_referrer: window.location.href,
        playlist: OWNER_YOUTUBE_VIDEO // Required for looping single video
      }).toString()
    );
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.section
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="relative px-4 py-12 sm:px-6"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={fadeInUp}
          className="relative aspect-video overflow-hidden rounded-xl bg-black/5 shadow-xl ring-1 ring-white/10"
        >
          {/* Video Overlay (prevents unwanted clicks/suggestions) */}
          <div className="absolute inset-0 z-10 pointer-events-none rounded-xl ring-1 ring-white/20 shadow-inner" />
          
          <iframe
            className="h-full w-full"
            src={videoUrl}
            title={`${OWNER_NAME} Performance`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
