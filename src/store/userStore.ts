import { create } from 'zustand';

export interface UserStats {
  level: number;
  experience: number;
  points: number;
  badges: Badge[];
  achievements: Achievement[];
  travelsMiles: number;
  connectionsCount: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  completedAt?: Date;
}

interface UserStore {
  user: UserStats | null;
  setUser: (user: UserStats) => void;
  addExperience: (amount: number) => void;
  addPoints: (amount: number) => void;
  unlockBadge: (badge: Badge) => void;
  completeAchievement: (achievement: Achievement) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  addExperience: (amount) =>
    set((state) => {
      if (!state.user) return state;
      const newExp = state.user.experience + amount;
      const newLevel = Math.floor(newExp / 1000) + 1;
      return {
        user: {
          ...state.user,
          experience: newExp,
          level: newLevel,
        },
      };
    }),
  addPoints: (amount) =>
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          points: state.user.points + amount,
        },
      };
    }),
  unlockBadge: (badge) =>
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          badges: [...state.user.badges, badge],
        },
      };
    }),
  completeAchievement: (achievement) =>
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          points: state.user.points + achievement.reward,
          achievements: state.user.achievements.map((a) =>
            a.id === achievement.id ? { ...a, completed: true, completedAt: new Date() } : a
          ),
        },
      };
    }),
}));
