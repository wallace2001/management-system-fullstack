import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Product } from '@/modules/shared/types/product';
import { toast } from 'sonner';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Product, 'id'>) =>
      (await api.post('products', { json: data })).data,
    onSuccess: () => {
      toast.success('Produto criado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Product) =>
      (await api.put(`products/${data.id}`, { json: data })).data,
    onSuccess: () => {
      toast.success('Produto atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) =>
      (await api.delete(`products/${id}`)).data,
    onSuccess: () => {
      toast.success('Produto excluído com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
