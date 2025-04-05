'use client';

import { GridCard } from '@/components/music-cards/GridCard';
import { Carousel } from '@/components/ui/Carousel';
import { glowVariants, pulseVariants, staggerChildren } from '@/lib/animations';
import { LatestRelease } from '@/types';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  latestReleases: LatestRelease[];
}

export function LatestReleases({ latestReleases }: Props) {
  const [itemsPerPage, setItemsPerPage] = useState(2);

  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // Tablet
      } else {
        setItemsPerPage(3); // Desktop
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

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
        <div className="flex items-center justify-between mb-12">
          <motion.h2 
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
            variants={pulseVariants}
          >
            Latest Releases
          </motion.h2>
        </div>

        <Carousel
          itemsPerPage={itemsPerPage}
          className="w-full"
        >
          {latestReleases.map((release) => (
            <div key={release.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3">
              <GridCard
                track={release}
                isActive={true}
                className="relative"
              />
            </div>
          ))}
        </Carousel>
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