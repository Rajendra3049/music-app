/**
 * Static content data for the music app
 */

export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  content: string;
  slug: string;
  published: boolean;
  type: 'profile' | 'music' | 'video' | 'blog';
  createdAt: string;
  updatedAt: string;
  metadata?: {
    featured?: boolean;
    image?: string;
    [key: string]: unknown;
  };
}

/**
 * Static content data
 */
export const content: ContentItem[] = [
  {
    id: '1',
    title: 'About DJ VM Vishal',
    description: 'Learn more about DJ VM Vishal and his journey',
    content: `
      <h2>The Journey</h2>
      <p>DJ VM Vishal started his career in 2010 with a passion for mixing beats and creating unforgettable music experiences.</p>
      <p>With over a decade of experience, he has performed at numerous high-profile events and festivals across the country.</p>
      
      <h2>Musical Style</h2>
      <p>Known for his unique blend of electronic, Bollywood, and hip-hop, DJ VM Vishal creates seamless transitions and energetic sets that keep the crowd engaged.</p>
      
      <h2>Achievements</h2>
      <ul>
        <li>Performed at over 500 events</li>
        <li>Released 10 original tracks</li>
        <li>Collaborated with top artists in the industry</li>
      </ul>
    `,
    slug: 'about',
    published: true,
    type: 'profile',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    metadata: {
      featured: true,
      image: '/images/dj-profile.jpg'
    }
  },
  {
    id: '2',
    title: 'Latest Releases',
    description: 'Check out the latest music releases by DJ VM Vishal',
    content: `
      <p>Stay updated with the newest tracks and mixes from DJ VM Vishal. From energetic party anthems to soulful remixes, there's something for everyone.</p>
    `,
    slug: 'latest-releases',
    published: true,
    type: 'music',
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2023-02-01T00:00:00Z',
    metadata: {
      featured: true
    }
  },
  {
    id: '3',
    title: 'Upcoming Events',
    description: 'Find out where DJ VM Vishal will be performing next',
    content: `
      <h3>Summer Music Festival</h3>
      <p>Date: June 15, 2023</p>
      <p>Location: Beachside Arena, Miami</p>
      
      <h3>Club Night</h3>
      <p>Date: July 8, 2023</p>
      <p>Location: Skyline Lounge, New York</p>
      
      <h3>Wedding Season Special</h3>
      <p>Date: August 20-30, 2023</p>
      <p>Location: Various Venues</p>
    `,
    slug: 'upcoming-events',
    published: true,
    type: 'blog',
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2023-03-01T00:00:00Z'
  }
];

/**
 * Get content by slug
 */
export const getContentBySlug = (slug: string): ContentItem | undefined => {
  return content.find(item => item.slug === slug && item.published);
};

/**
 * Get content by type
 */
export const getContentByType = (type: ContentItem['type']): ContentItem[] => {
  return content.filter(item => item.type === type && item.published);
};

/**
 * Get featured content
 */
export const getFeaturedContent = (): ContentItem[] => {
  return content.filter(item => item.published && item.metadata?.featured);
}; 