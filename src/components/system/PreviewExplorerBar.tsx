'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  BookOpen,
  Compass,
  GraduationCap,
  Home,
  LayoutDashboard,
  Play,
  Settings2,
  Sparkles,
  Tag,
  Trophy,
  User,
  X,
} from 'lucide-react';
import { isDemoMode } from '@/lib/demo-mode';
import { cn } from '@/lib/utils';

const explorerLinks = [
  { href: '/', label: 'Landing', icon: Home, group: 'marketing' },
  { href: '/simulador-gratis?uni=unam', label: 'Simulador', icon: Play, group: 'marketing' },
  { href: '/precios?uni=unam', label: 'Precios', icon: Tag, group: 'marketing' },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'app' },
  { href: '/dashboard/estudio', label: 'Estudio', icon: BookOpen, group: 'app' },
  { href: '/dashboard/simulacros', label: 'Simulacros', icon: Trophy, group: 'app' },
  { href: '/dashboard/plan', label: 'Mi plan', icon: Sparkles, group: 'app' },
  { href: '/dashboard/tutor', label: 'Tutor IA', icon: GraduationCap, group: 'app' },
  { href: '/dashboard/perfil', label: 'Perfil', icon: User, group: 'app' },
  { href: '/admin', label: 'Admin', icon: Settings2, group: 'tools' },
] as const;

function isActive(pathname: string, href: string): boolean {
  const path = href.split('?')[0];
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function PreviewExplorerBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (!isDemoMode()) return null;

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-[90] inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-card/95 px-3 py-2 text-xs font-semibold text-primary shadow-lg backdrop-blur-md"
        aria-label="Abrir explorador de demo"
      >
        <Compass className="h-3.5 w-3.5" aria-hidden />
        Demo
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-[90] w-[min(92vw,20rem)] rounded-2xl border border-primary/20 bg-card/95 p-3 shadow-xl backdrop-blur-md"
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

      <nav className="grid max-h-56 gap-1 overflow-y-auto">
        {explorerLinks.map(({ href, label, icon: Icon }) => {
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
                  : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>

      <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-wide text-emerald-700">
        Sin login
      </p>
    </div>
  );
}

/** Ya no ocupa espacio en el layout — la barra flota colapsada. */
export function PreviewExplorerSpacer() {
  return null;
}
