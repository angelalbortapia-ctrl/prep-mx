/**
 * Esquema Zod + validación KaTeX para lotes JSON antes de insertar en Supabase.
 */
import katex from 'katex';
import { z } from 'zod';
import type { GeminiQuestion } from './normalize-gemini';
import {
  extractMediaFromImportRow,
  validateMediaStored,
} from '../src/lib/question-media';

const OPCION_IDS = ['A', 'B', 'C', 'D', 'E'] as const;

export const OpcionIdSchema = z.enum(OPCION_IDS);

export const QuestionOptionSchema = z.object({
  id: z
    .string()
    .trim()
    .transform((v) => v.toUpperCase())
    .pipe(OpcionIdSchema),
  texto: z.string().min(1, 'texto de opción vacío'),
});

export const QuestionMediaImportSchema = z
  .object({
    stem: z.string().max(512).optional(),
    explicacion: z.string().max(512).optional(),
    video: z.string().max(120).optional(),
    opciones: z.record(z.string().max(512)).optional(),
  })
  .optional();

export const ImportQuestionSchema = z
  .object({
    import_key: z.string().min(1).max(120).optional(),
    slug: z.string().min(1).max(120).optional(),
    id: z.string().min(1).max(120).optional(),
    universidad: z.string().min(1, 'universidad requerida'),
    area: z.string().optional(),
    materia: z.string().min(1, 'materia requerida'),
    tema: z.string().min(1, 'tema requerido'),
    pregunta: z.string().min(1, 'pregunta vacía'),
    opciones: z
      .array(QuestionOptionSchema)
      .min(2, 'mínimo 2 opciones')
      .max(5, 'máximo 5 opciones'),
    opcion_correcta: z
      .string()
      .trim()
      .transform((v) => v.toUpperCase())
      .pipe(OpcionIdSchema),
    explicacion: z.string().min(1, 'explicación vacía'),
    dificultad: z.enum(['easy', 'medium', 'hard']).optional(),
    /** Rutas Bunny CDN — ver src/lib/question-media.ts */
    media: QuestionMediaImportSchema,
    imagen: z.string().max(512).optional(),
    imagen_stem: z.string().max(512).optional(),
    image: z.string().max(512).optional(),
    imagen_url: z.string().max(512).optional(),
  })
  .strict()
  .refine((q) => q.opciones.some((o) => o.id === q.opcion_correcta), {
    message: 'opcion_correcta no coincide con ninguna opción',
    path: ['opcion_correcta'],
  })
  .refine((q) => new Set(q.opciones.map((o) => o.id)).size === q.opciones.length, {
    message: 'ids de opciones duplicados',
    path: ['opciones'],
  });

export type ImportQuestion = z.infer<typeof ImportQuestionSchema>;

export interface QuestionValidationIssue {
  index: number;
  field: string;
  message: string;
}

function tryRenderKatex(latex: string, label: string): string[] {
  const trimmed = latex.trim();
  if (!trimmed) return [`${label}: fórmula vacía`];
  try {
    katex.renderToString(trimmed, { throwOnError: true, strict: 'warn', output: 'html' });
    return [];
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return [`${label}: KaTeX inválido — ${msg}`];
  }
}

/** Valida delimitadores $ / $$ y renderiza cada fragmento con KaTeX. */
export function validateKatexInText(text: string, fieldLabel: string): string[] {
  const errors: string[] = [];
  const withoutEscaped = text.replace(/\\\$/g, '');

  const displayRegex = /\$\$([\s\S]*?)\$\$/g;
  let match: RegExpExecArray | null;
  while ((match = displayRegex.exec(withoutEscaped)) !== null) {
    errors.push(...tryRenderKatex(match[1], `${fieldLabel} [$$]`));
  }

  const withoutDisplay = withoutEscaped.replace(/\$\$[\s\S]*?\$\$/g, '');

  const inlineRegex = /\$([^$\n]+)\$/g;
  while ((match = inlineRegex.exec(withoutDisplay)) !== null) {
    errors.push(...tryRenderKatex(match[1], `${fieldLabel} [$]`));
  }

  const withoutInline = withoutDisplay.replace(/\$[^$\n]+\$/g, '');
  if (/\$/.test(withoutInline)) {
    errors.push(`${fieldLabel}: delimitador $ sin cerrar`);
  }

  return errors;
}

function collectKatexIssues(question: ImportQuestion, index: number): QuestionValidationIssue[] {
  const issues: QuestionValidationIssue[] = [];
  const fields: Array<[string, string]> = [
    ['pregunta', question.pregunta],
    ['explicacion', question.explicacion],
    ...question.opciones.map((o) => [`opciones.${o.id}`, o.texto] as [string, string]),
  ];

  for (const [field, text] of fields) {
    for (const msg of validateKatexInText(text, field)) {
      issues.push({ index, field, message: msg });
    }
  }
  return issues;
}

export interface ValidateBatchResult {
  ok: boolean;
  questions: GeminiQuestion[];
  issues: QuestionValidationIssue[];
}

/**
 * Valida un array crudo de preguntas. Si hay errores, no debe insertarse en producción.
 */
export function validateQuestionBatch(raw: unknown[], fileLabel: string): ValidateBatchResult {
  const issues: QuestionValidationIssue[] = [];
  const questions: GeminiQuestion[] = [];

  if (!Array.isArray(raw)) {
    return {
      ok: false,
      questions: [],
      issues: [{ index: -1, field: fileLabel, message: 'se esperaba un array JSON' }],
    };
  }

  raw.forEach((item, index) => {
    const parsed = ImportQuestionSchema.safeParse(item);
    if (!parsed.success) {
      for (const err of parsed.error.issues) {
        issues.push({
          index,
          field: err.path.join('.') || 'root',
          message: err.message,
        });
      }
      return;
    }

    const katexIssues = collectKatexIssues(parsed.data, index);
    if (katexIssues.length) {
      issues.push(...katexIssues);
      return;
    }

    const mediaRaw = extractMediaFromImportRow(parsed.data as Record<string, unknown>);
    if (mediaRaw) {
      const mediaIssues = validateMediaStored(mediaRaw);
      for (const message of mediaIssues) {
        issues.push({ index, field: 'media', message });
      }
      if (mediaIssues.length) return;
    }

    questions.push(parsed.data as GeminiQuestion);
  });

  return { ok: issues.length === 0, questions, issues };
}

export function formatValidationReport(fileLabel: string, issues: QuestionValidationIssue[]): string {
  const lines = issues.map((i) => {
    const where = i.index >= 0 ? `[${fileLabel} #${i.index + 1}]` : `[${fileLabel}]`;
    return `  ${where} ${i.field}: ${i.message}`;
  });
  return lines.join('\n');
}
