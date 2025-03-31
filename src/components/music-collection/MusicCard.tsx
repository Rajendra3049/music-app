'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import { MediaItem } from '@/db/media';
import { cn } from '@/lib/utils';
import { Heart, Pause, Play } from 'lucide-react';
import Image from 'next/image';

interface MusicCardProps {
  track: MediaItem;
}

export function MusicCard({ track }: MusicCardProps) {
  const { play, pause, playerState, currentTrack } = useAudioPlayer();

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement favorite functionality
  };

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
    <Card
      className={cn(
        'group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md',
        isCurrentlyPlaying && 'ring-2 ring-primary',
        'cursor-pointer'
      )}
      onClick={handlePlayPause}
    >
      {/* Playing Indicator */}
      {isCurrentlyPlaying && (
        <div className="absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
          <div className="flex h-2 w-2 gap-1">
            <div className="h-full w-0.5 animate-[bounce_0.5s_ease-in-out_infinite] bg-white" />
            <div className="h-full w-0.5 animate-[bounce_0.5s_ease-in-out_0.2s_infinite] bg-white" />
            <div className="h-full w-0.5 animate-[bounce_0.5s_ease-in-out_0.4s_infinite] bg-white" />
          </div>
        </div>
      )}

      {/* Album Art */}
      <div className="relative aspect-square">
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
            className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isCurrentlyPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Track Info */}
      <div className="p-4">
        <h3 className="mb-1 truncate text-lg font-semibold">{track.title}</h3>
        <p className="mb-2 truncate text-sm text-muted-foreground">
          {track.metadata?.artist}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {track.metadata?.genre}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleFavorite}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
} 