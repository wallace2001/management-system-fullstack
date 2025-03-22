import type { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

type DefaultUser = DefaultSession['user'] & {
  id: string;
  username: string;
  role: string;
};

declare module 'next-auth' {
  interface Session {
    user: DefaultUser;
  }

  interface User extends DefaultUser {
    access_token?: string;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string;
    user: DefaultUser;
  }
}
