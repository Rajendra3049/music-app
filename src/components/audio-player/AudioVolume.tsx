import { motion } from 'framer-motion';
import { AudioVolumeProps } from './types';

export function AudioVolume({
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle
}: AudioVolumeProps) {
  return (
    <div className="flex items-center gap-3 ml-auto bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
      <motion.button
        className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onMuteToggle}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          {isMuted || volume === 0 ? (
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          ) : volume < 0.5 ? (
            <path d="M5 9v6h4l5 5V4L9 9H5zm11.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          ) : (
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          )}
        </svg>
      </motion.button>
      <div className="w-20 group relative">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-full h-1 bg-gray-700/50 rounded-full appearance-none cursor-pointer hover:bg-gray-600/50 transition-all"
          style={{
            backgroundImage: `linear-gradient(to right, #A855F7 0%, #EC4899 ${volume * 100}%, transparent ${volume * 100}%)`,
          }}
        />
        <style jsx>{`
          input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #fff;
            cursor: pointer;
            border: 2px solid #EC4899;
            box-shadow: 0 0 10px rgba(236, 72, 153, 0.3);
            transition: all 0.15s ease;
          }
          input[type='range']::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 0 15px rgba(236, 72, 153, 0.4);
          }
          input[type='range']::-moz-range-thumb {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #fff;
            cursor: pointer;
            border: 2px solid #EC4899;
            box-shadow: 0 0 10px rgba(236, 72, 153, 0.3);
            transition: all 0.15s ease;
          }
          input[type='range']::-moz-range-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 0 15px rgba(236, 72, 153, 0.4);
          }
        `}</style>
      </div>
    </div>
  );
} 