'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { FaArrowRight, FaMapMarkedAlt, FaUsers, FaStar } from 'react-icons/fa';

export const HeroSection: React.FC = () => {
  return (
    <motion.div className="min-h-[50vh] md:min-h-[60vh] flex items-center justify-center relative overflow-hidden w-full">
      {/* Animated background gradient */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 bg-gradient-to-br from-dark via-accent/20 to-secondary/20"
        />
        <motion.div
          animate={{
            backgroundPosition: ['100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 bg-gradient-to-tl from-transparent via-primary/10 to-transparent"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <span className="inline-block px-4 py-2 bg-primary/20 border border-primary rounded-full text-primary font-semibold text-sm mb-4">
              ✨ Adventure Awaits
            </span>
          </motion.div>

          <motion.h1 className="text-6xl md:text-7xl font-black leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="gradient-text block"
            >
              Wander,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="block"
            >
              Connect & Explore
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-300 leading-relaxed"
          >
            Join a global community of adventurers. Share experiences, earn badges, unlock achievements, and discover
            your next incredible journey through gamified travel exploration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.7)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-lg font-bold text-dark flex items-center gap-2 hover:shadow-glow-lg transition-all"
            >
              Start Your Journey <FaArrowRight />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-primary rounded-lg font-bold text-primary hover:bg-primary/20 transition-all"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 gap-6"
        >
          {[
            { icon: FaMapMarkedAlt, label: 'Explore', value: '195+' },
            { icon: FaUsers, label: 'Travelers', value: '50K+' },
            { icon: FaStar, label: 'Experiences', value: '10K+' },
            { icon: FaStar, label: 'Achievements', value: '500+' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="card-glass p-6 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="text-4xl mb-3"
              >
                <item.icon className="text-primary mx-auto" />
              </motion.div>
              <p className="text-2xl font-bold gradient-text mb-1">{item.value}</p>
              <p className="text-sm text-gray-400">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
