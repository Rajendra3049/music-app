'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid, LayoutList, Search } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedGenre: string;
  onGenreChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  genres: string[];
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  genres,
}: FilterBarProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by title or artist..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={selectedGenre} onValueChange={onGenreChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Genres" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genres</SelectItem>
          {genres.map((genre) => (
            <SelectItem key={genre} value={genre}>
              {genre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="artist">Artist</SelectItem>
          <SelectItem value="duration">Duration</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center gap-1 rounded-md border">
        <Button
          variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => onViewModeChange('grid')}
          className="rounded-none rounded-l-md"
        >
          <Grid className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => onViewModeChange('list')}
          className="rounded-none rounded-r-md"
        >
          <LayoutList className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 