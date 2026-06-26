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
  branch('lit-texto', '1', 'El Texto Literario', 1, [
    branch('lit-texto-1-1', '1.1', 'Concepto de Literatura y Propiedades del Texto', 1, [
      leaf('lit-texto-1-1-1', '1.1.1', 'Definición', 'La literatura como manifestación artística que utiliza la palabra escrita o hablada como medio de expresión.', 1),
      leaf('lit-texto-1-1-2', '1.1.2', 'Lenguaje denotativo y connotativo', 'Denotativo: significado literal y de diccionario (textos científicos o informativos). Connotativo: significado figurado, poético o polisémico; evoca sentimientos e imágenes.', 2),
    ]),
    branch('lit-texto-1-2', '1.2', 'Los Géneros Literarios', 2, [
      leaf('lit-texto-1-2-1', '1.2.1', 'Género Épico o Narrativo', 'Relata acontecimientos en tiempo y espacio; tradicionalmente en prosa. Subgéneros: epopeya, mito, leyenda, cantar de gesta, cuento (breve, pocos personajes) y novela (extensa, múltiples tramas).', 1),
      leaf('lit-texto-1-2-2', '1.2.2', 'Género Lírico (Poesía)', 'Expresa el mundo interior del autor; subjetividad; verso y recursos estilísticos.', 2),
      leaf('lit-texto-1-2-3', '1.2.3', 'Género Dramático (Teatro)', 'Para representación escénica; sin narrador; diálogos, monólogos y acotaciones. Tragedia (final funesto), comedia (humor, final feliz), drama (equilibrio serio-cómico).', 3),
    ]),
  ]),
  branch('lit-lirico', '2', 'Análisis del Texto Lírico (El Poema)', 2, [
    branch('lit-lirico-2-1', '2.1', 'Elementos Formales del Verso', 1, [
      leaf('lit-lirico-2-1-1', '2.1.1', 'El Metro o Métrica', 'Conteo de las sílabas poéticas de un verso.', 1),
      leaf('lit-lirico-2-1-2', '2.1.2', 'Licencias métricas', 'Sinalefa: vocal final + vocal inicial = una sílaba (ej. «mutuo_amor» = 3 sílabas). Ley del acento final: aguda +1, grave igual, esdrújula −1.', 2),
      leaf('lit-lirico-2-1-3', '2.1.3', 'La Rima', 'Igualdad de sonidos desde la última vocal tónica. Consonante (vocales y consonantes; viento/siento). Asonante (solo vocales; cama/casa).', 3),
    ]),
    branch('lit-lirico-2-2', '2.2', 'Figuras Retóricas, Literarias o Tropos', 2, [
      leaf('lit-lirico-2-2-1', '2.2.1', 'Metáfora', 'Sustitución por semejanza sin nexo explícito (ej. «las perlas de tu boca» = dientes).', 1),
      leaf('lit-lirico-2-2-2', '2.2.2', 'Comparación o Símil', 'Semejanza explícita con «como», «cual» o «parece» (ej. «Tus ojos son como el mar»).', 2),
      leaf('lit-lirico-2-2-3', '2.2.3', 'Hipérbole', 'Exageración desproporcionada (ej. «Te lloré un río»).', 3),
      leaf('lit-lirico-2-2-4', '2.2.4', 'Personificación o Prosopopeya', 'Cualidades humanas a objetos o animales (ej. «El viento susurraba»).', 4),
      leaf('lit-lirico-2-2-5', '2.2.5', 'Hipérbaton', 'Alteración del orden sintáctico para ritmo o rima (ej. «Volverán las oscuras golondrinas…»).', 5),
      leaf('lit-lirico-2-2-6', '2.2.6', 'Epíteto', 'Adjetivo que resalta cualidad obvia (ej. «la blanca nieve», «el fuego ardiente»).', 6),
      leaf('lit-lirico-2-2-7', '2.2.7', 'Paradoja', 'Ideas opuestas que encierran verdad (ej. «Vivo sin vivir en mí…» de Santa Teresa).', 7),
      leaf('lit-lirico-2-2-8', '2.2.8', 'Aliteración', 'Repetición de un mismo sonido (ej. «El ala aleve del leve abanico»).', 8),
    ]),
  ]),
  branch('lit-corrientes', '3', 'Corrientes Literarias (Historia de la Literatura)', 3, [
    branch('lit-corrientes-3-1', '3.1', 'Romanticismo (Primera mitad del siglo XIX)', 1, [
      leaf('lit-corrientes-3-1-1', '3.1.1', 'Características', 'Rebelión al neoclasicismo; culto al yo; sentimiento sobre razón; libertad, nacionalismo, paisajes lúgubres y muerte.', 1),
      leaf('lit-corrientes-3-1-2', '3.1.2', 'Autores y obras', 'Goethe (Las cuitas del joven Werther), Bécquer (Rimas y Leyendas), Mary Shelley (Frankenstein), Edgar Allan Poe.', 2),
    ]),
    branch('lit-corrientes-3-2', '3.2', 'Realismo y Naturalismo (Segunda mitad del siglo XIX)', 2, [
      leaf('lit-corrientes-3-2-1', '3.2.1', 'Características', 'Retrato objetivo de la realidad social; burguesía y obreros; crítica social. Naturalismo: herencia y entorno determinan al ser humano.', 1),
      leaf('lit-corrientes-3-2-2', '3.2.2', 'Autores y obras', 'Pérez Galdós (Marianela), Balzac (Papá Goriot), Flaubert (Madame Bovary), Dickens (Oliver Twist), Dostoyevski (Crimen y castigo), Ángel de Campo «Micrós» (La Rumba, México).', 2),
    ]),
    branch('lit-corrientes-3-3', '3.3', 'Modernismo (Fines del XIX y principios del XX)', 3, [
      leaf('lit-corrientes-3-3-1', '3.3.1', 'Características', 'Primera corriente hispanoamericana que influyó en España; preciosismo, musicalidad, lo exótico, cisnes, princesas, color azul; arte por el arte.', 1),
      leaf('lit-corrientes-3-3-2', '3.3.2', 'Autores y obras', 'Rubén Darío (Azul…, Prosas profanas), Amado Nervo (La amada inmóvil), Gutiérrez Nájera, José Martí.', 2),
    ]),
    branch('lit-corrientes-3-4', '3.4', 'Vanguardismo (Primera mitad del siglo XX)', 4, [
      leaf('lit-corrientes-3-4-1', '3.4.1', 'Características', 'Ruptura tras la Primera Guerra Mundial; experimentación formal; destrucción de métrica clásica; inconsciente y caligramas.', 1),
      leaf('lit-corrientes-3-4-2', '3.4.2', 'Principales Ismos de Vanguardia', 'Surrealismo (sueños, psicoanálisis), dadaísmo (absurdo), futurismo (máquinas, velocidad), cubismo literario.', 2),
      leaf('lit-corrientes-3-4-3', '3.4.3', 'Autores y obras', 'André Breton (surrealismo), Marinetti (futurismo), Pablo Neruda (Veinte poemas…), Federico García Lorca (Bodas de sangre).', 3),
    ]),
    branch('lit-corrientes-3-5', '3.5', 'Literatura Contemporánea y el Boom Latinoamericano', 5, [
      leaf('lit-corrientes-3-5-1', '3.5.1', 'Características del Boom', 'Años 60–70; reconocimiento mundial. Realismo mágico (lo fantástico en lo cotidiano); rupturas temporales en la narración.', 1),
      leaf('lit-corrientes-3-5-2', '3.5.2', 'Autores y obras imprescindibles de Hispanoamérica', 'García Márquez (Cien años de soledad), Rulfo (Pedro Páramo, El Llano en llamas), Fuentes (Aura), Cortázar (Rayuela), Borges (El Aleph, Ficciones), Vargas Llosa (La ciudad y los perros), Octavio Paz (El laberinto de la soledad).', 2),
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

const outPath = path.join(__dirname, '../src/data/unam-temario-literatura.ts');
const content = `import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Literatura — Examen UNAM. */
export const UNAM_LITERATURA_TOPICS: UnamTemarioTopic[] = ${JSON.stringify(topics, null, 2)} as UnamTemarioTopic[];
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log('Written', outPath);
console.log('Blocks:', topics.length);
console.log('Leaf count:', countLeaves(topics));
