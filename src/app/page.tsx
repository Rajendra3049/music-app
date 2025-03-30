import { HomeWrapper } from '@/components/home/HomeWrapper';
import { getFeaturedContent } from '@/db/content';
import { getFeaturedMedia } from '@/db/media';
import { MediaItem as FrontendMediaItem } from '@/types';

export default function HomePage() {
  const featuredContent = getFeaturedContent();
  const dbFeaturedMedia = getFeaturedMedia().filter(media => media.type === 'audio').slice(0, 3);

  // Transform db media items to frontend media items
  const featuredMedia: FrontendMediaItem[] = dbFeaturedMedia.map(dbMedia => ({
    id: dbMedia.id,
    title: dbMedia.title,
    artist: dbMedia.metadata?.artist || 'Unknown Artist',
    thumbnail: dbMedia.thumbnailUrl,
    audioUrl: dbMedia.url,
    duration: dbMedia.metadata?.duration ? parseInt(dbMedia.metadata.duration) : undefined,
    type: dbMedia.type as 'audio' | 'video',
    createdAt: dbMedia.createdAt,
    updatedAt: dbMedia.updatedAt
  }));

  return (
    <div className="min-h-screen">
      <HomeWrapper 
        featuredContent={featuredContent}
        featuredMedia={featuredMedia}
      />
    </div>
  );
}
