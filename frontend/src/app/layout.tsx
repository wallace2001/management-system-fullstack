import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import RootProvider from '@/providers/root-provider';
import { ReactQueryDevtools } from '@/providers/react-query-provider';
import { env } from '@/lib/env';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Painel Administrativo',
  description: 'gerenciador de produtos, pedidos e usuários',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {env.NODE_ENV === 'development' && (
            <ReactQueryDevtools
              initialIsOpen={false}
              buttonPosition="bottom-right"
            />
          )}
          {children}
          <Toaster richColors theme="light" position="bottom-center" />
        </body>
      </html>
    </RootProvider>
  );
}
