import { API_ENDPOINTS } from './constants';
import { Match, Player } from '@/types';

export const apiClient = {
  async getMatches(): Promise<Match[]> {
    try {
      const response = await fetch(API_ENDPOINTS.matches);
      if (!response.ok) {
        throw new Error('Failed to fetch matches');
      }
      const data = await response.json();
      
      return data?.matches?.cricket || [];
    } catch (error) {
      console.error('Error fetching matches:', error);
      return [];
    }
  },

  async getPlayers(matchId: string): Promise<Player[]> {
    try {
      const response = await fetch(API_ENDPOINTS.players);
      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }
      const data = await response.json();
      
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching players:', error);
      return [];
    }
  },
};
