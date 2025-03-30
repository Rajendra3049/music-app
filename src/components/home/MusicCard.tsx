'use client';

import { TooltipWrapper } from '@/components/ui/TooltipWrapper';
import { cardHoverVariants } from '@/lib/animations';
import { LatestRelease } from '@/types';
import { motion } from 'framer-motion';
import { Heart, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Props {
  release: LatestRelease;
  isActive: boolean;
}

export function MusicCard({ release, isActive }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isActive && isPlaying) {
      setIsPlaying(false);
      audioRef.current?.pause();
    }
  }, [isActive]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setProgress(0);
      if (!isPlaying) {
        handlePlayPause();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const width = bounds.width;
      const percentage = x / width;
      const newTime = percentage * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(percentage * 100);
    }
  };

  return (
    <motion.div
      className="group relative h-[280px] rounded-2xl bg-black/20 backdrop-blur-sm will-change-transform"
      variants={cardHoverVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      layoutId={`card-${release.id}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/30 via-transparent to-pink-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex flex-col h-full p-6 overflow-hidden">
        <div className="flex-1 min-h-0">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 min-w-0 pr-4">
              <TooltipWrapper content={release.title} side="top">
                <h3 className="text-2xl font-bold mb-2 truncate">
                  {release.title}
                </h3>
              </TooltipWrapper>
              <TooltipWrapper content={release.artist} side="bottom">
                <p className="text-gray-300 truncate">
                  {release.artist}
                </p>
              </TooltipWrapper>
            </div>
            <motion.button
              className={`flex-shrink-0 p-2 rounded-full ${
                isFavorite ? 'bg-pink-500/20 text-pink-500' : 'bg-white/10 text-gray-300'
              } hover:bg-pink-500/30 hover:text-pink-500 transition-colors`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
            </motion.button>
          </div>

          {release.description && (
            <div className="relative">
              <p 
                className={`text-gray-400 text-sm ${
                  isDescriptionExpanded ? '' : 'line-clamp-2'
                } transition-all duration-200`}
              >
                {release.description}
              </p>
              {release.description.length > 100 && (
                <button
                  className="text-xs text-purple-400 hover:text-purple-300 mt-1 transition-colors"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                >
                  {isDescriptionExpanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-auto pt-4">
          {/* Audio Progress Bar */}
          <div 
            className="w-full h-1 bg-gray-700 rounded-full mb-4 cursor-pointer"
            onClick={handleProgressClick}
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              style={{ width: `${progress}%` }}
              initial={false}
              transition={{ type: "tween", duration: 0.1 }}
            />
          </div>

          {/* Audio Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </motion.button>

              <motion.button
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleMute}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </motion.button>

              <motion.button
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleReset}
              >
                <RotateCcw className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={release.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </motion.div>
  );
} 