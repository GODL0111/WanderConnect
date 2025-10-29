/**
 * Utility functions for gamification logic
 */

export interface LevelConfig {
  level: number;
  requiredExp: number;
  reward: number;
}

export const LEVEL_CONFIGS: LevelConfig[] = Array.from({ length: 50 }, (_, i) => ({
  level: i + 1,
  requiredExp: (i + 1) * 1000,
  reward: (i + 1) * 100,
}));

export const calculateLevel = (totalExp: number): number => {
  let level = 0;
  let remainingExp = totalExp;

  for (const config of LEVEL_CONFIGS) {
    if (remainingExp >= config.requiredExp) {
      remainingExp -= config.requiredExp;
      level = config.level;
    } else {
      break;
    }
  }

  return level;
};

export const getExpForNextLevel = (currentExp: number): number => {
  const currentLevel = calculateLevel(currentExp);
  const nextLevelConfig = LEVEL_CONFIGS[currentLevel];
  return nextLevelConfig ? nextLevelConfig.requiredExp : 0;
};

export const getExpProgressPercentage = (currentExp: number): number => {
  const level = calculateLevel(currentExp);
  const levelConfig = LEVEL_CONFIGS[level - 1];
  const nextLevelConfig = LEVEL_CONFIGS[level];

  if (!levelConfig || !nextLevelConfig) return 0;

  const currentLevelExp = currentExp - (levelConfig?.requiredExp || 0);
  const nextLevelExp = nextLevelConfig.requiredExp;

  return (currentLevelExp / nextLevelExp) * 100;
};

export const ACHIEVEMENT_TEMPLATES = {
  FIRST_POST: {
    id: 'first_post',
    title: 'Debut Adventurer',
    description: 'Share your first travel post',
    points: 50,
    icon: '🚀',
  },
  LEVEL_5: {
    id: 'level_5',
    title: 'Rising Star',
    description: 'Reach level 5',
    points: 200,
    icon: '⭐',
  },
  LEVEL_10: {
    id: 'level_10',
    title: 'Legend',
    description: 'Reach level 10',
    points: 500,
    icon: '👑',
  },
  FIVE_COUNTRIES: {
    id: 'five_countries',
    title: 'Globetrotter',
    description: 'Visit 5 different countries',
    points: 300,
    icon: '🌍',
  },
  HUNDRED_LIKES: {
    id: 'hundred_likes',
    title: 'Popular Explorer',
    description: 'Receive 100 likes on posts',
    points: 250,
    icon: '❤️',
  },
  PHOTOGRAPHY_PRO: {
    id: 'photography_pro',
    title: 'Photography Pro',
    description: 'Share 20 travel photos',
    points: 350,
    icon: '📸',
  },
};

export const BADGE_COLORS: Record<string, string> = {
  iconic: 'bg-yellow-500',
  'hidden-gem': 'bg-emerald-500',
  rare: 'bg-purple-500',
  'photography-pro': 'bg-pink-500',
  verified: 'bg-blue-500',
  trending: 'bg-red-500',
};
