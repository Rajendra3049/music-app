import { Button } from '@/components/ui/button';
import { OWNER_NAME } from '@/constants/owner-info';
import { ROUTES, ROUTES_KEYS } from '@/constants/routes';
import { getFeaturedContent } from '@/db/content';
import { getFeaturedMedia } from '@/db/media';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const featuredContent = getFeaturedContent();
  const featuredMedia = getFeaturedMedia();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Welcome to</span>
              <span className="block text-indigo-600">{OWNER_NAME}</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Experience the best of music with {OWNER_NAME}. From electrifying performances to the latest tracks,
              we bring you the ultimate music experience.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href={ROUTES[ROUTES_KEYS._MUSIC]}>
                  <Button className="w-full">
                    Listen Now
                  </Button>
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href={ROUTES[ROUTES_KEYS._CONTACT]}>
                  <Button variant="outline" className="w-full">
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Content Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Featured Content</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredContent.map((item) => (
            <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500">
                  {item.description}
                </p>
                <div className="mt-4">
                  <Link href={`/${item.type}/${item.slug}`} className="text-indigo-600 hover:text-indigo-900">
                    Read more &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Media Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Latest Releases</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredMedia
              .filter(media => media.type === 'audio')
              .slice(0, 3)
              .map((item) => (
                <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg">
                  {item.thumbnailUrl && (
                    <div className="relative h-48 w-full">
                      <Image 
                        src={item.thumbnailUrl} 
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                    <div className="mt-4">
                      <audio className="w-full" controls src={item.url} />
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-12 text-center">
            <Link href={ROUTES[ROUTES_KEYS._MUSIC]}>
              <Button variant="outline">
                View All Music
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
