import { motion } from 'framer-motion';
import { AudioWaveformProps } from './types';

export function AudioWaveform({ isPlaying, barCount = 40 }: AudioWaveformProps) {
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-around pointer-events-none"
      variants={{
        playing: {
          transition: {
            staggerChildren: 0.05
          }
        }
      }}
      initial="idle"
      animate={isPlaying ? "playing" : "idle"}
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 h-12 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full"
          variants={{
            playing: {
              height: [12, 48, 12],
              opacity: [0.3, 1, 0.3],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            },
            idle: {
              height: 24,
              opacity: 0.5,
              transition: {
                duration: 0.3
              }
            }
          }}
        />
      ))}
    </motion.div>
  );
} 