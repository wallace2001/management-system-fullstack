import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-user'],
    mutationFn: async (id?: string) => {
      return (await api.delete(`auth/${id}`)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
