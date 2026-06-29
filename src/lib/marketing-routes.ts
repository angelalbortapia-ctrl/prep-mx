/**
 * Rutas públicas de marketing — usadas para validar enlaces del footer, ticker y CTAs.
 */

export const MARKETING_PUBLIC_PATHS = [
  '/',
  '/simulador-gratis',
  '/precios',
  '/terminos',
  '/aviso-de-privacidad',
  '/blog',
  '/sign-in',
  '/sign-up',
  '/proyecto',
] as const;

export type MarketingPublicPath = (typeof MARKETING_PUBLIC_PATHS)[number];

const MARKETING_PATH_SET = new Set<string>(MARKETING_PUBLIC_PATHS);

/** Anclas válidas en la landing y páginas de precios. */
export const MARKETING_HASH_ANCHORS = new Set([
  'planes',
  'showcase',
  'universidades',
  'temario-oficial',
]);

export function parseInternalHref(href: string): { pathname: string; hash?: string } | null {
  const trimmed = href.trim();
  if (!trimmed.startsWith('/')) return null;
  if (trimmed.startsWith('//')) return null;

  const [pathPart, hashPart] = trimmed.split('#');
  const pathname = pathPart.split('?')[0] || '/';
  const hash = hashPart?.trim() || undefined;
  return { pathname, hash };
}

/** true si el href interno apunta a una ruta pública conocida (o blog post). */
export function isKnownMarketingHref(href: string): boolean {
  const parsed = parseInternalHref(href);
  if (!parsed) return false;

  const { pathname, hash } = parsed;

  if (hash && !MARKETING_HASH_ANCHORS.has(hash)) {
    return false;
  }

  if (MARKETING_PATH_SET.has(pathname)) return true;
  if (pathname.startsWith('/blog/') && pathname.length > '/blog/'.length) return true;

  return false;
}

/** Devuelve href seguro o undefined si la ruta no es pública conocida. */
export function sanitizeMarketingHref(href: string | undefined): string | undefined {
  if (!href?.trim()) return undefined;
  const trimmed = href.trim();
  if (trimmed.startsWith('mailto:') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return isKnownMarketingHref(trimmed) ? trimmed : undefined;
}
