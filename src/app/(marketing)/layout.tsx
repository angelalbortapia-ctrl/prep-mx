import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-mesh">
      <header className="glass-header sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="text-lg">PrepMX</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm md:gap-2">
            <Link
              href="/precios"
              className="rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-white hover:text-foreground"
            >
              Precios
            </Link>
            <Link
              href="/simulador-gratis"
              className="rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-white hover:text-foreground"
            >
              Simulador
            </Link>
            <Button asChild className="ml-1 h-11 rounded-xl shadow-md shadow-primary/20">
              <Link href="/sign-up">Empezar gratis</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-white/60 bg-white/50 py-8 text-center text-sm text-muted-foreground">
        <Link href="/aviso-de-privacidad" className="underline-offset-4 hover:text-foreground hover:underline">
          Aviso de privacidad
        </Link>
      </footer>
    </div>
  );
}
