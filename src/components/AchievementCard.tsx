'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  icon,
  unlocked,
  progress = 100,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={unlocked ? { scale: 1.05, y: -3 } : {}}
      className={`p-3 sm:p-4 md:p-6 rounded-lg border-2 transition-all w-full ${
        unlocked
          ? 'border-secondary bg-secondary/10 shadow-glow-secondary'
          : 'border-gray-600 bg-gray-900/20 opacity-50'
      }`}
    >
      <motion.div
        className={`text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 ${unlocked ? 'animate-bounce-custom' : ''}`}
        animate={unlocked ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {icon}
      </motion.div>

      <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 break-words">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3 break-words">{description}</p>

      {!unlocked && (
        <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      )}

      {unlocked && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-secondary text-white text-xs font-bold rounded-full"
        >
          ✓ Unlocked
        </motion.span>
      )}
    </motion.div>
  );
};
