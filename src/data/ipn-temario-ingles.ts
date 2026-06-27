import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Inglés — Examen IPN. */
export const IPN_INGLES_TOPICS: UnamTemarioTopic[] = [
  {
    "id": "ipn-ing-6-1",
    "codigo": "6.1",
    "titulo": "Gramática avanzada (nivel B1)",
    "orden": 1,
    "status": "publicado",
    "children": [
      {
        "id": "ipn-ing-6-1-1",
        "codigo": "6.1.1",
        "titulo": "Tiempos perfectos y marcadores de tiempo",
        "orden": 1,
        "status": "publicado",
        "descripcion": "Estructura del Present Perfect Simple (S + have/has + verbo en participio pasado) y su uso preciso con adverbios temporales clave evaluados por el IPN: since (punto específico en el tiempo), for (duración del tiempo), already (acciones terminadas antes de lo esperado en oraciones afirmativas), yet (acciones no ocurridas al momento en oraciones negativas o preguntas) y just (acciones ocurridas hace unos instantes)."
      },
      {
        "id": "ipn-ing-6-1-2",
        "codigo": "6.1.2",
        "titulo": "Voz pasiva (Passive Voice)",
        "orden": 2,
        "status": "publicado",
        "descripcion": "Transformación de oraciones en voz activa a pasiva en tiempos Presente y Pasado Simple, manteniendo la concordancia del verbo to be auxiliar y convirtiendo el verbo principal a participio pasivo (ej. Active: \"Lázaro Cárdenas founded IPN in 1936\" → Passive: \"IPN was founded by Lázaro Cárdenas in 1936\")."
      },
      {
        "id": "ipn-ing-6-1-3",
        "codigo": "6.1.3",
        "titulo": "Estructuras condicionales",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "ipn-ing-6-1-3-1",
            "codigo": "6.1.3.1",
            "titulo": "First Conditional (real / probable)",
            "orden": 1,
            "status": "publicado",
            "descripcion": "If + Present Simple, S + will + verbo. Expresa condiciones reales o probables en el presente o futuro."
          },
          {
            "id": "ipn-ing-6-1-3-2",
            "codigo": "6.1.3.2",
            "titulo": "Second Conditional (hipotético / irreal)",
            "orden": 2,
            "status": "publicado",
            "descripcion": "If + Past Simple, S + would + verbo. En la cláusula del if, el verbo to be utiliza were para todas las personas (ej. \"If I were you, I would study mechanics\")."
          }
        ]
      }
    ]
  }
] as UnamTemarioTopic[];
