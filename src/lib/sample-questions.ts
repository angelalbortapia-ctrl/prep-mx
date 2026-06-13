import type { Question } from '@/types/question';

/** Preguntas de demo hasta conectar Supabase */
export const sampleQuestions: Question[] = [
  {
    id: 'demo-1',
    materia: 'matematicas',
    tema: 'algebra',
    pregunta:
      'Resuelve la ecuación $$x^2 - 5x + 6 = 0$$. ¿Cuál es el conjunto solución?',
    opciones: [
      { id: 'A', texto: '{2, 3}' },
      { id: 'B', texto: '{-2, -3}' },
      { id: 'C', texto: '{1, 6}' },
      { id: 'D', texto: '{-1, -6}' },
    ],
    opcion_correcta: 'A',
    explicacion:
      'Factorizando: $(x-2)(x-3)=0$, entonces $x=2$ o $x=3$. El conjunto solución es {2, 3}.',
    dificultad: 'easy',
  },
  {
    id: 'demo-2',
    materia: 'fisica',
    tema: 'cinematica',
    pregunta:
      'Un auto recorre $120\\ \\text{km}$ en $2\\ \\text{h}$. ¿Cuál es su velocidad promedio?',
    opciones: [
      { id: 'A', texto: '40 km/h' },
      { id: 'B', texto: '60 km/h' },
      { id: 'C', texto: '80 km/h' },
      { id: 'D', texto: '120 km/h' },
    ],
    opcion_correcta: 'B',
    explicacion:
      'Velocidad promedio = distancia / tiempo = $120/2 = 60\\ \\text{km/h}$.',
    dificultad: 'easy',
  },
  {
    id: 'demo-3',
    materia: 'quimica',
    tema: 'estequiometria',
    pregunta:
      '¿Cuántos moles de $H_2O$ se forman al reaccionar completamente $2\\ \\text{mol}$ de $H_2$ con $O_2$? (Reacción: $2H_2 + O_2 \\rightarrow 2H_2O$)',
    opciones: [
      { id: 'A', texto: '1 mol' },
      { id: 'B', texto: '2 mol' },
      { id: 'C', texto: '3 mol' },
      { id: 'D', texto: '4 mol' },
    ],
    opcion_correcta: 'B',
    explicacion:
      'Por la estequiometría, $2\\ \\text{mol}$ de $H_2$ producen $2\\ \\text{mol}$ de $H_2O$.',
    dificultad: 'medium',
  },
];
