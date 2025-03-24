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

export type Status = 'COMPLETED' | 'CANCELED' | 'PENDING';

type UseOrdersQueryOptions = {
  page?: number;
  limit?: number;
  status?: Status;
};

export function useOrdersQuery({
  page = 1,
  limit = 10,
  status,
}: UseOrdersQueryOptions) {
  return useQuery<PaginatedOrdersResponse>({
    queryKey: ['orders', page, limit, status],
    queryFn: async () => {
      const response = await api.get('orders', {
        params: { page, limit, status },
      });
      return response.data;
    },
  });
}
