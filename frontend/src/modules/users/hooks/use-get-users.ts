import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Profile } from '@/modules/shared/types/profile';

export function useUsers() {
  return useQuery<Profile[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get('auth/all');
      return response.json();
    },
  });
}
