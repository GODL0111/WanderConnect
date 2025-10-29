/**
 * API Service - Handle all backend communication
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class APIService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.client.post('/auth/login', { email, password });
  }

  async register(email: string, password: string, name: string) {
    return this.client.post('/auth/register', { email, password, name });
  }

  // Travel posts
  async getTravelPosts(limit = 10, offset = 0) {
    return this.client.get('/posts', { params: { limit, offset } });
  }

  async createTravelPost(data: FormData) {
    return this.client.post('/posts', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async likePost(postId: string) {
    return this.client.post(`/posts/${postId}/like`);
  }

  // User profile
  async getUserProfile(userId: string) {
    return this.client.get(`/users/${userId}`);
  }

  async updateUserProfile(userId: string, data: Partial<any>) {
    return this.client.put(`/users/${userId}`, data);
  }

  // Achievements
  async getUserAchievements(userId: string) {
    return this.client.get(`/users/${userId}/achievements`);
  }

  async unlockAchievement(achievementId: string) {
    return this.client.post(`/achievements/${achievementId}/unlock`);
  }

  // Gamification
  async addPoints(userId: string, points: number, reason: string) {
    return this.client.post(`/users/${userId}/points`, { points, reason });
  }

  async getLeaderboard(limit = 100) {
    return this.client.get('/leaderboard', { params: { limit } });
  }
}

export const apiService = new APIService();
