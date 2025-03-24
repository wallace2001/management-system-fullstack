// hooks/use-order.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { toast } from 'sonner';
import { OrderFormValues } from '../schemas/order-schema';
import { Order } from '@/modules/shared/types/order';
import { handleError } from '@/modules/errors/request-error';

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: OrderFormValues) =>
      (await api.post<Order[]>('orders', data)).data,
    onSuccess: () => {
      toast.success('Pedido criado com sucesso');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: OrderFormValues) =>
      (await api.put<Order>(`orders/${data.id}`, data)).data,
    onSuccess: () => {
      toast.success('Pedido atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) =>
      (await api.patch<Order>(`orders/${id}/complete`)).data,
    onSuccess: () => {
      toast.success('Pedido marcado como concluído');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: handleError,
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => (await api.delete(`orders/${id}`)).data,
    onSuccess: () => {
      toast.success('Pedido cancelado com sucesso');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
