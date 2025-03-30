import { AnimatedHomeContent } from '@/components/sections/AnimatedHomeContent';
import { getFeaturedContent } from '@/db/content';
import { getFeaturedMedia } from '@/db/media';

export default function HomePage() {
  const featuredContent = getFeaturedContent();
  const featuredMedia = getFeaturedMedia().filter(media => media.type === 'audio').slice(0, 3);

  return (
    <div className="min-h-screen">
      <AnimatedHomeContent 
        featuredContent={featuredContent}
        featuredMedia={featuredMedia}
      />
    </div>
  );
}
