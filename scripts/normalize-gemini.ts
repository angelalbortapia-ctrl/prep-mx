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
          // Cierre real: después de la coma viene otra clave JSON entre comillas
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
      // "25\n" al final de opción → 25%
      .replace(/(\d)\s*\n\s*("|$)/g, '$1%$2')
      // x\n2\n → x^2 (exponentes rotos)
      .replace(/([a-zA-Z])\s*\n\s*(\d+)\s*\n/g, '$1^$2')
      // H₂O rotos: H \n2\n → H_2
      .replace(/([A-Za-z])\s*\n\s*(\d+)\s*\n/g, '$1_$2')
      // espacios múltiples
      .replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

export interface GeminiQuestion {
  universidad: string;
  area?: string;
  materia: string;
  tema: string;
  pregunta: string;
  opciones: { id: string; texto: string }[];
  opcion_correcta: string;
  explicacion: string;
  dificultad?: string;
  [key: string]: unknown;
}

export function toDbRow(q: GeminiQuestion) {
  if (!q.pregunta || !q.opcion_correcta || !q.opciones?.length) {
    throw new Error(`Pregunta incompleta: ${q.pregunta?.slice(0, 60) ?? '(sin texto)'}`);
  }
  return {
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
  };
}
