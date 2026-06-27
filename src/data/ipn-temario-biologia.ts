import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Biología — Examen IPN. */
export const IPN_BIOLOGIA_TOPICS: UnamTemarioTopic[] = [
  {
    "id": "ipn-bio-4-1",
    "codigo": "4.1",
    "titulo": "Biología celular y bioquímica",
    "orden": 1,
    "status": "publicado",
    "children": [
      {
        "id": "ipn-bio-4-1-1",
        "codigo": "4.1.1",
        "titulo": "Ultraestructura de organelos",
        "orden": 1,
        "status": "publicado",
        "descripcion": "Identificación precisa de partes internas de los organelos: las crestas y la matriz en mitocondrias; los tilacoides, estroma y granas en cloroplastos; la cara cis y trans del aparato de Golgi."
      },
      {
        "id": "ipn-bio-4-1-2",
        "codigo": "4.1.2",
        "titulo": "Bioquímica de monómeros",
        "orden": 2,
        "status": "publicado",
        "descripcion": "Reconocimiento de los enlaces covalentes específicos que forman las macromoléculas: enlace glucosídico (carbohidratos), enlace éster (lípidos), enlace peptídico (proteínas) y enlace fosfodiéster (ácidos nucleicos)."
      }
    ]
  },
  {
    "id": "ipn-bio-4-2",
    "codigo": "4.2",
    "titulo": "Metabolismo celular",
    "orden": 2,
    "status": "publicado",
    "children": [
      {
        "id": "ipn-bio-4-2-1",
        "codigo": "4.2.1",
        "titulo": "Mecanismo enzimático",
        "orden": 1,
        "status": "publicado",
        "descripcion": "Gráficas de energía de activación con y sin enzima; inhibición enzimática competitiva (el inhibidor compite por el sitio activo) y no competitiva (se une al sitio alostérico alterando la forma de la enzima)."
      },
      {
        "id": "ipn-bio-4-2-2",
        "codigo": "4.2.2",
        "titulo": "Desglose energético de la respiración celular",
        "orden": 2,
        "status": "publicado",
        "descripcion": "Rendimiento exacto de coenzimas reducidas por cada etapa metabólica a partir de una molécula de glucosa. Glucólisis: 2 piruvatos, 2 ATP netos y 2 NADH. Descarboxilación del piruvato: 2 Acetil-CoA, 2 CO₂ y 2 NADH. Ciclo de Krebs: 4 CO₂, 2 ATP (GTP), 6 NADH y 2 FADH₂. Cadena de transporte de electrones: conversión teórica en la ATP sintasa donde cada NADH citoplásmico/mitocondrial equivale a 2.5 o 3 ATP, y cada FADH₂ equivale a 1.5 o 2 ATP, sumando el balance final de 36 a 38 ATP. El oxígeno actúa como aceptor final formando H₂O."
      }
    ]
  },
  {
    "id": "ipn-bio-4-3",
    "codigo": "4.3",
    "titulo": "Genética, reproducción y dogma central",
    "orden": 3,
    "status": "publicado",
    "children": [
      {
        "id": "ipn-bio-4-3-1",
        "codigo": "4.3.1",
        "titulo": "Cruces dihíbridos con cuadros de Punnett de 16 cuadros",
        "orden": 1,
        "status": "publicado",
        "descripcion": "Resolución de problemas de herencia combinada de dos caracteres independientes de la tercera ley de Mendel. Determinación de frecuencias genotípicas y fenotípicas complejas (proporción clásica 9:3:3:1)."
      },
      {
        "id": "ipn-bio-4-3-2",
        "codigo": "4.3.2",
        "titulo": "Transcripción y código genético",
        "orden": 2,
        "status": "publicado",
        "descripcion": "Ejercicios de conversión secuencial. Si te dan una hebra molde de ADN de 3′ a 5′, transcribir la hebra complementaria de ARNm de 5′ a 3′ (cambiando Timina por Uracilo). Traducir el ARNm a aminoácidos agrupando las bases en tripletes (codones), identificando el codón de inicio (AUG — Metionina) y los codones de terminación (UAA, UAG, UGA)."
      }
    ]
  }
] as UnamTemarioTopic[];
