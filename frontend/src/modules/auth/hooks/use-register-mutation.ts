import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { RegisterCredentials } from '../types/register';
import { register } from '../services/register';
import { handleError } from '@/modules/errors/request-error';

export function useRegisterMutation() {
  const router = useRouter();

  return useMutation({
    mutationKey: ['register'],
    mutationFn: (values: RegisterCredentials) => register(values),
    onSuccess() {
      router.replace('/auth/login');
      toast.success(
        'Registro efetuado com sucesso! Agora você pode fazer login.',
      );
    },
    onError: handleError,
  });
}
