import { OWNER_NAME } from '@/constants/owner-info';
import { getMediaByType } from '@/db/media';

export default function VideosPage() {
  const videos = getMediaByType('video');

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          Videos
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Watch performances and promos by {OWNER_NAME}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {videos.map((video) => (
          <div key={video.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">{video.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{video.description}</p>
              <div className="mt-4 aspect-video">
                <video
                  className="w-full h-full object-cover"
                  controls
                  poster={video.thumbnailUrl}
                  src={video.url}
                />
              </div>
              {video.metadata?.releaseDate && (
                <div className="mt-2 text-sm text-gray-500">
                  Released: {video.metadata.releaseDate}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 