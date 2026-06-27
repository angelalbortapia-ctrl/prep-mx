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
  branch('fis-cinematica', '1', 'Cinemática', 1, [
    branch('fis-cinematica-1-1', '1.1', 'Conceptos básicos del movimiento', 1, [
      leaf(
        'fis-cinematica-1-1-1',
        '1.1.1',
        'Sistemas de referencia',
        'Definición de observador, sistemas de referencia absolutos y relativos.',
        1
      ),
      leaf(
        'fis-cinematica-1-1-2',
        '1.1.2',
        'Magnitudes escalares y vectoriales',
        'Diferencia entre distancia (escalar) y desplazamiento (vectorial); diferencia entre rapidez (escalar) y velocidad (vectorial).',
        2
      ),
      leaf(
        'fis-cinematica-1-1-3',
        '1.1.3',
        'Variables cinemáticas',
        'Definición de posición, trayectoria, tiempo y aceleración (cambio de velocidad por unidad de tiempo).',
        3
      ),
    ]),
    branch('fis-cinematica-1-2', '1.2', 'Movimiento Rectilíneo Uniforme (MRU)', 2, [
      leaf(
        'fis-cinematica-1-2-1',
        '1.2.1',
        'Características fundamentales',
        'Velocidad constante en magnitud, dirección y sentido; aceleración igual a cero; trayectorias en línea recta.',
        1
      ),
      leaf(
        'fis-cinematica-1-2-2',
        '1.2.2',
        'Ecuación matemática',
        'Uso y despejes de v = d/t (d = v·t; t = d/v). Problemas de trenes o móviles que se encuentran o se alejan.',
        2
      ),
      leaf(
        'fis-cinematica-1-2-3',
        '1.2.3',
        'Análisis gráfico del MRU',
        'Gráfica Posición vs. Tiempo (x-t): Línea recta diagonal cuya pendiente representa la velocidad. Gráfica Velocidad vs. Tiempo (v-t): Línea recta horizontal donde el área bajo la curva representa la distancia recorrida.',
        3
      ),
    ]),
    branch('fis-cinematica-1-3', '1.3', 'Movimiento Rectilíneo Uniformemente Acelerado (MRUA)', 3, [
      leaf(
        'fis-cinematica-1-3-1',
        '1.3.1',
        'Características fundamentales',
        'Aceleración constante diferente de cero; cambios de velocidad uniformes en intervalos de tiempo iguales.',
        1
      ),
      leaf(
        'fis-cinematica-1-3-2',
        '1.3.2',
        'Ecuaciones de la cinemática lineal',
        'a = (v_f - v_i)/t, v_f = v_i + a·t, d = v_i·t + (a·t²)/2, v_f² = v_i² + 2a·d, d = ((v_i + v_f)/2)·t.',
        2
      ),
      leaf(
        'fis-cinematica-1-3-3',
        '1.3.3',
        'Casos operativos',
        'Problemas de frenado (aceleración negativa), autos que arrancan del reposo (v_i = 0) y rebasamiento.',
        3
      ),
      leaf(
        'fis-cinematica-1-3-4',
        '1.3.4',
        'Análisis gráfico del MRUA',
        'Gráfica Posición vs. Tiempo (x-t): Curva parabólica. Gráfica Velocidad vs. Tiempo (v-t): Línea recta diagonal cuya pendiente es la aceleración. Gráfica Aceleración vs. Tiempo (a-t): Línea recta horizontal.',
        4
      ),
    ]),
    branch('fis-cinematica-1-4', '1.4', 'Caída Libre y Tiro Vertical', 4, [
      leaf(
        'fis-cinematica-1-4-1',
        '1.4.1',
        'Caída Libre',
        'Condiciones ideales sin resistencia del aire, v_i = 0. Ecuaciones: v_f = g·t; h = (g·t²)/2; v_f² = 2g·h (g ≈ 9.8 o 10 m/s²).',
        1
      ),
      leaf(
        'fis-cinematica-1-4-2',
        '1.4.2',
        'Tiro Vertical',
        'v_i > 0, gravedad como desaceleración. En altura máxima v_f = 0. h_máx = v_i²/(2g); t_s = v_i/g.',
        2
      ),
    ]),
  ], { guideSlug: 'fisica' }),
  branch('fis-newton', '2', 'Fuerzas, Leyes de Newton y Ley de la Gravitación Universal', 2, [
    branch('fis-newton-2-1', '2.1', 'Concepto de Fuerza y Vectores', 1, [
      leaf(
        'fis-newton-2-1-1',
        '2.1.1',
        'Definición de fuerza',
        'Interacción entre dos cuerpos. Unidad: Newton (N = kg·m/s²).',
        1
      ),
      leaf(
        'fis-newton-2-1-2',
        '2.1.2',
        'Carácter vectorial',
        'F_x = F·cos θ; F_y = F·sen θ; F_R = √(F_x² + F_y²).',
        2
      ),
    ]),
    branch('fis-newton-2-2', '2.2', 'Leyes de la Dinámica (Leyes de Newton)', 2, [
      leaf(
        'fis-newton-2-2-1',
        '2.2.1',
        'Primera Ley (Inercia)',
        'Reposo o MRU salvo fuerza externa neta.',
        1
      ),
      leaf(
        'fis-newton-2-2-2',
        '2.2.2',
        'Segunda Ley',
        'F = m·a.',
        2
      ),
      leaf(
        'fis-newton-2-2-3',
        '2.2.3',
        'Tercera Ley',
        'Acción y reacción, cuerpos diferentes.',
        3
      ),
    ]),
    branch('fis-newton-2-3', '2.3', 'Estática y Equilibrio', 3, [
      leaf(
        'fis-newton-2-3-1',
        '2.3.1',
        'Equilibrio traslacional',
        'Σ F_x = 0; Σ F_y = 0.',
        1
      ),
      leaf(
        'fis-newton-2-3-2',
        '2.3.2',
        'Equilibrio rotacional',
        'Σ τ = 0; τ = F·d·sen θ.',
        2
      ),
    ]),
    branch('fis-newton-2-4', '2.4', 'Ley de la Gravitación Universal', 4, [
      leaf(
        'fis-newton-2-4-1',
        '2.4.1',
        'Enunciado',
        'Proporcional a masas, inverso al cuadrado de distancia.',
        1
      ),
      leaf(
        'fis-newton-2-4-2',
        '2.4.2',
        'Ecuación',
        'F = G·m₁·m₂/d², G = 6.67 × 10⁻¹¹ N·m²/kg².',
        2
      ),
      leaf(
        'fis-newton-2-4-3',
        '2.4.3',
        'Variaciones proporcionales UNAM',
        'Variaciones proporcionales UNAM.',
        3
      ),
      leaf(
        'fis-newton-2-4-4',
        '2.4.4',
        'Masa vs Peso',
        'P = m·g.',
        4
      ),
    ]),
  ]),
  branch('fis-energia', '3', 'Trabajo, Potencia y Energía', 3, [
    leaf(
      'fis-energia-3-1',
      '3.1',
      'Trabajo Mecánico (W)',
      'W = F·d·cos θ. Joule (J = N·m).',
      1
    ),
    leaf(
      'fis-energia-3-2',
      '3.2',
      'Potencia (P)',
      'P = W/t, P = F·v. Watt, HP ≈ 746 W.',
      2
    ),
    leaf(
      'fis-energia-3-3',
      '3.3',
      'Energía',
      'E_c = ½mv²; E_p = mgh; conservación E_c1 + E_p1 = E_c2 + E_p2; W_neto = ΔE_c.',
      3
    ),
  ]),
  branch('fis-fluidos', '4', 'Mecánica de Fluidos', 4, [
    leaf(
      'fis-fluidos-4-1',
      '4.1',
      'Propiedades',
      'ρ = m/V; γ = P/V = ρg; P = F/A (Pascal).',
      1
    ),
    leaf(
      'fis-fluidos-4-2',
      '4.2',
      'Hidrostática',
      'P_h = ρgh; presión atmosférica; Pascal f/a = F/A; Arquímedes E = ρ_fluido·g·V_sumergido.',
      2
    ),
    leaf(
      'fis-fluidos-4-3',
      '4.3',
      'Hidrodinámica',
      'G = V/t = A·v; continuidad A₁v₁ = A₂v₂.',
      3
    ),
  ]),
  branch('fis-termo', '5', 'Termodinámica', 5, [
    leaf(
      'fis-termo-5-1',
      '5.1',
      'Escalas',
      'T_K = T_C + 273.15; conversiones F/C.',
      1
    ),
    leaf(
      'fis-termo-5-2',
      '5.2',
      'Calor y transferencia',
      'Calor y transferencia.',
      2
    ),
    leaf(
      'fis-termo-5-3',
      '5.3',
      'Calorimetría',
      'Q = mcΔT; equilibrio térmico; calor latente.',
      3
    ),
    leaf(
      'fis-termo-5-4',
      '5.4',
      'Leyes',
      'ΔU = Q - W; segunda ley, entropía.',
      4
    ),
  ]),
  branch('fis-ondas', '6', 'Ondas y Acústica', 6, [
    leaf(
      'fis-ondas-6-1',
      '6.1',
      'Características',
      'Transversales/longitudinales; f = 1/T; v = λf.',
      1
    ),
    leaf(
      'fis-ondas-6-2',
      '6.2',
      'Fenómenos',
      'Reflexión, refracción, difracción, interferencia, Doppler.',
      2
    ),
  ]),
  branch('fis-electro', '7', 'Electromagnetismo', 7, [
    leaf(
      'fis-electro-7-1',
      '7.1',
      'Electroestática',
      'Coulomb F = k·q₁·q₂/d²; campo E = F/q.',
      1
    ),
    leaf(
      'fis-electro-7-2',
      '7.2',
      'Circuitos',
      'Ohm I = V/R; serie/paralelo; potencia P = VI.',
      2
    ),
    leaf(
      'fis-electro-7-3',
      '7.3',
      'Magnetismo',
      'Oersted, Faraday.',
      3
    ),
  ]),
  branch('fis-optica', '8', 'Óptica', 8, [
    leaf(
      'fis-optica-8-1',
      '8.1',
      'Luz',
      'c ≈ 3 × 10⁸ m/s.',
      1
    ),
    leaf(
      'fis-optica-8-2',
      '8.2',
      'Geométrica',
      'Snell n₁·sen θ₁ = n₂·sen θ₂; espejos y lentes.',
      2
    ),
  ]),
  branch('fis-contemp', '9', 'Física Contemporánea', 9, [
    leaf(
      'fis-contemp-9-1',
      '9.1',
      'Fotón y radiactividad',
      'E = hf; radiactividad α, β, γ; fisión y fusión.',
      1
    ),
  ]),
];

function countLeaves(arr) {
  let n = 0;
  for (const t of arr) {
    if (t.children?.length) n += countLeaves(t.children);
    else n++;
  }
  return n;
}

const outPath = path.join(__dirname, '../src/data/unam-temario-fisica.ts');
const content = `import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Física — Examen UNAM. */
export const UNAM_FISICA_TOPICS: UnamTemarioTopic[] = ${JSON.stringify(topics, null, 2)} as UnamTemarioTopic[];
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log('Written', outPath);
console.log('Block count:', topics.length);
console.log('Leaf count:', countLeaves(topics));
