'use client';

import { MiniPlayer } from '@/components/audio-player/MiniPlayer';
import { CategoryHeader } from '@/components/music-collection/CategoryHeader';
import { ReactNode } from 'react';

interface MusicCollectionLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function MusicCollectionLayout({
  children,
  title,
  description,
}: MusicCollectionLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 container mx-auto px-4 py-8">
        <CategoryHeader
          title={title}
          description={description}
        />
        <div className="mt-8">
          {children}
        </div>
      </div>
      <MiniPlayer />
    </div>
  );
} 