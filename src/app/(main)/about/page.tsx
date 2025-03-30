import { OWNER_NAME } from '@/constants/owner-info';
import { getContentBySlug } from '@/db/content';
import parse from 'html-react-parser';

export default function AboutPage() {
  const aboutContent = getContentBySlug('about');

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            {aboutContent?.title || `About ${OWNER_NAME}`}
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {aboutContent?.description || 'Learn more about our journey and passion for music'}
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            {aboutContent?.content ? (
              <div className="prose max-w-none">
                {parse(aboutContent.content)}
              </div>
            ) : (
              <div className="prose max-w-none">
                <h2>The Journey</h2>
                <p>{OWNER_NAME} started their career with a passion for mixing beats and creating unforgettable music experiences.</p>
                <p>With years of experience, they have performed at numerous high-profile events and festivals.</p>
                
                <h2>Musical Style</h2>
                <p>Known for a unique blend of electronic, Bollywood, and hip-hop, {OWNER_NAME} creates seamless transitions and energetic sets that keep the crowd engaged.</p>
                
                <h2>Achievements</h2>
                <ul>
                  <li>Performed at over 500 events</li>
                  <li>Released 10 original tracks</li>
                  <li>Collaborated with top artists in the industry</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 