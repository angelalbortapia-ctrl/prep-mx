import { GeistSans } from 'geist/font/sans';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';

/** Lectura larga: reactivos, guías, dashboard — alta altura de x en móvil */
export const fontReading = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-reading',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

/** Títulos: Geist Sans — limpio y moderno */
export const fontDisplay = GeistSans;

/** UNAM y ticker académico — solo donde el skin lo pide */
export const fontSerif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const fontVariables = cn(
  fontReading.variable,
  fontDisplay.variable,
  fontSerif.variable
);
