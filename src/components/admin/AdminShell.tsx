import Link from 'next/link';
import { ArrowLeft, GraduationCap, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type AdminShellProps = {
  title: string;
  subtitle: string;
  badge?: string;
  backHref?: string;
  backLabel?: string;
  icon?: LucideIcon;
  headerExtra?: ReactNode;
  children: ReactNode;
};

export function AdminShell({
  title,
  subtitle,
  badge = 'PrepMX Academy',
  backHref = '/',
  backLabel = 'Volver',
  icon: Icon = GraduationCap,
  headerExtra,
  children,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-mesh">
      <header className="glass-header sticky top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 md:px-8">
          <Link
            href={backHref}
            className="flex h-9 w-9 items-center justify-center rounded-lg border bg-white text-muted-foreground hover:bg-muted"
            aria-label={backLabel}
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex flex-1 items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/25">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-primary">{badge}</p>
              <h1 className="text-lg font-bold leading-tight">{title}</h1>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          {headerExtra}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">{children}</main>
    </div>
  );
}
