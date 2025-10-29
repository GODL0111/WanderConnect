'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { FaTrophy, FaFire, FaStar, FaMedal } from 'react-icons/fa';

interface GamificationWidgetProps {
  level: number;
  experience: number;
  points: number;
  badges: number;
}

export const GamificationWidget: React.FC<GamificationWidgetProps> = ({
  level,
  experience,
  points,
  badges,
}) => {
  const maxExp = 1000;
  const expPercentage = (experience % maxExp) / maxExp * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card-glass p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 w-full"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold gradient-text truncate">Level {level}</h3>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="flex-shrink-0"
        >
          <FaTrophy className="text-2xl sm:text-3xl text-secondary" />
        </motion.div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs sm:text-sm">
          <span>Experience</span>
          <span className="text-primary text-xs sm:text-sm">{experience % maxExp} / {maxExp}</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2 sm:h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${expPercentage}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
          <FaFire className="text-orange-500 flex-shrink-0 text-sm sm:text-base" />
          <span className="text-sm sm:text-lg font-bold truncate">{points}</span>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
          <FaMedal className="text-yellow-500 flex-shrink-0 text-sm sm:text-base" />
          <span className="text-sm sm:text-lg font-bold truncate">{badges}</span>
        </div>
      </div>
    </motion.div>
  );
};
