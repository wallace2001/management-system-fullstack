import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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
  });
}
