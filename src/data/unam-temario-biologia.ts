import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Biología — Examen UNAM. */
export const UNAM_BIOLOGIA_TOPICS: UnamTemarioTopic[] = [
  {
    "id": "bio-celula",
    "codigo": "1",
    "titulo": "La Célula",
    "orden": 1,
    "status": "publicado",
    "children": [
      {
        "id": "bio-celula-1-1",
        "codigo": "1.1",
        "titulo": "Teoría Celular",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "bio-celula-1-1-1",
            "codigo": "1.1.1",
            "titulo": "Descubrimiento histórico",
            "descripcion": "Robert Hooke (término célula, corcho), Anton van Leeuwenhoek (microbios vivos), Theodor Schwann (plantas de células), Matthias Schleiden (animales de células), Rudolf Virchow (toda célula de otra preexistente).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-celula-1-1-2",
            "codigo": "1.1.2",
            "titulo": "Postulados de la Teoría Celular",
            "descripcion": "Anatómico: todos los seres vivos están formados por una o más células. Fisiológico: las funciones metabólicas ocurren dentro de las células. De origen: toda célula proviene de otra preexistente y contiene información genética hereditaria.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "bio-celula-1-2",
        "codigo": "1.2",
        "titulo": "Composición Química de la Célula (Biomoléculas)",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "bio-celula-1-2-1",
            "codigo": "1.2.1",
            "titulo": "Carbohidratos",
            "descripcion": "CHO; energía y estructura. Monosacáridos (glucosa, fructosa, ribosa). Disacáridos (sacarosa, lactosa, maltosa). Polisacáridos: almidón (plantas), glucógeno (animales), celulosa (pared vegetal), quitina (hongos y artrópodos).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-celula-1-2-2",
            "codigo": "1.2.2",
            "titulo": "Lípidos",
            "descripcion": "Hidrofóbicos; reserva energética, aislante, membranas. Triglicéridos, fosfolípidos (bicapa), esteroides (colesterol, hormonas sexuales).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "bio-celula-1-2-3",
            "codigo": "1.2.3",
            "titulo": "Proteínas",
            "descripcion": "CHON; aminoácidos unidos por enlaces peptídicos. Funciones: estructural, enzimática, inmunológica, transporte, hormonal. Aminoácidos esenciales y no esenciales.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "bio-celula-1-2-4",
            "codigo": "1.2.4",
            "titulo": "Ácidos Nucleicos",
            "descripcion": "Nucleótidos (fosfato, azúcar pentosa, base nitrogenada); almacenamiento y transmisión de información genética.",
            "orden": 4,
            "status": "publicado"
          },
          {
            "id": "bio-celula-1-2-5",
            "codigo": "1.2.5",
            "titulo": "Vitaminas",
            "descripcion": "Coenzimas esenciales. Hidrosolubles (B, C) y liposolubles (A, D, E, K). Deficiencias: escorbuto (C), raquitismo (D), ceguera nocturna (A), beriberi (B1).",
            "orden": 5,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "bio-celula-1-3",
        "codigo": "1.3",
        "titulo": "Estructura y Función de los Organelos Celulares",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "bio-celula-1-3-1",
            "codigo": "1.3.1",
            "titulo": "Membrana Celular",
            "descripcion": "Modelo del mosaico fluido. Transporte pasivo (difusión, ósmosis: isotónica, hipotónica/turgencia-lisis, hipertónica/plasmólisis-crenación) y activo (bomba Na⁺/K⁺, endocitosis, exocitosis).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-celula-1-3-2",
            "codigo": "1.3.2",
            "titulo": "Citoplasma o Citosol",
            "descripcion": "Matriz acuosa de reacciones metabólicas y soporte de organelos.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "bio-celula-1-3-3",
            "codigo": "1.3.3",
            "titulo": "Núcleo y Nucleolo",
            "descripcion": "Núcleo dirige actividades y almacena ADN; nucleolo sintetiza ARNr y ensambla ribosomas.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "bio-celula-1-3-4",
            "codigo": "1.3.4",
            "titulo": "Ribosomas",
            "descripcion": "Síntesis de proteínas (traducción del ARNm).",
            "orden": 4,
            "status": "publicado"
          },
          {
            "id": "bio-celula-1-3-5",
            "codigo": "1.3.5",
            "titulo": "Retículo Endoplásmico",
            "descripcion": "RER: ribosomas, proteínas de exportación. REL: lípidos y detoxificación.",
            "orden": 5,
            "status": "publicado"
          },
          {
            "id": "bio-celula-1-3-6",
            "codigo": "1.3.6",
            "titulo": "Aparato de Golgi",
            "descripcion": "Empaca, modifica y distribuye proteínas y lípidos; forma lisosomas.",
            "orden": 6,
            "status": "publicado"
          },
          {
            "id": "bio-celula-1-3-7",
            "codigo": "1.3.7",
            "titulo": "Lisosomas",
            "descripcion": "Enzimas hidrolíticas; digestión celular y autofagia.",
            "orden": 7,
            "status": "publicado"
          },
          {
            "id": "bio-celula-1-3-8",
            "codigo": "1.3.8",
            "titulo": "Peroxisomas",
            "descripcion": "Descomponen H₂O₂ y ácidos grasos (catalasa).",
            "orden": 8,
            "status": "publicado"
          },
          {
            "id": "bio-celula-1-3-9",
            "codigo": "1.3.9",
            "titulo": "Vacuolas",
            "descripcion": "Almacenamiento; grandes en plantas (turgencia).",
            "orden": 9,
            "status": "publicado"
          },
          {
            "id": "bio-celula-1-3-10",
            "codigo": "1.3.10",
            "titulo": "Mitocondrias",
            "descripcion": "Respiración aerobia y ATP; ADN propio.",
            "orden": 10,
            "status": "publicado"
          },
          {
            "id": "bio-celula-1-3-11",
            "codigo": "1.3.11",
            "titulo": "Cloroplastos",
            "descripcion": "Fotosíntesis en plantas y algas; clorofila en tilacoides/granas y estroma; ADN propio.",
            "orden": 11,
            "status": "publicado"
          },
          {
            "id": "bio-celula-1-3-12",
            "codigo": "1.3.12",
            "titulo": "Citoesqueleto y Centriolos",
            "descripcion": "Forma celular; centriolos organizan huso mitótico; cilios y flagelos.",
            "orden": 12,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "bio-celula-1-4",
        "codigo": "1.4",
        "titulo": "Diferencias entre Células Procariotas y Eucariotas",
        "orden": 4,
        "status": "publicado",
        "children": [
          {
            "id": "bio-celula-1-4-1",
            "codigo": "1.4.1",
            "titulo": "Célula Procariota",
            "descripcion": "Pequeña; sin núcleo (ADN circular en nucleoide); sin organelos membranosos (ribosomas 70S); pared de peptidoglicano. Bacterias y arqueas.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-celula-1-4-2",
            "codigo": "1.4.2",
            "titulo": "Célula Eucariota",
            "descripcion": "Grande; núcleo con membrana; ADN lineal en cromosomas; organelos membranosos. Protozoarios, hongos, plantas y animales.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "bio-metabolismo",
    "codigo": "2",
    "titulo": "Metabolismo Celular",
    "orden": 2,
    "status": "publicado",
    "children": [
      {
        "id": "bio-metabolismo-2-1",
        "codigo": "2.1",
        "titulo": "Conceptos Fundamentales",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "bio-metabolismo-2-1-1",
            "codigo": "2.1.1",
            "titulo": "Reacciones Metabólicas",
            "descripcion": "Anabolismo: síntesis, endergónico (fotosíntesis, proteínas, replicación ADN). Catabolismo: degradación, exergónico (glucólisis, Krebs, digestión).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-metabolismo-2-1-2",
            "codigo": "2.1.2",
            "titulo": "Enzimas",
            "descripcion": "Biocatalizadoras; modelo llave-cerradura; desnaturalización por temperatura y pH extremos.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "bio-metabolismo-2-1-3",
            "codigo": "2.1.3",
            "titulo": "El ATP",
            "descripcion": "Moneda energética: adenina, ribosa, tres fosfatos. Hidrólisis → ADP + Pi libera energía.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "bio-metabolismo-2-2",
        "codigo": "2.2",
        "titulo": "Fotosíntesis (Proceso Anabólico)",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "bio-metabolismo-2-2-1",
            "codigo": "2.2.1",
            "titulo": "Definición",
            "descripcion": "Luz → energía química (glucosa) desde CO₂ y H₂O, liberando O₂. 6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-metabolismo-2-2-2",
            "codigo": "2.2.2",
            "titulo": "Fase Luminosa",
            "descripcion": "En tilacoides: clorofila absorbe fotones; fotólisis del agua (O₂); ATP y NADPH.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "bio-metabolismo-2-2-3",
            "codigo": "2.2.3",
            "titulo": "Fase Oscura (Ciclo de Calvin)",
            "descripcion": "En estroma; fijación de CO₂ (Rubisco); usa ATP y NADPH; producto G3P/glucosa.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "bio-metabolismo-2-3",
        "codigo": "2.3",
        "titulo": "Respiración Celular (Proceso Catabólico)",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "bio-metabolismo-2-3-1",
            "codigo": "2.3.1",
            "titulo": "Glucólisis",
            "descripcion": "Citoplasma; glucosa → 2 piruvatos; rendimiento neto 2 ATP y 2 NADH.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-metabolismo-2-3-2",
            "codigo": "2.3.2",
            "titulo": "Respiración Anaerobia (Fermentación)",
            "descripcion": "Sin O₂; regenera NAD⁺. Láctica (músculo, yogur); alcohólica (levaduras, etanol + CO₂).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "bio-metabolismo-2-3-3",
            "codigo": "2.3.3",
            "titulo": "Respiración Aerobia",
            "descripcion": "Mitocondria: piruvato → acetil-CoA; Ciclo de Krebs (matriz); cadena de transporte de electrones y fosforilación oxidativa (crestas); O₂ aceptor final → H₂O.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "bio-metabolismo-2-3-4",
            "codigo": "2.3.4",
            "titulo": "Balance Energético Aerobio Total",
            "descripcion": "Aprox. 36–38 ATP por glucosa (vs. 2 ATP solo en anaerobia).",
            "orden": 4,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "bio-reproduccion",
    "codigo": "3",
    "titulo": "Reproducción y Ciclo Celular",
    "orden": 3,
    "status": "publicado",
    "children": [
      {
        "id": "bio-reproduccion-3-1",
        "codigo": "3.1",
        "titulo": "El Ciclo Celular",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "bio-reproduccion-3-1-1",
            "codigo": "3.1.1",
            "titulo": "Interfase",
            "descripcion": "~90% del ciclo. G1: crecimiento y proteínas. S: replicación del ADN. G2: preparación para división.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-reproduccion-3-1-2",
            "codigo": "3.1.2",
            "titulo": "Fase M (División Celular)",
            "descripcion": "Mitosis o meiosis seguidas de citocinesis.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "bio-reproduccion-3-2",
        "codigo": "3.2",
        "titulo": "Mitosis (División de Células Somáticas)",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "bio-reproduccion-3-2-1",
            "codigo": "3.2.1",
            "titulo": "Definición",
            "descripcion": "Célula madre 2n → dos hijas idénticas 2n. Crecimiento, regeneración, reproducción asexual.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-reproduccion-3-2-2",
            "codigo": "3.2.2",
            "titulo": "Fases de la Mitosis",
            "descripcion": "Profase (condensación, huso). Metafase (placa ecuatorial). Anafase (separación de cromátides). Telofase (dos núcleos).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "bio-reproduccion-3-2-3",
            "codigo": "3.2.3",
            "titulo": "Citocinesis",
            "descripcion": "Animales: estrangulación. Vegetales: placa celular (fragmoplasto).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "bio-reproduccion-3-3",
        "codigo": "3.3",
        "titulo": "Meiosis (Gametogénesis)",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "bio-reproduccion-3-3-1",
            "codigo": "3.3.1",
            "titulo": "Definición",
            "descripcion": "En gónadas: 2n → cuatro gametos n genéticamente distintos.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-reproduccion-3-3-2",
            "codigo": "3.3.2",
            "titulo": "Etapas Críticas de la Meiosis",
            "descripcion": "Meiosis I (reduccional): profase I con sinapsis y entrecruzamiento; metafase I pares homólogos; anafase I separa homólogos. Meiosis II (ecuacional): separa cromátides → 4 células n.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "bio-reproduccion-3-4",
        "codigo": "3.4",
        "titulo": "Tipos de Reproducción en los Seres Vivos",
        "orden": 4,
        "status": "publicado",
        "children": [
          {
            "id": "bio-reproduccion-3-4-1",
            "codigo": "3.4.1",
            "titulo": "Reproducción Asexual",
            "descripcion": "Un progenitor; mitosis; clones. Fisión binaria, gemación, esporulación, fragmentación.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-reproduccion-3-4-2",
            "codigo": "3.4.2",
            "titulo": "Reproducción Sexual",
            "descripcion": "Dos progenitores; meiosis y fecundación → cigoto 2n; alta variabilidad genética.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "bio-genetica",
    "codigo": "4",
    "titulo": "Genética y Biología Molecular",
    "orden": 4,
    "status": "publicado",
    "children": [
      {
        "id": "bio-genetica-4-1",
        "codigo": "4.1",
        "titulo": "Conceptos Mendelianos y Cruces Genéticos",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "bio-genetica-4-1-1",
            "codigo": "4.1.1",
            "titulo": "Vocabulario fundamental",
            "descripcion": "Gen, alelo, locus, dominante (A), recesivo (a), homocigoto, heterocigoto, genotipo, fenotipo.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-genetica-4-1-2",
            "codigo": "4.1.2",
            "titulo": "Leyes de Mendel",
            "descripcion": "1ª: F1 uniforme (Aa). 2ª: segregación F2 3:1 fenotípico, 1:2:1 genotípico (Punnett). 3ª: distribución independiente dihíbrido 9:3:3:1.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "bio-genetica-4-2",
        "codigo": "4.2",
        "titulo": "Herencia Post-Mendeliana y Ligada al Sexo",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "bio-genetica-4-2-1",
            "codigo": "4.2.1",
            "titulo": "Dominancia Incompleta",
            "descripcion": "Heterocigoto fenotipo intermedio (flores rosas RR × BB).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-genetica-4-2-2",
            "codigo": "4.2.2",
            "titulo": "Codominancia",
            "descripcion": "Ambos alelos se expresan (plumas moteadas).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "bio-genetica-4-2-3",
            "codigo": "4.2.3",
            "titulo": "Alelos Múltiples",
            "descripcion": "Grupos sanguíneos ABO (Iᴬ, Iᴮ codominantes; i recesivo).",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "bio-genetica-4-2-4",
            "codigo": "4.2.4",
            "titulo": "Herencia Ligada al Sexo",
            "descripcion": "Genes en cromosoma X; hombres XY más vulnerables a recesivos. Daltonismo y hemofilia.",
            "orden": 4,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "bio-genetica-4-3",
        "codigo": "4.3",
        "titulo": "Estructura del ADN y Dogma Central",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "bio-genetica-4-3-1",
            "codigo": "4.3.1",
            "titulo": "Estructura del ADN",
            "descripcion": "Watson, Crick, Franklin; doble hélice. Chargaff: A–T (2 puentes), C–G (3 puentes). Purinas (A,G) y pirimidinas (C,T).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-genetica-4-3-2",
            "codigo": "4.3.2",
            "titulo": "Estructura del ARN",
            "descripcion": "Monocatenario; ribosa; uracilo. ARNm, ARNt (anticodón), ARNr.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "bio-genetica-4-3-3",
            "codigo": "4.3.3",
            "titulo": "El Dogma Central",
            "descripcion": "Replicación (ADN→ADN, ADN polimerasa). Transcripción (ADN→ARNm, ARN polimerasa). Traducción (ARNm→proteína en ribosoma; codones; inicio AUG; parada UAA/UAG/UGA).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "bio-genetica-4-4",
        "codigo": "4.4",
        "titulo": "Mutaciones",
        "orden": 4,
        "status": "publicado",
        "children": [
          {
            "id": "bio-genetica-4-4-1",
            "codigo": "4.4.1",
            "titulo": "Definición",
            "descripcion": "Cambio permanente en secuencia de ADN; espontáneas o inducidas (UV, rayos X, químicos).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-genetica-4-4-2",
            "codigo": "4.4.2",
            "titulo": "Clasificación",
            "descripcion": "Génicas/puntuales. Cromosómicas estructurales. Genómicas: aneuploidías (Down 21, Turner 45X0, Klinefelter 47XXY).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "bio-evolucion",
    "codigo": "5",
    "titulo": "Evolución y Diversidad",
    "orden": 5,
    "status": "publicado",
    "children": [
      {
        "id": "bio-evolucion-5-1",
        "codigo": "5.1",
        "titulo": "Teorías del Origen de la Vida",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "bio-evolucion-5-1-1",
            "codigo": "5.1.1",
            "titulo": "Creacionismo / Fijismo",
            "descripcion": "Vida creada divinamente; especies inmutables.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-evolucion-5-1-2",
            "codigo": "5.1.2",
            "titulo": "Generación Espontánea",
            "descripcion": "Refutada por Pasteur (matraces de cuello de cisne).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "bio-evolucion-5-1-3",
            "codigo": "5.1.3",
            "titulo": "Panspermia (Arrhenius)",
            "descripcion": "Vida en esporas de meteoritos.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "bio-evolucion-5-1-4",
            "codigo": "5.1.4",
            "titulo": "Teoría Quimiosintética (Oparin y Haldane)",
            "descripcion": "Evolución química en atmósfera reductora; sopa primigenia; coacervados. Miller y Urey (1953).",
            "orden": 4,
            "status": "publicado"
          },
          {
            "id": "bio-evolucion-5-1-5",
            "codigo": "5.1.5",
            "titulo": "Teoría Endosimbiótica (Margulis)",
            "descripcion": "Mitocondrias y cloroplastos como bacterias simbiontes; ADN circular, ribosomas 70S, doble membrana.",
            "orden": 5,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "bio-evolucion-5-2",
        "codigo": "5.2",
        "titulo": "Teorías Evolutivas",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "bio-evolucion-5-2-1",
            "codigo": "5.2.1",
            "titulo": "Lamarckismo",
            "descripcion": "Uso y desuso; herencia de caracteres adquiridos (jirafas — falso).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-evolucion-5-2-2",
            "codigo": "5.2.2",
            "titulo": "Darwinismo",
            "descripcion": "Variabilidad, sobreproducción, selección natural, reproducción diferencial (Darwin y Wallace, 1859).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "bio-evolucion-5-2-3",
            "codigo": "5.2.3",
            "titulo": "Teoría Sintética (Neodarwinismo)",
            "descripcion": "Darwin + Mendel + genética de poblaciones; mutación, recombinación, deriva génica, selección natural.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "bio-evolucion-5-3",
        "codigo": "5.3",
        "titulo": "Evidencias de la Evolución",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "bio-evolucion-5-3-1",
            "codigo": "5.3.1",
            "titulo": "Fósiles",
            "descripcion": "Paleontología y líneas filogenéticas.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-evolucion-5-3-2",
            "codigo": "5.3.2",
            "titulo": "Anatomía Comparada",
            "descripcion": "Homólogos (brazo humano, aleta ballena — divergente). Análogos (ala insecto y ave — convergente). Vestigiales (apéndice, coxis).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "bio-evolucion-5-3-3",
            "codigo": "5.3.3",
            "titulo": "Embriología Comparada",
            "descripcion": "Hendiduras branquiales y cola en embriones de vertebrados.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "bio-evolucion-5-3-4",
            "codigo": "5.3.4",
            "titulo": "Bioquímica y Genética Comparada",
            "descripcion": "Similitud de ADN, ARN y proteínas (citocromo c) indica parentesco.",
            "orden": 4,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "bio-evolucion-5-4",
        "codigo": "5.4",
        "titulo": "Taxonomía y los Reinos de la Naturaleza",
        "orden": 4,
        "status": "publicado",
        "children": [
          {
            "id": "bio-evolucion-5-4-1",
            "codigo": "5.4.1",
            "titulo": "Taxonomía",
            "descripcion": "Linneo: nomenclatura binomial. Categorías: dominio, reino, filo, clase, orden, familia, género, especie.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-evolucion-5-4-2",
            "codigo": "5.4.2",
            "titulo": "Clasificación de los 5 Reinos (Whittaker)",
            "descripcion": "Monera, Protista, Fungi, Plantae, Animalia.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "bio-evolucion-5-4-3",
            "codigo": "5.4.3",
            "titulo": "Los Tres Dominios (Woese)",
            "descripcion": "Bacteria, Archaea, Eukarya (ARNr 16S).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "bio-ecologia",
    "codigo": "6",
    "titulo": "Ecología",
    "orden": 6,
    "status": "publicado",
    "children": [
      {
        "id": "bio-ecologia-6-1",
        "codigo": "6.1",
        "titulo": "Estructura y Niveles de Organización Ecológica",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "bio-ecologia-6-1-1",
            "codigo": "6.1.1",
            "titulo": "Niveles de organización del ambiente",
            "descripcion": "Individuo, población, comunidad/biocenosis, ecosistema, bioma, biosfera.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-ecologia-6-1-2",
            "codigo": "6.1.2",
            "titulo": "Componentes del Ecosistema",
            "descripcion": "Bióticos: productores, consumidores, descomponedores. Abióticos: luz, agua, temperatura, suelo, pH.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "bio-ecologia-6-2",
        "codigo": "6.2",
        "titulo": "Dinámica de las Poblaciones e Interacciones",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "bio-ecologia-6-2-1",
            "codigo": "6.2.1",
            "titulo": "Propiedades de las poblaciones",
            "descripcion": "Densidad, natalidad, mortalidad, distribución; crecimiento exponencial (J) y logístico (S).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-ecologia-6-2-2",
            "codigo": "6.2.2",
            "titulo": "Interacciones interespecíficas",
            "descripcion": "Depredación (+/−), parasitismo (+/−), competencia (−/−), mutualismo (+/+), protocooperación (+/+), comensalismo (+/0).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "bio-ecologia-6-3",
        "codigo": "6.3",
        "titulo": "Flujo de Energía y Ciclos Biogeoquímicos",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "bio-ecologia-6-3-1",
            "codigo": "6.3.1",
            "titulo": "Pirámides Tróficas y Flujo Energético",
            "descripcion": "Energía unidireccional; ley del 10% entre niveles tróficos; máximo 4–5 niveles.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-ecologia-6-3-2",
            "codigo": "6.3.2",
            "titulo": "Ciclos Biogeoquímicos",
            "descripcion": "Carbono (fotosíntesis/respiración/combustión). Nitrógeno: fijación, nitrificación, asimilación, amonificación, desnitrificación. Oxígeno. Fósforo y azufre (sedimentarios).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "bio-ecologia-6-4",
        "codigo": "6.4",
        "titulo": "Deterioro Ambiental y Conservación",
        "orden": 4,
        "status": "publicado",
        "children": [
          {
            "id": "bio-ecologia-6-4-1",
            "codigo": "6.4.1",
            "titulo": "Contaminación Atmosférica y Cambio Global",
            "descripcion": "Combustibles fósiles; efecto invernadero, lluvia ácida, inversión térmica.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "bio-ecologia-6-4-2",
            "codigo": "6.4.2",
            "titulo": "Pérdida de la Biodiversidad",
            "descripcion": "Deforestación, fragmentación, especies invasoras, sobreexplotación.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "bio-ecologia-6-4-3",
            "codigo": "6.4.3",
            "titulo": "Desarrollo Sustentable",
            "descripcion": "Satisfacer necesidades actuales sin comprometer a las generaciones futuras.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      }
    ]
  }
] as UnamTemarioTopic[];
