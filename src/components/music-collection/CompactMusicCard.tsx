'use client';

import { Button } from '@/components/ui/button';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import { MediaItem } from '@/db/media';
import { cn } from '@/lib/utils';
import { Pause, Play } from 'lucide-react';
import Image from 'next/image';

interface CompactMusicCardProps {
  track: MediaItem;
}

export function CompactMusicCard({ track }: CompactMusicCardProps) {
  const { play, pause, playerState, currentTrack } = useAudioPlayer();

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentlyPlaying) {
      pause();
    } else {
      play(track);
    }
  };

  const isCurrentlyPlaying = currentTrack?.id === track.id && playerState.isPlaying;

  return (
    <div
      className={cn(
        'group relative flex items-center gap-4 rounded-lg border bg-card p-2 text-card-foreground shadow-sm transition-all hover:shadow-md',
        isCurrentlyPlaying && 'ring-2 ring-primary',
        'cursor-pointer'
      )}
      onClick={handlePlayPause}
    >
      {/* Playing Indicator */}
      {isCurrentlyPlaying && (
        <div className="absolute left-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
          <div className="flex h-2 w-2 gap-1">
            <div className="h-full w-0.5 animate-[bounce_0.5s_ease-in-out_infinite] bg-white" />
            <div className="h-full w-0.5 animate-[bounce_0.5s_ease-in-out_0.2s_infinite] bg-white" />
            <div className="h-full w-0.5 animate-[bounce_0.5s_ease-in-out_0.4s_infinite] bg-white" />
          </div>
        </div>
      )}

      {/* Album Art */}
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={track.thumbnailUrl || '/images/placeholder-album.jpg'}
          alt={track.title}
          fill
          className={cn(
            "object-cover transition-transform",
            isCurrentlyPlaying ? "brightness-90" : "group-hover:scale-105"
          )}
        />
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/40",
          isCurrentlyPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          <Button
            size="icon"
            onClick={handlePlayPause}
            className="h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isCurrentlyPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Track Info */}
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="truncate text-sm font-medium">{track.title}</h3>
        <p className="truncate text-xs text-muted-foreground">
          {track.metadata?.artist}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {track.metadata?.genre}
          </span>
        </div>
      </div>
    </div>
  );
} 