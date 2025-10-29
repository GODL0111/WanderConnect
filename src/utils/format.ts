/**
 * Format utilities for display
 */

export const formatPoints = (points: number): string => {
  if (points >= 1000000) {
    return `${(points / 1000000).toFixed(1)}M`;
  }
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}K`;
  }
  return points.toString();
};

export const formatDistance = (km: number): string => {
  if (km >= 1000) {
    return `${(km / 1000).toFixed(1)}k km`;
  }
  return `${km} km`;
};

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = (now.getTime() - d.getTime()) / 1000;

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return d.toLocaleDateString();
};

export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const generateInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
