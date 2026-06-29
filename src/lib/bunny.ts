/**
 * Bunny.net — entrega de assets pesados (imágenes de reactivos, PDFs de guías, video explicativo).
 *
 * Supabase guarda metadatos y rutas; el ancho de banda sale por CDN global (~$0.01/GB).
 * En BD guarda rutas relativas, p. ej. `questions/unam/fisica/abc-diagrama.webp`
 * o IDs de Stream, p. ej. `video:9f3c2a1b-...`.
 *
 * Columna Supabase: `questions.media` (JSONB). Ver `src/lib/question-media.ts`.
 */

const BUNNY_CDN_HOST = process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME?.replace(/\/$/, '') ?? '';
const BUNNY_LIBRARY_ID = process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID?.trim() ?? '';

const STREAM_EMBED_BASE = 'https://iframe.mediadelivery.net/embed';
const STREAM_HLS_BASE = 'https://vz-{libraryId}.b-cdn.net';

/** Carpetas estándar en el Pull Zone de Bunny Storage. */
export const BUNNY_ASSET_ROOTS = {
  questions: 'questions',
  guides: 'guides',
  marketing: 'marketing',
} as const;

export type BunnyAssetRoot = (typeof BUNNY_ASSET_ROOTS)[keyof typeof BUNNY_ASSET_ROOTS];

export interface BunnyQuestionImagePathInput {
  universidad: string;
  materia: string;
  questionId: string;
  /** Por defecto webp (optimizado para diagramas de geometría/física). */
  ext?: 'webp' | 'png' | 'jpg' | 'jpeg' | 'svg';
  /** Sufijo opcional: `diagrama`, `figura`, etc. */
  variant?: string;
}

export interface BunnyStudyGuidePathInput {
  materia: string;
  slug: string;
}

export interface BunnyVideoEmbedOptions {
  autoplay?: boolean;
  preload?: boolean;
  responsive?: boolean;
  /** Token firmado de Bunny Stream (premium). */
  token?: string;
  expires?: number;
}

export function isBunnyConfigured(): boolean {
  return Boolean(BUNNY_CDN_HOST);
}

export function isBunnyStreamConfigured(): boolean {
  return Boolean(BUNNY_LIBRARY_ID);
}

/** Hostname del Pull Zone, sin protocolo (ej. `prepmx.b-cdn.net`). */
export function getBunnyCdnHostname(): string | null {
  return BUNNY_CDN_HOST || null;
}

export function getBunnyStreamLibraryId(): string | null {
  return BUNNY_LIBRARY_ID || null;
}

/** Normaliza rutas: quita `/` inicial y espacios. */
export function normalizeBunnyPath(path: string): string {
  return path.trim().replace(/^\/+/, '');
}

/** ¿La URL ya apunta al CDN de Bunny? */
export function isBunnyCdnUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host.endsWith('.b-cdn.net') || host.endsWith('bunnycdn.com');
  } catch {
    return false;
  }
}

/**
 * Construye URL pública del Pull Zone.
 * @example bunnyCdnUrl('questions/unam/fisica/fig-01.webp')
 *          → https://prepmx.b-cdn.net/questions/unam/fisica/fig-01.webp
 */
export function bunnyCdnUrl(path: string): string | null {
  const normalized = normalizeBunnyPath(path);
  if (!normalized) return null;
  if (!BUNNY_CDN_HOST) return null;
  return `https://${BUNNY_CDN_HOST}/${normalized}`;
}

export function bunnyQuestionImagePath(input: BunnyQuestionImagePathInput): string {
  const uni = input.universidad.toLowerCase().replace(/\s+/g, '-');
  const materia = input.materia.toLowerCase().replace(/\s+/g, '-');
  const ext = input.ext ?? 'webp';
  const suffix = input.variant ? `-${input.variant}` : '';
  return `${BUNNY_ASSET_ROOTS.questions}/${uni}/${materia}/${input.questionId}${suffix}.${ext}`;
}

export function bunnyQuestionImageUrl(input: BunnyQuestionImagePathInput): string | null {
  return bunnyCdnUrl(bunnyQuestionImagePath(input));
}

export function bunnyStudyGuidePath(input: BunnyStudyGuidePathInput): string {
  const materia = input.materia.toLowerCase().replace(/\s+/g, '-');
  const slug = input.slug.toLowerCase().replace(/\s+/g, '-');
  return `${BUNNY_ASSET_ROOTS.guides}/${materia}/${slug}.pdf`;
}

export function bunnyStudyGuideUrl(input: BunnyStudyGuidePathInput): string | null {
  return bunnyCdnUrl(bunnyStudyGuidePath(input));
}

/**
 * Resuelve lo guardado en Supabase a URL de entrega.
 *
 * Formatos soportados:
 * - URL absoluta (`https://...`) → se devuelve tal cual si es http(s)
 * - Ruta relativa (`questions/unam/...`) → CDN Pull Zone
 * - Prefijo `bunny:` → ruta explícita en el zone
 * - Prefijo `video:` → ID de Bunny Stream (devuelve embed URL, no imagen)
 */
export function resolveBunnyAssetUrl(
  stored: string | null | undefined,
  options?: { signed?: boolean; expiresInSeconds?: number }
): string | null {
  if (!stored?.trim()) return null;

  const raw = stored.trim();

  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  if (raw.startsWith('bunny:')) {
    return bunnyCdnUrl(raw.slice('bunny:'.length));
  }

  if (raw.startsWith('video:')) {
    const videoId = raw.slice('video:'.length).trim();
    return videoId ? bunnyVideoEmbedUrl(videoId) : null;
  }

  const cdnUrl = bunnyCdnUrl(raw);
  if (!cdnUrl) return null;

  if (options?.signed) {
    // Firma async — en Server Components / API usar resolveBunnyAssetUrlSigned().
    return cdnUrl;
  }

  return cdnUrl;
}

/** Embed de Bunny Stream para explicaciones en video post-respuesta. */
export function bunnyVideoEmbedUrl(
  videoId: string,
  opts: BunnyVideoEmbedOptions = {}
): string | null {
  const id = videoId.trim();
  if (!id || !BUNNY_LIBRARY_ID) return null;

  const params = new URLSearchParams();
  params.set('autoplay', String(opts.autoplay ?? false));
  params.set('preload', String(opts.preload ?? false));
  params.set('responsive', String(opts.responsive ?? true));
  if (opts.token) params.set('token', opts.token);
  if (opts.expires) params.set('expires', String(opts.expires));

  const qs = params.toString();
  return `${STREAM_EMBED_BASE}/${BUNNY_LIBRARY_ID}/${id}${qs ? `?${qs}` : ''}`;
}

/** HLS directo (reproductor nativo / app móvil). */
export function bunnyVideoHlsUrl(videoId: string): string | null {
  const id = videoId.trim();
  if (!id || !BUNNY_LIBRARY_ID) return null;
  const base = STREAM_HLS_BASE.replace('{libraryId}', BUNNY_LIBRARY_ID);
  return `${base}/${id}/playlist.m3u8`;
}

/**
 * Firma URL del Pull Zone (Token Authentication).
 * Solo servidor — requiere BUNNY_CDN_TOKEN_KEY en .env.local.
 * @see https://docs.bunny.net/docs/cdn-token-authentication
 */
export async function signBunnyCdnUrl(
  pathOrUrl: string,
  expiresInSeconds = 3600
): Promise<string | null> {
  const securityKey = process.env.BUNNY_CDN_TOKEN_KEY?.trim();
  if (!securityKey) return null;

  const baseUrl =
    /^https?:\/\//i.test(pathOrUrl) ? pathOrUrl : bunnyCdnUrl(pathOrUrl);
  if (!baseUrl) return null;

  const parsed = new URL(baseUrl);
  const expires = Math.floor(Date.now() / 1000) + Math.max(60, expiresInSeconds);
  const hashable = securityKey + parsed.pathname + expires;
  const token = await sha256Base64Url(hashable);

  parsed.searchParams.set('token', token);
  parsed.searchParams.set('expires', String(expires));
  return parsed.toString();
}

/** Variante async de resolveBunnyAssetUrl con firma para contenido premium. */
export async function resolveBunnyAssetUrlSigned(
  stored: string | null | undefined,
  expiresInSeconds = 3600
): Promise<string | null> {
  if (!stored?.trim()) return null;
  const raw = stored.trim();

  if (/^https?:\/\//i.test(raw)) {
    if (!isBunnyCdnUrl(raw)) return raw;
    const path = new URL(raw).pathname;
    return signBunnyCdnUrl(path, expiresInSeconds);
  }

  if (raw.startsWith('video:')) {
    return resolveBunnyAssetUrl(raw);
  }

  const path = raw.startsWith('bunny:') ? raw.slice('bunny:'.length) : raw;
  return signBunnyCdnUrl(path, expiresInSeconds);
}

async function sha256Base64Url(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const bytes = Array.from(new Uint8Array(hash));
  const binary = String.fromCharCode(...bytes);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
