import type { Question } from '@/types/question';

/** Preguntas locales si la API no responde (modo ráfaga offline/demo). */
export const BURST_FALLBACK_QUESTIONS: Question[] = [
  {
    id: 'burst-1',
    materia: 'matematicas',
    tema: 'Álgebra',
    pregunta: 'Si 3x + 7 = 22, ¿cuál es el valor de x?',
    opciones: [
      { id: 'A', texto: '3' },
      { id: 'B', texto: '5' },
      { id: 'C', texto: '7' },
      { id: 'D', texto: '15' },
    ],
    opcion_correcta: 'B',
    explicacion:
      'Truco: resta 7 a ambos lados → 3x = 15 → divide entre 3 → x = 5. Siempre despeja en dos pasos claros.',
    dificultad: 'easy',
  },
  {
    id: 'burst-2',
    materia: 'historia',
    tema: 'México',
    pregunta: '¿En qué año inició formalmente la Independencia de México con el Grito de Dolores?',
    opciones: [
      { id: 'A', texto: '1810' },
      { id: 'B', texto: '1821' },
      { id: 'C', texto: '1910' },
      { id: 'D', texto: '1867' },
    ],
    opcion_correcta: 'A',
    explicacion:
      'Truco: 1810 = inicio (Hidalgo); 1821 = consumación (Iturbide). No confundas con 1910 (Revolución).',
    dificultad: 'easy',
  },
  {
    id: 'burst-3',
    materia: 'fisica',
    tema: 'Cinemática',
    pregunta: 'Un auto recorre 100 m en 5 s con velocidad constante. ¿Cuál es su velocidad?',
    opciones: [
      { id: 'A', texto: '10 m/s' },
      { id: 'B', texto: '20 m/s' },
      { id: 'C', texto: '50 m/s' },
      { id: 'D', texto: '500 m/s' },
    ],
    opcion_correcta: 'B',
    explicacion: 'Truco: v = d/t = 100/5 = 20 m/s. Revisa que distancia y tiempo estén en m y s.',
    dificultad: 'medium',
  },
  {
    id: 'burst-4',
    materia: 'quimica',
    tema: 'Estequiometría',
    pregunta: '¿Cuántos moles hay en 36 g de agua (H₂O)? Masa molar ≈ 18 g/mol',
    opciones: [
      { id: 'A', texto: '1 mol' },
      { id: 'B', texto: '2 mol' },
      { id: 'C', texto: '3 mol' },
      { id: 'D', texto: '18 mol' },
    ],
    opcion_correcta: 'B',
    explicacion: 'Truco: n = masa / masa molar = 36/18 = 2 mol. Siempre identifica la masa molar primero.',
    dificultad: 'medium',
  },
  {
    id: 'burst-5',
    materia: 'filosofia',
    tema: 'Falacias',
    pregunta: '«No escuches a Ana porque es de provincia» es un ejemplo de:',
    opciones: [
      { id: 'A', texto: 'Ad hominem' },
      { id: 'B', texto: 'Ad baculum' },
      { id: 'C', texto: 'Petición de principio' },
      { id: 'D', texto: 'Generalización apresurada' },
    ],
    opcion_correcta: 'A',
    explicacion:
      'Truco: ataca a la persona (origen) sin refutar su argumento. Ad baculum sería amenaza; petitio, asumir lo que se quiere probar.',
    dificultad: 'easy',
  },
];

export const BURST_TIMER_SECONDS = 45;
export const BURST_POINTS_CORRECT = 10;
