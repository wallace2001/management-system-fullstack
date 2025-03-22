import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Product } from '@/modules/shared/types/product';
import { toast } from 'sonner';
import { handleError } from '@/modules/errors/request-error';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Product, 'id'>) =>
      api.post('products', { json: data }).json<Product>(),
    onSuccess: () => {
      toast.success('Produto criado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: handleError,
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Product) =>
      api.put(`products/${data.id}`, { json: data }).json<Product>(),
    onSuccess: () => {
      toast.success('Produto atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: handleError,
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`products/${id}`).json<{ message: string }>(),
    onSuccess: () => {
      toast.success('Produto excluído com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: handleError,
  });
}
