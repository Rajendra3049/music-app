'use client';

import { AudioPlayer } from '@/components/audio-player';
import { OWNER_NAME } from '@/constants/owner-info';
import { bounceScale, slideInRight, staggerChildren } from '@/lib/animations';
import { motion } from 'framer-motion';

export function TopTrack() {
  return (
    <motion.section 
      className="relative py-16 bg-gradient-to-r from-black via-purple-900/20 to-black"
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400"
          variants={bounceScale}
        >
          Top Track
        </motion.h2>
        
        <motion.div variants={slideInRight}>
          <AudioPlayer
            src="/music/shiva-shiva-shankara.webm"
            title="Shiva Shiva Shankara"
            artist={OWNER_NAME}
            coverImage="/images/shiva-shiva-shankara-cover.jpg"
            onError={(error) => console.error('Audio error:', error)}
          />
        </motion.div>
      </div>
    </motion.section>
  );
} 