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
  description?: string;
}

// Alias MediaItem to LatestRelease for backward compatibility
export type MediaItem = LatestRelease; 