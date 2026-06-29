'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { GraduationCap } from 'lucide-react';
import { AppUserMenu } from '@/components/app-user-menu';
import { AppNavExtras } from '@/components/app/AppNavExtras';
import { DashboardThemeToggle } from '@/components/layout/DashboardThemeToggle';
import { CommandPalette } from '@/components/search/CommandPalette';
import { TokenBalanceBadge } from '@/components/exam/TokenBalanceBadge';
import { SupportedExamsNavDropdown } from '@/components/marketing/SupportedExamsNavDropdown';
import { Button } from '@/components/ui/button';
import { buildJourneyHref, marketingJourneyContext } from '@/lib/journey-links';
import { isDemoMode } from '@/lib/demo-mode';
import { parsePageUniversidad, parsePlanScope } from '@/lib/university-theme';
import { resolveTemarioUniId } from '@/data/temario-registry';
import { cn } from '@/lib/utils';

type SiteNavVariant = 'marketing' | 'app';

interface NavItem {
  href: string;
  label: string;
  match?: (pathname: string) => boolean;
}

const marketingItems: NavItem[] = [
  { href: '/simulador-gratis', label: 'Simulador Gratis' },
  { href: '/precios', label: 'Precios' },
];

const appItems: NavItem[] = [
  { href: '/dashboard/estudio', label: 'Estudio' },
  { href: '/dashboard/herramientas', label: 'Herramientas' },
  { href: '/dashboard/comparativa', label: 'Comparativa' },
  { href: '/dashboard/simulacros', label: 'Simulacros' },
  { href: '/dashboard/plan', label: 'Plan' },
  {
    href: '/dashboard',
    label: 'Progreso',
    match: (pathname) => pathname === '/dashboard',
  },
  { href: '/dashboard/perfil', label: 'Perfil' },
];

function isNavActive(pathname: string, item: NavItem): boolean {
  if (item.match) return item.match(pathname);
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

interface SiteNavProps {
  variant: SiteNavVariant;
  accentBar?: string;
}

export function SiteNav({ variant, accentBar }: SiteNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoaded, isSignedIn } = useAuth();
  const demo = isDemoMode();

  const uni = parsePageUniversidad(searchParams.get('uni'));
  const plan = parsePlanScope(searchParams.get('plan'));
  const journey = marketingJourneyContext(uni, plan);
  const temarioUni = resolveTemarioUniId(uni);

  const homeHref =
    variant === 'app'
      ? buildJourneyHref('/dashboard', uni !== 'todas' ? { uni, plan: 'universidad' } : undefined)
      : buildJourneyHref('/', journey);
  const items = variant === 'marketing' ? marketingItems : appItems;

  const navLinkClass = (active: boolean) =>
    cn(
      'tap-transparent shrink-0 whitespace-nowrap rounded-lg px-2 py-2 text-xs font-medium transition-colors lg:px-3 lg:text-sm',
      active
        ? 'bg-primary/10 text-primary'
        : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
    );

  const resolvedItems = items.map((item) => ({
    ...item,
    href:
      variant === 'marketing'
        ? buildJourneyHref(item.href, journey)
        : buildJourneyHref(item.href, uni !== 'todas' ? { uni, plan: 'universidad' } : undefined),
  }));

  const clerkSignedIn = isLoaded && isSignedIn;

  return (
    <header className="glass-header sticky top-0 z-50">
      {accentBar ? <div className={cn('uni-header-accent', accentBar)} aria-hidden /> : null}
      <div
        className={cn(
          'mx-auto flex h-16 items-center justify-between gap-2 px-4 md:gap-3 md:px-6',
          variant === 'app' ? 'max-w-7xl' : 'max-w-5xl'
        )}
      >
        <Link href={homeHref} className="flex shrink-0 items-center gap-2 font-black tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-lg">PrepMX</span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto scrollbar-none md:flex lg:gap-1">
          {variant === 'marketing' ? (
            <SupportedExamsNavDropdown activeUni={temarioUni} />
          ) : null}
          {resolvedItems.map((item) => {
            const active = isNavActive(pathname, item);
            return (
              <Link key={item.href} href={item.href} className={navLinkClass(active)}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1 md:gap-1.5 lg:gap-2">
          {variant === 'marketing' ? (
            <>
              <DashboardThemeToggle className="hidden sm:inline-flex" />
              <TokenBalanceBadge />
              <CommandPalette />
              {clerkSignedIn ? (
                <Button asChild size="default" className="text-xs font-bold">
                  <Link href="/dashboard">Ir a mi Dashboard</Link>
                </Button>
              ) : (
                <Button asChild variant="outline" size="default" className="text-xs font-bold">
                  <Link href="/sign-in">Iniciar Sesión</Link>
                </Button>
              )}
            </>
          ) : (
            <>
              <AppNavExtras className="hidden lg:inline-flex" />
              <DashboardThemeToggle className="hidden md:inline-flex" />
              {userIdArea(demo, isLoaded, Boolean(isSignedIn))}
              <Link
                href={buildJourneyHref('/', journey)}
                className="hidden text-xs text-muted-foreground hover:text-primary lg:inline"
              >
                Sitio público
              </Link>
            </>
          )}
        </div>
      </div>

      {variant === 'marketing' ? (
        <nav className="flex items-center gap-2 overflow-x-auto border-t border-border/40 px-4 py-2 scrollbar-none md:hidden">
          <DashboardThemeToggle className="sm:hidden" />
          <SupportedExamsNavDropdown activeUni={temarioUni} />
          {resolvedItems.map((item) => {
            const active = isNavActive(pathname, item);
            return (
              <Link key={item.href} href={item.href} className={navLinkClass(active)}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      ) : (
        <nav className="flex items-center gap-2 overflow-x-auto px-4 pb-2 scrollbar-none md:hidden">
          <DashboardThemeToggle className="sm:hidden" />
          {resolvedItems.map((item) => {
            const active = isNavActive(pathname, item);
            return (
              <Link key={item.href} href={item.href} className={navLinkClass(active)}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}

function userIdArea(demo: boolean, isLoaded: boolean, isSignedIn: boolean) {
  if (demo && (!isLoaded || !isSignedIn)) {
    return (
      <span className="hidden rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 md:inline">
        Demo
      </span>
    );
  }
  if (isLoaded && isSignedIn) {
    return (
      <div className="hidden md:block">
        <AppUserMenu />
      </div>
    );
  }
  return null;
}
