'use client';

import VideoCarousel from '@/components/youtube/VideoCarousel';
import {
  OWNER_BIOGRAPHY,
  OWNER_CAREER_HIGHLIGHTS,
  OWNER_FUN_FACTS,
  OWNER_NAME,
  OWNER_PROFESSION,
  OWNER_PROFILE_IMAGE,
  OWNER_SOCIAL,
  OWNER_YOUTUBE_VIDEO
} from '@/constants/owner-info';
import { motion } from 'framer-motion';
import { Award, Calendar, Instagram, Music2, Users, Youtube } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const socialLinks = [
  {
    name: 'Instagram',
    icon: Instagram,
    href: OWNER_SOCIAL.instagram.url,
    handle: OWNER_SOCIAL.instagram.handle
  },
  {
    name: 'YouTube',
    icon: Youtube,
    href: OWNER_SOCIAL.youtube.url,
    handle: OWNER_SOCIAL.youtube.handle
  }
];

const careerHighlights = OWNER_CAREER_HIGHLIGHTS.map(highlight => ({
  ...highlight,
  icon: highlight.icon === 'Award' ? Award : 
        highlight.icon === 'Users' ? Users : 
        highlight.icon === 'Calendar' ? Calendar : Award
}));

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

export default function AboutPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/youtube');
        const data = await response.json();
        if (data.videos) {
          setVideos(data.videos);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={OWNER_PROFILE_IMAGE}
            alt={OWNER_NAME}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative text-center z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400">
            {OWNER_NAME}
          </h1>
          <p className="mt-4 text-xl text-gray-300">{OWNER_PROFESSION}</p>
        </motion.div>
      </section>

      {/* Social Links */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-12 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={fadeInUp}
              >
                <link.icon className="w-6 h-6 text-purple-400" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  {link.handle}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Biography */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-12 px-4 sm:px-6"
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-white mb-6"
          >
            About
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-300 leading-relaxed"
          >
            {OWNER_BIOGRAPHY}
          </motion.p>
        </div>
      </motion.section>

      {/* Career Highlights */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-12 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-white mb-8 text-center"
          >
            Career Highlights
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careerHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                whileHover={{ y: -5 }}
              >
                <highlight.icon className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-400">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Videos Section */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-12 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-white mb-8 text-center"
          >
            Latest Performances
          </motion.h2>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : videos.length > 0 ? (
            <div className="px-12">
              <VideoCarousel videos={videos} />
            </div>
          ) : (
            <p className="text-center text-gray-400">No videos available at the moment.</p>
          )}
        </div>
      </motion.section>

      {/* Fun Facts */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-12 px-4 sm:px-6"
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-white mb-8 text-center"
          >
            Behind the Decks
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OWNER_FUN_FACTS.map((fact, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-3">
                  <Music2 className="w-5 h-5 text-purple-400" />
                  <p className="text-gray-300">{fact}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Video Section */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-12 px-4 sm:px-6"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="aspect-video rounded-xl overflow-hidden"
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${OWNER_YOUTUBE_VIDEO}`}
              title={`${OWNER_NAME} Performance`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}