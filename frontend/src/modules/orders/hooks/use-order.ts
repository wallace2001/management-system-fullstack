// hooks/use-order.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { toast } from 'sonner';
import { handleError } from '@/modules/errors/request-error';
import { Order } from '@/modules/shared/types/order';
import { OrderFormValues } from '../schemas/order-schema';

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OrderFormValues) =>
      api.post('orders', { json: data }).json<Order>(),
    onSuccess: () => {
      toast.success('Pedido criado com sucesso');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: handleError,
  });
}

export function useUpdateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: OrderFormValues) =>
        api.put(`orders/${data.id}`, { json: data }).json<Order>(),
      onSuccess: () => {
        toast.success('Pedido atualizado com sucesso!');
        queryClient.invalidateQueries({ queryKey: ['orders'] });
      },
      onError: handleError
    });
  }

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.patch(`orders/${id}/complete`).json<Order>(),
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
    mutationFn: (id: string) =>
      api.delete(`orders/${id}`).json<{ message: string }>(),
    onSuccess: () => {
      toast.success('Pedido deletado com sucesso');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: handleError,
  });
}
