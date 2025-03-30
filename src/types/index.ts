export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  type: string;
  slug: string;
}

export interface MediaItem {
  id: string;
  title: string;
  artist: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  duration?: number;
  type: 'audio' | 'video';
  tags?: string[];
} 