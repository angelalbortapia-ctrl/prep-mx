import type { OpcionId, Question, QuestionOption } from '@/types/question';

const LABELS: OpcionId[] = ['A', 'B', 'C', 'D', 'E'];

function shuffleInPlace<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

/** Mezcla el orden de las opciones y reasigna letras A–D para que la correcta no quede siempre en B. */
export function shuffleQuestionOptions(question: Question): Question {
  if (question.opciones.length <= 1) return question;

  const correctOriginal = question.opcion_correcta;
  const shuffled = shuffleInPlace([...question.opciones]);

  const opciones: QuestionOption[] = shuffled.map((opt, index) => ({
    id: LABELS[index] ?? opt.id,
    texto: opt.texto,
  }));

  const correctIndex = shuffled.findIndex((opt) => opt.id === correctOriginal);
  const opcion_correcta = opciones[correctIndex >= 0 ? correctIndex : 0]?.id ?? question.opcion_correcta;

  return { ...question, opciones, opcion_correcta };
}

/** Elimina duplicados por id o enunciado y baraja opciones de cada pregunta. */
export function prepareExamQuestions(questions: Question[]): Question[] {
  const seen = new Set<string>();
  const unique: Question[] = [];

  for (const q of questions) {
    const key = q.id.startsWith('demo') ? q.id : `${q.id}:${q.pregunta.slice(0, 120)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(shuffleQuestionOptions(q));
  }

  return unique;
}
