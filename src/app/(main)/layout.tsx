'use client';

import { ReactNode } from 'react';

export default function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <main>
        {children}
      </main>
    </div>
  )
} 