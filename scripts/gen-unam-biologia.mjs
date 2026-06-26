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
  branch('bio-celula', '1', 'La Célula', 1, [
    branch('bio-celula-1-1', '1.1', 'Teoría Celular', 1, [
      leaf('bio-celula-1-1-1', '1.1.1', 'Descubrimiento histórico', 'Robert Hooke (término célula, corcho), Anton van Leeuwenhoek (microbios vivos), Theodor Schwann (plantas de células), Matthias Schleiden (animales de células), Rudolf Virchow (toda célula de otra preexistente).', 1),
      leaf('bio-celula-1-1-2', '1.1.2', 'Postulados de la Teoría Celular', 'Anatómico: todos los seres vivos están formados por una o más células. Fisiológico: las funciones metabólicas ocurren dentro de las células. De origen: toda célula proviene de otra preexistente y contiene información genética hereditaria.', 2),
    ]),
    branch('bio-celula-1-2', '1.2', 'Composición Química de la Célula (Biomoléculas)', 2, [
      leaf('bio-celula-1-2-1', '1.2.1', 'Carbohidratos', 'CHO; energía y estructura. Monosacáridos (glucosa, fructosa, ribosa). Disacáridos (sacarosa, lactosa, maltosa). Polisacáridos: almidón (plantas), glucógeno (animales), celulosa (pared vegetal), quitina (hongos y artrópodos).', 1),
      leaf('bio-celula-1-2-2', '1.2.2', 'Lípidos', 'Hidrofóbicos; reserva energética, aislante, membranas. Triglicéridos, fosfolípidos (bicapa), esteroides (colesterol, hormonas sexuales).', 2),
      leaf('bio-celula-1-2-3', '1.2.3', 'Proteínas', 'CHON; aminoácidos unidos por enlaces peptídicos. Funciones: estructural, enzimática, inmunológica, transporte, hormonal. Aminoácidos esenciales y no esenciales.', 3),
      leaf('bio-celula-1-2-4', '1.2.4', 'Ácidos Nucleicos', 'Nucleótidos (fosfato, azúcar pentosa, base nitrogenada); almacenamiento y transmisión de información genética.', 4),
      leaf('bio-celula-1-2-5', '1.2.5', 'Vitaminas', 'Coenzimas esenciales. Hidrosolubles (B, C) y liposolubles (A, D, E, K). Deficiencias: escorbuto (C), raquitismo (D), ceguera nocturna (A), beriberi (B1).', 5),
    ]),
    branch('bio-celula-1-3', '1.3', 'Estructura y Función de los Organelos Celulares', 3, [
      leaf('bio-celula-1-3-1', '1.3.1', 'Membrana Celular', 'Modelo del mosaico fluido. Transporte pasivo (difusión, ósmosis: isotónica, hipotónica/turgencia-lisis, hipertónica/plasmólisis-crenación) y activo (bomba Na⁺/K⁺, endocitosis, exocitosis).', 1),
      leaf('bio-celula-1-3-2', '1.3.2', 'Citoplasma o Citosol', 'Matriz acuosa de reacciones metabólicas y soporte de organelos.', 2),
      leaf('bio-celula-1-3-3', '1.3.3', 'Núcleo y Nucleolo', 'Núcleo dirige actividades y almacena ADN; nucleolo sintetiza ARNr y ensambla ribosomas.', 3),
      leaf('bio-celula-1-3-4', '1.3.4', 'Ribosomas', 'Síntesis de proteínas (traducción del ARNm).', 4),
      leaf('bio-celula-1-3-5', '1.3.5', 'Retículo Endoplásmico', 'RER: ribosomas, proteínas de exportación. REL: lípidos y detoxificación.', 5),
      leaf('bio-celula-1-3-6', '1.3.6', 'Aparato de Golgi', 'Empaca, modifica y distribuye proteínas y lípidos; forma lisosomas.', 6),
      leaf('bio-celula-1-3-7', '1.3.7', 'Lisosomas', 'Enzimas hidrolíticas; digestión celular y autofagia.', 7),
      leaf('bio-celula-1-3-8', '1.3.8', 'Peroxisomas', 'Descomponen H₂O₂ y ácidos grasos (catalasa).', 8),
      leaf('bio-celula-1-3-9', '1.3.9', 'Vacuolas', 'Almacenamiento; grandes en plantas (turgencia).', 9),
      leaf('bio-celula-1-3-10', '1.3.10', 'Mitocondrias', 'Respiración aerobia y ATP; ADN propio.', 10),
      leaf('bio-celula-1-3-11', '1.3.11', 'Cloroplastos', 'Fotosíntesis en plantas y algas; clorofila en tilacoides/granas y estroma; ADN propio.', 11),
      leaf('bio-celula-1-3-12', '1.3.12', 'Citoesqueleto y Centriolos', 'Forma celular; centriolos organizan huso mitótico; cilios y flagelos.', 12),
    ]),
    branch('bio-celula-1-4', '1.4', 'Diferencias entre Células Procariotas y Eucariotas', 4, [
      leaf('bio-celula-1-4-1', '1.4.1', 'Célula Procariota', 'Pequeña; sin núcleo (ADN circular en nucleoide); sin organelos membranosos (ribosomas 70S); pared de peptidoglicano. Bacterias y arqueas.', 1),
      leaf('bio-celula-1-4-2', '1.4.2', 'Célula Eucariota', 'Grande; núcleo con membrana; ADN lineal en cromosomas; organelos membranosos. Protozoarios, hongos, plantas y animales.', 2),
    ]),
  ]),
  branch('bio-metabolismo', '2', 'Metabolismo Celular', 2, [
    branch('bio-metabolismo-2-1', '2.1', 'Conceptos Fundamentales', 1, [
      leaf('bio-metabolismo-2-1-1', '2.1.1', 'Reacciones Metabólicas', 'Anabolismo: síntesis, endergónico (fotosíntesis, proteínas, replicación ADN). Catabolismo: degradación, exergónico (glucólisis, Krebs, digestión).', 1),
      leaf('bio-metabolismo-2-1-2', '2.1.2', 'Enzimas', 'Biocatalizadoras; modelo llave-cerradura; desnaturalización por temperatura y pH extremos.', 2),
      leaf('bio-metabolismo-2-1-3', '2.1.3', 'El ATP', 'Moneda energética: adenina, ribosa, tres fosfatos. Hidrólisis → ADP + Pi libera energía.', 3),
    ]),
    branch('bio-metabolismo-2-2', '2.2', 'Fotosíntesis (Proceso Anabólico)', 2, [
      leaf('bio-metabolismo-2-2-1', '2.2.1', 'Definición', 'Luz → energía química (glucosa) desde CO₂ y H₂O, liberando O₂. 6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂.', 1),
      leaf('bio-metabolismo-2-2-2', '2.2.2', 'Fase Luminosa', 'En tilacoides: clorofila absorbe fotones; fotólisis del agua (O₂); ATP y NADPH.', 2),
      leaf('bio-metabolismo-2-2-3', '2.2.3', 'Fase Oscura (Ciclo de Calvin)', 'En estroma; fijación de CO₂ (Rubisco); usa ATP y NADPH; producto G3P/glucosa.', 3),
    ]),
    branch('bio-metabolismo-2-3', '2.3', 'Respiración Celular (Proceso Catabólico)', 3, [
      leaf('bio-metabolismo-2-3-1', '2.3.1', 'Glucólisis', 'Citoplasma; glucosa → 2 piruvatos; rendimiento neto 2 ATP y 2 NADH.', 1),
      leaf('bio-metabolismo-2-3-2', '2.3.2', 'Respiración Anaerobia (Fermentación)', 'Sin O₂; regenera NAD⁺. Láctica (músculo, yogur); alcohólica (levaduras, etanol + CO₂).', 2),
      leaf('bio-metabolismo-2-3-3', '2.3.3', 'Respiración Aerobia', 'Mitocondria: piruvato → acetil-CoA; Ciclo de Krebs (matriz); cadena de transporte de electrones y fosforilación oxidativa (crestas); O₂ aceptor final → H₂O.', 3),
      leaf('bio-metabolismo-2-3-4', '2.3.4', 'Balance Energético Aerobio Total', 'Aprox. 36–38 ATP por glucosa (vs. 2 ATP solo en anaerobia).', 4),
    ]),
  ]),
  branch('bio-reproduccion', '3', 'Reproducción y Ciclo Celular', 3, [
    branch('bio-reproduccion-3-1', '3.1', 'El Ciclo Celular', 1, [
      leaf('bio-reproduccion-3-1-1', '3.1.1', 'Interfase', '~90% del ciclo. G1: crecimiento y proteínas. S: replicación del ADN. G2: preparación para división.', 1),
      leaf('bio-reproduccion-3-1-2', '3.1.2', 'Fase M (División Celular)', 'Mitosis o meiosis seguidas de citocinesis.', 2),
    ]),
    branch('bio-reproduccion-3-2', '3.2', 'Mitosis (División de Células Somáticas)', 2, [
      leaf('bio-reproduccion-3-2-1', '3.2.1', 'Definición', 'Célula madre 2n → dos hijas idénticas 2n. Crecimiento, regeneración, reproducción asexual.', 1),
      leaf('bio-reproduccion-3-2-2', '3.2.2', 'Fases de la Mitosis', 'Profase (condensación, huso). Metafase (placa ecuatorial). Anafase (separación de cromátides). Telofase (dos núcleos).', 2),
      leaf('bio-reproduccion-3-2-3', '3.2.3', 'Citocinesis', 'Animales: estrangulación. Vegetales: placa celular (fragmoplasto).', 3),
    ]),
    branch('bio-reproduccion-3-3', '3.3', 'Meiosis (Gametogénesis)', 3, [
      leaf('bio-reproduccion-3-3-1', '3.3.1', 'Definición', 'En gónadas: 2n → cuatro gametos n genéticamente distintos.', 1),
      leaf('bio-reproduccion-3-3-2', '3.3.2', 'Etapas Críticas de la Meiosis', 'Meiosis I (reduccional): profase I con sinapsis y entrecruzamiento; metafase I pares homólogos; anafase I separa homólogos. Meiosis II (ecuacional): separa cromátides → 4 células n.', 2),
    ]),
    branch('bio-reproduccion-3-4', '3.4', 'Tipos de Reproducción en los Seres Vivos', 4, [
      leaf('bio-reproduccion-3-4-1', '3.4.1', 'Reproducción Asexual', 'Un progenitor; mitosis; clones. Fisión binaria, gemación, esporulación, fragmentación.', 1),
      leaf('bio-reproduccion-3-4-2', '3.4.2', 'Reproducción Sexual', 'Dos progenitores; meiosis y fecundación → cigoto 2n; alta variabilidad genética.', 2),
    ]),
  ]),
  branch('bio-genetica', '4', 'Genética y Biología Molecular', 4, [
    branch('bio-genetica-4-1', '4.1', 'Conceptos Mendelianos y Cruces Genéticos', 1, [
      leaf('bio-genetica-4-1-1', '4.1.1', 'Vocabulario fundamental', 'Gen, alelo, locus, dominante (A), recesivo (a), homocigoto, heterocigoto, genotipo, fenotipo.', 1),
      leaf('bio-genetica-4-1-2', '4.1.2', 'Leyes de Mendel', '1ª: F1 uniforme (Aa). 2ª: segregación F2 3:1 fenotípico, 1:2:1 genotípico (Punnett). 3ª: distribución independiente dihíbrido 9:3:3:1.', 2),
    ]),
    branch('bio-genetica-4-2', '4.2', 'Herencia Post-Mendeliana y Ligada al Sexo', 2, [
      leaf('bio-genetica-4-2-1', '4.2.1', 'Dominancia Incompleta', 'Heterocigoto fenotipo intermedio (flores rosas RR × BB).', 1),
      leaf('bio-genetica-4-2-2', '4.2.2', 'Codominancia', 'Ambos alelos se expresan (plumas moteadas).', 2),
      leaf('bio-genetica-4-2-3', '4.2.3', 'Alelos Múltiples', 'Grupos sanguíneos ABO (Iᴬ, Iᴮ codominantes; i recesivo).', 3),
      leaf('bio-genetica-4-2-4', '4.2.4', 'Herencia Ligada al Sexo', 'Genes en cromosoma X; hombres XY más vulnerables a recesivos. Daltonismo y hemofilia.', 4),
    ]),
    branch('bio-genetica-4-3', '4.3', 'Estructura del ADN y Dogma Central', 3, [
      leaf('bio-genetica-4-3-1', '4.3.1', 'Estructura del ADN', 'Watson, Crick, Franklin; doble hélice. Chargaff: A–T (2 puentes), C–G (3 puentes). Purinas (A,G) y pirimidinas (C,T).', 1),
      leaf('bio-genetica-4-3-2', '4.3.2', 'Estructura del ARN', 'Monocatenario; ribosa; uracilo. ARNm, ARNt (anticodón), ARNr.', 2),
      leaf('bio-genetica-4-3-3', '4.3.3', 'El Dogma Central', 'Replicación (ADN→ADN, ADN polimerasa). Transcripción (ADN→ARNm, ARN polimerasa). Traducción (ARNm→proteína en ribosoma; codones; inicio AUG; parada UAA/UAG/UGA).', 3),
    ]),
    branch('bio-genetica-4-4', '4.4', 'Mutaciones', 4, [
      leaf('bio-genetica-4-4-1', '4.4.1', 'Definición', 'Cambio permanente en secuencia de ADN; espontáneas o inducidas (UV, rayos X, químicos).', 1),
      leaf('bio-genetica-4-4-2', '4.4.2', 'Clasificación', 'Génicas/puntuales. Cromosómicas estructurales. Genómicas: aneuploidías (Down 21, Turner 45X0, Klinefelter 47XXY).', 2),
    ]),
  ]),
  branch('bio-evolucion', '5', 'Evolución y Diversidad', 5, [
    branch('bio-evolucion-5-1', '5.1', 'Teorías del Origen de la Vida', 1, [
      leaf('bio-evolucion-5-1-1', '5.1.1', 'Creacionismo / Fijismo', 'Vida creada divinamente; especies inmutables.', 1),
      leaf('bio-evolucion-5-1-2', '5.1.2', 'Generación Espontánea', 'Refutada por Pasteur (matraces de cuello de cisne).', 2),
      leaf('bio-evolucion-5-1-3', '5.1.3', 'Panspermia (Arrhenius)', 'Vida en esporas de meteoritos.', 3),
      leaf('bio-evolucion-5-1-4', '5.1.4', 'Teoría Quimiosintética (Oparin y Haldane)', 'Evolución química en atmósfera reductora; sopa primigenia; coacervados. Miller y Urey (1953).', 4),
      leaf('bio-evolucion-5-1-5', '5.1.5', 'Teoría Endosimbiótica (Margulis)', 'Mitocondrias y cloroplastos como bacterias simbiontes; ADN circular, ribosomas 70S, doble membrana.', 5),
    ]),
    branch('bio-evolucion-5-2', '5.2', 'Teorías Evolutivas', 2, [
      leaf('bio-evolucion-5-2-1', '5.2.1', 'Lamarckismo', 'Uso y desuso; herencia de caracteres adquiridos (jirafas — falso).', 1),
      leaf('bio-evolucion-5-2-2', '5.2.2', 'Darwinismo', 'Variabilidad, sobreproducción, selección natural, reproducción diferencial (Darwin y Wallace, 1859).', 2),
      leaf('bio-evolucion-5-2-3', '5.2.3', 'Teoría Sintética (Neodarwinismo)', 'Darwin + Mendel + genética de poblaciones; mutación, recombinación, deriva génica, selección natural.', 3),
    ]),
    branch('bio-evolucion-5-3', '5.3', 'Evidencias de la Evolución', 3, [
      leaf('bio-evolucion-5-3-1', '5.3.1', 'Fósiles', 'Paleontología y líneas filogenéticas.', 1),
      leaf('bio-evolucion-5-3-2', '5.3.2', 'Anatomía Comparada', 'Homólogos (brazo humano, aleta ballena — divergente). Análogos (ala insecto y ave — convergente). Vestigiales (apéndice, coxis).', 2),
      leaf('bio-evolucion-5-3-3', '5.3.3', 'Embriología Comparada', 'Hendiduras branquiales y cola en embriones de vertebrados.', 3),
      leaf('bio-evolucion-5-3-4', '5.3.4', 'Bioquímica y Genética Comparada', 'Similitud de ADN, ARN y proteínas (citocromo c) indica parentesco.', 4),
    ]),
    branch('bio-evolucion-5-4', '5.4', 'Taxonomía y los Reinos de la Naturaleza', 4, [
      leaf('bio-evolucion-5-4-1', '5.4.1', 'Taxonomía', 'Linneo: nomenclatura binomial. Categorías: dominio, reino, filo, clase, orden, familia, género, especie.', 1),
      leaf('bio-evolucion-5-4-2', '5.4.2', 'Clasificación de los 5 Reinos (Whittaker)', 'Monera, Protista, Fungi, Plantae, Animalia.', 2),
      leaf('bio-evolucion-5-4-3', '5.4.3', 'Los Tres Dominios (Woese)', 'Bacteria, Archaea, Eukarya (ARNr 16S).', 3),
    ]),
  ]),
  branch('bio-ecologia', '6', 'Ecología', 6, [
    branch('bio-ecologia-6-1', '6.1', 'Estructura y Niveles de Organización Ecológica', 1, [
      leaf('bio-ecologia-6-1-1', '6.1.1', 'Niveles de organización del ambiente', 'Individuo, población, comunidad/biocenosis, ecosistema, bioma, biosfera.', 1),
      leaf('bio-ecologia-6-1-2', '6.1.2', 'Componentes del Ecosistema', 'Bióticos: productores, consumidores, descomponedores. Abióticos: luz, agua, temperatura, suelo, pH.', 2),
    ]),
    branch('bio-ecologia-6-2', '6.2', 'Dinámica de las Poblaciones e Interacciones', 2, [
      leaf('bio-ecologia-6-2-1', '6.2.1', 'Propiedades de las poblaciones', 'Densidad, natalidad, mortalidad, distribución; crecimiento exponencial (J) y logístico (S).', 1),
      leaf('bio-ecologia-6-2-2', '6.2.2', 'Interacciones interespecíficas', 'Depredación (+/−), parasitismo (+/−), competencia (−/−), mutualismo (+/+), protocooperación (+/+), comensalismo (+/0).', 2),
    ]),
    branch('bio-ecologia-6-3', '6.3', 'Flujo de Energía y Ciclos Biogeoquímicos', 3, [
      leaf('bio-ecologia-6-3-1', '6.3.1', 'Pirámides Tróficas y Flujo Energético', 'Energía unidireccional; ley del 10% entre niveles tróficos; máximo 4–5 niveles.', 1),
      leaf('bio-ecologia-6-3-2', '6.3.2', 'Ciclos Biogeoquímicos', 'Carbono (fotosíntesis/respiración/combustión). Nitrógeno: fijación, nitrificación, asimilación, amonificación, desnitrificación. Oxígeno. Fósforo y azufre (sedimentarios).', 2),
    ]),
    branch('bio-ecologia-6-4', '6.4', 'Deterioro Ambiental y Conservación', 4, [
      leaf('bio-ecologia-6-4-1', '6.4.1', 'Contaminación Atmosférica y Cambio Global', 'Combustibles fósiles; efecto invernadero, lluvia ácida, inversión térmica.', 1),
      leaf('bio-ecologia-6-4-2', '6.4.2', 'Pérdida de la Biodiversidad', 'Deforestación, fragmentación, especies invasoras, sobreexplotación.', 2),
      leaf('bio-ecologia-6-4-3', '6.4.3', 'Desarrollo Sustentable', 'Satisfacer necesidades actuales sin comprometer a las generaciones futuras.', 3),
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

const outPath = path.join(__dirname, '../src/data/unam-temario-biologia.ts');
const content = `import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Biología — Examen UNAM. */
export const UNAM_BIOLOGIA_TOPICS: UnamTemarioTopic[] = ${JSON.stringify(topics, null, 2)} as UnamTemarioTopic[];
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log('Written', outPath);
console.log('Blocks:', topics.length);
console.log('Leaf count:', countLeaves(topics));
