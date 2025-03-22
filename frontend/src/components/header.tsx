'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { UserButton } from '@/modules/auth/components/user-button';
import { Menu } from 'lucide-react';
import { User } from 'next-auth';
import Link from 'next/link';

export default function Header({ user }: { user: User }) {
  const pathname = usePathname();

  return (
    <header className="bg-background fixed top-0 z-50 w-full border-b px-4 sm:px-8">
      <div className="mx-auto flex h-20 max-w-screen-xl items-center justify-between">
        <p className="text-2xl font-bold">
          <Link href="/">Management</Link>
        </p>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant={pathname === '/products' ? 'default' : 'outline'}
            asChild
          >
            <Link href="/products">Produtos</Link>
          </Button>

          <Button
            variant={pathname === '/orders' ? 'default' : 'outline'}
            asChild
          >
            <Link href="/orders">Pedidos</Link>
          </Button>

          {user?.id && (
            <Button
              variant={pathname === '/users' ? 'default' : 'outline'}
              asChild
            >
              <Link href="/users">Usuários</Link>
            </Button>
          )}

          {user?.id ? <UserButton /> : (
            <Button asChild>
              <Link href="/auth">Entrar</Link>
            </Button>
          )}
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-6 space-y-4">
              <SheetTitle />
              <div className="space-y-2 pt-10">
                <Button
                  variant={pathname === '/products' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/products">Produtos</Link>
                </Button>

                <Button
                  variant={pathname === '/orders' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/orders">Pedidos</Link>
                </Button>

                {user?.id && (
                  <Button
                    variant={pathname === '/users' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/users">Usuários</Link>
                  </Button>
                )}

                {user?.id ? (
                  <div className="pt-4">
                    <UserButton />
                  </div>
                ) : (
                  <Button variant="default" className="w-full" asChild>
                    <Link href="/auth">Entrar</Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
