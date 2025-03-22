/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { signIn } from '@/lib/auth/auth-config';
import { Credentials } from '../types/login';

export async function authenticate(credentials: Credentials) {
  try {
    const result = await signIn('credentials', {
      ...credentials,
      redirect: false,
    });

    if (!result || result.error) {
      return {
        success: false,
        message: result?.error || 'Credenciais inválidas.',
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao autenticar. Tente novamente.',
    };
  }
}
