import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Product } from '@/modules/shared/types/product';

interface ProductsQueryParams {
  page?: number;
  limit?: number;
  name?: string;
}

interface PaginatedProductsResponse {
  data: Product[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

export function useProductsQuery(params: ProductsQueryParams) {
  return useQuery<PaginatedProductsResponse>({
    queryKey: ['products', params],
    queryFn: async () => {
      const response = await api.get('products', {
        params,
      });

      return response.data as PaginatedProductsResponse;
    },
  });
}
