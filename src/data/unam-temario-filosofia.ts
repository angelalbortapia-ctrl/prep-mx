import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Filosofía — Examen UNAM. */
export const UNAM_FILOSOFIA_TOPICS: UnamTemarioTopic[] = [
  {
    "id": "fil-intro",
    "codigo": "1",
    "titulo": "Introducción a la Filosofía y sus Ramas",
    "orden": 1,
    "status": "publicado",
    "children": [
      {
        "id": "fil-intro-1-1",
        "codigo": "1.1",
        "titulo": "Origen del Pensamiento Filosófico",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "fil-intro-1-1-1",
            "codigo": "1.1.1",
            "titulo": "El paso del mito al logos",
            "descripcion": "Nacimiento de la filosofía en Grecia (siglo VI a.C.): abandono del mito (deidades y fuerzas sobrenaturales) por el logos (razón, argumentación lógica y observación de la naturaleza).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fil-intro-1-1-2",
            "codigo": "1.1.2",
            "titulo": "Concepto y etimología",
            "descripcion": "Philos (amor) + sophia (sabiduría) = «amor a la sabiduría». Ciencia de las primeras causas y principios de todas las cosas.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fil-intro-1-2",
        "codigo": "1.2",
        "titulo": "Disciplinas o Ramas de la Filosofía",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "fil-intro-1-2-1",
            "codigo": "1.2.1",
            "titulo": "Ontología / Metafísica",
            "descripcion": "Estudio del ser en cuanto ser, la existencia, la realidad, la sustancia y la naturaleza última de las cosas.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fil-intro-1-2-2",
            "codigo": "1.2.2",
            "titulo": "Epistemología / Gnoseología",
            "descripcion": "Estudio del conocimiento científico (epistemología) y del conocimiento en general (gnoseología): origen, esencia, validez, límites y posibilidad (dogmatismo, escepticismo, racionalismo, empirismo).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fil-intro-1-2-3",
            "codigo": "1.2.3",
            "titulo": "Lógica",
            "descripcion": "Formas y leyes del pensamiento correcto, estructura de argumentos válidos y métodos de demostración.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "fil-intro-1-2-4",
            "codigo": "1.2.4",
            "titulo": "Ética",
            "descripcion": "Reflexión sobre la moral, el deber, la virtud, el bien, el mal y el actuar humano libre y responsable.",
            "orden": 4,
            "status": "publicado"
          },
          {
            "id": "fil-intro-1-2-5",
            "codigo": "1.2.5",
            "titulo": "Axiología",
            "descripcion": "Filosofía de los valores: naturaleza, clasificación y juicios de valor (lo valioso, lo útil, lo sagrado).",
            "orden": 5,
            "status": "publicado"
          },
          {
            "id": "fil-intro-1-2-6",
            "codigo": "1.2.6",
            "titulo": "Estética",
            "descripcion": "Filosofía del arte: belleza, percepción sensible, creación artística y experiencia estética.",
            "orden": 6,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "fil-logica",
    "codigo": "2",
    "titulo": "Lógica y Argumentación",
    "orden": 2,
    "status": "publicado",
    "children": [
      {
        "id": "fil-logica-2-1",
        "codigo": "2.1",
        "titulo": "Estructuras del Pensamiento y Silogismos",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "fil-logica-2-1-1",
            "codigo": "2.1.1",
            "titulo": "Las tres formas del pensamiento",
            "descripcion": "Concepto (representación abstracta), juicio (afirmación o negación entre conceptos), razonamiento (conclusión a partir de premisas).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fil-logica-2-1-2",
            "codigo": "2.1.2",
            "titulo": "El Silogismo Categórico",
            "descripcion": "Aristóteles: premisa mayor, premisa menor y conclusión. Término mayor (P, predicado de la conclusión), término menor (S, sujeto), término medio (M, conecta premisas y no aparece en la conclusión).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "fil-logica-2-1-3",
            "codigo": "2.1.3",
            "titulo": "Reglas del Silogismo",
            "descripcion": "De dos premisas particulares o negativas nada se sigue; el término medio debe ser universal al menos una vez; la conclusión sigue a la parte más débil.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fil-logica-2-2",
        "codigo": "2.2",
        "titulo": "Falacias (Formas Invalidadas de Argumentación)",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "fil-logica-2-2-1",
            "codigo": "2.2.1",
            "titulo": "Definición",
            "descripcion": "Argumentos que parecen válidos pero contienen error oculto en estructura o contenido lógico.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fil-logica-2-2-2",
            "codigo": "2.2.2",
            "titulo": "Falacias Informales (muy preguntadas UNAM)",
            "descripcion": "Ad hominem (atacar a la persona). Ad baculum (fuerza o amenaza). Ad misericordiam (piedad). Ad verecundiam (autoridad fuera de su campo). Ad populum (mayoría). Ad ignorantiam (no demostrado = verdadero/falso).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fil-logica-2-3",
        "codigo": "2.3",
        "titulo": "Lógica Proposicional o Simbólica",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "fil-logica-2-3-1",
            "codigo": "2.3.1",
            "titulo": "Conectivas Lógicas y Operadores",
            "descripcion": "Negación (¬). Conjunción (∧, «p y q»). Disyunción (∨, «p o q»). Condicional (→, «si p entonces q»). Bicondicional (↔, «p si y solo si q»).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fil-logica-2-3-2",
            "codigo": "2.3.2",
            "titulo": "Tablas de Verdad",
            "descripcion": "Tautología (todo verdadero), contradicción (todo falso), contingencia (mezcla de valores).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "fil-etica",
    "codigo": "3",
    "titulo": "Ética y Doctrinas Morales Históricas",
    "orden": 3,
    "status": "publicado",
    "children": [
      {
        "id": "fil-etica-3-1",
        "codigo": "3.1",
        "titulo": "Conceptos Fundamentales del Actuar Humano",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "fil-etica-3-1-1",
            "codigo": "3.1.1",
            "titulo": "Diferencia entre Ética y Moral",
            "descripcion": "Moral: normas y valores concretos de una sociedad. Ética: disciplina filosófica que analiza el fundamento racional de esos sistemas.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fil-etica-3-1-2",
            "codigo": "3.1.2",
            "titulo": "Autonomía y Heteronomía",
            "descripcion": "Autonomía: el individuo dicta sus leyes morales según razón y conciencia. Heteronomía: actuar por normas externas (Estado, religión, sociedad) sin cuestionamiento propio.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "fil-etica-3-2",
        "codigo": "3.2",
        "titulo": "Doctrinas Éticas de la Historia",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "fil-etica-3-2-1",
            "codigo": "3.2.1",
            "titulo": "Éticas de la Antigüedad Clásica",
            "descripcion": "Sócrates (intelectualismo moral: conocer el bien es actuar bien). Aristóteles (eudemonismo: felicidad por virtud y justo medio). Epicuro (hedonismo y ataraxia). Estoicismo (Zenón, Séneca, Marco Aurelio: virtud, razón cósmica, control de pasiones).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fil-etica-3-2-2",
            "codigo": "3.2.2",
            "titulo": "Éticas de la Modernidad y Contemporáneas",
            "descripcion": "Kant (deontología, imperativo categórico, buena voluntad, deber por el deber). Utilitarismo (Bentham, Mill: mayor felicidad para el mayor número; consecuencialismo).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "fil-estetica",
    "codigo": "4",
    "titulo": "Estética y Filosofía del Arte",
    "orden": 4,
    "status": "publicado",
    "children": [
      {
        "id": "fil-estetica-4-1",
        "codigo": "4.1",
        "titulo": "Teorías de la Belleza y la Experiencia Estética",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "fil-estetica-4-1-1",
            "codigo": "4.1.1",
            "titulo": "Concepto de Belleza en la Historia",
            "descripcion": "Clásica (Platón, Aristóteles): armonía, proporción, mímesis. Moderna (Kant): juicio estético desinteresado, desvinculado de utilidad y moral.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "fil-estetica-4-1-2",
            "codigo": "4.1.2",
            "titulo": "La Experiencia Estética",
            "descripcion": "Conmoción o percepción sensible e intelectual ante obra de arte o naturaleza. Categorías: lo bello, sublime, trágico, cómico, grotesco y feo.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      }
    ]
  }
] as UnamTemarioTopic[];
