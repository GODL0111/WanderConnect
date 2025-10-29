'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaSearch, FaUser, FaTrophy, FaCompass, FaHome } from 'react-icons/fa';
import { HeroSection } from '@/components/HeroSection';
import { GamificationWidget } from '@/components/GamificationWidget';
import { TravelPostCard } from '@/components/TravelPostCard';
import { AchievementCard } from '@/components/AchievementCard';
import { ParticleBackground } from '@/components/ParticleBackground';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const mockPosts = [
    {
      id: '1',
      title: 'Golden Hour at Santorini',
      destination: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=500&h=500&fit=crop',
      author: 'Sarah Explorer',
      likes: 342,
      comments: 45,
      shares: 12,
      badges: ['Iconic', '⭐ 5-Star'],
    },
    {
      id: '2',
      title: 'Trekking Through Bali Rainforest',
      destination: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537225228614-b19550c72612?w=500&h=500&fit=crop',
      author: 'Alex Adventurer',
      likes: 289,
      comments: 32,
      shares: 8,
      badges: ['Hidden Gem'],
    },
    {
      id: '3',
      title: 'Northern Lights Magic',
      destination: 'Iceland',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=500&fit=crop',
      author: 'Jordan Nomad',
      likes: 512,
      comments: 78,
      shares: 34,
      badges: ['Rare', 'Photography Pro'],
    },
  ];

  const mockAchievements = [
    {
      title: 'First Adventure',
      description: 'Complete your first travel post',
      icon: '🚀',
      unlocked: true,
      progress: 100,
    },
    {
      title: 'Globe Trotter',
      description: 'Visit 5 different countries',
      icon: '🌍',
      unlocked: true,
      progress: 100,
    },
    {
      title: 'Social Butterfly',
      description: 'Connect with 50 travelers',
      icon: '🦋',
      unlocked: false,
      progress: 65,
    },
    {
      title: 'Photo Master',
      description: 'Share 20 travel photos',
      icon: '📸',
      unlocked: false,
      progress: 45,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-dark via-darker to-dark overflow-x-hidden">
      <ParticleBackground />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-dark/80 border-b border-primary/20 w-full"
      >
        <div className="w-full px-2 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity }} className="flex-shrink-0">
              <FaCompass className="text-2xl sm:text-3xl text-primary" />
            </motion.span>
            <span className="text-lg sm:text-2xl font-black gradient-text truncate">WanderConnect</span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-white/5 border border-primary/30 focus:border-primary outline-none text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="p-1">
              <FaBell className="text-lg sm:text-xl text-primary hover:text-accent transition-colors" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="p-1">
              <FaUser className="text-lg sm:text-xl text-primary hover:text-accent transition-colors" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-16 sm:pt-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full max-w-full px-2 sm:px-3 md:px-4 pb-24 mx-auto">
        {/* Left Sidebar - Hidden on mobile */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:block md:col-span-1 space-y-3 sm:space-y-4"
        >
          <div className="card-glass p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
              <FaHome className="text-primary text-base sm:text-xl flex-shrink-0" />
              <span className="font-semibold text-sm sm:text-base truncate">Home</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
              <FaCompass className="text-accent text-base sm:text-xl flex-shrink-0" />
              <span className="font-semibold text-sm sm:text-base truncate">Explore</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">
              <FaTrophy className="text-secondary text-base sm:text-xl flex-shrink-0" />
              <span className="font-semibold text-sm sm:text-base truncate">Achievements</span>
            </motion.div>
          </div>

          <GamificationWidget level={12} experience={456} points={3420} badges={7} />
        </motion.aside>

        {/* Main Feed */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="col-span-1 md:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6 w-full"
        >
          <HeroSection />

          {/* Travel Posts */}
          <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6">Recent Adventures</h2>
            </motion.div>

            {mockPosts.map((post, idx) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + idx * 0.1 }} className="w-full">
                <TravelPostCard {...post} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Right Sidebar - Hidden on mobile */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block lg:col-span-1 space-y-4 sm:space-y-6"
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold gradient-text">Achievements</h3>
            {mockAchievements.map((achievement, idx) => (
              <AchievementCard key={idx} {...achievement} />
            ))}
          </motion.div>
        </motion.aside>
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-accent rounded-full shadow-glow-lg flex items-center justify-center text-2xl font-bold text-dark hover:shadow-glow-lg z-40"
      >
        +
      </motion.button>
    </main>
  );
}
