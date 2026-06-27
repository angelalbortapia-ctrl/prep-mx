/**
 * Genera src/data/ipn-temario-quimica.ts — Examen IPN.
 * Uso: node scripts/gen-ipn-quimica.mjs
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../src/data/ipn-temario-quimica.ts');

const topics = [
  {
    id: 'ipn-quim-3-1',
    codigo: '3.1',
    titulo: 'Estructura de la materia y propiedades periódicas',
    orden: 1,
    children: [
      {
        id: 'ipn-quim-3-1-1',
        codigo: '3.1.1',
        titulo: 'Números cuánticos avanzados',
        descripcion:
          'Determinación exacta de los 4 números cuánticos (n, l, m_l, s) para el electrón diferencial (el último electrón que entra en la configuración) de cualquier elemento o ion, incluyendo excepciones de llenado del bloque d (como el Cromo Z=24 y Cobre Z=29 que transfieren un electrón del orbital s al d).',
        orden: 1,
      },
      {
        id: 'ipn-quim-3-1-2',
        codigo: '3.1.2',
        titulo: 'Configuración kernel',
        descripcion:
          'Uso del gas noble anterior entre corchetes para abreviar configuraciones de elementos pesados y determinar con rapidez el periodo, bloque y grupo de elementos de transición (d) y transición interna (f).',
        orden: 2,
      },
      {
        id: 'ipn-quim-3-1-3',
        codigo: '3.1.3',
        titulo: 'Tendencias periódicas e isótopos',
        descripcion:
          'Predicción cualitativa de qué elemento es más electronegativo, tiene mayor energía de ionización o menor radio atómico comparando su posición en la tabla. Cálculo de la masa atómica promedio ponderada de un elemento a partir de la abundancia porcentual de sus isótopos estables en la naturaleza.',
        orden: 3,
      },
    ],
  },
  {
    id: 'ipn-quim-3-2',
    codigo: '3.2',
    titulo: 'Enlace químico y nomenclatura inorgánica',
    orden: 2,
    children: [
      {
        id: 'ipn-quim-3-2-1',
        codigo: '3.2.1',
        titulo: 'Geometría molecular y fuerzas intermoleculares',
        descripcion:
          'Relación entre la estructura de Lewis, la hibridación del átomo central y la geometría tridimensional de la molécula según la teoría de repulsión de pares de electrones de valencia (lineal, trigonal plana, tetraédrica, piramidal trigonal, angular). Identificación de la polaridad neta de la molécula a partir de sus momentos dipolares vectoriales para predecir si presenta fuerzas de London, dipolo-dipolo o puentes de hidrógeno.',
        orden: 1,
      },
      {
        id: 'ipn-quim-3-2-2',
        codigo: '3.2.2',
        titulo: 'Nomenclatura sistemática, Stock y tradicional',
        descripcion:
          'Dominio absoluto de las tres nomenclaturas para compuestos complejos: sales ácidas (ej. bicarbonato de sodio / hidrógenocarbonato de sodio), oxisales polivalentes (ej. sulfato ferroso, nitrato de amonio) y oxácidos usando prefijos y sufijos (hipo-oso, -oso, -ico, per-ico).',
        orden: 2,
      },
    ],
  },
  {
    id: 'ipn-quim-3-3',
    codigo: '3.3',
    titulo: 'Reacciones químicas y estequiometría avanzada',
    orden: 3,
    children: [
      {
        id: 'ipn-quim-3-3-1',
        codigo: '3.3.1',
        titulo: 'Balanceo por óxido-reducción (Redox)',
        descripcion:
          'Asignación estricta de números de oxidación; planteamiento de semi-reacciones de oxidación y reducción; balanceo de electrones intercambiados multiplicando por factores cruzados; transferencia de coeficientes a la ecuación global y ajuste final por tanteo.',
        orden: 1,
      },
      {
        id: 'ipn-quim-3-3-2',
        codigo: '3.3.2',
        titulo: 'Reactivo limitante y rendimiento (filtro del IPN)',
        descripcion:
          'Reactivos matemáticos donde te dan las masas iniciales de dos reactivos distintos. Pasos obligatorios: (1) convertir gramos a moles dividiendo entre la masa molar de cada sustancia; (2) dividir los moles entre su coeficiente estequiométrico — el valor menor identifica al reactivo limitante; (3) usar solo los moles del reactivo limitante para calcular la masa teórica del producto; (4) calcular el rendimiento porcentual: % Rendimiento = (Masa real / Masa teórica) × 100.',
        orden: 2,
      },
    ],
  },
  {
    id: 'ipn-quim-3-4',
    codigo: '3.4',
    titulo: 'Química orgánica y soluciones',
    orden: 4,
    children: [
      {
        id: 'ipn-quim-3-4-1',
        codigo: '3.4.1',
        titulo: 'Nomenclatura IUPAC de hidrocarburos complejos',
        descripcion:
          'Identificación de la cadena principal más larga que contenga las insaturaciones (dobles o triples enlaces); numeración dando prioridad a los carbonos con dobles/triples enlaces y luego a las ramificaciones. Clasificación y orden alfabético de radicales alquilo complejos (isopropil, sec-butil, tert-butil, isobutil).',
        orden: 1,
      },
      {
        id: 'ipn-quim-3-4-2',
        codigo: '3.4.2',
        titulo: 'Molaridad en disoluciones',
        descripcion:
          'Operaciones numéricas de concentración para calcular la Molaridad (M = masa de soluto / (Masa molar × Litros de disolución)). Reactivos de dilución de soluciones utilizando la fórmula C₁·V₁ = C₂·V₂.',
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
const content = `import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Química — Examen IPN. */
export const IPN_QUIMICA_TOPICS: UnamTemarioTopic[] = ${JSON.stringify(normalized, null, 2)} as UnamTemarioTopic[];
`;

writeFileSync(outPath, content, 'utf8');
console.log(`Wrote ${outPath}`);
