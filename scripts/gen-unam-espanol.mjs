import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = 'publicado';

function leaf(id, codigo, titulo, descripcion, orden) {
  return { id, codigo, titulo, descripcion, orden, status: pub };
}
function branch(id, codigo, titulo, orden, children, extra = {}) {
  return { id, codigo, titulo, orden, status: pub, children, ...extra };
}

const topics = [
  branch('esp-funciones', '1', 'Funciones de la Lengua', 1, [
    branch('esp-funciones-1-1', '1.1', 'Identificación de las Funciones en Textos', 1, [
      leaf('esp-funciones-1-1-1', '1.1.1', 'Función Referencial o Informativa', 'Transmitir conocimientos, datos o hechos de manera objetiva, sin juicios de valor. Presente en noticias, textos científicos, monografías y manuales escolares.', 1),
      leaf('esp-funciones-1-1-2', '1.1.2', 'Función Apelativa o Conativa', 'Convencer, persuadir o influir en la conducta del receptor. Característica de discursos políticos, anuncios publicitarios, artículos de opinión y órdenes directas.', 2),
      leaf('esp-funciones-1-1-3', '1.1.3', 'Función Poética o Estética', 'Se centra en el mensaje mismo; belleza formal y expresividad mediante recursos literarios. Poemas, novelas, refranes y juegos de palabras.', 3),
      leaf('esp-funciones-1-1-4', '1.1.4', 'Función Emotiva, Sintomática o Expresiva', 'El emisor manifiesta sentimientos, emociones o estados de ánimo de manera subjetiva. Cartas personales, diarios, interjecciones y poemas líricos.', 4),
      leaf('esp-funciones-1-1-5', '1.1.5', 'Función Fática o de Contacto', 'Iniciar, prolongar, interrumpir o verificar que el canal de comunicación funciona (ej. «¿Bueno?», «Disculpe», «¿Me escucha?»).', 5),
      leaf('esp-funciones-1-1-6', '1.1.6', 'Función Metalingüística', 'La lengua habla de la propia lengua; aclara significados o reglas gramaticales (ej. «La palabra casa es un sustantivo»). Diccionarios y clases de gramática.', 6),
    ]),
  ]),
  branch('esp-tipologia', '2', 'Formas de Expresión de la Lengua (Tipología Textual)', 2, [
    branch('esp-tipologia-2-1', '2.1', 'Características y Elementos del Texto', 1, [
      leaf('esp-tipologia-2-1-1', '2.1.1', 'Texto Descriptivo', 'Responde «¿cómo es?». Detalla cualidades y características con adjetivos calificativos.', 1),
      leaf('esp-tipologia-2-1-2', '2.1.2', 'Texto Narrativo', 'Responde «¿qué pasa?». Secuencia de hechos en tiempo y espacio. Estructura: planteamiento, nudo/clímax y desenlace. Narrador, personajes, tiempo y espacio.', 2),
      leaf('esp-tipologia-2-1-3', '2.1.3', 'Texto Argumentativo', 'Defiende una tesis con argumentos y contrargumentos. Introducción, desarrollo y conclusión.', 3),
      leaf('esp-tipologia-2-1-4', '2.1.4', 'Texto Expositivo', 'Explica e informa de manera clara, ordenada y objetiva, sin opiniones personales. Lenguaje formal, tecnicismos y definiciones.', 4),
    ]),
  ]),
  branch('esp-lectura', '3', 'Comprensión de Lectura', 3, [
    branch('esp-lectura-3-1', '3.1', 'Análisis de Estructuras Textuales', 1, [
      leaf('esp-lectura-3-1-1', '3.1.1', 'Tema central', 'Idea general del texto; responde «¿de qué trata el texto?».', 1),
      leaf('esp-lectura-3-1-2', '3.1.2', 'Ideas Principales', 'Información esencial e indispensable; sin ellas el texto pierde sentido.', 2),
      leaf('esp-lectura-3-1-3', '3.1.3', 'Ideas Secundarias', 'Amplían, ejemplifican o complementan la idea principal de un párrafo.', 3),
      leaf('esp-lectura-3-1-4', '3.1.4', 'Inferencias', 'Conclusiones lógicas implícitas que el lector deduce de datos explícitos.', 4),
      leaf('esp-lectura-3-1-5', '3.1.5', 'Vocabulario en contexto', 'Significado de palabras según el entorno del texto; polisemia, sinónimos y antónimos contextuales.', 5),
    ]),
  ]),
  branch('esp-gramatica', '4', 'Gramática y Redacción', 4, [
    branch('esp-gramatica-4-1', '4.1', 'La Oración Gramatical', 1, [
      leaf('esp-gramatica-4-1-1', '4.1.1', 'El Sujeto', 'Quien realiza la acción o de quien se dice algo. Expreso (Juan corre) o tácito/implícito (Corrimos → nosotros). Modificador directo (artículos, adjetivos) e indirecto (preposiciones, aposición).', 1),
      leaf('esp-gramatica-4-1-2', '4.1.2', 'El Predicado', 'Lo que se dice del sujeto; núcleo verbal. Objeto directo (¿qué?; lo/la/los/las). Objeto indirecto (¿a quién?/¿para quién?; le/les). Circunstanciales: tiempo, lugar, modo, causa, finalidad.', 2),
    ]),
    branch('esp-gramatica-4-2', '4.2', 'Estructura Oracional Compleja', 2, [
      leaf('esp-gramatica-4-2-1', '4.2.1', 'Oraciones Simples', 'Un solo verbo conjugado (un predicado).', 1),
      leaf('esp-gramatica-4-2-2', '4.2.2', 'Oraciones Compuestas', 'Dos o más verbos conjugados. Coordinadas (nexos: y, o, pero…). Subordinadas (sustantivas, adjetivas, adverbiales). Yuxtapuestas (solo puntuación).', 2),
    ]),
    branch('esp-gramatica-4-3', '4.3', 'Categorías Gramaticales y Accidentes', 3, [
      leaf('esp-gramatica-4-3-1', '4.3.1', 'Sustantivo, Adjetivo y Artículo', 'Clasificación y concordancia en género y número.', 1),
      leaf('esp-gramatica-4-3-2', '4.3.2', 'El Verbo', 'Tiempo, modo (indicativo, subjuntivo, imperativo), persona y número. Verboides: infinitivo, gerundio, participio.', 2),
      leaf('esp-gramatica-4-3-3', '4.3.3', 'Nexos Gramaticales', 'Preposiciones (a, ante, bajo, con, de, en, para, por, sin, sobre, tras, etc.) y conjunciones. Conectores de causa, consecuencia y oposición.', 3),
    ]),
    branch('esp-gramatica-4-4', '4.4', 'Vicios de la Redacción (Solecismos y Cacofonías)', 4, [
      leaf('esp-gramatica-4-4-1', '4.4.1', 'Pleonasmo o Redundancia', 'Repetición innecesaria (ej. «subir para arriba», «a mí personalmente»).', 1),
      leaf('esp-gramatica-4-4-2', '4.4.2', 'Anfibología', 'Doble sentido o ambigüedad (ej. «Se vende ropa para niños de lana»).', 2),
      leaf('esp-gramatica-4-4-3', '4.4.3', 'Cacofonía', 'Repetición desagradable de sonidos (ej. «Cuando estuviste viste la estatua»).', 3),
      leaf('esp-gramatica-4-4-4', '4.4.4', 'Solecismo', 'Error sintáctico o preposicional (ej. «de acuerdo a» por «de acuerdo con»; «hubieron» por «hubo»).', 4),
    ]),
  ]),
  branch('esp-ortografia', '5', 'Puntuación y Ortografía', 5, [
    branch('esp-ortografia-5-1', '5.1', 'Reglas de Acentuación Gráfica', 1, [
      leaf('esp-ortografia-5-1-1', '5.1.1', 'Clasificación de palabras por su sílaba tónica', 'Agudas: tilde si terminan en vocal, N o S. Graves: tilde si NO terminan en vocal, N ni S. Esdrújulas y sobresdrújulas: siempre llevan tilde.', 1),
      leaf('esp-ortografia-5-1-2', '5.1.2', 'Diptongos, Triptongos e Hiatos', 'Acentuación con vocales abiertas (A, E, O) y cerradas (I, U). Hiato acentual (maría, tío, grúa).', 2),
      leaf('esp-ortografia-5-1-3', '5.1.3', 'Acento Diacrítico', 'Diferencia palabras homógrafas: él/el, tú/tu, sí/si, té/te.', 3),
    ]),
    branch('esp-ortografia-5-2', '5.2', 'Uso de los Signos de Puntuación', 2, [
      leaf('esp-ortografia-5-2-1', '5.2.1', 'El Punto', 'Punto y seguido (oraciones en párrafo), punto y aparte (párrafos), punto final.', 1),
      leaf('esp-ortografia-5-2-2', '5.2.2', 'La Coma', 'Enumeraciones, coma vocativa, coma elíptica e incisos explicativos.', 2),
      leaf('esp-ortografia-5-2-3', '5.2.3', 'El Punto y Coma', 'Proposiciones largas con comas internas; antes de nexos adversativos largos.', 3),
      leaf('esp-ortografia-5-2-4', '5.2.4', 'Los Dos Puntos', 'Antes de cita textual, enumeración anunciada o relación causa-efecto.', 4),
    ]),
    branch('esp-ortografia-5-3', '5.3', 'Grafías Dudosas', 3, [
      leaf('esp-ortografia-5-3-1', '5.3.1', 'Reglas de letras homófonas o conflictivas', 'Uso correcto de B/V, C/S/Z, G/J, H, X, Y/LL.', 1),
    ]),
  ]),
];

function countLeaves(list) {
  let n = 0;
  for (const t of list) {
    if (t.children?.length) n += countLeaves(t.children);
    else n++;
  }
  return n;
}

const outPath = path.join(__dirname, '../src/data/unam-temario-espanol.ts');
const content = `import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Español — Examen UNAM. */
export const UNAM_ESPANOL_TOPICS: UnamTemarioTopic[] = ${JSON.stringify(topics, null, 2)} as UnamTemarioTopic[];
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log('Written', outPath);
console.log('Blocks:', topics.length);
console.log('Leaf count:', countLeaves(topics));
