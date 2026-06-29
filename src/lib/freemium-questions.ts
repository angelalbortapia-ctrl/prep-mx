import { studyGuides, type QuizQuestion } from '@/data/study-guides';
import { BURST_FALLBACK_QUESTIONS } from '@/data/study-tools/burst-quiz';
import { freeDiagnosticQuestions } from '@/lib/diagnostic-questions';
import { prepareExamQuestions } from '@/lib/shuffle-question-options';
import type { Question } from '@/types/question';
import type { UniversidadFilter } from '@/lib/university-theme';
import { FREE_DIAGNOSTIC_QUESTION_LIMIT } from '@/types/subscription';

/** Materias típicas por universidad (subset del temario estático). */
const UNI_MATERIAS: Record<Exclude<UniversidadFilter, 'todas'>, string[]> = {
  unam: ['matematicas', 'fisica', 'quimica', 'historia', 'literatura', 'biologia', 'filosofia'],
  ipn: ['matematicas', 'fisica', 'quimica', 'biologia'],
  uam: ['matematicas', 'fisica', 'filosofia', 'historia'],
};

function quizToQuestion(q: QuizQuestion, materia: string, tema: string): Question {
  return {
    id: q.id,
    materia,
    tema,
    pregunta: q.pregunta,
    opciones: q.opciones,
    opcion_correcta: q.opcion_correcta,
    explicacion: q.explicacion,
    dificultad: 'medium',
  };
}

function dedupeByText(questions: Question[]): Question[] {
  const seen = new Set<string>();
  const out: Question[] = [];
  for (const q of questions) {
    const key = q.pregunta.slice(0, 80);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(q);
  }
  return out;
}

function buildStaticPool(): Question[] {
  const fromGuides = studyGuides.flatMap((g) =>
    g.quiz.map((q) => quizToQuestion(q, g.slug, g.materia))
  );
  return dedupeByText([
    ...freeDiagnosticQuestions,
    ...BURST_FALLBACK_QUESTIONS,
    ...fromGuides,
  ]);
}

/** Todas las preguntas del pool (validación / auditoría). */
export function getFreemiumPoolAll(): Question[] {
  return buildStaticPool();
}

/**
 * Banco freemium 100% estático (src/data) — sin Supabase ni auth.
 * Se ejecuta en el cliente para /simulador-gratis.
 */
export function getFreemiumQuestions(
  universidad: UniversidadFilter,
  limit = FREE_DIAGNOSTIC_QUESTION_LIMIT
): Question[] {
  const pool = buildStaticPool();

  if (universidad === 'todas') {
    return prepareExamQuestions(pool).slice(0, limit);
  }

  const materias = UNI_MATERIAS[universidad];
  const filtered = pool.filter((q) =>
    materias.some((m) => q.materia.toLowerCase().includes(m) || m.includes(q.materia.toLowerCase()))
  );

  const source = filtered.length >= limit ? filtered : pool;
  return prepareExamQuestions(source).slice(0, limit);
}
