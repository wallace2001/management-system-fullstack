import { TOKEN, USER_ID } from '@/constants/cookies';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export async function setToken(token: string) {
  return setCookie(TOKEN, token);
}

export function getToken() {
  return getCookie(TOKEN);
}

export async function logout() {
  return new Promise(async (resolve) => {
    window.localStorage.clear();
    await Promise.all([deleteCookie(TOKEN), deleteCookie(USER_ID)]);
    window.location.pathname = '/auth/login';
    resolve(true);
  });
}
