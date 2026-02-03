import { District, TimelineEvent, StatData, GalleryItem } from './types';

// Cloudinary Base Configuration
export const CLOUDINARY_BASE = "https://res.cloudinary.com/dl7c8ts7f/image/upload/w_1200,q_auto,f_auto";
export const HERO_VIDEO = "https://res.cloudinary.com/dl7c8ts7f/video/upload/v1769787882/SIFAR_Video_Project_tjlysp.mp4";
export const HERO_IMAGE = `${CLOUDINARY_BASE}/shinchan_cenusc.jpg`;

export const FORMSPREE_ID = "mldqwnqr";

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: '1',
    date: '2025-01-01',
    title: 'Shunya (Zero)',
    description: 'The decision is made. The corporate tie is loosened. "Sifar" is not just a name; it is a state of mind.',
    image: 'https://picsum.photos/800/600?random=1',
  },
  {
    id: '2',
    date: '2025-06-15',
    title: 'The First Gear',
    description: 'Exploring the tribal heartlands. Mist-covered hills and ancient whispers.',
    image: 'https://picsum.photos/800/600?random=2',
  },
  {
    id: '3',
    date: '2025-12-01',
    title: 'Silence of the Sands',
    description: 'Camping under the starlit void. The desert teaches you that you are nothing.',
    image: 'https://picsum.photos/800/600?random=3',
  },
  {
    id: '3',
    date: '2025-12-01',
    title: 'Silence of the Sands',
    description: 'Camping under the starlit void. The desert teaches you that you are nothing.',
    image: 'https://picsum.photos/800/600?random=3',
  },
  {
    id: '4',
    date: '2025-12-01',
    title: 'Silence of the Sands',
    description: 'Camping under the starlit void. The desert teaches you that you are nothing.',
    image: 'https://picsum.photos/800/600?random=4',
  },
  {
    id: '5',
    date: '2025-12-01',
    title: 'Silence of the Sands',
    description: 'Camping under the starlit void. The desert teaches you that you are nothing.',
    image: 'https://picsum.photos/800/600?random=5',
  },
  {
    id: '6',
    date: '2025-12-01',
    title: 'Silence of the Sands',
    description: 'Camping under the starlit void. The desert teaches you that you are nothing.',
    image: 'https://picsum.photos/800/600?random=6',
  },
  {
    id: '7',
    date: '2025-12-01',
    title: 'Silence of the Sands',
    description: 'Camping under the starlit void. The desert teaches you that you are nothing.',
    image: 'https://picsum.photos/800/600?random=7',
  },
  {
    id: '8',
    date: '2025-12-01',
    title: 'Silence of the Sands',
    description: 'Camping under the starlit void. The desert teaches you that you are nothing.',
    image: 'https://picsum.photos/800/600?random=8',
  },
  {
    id: '9',
    date: '2025-12-01',
    title: 'Silence of the Sands',
    description: 'Camping under the starlit void. The desert teaches you that you are nothing.',
    image: 'https://picsum.photos/800/600?random=9',
  },
  {
    id: '10',
    date: '2025-12-01',
    title: 'Silence of the Sands',
    description: 'Camping under the starlit void. The desert teaches you that you are nothing.',
    image: 'https://picsum.photos/800/600?random=10',
  },
  {
    id: '11',
    date: '2025-12-01',
    title: 'Silence of the Sands',
    description: 'Camping under the starlit void. The desert teaches you that you are nothing.',
    image: 'https://picsum.photos/800/600?random=11',
  }
];

export const DISTRICTS_DATA: District[] = [];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 's1',
    type: 'image',
    url: 'https://picsum.photos/1200/800?random=10',
    caption: 'Sunrise over the Chilika Lake',
  },
  {
    id: 's2',
    type: 'image',
    url: 'https://picsum.photos/800/1200?random=11',
    caption: 'The Himalayan 450 packed and ready',
  },
  {
    id: 's3',
    type: 'image',
    url: 'https://picsum.photos/1200/800?random=12',
    caption: 'Local fisherman at work',
  },
  {
    id: 's4',
    type: 'image',
    url: 'https://picsum.photos/800/1200?random=13',
    caption: 'Temple bells in the evening',
  },
  {
    id: 's5',
    type: 'image',
    url: 'https://picsum.photos/1200/800?random=14',
    caption: 'Dust and Glory',
  },
  {
    id: 's6',
    type: 'image',
    url: 'https://picsum.photos/1200/800?random=15',
    caption: 'The road less taken',
  },
  {
    id: 's7',
    type: 'image',
    url: 'https://picsum.photos/1200/800?random=16',
    caption: 'The road less taken',
  }
];

// NOTE: Ye stats ab auto-calculate honge, par error na aaye isliye rakha hai
export const JOURNEY_STATS: StatData[] = [
  { name: 'Completed', value: 12, fill: '#f4c430' },
  { name: 'Remaining', value: 794, fill: '#2d2d2d' },
];