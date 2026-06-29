import { landingContainer } from '@/lib/design-system/layout';
import { cn } from '@/lib/utils';

const UNIVERSITIES = [
  {
    siglas: 'UNAM',
    nombre: 'Universidad Nacional Autónoma de México',
    detalle: 'Examen de selección · 120 reactivos',
  },
  {
    siglas: 'IPN',
    nombre: 'Instituto Politécnico Nacional',
    detalle: 'Examen en línea · 140 reactivos',
  },
  {
    siglas: 'UAM',
    nombre: 'Universidad Autónoma Metropolitana',
    detalle: 'Puntaje compuesto · 70 reactivos',
  },
] as const;

export function UniversityLogosStrip({ className }: { className?: string }) {
  return (
    <section
      aria-label="Universidades compatibles"
      className={cn('border-y border-border/60 bg-muted/30 py-8 md:py-10', className)}
    >
      <div className={landingContainer}>
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Preparación oficial para
        </p>
        <ul className="flex flex-col items-stretch justify-center gap-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between md:gap-12">
          {UNIVERSITIES.map((uni) => (
            <li
              key={uni.siglas}
              className="group flex min-w-[9rem] flex-1 flex-col items-center text-center transition-all duration-300 sm:max-w-[14rem]"
            >
              <span
                className={cn(
                  'flex h-14 w-14 items-center justify-center rounded-xl border border-border/80 bg-card',
                  'text-lg font-extrabold tracking-tight text-muted-foreground',
                  'grayscale transition-all duration-300',
                  'group-hover:grayscale-0 group-hover:text-foreground group-hover:shadow-md'
                )}
                aria-hidden
              >
                {uni.siglas.slice(0, 2)}
              </span>
              <span className="mt-3 text-sm font-bold tracking-tight text-foreground/80 grayscale transition-all duration-300 group-hover:grayscale-0">
                {uni.siglas}
              </span>
              <span className="mt-1 max-w-[12rem] text-[11px] leading-snug text-muted-foreground grayscale transition-all duration-300 group-hover:grayscale-[0.35]">
                {uni.detalle}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
