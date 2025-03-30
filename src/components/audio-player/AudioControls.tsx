'use client';

import { motion } from 'framer-motion';
import { PauseIcon, PlayIcon, RotateCcwIcon } from 'lucide-react';

interface AudioControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  currentTime: number;
  duration: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AudioControls({
  isPlaying,
  onPlayPause,
  onReset,
  currentTime,
  duration,
  disabled = false,
  size = 'md',
  className = '',
}: AudioControlsProps) {
  // Format time in mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Get icon size based on size prop
  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 20;
      case 'lg':
        return 28;
      default:
        return 24;
    }
  };

  const iconSize = getIconSize();

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <motion.button
        className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white disabled:opacity-50 shadow-lg shadow-purple-500/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPlayPause}
        disabled={disabled}
      >
        {isPlaying ? (
          <PauseIcon size={iconSize} className="relative left-[1px]" />
        ) : (
          <PlayIcon size={iconSize} className="relative left-[2px]" />
        )}
      </motion.button>

      <button
        className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
        onClick={onReset}
        disabled={disabled || currentTime < 3}
      >
        <RotateCcwIcon size={iconSize - 4} />
      </button>

      <div className="text-sm font-medium text-gray-300">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
} 