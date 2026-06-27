import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Español — Examen IPN. */
export const IPN_ESPANOL_TOPICS: UnamTemarioTopic[] = [
  {
    "id": "ipn-esp-5-1",
    "codigo": "5.1",
    "titulo": "Sintaxis y estructura oracional compleja",
    "orden": 1,
    "status": "publicado",
    "children": [
      {
        "id": "ipn-esp-5-1-1",
        "codigo": "5.1.1",
        "titulo": "Complementos del predicado",
        "orden": 1,
        "status": "publicado",
        "descripcion": "Análisis morfosintáctico riguroso para localizar e identificar en oraciones largas: Objeto Directo (sustituible por lo, la, los, las), Objeto Indirecto (sustituible por le, les), y todos los tipos de Complementos Circunstanciales (Tiempo, Lugar, Modo, Causa, Compañía, Instrumento, Finalidad)."
      },
      {
        "id": "ipn-esp-5-1-2",
        "codigo": "5.1.2",
        "titulo": "Oraciones compuestas subordinadas",
        "orden": 2,
        "status": "publicado",
        "descripcion": "Distinción analítica entre proposiciones principales y subordinadas Sustantivas (funcionan como sujeto u objeto directo), Adjetivas o de Relativo (modifican a un sustantivo antecedente utilizando que, el cual, cuyo) y Adverbiales (indican tiempo, modo, lugar o nexos lógicos como condicionales, concesivas o consecutivas)."
      }
    ]
  },
  {
    "id": "ipn-esp-5-2",
    "codigo": "5.2",
    "titulo": "Ortografía normativa y vicios de redacción",
    "orden": 2,
    "status": "publicado",
    "children": [
      {
        "id": "ipn-esp-5-2-1",
        "codigo": "5.2.1",
        "titulo": "Reglas de grafías homófonas en contexto",
        "orden": 1,
        "status": "publicado",
        "descripcion": "Reactivos donde debes rellenar espacios en blanco con la letra correcta basándote en el significado de la palabra (ej. tubo de cilindro con b vs. tuvo del verbo tener con v; acerbo áspero con b vs. acervo patrimonio con v; echo del verbo echar vs. hecho del verbo hacer)."
      },
      {
        "id": "ipn-esp-5-2-2",
        "codigo": "5.2.2",
        "titulo": "Solecismos y concordancia de colectivos",
        "orden": 2,
        "status": "publicado",
        "descripcion": "Detección de errores sintácticos complejos en oraciones con sujetos colectivos (ej. la forma incorrecta \"La mayoría de los estudiantes aprobaron\" frente a la correcta \"La mayoría de los estudiantes aprobó\", dado que el núcleo gramatical es el sustantivo singular mayoría). Corrección del uso inadecuado del gerundio de posterioridad (ej. incorrecto: \"Estudió toda la noche ingresando al IPN\"; correcto: \"Estudió toda la noche e ingresó al IPN\")."
      }
    ]
  }
] as UnamTemarioTopic[];
