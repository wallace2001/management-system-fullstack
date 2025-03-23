// src/hooks/use-products-query.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Product } from '@/modules/shared/types/product';

export function useProductsQuery() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const products = (await api.get('products')).data;

      return products;
    },
  });
}
