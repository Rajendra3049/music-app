'use client';

import { motion } from 'framer-motion';

export function NowPlayingEqualizer() {
  return (
    <div className="flex items-center gap-[2px] h-3">
      {[1, 2, 3].map((bar) => (
        <motion.span
          key={bar}
          className="w-[2px] bg-primary-500"
          initial={{ height: '30%' }}
          animate={{
            height: ['30%', '100%', '30%'],
            transition: {
              duration: 1,
              repeat: Infinity,
              delay: bar * 0.2,
              ease: 'easeInOut',
            },
          }}
        />
      ))}
    </div>
  );
} 