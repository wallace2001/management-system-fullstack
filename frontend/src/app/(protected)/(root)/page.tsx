import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 text-center sm:items-start sm:text-left">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="max-w-xl space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Sistema de Gerenciamento
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Bem-vindo ao painel de administração! Aqui você pode gerenciar
            produtos, pedidos e usuários de forma simples e eficiente usando
            <strong> Next.js + ShadCN UI + Tailwind + TanStack</strong>.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <Link
            href="/products"
            className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-transparent px-6 text-sm font-medium transition hover:bg-[#383838] dark:hover:bg-[#ccc] sm:h-12 sm:text-base"
          >
            Gerenciar Produtos
          </Link>
          <Link
            href="/orders"
            className="flex h-10 items-center justify-center rounded-full border border-black/[.08] px-6 text-sm font-medium transition hover:border-transparent hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:h-12 sm:text-base"
          >
            Visualizar Pedidos
          </Link>
          <Link
            href="/users"
            className="flex h-10 items-center justify-center rounded-full border border-black/[.08] px-6 text-sm font-medium transition hover:border-transparent hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:h-12 sm:text-base"
          >
            Lista de Usuários
          </Link>
        </div>

        <div className="w-full mt-12 space-y-4">
          <h2 className="text-xl font-semibold">Documentação da API</h2>
          <div className="relative h-[500px] w-full rounded-md border shadow">
            <iframe
              src="http://localhost:3000/docs"
              className="absolute inset-0 h-full w-full rounded-md"
            />
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
        <a
          href="https://nextjs.org"
          className="flex items-center gap-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Powered by Next.js
        </a>
        <a
          href="https://ui.shadcn.com"
          className="flex items-center gap-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/file.svg" alt="File icon" width={16} height={16} />
          Design com ShadCN UI
        </a>
      </footer>
    </div>
  );
}
