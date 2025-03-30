export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaItem {
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