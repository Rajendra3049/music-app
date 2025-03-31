'use client';

import { motion } from 'framer-motion';
import { GridIcon, ListIcon } from 'lucide-react';

interface CategoryHeaderProps {
  title: string;
  description?: string;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function CategoryHeader({ 
  title, 
  description, 
  viewMode, 
  onViewModeChange 
}: CategoryHeaderProps) {
  return (
    <div className="px-4 py-5 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">
            {title}
          </h1>
          {description && (
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <motion.button
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-gray-700 text-primary-500'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => onViewModeChange('grid')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GridIcon className="w-5 h-5" />
          </motion.button>
          <motion.button
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-white dark:bg-gray-700 text-primary-500'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => onViewModeChange('list')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ListIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
} 