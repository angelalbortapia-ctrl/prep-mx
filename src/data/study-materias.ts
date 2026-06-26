export interface StudyMateria {
  id: string;
  nombre: string;
  /** Emoji/ícono ligero para tarjetas táctiles. */
  icon: string;
  descripcion: string;
  totalTemas: number;
  /** Progreso 0-100 (placeholder hasta conectar SM-2/Supabase real). */
  progreso: number;
  /** Clase tailwind para el acento de la tarjeta. */
  accent: string;
}

/**
 * Catálogo base de la Zona de Estudio. En el futuro se hidrata con el progreso
 * real del alumno (SM-2 + Supabase); por ahora sirve como fuente cacheable.
 */
export const studyMaterias: StudyMateria[] = [
  {
    id: 'matematicas',
    nombre: 'Matemáticas',
    icon: '📐',
    descripcion: 'Álgebra, cálculo y geometría analítica.',
    totalTemas: 24,
    progreso: 42,
    accent: 'from-violet-500/15 to-violet-500/0 text-violet-700',
  },
  {
    id: 'fisica',
    nombre: 'Física',
    icon: '🧲',
    descripcion: 'Mecánica, termodinámica y electromagnetismo.',
    totalTemas: 18,
    progreso: 28,
    accent: 'from-sky-500/15 to-sky-500/0 text-sky-700',
  },
  {
    id: 'quimica',
    nombre: 'Química',
    icon: '⚗️',
    descripcion: 'Estequiometría, enlaces y reacciones.',
    totalTemas: 16,
    progreso: 55,
    accent: 'from-emerald-500/15 to-emerald-500/0 text-emerald-700',
  },
  {
    id: 'biologia',
    nombre: 'Biología',
    icon: '🧬',
    descripcion: 'Célula, genética y ecología.',
    totalTemas: 14,
    progreso: 12,
    accent: 'from-lime-500/15 to-lime-500/0 text-lime-700',
  },
  {
    id: 'espanol',
    nombre: 'Español',
    icon: '📖',
    descripcion: 'Comprensión lectora y redacción.',
    totalTemas: 12,
    progreso: 70,
    accent: 'from-rose-500/15 to-rose-500/0 text-rose-700',
  },
  {
    id: 'historia',
    nombre: 'Historia Universal',
    icon: '🌍',
    descripcion: 'Desde la Antigüedad hasta la Guerra Fría.',
    totalTemas: 20,
    progreso: 33,
    accent: 'from-amber-500/15 to-amber-500/0 text-amber-700',
  },
  {
    id: 'historia-de-mexico',
    nombre: 'Historia de México',
    icon: '🏛️',
    descripcion: 'Prehispánico, Independencia, Revolución y México actual.',
    totalTemas: 20,
    progreso: 20,
    accent: 'from-orange-500/15 to-orange-500/0 text-orange-700',
  },
  {
    id: 'geografia',
    nombre: 'Geografía',
    icon: '🌎',
    descripcion: 'Física, humana y económica.',
    totalTemas: 10,
    progreso: 8,
    accent: 'from-cyan-500/15 to-cyan-500/0 text-cyan-700',
  },
  {
    id: 'filosofia',
    nombre: 'Filosofía',
    icon: '🦉',
    descripcion: 'Lógica, ética y corrientes de pensamiento.',
    totalTemas: 8,
    progreso: 0,
    accent: 'from-indigo-500/15 to-indigo-500/0 text-indigo-700',
  },
];

export function getStudyMaterias(): StudyMateria[] {
  return studyMaterias;
}
