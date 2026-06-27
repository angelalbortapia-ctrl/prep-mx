'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  BookOpen,
  Compass,
  GraduationCap,
  Home,
  LayoutDashboard,
  Play,
  Radio,
  Settings2,
  Sparkles,
  Tag,
  Trophy,
  User,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { isDemoMode } from '@/lib/demo-mode';
import { cn } from '@/lib/utils';

type ExplorerLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type ExplorerSection = {
  title: string;
  links: ExplorerLink[];
};

const explorerSections: ExplorerSection[] = [
  {
    title: 'Marketing',
    links: [
      { href: '/', label: 'Landing', icon: Home },
      { href: '/simulador-gratis?uni=unam', label: 'Simulador', icon: Play },
      { href: '/precios?uni=unam', label: 'Precios', icon: Tag },
    ],
  },
  {
    title: 'App alumno',
    links: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/dashboard/estudio', label: 'Estudio', icon: BookOpen },
      { href: '/dashboard/simulacros', label: 'Simulacros', icon: Trophy },
      { href: '/dashboard/plan', label: 'Mi plan', icon: Sparkles },
      { href: '/dashboard/tutor', label: 'Tutor IA', icon: GraduationCap },
      { href: '/dashboard/perfil', label: 'Perfil', icon: User },
    ],
  },
  {
    title: 'Admin',
    links: [
      { href: '/admin', label: 'Curso / panel', icon: Settings2 },
      { href: '/admin/ticker', label: 'Ticker', icon: Radio },
    ],
  },
];

function isActive(pathname: string, href: string): boolean {
  const [path, hash] = href.split('#');
  if (hash) {
    return pathname === path || pathname.startsWith(`${path}/`);
  }
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

function useFloatingBottom(pathname: string): string {
  return useMemo(() => {
    const hasTicker =
      pathname === '/' || pathname === '/simulador-gratis' || pathname === '/precios';
    if (!hasTicker) return 'bottom-4';
    if (pathname === '/') {
      return 'bottom-[calc(var(--ticker-height,2.75rem)+4.5rem)] md:bottom-4';
    }
    return 'bottom-[calc(var(--ticker-height,2.75rem)+1rem)] md:bottom-4';
  }, [pathname]);
}

export function PreviewExplorerBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const floatingBottom = useFloatingBottom(pathname);

  if (!isDemoMode()) return null;

  const panelClass = cn('fixed right-4 z-[100]', floatingBottom);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          panelClass,
          'inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-card/95 px-3 py-2 text-xs font-semibold text-primary shadow-lg backdrop-blur-md'
        )}
        aria-label="Abrir explorador de demo"
      >
        <Compass className="h-3.5 w-3.5" aria-hidden />
        Demo
      </button>
    );
  }

  return (
    <div
      className={cn(
        panelClass,
        'w-[min(92vw,20rem)] rounded-2xl border border-primary/20 bg-card/95 p-3 shadow-xl backdrop-blur-md'
      )}
      role="navigation"
      aria-label="Explorador sin login"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-primary">
          <Compass className="h-3.5 w-3.5" aria-hidden />
          Explorar demo
        </span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg p-1 text-muted-foreground hover:bg-primary/10 hover:text-primary"
          aria-label="Cerrar explorador"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="max-h-[min(60vh,22rem)] space-y-3 overflow-y-auto pr-0.5">
        {explorerSections.map((section) => (
          <div key={section.title}>
            <p className="mb-1 px-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </p>
            <div className="grid gap-0.5">
              {section.links.map(({ href, label, icon: Icon }) => {
                const active = isActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'tap-transparent inline-flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors',
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-primary/10 hover:text-primary',
                      section.title === 'Admin' &&
                        !active &&
                        'border border-dashed border-primary/20'
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-wide text-emerald-700">
        Sin login · incluye admin
      </p>
    </div>
  );
}

/** Ya no ocupa espacio en el layout — la barra flota colapsada. */
export function PreviewExplorerSpacer() {
  return null;
}
