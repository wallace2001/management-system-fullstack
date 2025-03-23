import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Profile } from '@/modules/shared/types/profile';
import { toast } from 'sonner';
export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-user'],
    mutationFn: async (data: {
      id?: string;
      username: string;
      role: 'ADMIN' | 'USER';
    }) => {
      const response = await api
        .put<Profile>(`auth/${data.id}`, {
          json: {
            username: data.username,
            role: data.role,
          },
        });

        return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Usuário alterado com sucesso!');
    },
  });
}
