// Owner information constants
export const OWNER_NAME = 'DJ VM Vishal';
export const OWNER_PROFESSION = 'Electronic Music Producer & DJ';
export const OWNER_EMAIL = 'contact@djvmvishal.com';
export const OWNER_PHONE = '+91 1234567890';
export const OWNER_LOCATION = 'Mumbai, India';

// Social Media Links
export const OWNER_SOCIAL = {
  instagram: {
    url: 'https://www.instagram.com/dj_vm_vishal/',
    handle: '@dj_vm_vishal'
  },
  youtube: {
    url: 'https://www.youtube.com/@DjVmVishal',
    handle: 'DJ VM Vishal',
    channelId: 'UClxGJeGJm8jUeQOzVuHBduQ', // Replace with your actual YouTube channel ID
    apiKey: process.env.YOUTUBE_API_KEY // Will be used to fetch videos
  },
  facebook: 'https://facebook.com/djvmvishal',
  twitter: 'https://twitter.com/djvmvishal',
};

// Contact Form Options
export const CONTACT_SUBJECTS = [
  'Booking Inquiry',
  'Collaboration',
  'Feedback',
  'Other'
];

// Biography
export const OWNER_BIOGRAPHY = 'DJ VM Vishal is a dynamic force in the electronic music scene, known for his innovative sound design and electrifying performances. With a career spanning over a decade, he has evolved from a passionate bedroom DJ to a recognized name in the industry. His unique ability to blend different genres while maintaining a signature sound has earned him a dedicated following and critical acclaim.';

// Career Highlights
export const OWNER_CAREER_HIGHLIGHTS = [
  {
    icon: 'Award',
    title: 'Award-Winning Remixes',
    description: 'Recognized for innovative sound design and production quality'
  },
  {
    icon: 'Users',
    title: 'Global Collaborations',
    description: 'Worked with international artists and producers'
  },
  {
    icon: 'Calendar',
    title: 'Major Events',
    description: 'Headlined at prestigious venues and festivals'
  }
];

// Fun Facts
export const OWNER_FUN_FACTS = [
  'Started DJing at the age of 16',
  'Has produced over 100 tracks',
  'Favorite genre to mix: Progressive House',
  'Signature move: Seamless transitions between genres'
];

// Profile Image
export const OWNER_PROFILE_IMAGE = '/images/artist.png';

// Featured Video (fallback if API fails)
export const OWNER_YOUTUBE_VIDEO = 'i4A6z8mfgF4';

// Contact Page Content
export const CONTACT_PAGE = {
  title: "Let's Connect",
  subtitle: "Get in touch for bookings, collaborations, or just to say hello!",
  formTitle: "Send a Message",
  formSubtitle: "I'll get back to you as soon as possible",
  locationTitle: "Based in",
  locationSubtitle: "Available for events worldwide",
  socialTitle: "Connect on Social Media",
  socialSubtitle: "Follow for latest updates and performances"
}; 