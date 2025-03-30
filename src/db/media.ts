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
    thumbnailUrl: 'https://via.placeholder.com/150',
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
    url: '/music/aigiri-nandini.mp3',
    thumbnailUrl: 'https://via.placeholder.com/150',
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
  {
    id: '3',
    title: 'Divine Melody',
    type: 'audio',
    url: '/music/aigiri-nandini.mp3',
    thumbnailUrl: 'https://via.placeholder.com/150',
    description: 'A soothing divine melody for relaxation and meditation',
    metadata: {
      artist: 'DJ VM Vishal',
      releaseDate: '2023-08-10',
      genre: 'Ambient',
      featured: false
    },
    createdAt: '2023-08-10T00:00:00Z',
    updatedAt: '2023-08-10T00:00:00Z'
  },
  {
    id: '4',
    title: 'Energize Beats',
    type: 'audio',
    url: '/music/aigiri-nandini.mp3',
    thumbnailUrl: 'https://via.placeholder.com/150',
    description: 'High-energy beats to keep you pumped throughout the day',
    metadata: {
      artist: 'DJ VM Vishal',
      releaseDate: '2023-09-05',
      genre: 'EDM',
      featured: true
    },
    createdAt: '2023-09-05T00:00:00Z',
    updatedAt: '2023-09-05T00:00:00Z'
  },
  {
    id: '5',
    title: 'Mystic Vibes',
    type: 'audio',
    url: '/music/aigiri-nandini.mp3',
    thumbnailUrl: 'https://via.placeholder.com/150',
    description: 'Mystical and deep vibes to enhance your spiritual journey',
    metadata: {
      artist: 'DJ VM Vishal',
      releaseDate: '2023-10-12',
      genre: 'Chillout',
      featured: false
    },
    createdAt: '2023-10-12T00:00:00Z',
    updatedAt: '2023-10-12T00:00:00Z'
  }
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