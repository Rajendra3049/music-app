'use client';

import Image from 'next/image';
import { useState } from 'react';

interface AlbumArtProps {
  src: string;
  alt: string;
}

export function AlbumArt({ src, alt }: AlbumArtProps) {
  const [imageError, setImageError] = useState(false);

  // Default placeholder image if src is a placeholder URL
  const isPlaceholder = src.includes('placeholder.com');
  const imageSrc = isPlaceholder ? '/images/default-album-art.jpg' : src;

  return (
    <div className="relative h-48 w-full bg-indigo-100 dark:bg-indigo-900">
      {!imageError ? (
        <Image
          src={imageSrc}
          alt={alt}
          width={400}
          height={400}
          className="object-cover w-full h-full"
          onError={() => setImageError(true)}
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl text-indigo-300 dark:text-indigo-600">
            🎵
          </div>
        </div>
      )}
    </div>
  );
} 