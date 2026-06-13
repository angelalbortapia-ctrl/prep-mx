import type { OpcionId, Question, QuestionOption } from '@/types/question';
import { allDemoQuestions, freeDiagnosticQuestions } from '@/lib/diagnostic-questions';
import { prepareExamQuestions } from '@/lib/shuffle-question-options';
import { isSupabaseConfigured } from './client';
import { createServerSupabaseClient } from './server';

type DbQuestionRow = {
  id: string;
  materia: string;
  tema: string;
  pregunta: string;
  opciones: QuestionOption[];
  opcion_correcta: string;
  explicacion: string;
  dificultad?: string | null;
};

function mapRow(row: DbQuestionRow): Question {
  return {
    id: row.id,
    materia: row.materia,
    tema: row.tema,
    pregunta: row.pregunta,
    opciones: row.opciones,
    opcion_correcta: row.opcion_correcta as OpcionId,
    explicacion: row.explicacion,
    dificultad: (row.dificultad as Question['dificultad']) ?? 'medium',
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

async function fetchFromSupabase(limit: number, universidad?: string): Promise<Question[]> {
  const supabase = createServerSupabaseClient();
  const fetchLimit = Math.min(Math.max(limit * 8, 120), 500);

  let countQuery = supabase
    .from('questions')
    .select('id', { count: 'exact', head: true })
    .eq('active', true);

  if (universidad) {
    countQuery = countQuery.ilike('universidad', universidad);
  }

  const { count, error: countError } = await countQuery;
  if (countError || !count) return [];

  const total = count;
  const maxOffset = Math.max(0, total - fetchLimit);
  const offset = maxOffset > 0 ? Math.floor(Math.random() * maxOffset) : 0;

  let query = supabase
    .from('questions')
    .select('id,materia,tema,pregunta,opciones,opcion_correcta,explicacion,dificultad')
    .eq('active', true)
    .range(offset, offset + fetchLimit - 1);

  if (universidad) {
    query = query.ilike('universidad', universidad);
  }

  const { data, error } = await query;
  if (error || !data?.length) return [];

  const mapped = dedupeRows(shuffle(data as DbQuestionRow[])).map(mapRow);
  return prepareExamQuestions(mapped).slice(0, limit);
}

/** Preguntas para simulador: Supabase primero, demo si la BD está vacía o sin config. */
export async function getExamQuestions(limit: number, universidad?: string): Promise<Question[]> {
  if (!isSupabaseConfigured) {
    return demoFallback(limit);
  }

  try {
    const fromDb = await fetchFromSupabase(limit, universidad);
    if (fromDb.length >= Math.min(limit, 5)) return fromDb;
  } catch {
    // Supabase caído o sin permisos → demo
  }

  return demoFallback(limit);
}
