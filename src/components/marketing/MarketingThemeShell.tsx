'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  getUniversityTheme,
  parseLandingUniversidad,
  parseUniversidadFilter,
  type LandingUniversidad,
  type UniversidadFilter,
} from '@/lib/university-theme';

function ShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isHome = pathname === '/';
  const isSimulador = pathname === '/simulador-gratis';
  const themed = isHome || isSimulador;

  let universidad: LandingUniversidad | UniversidadFilter = 'todas';
  if (isHome) {
    universidad = parseLandingUniversidad(searchParams.get('uni'));
  } else if (isSimulador) {
    universidad = parseUniversidadFilter(searchParams.get('uni') ?? undefined);
  }

  const theme = themed ? getUniversityTheme(universidad) : null;

  return (
    <div
      className={cn('flex min-h-screen flex-col', themed ? 'uni-theme' : 'bg-mesh')}
      data-universidad={themed ? universidad : undefined}
    >
      <header className="glass-header sticky top-0 z-50">
        {theme ? <div className={cn('uni-header-accent', theme.accentBar)} aria-hidden /> : null}
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
              href={
                isHome
                  ? `/simulador-gratis?uni=${universidad === 'todas' ? 'unam' : universidad}`
                  : '/simulador-gratis'
              }
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
      <footer className="border-t border-border/60 bg-white/60 py-8 text-center text-sm text-muted-foreground">
        <Link
          href="/aviso-de-privacidad"
          className="underline-offset-4 hover:text-foreground hover:underline"
        >
          Aviso de privacidad
        </Link>
      </footer>
    </div>
  );
}

export function MarketingThemeShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col bg-mesh">
          <main className="flex-1">{children}</main>
        </div>
      }
    >
      <ShellInner>{children}</ShellInner>
    </Suspense>
  );
}
