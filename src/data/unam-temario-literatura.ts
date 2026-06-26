import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Literatura — Examen UNAM. */
export const UNAM_LITERATURA_TOPICS: UnamTemarioTopic[] = [
  {
    "id": "lit-texto",
    "codigo": "1",
    "titulo": "El Texto Literario",
    "orden": 1,
    "status": "publicado",
    "children": [
      {
        "id": "lit-texto-1-1",
        "codigo": "1.1",
        "titulo": "Concepto de Literatura y Propiedades del Texto",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "lit-texto-1-1-1",
            "codigo": "1.1.1",
            "titulo": "Definición",
            "descripcion": "La literatura como manifestación artística que utiliza la palabra escrita o hablada como medio de expresión.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "lit-texto-1-1-2",
            "codigo": "1.1.2",
            "titulo": "Lenguaje denotativo y connotativo",
            "descripcion": "Denotativo: significado literal y de diccionario (textos científicos o informativos). Connotativo: significado figurado, poético o polisémico; evoca sentimientos e imágenes.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "lit-texto-1-2",
        "codigo": "1.2",
        "titulo": "Los Géneros Literarios",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "lit-texto-1-2-1",
            "codigo": "1.2.1",
            "titulo": "Género Épico o Narrativo",
            "descripcion": "Relata acontecimientos en tiempo y espacio; tradicionalmente en prosa. Subgéneros: epopeya, mito, leyenda, cantar de gesta, cuento (breve, pocos personajes) y novela (extensa, múltiples tramas).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "lit-texto-1-2-2",
            "codigo": "1.2.2",
            "titulo": "Género Lírico (Poesía)",
            "descripcion": "Expresa el mundo interior del autor; subjetividad; verso y recursos estilísticos.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "lit-texto-1-2-3",
            "codigo": "1.2.3",
            "titulo": "Género Dramático (Teatro)",
            "descripcion": "Para representación escénica; sin narrador; diálogos, monólogos y acotaciones. Tragedia (final funesto), comedia (humor, final feliz), drama (equilibrio serio-cómico).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "lit-lirico",
    "codigo": "2",
    "titulo": "Análisis del Texto Lírico (El Poema)",
    "orden": 2,
    "status": "publicado",
    "children": [
      {
        "id": "lit-lirico-2-1",
        "codigo": "2.1",
        "titulo": "Elementos Formales del Verso",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "lit-lirico-2-1-1",
            "codigo": "2.1.1",
            "titulo": "El Metro o Métrica",
            "descripcion": "Conteo de las sílabas poéticas de un verso.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "lit-lirico-2-1-2",
            "codigo": "2.1.2",
            "titulo": "Licencias métricas",
            "descripcion": "Sinalefa: vocal final + vocal inicial = una sílaba (ej. «mutuo_amor» = 3 sílabas). Ley del acento final: aguda +1, grave igual, esdrújula −1.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "lit-lirico-2-1-3",
            "codigo": "2.1.3",
            "titulo": "La Rima",
            "descripcion": "Igualdad de sonidos desde la última vocal tónica. Consonante (vocales y consonantes; viento/siento). Asonante (solo vocales; cama/casa).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "lit-lirico-2-2",
        "codigo": "2.2",
        "titulo": "Figuras Retóricas, Literarias o Tropos",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "lit-lirico-2-2-1",
            "codigo": "2.2.1",
            "titulo": "Metáfora",
            "descripcion": "Sustitución por semejanza sin nexo explícito (ej. «las perlas de tu boca» = dientes).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "lit-lirico-2-2-2",
            "codigo": "2.2.2",
            "titulo": "Comparación o Símil",
            "descripcion": "Semejanza explícita con «como», «cual» o «parece» (ej. «Tus ojos son como el mar»).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "lit-lirico-2-2-3",
            "codigo": "2.2.3",
            "titulo": "Hipérbole",
            "descripcion": "Exageración desproporcionada (ej. «Te lloré un río»).",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "lit-lirico-2-2-4",
            "codigo": "2.2.4",
            "titulo": "Personificación o Prosopopeya",
            "descripcion": "Cualidades humanas a objetos o animales (ej. «El viento susurraba»).",
            "orden": 4,
            "status": "publicado"
          },
          {
            "id": "lit-lirico-2-2-5",
            "codigo": "2.2.5",
            "titulo": "Hipérbaton",
            "descripcion": "Alteración del orden sintáctico para ritmo o rima (ej. «Volverán las oscuras golondrinas…»).",
            "orden": 5,
            "status": "publicado"
          },
          {
            "id": "lit-lirico-2-2-6",
            "codigo": "2.2.6",
            "titulo": "Epíteto",
            "descripcion": "Adjetivo que resalta cualidad obvia (ej. «la blanca nieve», «el fuego ardiente»).",
            "orden": 6,
            "status": "publicado"
          },
          {
            "id": "lit-lirico-2-2-7",
            "codigo": "2.2.7",
            "titulo": "Paradoja",
            "descripcion": "Ideas opuestas que encierran verdad (ej. «Vivo sin vivir en mí…» de Santa Teresa).",
            "orden": 7,
            "status": "publicado"
          },
          {
            "id": "lit-lirico-2-2-8",
            "codigo": "2.2.8",
            "titulo": "Aliteración",
            "descripcion": "Repetición de un mismo sonido (ej. «El ala aleve del leve abanico»).",
            "orden": 8,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "lit-corrientes",
    "codigo": "3",
    "titulo": "Corrientes Literarias (Historia de la Literatura)",
    "orden": 3,
    "status": "publicado",
    "children": [
      {
        "id": "lit-corrientes-3-1",
        "codigo": "3.1",
        "titulo": "Romanticismo (Primera mitad del siglo XIX)",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "lit-corrientes-3-1-1",
            "codigo": "3.1.1",
            "titulo": "Características",
            "descripcion": "Rebelión al neoclasicismo; culto al yo; sentimiento sobre razón; libertad, nacionalismo, paisajes lúgubres y muerte.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "lit-corrientes-3-1-2",
            "codigo": "3.1.2",
            "titulo": "Autores y obras",
            "descripcion": "Goethe (Las cuitas del joven Werther), Bécquer (Rimas y Leyendas), Mary Shelley (Frankenstein), Edgar Allan Poe.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "lit-corrientes-3-2",
        "codigo": "3.2",
        "titulo": "Realismo y Naturalismo (Segunda mitad del siglo XIX)",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "lit-corrientes-3-2-1",
            "codigo": "3.2.1",
            "titulo": "Características",
            "descripcion": "Retrato objetivo de la realidad social; burguesía y obreros; crítica social. Naturalismo: herencia y entorno determinan al ser humano.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "lit-corrientes-3-2-2",
            "codigo": "3.2.2",
            "titulo": "Autores y obras",
            "descripcion": "Pérez Galdós (Marianela), Balzac (Papá Goriot), Flaubert (Madame Bovary), Dickens (Oliver Twist), Dostoyevski (Crimen y castigo), Ángel de Campo «Micrós» (La Rumba, México).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "lit-corrientes-3-3",
        "codigo": "3.3",
        "titulo": "Modernismo (Fines del XIX y principios del XX)",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "lit-corrientes-3-3-1",
            "codigo": "3.3.1",
            "titulo": "Características",
            "descripcion": "Primera corriente hispanoamericana que influyó en España; preciosismo, musicalidad, lo exótico, cisnes, princesas, color azul; arte por el arte.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "lit-corrientes-3-3-2",
            "codigo": "3.3.2",
            "titulo": "Autores y obras",
            "descripcion": "Rubén Darío (Azul…, Prosas profanas), Amado Nervo (La amada inmóvil), Gutiérrez Nájera, José Martí.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "lit-corrientes-3-4",
        "codigo": "3.4",
        "titulo": "Vanguardismo (Primera mitad del siglo XX)",
        "orden": 4,
        "status": "publicado",
        "children": [
          {
            "id": "lit-corrientes-3-4-1",
            "codigo": "3.4.1",
            "titulo": "Características",
            "descripcion": "Ruptura tras la Primera Guerra Mundial; experimentación formal; destrucción de métrica clásica; inconsciente y caligramas.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "lit-corrientes-3-4-2",
            "codigo": "3.4.2",
            "titulo": "Principales Ismos de Vanguardia",
            "descripcion": "Surrealismo (sueños, psicoanálisis), dadaísmo (absurdo), futurismo (máquinas, velocidad), cubismo literario.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "lit-corrientes-3-4-3",
            "codigo": "3.4.3",
            "titulo": "Autores y obras",
            "descripcion": "André Breton (surrealismo), Marinetti (futurismo), Pablo Neruda (Veinte poemas…), Federico García Lorca (Bodas de sangre).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "lit-corrientes-3-5",
        "codigo": "3.5",
        "titulo": "Literatura Contemporánea y el Boom Latinoamericano",
        "orden": 5,
        "status": "publicado",
        "children": [
          {
            "id": "lit-corrientes-3-5-1",
            "codigo": "3.5.1",
            "titulo": "Características del Boom",
            "descripcion": "Años 60–70; reconocimiento mundial. Realismo mágico (lo fantástico en lo cotidiano); rupturas temporales en la narración.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "lit-corrientes-3-5-2",
            "codigo": "3.5.2",
            "titulo": "Autores y obras imprescindibles de Hispanoamérica",
            "descripcion": "García Márquez (Cien años de soledad), Rulfo (Pedro Páramo, El Llano en llamas), Fuentes (Aura), Cortázar (Rayuela), Borges (El Aleph, Ficciones), Vargas Llosa (La ciudad y los perros), Octavio Paz (El laberinto de la soledad).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      }
    ]
  }
] as UnamTemarioTopic[];
