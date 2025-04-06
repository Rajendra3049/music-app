# DJ VM Vishal Music Website - Directory Structure

music-app/
├── .git/                                # Git repository
├── .github/                             # GitHub configuration
│   └── workflows/                       # GitHub Actions workflows
│       ├── ci.yml                       # CI workflow
│       └── deploy.yml                   # Deployment workflow
├── .husky/                              # Husky git hooks
│   ├── pre-commit                       # Pre-commit hook
│   └── pre-push                         # Pre-push hook
├── .next/                               # Next.js build output (gitignored)
├── .vscode/                             # VS Code configuration
│   ├── extensions.json                  # Recommended extensions
│   ├── launch.json                      # Debugging configuration
│   └── settings.json                    # Editor settings
├── node_modules/                        # Dependencies (gitignored)
├── public/                              # Static public assets
│   ├── favicon.ico                      # Favicon
│   ├── images/                          # Static images
│   │   ├── artist.png                   # Artist image
│   │   ├── aigiri-nandini-cover.jpg     # Album cover
│   │   ├── shiva-shiva-shankara-cover.jpg # Album cover
│   │   └── default-cover.jpg            # Default album cover
│   ├── music/                           # Audio files
│   │   └── aigiri-nandini.mp3           # Sample audio
│   └── videos/                          # Video files
│       └── sample-video.mp4             # Sample video
├── src/                                 # Source code
│   ├── features/                        # Feature-based modules
│   │   ├── audio/                       # Audio player feature
│   │   │   ├── components/              # Feature-specific components
│   │   │   │   ├── AudioControls.tsx    # Playback controls
│   │   │   │   ├── AudioPlayer.tsx      # Main audio player
│   │   │   │   ├── AudioProgress.tsx    # Progress bar
│   │   │   │   ├── AudioVolume.tsx      # Volume control
│   │   │   │   ├── AudioWaveform.tsx    # Audio visualization
│   │   │   │   ├── MiniPlayer.tsx       # Minimized player
│   │   │   │   └── PlayButton.tsx       # Play/pause button
│   │   │   ├── hooks/                   # Feature-specific hooks
│   │   │   │   └── useAudioPlayer.ts    # Audio player hook
│   │   │   ├── types/                   # Feature-specific types
│   │   │   │   └── audio.ts             # Audio type definitions
│   │   │   ├── utils/                   # Feature-specific utilities
│   │   │   │   └── audioUtils.ts        # Audio helper functions
│   │   │   ├── context.tsx              # Audio context provider
│   │   │   └── index.ts                 # Public API exports
│   │   │
│   │   ├── music/                       # Music collection feature
│   │   │   ├── components/              # Feature-specific components
│   │   │   │   ├── cards/               # Card components
│   │   │   │   │   ├── FeaturedCard.tsx # Featured music card
│   │   │   │   │   ├── GridCard.tsx     # Grid item card
│   │   │   │   │   └── CompactCard.tsx  # Compact music card
│   │   │   │   ├── collection/          # Collection components
│   │   │   │   │   ├── FilterBar.tsx    # Music filtering
│   │   │   │   │   ├── MusicGrid.tsx    # Grid layout
│   │   │   │   │   └── CategoryHeader.tsx # Section header
│   │   │   │   └── sections/            # Page sections
│   │   │   │       ├── Hero.tsx         # Hero section
│   │   │   │       ├── LatestReleases.tsx # Latest releases
│   │   │   │       └── TopTrack.tsx     # Top track section
│   │   │   ├── hooks/                   # Feature-specific hooks
│   │   │   │   └── useMusicCollection.ts # Music collection hook
│   │   │   ├── types/                   # Feature-specific types
│   │   │   │   └── music.ts             # Music type definitions
│   │   │   ├── utils/                   # Feature-specific utilities
│   │   │   │   └── musicUtils.ts        # Music helper functions
│   │   │   └── index.ts                 # Public API exports
│   │   │
│   │   ├── video/                       # Video feature
│   │   │   ├── components/              # Feature-specific components
│   │   │   │   ├── NowPlayingEqualizer.tsx # Playing indicator
│   │   │   │   ├── VideoCard.tsx        # Video card
│   │   │   │   ├── VideoCarousel.tsx    # Video carousel
│   │   │   │   └── VideoPlayer.tsx      # Video player
│   │   │   ├── hooks/                   # Feature-specific hooks
│   │   │   │   └── useVideoPlayer.ts    # Video player hook
│   │   │   ├── types/                   # Feature-specific types
│   │   │   │   └── video.ts             # Video type definitions
│   │   │   ├── utils/                   # Feature-specific utilities
│   │   │   │   └── videoUtils.ts        # Video helper functions 
│   │   │   └── index.ts                 # Public API exports
│   │   │
│   │   └── three/                       # 3D visualization feature
│   │       ├── components/              # Feature-specific components
│   │       │   ├── Scene3D.tsx          # 3D scene
│   │       │   └── Headphones3D.tsx     # 3D headphones model
│   │       ├── hooks/                   # Feature-specific hooks
│   │       │   └── useThreeScene.ts     # Three.js scene hook
│   │       ├── types/                   # Feature-specific types
│   │       │   └── three.ts             # Three.js type definitions
│   │       ├── utils/                   # Feature-specific utilities
│   │       │   └── threeUtils.ts        # Three.js helper functions
│   │       └── index.ts                 # Public API exports
│   │
│   ├── shared/                          # Shared resources
│   │   ├── components/                  # Shared components
│   │   │   ├── ui/                      # Base UI components
│   │   │   │   ├── button.tsx           # Button component
│   │   │   │   ├── card.tsx             # Card component
│   │   │   │   ├── input.tsx            # Input component
│   │   │   │   ├── select.tsx           # Select component
│   │   │   │   ├── tooltip.tsx          # Tooltip component
│   │   │   │   └── index.ts             # UI components exports
│   │   │   ├── layout/                  # Layout components
│   │   │   │   ├── Footer.tsx           # Footer component
│   │   │   │   ├── Header.tsx           # Header component
│   │   │   │   ├── Navigation.tsx       # Navigation component
│   │   │   │   └── index.ts             # Layout components exports
│   │   │   └── providers/               # Provider components
│   │   │       ├── ThemeProvider.tsx    # Theme provider
│   │   │       └── index.ts             # Provider exports
│   │   │
│   │   ├── config/                      # Configuration
│   │   │   ├── site.ts                  # Site configuration
│   │   │   ├── theme.ts                 # Theme configuration
│   │   │   └── index.ts                 # Configuration exports
│   │   │
│   │   ├── constants/                   # Constants
│   │   │   ├── owner-info.ts            # DJ information
│   │   │   ├── routes.ts                # Route definitions
│   │   │   └── index.ts                 # Constants exports
│   │   │
│   │   ├── hooks/                       # Shared hooks
│   │   │   ├── useCarouselGestures.ts   # Carousel gestures hook
│   │   │   ├── useMediaQuery.ts         # Media query hook
│   │   │   ├── useTheme.ts              # Theme hook
│   │   │   └── index.ts                 # Hooks exports
│   │   │
│   │   ├── lib/                         # Utilities
│   │   │   ├── animations.ts            # Animation utilities
│   │   │   ├── api.ts                   # API utilities
│   │   │   ├── formatting.ts            # Formatting utilities
│   │   │   ├── storage.ts               # Storage utilities
│   │   │   ├── utils.ts                 # General utilities
│   │   │   └── index.ts                 # Utilities exports
│   │   │
│   │   ├── services/                    # Service integrations
│   │   │   ├── youtube.ts               # YouTube service
│   │   │   └── index.ts                 # Services exports
│   │   │
│   │   └── types/                       # Shared types
│   │       ├── common.ts                # Common types
│   │       └── index.ts                 # Types exports
│   │
│   ├── data/                            # Data sources
│   │   ├── media.ts                     # Media data
│   │   ├── videos.ts                    # Video data
│   │   ├── content.ts                   # Content data
│   │   └── index.ts                     # Data exports
│   │
│   ├── app/                             # Next.js App Router
│   │   ├── (main)/                      # Main group
│   │   │   ├── page.tsx                 # Home page
│   │   │   ├── about/                   # About page
│   │   │   │   └── page.tsx             # About page content
│   │   │   ├── music/                   # Music pages
│   │   │   │   ├── page.tsx             # Music index
│   │   │   │   └── [id]/                # Music detail
│   │   │   │       └── page.tsx         # Music item page
│   │   │   ├── videos/                  # Videos pages
│   │   │   │   ├── page.tsx             # Videos index
│   │   │   │   └── [id]/                # Video detail
│   │   │   │       └── page.tsx         # Video item page
│   │   │   └── contact/                 # Contact page
│   │   │       └── page.tsx             # Contact page content
│   │   ├── api/                         # API routes
│   │   │   ├── youtube/                 # YouTube API
│   │   │   │   └── route.ts             # YouTube API route
│   │   │   └── media/                   # Media API
│   │   │       └── route.ts             # Media API route
│   │   ├── layout.tsx                   # Root layout
│   │   ├── page.tsx                     # Root page (redirect)
│   │   └── globals.css                  # Global styles
│   │
│   └── styles/                          # Styling
│       ├── theme.css                    # Theme variables
│       └── utilities.css                # Utility styles
│
├── docs/                                # Documentation
│   ├── architecture.md                  # Architecture overview
│   ├── components.md                    # Component documentation
│   ├── api.md                           # API documentation
│   └── development.md                   # Development guide
│
├── scripts/                             # Build/dev scripts
│   ├── generate-icons.js                # Icon generation script
│   └── seed-data.js                     # Data seeding script
│
├── .env                                 # Environment variables
├── .env.example                         # Example environment variables
├── .eslintrc.json                       # ESLint configuration
├── .gitignore                           # Git ignore rules
├── .prettierrc                          # Prettier configuration
├── components.json                      # Shadcn UI configuration
├── DOCUMENTATION.md                     # Project documentation
├── next-env.d.ts                        # Next.js TypeScript definitions
├── next.config.ts                       # Next.js configuration
├── package-lock.json                    # Dependency lock file
├── package.json                         # Project configuration
├── postcss.config.js                    # PostCSS configuration
├── README.md                            # Project README
├── tailwind.config.ts                   # Tailwind CSS configuration
└── tsconfig.json                        # TypeScript configuration