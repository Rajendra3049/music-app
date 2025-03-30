'use client';

import { formatTime } from '@/lib/utils';
import { useRef, useState } from 'react';

export interface AudioProgressProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  isDragging?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export function AudioProgress({
  currentTime,
  duration,
  onSeek,
  onDragStart = () => {},
  onDragEnd = () => {}
}: AudioProgressProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isLocalDragging, setIsLocalDragging] = useState(false);

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percent = x / rect.width;
    const newTime = percent * duration;
    
    onSeek(Math.max(0, Math.min(newTime, duration)));
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsLocalDragging(true);
    onDragStart();
    handleSeek(event);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isLocalDragging) {
      handleSeek(event);
    }
  };

  const handleMouseUp = () => {
    if (isLocalDragging) {
      setIsLocalDragging(false);
      onDragEnd();
    }
  };

  const progress = (currentTime / duration) * 100 || 0;

  return (
    <div className="w-full flex items-center gap-2 px-2">
      <span className="text-xs text-gray-400 w-10 text-right">
        {formatTime(currentTime)}
      </span>
      <div
        ref={progressBarRef}
        className="flex-1 h-1 bg-gray-700/50 rounded-full cursor-pointer relative group"
        onClick={handleSeek}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
        />
      </div>
      <span className="text-xs text-gray-400 w-10">
        {formatTime(duration)}
      </span>
    </div>
  );
} 