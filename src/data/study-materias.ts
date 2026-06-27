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
    id: 'ingles',
    nombre: 'Inglés',
    icon: '🇬🇧',
    descripcion: 'Gramática B1, voz pasiva y condicionales.',
    totalTemas: 8,
    progreso: 15,
    accent: 'from-blue-500/15 to-blue-500/0 text-blue-700',
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
  {
    id: 'literatura',
    nombre: 'Literatura',
    icon: '✍️',
    descripcion: 'Géneros literarios, análisis de textos y autores.',
    totalTemas: 12,
    progreso: 0,
    accent: 'from-fuchsia-500/15 to-fuchsia-500/0 text-fuchsia-700',
  },
  {
    id: 'razonamiento-verbal',
    nombre: 'Razonamiento Verbal',
    icon: '📝',
    descripcion: 'Comprensión lectora, analogías y completar oraciones.',
    totalTemas: 6,
    progreso: 0,
    accent: 'from-rose-500/15 to-rose-500/0 text-rose-700',
  },
  {
    id: 'razonamiento-matematico',
    nombre: 'Razonamiento Matemático',
    icon: '🔢',
    descripcion: 'Lógica, sucesiones y problemas verbales.',
    totalTemas: 6,
    progreso: 0,
    accent: 'from-violet-500/15 to-violet-500/0 text-violet-700',
  },
  {
    id: 'formacion-civica',
    nombre: 'Política y Sociedad',
    icon: '⚖️',
    descripcion: 'Estado, cultura y economía en México.',
    totalTemas: 9,
    progreso: 0,
    accent: 'from-amber-500/15 to-amber-500/0 text-amber-700',
  },
  {
    id: 'diseno',
    nombre: 'Fundamentos del Diseño',
    icon: '🎨',
    descripcion: 'Elementos visuales, color y composición.',
    totalTemas: 8,
    progreso: 0,
    accent: 'from-pink-500/15 to-pink-500/0 text-pink-700',
  },
  {
    id: 'arte-arquitectura',
    nombre: 'Historia del Arte y Arquitectura',
    icon: '🏺',
    descripcion: 'Arte universal y arquitectura en México.',
    totalTemas: 10,
    progreso: 0,
    accent: 'from-orange-500/15 to-orange-500/0 text-orange-700',
  },
  {
    id: 'dibujo-tecnico',
    nombre: 'Geometría y Dibujo Técnico',
    icon: '📏',
    descripcion: 'Proyecciones, planos y geometría espacial.',
    totalTemas: 8,
    progreso: 0,
    accent: 'from-slate-500/15 to-slate-500/0 text-slate-700',
  },
  {
    id: 'fisica-diseno',
    nombre: 'Física y Matemáticas para el Diseño',
    icon: '📐',
    descripcion: 'Matemáticas aplicadas, estática y ergonomía.',
    totalTemas: 8,
    progreso: 0,
    accent: 'from-teal-500/15 to-teal-500/0 text-teal-700',
  },
];

export function getStudyMaterias(): StudyMateria[] {
  return studyMaterias;
}
