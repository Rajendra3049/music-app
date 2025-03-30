'use client';

import { PlayButton } from '@/components/audio-player/PlayButton';
import { TooltipWrapper } from '@/components/ui/TooltipWrapper';
import { LatestRelease } from '@/types';
import { CalendarIcon, Music2Icon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Props {
  track: LatestRelease;
  className?: string;
}

export function FeaturedCard({ track, className = '' }: Props) {
  // Refs for checking text truncation
  const titleRef = useRef<HTMLHeadingElement>(null);
  const artistRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  // State to track truncation
  const [isTitleTruncated, setIsTitleTruncated] = useState(false);
  const [isArtistTruncated, setIsArtistTruncated] = useState(false);
  const [isDescriptionTruncated, setIsDescriptionTruncated] = useState(false);

  // Check for text truncation
  useEffect(() => {
    const checkTruncation = () => {
      if (titleRef.current) {
        setIsTitleTruncated(titleRef.current.scrollWidth > titleRef.current.clientWidth);
      }
      if (artistRef.current) {
        setIsArtistTruncated(artistRef.current.scrollWidth > artistRef.current.clientWidth);
      }
      if (descriptionRef.current) {
        setIsDescriptionTruncated(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
      }
    };

    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [track]);

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/95 via-gray-900 to-gray-900/95 backdrop-blur-lg border border-white/10 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-stretch gap-4 p-4">
        {/* Left Section: Cover Art and Basic Info */}
        <div className="flex gap-4 md:w-1/2">
          {/* Cover Art */}
          <div className="relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0">
            <Image
              src={track.coverImage}
              alt={track.title}
              fill
              className="object-cover rounded-lg shadow-2xl"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <PlayButton track={track} size="lg" variant="featured" />
              </div>
            </div>
          </div>

          {/* Basic Track Info */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="space-y-1 mb-3">
              <TooltipWrapper 
                content={isTitleTruncated ? track.title : ""}
                delayDuration={300}
                side="top"
                align="start"
              >
                <h3 
                  ref={titleRef}
                  className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 truncate"
                >
                  {track.title}
                </h3>
              </TooltipWrapper>
              <TooltipWrapper 
                content={isArtistTruncated ? track.artist : ""}
                delayDuration={300}
                side="bottom"
                align="start"
              >
                <p 
                  ref={artistRef}
                  className="text-base md:text-lg text-gray-400 truncate"
                >
                  {track.artist}
                </p>
              </TooltipWrapper>
            </div>
            <div className="flex-shrink-0">
              <PlayButton track={track} size="md" />
            </div>
          </div>
        </div>

        {/* Right Section: Description and Additional Info */}
        <div className="md:w-1/2 md:border-l md:border-white/10 md:pl-4 flex flex-col">
          {/* Description */}
          {track.description && (
            <div className="flex-1">
              <TooltipWrapper 
                content={isDescriptionTruncated ? track.description : ""}
                delayDuration={300}
                side="top"
                align="start"
              >
                <p 
                  ref={descriptionRef}
                  className="text-gray-400 leading-relaxed line-clamp-3 text-sm md:text-base"
                >
                  {track.description}
                </p>
              </TooltipWrapper>
            </div>
          )}

          {/* Track Metadata */}
          <div className="mt-3 flex flex-wrap gap-2">
            {track.genre && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 text-xs md:text-sm text-gray-300">
                <Music2Icon size={12} className="text-purple-400" />
                {track.genre}
              </div>
            )}
            {track.releaseDate && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 text-xs md:text-sm text-gray-300">
                <CalendarIcon size={12} className="text-purple-400" />
                {new Date(track.releaseDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Border Glow Effect */}
      <div className="absolute inset-px rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
} 