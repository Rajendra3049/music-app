'use client';

import { OWNER_NAME, OWNER_YOUTUBE_VIDEO } from '@/constants/owner-info';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function VideoSection() {
  const [videoUrl, setVideoUrl] = useState(`https://www.youtube.com/embed/${OWNER_YOUTUBE_VIDEO}?rel=1&modestbranding=1&playsinline=1&showinfo=0`);

  useEffect(() => {
    // Update video URL with origin and referrer only on client side
    setVideoUrl(`https://www.youtube.com/embed/${OWNER_YOUTUBE_VIDEO}?rel=1&modestbranding=1&playsinline=1&showinfo=0&enablejsapi=1&origin=${window.location.origin}&widget_referrer=${window.location.href}`);
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
      className="px-4 py-12 sm:px-6"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={fadeInUp}
          className="aspect-video overflow-hidden rounded-xl"
        >
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
