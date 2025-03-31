'use client';

import { ContentItem, MediaItem } from '@/types';
import { motion } from 'framer-motion';
import { Hero } from './sections/Hero';
import { LatestReleases } from './sections/LatestReleases';
import { TopTrack } from './sections/TopTrack';
import { VideoSection } from './sections/VideoSection';

interface Props {
  featuredContent?: ContentItem[];
  featuredMedia: MediaItem[];
}

export function HomeWrapper({ featuredMedia }: Props) {
  return (
    <motion.div className="relative min-h-screen">
      <Hero />
      <TopTrack />
      <LatestReleases latestReleases={featuredMedia} />
      <VideoSection />
    </motion.div>
  );
} 