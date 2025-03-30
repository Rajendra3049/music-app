import { motion } from 'framer-motion';
import { AudioControlsProps } from './types';

export function AudioControls({
  isPlaying,
  onPlayPause,
  onReset,
  currentTime,
  duration,
  disabled = false
}: AudioControlsProps) {
  // Format time in mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-4">
      <motion.button
        className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white disabled:opacity-50 shadow-lg shadow-purple-500/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPlayPause}
        disabled={disabled}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          {isPlaying ? (
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          ) : (
            <path d="M8 5v14l11-7z" />
          )}
        </svg>
      </motion.button>

      <motion.button
        className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
        </svg>
      </motion.button>

      <div className="text-sm font-medium text-gray-300">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
} 