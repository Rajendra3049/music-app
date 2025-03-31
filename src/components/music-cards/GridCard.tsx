'use client';

import { PlayButton } from '@/components/audio-player/PlayButton';
import { TooltipWrapper } from '@/components/ui/TooltipWrapper';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import { LatestRelease } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface GridCardProps {
  track: LatestRelease;
  isActive?: boolean;
  className?: string;
}

export function GridCard({ track, isActive = false, className = '' }: GridCardProps) {
  const { isCurrentTrack, playerState } = useAudioPlayer();
  const isPlaying = isCurrentTrack(track.id) && playerState.isPlaying;

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
  }, [track]);

  return (
    <motion.div
      className={`group relative rounded-xl bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90 backdrop-blur-sm border hover:z-50 ${
        isActive ? 'border-purple-500/50' : 'border-white/10'
      } ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      style={{ isolation: 'isolate' }}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

      <div className="relative p-3">
        {/* Album Art */}
        <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
          <Image
            src={track.coverImage}
            alt={track.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <PlayButton track={track} size="lg" />
          </div>
        </div>

        {/* Track Info Container */}
        <div className="space-y-1.5">
          {/* Title Row with Play Button */}
          <div className="flex items-center gap-1.5 min-w-0">
            <div className='max-w-[90%]'>
            <TooltipWrapper 
              content={isTitleTruncated ? track.title : ""}
              delayDuration={300}
              side="top"
              align="start"
            >
              <h3 
                ref={titleRef}
                className="text-base font-semibold text-white truncate min-w-0"
              >
                {track.title}
              </h3>
            </TooltipWrapper>
            </div>
            <div className="flex-shrink-0 ml-auto">
              <PlayButton track={track} size="sm" variant="minimal" />
            </div>
          </div>

          {/* Artist Name */}
          <TooltipWrapper 
            content={isArtistTruncated ? track.artist : ""}
            delayDuration={300}
            side="bottom"
            align="start"
          >
            <p 
              ref={artistRef}
              className="text-sm text-gray-400 truncate pr-1"
            >
              {track.artist}
            </p>
          </TooltipWrapper>
        </div>

        {/* Playing Indicator */}
        {isPlaying && (
          <div className="absolute top-2 right-2">
            <span className="flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500" />
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
} 