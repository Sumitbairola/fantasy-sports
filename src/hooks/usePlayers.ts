import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export const usePlayers = (matchId: string) => {
  return useQuery({
    queryKey: ['players', matchId],
    queryFn: () => apiClient.getPlayers(matchId),
    enabled: !!matchId,
    staleTime: 5 * 60 * 1000,
  });
};
