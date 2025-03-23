// hooks/use-orders-query.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Order } from '@/modules/shared/types/order';

export function useOrdersQuery() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => (await api.get('orders')).data as Order[],
  });
}
