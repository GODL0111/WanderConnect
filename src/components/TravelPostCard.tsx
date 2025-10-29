'use client';

import { motion } from 'framer-motion';
import React from 'react';
import {
  FaMapMarkerAlt,
  FaUsers,
  FaCamera,
  FaCompass,
  FaHeart,
  FaShareAlt,
} from 'react-icons/fa';

interface TravelPostProps {
  id: string;
  title: string;
  destination: string;
  image: string;
  author: string;
  likes: number;
  comments: number;
  shares: number;
  badges?: string[];
  onLike?: () => void;
}

export const TravelPostCard: React.FC<TravelPostProps> = ({
  id,
  title,
  destination,
  image,
  author,
  likes,
  comments,
  shares,
  badges = [],
  onLike,
}) => {
  const [liked, setLiked] = React.useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="card-glass overflow-hidden group w-full"
    >
      <div className="relative overflow-hidden h-40 md:h-48 w-full">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />

        {badges.length > 0 && (
          <div className="absolute top-3 right-3 flex gap-2">
            {badges.map((badge, idx) => (
              <motion.span
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-secondary/90 rounded-full text-xs font-bold text-white"
              >
                {badge}
              </motion.span>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-xl font-bold gradient-text mb-1">{title}</h3>
          <div className="flex items-center text-sm text-primary gap-2">
            <FaMapMarkerAlt size={14} />
            <span>{destination}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <FaUsers size={14} />
            {author}
          </span>
          <FaCompass size={16} className="text-accent" />
        </div>

        <div className="flex items-center justify-around pt-3 border-t border-white/10">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="flex items-center gap-2 hover:text-secondary transition-colors"
          >
            <motion.div animate={liked ? { scale: [1, 1.5, 1] } : {}}>
              <FaHeart size={18} color={liked ? '#FF006E' : 'currentColor'} />
            </motion.div>
            <span className="text-sm">{likes}</span>
          </motion.button>

          <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
            <FaCamera size={18} />
            <span className="text-sm">{comments}</span>
          </div>

          <div className="flex items-center gap-2 hover:text-accent transition-colors cursor-pointer">
            <FaShareAlt size={18} />
            <span className="text-sm">{shares}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
