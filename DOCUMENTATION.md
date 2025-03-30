# DJ VM Vishal Music Website - Technical Documentation

## Table of Contents
1. [Project Structure](#project-structure)
2. [Core Components](#core-components)
3. [Context & Hooks](#context--hooks)
4. [Types & Interfaces](#types--interfaces)
5. [Utilities & Constants](#utilities--constants)
6. [Database & Models](#database--models)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (main)/            # Main layout routes
│   │   ├── page.tsx       # Home page
│   │   ├── music/         # Music section routes
│   │   └── layout.tsx     # Main layout wrapper
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── audio-player/      # Audio playback components
│   ├── music-cards/       # Music track card components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── context/              # React Context providers
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── db/                  # Mock database implementations
├── lib/                # Utility functions
└── constants/          # Application constants
```

## Core Components

### Audio Player Components (`/components/audio-player/`)

#### `AudioPlayer.tsx`
- Main audio playback component
- Features:
  - Play/pause control
  - Progress bar with seek functionality
  - Volume control
  - Track information display
  - Next/previous track controls
- Props:
  ```typescript
  interface AudioPlayerProps {
    className?: string;
  }
  ```

#### `PlayButton.tsx`
- Reusable play/pause button component
- Variants: default, minimal, featured
- Sizes: sm, md, lg
- Props:
  ```typescript
  interface PlayButtonProps {
    track: Track;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'minimal' | 'featured';
  }
  ```

#### `MiniPlayer.tsx`
- Persistent mini player component
- Fixed positioning at bottom
- Shows current track info and basic controls
- Props: None (uses AudioPlayerContext)

### Music Card Components (`/components/music-cards/`)

#### `GridCard.tsx`
- Card component for grid layout
- Features:
  - Hover animations
  - Play button overlay
  - Truncation with tooltips
  - Active state styling
- Props:
  ```typescript
  interface GridCardProps {
    track: LatestRelease;
    isActive?: boolean;
    className?: string;
  }
  ```

#### `FeaturedCard.tsx`
- Larger card for featured tracks
- Features:
  - Rich metadata display
  - Description with truncation
  - Genre and release date tags
  - Enhanced hover effects
- Props:
  ```typescript
  interface Props {
    track: LatestRelease;
    className?: string;
  }
  ```

#### `BaseCard.tsx`
- Base card component with common functionality
- Used as foundation for other card variants
- Props:
  ```typescript
  interface BaseCardProps {
    children: React.ReactNode;
    className?: string;
  }
  ```

### UI Components (`/components/ui/`)

#### `TooltipWrapper.tsx`
- Reusable tooltip component
- Features:
  - Customizable positioning
  - Delay duration
  - Fade animations
- Props:
  ```typescript
  interface Props {
    children: React.ReactNode;
    content: string;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    delayDuration?: number;
  }
  ```

## Context & Hooks

### AudioPlayerContext (`/context/AudioPlayerContext.tsx`)
- Manages global audio player state
- Features:
  - Current track management
  - Play state control
  - Queue management
  - Volume persistence
- Exposed methods:
  ```typescript
  interface AudioPlayerContextType {
    currentTrack: Track | null;
    isPlaying: boolean;
    volume: number;
    play: (track: Track) => void;
    pause: () => void;
    setVolume: (volume: number) => void;
    // ... other methods
  }
  ```

### Custom Hooks (`/hooks/`)

#### `useAudioPlayer.ts`
- Hook for audio player functionality
- Provides player controls and state
- Returns:
  ```typescript
  interface UseAudioPlayerReturn {
    isCurrentTrack: (id: string) => boolean;
    playerState: {
      isPlaying: boolean;
      currentTime: number;
      duration: number;
    };
    controls: {
      play: () => void;
      pause: () => void;
      seek: (time: number) => void;
    };
  }
  ```

## Types & Interfaces (`/types/`)

### `Track.ts`
```typescript
interface Track {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  audioUrl: string;
  duration: number;
}

interface LatestRelease extends Track {
  description?: string;
  genre?: string;
  releaseDate?: string;
}
```

## Utilities & Constants

### Audio Utils (`/lib/audio.ts`)
- Audio-related utility functions
- Features:
  - Time formatting
  - Audio URL validation
  - Duration calculations

### Constants (`/constants/`)
- Application-wide constants
- Includes:
  - API endpoints
  - Audio player settings
  - UI constants

## Database & Models (`/db/`)

### Mock Database (`/db/mockDb.ts`)
- Simulates database functionality
- Includes sample data for:
  - Tracks
  - Featured releases
  - Artists

## Current Implementation Status

### Completed Features
- ✅ Basic audio playback functionality
- ✅ Responsive music cards
- ✅ Mini player implementation
- ✅ Tooltip system
- ✅ Track information display

### In Progress
- 🔄 User authentication
- 🔄 Download system
- 🔄 Playlist management

### Planned Features
- ⏳ Social media integration
- ⏳ Advanced audio visualizations
- ⏳ User profile system

## Best Practices & Conventions

### Component Structure
- Consistent props interface naming
- Clear component responsibility
- Proper TypeScript typing
- Responsive design patterns

### Styling Approach
- Tailwind CSS utility classes
- Consistent spacing scale
- Responsive breakpoints
- Dark mode support

### State Management
- Context for global state
- Local state for component-specific data
- Proper prop drilling prevention
- Performance optimization

### Code Organization
- Feature-based folder structure
- Clear file naming conventions
- Consistent import ordering
- Proper code documentation

## Performance Considerations

### Optimizations Implemented
- Image optimization with Next.js
- Lazy loading of components
- Proper memo usage
- Event listener cleanup

### Accessibility Features
- ARIA labels
- Keyboard navigation
- Screen reader support
- Focus management

## Future Enhancements

### Planned Improvements
1. Enhanced audio visualization
2. Social sharing features
3. Advanced playlist management
4. User profile customization

### Technical Debt
- Performance optimization
- Test coverage
- Documentation updates
- Code refactoring

## Contributing Guidelines

### Development Workflow
1. Feature branch creation
2. Component development
3. Testing implementation
4. Documentation update
5. Pull request submission

### Code Standards
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Component documentation 