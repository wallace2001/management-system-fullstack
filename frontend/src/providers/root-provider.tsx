'use client';

import { useEffect } from 'react';
import { ReactQueryProvider } from './react-query-provider';
import { getCookie } from 'cookies-next';
import { TOKEN } from '@/constants/cookies';
import { usePathname, useRouter } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';

export default function RootProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function handleSession() {
      const token = await getCookie(TOKEN);
      const isLoggedIn = !!token;

      const isOnPublicPages =
        pathname.startsWith('/auth') && !pathname.startsWith('/authorized');
      const isOnPrivatePages = !isOnPublicPages;

      if (isOnPrivatePages && !isLoggedIn) {
        router.replace('/auth/login');
      } else if (isOnPublicPages && isLoggedIn) {
        router.replace('/');
      }
    }
    handleSession();
  }, [pathname, router]);

  return (
    <ReactQueryProvider>
      <SessionProvider>{children}</SessionProvider>
    </ReactQueryProvider>
  );
}
