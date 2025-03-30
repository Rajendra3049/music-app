'use client';

import { glowVariants, pulseVariants, staggerChildren, waveVariants } from '@/lib/animations';
import { MediaItem } from '@/types';
import { motion } from 'framer-motion';

interface Props {
  featuredMedia: MediaItem[];
}

export function Media({ featuredMedia }: Props) {
  return (
    <motion.section 
      className="py-20 px-6 bg-gradient-to-b from-black/0 via-purple-900/20 to-black/0"
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2 
        className="text-4xl font-bold text-center mb-12"
        variants={pulseVariants}
      >
        Featured Tracks
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {featuredMedia.map((media, index) => (
          <motion.div
            key={media.id}
            className="group relative overflow-hidden rounded-2xl"
            variants={waveVariants}
            custom={index}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 opacity-0 group-hover:opacity-100 transition-opacity"
              variants={glowVariants}
            />
            <div className="relative p-6">
              <h3 className="text-2xl font-bold mb-2">{media.title}</h3>
              <p className="text-gray-300">{media.artist}</p>
              <motion.button
                className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
} 