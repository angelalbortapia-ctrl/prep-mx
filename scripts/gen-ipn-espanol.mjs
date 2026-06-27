/**
 * Genera src/data/ipn-temario-espanol.ts — Examen IPN.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../src/data/ipn-temario-espanol.ts');

const topics = [
  {
    id: 'ipn-esp-5-1',
    codigo: '5.1',
    titulo: 'Sintaxis y estructura oracional compleja',
    orden: 1,
    children: [
      {
        id: 'ipn-esp-5-1-1',
        codigo: '5.1.1',
        titulo: 'Complementos del predicado',
        descripcion:
          'Análisis morfosintáctico riguroso para localizar e identificar en oraciones largas: Objeto Directo (sustituible por lo, la, los, las), Objeto Indirecto (sustituible por le, les), y todos los tipos de Complementos Circunstanciales (Tiempo, Lugar, Modo, Causa, Compañía, Instrumento, Finalidad).',
        orden: 1,
      },
      {
        id: 'ipn-esp-5-1-2',
        codigo: '5.1.2',
        titulo: 'Oraciones compuestas subordinadas',
        descripcion:
          'Distinción analítica entre proposiciones principales y subordinadas Sustantivas (funcionan como sujeto u objeto directo), Adjetivas o de Relativo (modifican a un sustantivo antecedente utilizando que, el cual, cuyo) y Adverbiales (indican tiempo, modo, lugar o nexos lógicos como condicionales, concesivas o consecutivas).',
        orden: 2,
      },
    ],
  },
  {
    id: 'ipn-esp-5-2',
    codigo: '5.2',
    titulo: 'Ortografía normativa y vicios de redacción',
    orden: 2,
    children: [
      {
        id: 'ipn-esp-5-2-1',
        codigo: '5.2.1',
        titulo: 'Reglas de grafías homófonas en contexto',
        descripcion:
          'Reactivos donde debes rellenar espacios en blanco con la letra correcta basándote en el significado de la palabra (ej. tubo de cilindro con b vs. tuvo del verbo tener con v; acerbo áspero con b vs. acervo patrimonio con v; echo del verbo echar vs. hecho del verbo hacer).',
        orden: 1,
      },
      {
        id: 'ipn-esp-5-2-2',
        codigo: '5.2.2',
        titulo: 'Solecismos y concordancia de colectivos',
        descripcion:
          'Detección de errores sintácticos complejos en oraciones con sujetos colectivos (ej. la forma incorrecta "La mayoría de los estudiantes aprobaron" frente a la correcta "La mayoría de los estudiantes aprobó", dado que el núcleo gramatical es el sustantivo singular mayoría). Corrección del uso inadecuado del gerundio de posterioridad (ej. incorrecto: "Estudió toda la noche ingresando al IPN"; correcto: "Estudió toda la noche e ingresó al IPN").',
        orden: 2,
      },
    ],
  },
];

function normalize(node, fallbackOrden) {
  const base = {
    id: node.id,
    codigo: node.codigo,
    titulo: node.titulo,
    orden: node.orden ?? fallbackOrden,
    status: 'publicado',
  };
  if (node.descripcion) base.descripcion = node.descripcion;
  if (node.children?.length) {
    base.children = node.children.map((c, i) => normalize(c, i + 1));
  }
  return base;
}

const normalized = topics.map((t, i) => normalize(t, i + 1));
writeFileSync(
  outPath,
  `import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Español — Examen IPN. */
export const IPN_ESPANOL_TOPICS: UnamTemarioTopic[] = ${JSON.stringify(normalized, null, 2)} as UnamTemarioTopic[];
`,
  'utf8'
);
console.log(`Wrote ${outPath}`);
