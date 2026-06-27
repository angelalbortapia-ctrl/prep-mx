export interface FallacyEntry {
  id: string;
  name: string;
  latin: string;
  definition: string;
  mexicanExample: string;
  examTip: string;
  emoji: string;
}

export const FALLACIES: FallacyEntry[] = [
  {
    id: 'ad-hominem',
    name: 'Ad hominem',
    latin: 'Ad hominem',
    definition: 'Atacar a la persona que argumenta en lugar de refutar su idea.',
    mexicanExample:
      '«No le creas a la diputada: siempre trae el pelo mal peinado en las comparecencias.» — El peinado no invalida su propuesta de ley.',
    examTip: 'Pregunta: ¿el argumento ataca carácter, apariencia o credenciales sin tocar la tesis?',
    emoji: '🎯',
  },
  {
    id: 'ad-baculum',
    name: 'Ad baculum',
    latin: 'Ad baculum (apelación a la fuerza)',
    definition: 'Imponer una conclusión mediante amenaza, castigo o presión, no con razones.',
    mexicanExample:
      '«Si no votas por mi partido, te quitan la beca del gobierno.» — Es coerción, no argumento lógico.',
    examTip: 'Busca frases con «o si no…», amenazas veladas o chantaje institucional.',
    emoji: '👊',
  },
  {
    id: 'ad-populum',
    name: 'Ad populum',
    latin: 'Ad populum',
    definition: 'Sostener que algo es verdadero porque «todos» o la mayoría lo cree.',
    mexicanExample:
      '«Todo el barrio usa este remedio para la gripe, así que funciona.» — Popularidad ≠ evidencia científica.',
    examTip: 'Cuidado con «la gente dice», «es de sentido común» o apelar a tradición sin prueba.',
    emoji: '👥',
  },
  {
    id: 'falso-dilema',
    name: 'Falso dilema',
    latin: 'Falsa dicotomía',
    definition: 'Presentar solo dos opciones cuando existen más alternativas.',
    mexicanExample:
      '«O estudias medicina o vas a fracasar en la vida.» — Hay decenas de carreras y caminos válidos.',
    examTip: 'Si el enunciado fuerza «o A o B» sin justificar por qué no hay C, es trampa clásica.',
    emoji: '⚖️',
  },
  {
    id: 'hombre-paja',
    name: 'Hombre de paja',
    latin: 'Straw man',
    definition: 'Distorsionar el argumento ajeno para derribarlo más fácil.',
    mexicanExample:
      'A: «Deberíamos regular los precios del gas LP.» B: «Entonces quieres que no haya gas en todo México.»',
    examTip: 'Compara la réplica con lo que realmente dijo el oponente: ¿es una caricatura?',
    emoji: '🌾',
  },
  {
    id: 'pendiente-resbaladiza',
    name: 'Pendiente resbaladiza',
    latin: 'Slippery slope',
    definition: 'Afirmar que un paso pequeño llevará inevitablemente a un desastre extremo.',
    mexicanExample:
      '«Si permiten el matrimonio igualitario, mañana se casarán personas con árboles.» — Salto sin evidencia.',
    examTip: 'Pide eslabones lógicos entre el primer hecho y la conclusión catastrófica.',
    emoji: '📉',
  },
  {
    id: 'peticion-principio',
    name: 'Petición de principio',
    latin: 'Petitio principii',
    definition: 'Asumir en la premisa lo que se quiere demostrar en la conclusión.',
    mexicanExample:
      '«El INE es parcial porque siempre favorece al adversario.» — La parcialidad es justo lo que falta probar.',
    examTip: 'Circulo vicioso: la conclusión ya está escondida en la premisa.',
    emoji: '🔄',
  },
  {
    id: 'generalizacion-apresurada',
    name: 'Generalización apresurada',
    latin: 'Hasty generalization',
    definition: 'Sacar una regla universal de muy pocos casos.',
    mexicanExample:
      '«Conocí a dos politécnicos groseros; todos los del IPN son así.» — Muestra ridículamente pequeña.',
    examTip: 'Cuenta casos: ¿uno o dos ejemplos bastan para «todos/siempre/nunca»?',
    emoji: '📊',
  },
];
