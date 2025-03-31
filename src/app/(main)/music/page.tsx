'use client';

import { CompactMusicCard } from '@/components/music-collection/CompactMusicCard';
import { FilterBar } from '@/components/music-collection/FilterBar';
import { MusicCard } from '@/components/music-collection/MusicCard';
import { MusicCollectionLayout } from '@/components/music-collection/MusicCollectionLayout';
import { getMediaByType } from '@/db/media';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function MusicPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  const allTracks = getMediaByType('audio');

  // Filter tracks based on search query and genre
  const filteredTracks = allTracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.metadata?.artist?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || track.metadata?.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  // Sort tracks based on selected sort option
  const sortedTracks = [...filteredTracks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'artist':
        return (a.metadata?.artist || '').localeCompare(b.metadata?.artist || '');
      case 'duration':
        // Convert duration to numbers for comparison, defaulting to 0 if undefined
        const durationA = typeof a.metadata?.duration === 'number' ? a.metadata.duration : 0;
        const durationB = typeof b.metadata?.duration === 'number' ? b.metadata.duration : 0;
        return durationA - durationB;
      default:
        return 0;
    }
  });

  // Get unique genres from tracks, filtering out undefined values
  const genres = Array.from(
    new Set(
      allTracks
        .map(track => track.metadata?.genre)
        .filter((genre): genre is string => typeof genre === 'string')
    )
  );

  return (
    <MusicCollectionLayout
      title="Music Collection"
      description="Browse and manage your music collection"
      viewMode={viewMode}
      onViewModeChange={setViewMode}
    >
      <div className="space-y-6">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          genres={genres}
        />

        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {sortedTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MusicCard track={track} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {sortedTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CompactMusicCard track={track} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MusicCollectionLayout>
  );
} 