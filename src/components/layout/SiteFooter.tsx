'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { buildJourneyHref, marketingJourneyContext } from '@/lib/journey-links';
import { CONTACT_MAILTO, PRIVACY_PATH, TERMS_PATH } from '@/lib/legal-consent';
import { parsePageUniversidad, parsePlanScope } from '@/lib/university-theme';
import { cn } from '@/lib/utils';

interface SiteFooterProps {
  variant?: 'marketing' | 'app';
  className?: string;
}

const uniSimLinks = [
  { uni: 'unam' as const, label: 'Examen UNAM' },
  { uni: 'ipn' as const, label: 'Examen IPN' },
  { uni: 'uam' as const, label: 'Examen UAM' },
];

export function SiteFooter({ variant = 'marketing', className }: SiteFooterProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const uni = parsePageUniversidad(searchParams.get('uni'));
  const plan = parsePlanScope(searchParams.get('plan'));
  const journey = marketingJourneyContext(uni, plan);

  if (variant === 'app') {
    const appJourney =
      uni !== 'todas' ? { uni, plan: 'universidad' as const } : undefined;

    return (
      <footer
        className={cn(
          'border-t border-border/60 bg-white/60 py-8 text-sm text-muted-foreground dark:bg-zinc-950/60',
          className
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 md:px-8">
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link
              href={buildJourneyHref('/dashboard', appJourney)}
              className="font-semibold text-foreground hover:underline"
            >
              Mi espacio
            </Link>
            <Link
              href={buildJourneyHref('/dashboard/estudio', appJourney)}
              className="hover:text-foreground hover:underline"
            >
              Estudio
            </Link>
            <Link href={PRIVACY_PATH} className="hover:text-foreground hover:underline">
              Privacidad
            </Link>
          </nav>
          <p className="text-center text-xs">PrepMX — preparación UNAM, IPN y UAM</p>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className={cn(
        'border-t border-zinc-200 bg-white py-12 font-sans text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950',
        className
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-col justify-between gap-8 px-4 sm:px-6 md:flex-row">
        <div>
          <div className="mb-1 text-sm font-black text-zinc-900 dark:text-zinc-50">PrepMX</div>
          <p className="max-w-xs leading-relaxed">
            El entrenamiento inteligente para los exámenes de admisión en México.
          </p>
          <p className="mt-4">© 2026 PrepMX. Todos los derechos reservados.</p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:flex sm:flex-wrap sm:gap-12">
          <div className="space-y-1.5">
            <div className="font-bold text-zinc-900 dark:text-zinc-300">Simuladores</div>
            {uniSimLinks.map(({ uni: u, label }) => (
              <Link
                key={u}
                href={buildJourneyHref('/simulador-gratis', { uni: u, plan: 'universidad' })}
                className="block hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="space-y-1.5">
            <div className="font-bold text-zinc-900 dark:text-zinc-300">Recursos</div>
            <Link href="/blog" className="block hover:text-zinc-900 dark:hover:text-zinc-100">
              Blog
            </Link>
            <a
              href={CONTACT_MAILTO}
              className="block hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Contacto
            </a>
            <Link
              href={buildJourneyHref('/precios', journey)}
              className={cn(
                'block hover:text-zinc-900 dark:hover:text-zinc-100',
                pathname === '/precios' && 'font-semibold text-zinc-900 dark:text-zinc-100'
              )}
            >
              Planes y precios
            </Link>
          </div>
          <div className="space-y-1.5">
            <div className="font-bold text-zinc-900 dark:text-zinc-300">Legal</div>
            <Link href={TERMS_PATH} className="block hover:text-zinc-900 dark:hover:text-zinc-100">
              Términos y condiciones
            </Link>
            <Link href={PRIVACY_PATH} className="block hover:text-zinc-900 dark:hover:text-zinc-100">
              Aviso de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
