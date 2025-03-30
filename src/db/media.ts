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
    title: 'Summer Vibes Mix',
    type: 'audio',
    url: '/music/summer-vibes-mix.mp3',
    thumbnailUrl: '/images/summer-vibes-cover.jpg',
    description: 'A mix of the hottest summer tracks to keep the party going',
    metadata: {
      duration: '58:24',
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
    title: 'Bollywood Mashup 2023',
    type: 'audio',
    url: '/music/bollywood-mashup-2023.mp3',
    thumbnailUrl: '/images/bollywood-mashup-cover.jpg',
    description: 'The ultimate Bollywood mashup featuring the biggest hits of 2023',
    metadata: {
      duration: '1:12:35',
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
    title: 'Club Night Promo',
    type: 'video',
    url: '/videos/club-night-promo.mp4',
    thumbnailUrl: '/images/club-night-thumbnail.jpg',
    description: 'Official promo video for the monthly Club Night event',
    metadata: {
      duration: '1:30',
      releaseDate: '2023-05-20',
      featured: true
    },
    createdAt: '2023-05-20T00:00:00Z',
    updatedAt: '2023-05-20T00:00:00Z'
  },
  {
    id: '4',
    title: 'Chill House Session',
    type: 'audio',
    url: '/music/chill-house-session.mp3',
    thumbnailUrl: '/images/chill-house-cover.jpg',
    description: 'A relaxed house music session perfect for unwinding',
    metadata: {
      duration: '45:18',
      artist: 'DJ VM Vishal',
      releaseDate: '2023-08-05',
      genre: 'House'
    },
    createdAt: '2023-08-05T00:00:00Z',
    updatedAt: '2023-08-05T00:00:00Z'
  },
  {
    id: '5',
    title: 'DJ VM Vishal Live at Festival',
    type: 'video',
    url: '/videos/festival-performance.mp4',
    thumbnailUrl: '/images/festival-thumbnail.jpg',
    description: 'Highlights from the electrifying performance at Summer Festival 2023',
    metadata: {
      duration: '5:45',
      releaseDate: '2023-07-10'
    },
    createdAt: '2023-07-10T00:00:00Z',
    updatedAt: '2023-07-10T00:00:00Z'
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