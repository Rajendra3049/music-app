import { motion } from 'framer-motion';
import { useCallback, useRef } from 'react';
import { AudioWaveformProps } from './types';

export function AudioWaveform({ 
  isPlaying, 
  barCount = 40,
  currentTime,
  duration,
  onSeek,
  isDragging,
  onDragStart,
  onDragEnd 
}: AudioWaveformProps) {
  const waveformRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSeek || !onDragStart) return;
    onDragStart();
    handleSeek(e);
  }, [onDragStart, onSeek]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !onSeek) return;
    handleSeek(e);
  }, [isDragging, onSeek]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!waveformRef.current || !onSeek) return;

    const rect = waveformRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const newTime = Math.min(Math.max(percentage * duration, 0), duration);
    
    onSeek(newTime);
  }, [duration, onSeek]);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div 
      ref={waveformRef}
      className="absolute inset-0 flex items-center justify-around"
      variants={{
        playing: {
          transition: {
            staggerChildren: 0.05
          }
        }
      }}
      initial="idle"
      animate={isPlaying ? "playing" : "idle"}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
    >
      {/* Progress Overlay */}
      <div 
        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 pointer-events-none"
        style={{ 
          width: `${progressPercentage}%`,
          transition: isDragging ? 'none' : 'width 0.1s linear'
        }}
      />

      {/* Waveform Bars */}
      {Array.from({ length: barCount }).map((_, i) => {
        const barProgress = (i / barCount) * 100;
        const isActive = barProgress <= progressPercentage;
        
        return (
          <motion.div
            key={i}
            className={`w-1.5 bg-gradient-to-t rounded-full ${
              isActive ? 'from-purple-500 to-pink-500' : 'from-gray-500/50 to-gray-400/50'
            }`}
            variants={{
              playing: {
                height: isActive ? [24, 48, 24] : [12, 24, 12],
                opacity: isActive ? [0.8, 1, 0.8] : [0.3, 0.5, 0.3],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              },
              idle: {
                height: isActive ? 36 : 24,
                opacity: isActive ? 0.8 : 0.3,
                transition: {
                  duration: 0.3
                }
              }
            }}
          />
        );
      })}

      {/* Seek Handle */}
      {onSeek && (
        <div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ 
            left: `${progressPercentage}%`
          }}
        />
      )}
    </motion.div>
  );
} 