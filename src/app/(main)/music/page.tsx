import { AlbumArt } from '@/components/common/AlbumArt';
import { OWNER_NAME } from '@/constants/owner-info';
import { getMediaByType } from '@/db/media';

export default function MusicPage() {
  const audioTracks = getMediaByType('audio');
  console.log("🚀 ~ MusicPage ~ audioTracks:", audioTracks)

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">
          Music Collection
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          Enjoy the latest tracks and mixes by {OWNER_NAME}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {audioTracks.map((track) => (
          <div key={track.id} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            {track.thumbnailUrl && (
              <AlbumArt 
                src={track.thumbnailUrl} 
                alt={track.title} 
              />
            )}
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{track.title}</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{track.description}</p>
              <div className="mt-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {track.metadata?.artist && (
                    <span>Artist: {track.metadata.artist}</span>
                  )}
                  {track.metadata?.genre && (
                    <span className="ml-4">Genre: {track.metadata.genre}</span>
                  )}
                </div>
                <div className="mt-4">
                  <audio className="w-full" controls src={track.url} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 