/**
 * Example: How to use WanderConnect Gaming Features
 * 
 * This file demonstrates common patterns and usage examples
 */

// ============================================
// 1. USER STATE MANAGEMENT
// ============================================

import { useUserStore } from '@/store/userStore';

function ExampleUserManagement() {
  const { user, addExperience, addPoints, unlockBadge } = useUserStore();

  // Add experience when user completes an action
  const handlePostCreated = () => {
    addExperience(100); // +100 exp per post
    addPoints(50); // +50 points per post
  };

  // Unlock a badge
  const handleMilestone = () => {
    unlockBadge({
      id: 'first-post',
      name: 'Debut Adventurer',
      description: 'Share your first travel post',
      icon: '🚀',
      unlockedAt: new Date(),
    });
  };

  return (
    <div>
      <p>Level: {user?.level}</p>
      <p>Points: {user?.points}</p>
    </div>
  );
}

// ============================================
// 2. API INTEGRATION
// ============================================

import { apiService } from '@/services/api';

async function exampleApiUsage() {
  try {
    // Get all travel posts
    const postsResponse = await apiService.getTravelPosts(10, 0);
    const posts = postsResponse.data;

    // Like a post
    await apiService.likePost('post-id-123');

    // Get user achievements
    const achievementsResponse = await apiService.getUserAchievements('user-id');
    const achievements = achievementsResponse.data;

    // Get leaderboard
    const leaderboardResponse = await apiService.getLeaderboard(100);
    const topPlayers = leaderboardResponse.data;
  } catch (error) {
    console.error('API Error:', error);
  }
}

// ============================================
// 3. ANIMATION EXAMPLES
// ============================================

import { AnimatedCard, AnimatedButton, AnimatedText } from '@/components/AnimatedComponents';
import { motion } from 'framer-motion';

function ExampleAnimations() {
  return (
    <div>
      {/* Animated card with hover effect */}
      <AnimatedCard delay={0.1} hoverScale={1.05}>
        <h3>Achievement Unlocked!</h3>
      </AnimatedCard>

      {/* Animated button */}
      <AnimatedButton variant="primary" onClick={() => console.log('Clicked!')}>
        Share Adventure
      </AnimatedButton>

      {/* Word-by-word animated text */}
      <AnimatedText delay={0.5} className="text-2xl font-bold">
        Welcome to WanderConnect
      </AnimatedText>

      {/* Custom animation with Framer Motion */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-4xl"
      >
        🌍
      </motion.div>
    </div>
  );
}

// ============================================
// 4. GAMIFICATION LOGIC
// ============================================

import {
  calculateLevel,
  getExpProgressPercentage,
  ACHIEVEMENT_TEMPLATES,
  BADGE_COLORS,
} from '@/utils/gamification';

function ExampleGamification() {
  const userExp = 3500;

  // Calculate user level
  const level = calculateLevel(userExp);
  const expProgress = getExpProgressPercentage(userExp);

  // Access achievement templates
  const firstPostAchievement = ACHIEVEMENT_TEMPLATES.FIRST_POST;
  console.log(`Achievement: ${firstPostAchievement.title}`);
  console.log(`Points: ${firstPostAchievement.points}`);

  // Get badge colors
  const badgeColor = BADGE_COLORS['photography-pro']; // bg-pink-500

  return (
    <div>
      <p>Level: {level}</p>
      <p>Progress: {expProgress}%</p>
    </div>
  );
}

// ============================================
// 5. FORMATTING UTILITIES
// ============================================

import {
  formatPoints,
  formatDistance,
  formatDate,
  truncateText,
  generateInitials,
} from '@/utils/format';

function ExampleFormatting() {
  const formattedPoints = formatPoints(125000); // "125K"
  const formattedDistance = formatDistance(1500); // "1.5k km"
  const formattedDate = formatDate(new Date()); // "Just now"
  const truncated = truncateText('Long text here...', 10); // "Long text..."
  const initials = generateInitials('John Doe'); // "JD"

  return (
    <div>
      <p>Points: {formattedPoints}</p>
      <p>Distance: {formattedDistance}</p>
      <p>Posted: {formattedDate}</p>
      <p>Initials: {initials}</p>
    </div>
  );
}

// ============================================
// 6. COMPONENT COMPOSITION
// ============================================

import { GamificationWidget } from '@/components/GamificationWidget';
import { TravelPostCard } from '@/components/TravelPostCard';
import { AchievementCard } from '@/components/AchievementCard';

function ExampleComposition() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* User stats widget */}
      <GamificationWidget level={10} experience={3500} points={5000} badges={5} />

      {/* Travel post card */}
      <TravelPostCard
        id="1"
        title="Adventure in Japan"
        destination="Tokyo, Japan"
        image="https://images.unsplash.com/..."
        author="John Explorer"
        likes={342}
        comments={45}
        shares={12}
        badges={['Iconic', '⭐ 5-Star']}
        onLike={() => console.log('Liked!')}
      />

      {/* Achievement card */}
      <AchievementCard
        title="Globe Trotter"
        description="Visit 5 different countries"
        icon="🌍"
        unlocked={true}
        progress={100}
      />
    </div>
  );
}

// ============================================
// 7. INTERACTIVE PAGE EXAMPLE
// ============================================

import React, { useState } from 'react';

export function ExampleInteractivePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { addPoints, user } = useUserStore();

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      // Create post via API
      const response = await apiService.createTravelPost(new FormData());
      setPosts([response.data, ...posts]);

      // Award points
      addPoints(50);
      addExperience(100);
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <GamificationWidget
        level={user?.level || 1}
        experience={user?.experience || 0}
        points={user?.points || 0}
        badges={user?.badges.length || 0}
      />

      <button
        onClick={handleCreatePost}
        disabled={loading}
        className="btn-primary"
      >
        {loading ? 'Creating...' : 'Share Your Adventure'}
      </button>

      <div className="grid gap-4">
        {posts.map((post) => (
          <TravelPostCard key={post.id} {...post} />
        ))}
      </div>
    </motion.div>
  );
}

// ============================================
// 8. STYLING PATTERNS
// ============================================

function ExampleStyling() {
  return (
    <div className="space-y-4">
      {/* Primary button */}
      <button className="btn-primary">Primary Action</button>

      {/* Secondary button */}
      <button className="btn-secondary">Secondary Action</button>

      {/* Outline button */}
      <button className="btn-outline">Outline Button</button>

      {/* Glass card */}
      <div className="card-glass">
        <h3 className="gradient-text text-xl font-bold">
          Gradient Text Example
        </h3>
      </div>

      {/* Glowing shadow effect */}
      <div className="p-4 rounded-lg shadow-glow-lg bg-dark">
        Glowing Container
      </div>
    </div>
  );
}

// ============================================
// 9. CUSTOM HOOKS (Template for future)
// ============================================

import { useEffect } from 'react';

// Example hook for fetching posts
export function usePosts() {
  const [posts, setPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await apiService.getTravelPosts();
        setPosts(response.data);
      } catch (err) {
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
}

// ============================================
// 10. TYPE DEFINITIONS
// ============================================

interface TravelPost {
  id: string;
  title: string;
  destination: string;
  image: string;
  author: string;
  likes: number;
  comments: number;
  shares: number;
  badges?: string[];
  createdAt: Date;
}

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  level: number;
  experience: number;
  points: number;
  badges: any[];
  achievements: any[];
  followers: number;
  following: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

export type { TravelPost, UserProfile, Achievement };
