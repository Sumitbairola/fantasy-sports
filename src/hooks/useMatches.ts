import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export const useMatches = () => {
  return useQuery({
    queryKey: ['matches'],
    queryFn: apiClient.getMatches,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
