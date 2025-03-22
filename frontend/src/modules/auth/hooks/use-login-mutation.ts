import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { HTTPError } from 'ky';
import { Credentials } from '../types/login';
import { authenticate } from '../services/login';

export function useLoginMutation() {
  const router = useRouter();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (values: Credentials) => authenticate(values),
    onSuccess() {
      router.replace('/');
    },
    async onError(error: HTTPError<{ message: string }> | Error) {
      let errorMessage = 'Tente novamente';
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
