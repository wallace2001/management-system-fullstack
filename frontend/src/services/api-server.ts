import { TOKEN, USER_ID } from '@/constants/cookies';
import { getToken } from '@/lib/auth';
import { env } from '@/lib/env';
import { deleteCookie } from 'cookies-next';

import ky from 'ky';

const apiServer = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 50000,
  hooks: {
    beforeRequest: [
      async (request) => {
        try {
          const token = await getToken();
          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`);
          }
        } catch (error) {
          console.error('Erro ao obter token:', error);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          if (typeof window !== 'undefined') {
            deleteCookie(TOKEN);
            deleteCookie(USER_ID);
            window.location.href = '/auth/login';
          }
        }

        return response;
      },
    ],
  },
});
export { apiServer };
