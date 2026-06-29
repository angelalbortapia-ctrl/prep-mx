import { bunnyQuestionImagePath, resolveBunnyAssetUrl } from '@/lib/bunny';
import type { OpcionId } from '@/types/question';

/** Lo que se guarda en Supabase (rutas relativas o prefijos bunny:/video:). */
export interface QuestionMediaStored {
  stem?: string;
  explicacion?: string;
  video?: string;
  opciones?: Partial<Record<OpcionId, string>>;
}

/** URLs listas para el cliente tras resolver el CDN. */
export interface QuestionMediaResolved {
  stemUrl?: string | null;
  explicacionUrl?: string | null;
  videoEmbedUrl?: string | null;
  opciones?: Partial<Record<OpcionId, string | null>>;
}

const BASE64_DATA_URI = /^data:image\//i;
const BASE64_BLOB = /^[A-Za-z0-9+/=\s]{500,}$/;

const OPCION_IDS = new Set(['A', 'B', 'C', 'D', 'E']);

export function isForbiddenEmbeddedImage(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  if (BASE64_DATA_URI.test(v)) return true;
  if (v.length >= 500 && BASE64_BLOB.test(v.replace(/\s/g, ''))) return true;
  return false;
}

/** Valida ruta/URL de asset (rechaza Base64 embebido). */
export function isValidQuestionMediaPath(value: string): boolean {
  const v = value.trim();
  if (!v || v.length > 512) return false;
  if (isForbiddenEmbeddedImage(v)) return false;
  if (/^https?:\/\//i.test(v)) return true;
  if (v.startsWith('bunny:') || v.startsWith('video:')) return true;
  if (v.includes('..')) return false;
  return /^[a-z0-9][a-z0-9/_\-.]+$/i.test(v);
}

export function parseQuestionMediaStored(raw: unknown): QuestionMediaStored | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const obj = raw as Record<string, unknown>;
  const media: QuestionMediaStored = {};

  const pick = (key: keyof QuestionMediaStored) => {
    const val = obj[key];
    if (typeof val === 'string' && val.trim()) {
      (media as Record<string, string>)[key] = val.trim();
    }
  };

  pick('stem');
  pick('explicacion');
  pick('video');

  if (obj.opciones && typeof obj.opciones === 'object' && !Array.isArray(obj.opciones)) {
    const opciones: Partial<Record<OpcionId, string>> = {};
    for (const [id, path] of Object.entries(obj.opciones as Record<string, unknown>)) {
      const key = id.toUpperCase();
      if (!OPCION_IDS.has(key) || typeof path !== 'string' || !path.trim()) continue;
      opciones[key as OpcionId] = path.trim();
    }
    if (Object.keys(opciones).length) media.opciones = opciones;
  }

  return Object.keys(media).length ? media : null;
}

/** Acepta `media` objeto o campo plano `imagen` / `imagen_stem` del JSON de importación. */
export function extractMediaFromImportRow(row: Record<string, unknown>): QuestionMediaStored | null {
  const fromMedia = parseQuestionMediaStored(row.media);
  if (fromMedia) return fromMedia;

  const stem =
    (typeof row.imagen === 'string' && row.imagen) ||
    (typeof row.imagen_stem === 'string' && row.imagen_stem) ||
    (typeof row.image === 'string' && row.image) ||
    (typeof row.imagen_url === 'string' && row.imagen_url);

  if (typeof stem === 'string' && stem.trim()) {
    return { stem: stem.trim() };
  }
  return null;
}

/** Convierte nombre corto → ruta estándar en el Pull Zone. */
export function normalizeMediaPathsForDb(
  media: QuestionMediaStored,
  ctx: { universidad: string; materia: string; questionId: string }
): QuestionMediaStored {
  const normalize = (path: string | undefined, variant?: string): string | undefined => {
    if (!path?.trim()) return undefined;
    const p = path.trim();
    if (isForbiddenEmbeddedImage(p)) {
      throw new Error('Base64 embebido no permitido — sube la imagen a Bunny.net');
    }
    if (!isValidQuestionMediaPath(p)) {
      throw new Error(`Ruta de imagen inválida: ${p.slice(0, 80)}`);
    }
    if (
      /^https?:\/\//i.test(p) ||
      p.startsWith('bunny:') ||
      p.startsWith('video:') ||
      p.startsWith('questions/')
    ) {
      return p;
    }
    const filename = p.replace(/^.*\//, '');
    const baseId = filename.includes('.') ? filename.replace(/\.[^.]+$/, '') : ctx.questionId;
    const extMatch = filename.match(/\.([a-z0-9]+)$/i);
    const ext = (extMatch?.[1] ?? 'webp') as 'webp' | 'png' | 'jpg' | 'jpeg' | 'svg';
    return bunnyQuestionImagePath({
      universidad: ctx.universidad,
      materia: ctx.materia,
      questionId: baseId,
      ext,
      variant,
    });
  };

  const out: QuestionMediaStored = {};
  const stem = normalize(media.stem);
  if (stem) out.stem = stem;
  const explicacion = normalize(media.explicacion, 'explicacion');
  if (explicacion) out.explicacion = explicacion;
  if (media.video?.trim()) {
    const v = media.video.trim();
    out.video = v.startsWith('video:') ? v : `video:${v}`;
  }
  if (media.opciones) {
    const opciones: Partial<Record<OpcionId, string>> = {};
    for (const [id, path] of Object.entries(media.opciones)) {
      const normalized = normalize(path, `opcion-${id.toLowerCase()}`);
      if (normalized) opciones[id as OpcionId] = normalized;
    }
    if (Object.keys(opciones).length) out.opciones = opciones;
  }
  return out;
}

export function resolveQuestionMedia(stored: QuestionMediaStored | null | undefined): QuestionMediaResolved {
  if (!stored) return {};
  const resolved: QuestionMediaResolved = {
    stemUrl: stored.stem ? resolveBunnyAssetUrl(stored.stem) : null,
    explicacionUrl: stored.explicacion ? resolveBunnyAssetUrl(stored.explicacion) : null,
    videoEmbedUrl: stored.video ? resolveBunnyAssetUrl(stored.video) : null,
  };
  if (stored.opciones) {
    resolved.opciones = {};
    for (const [id, path] of Object.entries(stored.opciones)) {
      resolved.opciones[id as OpcionId] = resolveBunnyAssetUrl(path);
    }
  }
  return resolved;
}

export function validateMediaStored(media: QuestionMediaStored): string[] {
  const errors: string[] = [];
  const check = (field: string, value?: string) => {
    if (!value) return;
    if (isForbiddenEmbeddedImage(value)) {
      errors.push(`${field}: no uses Base64 — sube el archivo a Bunny y guarda la ruta CDN`);
      return;
    }
    if (!value.startsWith('video:') && !isValidQuestionMediaPath(value)) {
      errors.push(`${field}: ruta o URL de imagen inválida`);
    }
  };
  check('media.stem', media.stem);
  check('media.explicacion', media.explicacion);
  if (media.video && !media.video.startsWith('video:') && !/^[\w-]+$/.test(media.video)) {
    errors.push('media.video: usa prefijo video:ID o un ID de Bunny Stream');
  }
  if (media.opciones) {
    for (const [id, path] of Object.entries(media.opciones)) {
      check(`media.opciones.${id}`, path);
    }
  }
  return errors;
}
