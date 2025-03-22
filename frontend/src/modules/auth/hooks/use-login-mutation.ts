import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Credentials } from '../types/login';
import { authenticate } from '../services/login';

export function useLoginMutation() {
  const router = useRouter();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (values: Credentials) => authenticate(values),
    onSuccess(res) {
      if (!res.success) {
        toast.error('Falha no login', {
          description: res.message,
        });
        return;
      }

      router.replace('/');
    },
    onError() {
      toast.error('Erro inesperado', {
        description: 'Tente novamente mais tarde.',
      });
    },
  });
}
