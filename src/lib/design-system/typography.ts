import { cn } from '@/lib/utils';

/**
 * PrepMX — tipografía ergonómica para horas de lectura en móvil.
 *
 * - display (Geist Sans): títulos, font-bold/extrabold, tracking-tight
 * - sans (Plus Jakarta Sans): reactivos y cuerpo, font-normal, leading-relaxed
 * - KaTeX: fuente nativa; contenedor con aire (ver MathRenderer + globals.css)
 */

/** Hero y títulos de página */
export const headingHero = cn(
  'font-display text-balance font-extrabold tracking-tight',
  'text-[1.75rem] leading-[1.15] sm:text-4xl sm:leading-tight md:text-6xl'
);

/** Secciones y cards principales */
export const headingSection = cn(
  'font-display text-balance font-bold tracking-tight',
  'text-xl sm:text-2xl md:text-3xl'
);

/** Subtítulos y labels de bloque */
export const headingSubsection = cn(
  'font-display font-bold tracking-tight',
  'text-lg sm:text-xl'
);

/** Párrafos, listas y UI general */
export const readingBody = cn(
  'font-sans font-normal leading-relaxed text-pretty',
  'text-[0.9375rem] sm:text-base'
);

/** Enunciados de examen / ráfaga (texto + KaTeX) */
export const examStemText = cn(
  'font-sans font-normal leading-relaxed tracking-normal text-pretty'
);

/** Contenedor KaTeX — exponentes y fracciones con aire */
export const mathContentShell = cn('leading-relaxed tracking-wide');

/** Inline / opciones: aire vertical sin ensanchar letras */
export const mathContentCompact = cn('leading-relaxed tracking-normal');
