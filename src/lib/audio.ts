/**
 * Format time in seconds to mm:ss format
 * @param time Time in seconds
 * @returns Formatted time string in mm:ss format
 */
export function formatTime(time: number): string {
  if (!time || isNaN(time)) return '0:00';
  
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
} 