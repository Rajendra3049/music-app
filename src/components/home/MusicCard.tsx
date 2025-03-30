'use client';

import { PlayButton } from '@/components/audio-player/PlayButton';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import { LatestRelease } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Props {
  release: LatestRelease;
  isActive?: boolean;
}

export function MusicCard({ release, isActive = false }: Props) {
  const { isCurrentTrack, playerState } = useAudioPlayer();
  const isPlaying = isCurrentTrack(release.id) && playerState.isPlaying;

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90 backdrop-blur-sm border ${
        isActive ? 'border-purple-500/50' : 'border-white/10'
      }`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-4">
        {/* Album Art */}
        <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
          <Image
            src={release.coverImage}
            alt={release.title}
            width={400}
            height={400}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <PlayButton track={release} size="lg" />
          </div>
        </div>

        {/* Track Info */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white truncate">
              {release.title}
            </h3>
            <PlayButton track={release} size="sm" variant="minimal" />
          </div>
          <p className="text-sm text-gray-400 truncate">{release.artist}</p>
        </div>

        {/* Playing Indicator */}
        {isPlaying && (
          <div className="absolute top-2 right-2">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
} 