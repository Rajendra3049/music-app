'use client';

import { MediaItem } from '@/types';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Hero } from './sections/Hero';
import { LatestReleases } from './sections/LatestReleases';
import { TopTrack } from './sections/TopTrack';
import { VideoSection } from './sections/VideoSection';

interface Props {
  featuredMedia: MediaItem[];
}

export function HomeWrapper({ featuredMedia }: Props) {
  const router = useRouter();
  const latestReleasesRef = useRef<HTMLDivElement>(null);

  const scrollToLatestReleases = () => {
    latestReleasesRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleBookEvent = () => {
    router.push('/contact');
  };

  return (
    <motion.div className="relative min-h-screen">
      <Hero onListenNow={scrollToLatestReleases} onBookEvent={handleBookEvent} />
      <TopTrack />
      <div ref={latestReleasesRef}>
        <LatestReleases latestReleases={featuredMedia} />
      </div>
      <VideoSection />
    </motion.div>
  );
} 