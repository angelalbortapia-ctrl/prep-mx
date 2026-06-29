import { conversion } from '@/lib/design-system/colors';
import { cn } from '@/lib/utils';

/**
 * PrepMX — botones defensivos (UI táctil, jerarquía clara).
 *
 * Reglas:
 * - Esquinas: rounded-xl (default) o rounded-2xl (hero). Nunca pill ni cuadrado.
 * - Badges/chips sí pueden usar rounded-full.
 * - Primario in-app: variant `default` (indigo confianza).
 * - Conversión: variant `conversion` (violeta — solo registro/compra).
 */

/** Radio estándar en las ~28 páginas */
export const buttonRadius = 'rounded-xl';

/** CTA hero / sticky móvil destacado */
export const buttonRadiusHero = 'rounded-2xl';

/** Apple HIG ~44px — mínimo táctil */
export const buttonTouchMin = 'min-h-11';

/** CTA principal (imán de clicks) — 48px en móvil */
export const buttonCta = cn(buttonTouchMin, 'h-12 px-6 text-sm');

/** Acción secundaria estándar */
export const buttonDefault = cn(buttonTouchMin, 'h-11 px-4');

/** Marketing — simulador gratis / Pase Pro */
export const landingCtaPrimary = cn(conversion.cta, buttonCta, buttonRadius);

/** Explorar sin compromiso */
export const landingCtaSecondary = cn(
  buttonCta,
  buttonRadius,
  'border border-border bg-background font-semibold text-foreground',
  'hover:border-zinc-300 hover:bg-muted',
  'dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100',
  'dark:hover:border-zinc-600 dark:hover:bg-zinc-800'
);

/** Enlace discreto en tarjetas */
export const landingCtaLink = cn(
  'font-semibold text-muted-foreground',
  'hover:text-foreground hover:underline'
);

export const LANDING_SIMULATOR_CTA = 'Iniciar simulacro gratis';
export const LANDING_PRO_CHECKOUT_CTA = 'Comprar Pase Pro';
