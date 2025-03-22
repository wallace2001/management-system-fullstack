'use server';

import { signIn } from '@/lib/auth/auth-config';
import { Credentials } from '../types/login';

export async function authenticate(credentials: Credentials) {
  await signIn('credentials', {
    ...credentials,
    redirect: false,
  });

  return;
}
