'use client';

import { TooltipWrapper } from '@/components/ui/TooltipWrapper';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import { formatTime } from '@/lib/audio';
import { AnimatePresence, motion } from 'framer-motion';
import { PauseIcon, PlayIcon, RotateCcwIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AudioProgress } from './AudioProgress';
import { AudioVolume } from './AudioVolume';

export function MiniPlayer() {
  const {
    playerState,
    currentTrack,
    isMiniPlayerVisible,
    seekTo,
    setVolume,
    toggleMute,
    togglePlay,
    resetTrack,
    closeMiniPlayer,
  } = useAudioPlayer();

  // Refs for checking text truncation
  const titleRef = useRef<HTMLHeadingElement>(null);
  const artistRef = useRef<HTMLParagraphElement>(null);

  // State to track truncation
  const [isTitleTruncated, setIsTitleTruncated] = useState(false);
  const [isArtistTruncated, setIsArtistTruncated] = useState(false);

  // Check for text truncation
  useEffect(() => {
    const checkTruncation = () => {
      if (titleRef.current) {
        setIsTitleTruncated(titleRef.current.scrollWidth > titleRef.current.clientWidth);
      }
      if (artistRef.current) {
        setIsArtistTruncated(artistRef.current.scrollWidth > artistRef.current.clientWidth);
      }
    };

    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [currentTrack]);

  if (!isMiniPlayerVisible || !currentTrack) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900/95 via-gray-900 to-gray-900/95 backdrop-blur-lg border-t border-white/10 py-1 px-2 md:py-3 md:px-4 z-[100]"
        style={{ isolation: 'isolate' }}
      >
        <div className="max-w-7xl mx-auto relative">
          {/* Close Button - Enhanced visibility */}
          <motion.button
            className="absolute -top-2 -right-2 p-2 text-white/90 hover:text-white bg-gray-800/80 hover:bg-gray-700/90 transition-all rounded-full shadow-lg hover:shadow-xl border border-white/10"
            onClick={closeMiniPlayer}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <XIcon className="w-4 h-4" />
          </motion.button>

          {/* Main Content Container with consistent padding */}
          <div className="px-[2px] sm:px-1">
            {/* Progress Bar Container - Consistent width */}
            <div className="mb-1.5 md:mb-3 mx-[8px] sm:mx-[10px] md:mx-[12px]">
              <AudioProgress
                currentTime={playerState.currentTime}
                duration={playerState.duration}
                onSeek={seekTo}
              />
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {/* Track Info - Left Side */}
              <div className="flex items-center gap-2 md:gap-3 min-w-0 w-[120px] sm:w-[180px] md:w-1/4">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0">
                  <Image
                    src={currentTrack.coverImage}
                    alt={currentTrack.title}
                    fill
                    className="object-cover rounded-md md:rounded-lg"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <TooltipWrapper 
                    content={isTitleTruncated ? currentTrack.title : ""}
                    delayDuration={300}
                    side="top"
                    align="start"
                  >
                    <h3 
                      ref={titleRef}
                      className="text-xs sm:text-sm md:text-base text-white font-medium truncate"
                    >
                      {currentTrack.title}
                    </h3>
                  </TooltipWrapper>
                  <TooltipWrapper 
                    content={isArtistTruncated ? currentTrack.artist : ""}
                    delayDuration={300}
                    side="bottom"
                    align="start"
                  >
                    <p 
                      ref={artistRef}
                      className="text-[10px] sm:text-xs md:text-sm text-gray-400 truncate"
                    >
                      {currentTrack.artist}
                    </p>
                  </TooltipWrapper>
                </div>
              </div>

              {/* Center Section - Play/Pause Only */}
              <div className="flex-1 flex justify-center items-center">
                <motion.button
                  className="p-2 sm:p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white disabled:opacity-50 shadow-lg shadow-purple-500/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  disabled={!!playerState.error}
                >
                  {playerState.isPlaying ? (
                    <PauseIcon className="w-5 h-5 sm:w-6 sm:h-6 relative left-[1px]" />
                  ) : (
                    <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6 relative left-[2px]" />
                  )}
                </motion.button>
              </div>

              {/* Right Section - Controls with consistent width */}
              <div className="flex items-center justify-end gap-2 md:gap-4 min-w-0 w-[120px] sm:w-[180px] md:w-1/4">
                {/* Reset Button - Hidden on Mobile */}
                <button
                  className="hidden sm:flex items-center justify-center p-1.5 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                  onClick={resetTrack}
                  disabled={!!playerState.error || playerState.currentTime < 3}
                >
                  <RotateCcwIcon className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                {/* Duration - Hidden on Mobile */}
                <div className="hidden sm:flex items-center text-xs md:text-sm font-medium text-gray-400 tabular-nums whitespace-nowrap">
                  {formatTime(playerState.currentTime)} / {formatTime(playerState.duration)}
                </div>

                {/* Volume Control */}
                <div className="flex items-center">
                  <AudioVolume
                    volume={playerState.volume}
                    isMuted={playerState.isMuted}
                    onVolumeChange={setVolume}
                    onMuteToggle={toggleMute}
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {playerState.error && (
          <div className="absolute top-0 left-0 right-0 -translate-y-full p-1.5 sm:p-2 bg-red-500 text-white text-xs sm:text-sm text-center">
            {playerState.error}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
} 