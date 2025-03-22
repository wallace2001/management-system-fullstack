import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { HTTPError } from 'ky';
import { toast } from 'sonner';

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-user'],
    mutationFn: async (id?: string) => {
      return api.delete(`auth/${id}`).json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
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
