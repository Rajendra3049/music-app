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
  audioUrl: string;
  coverImage: string;
  description?: string;
  releaseDate?: string;
  duration?: number;
  genre?: string;
  tags?: string[];
}

// Alias MediaItem to LatestRelease for backward compatibility
export type MediaItem = LatestRelease; 