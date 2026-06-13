import type { Question } from '@/types/question';
import { sampleQuestions } from '@/lib/sample-questions';

const extraQuestions: Question[] = [
  {
    id: 'demo-4',
    materia: 'matematicas',
    tema: 'geometria',
    pregunta: '¿Cuál es el área de un triángulo con base $8$ cm y altura $5$ cm?',
    opciones: [
      { id: 'A', texto: '$20\\ \\text{cm}^2$' },
      { id: 'B', texto: '$40\\ \\text{cm}^2$' },
      { id: 'C', texto: '$13\\ \\text{cm}^2$' },
      { id: 'D', texto: '$80\\ \\text{cm}^2$' },
    ],
    opcion_correcta: 'A',
    explicacion: 'Área = $\\frac{b \\cdot h}{2} = \\frac{8 \\cdot 5}{2} = 20\\ \\text{cm}^2$.',
    dificultad: 'easy',
  },
  {
    id: 'demo-5',
    materia: 'matematicas',
    tema: 'razonamiento',
    pregunta: 'Si todos los gatos son mamíferos y algunos mamíferos vuelan, ¿cuál conclusión es válida?',
    opciones: [
      { id: 'A', texto: 'Todos los gatos vuelan' },
      { id: 'B', texto: 'Ningún gato vuela necesariamente' },
      { id: 'C', texto: 'Todos los mamíferos son gatos' },
      { id: 'D', texto: 'Algunos gatos no son mamíferos' },
    ],
    opcion_correcta: 'B',
    explicacion: 'Los gatos son mamíferos, pero volar no se deduce de la premisa.',
    dificultad: 'medium',
  },
  {
    id: 'demo-6',
    materia: 'fisica',
    tema: 'dinamica',
    pregunta: 'Un cuerpo de $2\\ \\text{kg}$ acelera a $3\\ \\text{m/s}^2$. ¿Fuerza neta?',
    opciones: [
      { id: 'A', texto: '$5\\ \\text{N}$' },
      { id: 'B', texto: '$6\\ \\text{N}$' },
      { id: 'C', texto: '$1.5\\ \\text{N}$' },
      { id: 'D', texto: '$9\\ \\text{N}$' },
    ],
    opcion_correcta: 'B',
    explicacion: 'Segunda ley de Newton: $F = ma = 2 \\times 3 = 6\\ \\text{N}$.',
    dificultad: 'easy',
  },
  {
    id: 'demo-7',
    materia: 'quimica',
    tema: 'tabla_periodica',
    pregunta: '¿Cuál elemento tiene número atómico $11$?',
    opciones: [
      { id: 'A', texto: 'Magnesio' },
      { id: 'B', texto: 'Sodio' },
      { id: 'C', texto: 'Neón' },
      { id: 'D', texto: 'Aluminio' },
    ],
    opcion_correcta: 'B',
    explicacion: 'El sodio (Na) tiene $Z = 11$.',
    dificultad: 'easy',
  },
  {
    id: 'demo-8',
    materia: 'historia',
    tema: 'historia_mexico',
    pregunta: '¿En qué año inició la Revolución Mexicana?',
    opciones: [
      { id: 'A', texto: '1810' },
      { id: 'B', texto: '1910' },
      { id: 'C', texto: '1929' },
      { id: 'D', texto: '1857' },
    ],
    opcion_correcta: 'B',
    explicacion: 'La Revolución Mexicana comenzó en 1910.',
    dificultad: 'easy',
  },
  {
    id: 'demo-9',
    materia: 'literatura',
    tema: 'genero_literario',
    pregunta: '¿Qué obra es considerada una novela del Realismo por Benito Pérez Galdós?',
    opciones: [
      { id: 'A', texto: 'Fortunata y Jacinta' },
      { id: 'B', texto: 'El Quijote' },
      { id: 'C', texto: 'La Odisea' },
      { id: 'D', texto: 'Cien años de soledad' },
    ],
    opcion_correcta: 'A',
    explicacion: 'Fortunata y Jacinta es una novela realista de Galdós.',
    dificultad: 'medium',
  },
  {
    id: 'demo-10',
    materia: 'biologia',
    tema: 'celula',
    pregunta: '¿Dónde ocurre la respiración celular aeróbica en eucariotas?',
    opciones: [
      { id: 'A', texto: 'Núcleo' },
      { id: 'B', texto: 'Mitocondria' },
      { id: 'C', texto: 'Ribosoma' },
      { id: 'D', texto: 'Lisosoma' },
    ],
    opcion_correcta: 'B',
    explicacion: 'La respiración celular aeróbica ocurre principalmente en mitocondrias.',
    dificultad: 'easy',
  },
];

export const allDemoQuestions: Question[] = [...sampleQuestions, ...extraQuestions];

/** Diagnóstico gratuito SRS: 20 preguntas */
export const freeDiagnosticQuestions: Question[] = [
  ...allDemoQuestions,
  ...allDemoQuestions.map((q, i) => ({
    ...q,
    id: `${q.id}-dup-${i}`,
  })),
].slice(0, 20);
