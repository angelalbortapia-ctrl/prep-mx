import type { Question } from '@/types/question';

export interface QuestionIntegrityIssue {
  id: string;
  field: string;
  message: string;
}

const OPCION_IDS = new Set(['A', 'B', 'C', 'D', 'E']);

function normalizeOptionText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\\,/g, ',')
    .trim()
    .toLowerCase();
}

/** Reglas estructurales + ambigüedad de opciones (sin Supabase). */
export function validateQuestionIntegrity(q: Question): QuestionIntegrityIssue[] {
  const issues: QuestionIntegrityIssue[] = [];
  const label = q.id || q.pregunta.slice(0, 40);

  if (!q.pregunta.trim()) {
    issues.push({ id: label, field: 'pregunta', message: 'enunciado vacío' });
  }
  if (!q.explicacion.trim()) {
    issues.push({ id: label, field: 'explicacion', message: 'explicación vacía' });
  }
  if (q.opciones.length < 2 || q.opciones.length > 5) {
    issues.push({
      id: label,
      field: 'opciones',
      message: `debe tener entre 2 y 5 opciones (tiene ${q.opciones.length})`,
    });
  }

  const ids = q.opciones.map((o) => o.id);
  if (!OPCION_IDS.has(q.opcion_correcta)) {
    issues.push({
      id: label,
      field: 'opcion_correcta',
      message: `id inválido: ${q.opcion_correcta}`,
    });
  }
  if (!ids.includes(q.opcion_correcta)) {
    issues.push({
      id: label,
      field: 'opcion_correcta',
      message: `«${q.opcion_correcta}» no existe en las opciones`,
    });
  }
  if (new Set(ids).size !== ids.length) {
    issues.push({ id: label, field: 'opciones', message: 'ids de opción duplicados' });
  }

  const texts = q.opciones.map((o) => normalizeOptionText(o.texto));
  const dup = texts.filter((t, i) => texts.indexOf(t) !== i);
  if (dup.length) {
    issues.push({
      id: label,
      field: 'opciones',
      message: 'dos o más opciones con el mismo texto (ambiguo)',
    });
  }

  for (const o of q.opciones) {
    if (!o.texto.trim()) {
      issues.push({ id: label, field: `opciones.${o.id}`, message: 'texto vacío' });
    }
  }

  return issues;
}
