import axios from 'axios';
import { deleteCookie } from 'cookies-next';
import { TOKEN, USER_ID } from '@/constants/cookies';
import { getToken } from '@/lib/auth';
import { env } from '@/lib/env';

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 50000,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro ao obter token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      deleteCookie(TOKEN);
      deleteCookie(USER_ID);
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export { api };
