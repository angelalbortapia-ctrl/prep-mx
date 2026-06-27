export interface TimelineEvent {
  year: number;
  mexico: string;
  world: string;
  connection?: string;
}

export const HISTORY_TIMELINE: TimelineEvent[] = [
  {
    year: 1810,
    mexico: 'Grito de Dolores — inicio de la Independencia',
    world: 'Revolución industrial en pleno apogeo en Europa',
    connection: 'México busca soberanía mientras Europa transforma producción y comercio.',
  },
  {
    year: 1821,
    mexico: 'Consumación de la Independencia (Iturbide y Guerrero)',
    world: 'Congreso de Viena reorganiza Europa tras Napoleón',
  },
  {
    year: 1848,
    mexico: 'Fin de la guerra con EE.UU.; Tratado de Guadalupe Hidalgo',
    world: 'Revoluciones liberales en Europa; Manifiesto Comunista de Marx y Engels',
    connection: 'México pierde la mitad norte de su territorio; Europa debate liberalismo vs socialismo.',
  },
  {
    year: 1861,
    mexico: 'Reforma de Juárez: Leyes de Reforma',
    world: 'Guerra de Secesión en Estados Unidos',
  },
  {
    year: 1867,
    mexico: 'Derrota del Imperio de Maximiliano; restauración republicana',
    world: 'Unificación de Alemania y de Italia en proceso',
  },
  {
    year: 1910,
    mexico: 'Inicio de la Revolución Mexicana',
    world: 'Carrera armamentística europea; movimientos obreros globales',
    connection: 'Ambos contextos: desigualdad social y demanda de derechos laborales.',
  },
  {
    year: 1914,
    mexico: 'Decena Trágica; ocupación de Veracruz',
    world: 'Inicio de la Primera Guerra Mundial',
  },
  {
    year: 1917,
    mexico: 'Constitución de 1917 (artículos sociales y laborales)',
    world: 'Revolución Rusa; EE.UU. entra a la Gran Guerra',
    connection: 'Constitución mexicana pionera en derechos sociales en el mismo año que revoluciones globales.',
  },
  {
    year: 1929,
    mexico: 'Crisis económica afecta exportaciones; Maximato',
    world: 'Crack del 29 en Wall Street — Gran Depresión',
    connection: 'La economía mexicana dependiente de EE.UU. sufre el contagio mundial.',
  },
  {
    year: 1939,
    mexico: 'Exilio español republicano en México (Casa de España)',
    world: 'Inicio de la Segunda Guerra Mundial',
  },
  {
    year: 1942,
    mexico: 'México declara la guerra al Eje (Escuadrón 201)',
    world: 'Punto de inflexión aliado en la WWII',
  },
  {
    year: 1968,
    mexico: 'Movimiento estudiantil y Juegos Olímpicos CDMX',
    world: 'Mayo del 68 en Francia; guerra de Vietnam',
    connection: 'Protestas juveniles globales contra autoritarismo y guerra.',
  },
  {
    year: 1994,
    mexico: 'EZLN en Chiapas; crisis de diciembre (devaluación)',
    world: 'Fin del apartheid; acuerdos de libre comercio globales',
    connection: 'NAFTA (1994) vincula a México al nuevo orden comercial mundial.',
  },
  {
    year: 2008,
    mexico: 'Operativos antinarco intensificados; crisis financiera local',
    world: 'Crisis subprime y recesión global',
  },
];
