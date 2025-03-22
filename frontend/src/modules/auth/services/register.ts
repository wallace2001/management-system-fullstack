import { api } from '@/services/api'; // Presumindo que você tem um cliente `api` já configurado
import { RegisterCredentials } from '../types/register';

export async function register(values: RegisterCredentials) {
  return api
    .post('auth/register', {
      json: values,
      timeout: 1000 * 90, // 90s
    })
    .json();
}
