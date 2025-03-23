import { TOKEN, USER_ID } from '@/constants/cookies';
import { Profile } from '@/modules/shared/types/profile';
import NextAuth, { CredentialsSignin } from 'next-auth';

import Credentials from 'next-auth/providers/credentials';
import { DefaultUser } from './auth';
import { api as apiServer } from '@/services/api-server';
import { isAxiosError } from 'axios';

type LoginResponse = {
  access_token: string;
};

class AuthError extends CredentialsSignin {
  constructor(code = 'credentials') {
    super();
    this.code = code;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const loginData = await apiServer
            .post<LoginResponse>('auth/login', credentials);

          const profileData = await apiServer
            .get<Profile>('auth/me', {
              headers: {
                Authorization: `Bearer ${loginData.data.access_token}`,
              },
              timeout: 1000 * 120,
            })

          const { cookies } = await import('next/headers');
          const cookiesStore = await cookies();
          cookiesStore.set(USER_ID, profileData.data.id);
          cookiesStore.set(TOKEN, loginData.data.access_token);

          return {
            ...profileData.data,
            access_token: loginData.data.access_token,
          };
        } catch (error) {
          console.log(error);
          if (isAxiosError(error)) {
            const responseMessage = error.response?.data?.message ?? 'Erro desconhecido';
            throw new AuthError(responseMessage);
          }

          throw new AuthError('Não foi possível realizar o login.');
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as DefaultUser;
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...(token.user as DefaultUser),
        email: '',
        emailVerified: new Date(),
      };
      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isOnAPIRoutes = nextUrl.pathname.startsWith('/api');
      const isOnPublicPages =
        nextUrl.pathname.startsWith('/auth') &&
        !nextUrl.pathname.startsWith('/authorized');
      const isOnPrivatePages = !isOnPublicPages;

      if (isOnPrivatePages && !isLoggedIn) {
        return Response.redirect(new URL('/auth/login', nextUrl));
      }

      if (isOnPublicPages && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }

      if (isOnAPIRoutes && !isLoggedIn) {
        return Response.json({ message: 'Unauthorized.' }, { status: 401 });
      }

      return true;
    },
  },
});
