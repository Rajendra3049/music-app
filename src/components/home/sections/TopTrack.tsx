'use client';

import { FeaturedCard } from '@/components/music-cards/FeaturedCard';
import { Carousel } from '@/components/ui/Carousel';
import { media } from '@/db/media';
import { bounceScale, glowVariants, staggerChildren } from '@/lib/animations';
import { motion } from 'framer-motion';

// Get top tracks from media database
const topTracks = media
  .filter((item) => item.metadata?.isTopTrack)
  .map((item) => ({
    id: item.id,
    title: item.title,
    artist: item.metadata?.artist || '',
    audioUrl: item.url,
    coverImage: item.thumbnailUrl || '',
    description: item.description,
    genre: item.metadata?.genre,
    releaseDate: item.metadata?.releaseDate,
    isTopTrack: true,
  }));

export function TopTrack() {
  return (
    <motion.section
      className="relative overflow-hidden bg-gradient-to-r from-black via-purple-900/20 to-black py-16"
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 flex items-center justify-between">
          <motion.h2
            className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
            variants={bounceScale}
          >
            Top Tracks
          </motion.h2>
        </div>

        <Carousel itemsPerPage={1}>
          {topTracks.map((track) => (
            <FeaturedCard
              key={track.id}
              track={track}
              className="w-full transform transition-transform duration-300 hover:scale-[1.02]"
            />
          ))}
        </Carousel>
      </div>

      {/* Background Glow Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        variants={glowVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 blur-3xl" />
      </motion.div>
    </motion.section>
  );
}
