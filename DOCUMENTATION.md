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
│   ├── video/            # Video components
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

### Video Components (`/components/video/`)

#### `VideoCarousel.tsx`
- Responsive video carousel component
- Features:
  - Smooth horizontal scrolling
  - Dynamic selection indicators
  - Playing state animations
  - Edge card visibility handling
  - Responsive navigation arrows
- Props:
  ```typescript
  interface VideoCarouselProps {
    videos: Video[];
    currentVideoId?: string;
    onVideoSelect: (video: Video) => void;
    isPlaying?: boolean;
  }
  ```
- Visual States:
  - Selected Card:
    - Glowing outline effect
    - Primary color accents
    - Scale animations
    - Music wave animation when playing
  - Non-selected Cards:
    - Subtle hover effects
    - Clean backdrop blur
    - Smooth transitions
  - Playing State:
    - Animated equalizer bars
    - Pulsing effects
    - Enhanced visual feedback
  - Navigation:
    - Dynamic arrow visibility
    - Smooth scroll behavior
    - Safe area handling
  - Accessibility:
    - Keyboard navigation
    - ARIA labels
    - Focus management

#### `NowPlayingEqualizer.tsx`
- Animated equalizer component
- Features:
  - Dynamic bar animations
  - Synchronized movement
  - Customizable colors
- Props:
  ```typescript
  interface NowPlayingEqualizerProps {
    className?: string;
    barCount?: number;
    color?: string;
  }
  ```

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
  - Enhanced hover animations
  - Play button overlay with animations
  - Truncation with tooltips
  - Active state styling with glow effects
  - Playing state indicators
- Props:
  ```typescript
  interface GridCardProps {
    track: LatestRelease;
    isActive?: boolean;
    isPlaying?: boolean;
    className?: string;
  }
  ```

#### `FeaturedCard.tsx`
- Larger card for featured tracks
- Features:
  - Rich metadata display
  - Animated description truncation
  - Genre and release date tags
  - Enhanced hover effects
  - Playing state animations
- Props:
  ```typescript
  interface FeaturedCardProps {
    track: LatestRelease;
    isPlaying?: boolean;
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
  - Rich content support
- Props:
  ```typescript
  interface TooltipWrapperProps {
    children: React.ReactNode;
    content: string | React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    delayDuration?: number;
    className?: string;
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

### `Video.ts`
```typescript
interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  views: number;
  description?: string;
}
```

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

## Visual Design System

### Card States
- Normal State:
  - Clean background
  - Subtle shadows
  - Standard spacing
- Hover State:
  - Scale transform
  - Enhanced shadows
  - Backdrop blur
- Selected State:
  - Glowing outline
  - Primary color accents
  - Elevated z-index
- Playing State:
  - Animated indicators
  - Music wave visualization
  - Pulsing effects

### Animations
- Hover Animations:
  - Scale: 1.02
  - Duration: 0.2s
  - Smooth easing
- Selection Animations:
  - Outline glow
  - Pulse effect
  - Spring transitions
- Playing Animations:
  - Music wave bars
  - Synchronized movement
  - Infinite loop

### Layout & Spacing
- Card Dimensions:
  - Width: 300px
  - Aspect ratio: 16:9 (video)
- Spacing System:
  - Gap between cards: 1.5rem
  - Padding: 1rem
  - Safe area insets
- Container Layout:
  - Overflow handling
  - Edge visibility
  - Responsive margins

### Color System
- Primary Colors:
  - Active: primary-500
  - Hover: primary-400
  - Glow: primary-500/30
- Background Colors:
  - Base: gray-900
  - Hover: gray-800
  - Selected: gray-800/80
- Text Colors:
  - Primary: white
  - Secondary: gray-400
  - Accent: primary-400

## Best Practices & Conventions

### Component Structure
- Consistent props interface naming
- Clear component responsibility
- Proper TypeScript typing
- Responsive design patterns

### Animation Guidelines
- Use spring animations for natural movement
- Consistent timing functions
- Performance-optimized transforms
- Proper cleanup on unmount

### Accessibility Features
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

### Performance Optimizations
- Efficient re-renders
- Proper event cleanup
- Optimized animations
- Lazy loading where appropriate

## Current Implementation Status

### Completed Features
- ✅ Video carousel with advanced animations
- ✅ Dynamic selection indicators
- ✅ Playing state visualizations
- ✅ Responsive layout handling
- ✅ Edge card visibility
- ✅ Music wave animations
- ✅ Enhanced tooltip system
- ✅ Improved card interactions

### In Progress
- 🔄 User authentication
- 🔄 Download system
- 🔄 Playlist management

### Planned Features
- ⏳ Social media integration
- ⏳ Advanced audio visualizations
- ⏳ User profile system

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