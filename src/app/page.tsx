import { HomeWrapper } from '@/components/home/HomeWrapper';
import { getFeaturedContent } from '@/db/content';
import { getLatestReleaseAudio } from '@/db/media';
import { MediaItem as FrontendMediaItem } from '@/types';

export default function HomePage() {
  const featuredContent = getFeaturedContent();
  const dbFeaturedMedia = getLatestReleaseAudio();

  // Transform db media items to frontend media items
  const featuredMedia: FrontendMediaItem[] = dbFeaturedMedia.map(dbMedia => ({
    id: dbMedia.id,
    title: dbMedia.title,
    artist: dbMedia.metadata?.artist || 'Unknown Artist',
    coverImage: dbMedia.thumbnailUrl || '/images/default-cover.jpg',
    audioUrl: dbMedia.url,
    duration: dbMedia.metadata?.duration ? parseInt(dbMedia.metadata.duration) : undefined,
    description: dbMedia.description,
    releaseDate: dbMedia.metadata?.releaseDate,
    genre: dbMedia.metadata?.genre,
    tags: []
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
