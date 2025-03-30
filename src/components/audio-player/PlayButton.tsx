'use client';

import { useAudioPlayer } from '@/context/AudioPlayerContext';
import { LatestRelease } from '@/types';
import { motion } from 'framer-motion';
import { PauseIcon, PlayIcon } from 'lucide-react';

interface PlayButtonProps {
  track: LatestRelease;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'icon' | 'featured';
  className?: string;
}

export function PlayButton({
  track,
  size = 'md',
  variant = 'default',
  className = ''
}: PlayButtonProps) {
  const { isCurrentTrack, playerState, playTrack, togglePlay } = useAudioPlayer();
  const isThisTrackPlaying = isCurrentTrack(track.id) && playerState.isPlaying;

  // Get button size classes
  const getButtonSize = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8';
      case 'lg':
        return 'w-16 h-16';
      default:
        return 'w-12 h-12';
    }
  };

  // Get icon size classes
  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-8 h-8';
      default:
        return 'w-6 h-6';
    }
  };

  // Get variant classes
  const getVariantClasses = () => {
    const baseClasses = `${getButtonSize()} flex items-center justify-center rounded-full transition-all duration-300`;
    
    switch (variant) {
      case 'minimal':
        return `${baseClasses} bg-transparent hover:bg-white/10 text-white`;
      case 'icon':
        return `${baseClasses} bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm`;
      case 'featured':
        return `${baseClasses} bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40`;
      default:
        return `${baseClasses} bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20`;
    }
  };

  // Handle click
  const handleClick = async () => {
    if (isCurrentTrack(track.id)) {
      await togglePlay();
    } else {
      await playTrack(track);
    }
  };

  return (
    <motion.button
      className={`group relative ${getVariantClasses()} ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/50 to-pink-600/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Button Content */}
      <div className="relative z-10">
        {isThisTrackPlaying ? (
          <PauseIcon className={getIconSize()} />
        ) : (
          <PlayIcon className={getIconSize()} />
        )}
      </div>

      {/* Pulse Animation for Playing State */}
      {isThisTrackPlaying && (
        <div className="absolute inset-0 rounded-full">
          <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse" />
        </div>
      )}

      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
} 