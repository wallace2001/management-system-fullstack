import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Order } from '@/modules/shared/types/order';

type PaginatedOrdersResponse = {
  data: Order[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
};

type UseOrdersQueryOptions = {
  page?: number;
  limit?: number;
};

export function useOrdersQuery({ page = 1, limit = 10 }: UseOrdersQueryOptions) {
  return useQuery<PaginatedOrdersResponse>({
    queryKey: ['orders', page, limit],
    queryFn: async () => {
      const response = await api.get('orders', {
        params: { page, limit },
      });
      return response.data;
    },
  });
}
