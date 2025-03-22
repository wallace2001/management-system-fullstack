import Header from '@/components/header';
import { auth } from '@/lib/auth/auth-config';
import { redirect } from 'next/navigation';
import { ShieldOff } from 'lucide-react';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await auth();

  if (!data?.user) {
    redirect('/auth/login');
  }

  const isUser = data.user.role === 'USER';
  return (
    <div>
      <Header user={data.user} />

      {isUser ? (
        <div className="text-muted-foreground flex h-[80vh] flex-col items-center justify-center text-center">
          <ShieldOff className="text-destructive mb-4 h-16 w-16" />
          <h2 className="text-2xl font-semibold">Acesso Negado</h2>
          <p className="mt-2 text-sm">
            Você não tem permissão para visualizar esta página.
          </p>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
