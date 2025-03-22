import { TOKEN, USER_ID } from '@/constants/cookies';
import { Profile } from '@/modules/shared/types/profile';
import { HTTPError } from 'ky';
import NextAuth, { CredentialsSignin } from 'next-auth';

import Credentials from 'next-auth/providers/credentials';
import { DefaultUser } from './auth';
import { apiServer } from '@/services/api-server';

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
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const loginData = await apiServer
            .post<LoginResponse>('auth/login', {
              json: credentials,
            })
            .json();

          const profileData = await apiServer
            .get<Profile>('auth/me', {
              headers: {
                Authorization: `Bearer ${loginData.access_token}`,
              },
              timeout: 1000 * 120,
            })
            .json();

          const { cookies } = await import('next/headers');
          const cookiesStore = await cookies();
          cookiesStore.set(USER_ID, profileData.id);
          cookiesStore.set(TOKEN, loginData.access_token);

          return {
            ...profileData,
            access_token: loginData.access_token,
          };
        } catch (error) {
          console.log(error);
          if (error instanceof HTTPError) {
            const response = await error.response.json();
            throw new AuthError(response.message);
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
