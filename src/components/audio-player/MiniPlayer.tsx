'use client';

import { TooltipWrapper } from '@/components/ui/TooltipWrapper';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ListMusic } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AudioControls } from './AudioControls';
import { AudioProgress } from './AudioProgress';
import { AudioVolume } from './AudioVolume';

export function MiniPlayer() {
  const {
    playerState,
    currentTrack,
    isMiniPlayerVisible,
    toggleMiniPlayer,
    seekTo,
    setVolume,
    toggleMute,
    togglePlay,
    resetTrack,
    queue
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
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900/95 via-gray-900 to-gray-900/95 backdrop-blur-lg border-t border-white/10 p-4 z-50"
        style={{ isolation: 'isolate' }}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={currentTrack.coverImage}
                alt={currentTrack.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="min-w-0">
              <TooltipWrapper 
                content={isTitleTruncated ? currentTrack.title : ""}
                delayDuration={300}
                side="top"
                align="start"
              >
                <h3 
                  ref={titleRef}
                  className="text-white font-medium truncate"
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
                  className="text-gray-400 text-sm truncate"
                >
                  {currentTrack.artist}
                </p>
              </TooltipWrapper>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex-1 max-w-xl">
            <div className="flex flex-col items-center gap-1">
              <AudioControls
                isPlaying={playerState.isPlaying}
                onPlayPause={togglePlay}
                onReset={resetTrack}
                currentTime={playerState.currentTime}
                duration={playerState.duration}
                disabled={!!playerState.error}
                size="md"
              />
              <AudioProgress
                currentTime={playerState.currentTime}
                duration={playerState.duration}
                onSeek={seekTo}
              />
            </div>
          </div>

          {/* Volume and Queue */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <AudioVolume
              volume={playerState.volume}
              isMuted={playerState.isMuted}
              onVolumeChange={setVolume}
              onMuteToggle={toggleMute}
              size="sm"
            />

            <button
              className="p-2 text-gray-400 hover:text-white transition-colors relative group"
              onClick={() => {}} // TODO: Implement queue panel
            >
              <ListMusic className="w-5 h-5" />
              {queue.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {queue.length}
                </span>
              )}
            </button>

            <button
              className="p-2 text-gray-400 hover:text-white transition-colors"
              onClick={toggleMiniPlayer}
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {playerState.error && (
          <div className="absolute top-0 left-0 right-0 -translate-y-full p-2 bg-red-500 text-white text-sm text-center">
            {playerState.error}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
} 