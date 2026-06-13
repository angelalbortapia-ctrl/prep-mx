import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="text-lg font-bold tracking-tight">
            PrepMX
          </Link>
          <nav className="flex items-center gap-2 text-sm md:gap-4">
            <Link href="/precios" className="text-muted-foreground hover:text-foreground">
              Precios
            </Link>
            <Link href="/simulador-gratis" className="text-muted-foreground hover:text-foreground">
              Simulador gratis
            </Link>
            <Button asChild size="sm" className="h-10 md:h-9">
              <Link href="/sign-up">Empezar</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <Link href="/aviso-de-privacidad" className="underline-offset-4 hover:underline">
          Aviso de privacidad
        </Link>
      </footer>
    </div>
  );
}
