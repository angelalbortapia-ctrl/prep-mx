import { unstable_cache } from 'next/cache';
import type { OpcionId, Question, QuestionOption } from '@/types/question';
import type { DbQuestionRow } from '@/types/database';
import { parseQuestionMediaStored, resolveQuestionMedia } from '@/lib/question-media';
import { allDemoQuestions, freeDiagnosticQuestions } from '@/lib/diagnostic-questions';
import { prepareExamQuestions } from '@/lib/shuffle-question-options';
import { isSupabaseConfigured } from './client';
import { createStaticSupabaseClient } from './static';

function mapRow(row: DbQuestionRow): Question {
  const opcionesRaw = row.opciones as unknown as QuestionOption[];
  const media = resolveQuestionMedia(parseQuestionMediaStored(row.media));

  return {
    id: row.id,
    materia: row.materia,
    tema: row.tema,
    pregunta: row.pregunta,
    opciones: opcionesRaw.map((o) => ({
      ...o,
      imagenUrl: media.opciones?.[o.id] ?? null,
    })),
    opcion_correcta: row.opcion_correcta as OpcionId,
    explicacion: row.explicacion,
    dificultad: (row.dificultad as Question['dificultad']) ?? 'medium',
    imagenUrl: media.stemUrl,
    explicacionImagenUrl: media.explicacionUrl,
    explicacionVideoUrl: media.videoEmbedUrl,
  };
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function dedupeRows(rows: DbQuestionRow[]): DbQuestionRow[] {
  const seen = new Set<string>();
  const unique: DbQuestionRow[] = [];

  for (const row of rows) {
    if (seen.has(row.id)) continue;
    const textKey = row.pregunta.slice(0, 120);
    if (seen.has(textKey)) continue;
    seen.add(row.id);
    seen.add(textKey);
    unique.push(row);
  }

  return unique;
}

function demoFallback(limit: number): Question[] {
  const source = limit <= 20 ? freeDiagnosticQuestions : allDemoQuestions;
  return prepareExamQuestions(source).slice(0, limit);
}

export interface GetExamQuestionsOptions {
  limit: number;
  universidad?: string;
  /** Si false, RLS lógico: solo reactivos gratuitos (`is_premium = false`). */
  includePremium?: boolean;
}

async function supportsPremiumColumn(): Promise<boolean> {
  return unstable_cache(
    async () => {
      const supabase = createStaticSupabaseClient();
      const { error } = await supabase.from('questions').select('is_premium').limit(1);
      if (!error) return true;
      const msg = String(error.message);
      if (msg.includes('is_premium') || error.code === '42703') return false;
      return true;
    },
    ['prepmx-catalog', 'questions-is-premium-column'],
    { revalidate: 60 * 60 }
  )();
}

async function fetchFromSupabase(options: GetExamQuestionsOptions): Promise<Question[]> {
  const { limit, universidad, includePremium = false } = options;
  const supabase = createStaticSupabaseClient();
  const fetchLimit = Math.min(Math.max(limit * 8, 120), 500);
  const hasPremium = await supportsPremiumColumn();

  let countQuery = supabase
    .from('questions')
    .select('id', { count: 'exact', head: true })
    .eq('active', true);

  if (hasPremium && !includePremium) {
    countQuery = countQuery.eq('is_premium', false);
  }
  if (universidad) {
    countQuery = countQuery.ilike('universidad', universidad);
  }

  const { count, error: countError } = await countQuery;
  if (countError || !count) return [];

  const total = count;
  const maxOffset = Math.max(0, total - fetchLimit);
  const offset = maxOffset > 0 ? Math.floor(Math.random() * maxOffset) : 0;

  const selectCols = hasPremium
    ? 'id,materia,tema,pregunta,opciones,opcion_correcta,explicacion,dificultad,is_premium,media'
    : 'id,materia,tema,pregunta,opciones,opcion_correcta,explicacion,dificultad,media';

  let query = supabase
    .from('questions')
    .select(selectCols)
    .eq('active', true)
    .range(offset, offset + fetchLimit - 1);

  if (hasPremium && !includePremium) {
    query = query.eq('is_premium', false);
  }
  if (universidad) {
    query = query.ilike('universidad', universidad);
  }

  const { data, error } = await query;
  if (error || !data?.length) return [];

  const mapped = dedupeRows(shuffle(data as unknown as DbQuestionRow[])).map(mapRow);
  return prepareExamQuestions(mapped).slice(0, limit);
}

/** Preguntas para simulador: Supabase primero, demo si la BD está vacía o sin config. */
export async function getExamQuestions(
  limit: number,
  universidad?: string,
  includePremium = false
): Promise<Question[]> {
  if (!isSupabaseConfigured) {
    return demoFallback(limit);
  }

  try {
    const fromDb = await fetchFromSupabase({ limit, universidad, includePremium });
    if (fromDb.length >= Math.min(limit, 5)) return fromDb;
  } catch {
    // Supabase caído o sin permisos → demo
  }

  return demoFallback(limit);
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function localQuestionById(id: string): Question | null {
  const pool = [...freeDiagnosticQuestions, ...allDemoQuestions];
  return pool.find((q) => q.id === id) ?? null;
}

/** Una pregunta con explicación (solo servidor — modo ráfaga). */
export async function getQuestionById(id: string): Promise<Question | null> {
  if (!UUID_RE.test(id)) {
    return localQuestionById(id);
  }

  if (!isSupabaseConfigured) {
    return localQuestionById(id);
  }

  const supabase = createStaticSupabaseClient();
  const { data, error } = await supabase
    .from('questions')
    .select('id,materia,tema,pregunta,opciones,opcion_correcta,explicacion,dificultad,media')
    .eq('id', id)
    .eq('active', true)
    .maybeSingle();

  if (error || !data) {
    return localQuestionById(id);
  }

  return mapRow(data as unknown as DbQuestionRow);
}
