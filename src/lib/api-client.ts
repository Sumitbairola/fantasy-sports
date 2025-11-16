import axios from 'axios';
import { API_ENDPOINTS } from './constants';
import { Match, Player } from '@/types';

const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClient = {
  async getMatches(): Promise<Match[]> {
    try {
      const { data } = await axiosInstance.get(API_ENDPOINTS.matches);
      return data?.matches?.cricket || [];
    } catch (error) {
      console.error('Error fetching matches:', error);
      return [];
    }
  },

  async getPlayers(matchId: string): Promise<Player[]> {
    try {
      const { data } = await axiosInstance.get(API_ENDPOINTS.players);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching players:', error);
      return [];
    }
  },
};
