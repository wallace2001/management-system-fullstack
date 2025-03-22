import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Profile } from '@/modules/shared/types/profile';
import { toast } from 'sonner';
import { HTTPError } from 'ky';

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-user'],
    mutationFn: async (data: {
      id?: string;
      username: string;
      role: 'ADMIN' | 'USER';
    }) => {
      return api
        .put<Profile>(`auth/${data.id}`, {
          json: {
            username: data.username,
            role: data.role,
          },
        })
        .json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Usuário alterado com sucesso!');
    },
    async onError(error: HTTPError<{ message: string }> | Error) {
      let errorMessage = 'Tente novamente';
      console.log(error);

      if (error instanceof HTTPError) {
        const errorResponse = await error.response.json();
        errorMessage = errorResponse!.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error('Login não efetuado', {
        description: errorMessage,
      });
    },
  });
}
