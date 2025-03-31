'use client';

import { MiniPlayer } from '@/components/audio-player/MiniPlayer';
import { CategoryHeader } from '@/components/music-collection/CategoryHeader';
import { ReactNode } from 'react';

interface MusicCollectionLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function MusicCollectionLayout({
  children,
  title,
  description,
  viewMode,
  onViewModeChange,
}: MusicCollectionLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 container mx-auto px-4 py-8">
        <CategoryHeader
          title={title}
          description={description}
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
        />
        <div className="mt-8">
          {children}
        </div>
      </div>
      <MiniPlayer />
    </div>
  );
} 