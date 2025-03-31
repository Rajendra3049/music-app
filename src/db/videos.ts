import { nanoid } from 'nanoid';

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  views: number;
  uploadDate: string;
}

export const videos: Video[] = [
  {
    id: nanoid(),
    title: "DJ KAWAL - TUJHE BHULA DIYA (MASHUP) | Anjaana Anjaani",
    description: "Experience the magic of Bollywood with this incredible mashup!",
    thumbnailUrl: "/videos/aigiri-nandini-cover.jpg",
    videoUrl: "/videos/Aigiri Nandini (Original Mix) | Video.mp4",
    duration: "4:07",
    views: 1200000,
    uploadDate: "2024-03-30"
  },
  {
    id: nanoid(),
    title: "BOLLYWOOD PARTY MASHUP 2024 | Diwali Edition",
    description: "The ultimate party mashup featuring the best Bollywood hits!",
    thumbnailUrl: "/videos/aigiri-nandini-cover.jpg",
    videoUrl: "/videos/Aigiri Nandini (Original Mix) | Video.mp4",
    duration: "5:30",
    views: 850000,
    uploadDate: "2024-03-25"
  },
  {
    id: nanoid(),
    title: "TUBA | Valentine Special 2024",
    description: "A romantic mashup perfect for Valentine's Day celebrations!",
    thumbnailUrl: "/videos/aigiri-nandini-cover.jpg",
    videoUrl: "/videos/Aigiri Nandini (Original Mix) | Video.mp4",
    duration: "4:45",
    views: 950000,
    uploadDate: "2024-02-14"
  },
  {
    id: nanoid(),
    title: "DIL CHAHTA HAI | Kawal Remix",
    description: "A fresh take on the classic Dil Chahta Hai!",
    thumbnailUrl: "/videos/aigiri-nandini-cover.jpg",
    videoUrl: "/videos/Aigiri Nandini (Original Mix) | Video.mp4",
    duration: "3:55",
    views: 750000,
    uploadDate: "2024-03-20"
  },
  {
    id: nanoid(),
    title: "PASOORI | Remix Version",
    description: "The viral hit Pasoori with a unique DJ twist!",
    thumbnailUrl: "/videos/aigiri-nandini-cover.jpg",
    videoUrl: "/videos/Aigiri Nandini (Original Mix) | Video.mp4",
    duration: "4:15",
    views: 1500000,
    uploadDate: "2024-03-15"
  }
]; 