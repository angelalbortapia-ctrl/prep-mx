import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = 'publicado';

function leaf(id, codigo, titulo, descripcion, orden) {
  return { id, codigo, titulo, descripcion, orden, status: pub };
}
function branch(id, codigo, titulo, orden, children, extra = {}) {
  return { id, codigo, titulo, orden, status: pub, children, ...extra };
}

const topics = [
  branch('qui-estructura', '1', 'Estructura Atómica y Propiedades Periódicas', 1, [
    branch('qui-estructura-1-1', '1.1', 'El Átomo y Partículas Subatómicas', 1, [
      leaf('qui-estructura-1-1-1', '1.1.1', 'Modelos Atómicos', 'Evolución histórica y aportaciones clave: Dalton, Thomson y el budín de pasas, Rutherford y el núcleo, Bohr y los niveles de energía, Modelo Mecano-Cuántico de Schrödinger.', 1),
      leaf('qui-estructura-1-1-2', '1.1.2', 'Estructura nuclear', 'Identificación y propiedades de protones (p⁺), neutrones (n⁰) y electrones (e⁻).', 2),
      leaf('qui-estructura-1-1-3', '1.1.3', 'Relaciones de masa', 'Número Atómico (Z = p⁺), Masa Atómica o Número de Masa (A = p⁺ + n⁰). Cálculo de neutrones: n⁰ = A − Z.', 3),
      leaf('qui-estructura-1-1-4', '1.1.4', 'Isótopos', 'Átomos del mismo elemento con igual Z pero diferente A y n⁰. Ejemplos: protio, deuterio, tritio; Carbono-12 y Carbono-14.', 4),
      leaf('qui-estructura-1-1-5', '1.1.5', 'Iones', 'Cationes (pérdida de electrones, carga positiva) y aniones (ganancia de electrones, carga negativa).', 5),
    ]),
    branch('qui-estructura-1-2', '1.2', 'Configuración Electrónica y Números Cuánticos', 2, [
      leaf('qui-estructura-1-2-1', '1.2.1', 'Reglas de distribución electrónica', 'Principio de Aufbau (regla de las diagonales o del serrucho). Principio de exclusión de Pauli (máximo dos electrones por orbital con espines opuestos). Regla de Hund (máxima multiplicidad: orbitales de igual energía se llenan primero con un electrón cada uno).', 1),
      leaf('qui-estructura-1-2-2', '1.2.2', 'Números Cuánticos', 'Principal (n): nivel de energía (1, 2, 3, …, 7). Azimutal o secundario (l): forma del orbital; subniveles s(0), p(1), d(2), f(3). Magnético (m_l): orientación espacial (de −l a +l). Espín (s o m_s): giro del electrón (+½, −½).', 2),
      leaf('qui-estructura-1-2-3', '1.2.3', 'Electrones de valencia', 'Identificación de los electrones del nivel más externo, responsables de los enlaces químicos.', 3),
    ]),
    branch('qui-estructura-1-3', '1.3', 'Tabla Periódica y Propiedades Periódicas', 3, [
      leaf('qui-estructura-1-3-1', '1.3.1', 'Organización estructural', 'Periodos (filas = niveles de energía) y grupos/familias (columnas = propiedades similares y misma cantidad de electrones de valencia). Bloques s, p, d, f.', 1),
      leaf('qui-estructura-1-3-2', '1.3.2', 'Familias representativas', 'Metales alcalinos (IA), alcalinotérreos (IIA), halógenos (VIIA) y gases nobles (VIIIA). Diferenciación entre metales, no metales y metaloides.', 2),
      leaf('qui-estructura-1-3-3', '1.3.3', 'Propiedades periódicas', 'Radio atómico (aumenta de arriba a abajo y de derecha a izquierda). Energía de ionización (aumenta de abajo a arriba y de izquierda a derecha). Afinidad electrónica (igual tendencia). Electronegatividad (escala de Pauling; Flúor el más electronegativo, Francio el menos; aumenta de abajo a arriba y de izquierda a derecha).', 3),
    ]),
  ], { guideSlug: 'quimica' }),
  branch('qui-enlace', '2', 'Enlace Químico y Fuerzas Intermoleculares', 2, [
    branch('qui-enlace-2-1', '2.1', 'Enlaces Químicos Intramoleculares', 1, [
      leaf('qui-enlace-2-1-1', '2.1.1', 'Regla del Octeto', 'Tendencia de los átomos a completar 8 electrones en su capa de valencia para adquirir estabilidad de gas noble.', 1),
      leaf('qui-enlace-2-1-2', '2.1.2', 'Estructuras de Lewis', 'Representación de puntos y cruces de los electrones de valencia y los pares enlazantes/solitarios en moléculas simples.', 2),
      leaf('qui-enlace-2-1-3', '2.1.3', 'Tipos de enlace según la diferencia de electronegatividad (ΔEN)', 'Enlace iónico (ΔEN ≥ 1.7): transferencia de electrones de metal a no metal; redes cristalinas; altos puntos de fusión/ebullición; conduce fundido o en solución. Enlace covalente (ΔEN < 1.7): compartición entre no metales — no polar (ΔEN 0 a 0.4, ej. O₂, H₂), polar (ΔEN 0.5 a 1.6, ej. H₂O, HCl), coordinado o dativo (un átomo aporta el par, ej. NH₄⁺). Enlace metálico: cationes y mar de electrones deslocalizados; ductilidad, maleabilidad y conductividad.', 3),
    ]),
    branch('qui-enlace-2-2', '2.2', 'Fuerzas Intermoleculares', 2, [
      leaf('qui-enlace-2-2-1', '2.2.1', 'Definición', 'Interacciones atractivas entre moléculas independientes; determinan punto de ebullición y solubilidad.', 1),
      leaf('qui-enlace-2-2-2', '2.2.2', 'Puentes de Hidrógeno', 'Fuerza inusualmente fuerte cuando el hidrógeno se enlaza a F, O o N. Explica propiedades anómalas del agua (alto punto de ebullición, densidad del hielo).', 2),
      leaf('qui-enlace-2-2-3', '2.2.3', 'Interacciones Dipolo-Dipolo', 'Atracción entre el extremo positivo de una molécula polar y el extremo negativo de otra.', 3),
      leaf('qui-enlace-2-2-4', '2.2.4', 'Fuerzas de Dispersión de London', 'Dipolos inducidos temporales presentes en todas las moléculas; críticas en moléculas no polares y gases nobles.', 4),
    ]),
  ]),
  branch('qui-nomenclatura', '3', 'Nomenclatura Química Inorgánica', 3, [
    branch('qui-nomenclatura-3-1', '3.1', 'Reglas del Sistema IUPAC y Clásico', 1, [
      leaf('qui-nomenclatura-3-1-1', '3.1.1', 'Números de oxidación', 'Reglas para asignar estados de oxidación: oxígeno suele ser −2, hidrógeno +1, elementos libres valen 0, la suma en compuestos neutros debe dar 0.', 1),
      leaf('qui-nomenclatura-3-1-2', '3.1.2', 'Compuestos Binarios', 'Óxidos básicos (metálicos): metal + oxígeno (ej. CaO, Fe₂O₃). Óxidos ácidos o anhídridos: no metal + oxígeno (ej. CO₂, SO₃). Hidrácidos: H + no metal del grupo VIA o VIIA en solución acuosa (ej. HCl(ac), H₂S(ac)). Sales binarias: metal + no metal (ej. NaCl, FeCl₃).', 2),
      leaf('qui-nomenclatura-3-1-3', '3.1.3', 'Compuestos Ternarios', 'Hidróxidos o bases: metal + ion hidroxilo (OH)⁻ (ej. NaOH, Al(OH)₃). Oxácidos: H + no metal + O (ej. H₂SO₄, HNO₃). Oxisales: metal + no metal + O; derivadas de oxácidos (ej. CaCO₃, CuSO₄).', 3),
    ]),
  ]),
  branch('qui-reacciones', '4', 'Reacciones Químicas y Estequiometría', 4, [
    branch('qui-reacciones-4-1', '4.1', 'Tipos de Reacciones Químicas', 1, [
      leaf('qui-reacciones-4-1-1', '4.1.1', 'Clasificación por reagrupamiento de átomos', 'Síntesis o adición: A + B → AB. Descomposición o análisis: AB → A + B. Sustitución simple: A + BC → AC + B. Sustitución doble o metátesis: AB + CD → AD + CB.', 1),
      leaf('qui-reacciones-4-1-2', '4.1.2', 'Clasificación por cambios energéticos', 'Endotérmicas (absorben calor, ΔH > 0) y exotérmicas (liberan calor, ΔH < 0).', 2),
      leaf('qui-reacciones-4-1-3', '4.1.3', 'Reacciones de Combustión', 'Hidrocarburo + O₂ → CO₂ + H₂O + energía (combustión completa).', 3),
    ]),
    branch('qui-reacciones-4-2', '4.2', 'Balanceo de Ecuaciones Químicas', 2, [
      leaf('qui-reacciones-4-2-1', '4.2.1', 'Método por Tanteo', 'Ajuste de coeficientes estequiométricos por inspección directa. Orden recomendado: metales, no metales, hidrógeno y oxígeno.', 1),
      leaf('qui-reacciones-4-2-2', '4.2.2', 'Método Redox (Óxido-Reducción)', 'Identificación del átomo que se oxida (pierde electrones, aumenta número de oxidación; agente reductor) y del que se reduce (gana electrones, disminuye número de oxidación; agente oxidante). Balanceo por semi-reacciones igualando electrones intercambiados.', 2),
    ]),
    branch('qui-reacciones-4-3', '4.3', 'Cálculos Estequiométricos', 3, [
      leaf('qui-reacciones-4-3-1', '4.3.1', 'Conceptos fundamentales de cantidad', 'Mol: unidad de cantidad de sustancia (6.022 × 10²³ entidades — Número de Avogadro). Masa molar (M): masa en gramos de un mol (g/mol). Volumen molar: un mol de gas ideal en CNPT (1 atm y 0 °C) ocupa 22.4 L.', 1),
      leaf('qui-reacciones-4-3-2', '4.3.2', 'Ley de la Conservación de la Materia (Lavoisier)', 'La masa total de los reactivos es igual a la masa total de los productos.', 2),
      leaf('qui-reacciones-4-3-3', '4.3.3', 'Relaciones estequiométricas', 'Relaciones mol-mol, masa-masa y masa-volumen a partir de una ecuación química balanceada.', 3),
    ]),
  ]),
  branch('qui-soluciones', '5', 'Soluciones y Propiedades Ácido-Base', 5, [
    branch('qui-soluciones-5-1', '5.1', 'Mezclas y Soluciones Acuosas', 1, [
      leaf('qui-soluciones-5-1-1', '5.1.1', 'Componentes de una solución', 'Soluto (fase dispersa, menor cantidad) y disolvente/solvente (fase dispersante, mayor cantidad). El agua como disolvente universal.', 1),
      leaf('qui-soluciones-5-1-2', '5.1.2', 'Soluciones según grado de saturación', 'Diluidas, concentradas, saturadas (máxima cantidad de soluto a una temperatura) y sobresaturadas (sistema inestable con exceso de soluto logrado por calentamiento).', 2),
      leaf('qui-soluciones-5-1-3', '5.1.3', 'Unidades de concentración cuantitativas', '% masa = (masa de soluto / masa total de solución) × 100. % volumen = (volumen de soluto / volumen total de solución) × 100. Molaridad (M) = moles de soluto (n) / litros de solución (V); n = masa / masa molar.', 3),
    ]),
    branch('qui-soluciones-5-2', '5.2', 'Teorías y Propiedades de Ácidos y Bases', 2, [
      leaf('qui-soluciones-5-2-1', '5.2.1', 'Modelos Teóricos', 'Arrhenius: ácido libera H⁺ en solución acuosa; base libera OH⁻. Brønsted-Lowry: ácido donador de H⁺; base aceptor de H⁺; pares conjugados ácido/base. Lewis: ácido acepta par de electrones; base dona par de electrones.', 1),
      leaf('qui-soluciones-5-2-2', '5.2.2', 'Escala de pH y pOH', 'pH = −log[H⁺]. A 25 °C: pH + pOH = 14. pH < 7 (ácido), pH = 7 (neutro), pH > 7 (básico o alcalino). Problemas con potencias de 10 (ej. [H⁺] = 1 × 10⁻³ M → pH = 3).', 2),
      leaf('qui-soluciones-5-2-3', '5.2.3', 'Reacciones de Neutralización', 'Ácido + base → sal + agua.', 3),
    ]),
  ]),
  branch('qui-organica', '6', 'Química Orgánica (Química del Carbono)', 6, [
    branch('qui-organica-6-1', '6.1', 'El Átomo de Carbono y sus Propiedades', 1, [
      leaf('qui-organica-6-1-1', '6.1.1', 'Tetravalencia', 'Capacidad del carbono de formar 4 enlaces covalentes estables. Propiedad de concatenación (cadenas lineales, ramificadas o cíclicas).', 1),
      leaf('qui-organica-6-1-2', '6.1.2', 'Hibridación de orbitales', 'sp³: enlaces sencillos (σ), geometría tetraédrica, ángulos 109.5° (alcanos). sp²: doble enlace (σ + π), geometría trigonal plana, 120° (alquenos). sp: triple enlace (σ + 2π), geometría lineal, 180° (alquinos).', 2),
    ]),
    branch('qui-organica-6-2', '6.2', 'Hidrocarburos', 2, [
      leaf('qui-organica-6-2-1', '6.2.1', 'Alcanos o Parafinas', 'Hidrocarburos saturados (CₙH₂ₙ₊₂). Nomenclatura IUPAC con prefijos (met-, et-, prop-, but-, pent-, etc.) y terminación «-ano». Radicales alquilo (metil, etil, isopropil).', 1),
      leaf('qui-organica-6-2-2', '6.2.2', 'Alquenos u Olefinas', 'Hidrocarburos insaturados con doble enlace (CₙH₂ₙ). Terminación «-eno».', 2),
      leaf('qui-organica-6-2-3', '6.2.3', 'Alquinos o Acetilenos', 'Hidrocarburos insaturados con triple enlace (CₙH₂ₙ₋₂). Terminación «-ino».', 3),
      leaf('qui-organica-6-2-4', '6.2.4', 'Hidrocarburos Aromáticos', 'Basados en el anillo de benceno (C₆H₆) con electrones deslocalizados (resonancia). Bencenos monosustituidos y disustituidos (orto-, meta-, para-).', 4),
    ]),
    branch('qui-organica-6-3', '6.3', 'Grupos Funcionales', 3, [
      leaf('qui-organica-6-3-1', '6.3.1', 'Identificación por estructura', 'Alcoholes: R-OH. Éteres: R-O-R′. Aldehídos: R-CHO (carbonilo terminal). Cetonas: R-CO-R′ (carbonilo intermedio). Ácidos carboxílicos: R-COOH. Ésteres: R-COO-R′ (aromas frutales). Aminas: R-NH₂, R-NHR′. Amidas: R-CO-NH₂.', 1),
    ]),
  ]),
  branch('qui-ambiente', '7', 'Química y Medio Ambiente', 7, [
    branch('qui-ambiente-7-1', '7.1', 'Contaminación Ambiental', 1, [
      leaf('qui-ambiente-7-1-1', '7.1.1', 'El Aire', 'Composición normal de la atmósfera (78% N₂, 21% O₂). Contaminantes primarios (CO, NOₓ, SO₂, hidrocarburos no quemados) y secundarios (ozono troposférico O₃, H₂SO₄ de la lluvia ácida).', 1),
      leaf('qui-ambiente-7-1-2', '7.1.2', 'Fenómenos globales', 'Efecto invernadero: retención de calor por CO₂, CH₄ y vapor de agua. Inversión térmica: estancamiento de contaminantes por aire frío bajo capa de aire caliente. Lluvia ácida: disolución de óxidos de azufre y nitrógeno en agua de lluvia, pH por debajo de 5.6.', 2),
    ]),
  ]),
];

function countLeaves(list) {
  let n = 0;
  for (const t of list) {
    if (t.children?.length) n += countLeaves(t.children);
    else n++;
  }
  return n;
}

const outPath = path.join(__dirname, '../src/data/unam-temario-quimica.ts');
const content = `import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Química — Examen UNAM. */
export const UNAM_QUIMICA_TOPICS: UnamTemarioTopic[] = ${JSON.stringify(topics, null, 2)} as UnamTemarioTopic[];
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log('Written', outPath);
console.log('Blocks:', topics.length);
console.log('Leaf count:', countLeaves(topics));
