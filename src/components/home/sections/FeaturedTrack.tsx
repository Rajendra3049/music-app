'use client';

import { OWNER_NAME } from '@/constants/owner-info';
import { bounceScale, pulseVariants, slideInRight, staggerChildren, waveVariants } from '@/lib/animations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  error: string | null;
}

export function FeaturedTrack() {
  const [playerState, setPlayerState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    error: null
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  // Format time in mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Enhanced toggle play with error handling
  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (playerState.isPlaying) {
          await audioRef.current.pause();
        } else {
          setPlayerState(prev => ({ ...prev, error: null }));
          await audioRef.current.play();
        }
        setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
      } catch (err) {
        setPlayerState(prev => ({
          ...prev,
          error: 'Unable to play audio. Please try again.',
          isPlaying: false
        }));
        console.error('Playback error:', err);
      }
    }
  };

  // Handle seeking
  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && waveformRef.current) {
      const rect = waveformRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * playerState.duration;
      audioRef.current.currentTime = newTime;
      setPlayerState(prev => ({ ...prev, currentTime: newTime }));
    }
  };

  // Enhanced audio event handling
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const handleTimeUpdate = () => {
        setPlayerState(prev => ({ ...prev, currentTime: audio.currentTime }));
      };

      const handleLoadedMetadata = () => {
        setPlayerState(prev => ({
          ...prev,
          duration: audio.duration,
          error: null
        }));
      };

      const handleEnded = () => {
        setPlayerState(prev => ({
          ...prev,
          isPlaying: false,
          currentTime: 0
        }));
      };

      const handleError = () => {
        setPlayerState(prev => ({
          ...prev,
          error: 'Error loading audio file. Please try again.',
          isPlaying: false
        }));
      };

      const handleCanPlayThrough = () => {
        setPlayerState(prev => ({ ...prev, error: null }));
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);
      audio.addEventListener('canplaythrough', handleCanPlayThrough);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      };
    }
  }, []);

  return (
    <motion.section 
      className="relative py-16 bg-gradient-to-r from-black via-purple-900/20 to-black"
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400"
          variants={bounceScale}
        >
          Now Playing
        </motion.h2>
        
        <motion.div 
          className="bg-gradient-to-r from-gray-900 to-black/80 rounded-xl p-6 backdrop-blur-sm border border-white/10"
          variants={slideInRight}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Album Art */}
            <motion.div 
              className="w-40 h-40 relative flex-shrink-0"
              variants={pulseVariants}
              animate={playerState.isPlaying ? "pulse" : "static"}
            >
              <Image
                src="/images/shiva-shiva-shankara-cover.svg"
                alt="Shiva Shiva Shankara"
                width={160}
                height={160}
                className="rounded-lg object-cover"
              />
            </motion.div>

            {/* Track Info and Waveform */}
            <div className="flex-grow">
              <div className="flex flex-col gap-2 mb-4">
                <h3 className="text-2xl font-bold text-white">Shiva Shiva Shankara</h3>
                <p className="text-gray-400">{OWNER_NAME}</p>
              </div>

              {/* Audio Element */}
              <audio
                ref={audioRef}
                src="/music/shiva-shiva-shankara.mp3"
                preload="metadata"
                crossOrigin="anonymous"
              />

              {/* Custom Waveform Visualization */}
              <div 
                ref={waveformRef}
                className="relative h-24 bg-black/30 rounded-lg overflow-hidden cursor-pointer"
                onClick={handleWaveformClick}
              >
                <motion.div 
                  className="absolute inset-0 flex items-center justify-around"
                  variants={waveVariants}
                >
                  {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-12 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full"
                      animate={playerState.isPlaying ? {
                        height: [12, 48, 12],
                        opacity: [0.3, 1, 0.3]
                      } : {
                        height: 24,
                        opacity: 0.5
                      }}
                      transition={playerState.isPlaying ? {
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: "easeInOut"
                      } : {
                        duration: 0.3
                      }}
                    />
                  ))}
                </motion.div>

                {/* Progress Overlay */}
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ 
                    width: `${(playerState.currentTime / playerState.duration) * 100}%`,
                    transition: 'width 0.1s linear'
                  }}
                />
              </div>

              {/* Error Message */}
              {playerState.error && (
                <div className="text-red-500 text-sm mt-2">
                  {playerState.error}
                </div>
              )}

              {/* Player Controls */}
              <div className="flex items-center gap-4 mt-4">
                <motion.button
                  className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white disabled:opacity-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  disabled={!!playerState.error}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    {playerState.isPlaying ? (
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    ) : (
                      <path d="M8 5v14l11-7z" />
                    )}
                  </svg>
                </motion.button>
                <div className="text-sm text-gray-400">
                  {formatTime(playerState.currentTime)} / {formatTime(playerState.duration)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
} 