import { OWNER_DESCRIPTION, OWNER_NAME } from '@/constants/owner-info';

export default function HomePage() {
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
              {OWNER_DESCRIPTION}
            </p>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Latest Releases */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Latest Releases</h3>
              <p className="mt-2 text-sm text-gray-500">
                Check out my newest tracks and remixes
              </p>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
              <p className="mt-2 text-sm text-gray-500">
                See where I&apos;ll be performing next
              </p>
            </div>
          </div>

          {/* Music Collection */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Music Collection</h3>
              <p className="mt-2 text-sm text-gray-500">
                Browse through my complete discography
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 