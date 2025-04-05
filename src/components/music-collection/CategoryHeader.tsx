'use client';


interface CategoryHeaderProps {
  title: string;
  description?: string;
}

export function CategoryHeader({ 
  title, 
  description
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
      </div>
    </div>
  );
} 