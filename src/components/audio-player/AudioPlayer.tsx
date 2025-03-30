'use client';

import { useAudioPlayer } from '@/context/AudioPlayerContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { AudioControls } from './AudioControls';
import { AudioProgress } from './AudioProgress';
import { AudioVolume } from './AudioVolume';
import { AudioWaveform } from './AudioWaveform';
import { AudioPlayerProps } from './types';

export function AudioPlayer({
  src,
  title,
  artist,
  coverImage,
  onPlay,
  onPause,
  onEnded,
  onError,
  onTimeUpdate,
  className = ''
}: AudioPlayerProps) {
  const {
    playerState,
    playTrack,
    pauseTrack,
    seekTo,
    setVolume,
    toggleMute,
    resetTrack
  } = useAudioPlayer();

  const isDraggingRef = useRef(false);

  // Handle play/pause
  const handlePlayPause = useCallback(async () => {
    if (playerState.isPlaying) {
      await pauseTrack();
      onPause?.();
    } else {
      await playTrack({ src, title, artist, coverImage });
      onPlay?.();
    }
  }, [playerState.isPlaying, playTrack, pauseTrack, src, title, artist, coverImage, onPlay, onPause]);

  // Handle time updates
  useEffect(() => {
    onTimeUpdate?.(playerState.currentTime);
  }, [playerState.currentTime, onTimeUpdate]);

  // Handle track end
  useEffect(() => {
    if (playerState.currentTime === 0 && !playerState.isPlaying) {
      onEnded?.();
    }
  }, [playerState.currentTime, playerState.isPlaying, onEnded]);

  // Handle errors
  useEffect(() => {
    if (playerState.error) {
      onError?.(playerState.error);
    }
  }, [playerState.error, onError]);

  return (
    <div className={`bg-gradient-to-r from-gray-900 to-black/80 rounded-xl p-6 backdrop-blur-sm border border-white/10 ${className}`}>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Album Art */}
        <motion.div 
          className="w-40 h-40 relative flex-shrink-0"
          variants={{
            pulse: {
              scale: [1, 1.05, 1],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
          animate={playerState.isPlaying ? "pulse" : "static"}
        >
          <Image
            src={coverImage}
            alt={title}
            width={160}
            height={160}
            className="rounded-lg object-cover"
          />
        </motion.div>

        {/* Track Info and Controls */}
        <div className="flex-grow">
          <div className="flex flex-col gap-2 mb-4">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-gray-400">{artist}</p>
          </div>

          {/* Waveform Visualization */}
          <div className="relative h-24 bg-black/30 rounded-lg overflow-hidden group">
            <AudioWaveform 
              isPlaying={playerState.isPlaying} 
              currentTime={playerState.currentTime}
              duration={playerState.duration}
              onSeek={seekTo}
              isDragging={isDraggingRef.current}
              onDragStart={() => isDraggingRef.current = true}
              onDragEnd={() => isDraggingRef.current = false}
            />
          </div>

          {/* Error Message */}
          {playerState.error && (
            <div className="text-red-500 text-sm mt-2">
              {playerState.error}
            </div>
          )}

          {/* Player Controls */}
          <div className="flex flex-col gap-3 mt-4">
            <AudioProgress
              currentTime={playerState.currentTime}
              duration={playerState.duration}
              onSeek={seekTo}
              isDragging={isDraggingRef.current}
              onDragStart={() => isDraggingRef.current = true}
              onDragEnd={() => isDraggingRef.current = false}
              size="md"
            />

            <div className="flex items-center gap-6">
              <AudioControls
                isPlaying={playerState.isPlaying}
                onPlayPause={handlePlayPause}
                onReset={resetTrack}
                currentTime={playerState.currentTime}
                duration={playerState.duration}
                disabled={!!playerState.error}
              />

              <AudioVolume
                volume={playerState.volume}
                isMuted={playerState.isMuted}
                onVolumeChange={setVolume}
                onMuteToggle={toggleMute}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 