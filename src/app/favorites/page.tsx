'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-t-indigo-600 border-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Your Favorites</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          {session?.user?.image && (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="h-10 w-10 rounded-full mr-4"
            />
          )}
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {session?.user?.name || "User"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {session?.user?.email || ""}
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <p className="text-gray-600 dark:text-gray-300">
            Your favorite music will appear here. Start by adding songs to your favorites!
          </p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder for favorite items */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="h-32 bg-gray-200 dark:bg-gray-600 rounded mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2 animate-pulse"></div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="h-32 bg-gray-200 dark:bg-gray-600 rounded mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2 animate-pulse"></div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="h-32 bg-gray-200 dark:bg-gray-600 rounded mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 