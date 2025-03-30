'use client';

import { bounceScale, slideInLeft, slideInRight, staggerChildren } from '@/lib/animations';
import { ContentItem } from '@/types';
import { motion } from 'framer-motion';

interface Props {
  featuredContent: ContentItem[];
}

export function LatestReleases({ featuredContent }: Props) {
  return (
    <motion.section 
      className="py-20 px-6"
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2 
        className="text-4xl font-bold text-center mb-12"
        variants={bounceScale}
      >
        Latest Releases
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {featuredContent.map((content, index) => (
          <motion.div
            key={content.id}
            className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-colors"
            variants={index % 2 === 0 ? slideInLeft : slideInRight}
            whileHover="hover"
          >
            <h3 className="text-2xl font-bold mb-4">{content.title}</h3>
            {content.description && (
              <p className="text-gray-300">{content.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
} 