'use client';

import { PlayButton } from '@/components/audio-player/PlayButton';
import { LatestRelease } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';

export interface BaseMusicCardProps {
  track: LatestRelease;
  className?: string;
  imageSize?: 'sm' | 'md' | 'lg';
  showDescription?: boolean;
  showPlayButton?: boolean;
  playButtonSize?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
  variant?: 'default' | 'minimal' | 'featured';
}

export function BaseCard({
  track,
  className = '',
  imageSize = 'md',
  showDescription = false,
  showPlayButton = true,
  playButtonSize = 'md',
  isActive = false,
  variant = 'default'
}: BaseMusicCardProps) {
  // Get image size classes
  const getImageSize = () => {
    switch (imageSize) {
      case 'sm':
        return 'w-16 h-16';
      case 'lg':
        return 'w-40 h-40 md:w-48 md:h-48';
      default:
        return 'w-24 h-24 md:w-32 md:h-32';
    }
  };

  // Get container classes based on variant
  const getContainerClasses = () => {
    const baseClasses = 'relative overflow-hidden rounded-xl backdrop-blur-lg transition-all duration-300';
    
    switch (variant) {
      case 'minimal':
        return `${baseClasses} bg-black/20 hover:bg-black/30 border border-white/5`;
      case 'featured':
        return `${baseClasses} bg-gradient-to-br from-gray-900/95 via-gray-900 to-gray-900/95 border border-white/10`;
      default:
        return `${baseClasses} bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90 border ${
          isActive ? 'border-purple-500/50' : 'border-white/10'
        }`;
    }
  };

  return (
    <motion.div
      className={`${getContainerClasses()} ${className}`}
      whileHover={{ scale: variant === 'minimal' ? 1 : 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      <div className="flex gap-4 p-4">
        {/* Cover Art */}
        <div className={`relative ${getImageSize()} flex-shrink-0`}>
          <Image
            src={track.coverImage}
            alt={track.title}
            fill
            className="object-cover rounded-lg"
          />
          {showPlayButton && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <PlayButton track={track} size={playButtonSize} variant="icon" />
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-white truncate">
              {track.title}
            </h3>
            {showPlayButton && (
              <PlayButton track={track} size="sm" variant="minimal" />
            )}
          </div>
          <p className="text-sm text-gray-400 truncate">{track.artist}</p>
          
          {/* Optional Description */}
          {showDescription && track.description && (
            <p className="mt-2 text-sm text-gray-400 line-clamp-2">
              {track.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
} 