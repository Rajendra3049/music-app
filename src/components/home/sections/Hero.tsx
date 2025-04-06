'use client';

import { Scene3D } from '@/components/three/Scene3D';
import { OWNER_NAME } from '@/constants/owner-info';
import {
  bounceScale,
  floatVariants,
  glowVariants,
  slideInLeft,
  slideInRight,
  staggerChildren,
} from '@/lib/animations';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mic2, Music2, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

interface HeroProps {
  onListenNow: () => void;
  onBookEvent: () => void;
}

export function Hero({ onListenNow, onBookEvent }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Enhanced musical scroll effects
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.95, 0.85]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.98, 0.95]);
  
  // Enhanced artist image animations
  const artistImageX = useTransform(scrollYProgress, [0, 0.5], ['0%', '12%']);
  const artistImageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const artistImageRotate = useTransform(scrollYProgress, [0, 1], ['0deg', '8deg']);
  const artistImageBlur = useTransform(scrollYProgress, [0, 1], [0, 4]);
  
  // Musical note animations
  const noteRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const noteScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  const noteOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 0.6, 0]);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ opacity, scale }}
    >
      {/* Enhanced 3D Scene Layer with Dynamic Gradient */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"
          style={{
            background: useTransform(
              scrollYProgress,
              [0, 1],
              [
                'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 50%, rgba(0,0,0,0.6) 100%)',
                'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)'
              ]
            )
          }}
        />
      </div>

      {/* Enhanced Artist Image Layer with Musical Elements */}
      <motion.div
        className="absolute right-0 top-0 z-10 h-full w-[45%]"
        style={{
          x: artistImageX,
          scale: artistImageScale,
          rotate: artistImageRotate,
          filter: `blur(${artistImageBlur}px)`,
        }}
      >
        <motion.div className="relative h-full w-full">
          <Image
            src="/images/artist.png"
            alt={OWNER_NAME}
            fill
            priority
            className="translate-y-[5%] scale-90 object-contain object-right-top opacity-90 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
          {/* Floating Musical Notes */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 10}%`,
                rotate: noteRotation,
                scale: noteScale,
                opacity: noteOpacity,
              }}
            >
              <div className={`h-3 w-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50`} />
            </motion.div>
          ))}
          {/* Enhanced Gradient Overlays with Scroll Interaction */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"
            style={{
              opacity: useTransform(scrollYProgress, [0, 1], [1, 0.7])
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
            style={{
              opacity: useTransform(scrollYProgress, [0, 1], [1, 0.8])
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_50%,_black)]"
            style={{
              opacity: useTransform(scrollYProgress, [0, 1], [0.8, 1])
            }}
          />
        </motion.div>
      </motion.div>

      {/* Enhanced Content Layer with Scroll Effects */}
      <motion.div
        className="absolute inset-0 z-20 flex items-center"
        variants={staggerChildren}
        initial="visible"
        animate="visible"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ['0%', '25%']),
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="flex max-w-2xl flex-col items-start">
            {/* Enhanced Artist Name with Scroll Effects */}
            <motion.div 
              className="relative mb-6" 
              variants={slideInLeft}
              style={{
                x: useTransform(scrollYProgress, [0, 1], ['0%', '-10%']),
                scale: useTransform(scrollYProgress, [0, 1], [1, 0.9]),
              }}
            >
              <motion.div 
                className="relative mb-2 inline-block"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="absolute -left-8 -top-1 h-6 w-6 text-purple-400" />
                <motion.span
                  className="block text-sm font-medium uppercase tracking-widest text-purple-400 md:text-base"
                  variants={glowVariants}
                >
                  Welcome to the Universe of
                </motion.span>
              </motion.div>
              <motion.div className="relative">
                <motion.h1
                  className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-400 bg-clip-text text-6xl font-black leading-[0.9] text-transparent sm:text-7xl md:text-8xl xl:text-9xl"
                  variants={bounceScale}
                >
                  {OWNER_NAME}
                </motion.h1>
                {/* Enhanced Decorative Line */}
                <motion.div
                  className="absolute -bottom-4 left-0 h-1 w-3/4 rounded-full bg-gradient-to-r from-purple-600 to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.div>
            </motion.div>

            {/* Enhanced Tagline with Scroll Effects */}
            <motion.p
              className="relative mb-8 max-w-xl text-xl text-gray-300 [text-shadow:_0_2px_12px_rgb(0_0_0)] md:text-2xl"
              variants={slideInRight}
              style={{
                x: useTransform(scrollYProgress, [0, 1], ['0%', '10%']),
                opacity: useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]),
              }}
            >
              <motion.span 
                className="inline-block rounded-lg bg-gradient-to-r from-purple-900/40 to-transparent px-4 py-2 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
              >
                Experience the Magic of Music, Immerse yourself in a world of
                rhythm and melody. Let the music take you on a journey through
                sound and emotion.
              </motion.span>
            </motion.p>

            {/* Enhanced CTA Buttons with Scroll Effects */}
            <motion.div
              className="flex flex-wrap gap-6"
              variants={floatVariants}
              style={{
                scale: useTransform(scrollYProgress, [0, 1], [1, 0.95]),
                y: useTransform(scrollYProgress, [0, 1], ['0%', '20%']),
              }}
            >
              <motion.button
                onClick={onListenNow}
                className="group relative z-10 flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-bold shadow-lg shadow-purple-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Music2 className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180" />
                Listen Now
                <motion.span
                  className="absolute inset-0 -z-10 rounded-full bg-white/20 blur-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                onClick={onBookEvent}
                className="group relative z-10 flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 px-8 py-4 text-lg font-bold backdrop-blur-sm transition-all duration-300 hover:from-purple-600 hover:to-pink-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative flex items-center">
                  <Mic2 className="h-5 w-5 transition-transform duration-700 group-hover:rotate-[360deg]" />
                  {/* Animated music notes */}
                  <div className="absolute -right-1 top-0">
                    <motion.div
                      className="relative h-2 w-2"
                      animate={{
                        rotate: [0, 360],
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="absolute h-1.5 w-1.5 rounded-full bg-purple-400" />
                    </motion.div>
                  </div>
                  <div className="absolute -left-1 -top-1">
                    <motion.div
                      className="relative h-2 w-2"
                      animate={{
                        rotate: [0, -360],
                        scale: [1, 1.5, 1],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 0.5,
                      }}
                    >
                      <div className="absolute h-1.5 w-1.5 rounded-full bg-pink-400" />
                    </motion.div>
                  </div>
                </div>
                Book Event
                {/* Animated music waves */}
                <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-center opacity-50 group-hover:opacity-100">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-8 w-8 rounded-full border border-purple-500/30"
                      animate={{
                        scale: [1, 2],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
                {/* Gradient border */}
                <motion.div
                  className="absolute inset-0 -z-20 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1 }}
                />
                {/* Enhanced hover glow effect */}
                <motion.div
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Animated Accent Lines with Musical Pulse */}
      <motion.div
        className="absolute bottom-0 left-0 z-30 h-32 w-full"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 0.95]),
        }}
      >
        <motion.div 
          className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scaleX: [0.95, 1, 0.95] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          style={{
            filter: useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(2px)']),
          }}
        />
        <motion.div 
          className="absolute bottom-6 left-0 h-px w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent"
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            scaleX: [0.9, 1, 0.9] 
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
          style={{
            filter: useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(2px)']),
          }}
        />
        <motion.div 
          className="absolute bottom-12 left-0 h-px w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scaleX: [0.85, 1, 0.85] 
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4
          }}
          style={{
            filter: useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(2px)']),
          }}
        />
        
        {/* Enhanced Wave Effect with Scroll Interaction */}
        <motion.div
          className="absolute bottom-0 left-0 h-full w-full"
          style={{
            opacity: useTransform(scrollYProgress, [0, 1], [1, 0.6]),
            y: useTransform(scrollYProgress, [0, 1], [0, 10]),
          }}
        >
          <motion.div 
            className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-purple-900/20 via-purple-900/10 to-transparent backdrop-blur-sm"
            style={{
              backdropFilter: useTransform(scrollYProgress, [0, 1], ['blur(4px)', 'blur(8px)']),
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
