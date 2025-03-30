'use client';

import Image from 'next/image';
import { useState } from 'react';

interface AlbumArtProps {
  src: string;
  alt: string;
}

export function AlbumArt({ src, alt }: AlbumArtProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative h-48 w-full bg-indigo-100 dark:bg-indigo-900">
      {!imageError && (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
} 