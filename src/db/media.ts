/**
 * Static media data for the music app
 */

export interface MediaItem {
  id: string;
  title: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnailUrl?: string;
  description?: string;
  metadata?: {
    duration?: string;
    artist?: string;
    album?: string;
    releaseDate?: string;
    genre?: string;
    featured?: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Static media data
 */
export const media: MediaItem[] = [
  {
    id: '1',
    title: 'Aigiri Nandini',
    type: 'audio',
    url: '/music/aigiri-nandini.mp3',
    thumbnailUrl: '/images/aigiri-nandini-cover.jpg',
    description: 'A mix of the Aigiri Nandini tracks to keep the party going',
    metadata: {
      artist: 'DJ VM Vishal',
      releaseDate: '2023-06-01',
      genre: 'Electronic/Pop',
      featured: true
    },
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2023-06-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Shiva Shiva Shankara',
    type: 'audio',
    url: '/music/shiva-shiva-shankara.webm',
    thumbnailUrl: '/images/shiva-shiva-shankara-cover.jpg',
    description: 'The Shiva Shiva Shankara mashup featuring the biggest hits of 2023',
    metadata: {
      artist: 'DJ VM Vishal',
      releaseDate: '2023-07-15',
      genre: 'Bollywood',
      featured: true
    },
    createdAt: '2023-07-15T00:00:00Z',
    updatedAt: '2023-07-15T00:00:00Z'
  },
];

/**
 * Get media by ID
 */
export const getMediaById = (id: string): MediaItem | undefined => {
  return media.find(item => item.id === id);
};

/**
 * Get media by type
 */
export const getMediaByType = (type: MediaItem['type']): MediaItem[] => {
  return media.filter(item => item.type === type);
};

/**
 * Get featured media
 */
export const getFeaturedMedia = (): MediaItem[] => {
  return media.filter(item => item.metadata?.featured);
}; 