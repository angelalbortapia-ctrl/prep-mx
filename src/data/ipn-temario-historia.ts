import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Historia (México y Ciencia) — Examen IPN. */
export const IPN_HISTORIA_TOPICS: UnamTemarioTopic[] = [
  {
    "id": "ipn-hist-7-1",
    "codigo": "7.1",
    "titulo": "Historia de México institucional y económica",
    "orden": 1,
    "status": "publicado",
    "children": [
      {
        "id": "ipn-hist-7-1-1",
        "codigo": "7.1.1",
        "titulo": "Planes revolucionarios y postrevolucionarios",
        "orden": 1,
        "status": "publicado",
        "descripcion": "Relación exacta de documentos armados con sus objetivos y proclamadores: Plan de San Luis (Madero, 1910): desconoce a Porfirio Díaz e inicia la Revolución. Plan de Ayala (Zapata, 1911): desconoce a Madero y exige restitución de tierras agrarias. Plan de Guadalupe (Carranza, 1913): desconoce al usurpador Victoriano Huerta y organiza el Ejército Constitucionalista. Plan de Agua Prieta (Plutarco Elías Calles/Álvaro Obregón, 1920): desconoce a Carranza."
      },
      {
        "id": "ipn-hist-7-1-2",
        "codigo": "7.1.2",
        "titulo": "Evolución del partido oficial",
        "orden": 2,
        "status": "publicado",
        "descripcion": "Transformación institucional del partido gobernante durante el siglo XX: PNR (Partido Nacional Revolucionario fundado por Calles en 1929, fin del caudillismo) → PRM (Partido de la Revolución Mexicana reformado por Cárdenas en 1938, corporativismo de masas) → PRI (Partido Revolucionario Institucional renombrado por Miguel Alemán en 1946, consolidación del civilismo)."
      }
    ]
  },
  {
    "id": "ipn-hist-7-2",
    "codigo": "7.2",
    "titulo": "Historia de las revoluciones industriales, científicas y del IPN",
    "orden": 2,
    "status": "publicado",
    "children": [
      {
        "id": "ipn-hist-7-2-1",
        "codigo": "7.2.1",
        "titulo": "Cronología de las revoluciones industriales",
        "orden": 1,
        "status": "publicado",
        "descripcion": "Primera Revolución Industrial (fines del siglo XVIII): transición del trabajo artesanal al mecánico; máquina de vapor (James Watt); carbón mineral; industria textil y locomotoras. Segunda Revolución Industrial (fines del siglo XIX): electricidad (Edison, Tesla) y motor de combustión interna; automóvil; producción en masa (Fordismo/Taylorismo); acero y química pesada. Tercera Revolución Industrial (segunda mitad del siglo XX): automatización, informática, telecomunicaciones, energía nuclear, transistores y computadoras personales. Cuarta Revolución Industrial (siglo XXI): IoT, sistemas ciberfísicos, nube, big data, robótica avanzada e Inteligencia Artificial."
      },
      {
        "id": "ipn-hist-7-2-2",
        "codigo": "7.2.2",
        "titulo": "Contexto histórico y fundación del IPN",
        "orden": 2,
        "status": "publicado",
        "descripcion": "Fundación del Instituto Politécnico Nacional el 1 de enero de 1936, bajo Lázaro Cárdenas del Río, como plan estratégico derivado de la Revolución Mexicana. Objetivo: institución educativa técnica pública para hijos de obreros y campesinos, impulsar industrialización nacional, proveer personal para la nacionalización de industrias estratégicas (Expropiación Petrolera de 1938) y consolidar independencia científica y tecnológica. Personajes clave: Juan de Dios Bátiz (pilar organizador) y Gonzalo Vázquez Vela (SEP de la época)."
      }
    ]
  }
] as UnamTemarioTopic[];
