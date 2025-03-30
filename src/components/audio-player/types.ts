export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  error: string | null;
  volume: number;
  isMuted: boolean;
}

export interface AudioPlayerProps {
  src: string;
  title: string;
  artist: string;
  coverImage: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (error: string) => void;
  onTimeUpdate?: (time: number) => void;
  className?: string;
}

export interface AudioControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  currentTime: number;
  duration: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal';
}

export interface AudioProgressProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export interface AudioVolumeProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'simple';
}

export interface AudioWaveformProps {
  isPlaying: boolean;
  barCount?: number;
  currentTime: number;
  duration: number;
  onSeek?: (time: number) => void;
  isDragging?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
} 