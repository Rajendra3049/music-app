'use client';

import { AudioControls, AudioProgress, AudioVolume } from '@/components/audio-player';
import { AudioPlayerState } from '@/components/audio-player/types';
import { TooltipWrapper } from '@/components/ui/TooltipWrapper';
import { cardHoverVariants } from '@/lib/animations';
import { LatestRelease } from '@/types';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  release: LatestRelease;
  isActive: boolean;
}

export function MusicCard({ release, isActive }: Props) {
  const [playerState, setPlayerState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    error: null,
    volume: 1,
    isMuted: false
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (!isActive && playerState.isPlaying) {
      togglePlay();
    }
  }, [isActive]);

  // Enhanced toggle play with error handling
  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (playerState.isPlaying) {
          await audioRef.current.pause();
        } else {
          setPlayerState(prev => ({ ...prev, error: null }));
          await audioRef.current.play();
        }
        setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
      } catch (err) {
        const errorMessage = 'Unable to play audio. Please try again.';
        setPlayerState(prev => ({
          ...prev,
          error: errorMessage,
          isPlaying: false
        }));
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
    };

    const handleError = () => {
      const errorMessage = 'Error loading audio file. Please try again.';
      setPlayerState(prev => ({
        ...prev,
        error: errorMessage,
        isPlaying: false
      }));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <motion.div
      className="group relative h-[280px] rounded-2xl bg-black/20 backdrop-blur-sm will-change-transform"
      variants={cardHoverVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      layoutId={`card-${release.id}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/30 via-transparent to-pink-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex flex-col h-full p-6 overflow-hidden">
        <div className="flex-1 min-h-0">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 min-w-0 pr-4">
              <TooltipWrapper content={release.title} side="top">
                <h3 className="text-2xl font-bold mb-2 truncate">
                  {release.title}
                </h3>
              </TooltipWrapper>
              <TooltipWrapper content={release.artist} side="bottom">
                <p className="text-gray-300 truncate">
                  {release.artist}
                </p>
              </TooltipWrapper>
            </div>
            <motion.button
              className={`flex-shrink-0 p-2 rounded-full ${
                isFavorite ? 'bg-pink-500/20 text-pink-500' : 'bg-white/10 text-gray-300'
              } hover:bg-pink-500/30 hover:text-pink-500 transition-colors`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
            </motion.button>
          </div>

          {release.description && (
            <div className="relative">
              <p 
                className={`text-gray-400 text-sm ${
                  isDescriptionExpanded ? '' : 'line-clamp-2'
                } transition-all duration-200`}
              >
                {release.description}
              </p>
              {release.description.length > 100 && (
                <button
                  className="text-xs text-purple-400 hover:text-purple-300 mt-1 transition-colors"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                >
                  {isDescriptionExpanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-auto pt-4">
          {/* Audio Progress Bar */}
          <AudioProgress
            currentTime={playerState.currentTime}
            duration={playerState.duration}
            onSeek={handleSeek}
            isDragging={isDraggingRef.current}
            onDragStart={() => isDraggingRef.current = true}
            onDragEnd={() => isDraggingRef.current = false}
          />

          {/* Audio Controls */}
          <div className="flex items-center justify-between mt-4">
            <AudioControls
              isPlaying={playerState.isPlaying}
              onPlayPause={togglePlay}
              onReset={handleReset}
              currentTime={playerState.currentTime}
              duration={playerState.duration}
              disabled={!!playerState.error}
              size="sm"
              variant="minimal"
            />

            <AudioVolume
              volume={playerState.volume}
              isMuted={playerState.isMuted}
              onVolumeChange={handleVolumeChange}
              onMuteToggle={handleMuteToggle}
              size="sm"
              variant="simple"
            />
          </div>

          {/* Error Message */}
          {playerState.error && (
            <div className="text-red-500 text-sm mt-2">
              {playerState.error}
            </div>
          )}
        </div>
      </div>

      <audio
        ref={audioRef}
        src={release.audioUrl}
        preload="metadata"
        crossOrigin="anonymous"
      />
    </motion.div>
  );
} 