export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

export interface District {
  id: string;
  name: string;
  state: string;
  description: string;
  fullStory?: string;
  image: string;
  status: 'visited' | 'planned' | 'milestone' | 'transit';
  coordinates: [number, number];
  stats?: {
    daysSpent: number;
    distanceCovered: number;
  };
  quotes?: { text: string; author: string }[];
}

export interface StatData {
  name: string;
  value: number;
  fill: string;
  [key: string]: any;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  type: 'image' | 'video';
  videoUrl?: string;
  date?: string;
  location?: string;
  title?: string;
}

export enum NavigationItem {
  HOME = '/',
  TIMELINE = '/timeline',
  EXPLORE = '/explore',
  MAP = '/map',
  GALLERY = '/gallery',
  CONTACT = '/contact',
}