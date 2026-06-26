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
  branch('fil-intro', '1', 'Introducción a la Filosofía y sus Ramas', 1, [
    branch('fil-intro-1-1', '1.1', 'Origen del Pensamiento Filosófico', 1, [
      leaf('fil-intro-1-1-1', '1.1.1', 'El paso del mito al logos', 'Nacimiento de la filosofía en Grecia (siglo VI a.C.): abandono del mito (deidades y fuerzas sobrenaturales) por el logos (razón, argumentación lógica y observación de la naturaleza).', 1),
      leaf('fil-intro-1-1-2', '1.1.2', 'Concepto y etimología', 'Philos (amor) + sophia (sabiduría) = «amor a la sabiduría». Ciencia de las primeras causas y principios de todas las cosas.', 2),
    ]),
    branch('fil-intro-1-2', '1.2', 'Disciplinas o Ramas de la Filosofía', 2, [
      leaf('fil-intro-1-2-1', '1.2.1', 'Ontología / Metafísica', 'Estudio del ser en cuanto ser, la existencia, la realidad, la sustancia y la naturaleza última de las cosas.', 1),
      leaf('fil-intro-1-2-2', '1.2.2', 'Epistemología / Gnoseología', 'Estudio del conocimiento científico (epistemología) y del conocimiento en general (gnoseología): origen, esencia, validez, límites y posibilidad (dogmatismo, escepticismo, racionalismo, empirismo).', 2),
      leaf('fil-intro-1-2-3', '1.2.3', 'Lógica', 'Formas y leyes del pensamiento correcto, estructura de argumentos válidos y métodos de demostración.', 3),
      leaf('fil-intro-1-2-4', '1.2.4', 'Ética', 'Reflexión sobre la moral, el deber, la virtud, el bien, el mal y el actuar humano libre y responsable.', 4),
      leaf('fil-intro-1-2-5', '1.2.5', 'Axiología', 'Filosofía de los valores: naturaleza, clasificación y juicios de valor (lo valioso, lo útil, lo sagrado).', 5),
      leaf('fil-intro-1-2-6', '1.2.6', 'Estética', 'Filosofía del arte: belleza, percepción sensible, creación artística y experiencia estética.', 6),
    ]),
  ]),
  branch('fil-logica', '2', 'Lógica y Argumentación', 2, [
    branch('fil-logica-2-1', '2.1', 'Estructuras del Pensamiento y Silogismos', 1, [
      leaf('fil-logica-2-1-1', '2.1.1', 'Las tres formas del pensamiento', 'Concepto (representación abstracta), juicio (afirmación o negación entre conceptos), razonamiento (conclusión a partir de premisas).', 1),
      leaf('fil-logica-2-1-2', '2.1.2', 'El Silogismo Categórico', 'Aristóteles: premisa mayor, premisa menor y conclusión. Término mayor (P, predicado de la conclusión), término menor (S, sujeto), término medio (M, conecta premisas y no aparece en la conclusión).', 2),
      leaf('fil-logica-2-1-3', '2.1.3', 'Reglas del Silogismo', 'De dos premisas particulares o negativas nada se sigue; el término medio debe ser universal al menos una vez; la conclusión sigue a la parte más débil.', 3),
    ]),
    branch('fil-logica-2-2', '2.2', 'Falacias (Formas Invalidadas de Argumentación)', 2, [
      leaf('fil-logica-2-2-1', '2.2.1', 'Definición', 'Argumentos que parecen válidos pero contienen error oculto en estructura o contenido lógico.', 1),
      leaf('fil-logica-2-2-2', '2.2.2', 'Falacias Informales (muy preguntadas UNAM)', 'Ad hominem (atacar a la persona). Ad baculum (fuerza o amenaza). Ad misericordiam (piedad). Ad verecundiam (autoridad fuera de su campo). Ad populum (mayoría). Ad ignorantiam (no demostrado = verdadero/falso).', 2),
    ]),
    branch('fil-logica-2-3', '2.3', 'Lógica Proposicional o Simbólica', 3, [
      leaf('fil-logica-2-3-1', '2.3.1', 'Conectivas Lógicas y Operadores', 'Negación (¬). Conjunción (∧, «p y q»). Disyunción (∨, «p o q»). Condicional (→, «si p entonces q»). Bicondicional (↔, «p si y solo si q»).', 1),
      leaf('fil-logica-2-3-2', '2.3.2', 'Tablas de Verdad', 'Tautología (todo verdadero), contradicción (todo falso), contingencia (mezcla de valores).', 2),
    ]),
  ]),
  branch('fil-etica', '3', 'Ética y Doctrinas Morales Históricas', 3, [
    branch('fil-etica-3-1', '3.1', 'Conceptos Fundamentales del Actuar Humano', 1, [
      leaf('fil-etica-3-1-1', '3.1.1', 'Diferencia entre Ética y Moral', 'Moral: normas y valores concretos de una sociedad. Ética: disciplina filosófica que analiza el fundamento racional de esos sistemas.', 1),
      leaf('fil-etica-3-1-2', '3.1.2', 'Autonomía y Heteronomía', 'Autonomía: el individuo dicta sus leyes morales según razón y conciencia. Heteronomía: actuar por normas externas (Estado, religión, sociedad) sin cuestionamiento propio.', 2),
    ]),
    branch('fil-etica-3-2', '3.2', 'Doctrinas Éticas de la Historia', 2, [
      leaf('fil-etica-3-2-1', '3.2.1', 'Éticas de la Antigüedad Clásica', 'Sócrates (intelectualismo moral: conocer el bien es actuar bien). Aristóteles (eudemonismo: felicidad por virtud y justo medio). Epicuro (hedonismo y ataraxia). Estoicismo (Zenón, Séneca, Marco Aurelio: virtud, razón cósmica, control de pasiones).', 1),
      leaf('fil-etica-3-2-2', '3.2.2', 'Éticas de la Modernidad y Contemporáneas', 'Kant (deontología, imperativo categórico, buena voluntad, deber por el deber). Utilitarismo (Bentham, Mill: mayor felicidad para el mayor número; consecuencialismo).', 2),
    ]),
  ]),
  branch('fil-estetica', '4', 'Estética y Filosofía del Arte', 4, [
    branch('fil-estetica-4-1', '4.1', 'Teorías de la Belleza y la Experiencia Estética', 1, [
      leaf('fil-estetica-4-1-1', '4.1.1', 'Concepto de Belleza en la Historia', 'Clásica (Platón, Aristóteles): armonía, proporción, mímesis. Moderna (Kant): juicio estético desinteresado, desvinculado de utilidad y moral.', 1),
      leaf('fil-estetica-4-1-2', '4.1.2', 'La Experiencia Estética', 'Conmoción o percepción sensible e intelectual ante obra de arte o naturaleza. Categorías: lo bello, sublime, trágico, cómico, grotesco y feo.', 2),
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

const outPath = path.join(__dirname, '../src/data/unam-temario-filosofia.ts');
const content = `import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Filosofía — Examen UNAM. */
export const UNAM_FILOSOFIA_TOPICS: UnamTemarioTopic[] = ${JSON.stringify(topics, null, 2)} as UnamTemarioTopic[];
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log('Written', outPath);
console.log('Blocks:', topics.length);
console.log('Leaf count:', countLeaves(topics));
