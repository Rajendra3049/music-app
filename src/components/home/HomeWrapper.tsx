'use client';

import { ContentItem, MediaItem } from '@/types';
import { motion } from 'framer-motion';
import { Hero } from './sections/Hero';
import { LatestReleases } from './sections/LatestReleases';
import { Media } from './sections/Media';
import { TopTrack } from './sections/TopTrack';

interface Props {
  featuredContent: ContentItem[];
  featuredMedia: MediaItem[];
}

export function HomeWrapper({ featuredContent, featuredMedia }: Props) {
  return (
    <motion.div className="relative min-h-screen">
      <Hero />
      <TopTrack />
      <LatestReleases featuredContent={featuredContent} />
      <Media featuredMedia={featuredMedia} />
    </motion.div>
  );
} 