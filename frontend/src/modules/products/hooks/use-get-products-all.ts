import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Product } from '@/modules/shared/types/product';

export function useProductsGetAllQuery() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const products = (await api.get('products/all')).data;
      return products;
    },
  });
}
