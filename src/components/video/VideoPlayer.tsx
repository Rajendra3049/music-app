'use client';

import { formatTime } from '@/lib/audio';
import { Volume2Icon, VolumeXIcon } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BsFullscreen } from 'react-icons/bs';
import { IoPauseCircleOutline, IoPlayCircleOutline } from 'react-icons/io5';
import { TbRepeat, TbRepeatOff } from 'react-icons/tb';

interface VideoPlayerProps {
  src: string;
  poster: string;
  onEnded?: () => void;
  autoPlay?: boolean;
}

export function VideoPlayer({ src, poster, onEnded, autoPlay = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const volumeRef = useRef(1); // Store volume in ref for persistence
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(volumeRef.current); // Initialize from ref
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLooping, setIsLooping] = useState(false);

  // Memoize the handleVideoEnd callback to prevent unnecessary re-renders
  const handleVideoEnd = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isLooping) {
      // For loop ON: Reset time and continue playing
      try {
        // Set time to 0 first
        video.currentTime = 0;
        setCurrentTime(0);
        
        // Then attempt to play
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Loop playback failed:', error);
            // On error, ensure we're in a consistent state
            setIsPlaying(false);
          });
        }
      } catch (error) {
        console.error('Error during loop:', error);
        setIsPlaying(false);
      }
    } else {
      // For loop OFF: Reset time and stop
      video.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
      onEnded?.();
    }
  }, [isLooping, onEnded]);

  // Reset video state when src changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Only reset playback states, not volume
    video.currentTime = 0;
    video.pause();
    setCurrentTime(0);
    setIsPlaying(false);
    setIsLoading(true);
    
    // Reset loop state
    video.loop = false;

    // Apply persisted volume settings
    video.volume = volumeRef.current;
    video.muted = isMuted;

    // Load new source
    video.load();
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      // Use requestAnimationFrame to ensure we're not in the middle of a render
      requestAnimationFrame(() => {
        handleVideoEnd();
      });
    };

    // Explicitly set loop to false and handle it ourselves
    video.loop = false;

    // Add all event listeners
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      // Clean up all event listeners
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [handleVideoEnd]);

  // Handle autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('AutoPlay failed:', error);
        setIsPlaying(false);
      });
    }
  }, [src, autoPlay]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Play failed:', error);
          setIsPlaying(false);
        });
      }
    }
  };

  const toggleLoop = () => {
    setIsLooping(prev => !prev);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const time = Number(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    video.requestFullscreen().catch(error => {
      console.error('Fullscreen failed:', error);
    });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const value = parseFloat(e.target.value);
    video.volume = value;
    volumeRef.current = value; // Update ref
    setVolume(value);
    setIsMuted(value === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);
    
    if (newMuted) {
      video.volume = 0;
      volumeRef.current = 0;
      setVolume(0);
    } else {
      video.volume = volumeRef.current; // Restore previous volume
      setVolume(volumeRef.current);
    }
  };

  return (
    <div className="relative group aspect-video bg-black rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full"
        onClick={togglePlay}
        playsInline
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Video Controls */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        onMouseDown={(e) => e.stopPropagation()} // Prevent click-through to video
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-primary-500 transition-colors"
            >
              {isPlaying ? (
                <IoPauseCircleOutline size={32} />
              ) : (
                <IoPlayCircleOutline size={32} />
              )}
            </button>

            <div className="flex-1 flex items-center gap-2">
              <span className="text-white text-sm">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-white text-sm">
                {formatTime(duration)}
              </span>
            </div>

            <button
              onClick={toggleLoop}
              className={`text-white transition-colors ${
                isLooping ? 'text-primary-500' : 'hover:text-primary-500'
              }`}
              title={isLooping ? 'Disable loop' : 'Enable loop'}
            >
              {isLooping ? <TbRepeat size={24} /> : <TbRepeatOff size={24} />}
            </button>

            <button
              onClick={handleFullscreen}
              className="text-white hover:text-primary-500 transition-colors"
            >
              <BsFullscreen size={20} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
              <button
                onClick={toggleMute}
                className="text-white hover:text-white/80 transition-colors"
              >
                {isMuted ? (
                  <VolumeXIcon className="w-6 h-6" />
                ) : (
                  <Volume2Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 