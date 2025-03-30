'use client';

import { AudioPlayerState } from '@/components/audio-player/types';
import { LatestRelease } from '@/types';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

interface AudioPlayerContextType {
  playerState: AudioPlayerState;
  currentTrack: LatestRelease | null;
  isMiniPlayerVisible: boolean;
  queue: LatestRelease[];
  playTrack: (track: LatestRelease) => Promise<void>;
  pauseTrack: () => Promise<void>;
  togglePlay: () => Promise<void>;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  resetTrack: () => void;
  toggleMiniPlayer: () => void;
  addToQueue: (track: LatestRelease) => void;
  removeFromQueue: (trackId: string) => void;
  clearQueue: () => void;
  playNext: () => Promise<void>;
  playPrevious: () => Promise<void>;
  isCurrentTrack: (trackId: string) => boolean;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [playerState, setPlayerState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    error: null,
    volume: 1,
    isMuted: false
  });

  const [currentTrack, setCurrentTrack] = useState<LatestRelease | null>(null);
  const [queue, setQueue] = useState<LatestRelease[]>([]);
  const [isMiniPlayerVisible, setIsMiniPlayerVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isDraggingRef = useRef(false);

  // Initialize audio element with better error handling and preloading
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.crossOrigin = 'anonymous';
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (!isDraggingRef.current) {
        setPlayerState(prev => ({ ...prev, currentTime: audio.currentTime }));
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
      playNext();
    };

    const handleError = () => {
      const errorMessage = 'Error loading audio file. Please try again.';
      setPlayerState(prev => ({
        ...prev,
        error: errorMessage,
        isPlaying: false
      }));
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
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Handle track changes with improved error handling
  const playTrack = useCallback(async (track: LatestRelease) => {
    if (!audioRef.current) return;

    try {
      // Stop current track if playing
      if (playerState.isPlaying) {
        await audioRef.current.pause();
      }

      // Set new track
      audioRef.current.src = track.audioUrl;
      setCurrentTrack(track);
      setIsMiniPlayerVisible(true);

      // Start playback
      await audioRef.current.play();
      setPlayerState(prev => ({ ...prev, isPlaying: true, error: null }));

      // Add to queue if not already in it
      setQueue(prev => {
        if (!prev.find(t => t.id === track.id)) {
          return [...prev, track];
        }
        return prev;
      });
    } catch (err) {
      const errorMessage = 'Unable to play audio. Please try again.';
      setPlayerState(prev => ({
        ...prev,
        error: errorMessage,
        isPlaying: false
      }));
      console.error('Playback error:', err);
    }
  }, [playerState.isPlaying]);

  const pauseTrack = useCallback(async () => {
    if (!audioRef.current) return;
    await audioRef.current.pause();
    setPlayerState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current || !currentTrack) return;
    if (playerState.isPlaying) {
      await pauseTrack();
    } else {
      await audioRef.current.play();
      setPlayerState(prev => ({ ...prev, isPlaying: true }));
    }
  }, [playerState.isPlaying, pauseTrack, currentTrack]);

  const seekTo = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setPlayerState(prev => ({ ...prev, currentTime: time }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    setPlayerState(prev => ({
      ...prev,
      volume,
      isMuted: volume === 0
    }));
  }, []);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const newMuted = !playerState.isMuted;
    audioRef.current.volume = newMuted ? 0 : playerState.volume;
    setPlayerState(prev => ({
      ...prev,
      isMuted: newMuted,
      volume: newMuted ? 0 : prev.volume || 1
    }));
  }, [playerState.isMuted, playerState.volume]);

  const resetTrack = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setPlayerState(prev => ({ ...prev, currentTime: 0 }));
    if (playerState.isPlaying) {
      audioRef.current.play().catch(console.error);
    }
  }, [playerState.isPlaying]);

  const toggleMiniPlayer = useCallback(() => {
    setIsMiniPlayerVisible(prev => !prev);
  }, []);

  // Queue management
  const addToQueue = useCallback((track: LatestRelease) => {
    setQueue(prev => [...prev, track]);
  }, []);

  const removeFromQueue = useCallback((trackId: string) => {
    setQueue(prev => prev.filter(track => track.id !== trackId));
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  const playNext = useCallback(async () => {
    if (!currentTrack || queue.length === 0) return;
    
    const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
    const nextTrack = queue[currentIndex + 1];
    
    if (nextTrack) {
      await playTrack(nextTrack);
    } else if (queue.length > 0) {
      // Loop back to first track
      await playTrack(queue[0]);
    }
  }, [currentTrack, queue, playTrack]);

  const playPrevious = useCallback(async () => {
    if (!currentTrack || queue.length === 0) return;
    
    const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
    const previousTrack = queue[currentIndex - 1];
    
    if (previousTrack) {
      await playTrack(previousTrack);
    } else if (queue.length > 0) {
      // Loop to last track
      await playTrack(queue[queue.length - 1]);
    }
  }, [currentTrack, queue, playTrack]);

  const isCurrentTrack = useCallback((trackId: string) => {
    return currentTrack?.id === trackId;
  }, [currentTrack]);

  return (
    <AudioPlayerContext.Provider
      value={{
        playerState,
        currentTrack,
        isMiniPlayerVisible,
        queue,
        playTrack,
        pauseTrack,
        togglePlay,
        seekTo,
        setVolume,
        toggleMute,
        resetTrack,
        toggleMiniPlayer,
        addToQueue,
        removeFromQueue,
        clearQueue,
        playNext,
        playPrevious,
        isCurrentTrack
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
} 