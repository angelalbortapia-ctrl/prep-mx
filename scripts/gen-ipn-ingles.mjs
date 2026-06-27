/**
 * Genera src/data/ipn-temario-ingles.mjs — Examen IPN.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../src/data/ipn-temario-ingles.ts');

const topics = [
  {
    id: 'ipn-ing-6-1',
    codigo: '6.1',
    titulo: 'Gramática avanzada (nivel B1)',
    orden: 1,
    children: [
      {
        id: 'ipn-ing-6-1-1',
        codigo: '6.1.1',
        titulo: 'Tiempos perfectos y marcadores de tiempo',
        descripcion:
          'Estructura del Present Perfect Simple (S + have/has + verbo en participio pasado) y su uso preciso con adverbios temporales clave evaluados por el IPN: since (punto específico en el tiempo), for (duración del tiempo), already (acciones terminadas antes de lo esperado en oraciones afirmativas), yet (acciones no ocurridas al momento en oraciones negativas o preguntas) y just (acciones ocurridas hace unos instantes).',
        orden: 1,
      },
      {
        id: 'ipn-ing-6-1-2',
        codigo: '6.1.2',
        titulo: 'Voz pasiva (Passive Voice)',
        descripcion:
          'Transformación de oraciones en voz activa a pasiva en tiempos Presente y Pasado Simple, manteniendo la concordancia del verbo to be auxiliar y convirtiendo el verbo principal a participio pasivo (ej. Active: "Lázaro Cárdenas founded IPN in 1936" → Passive: "IPN was founded by Lázaro Cárdenas in 1936").',
        orden: 2,
      },
      {
        id: 'ipn-ing-6-1-3',
        codigo: '6.1.3',
        titulo: 'Estructuras condicionales',
        orden: 3,
        children: [
          {
            id: 'ipn-ing-6-1-3-1',
            codigo: '6.1.3.1',
            titulo: 'First Conditional (real / probable)',
            descripcion:
              'If + Present Simple, S + will + verbo. Expresa condiciones reales o probables en el presente o futuro.',
            orden: 1,
          },
          {
            id: 'ipn-ing-6-1-3-2',
            codigo: '6.1.3.2',
            titulo: 'Second Conditional (hipotético / irreal)',
            descripcion:
              'If + Past Simple, S + would + verbo. En la cláusula del if, el verbo to be utiliza were para todas las personas (ej. "If I were you, I would study mechanics").',
            orden: 2,
          },
        ],
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

/** Temario ultra-detallado de Inglés — Examen IPN. */
export const IPN_INGLES_TOPICS: UnamTemarioTopic[] = ${JSON.stringify(normalized, null, 2)} as UnamTemarioTopic[];
`,
  'utf8'
);
console.log(`Wrote ${outPath}`);
