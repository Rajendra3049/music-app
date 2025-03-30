import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AudioControls } from './AudioControls';
import { AudioProgress } from './AudioProgress';
import { AudioVolume } from './AudioVolume';
import { AudioWaveform } from './AudioWaveform';
import { AudioPlayerProps, AudioPlayerState } from './types';

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
  const [playerState, setPlayerState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    error: null,
    volume: 1,
    isMuted: false
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isDraggingRef = useRef(false);

  // Enhanced toggle play with error handling
  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (playerState.isPlaying) {
          await audioRef.current.pause();
          onPause?.();
        } else {
          setPlayerState(prev => ({ ...prev, error: null }));
          await audioRef.current.play();
          onPlay?.();
        }
        setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
      } catch (err) {
        const errorMessage = 'Unable to play audio. Please try again.';
        setPlayerState(prev => ({
          ...prev,
          error: errorMessage,
          isPlaying: false
        }));
        onError?.(errorMessage);
        console.error('Playback error:', err);
      }
    }
  };

  // Handle seeking
  const handleSeek = useCallback((newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setPlayerState(prev => ({ ...prev, currentTime: newTime }));
    }
  }, []);

  // Handle volume change
  const handleVolumeChange = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setPlayerState(prev => ({ 
        ...prev, 
        volume: newVolume,
        isMuted: newVolume === 0
      }));
    }
  }, []);

  // Toggle mute
  const handleMuteToggle = useCallback(() => {
    if (audioRef.current) {
      const newMuted = !playerState.isMuted;
      audioRef.current.volume = newMuted ? 0 : playerState.volume;
      setPlayerState(prev => ({ 
        ...prev, 
        isMuted: newMuted,
        volume: newMuted ? 0 : prev.volume || 1
      }));
    }
  }, [playerState.isMuted, playerState.volume]);

  // Handle reset
  const handleReset = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setPlayerState(prev => ({ ...prev, currentTime: 0 }));
      if (playerState.isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [playerState.isPlaying]);

  // Enhanced audio event handling
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (!isDraggingRef.current) {
        const newTime = audio.currentTime;
        setPlayerState(prev => ({ ...prev, currentTime: newTime }));
        onTimeUpdate?.(newTime);
      }
    };

    const handleLoadedMetadata = () => {
      setPlayerState(prev => ({
        ...prev,
        duration: audio.duration,
        error: null
      }));
    };

    const handleEnded = () => {
      setPlayerState(prev => ({
        ...prev,
        isPlaying: false,
        currentTime: 0
      }));
      onEnded?.();
    };

    const handleError = () => {
      const errorMessage = 'Error loading audio file. Please try again.';
      setPlayerState(prev => ({
        ...prev,
        error: errorMessage,
        isPlaying: false
      }));
      onError?.(errorMessage);
    };

    const handleCanPlayThrough = () => {
      setPlayerState(prev => ({ ...prev, error: null }));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [onEnded, onError, onTimeUpdate]);

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

          {/* Audio Element */}
          <audio
            ref={audioRef}
            src={src}
            preload="metadata"
            crossOrigin="anonymous"
          />

          {/* Waveform Visualization */}
          <div className="relative h-24 bg-black/30 rounded-lg overflow-hidden cursor-pointer">
            <AudioWaveform isPlaying={playerState.isPlaying} />
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
              onSeek={handleSeek}
              isDragging={isDraggingRef.current}
              onDragStart={() => isDraggingRef.current = true}
              onDragEnd={() => isDraggingRef.current = false}
            />

            <div className="flex items-center gap-6">
              <AudioControls
                isPlaying={playerState.isPlaying}
                onPlayPause={togglePlay}
                onReset={handleReset}
                currentTime={playerState.currentTime}
                duration={playerState.duration}
                disabled={!!playerState.error}
              />

              <AudioVolume
                volume={playerState.volume}
                isMuted={playerState.isMuted}
                onVolumeChange={handleVolumeChange}
                onMuteToggle={handleMuteToggle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 