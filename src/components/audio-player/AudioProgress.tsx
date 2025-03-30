import { useCallback, useRef } from 'react';
import { AudioProgressProps } from './types';

export function AudioProgress({
  currentTime,
  duration,
  onSeek,
  isDragging,
  onDragStart,
  onDragEnd
}: AudioProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    onDragStart();
    handleSeek(e);
  }, [onDragStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleSeek(e);
    }
  }, [isDragging]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const newTime = Math.min(Math.max(percentage * duration, 0), duration);
    
    onSeek(newTime);
  }, [duration, onSeek]);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      ref={progressRef}
      className="w-full group relative h-1.5 bg-gray-700/50 rounded-full cursor-pointer"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
    >
      <div 
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none"
        style={{ 
          width: `${progressPercentage}%`,
          transition: isDragging ? 'none' : 'width 0.1s linear'
        }}
      />
      <div 
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ 
          left: `${progressPercentage}%`
        }}
      />
    </div>
  );
} 