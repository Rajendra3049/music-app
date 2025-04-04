'use client';

import { Scene3D } from '@/components/three/Scene3D';
import { OWNER_NAME } from '@/constants/owner-info';
import {
    bounceScale,
    floatVariants,
    glowVariants,
    slideInLeft,
    slideInRight,
    staggerChildren
} from '@/lib/animations';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.9]);
  const artistImageX = useTransform(scrollYProgress, [0, 0.5], ["0%", "5%"]);
  const artistImageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <motion.div 
      ref={containerRef}
      className="relative h-screen overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>
      
      {/* Artist Image Layer */}
      <motion.div 
        className="absolute top-0 right-0 w-[45%] h-full z-10"
        style={{ 
          x: artistImageX,
          scale: artistImageScale
        }}
      >
        <div className="relative h-full w-full">
          <Image
            src="/images/artist.png"
            alt={OWNER_NAME}
            fill
            priority
            className="object-contain object-right-top opacity-90 scale-90 translate-y-[5%]"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Content Layer */}
      <motion.div 
        className="absolute inset-0 flex items-center z-20"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl w-full px-6 mx-auto">
          <div className="flex flex-col items-start max-w-2xl">
            {/* Artist Name with Enhanced Styling */}
            <motion.div 
              className="mb-6 relative"
              variants={slideInLeft}
            >
              <motion.span 
                className="text-sm md:text-base uppercase tracking-widest text-purple-400 font-medium mb-2 block"
                variants={glowVariants}
              >
                Welcome to the Universe of
              </motion.span>
              <motion.div className="relative">
                <motion.h1 
                  className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-black leading-[0.9] bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-400"
                  variants={bounceScale}
                >
                  {OWNER_NAME}
                </motion.h1>
                {/* Decorative Line */}
                <motion.div 
                  className="absolute -bottom-4 left-0 w-3/4 h-1 bg-gradient-to-r from-purple-600 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.div>
            </motion.div>

            {/* Tagline with Enhanced Visibility */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-xl mb-8 [text-shadow:_0_2px_12px_rgb(0_0_0)] relative"
              variants={slideInRight}
            >
              <span className="bg-gradient-to-r from-purple-900/40 to-transparent px-4 py-2 rounded-lg inline-block">
                Experience the fusion of hip-hop and electronic beats, where innovation meets rhythm.
              </span>
            </motion.p>

            {/* CTA Buttons with Enhanced Styling */}
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={floatVariants}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-purple-500/25 relative z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Listen Now
              </motion.button>
              <motion.button
                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full text-lg font-bold hover:bg-white/20 transition-colors border border-white/20 relative z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Event
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Animated Accent Lines */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-32 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        <div className="absolute bottom-6 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50" />
        <div className="absolute bottom-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-25" />
        {/* Additional wave effect */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-purple-900/20 to-transparent" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 