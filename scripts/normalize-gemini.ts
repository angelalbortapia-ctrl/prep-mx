import { createHash } from 'node:crypto';
import {
  extractMediaFromImportRow,
  normalizeMediaPathsForDb,
} from '../src/lib/question-media';

/** Gemini a veces escribe { "id": "D": "texto" } sin la clave "texto". */
export function fixGeminiJsonTypos(raw: string): string {
  return raw.replace(/"id":\s*"([ABCD])":\s*"/g, '"id": "$1", "texto": "');
}

/**
 * (ej. fresco "La escuela de Atenas"). Convierte esas comillas internas a apóstrofes.
 */
export function fixGeminiJsonQuotes(raw: string): string {
  let out = '';
  let i = 0;

  while (i < raw.length) {
    if (raw[i] !== '"') {
      out += raw[i++];
      continue;
    }

    out += '"';
    i++;
    let inner = '';

    while (i < raw.length) {
      if (raw[i] === '\\' && i + 1 < raw.length) {
        inner += raw[i] + raw[i + 1];
        i += 2;
        continue;
      }

      if (raw[i] === '"') {
        let j = i + 1;
        while (j < raw.length && /\s/.test(raw[j])) j++;
        const next = raw[j];

        let isClosing = next === '}' || next === ']' || next === ':';
        if (!isClosing && next === ',') {
          let k = j + 1;
          while (k < raw.length && /\s/.test(raw[k])) k++;
          isClosing = raw[k] === '"';
        }

        if (isClosing) {
          out += inner + '"';
          i++;
          break;
        }

        inner += "'";
        i++;
        continue;
      }

      inner += raw[i++];
    }
  }

  return out;
}

/** Limpia texto que Gemini rompe al exportar (saltos de línea, unicode, porcentajes). */
export function normalizeGeminiText(text: string | undefined | null): string {
  if (!text) return '';
  return (
    text
      .replace(/\u2212/g, '-')
      .replace(/\r\n/g, '\n')
      .replace(/(\d)\s*\n\s*("|$)/g, '$1%$2')
      .replace(/([a-zA-Z])\s*\n\s*(\d+)\s*\n/g, '$1^$2')
      .replace(/([A-Za-z])\s*\n\s*(\d+)\s*\n/g, '$1_$2')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export interface GeminiQuestion {
  /** Slug estable opcional — preferido para upsert al corregir KaTeX */
  import_key?: string;
  slug?: string;
  id?: string;
  universidad: string;
  area?: string;
  materia: string;
  tema: string;
  pregunta: string;
  opciones: { id: string; texto: string }[];
  opcion_correcta: string;
  explicacion: string;
  dificultad?: string;
  /** Rutas CDN Bunny (no Base64). */
  media?: import('@/lib/question-media').QuestionMediaStored;
  imagen?: string;
  imagen_stem?: string;
  image?: string;
  imagen_url?: string;
  [key: string]: unknown;
}

/**
 * Clave estable para upsert. Prioridad:
 * 1. `import_key` / `slug` / `id` explícito en el JSON (no UUID de BD)
 * 2. Hash de universidad + materia + tema + respuesta correcta + opciones
 */
export function computeQuestionImportKey(q: GeminiQuestion): string {
  const raw =
    (typeof q.import_key === 'string' && q.import_key.trim()) ||
    (typeof q.slug === 'string' && q.slug.trim()) ||
    (typeof q.id === 'string' && q.id.trim() && !UUID_RE.test(q.id) ? q.id.trim() : '');

  if (raw) {
    return raw.toLowerCase().replace(/\s+/g, '-').slice(0, 120);
  }

  const fingerprint = [
    String(q.universidad).toLowerCase().trim(),
    String(q.materia).toLowerCase().trim(),
    String(q.tema).toLowerCase().trim(),
    String(q.opcion_correcta).toUpperCase().trim(),
    JSON.stringify(
      (Array.isArray(q.opciones) ? q.opciones : []).map((o) =>
        normalizeGeminiText(typeof o === 'object' && o && 'texto' in o ? String(o.texto) : String(o))
      )
    ),
  ].join('|');

  return createHash('sha256').update(fingerprint).digest('hex').slice(0, 32);
}

export function toDbRow(q: GeminiQuestion) {
  if (!q.pregunta || !q.opcion_correcta || !q.opciones?.length) {
    throw new Error(`Pregunta incompleta: ${q.pregunta?.slice(0, 60) ?? '(sin texto)'}`);
  }
  const importKey = computeQuestionImportKey(q);
  const mediaRaw = extractMediaFromImportRow(q as Record<string, unknown>);
  const media = mediaRaw
    ? normalizeMediaPathsForDb(mediaRaw, {
        universidad: q.universidad,
        materia: q.materia,
        questionId: importKey,
      })
    : {};

  return {
    import_key: importKey,
    universidad: q.universidad,
    materia: q.materia,
    tema: q.tema,
    pregunta: normalizeGeminiText(q.pregunta),
    opciones: q.opciones.map((o) => ({
      id: o.id,
      texto: normalizeGeminiText(o.texto),
    })),
    opcion_correcta: q.opcion_correcta,
    explicacion: normalizeGeminiText(q.explicacion),
    dificultad: q.dificultad ?? 'medium',
    media,
  };
}
