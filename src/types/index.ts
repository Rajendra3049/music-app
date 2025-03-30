export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface LatestRelease {
  id: string;
  title: string;
  artist: string;
  thumbnail?: string;
  audioUrl?: string;
  duration?: number;
  type: 'audio' | 'video';
  createdAt: string;
  updatedAt: string;
}

// Alias MediaItem to LatestRelease for backward compatibility
export type MediaItem = LatestRelease; 