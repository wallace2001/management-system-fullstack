import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Profile } from '@/modules/shared/types/profile';

type PaginatedUsersResponse = {
  data: Profile[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
};

type UseUsersParams = {
  page?: number;
  limit?: number;
  name?: string;
};

export function useUsers({ page = 1, limit = 10, name }: UseUsersParams = {}) {
  return useQuery<PaginatedUsersResponse>({
    queryKey: ['users', page, limit, name],
    queryFn: async () => {
      const response = await api.get('auth/all', {
        params: { page, limit, name },
      });
      return response.data as PaginatedUsersResponse;
    },
  });
}
