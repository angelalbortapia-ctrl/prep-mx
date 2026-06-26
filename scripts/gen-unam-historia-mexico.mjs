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

/** Temario ultra-detallado de Historia de México — Examen UNAM. */
const rawMexicoTopics = [
  branch('his-mex-prehispanico', '8', 'México Prehispánico y la Época Colonial', 8, [
    branch('his-mex-prehispanico-8-1', '8.1', 'Áreas Culturales y Horizontes de Mesoamérica', 1, [
      leaf('his-mex-prehispanico-8-1-1', '8.1.1', 'Aridoamérica, Oasisamérica y Mesoamérica', 'Diferenciación geográfica y ecológica; el sedentarismo y la agricultura como base de Mesoamérica frente al nomadismo de Aridoamérica.', 1),
      leaf('his-mex-prehispanico-8-1-2', '8.1.2', 'Horizontes Culturales', 'Preclásico (aprox. 2500 a.C.–200 d.C.): cultura Olmeca («Cultura Madre»), San Lorenzo, La Venta, Tres Zapotes; cabezas colosales, culto al jaguar. Clásico (aprox. 200–900 d.C.): Teotihuacán (pirámides del Sol y la Luna), cultura Maya (cero, astronomía, Palenque, Tikal), cultura Zapoteca (Monte Albán). Posclásico (aprox. 900–1521 d.C.): Tolteca (Tula, Atlantes), Mixteca, Imperio Mexica (México-Tenochtitlan 1325, Triple Alianza, chinampas, tributación militar).', 2),
    ]),
    branch('his-mex-prehispanico-8-2', '8.2', 'La Conquista de México', 2, [
      leaf('his-mex-prehispanico-8-2-1', '8.2.1', 'Expediciones previas', 'Rutas de Francisco Hernández de Córdoba (1517) y Juan de Grijalva (1518).', 1),
      leaf('his-mex-prehispanico-8-2-2', '8.2.2', 'El proceso de conquista (1519-1521)', 'Llegada de Hernán Cortés; papel de la Malinche y Jerónimo de Aguilar; alianzas con tlaxcaltecas y totonacas; recepción de Moctezuma II; Matanza del Templo Mayor y la «Noche Triste»; epidemia de viruela; captura de Cuauhtémoc (13 de agosto de 1521).', 2),
    ]),
    branch('his-mex-prehispanico-8-3', '8.3', 'El Virreinato de la Nueva España (Siglos XVI-XVIII)', 3, [
      leaf('his-mex-prehispanico-8-3-1', '8.3.1', 'Organización Política', 'El Rey de España, el Real y Supremo Consejo de Indias, la Casa de Contratación de Sevilla, el Virrey y la Real Audiencia.', 1),
      leaf('his-mex-prehispanico-8-3-2', '8.3.2', 'Estructura Económica', 'Minería (plata, Bajío, Real del Monte), agricultura, encomienda, repartimiento, mercedes reales; monopolio comercial (Veracruz, Acapulco — Nao de China).', 2),
      leaf('his-mex-prehispanico-8-3-3', '8.3.3', 'Sociedad de Castas', 'Peninsulares, criollos, mestizos, indígenas y afrodescendientes.', 3),
      leaf('his-mex-prehispanico-8-3-4', '8.3.4', 'Las Reformas Borbónicas', 'Carlos III: Intendencias, expulsión de jesuitas (1767), aumento de impuestos y minación de privilegios eclesiásticos y criollos.', 4),
    ]),
  ]),
  branch('his-mex-independencia', '9', 'El Movimiento de Independencia (1810-1821)', 9, [
    branch('his-mex-independencia-9-1', '9.1', 'Causas del Movimiento', 1, [
      leaf('his-mex-independencia-9-1-1', '9.1.1', 'Causas Externas', 'Ilustración, Independencia de las Trece Colonias (1776), Revolución Francesa (1789); detonante: Invasión Napoleónica a España (1808) y abdicación de Fernando VII.', 1),
      leaf('his-mex-independencia-9-1-2', '9.1.2', 'Causas Internas', 'Descontento criollo por Reformas Borbónicas, explotación indígena y de castas, crisis agrícolas, nacionalismo guadalupano; conspiraciones de Valladolid (1809) y Querétaro (1810).', 2),
    ]),
    branch('his-mex-independencia-9-2', '9.2', 'Etapas de la Guerra', 2, [
      leaf('his-mex-independencia-9-2-1', '9.2.1', 'Inicio (1810-1811)', 'Grito de Dolores (16 de septiembre de 1810) de Miguel Hidalgo; Alhóndiga de Granaditas, Monte de las Cruces, abolición de esclavitud en Guadalajara, Puente de Calderón; fusilamiento de Hidalgo, Allende y Aldama en Chihuahua.', 1),
      leaf('his-mex-independencia-9-2-2', '9.2.2', 'Organización (1811-1815)', 'José María Morelos: sitio de Cuautla; Sentimientos de la Nación (1813); Constitución de Apatzingán (1814); fusilamiento de Morelos en San Cristóbal Ecatepec.', 2),
      leaf('his-mex-independencia-9-2-3', '9.2.3', 'Resistencia (1815-1820)', 'Guerrillas de Vicente Guerrero, Guadalupe Victoria y el arribo de Francisco Xavier Mina.', 3),
      leaf('his-mex-independencia-9-2-4', '9.2.4', 'Consumación (1821)', 'Revolución Liberal de Riego; Conspiración de la Profesa; Abrazo de Acatempam (Iturbide y Guerrero); Plan de Iguala (Tres Garantías); Tratados de Córdoba; entrada del Ejército Trigarante (27 de septiembre de 1821).', 4),
    ]),
  ]),
  branch('his-mex-estado', '10', 'Construcción del Estado Mexicano (1821-1854)', 10, [
    branch('his-mex-estado-10-1', '10.1', 'Primeros Proyectos de Nación', 1, [
      leaf('his-mex-estado-10-1-1', '10.1.1', 'El Primer Imperio Mexicano (1822-1823)', 'Coronación de Agustín de Iturbide; crisis económica; Plan de Casa Mata de Santa Anna.', 1),
      leaf('his-mex-estado-10-1-2', '10.1.2', 'La Primera República Federal (1824)', 'Constitución de 1824; Guadalupe Victoria primer presidente; federalistas (yorkina) vs. centralistas (escocesa).', 2),
    ]),
    branch('his-mex-estado-10-2', '10.2', 'Conflictos Internacionales y Pérdida de Territorio', 2, [
      leaf('his-mex-estado-10-2-1', '10.2.1', 'Intentos de Reconquista Española', 'Derrota de Isidro Barradas en Tampico (1829) por Santa Anna.', 1),
      leaf('his-mex-estado-10-2-2', '10.2.2', 'Independencia de Texas (1836)', 'República Centralista (Siete Leyes); San Jacinto; Tratados de Velasco.', 2),
      leaf('his-mex-estado-10-2-3', '10.2.3', 'Primera Intervención Francesa («Guerra de los Pasteles»)', 'Reclamaciones económicas de ciudadanos franceses (1838-1839); mediación británica.', 3),
      leaf('his-mex-estado-10-2-4', '10.2.4', 'Intervención Norteamericana (1846-1848)', 'Anexión de Texas y disputa Río Nueces vs. Río Bravo; Chapultepec; Tratado de Guadalupe Hidalgo (1848): pérdida de más de la mitad del territorio.', 4),
    ]),
    branch('his-mex-estado-10-3', '10.3', 'La Dictadura de Santa Anna (El Santanismo)', 3, [
      leaf('his-mex-estado-10-3-1', '10.3.1', 'Su último gobierno (1853-1855)', '«Su Alteza Serenísima»; venta de La Mesilla; Plan de Ayutla (1854) de Juan Álvarez e Ignacio Comonfort.', 1),
    ]),
  ]),
  branch('his-mex-reforma', '11', 'La Reforma Liberal y la Segunda Intervención Francesa (1854-1867)', 11, [
    branch('his-mex-reforma-11-1', '11.1', 'Las Leyes de Reforma y la Constitución de 1857', 1, [
      leaf('his-mex-reforma-11-1-1', '11.1.1', 'Leyes precursoras', 'Ley Juárez (1855): abolición de fueros. Ley Lerdo (1856): desamortización. Ley Iglesias (1857): prohibición de obvenciones a pobres.', 1),
      leaf('his-mex-reforma-11-1-2', '11.1.2', 'La Constitución de 1857', 'República federal y democrática; libertad de culto y expresión; Plan de Tacubaya (Zuloaga); autogolpe de Comonfort; Juárez asume por ministerio de ley.', 2),
    ]),
    branch('his-mex-reforma-11-2', '11.2', 'La Guerra de Reforma o de los Tres Años (1858-1861)', 2, [
      leaf('his-mex-reforma-11-2-1', '11.2.1', 'El conflicto bipolar', 'Gobierno conservador en la capital y liberal de Juárez en Veracruz; Leyes de Reforma (separación Iglesia-Estado, registro civil, nacionalización de bienes del clero).', 1),
      leaf('his-mex-reforma-11-2-2', '11.2.2', 'Tratados internacionales', 'Tratado McLane-Ocampo (liberales con EE. UU., no ratificado) y Tratado Mon-Almonte (conservadores con España). Victoria liberal.', 2),
    ]),
    branch('his-mex-reforma-11-3', '11.3', 'Segunda Intervención Francesa y el Segundo Imperio (1862-1867)', 3, [
      leaf('his-mex-reforma-11-3-1', '11.3.1', 'Causas', 'Suspensión del pago de la deuda; Convención de Londres; Inglaterra y España se retiran (Tratados de La Soledad); Francia prosigue con fines imperialistas.', 1),
      leaf('his-mex-reforma-11-3-2', '11.3.2', 'El conflicto', 'Batalla de Puebla (5 de mayo de 1862), victoria de Zaragoza; toma de la capital; corona a Maximiliano de Habsburgo.', 2),
      leaf('his-mex-reforma-11-3-3', '11.3.3', 'El Imperio de Maximiliano (1864-1867)', 'Políticas liberales sorpresivas; retiro francés; sitio, captura y fusilamiento en el Cerro de las Campanas junto a Miramón y Mejía.', 3),
    ]),
    branch('his-mex-reforma-11-4', '11.4', 'La República Restaurada (1867-1876)', 4, [
      leaf('his-mex-reforma-11-4-1', '11.4.1', 'Gobiernos de Benito Juárez y Sebastián Lerdo de Tejada', 'Reconstrucción económica, ferrocarril México-Veracruz, educación laica (Escuela Nacional Preparatoria, Gabino Barreda, positivismo).', 1),
    ]),
  ]),
  branch('his-mex-porfiriato', '12', 'El Porfiriato (1876-1911)', 12, [
    branch('his-mex-porfiriato-12-1', '12.1', 'Ascenso al Poder', 1, [
      leaf('his-mex-porfiriato-12-1-1', '12.1.1', 'Planes armados de Porfirio Díaz', 'Plan de La Noria (1871) contra Juárez; Plan de Tuxtepec (1876) contra Lerdo de Tejada.', 1),
    ]),
    branch('his-mex-porfiriato-12-2', '12.2', 'Características Políticas y Económicas', 2, [
      leaf('his-mex-porfiriato-12-2-1', '12.2.1', 'Control político', 'Centralización, «Mátalos en caliente», conciliación con Iglesia y conservadores; «Los Científicos» (Limantour, Justo Sierra).', 1),
      leaf('his-mex-porfiriato-12-2-2', '12.2.2', 'Desarrollo económico capitalista', 'Inversión extranjera en minería, petróleo, electricidad y banca; expansión ferroviaria; comercio exterior.', 2),
    ]),
    branch('his-mex-porfiriato-12-3', '12.3', 'Contradicciones Sociales y Decadencia', 3, [
      leaf('his-mex-porfiriato-12-3-1', '12.3.1', 'Situación agraria y obrera', 'Latifundios, tiendas de raya, deudas hereditarias; jornadas inhumanas en fábricas.', 1),
      leaf('his-mex-porfiriato-12-3-2', '12.3.2', 'Antecedentes de la Revolución', 'Regeneración (Flores Magón, PLM); Cananea (1906) y Río Blanco (1907); entrevista Díaz-Creelman (1908).', 2),
    ]),
  ]),
  branch('his-mex-revolucion', '13', 'La Revolución Mexicana (1910-1920)', 13, [
    branch('his-mex-revolucion-13-1', '13.1', 'Etapa Maderista (1910-1913)', 1, [
      leaf('his-mex-revolucion-13-1-1', '13.1.1', 'Inicio del conflicto', 'La sucesión presidencial de 1910; Partido Antirreeleccionista; Plan de San Luis (20 de noviembre de 1910): «Sufragio efectivo, no reelección».', 1),
      leaf('his-mex-revolucion-13-1-2', '13.1.2', 'Caída de Díaz y presidencia de Madero', 'Tratados de Ciudad Juárez; Plan de Ayala (1911) de Zapata: «La tierra es de quien la trabaja».', 2),
      leaf('his-mex-revolucion-13-1-3', '13.1.3', 'La Decena Trágica (1913)', 'Golpe de Huerta, Félix Díaz y Henry Lane Wilson (Pacto de la Embajada); asesinato de Madero y Pino Suárez.', 3),
    ]),
    branch('his-mex-revolucion-13-2', '13.2', 'Etapa Constitucionalista (1913-1917)', 2, [
      leaf('his-mex-revolucion-13-2-1', '13.2.1', 'Lucha contra la dictadura huertista', 'Plan de Guadalupe (1913); Ejército Constitucionalista de Carranza; Obregón, Villa y Zapata derrotan a Huerta (1914).', 1),
      leaf('his-mex-revolucion-13-2-2', '13.2.2', 'Lucha de facciones', 'Convención de Aguascalientes (1914); Gutiérrez presidente convencionista; Carranza en Veracruz; Batallas de Celaya (Obregón vs. Villa).', 2),
    ]),
    branch('his-mex-revolucion-13-3', '13.3', 'El Congreso Constituyente y la Constitución de 1917', 3, [
      leaf('his-mex-revolucion-13-3-1', '13.3.1', 'Promulgación', 'Congreso en Querétaro; Constitución del 5 de febrero de 1917 (primera con derechos sociales).', 1),
      leaf('his-mex-revolucion-13-3-2', '13.3.2', 'Artículos de cajón para el examen', 'Art. 3°: educación laica, obligatoria y gratuita. Art. 27°: tierras y aguas nacionales, ejido, subsuelo. Art. 123°: jornada de 8 horas, salario mínimo, prohibición de trabajo infantil, huelga y descanso dominical.', 2),
    ]),
  ]),
  branch('his-mex-postrev', '14', 'El México Postrevolucionario e Institucional (1920-1940)', 14, [
    branch('his-mex-postrev-14-1', '14.1', 'El Grupo Sonorense y la Reconstrucción', 1, [
      leaf('his-mex-postrev-14-1-1', '14.1.1', 'El Plan de Agua Prieta (1920)', 'Obregón y Calles contra Carranza; asesinato de Carranza en Tlaxcalantongo.', 1),
      leaf('his-mex-postrev-14-1-2', '14.1.2', 'Gobierno de Álvaro Obregón (1920-1924)', 'SEP (1921) con Vasconcelos; muralismo; Tratados de Bucareli con EE. UU.', 2),
      leaf('his-mex-postrev-14-1-3', '14.1.3', 'Gobierno de Plutarco Elías Calles (1924-1928)', 'Banco de México (1925); Guerra Cristera (1926-1929); Ley Calles; «Viva Cristo Rey».', 3),
    ]),
    branch('his-mex-postrev-14-2', '14.2', 'El Maximato (1928-1934)', 2, [
      leaf('his-mex-postrev-14-2-1', '14.2.1', 'El Jefe Máximo de la Revolución', 'Asesinato de Obregón (1928); Calles maneja a Portes Gil (autonomía UNAM 1929), Ortiz Rubio y Abelardo L. Rodríguez.', 1),
      leaf('his-mex-postrev-14-2-2', '14.2.2', 'Fundación del PNR (1929)', 'Partido Nacional Revolucionario; fin de la era de caudillos.', 2),
    ]),
    branch('his-mex-postrev-14-3', '14.3', 'El Cardenismo (1934-1940)', 3, [
      leaf('his-mex-postrev-14-3-1', '14.3.1', 'Consolidación Presidencial', 'Lázaro Cárdenas rompe el Maximato y expulsa a Calles (1936).', 1),
      leaf('his-mex-postrev-14-3-2', '14.3.2', 'Políticas de masas', 'Reforma agraria cardenista y Banco de Crédito Ejidal; PRM con sectores obrero (CTM), campesino (CNC), popular (CNOP) y militar; educación socialista; fundación del IPN.', 2),
      leaf('his-mex-postrev-14-3-3', '14.3.3', 'La Expropiación Petrolera (18 de marzo de 1938)', 'Nacionalización de la industria petrolera; creación de PEMEX.', 3),
    ]),
  ]),
  branch('his-mex-contemp', '15', 'El México Contemporáneo (1940-Siglo XXI)', 15, [
    branch('his-mex-contemp-15-1', '15.1', 'El Modelo de Industrialización y el «Milagro Mexicano» (1940-1970)', 1, [
      leaf('his-mex-contemp-15-1-1', '15.1.1', 'Manuel Ávila Camacho (1940-1946)', 'Unidad Nacional; Segunda Guerra Mundial (Escuadrón 201); IMSS (1943); PRI (1946).', 1),
      leaf('his-mex-contemp-15-1-2', '15.1.2', 'Miguel Alemán Valdés (1946-1952)', 'Primer civilismo; Ciudad Universitaria.', 2),
      leaf('his-mex-contemp-15-1-3', '15.1.3', 'El Modelo económico', 'Sustitución de importaciones y Desarrollo Estabilizador (Ortiz Mena); crecimiento con baja inflación; peso a $12.50.', 3),
      leaf('his-mex-contemp-15-1-4', '15.1.4', 'Adolfo Ruiz Cortines (1952-1958)', 'Voto de la mujer a nivel nacional (1953).', 4),
      leaf('his-mex-contemp-15-1-5', '15.1.5', 'Adolfo López Mateos (1958-1964)', 'ISSSTE, CONALITEG y nacionalización de la electricidad.', 5),
      leaf('his-mex-contemp-15-1-6', '15.1.6', 'Gustavo Díaz Ordaz (1964-1970)', 'Juegos Olímpicos 1968; Matanza de Tlatelolco (2 de octubre de 1968).', 6),
    ]),
    branch('his-mex-contemp-15-2', '15.2', 'Crisis del Sistema y los Modelos de Desarrollo Compartido', 2, [
      leaf('his-mex-contemp-15-2-1', '15.2.1', 'Luis Echeverría Álvarez (1970-1976)', 'Desarrollo Compartido; Guerra Sucia; Halconazo (1971); devaluación tras 22 años de estabilidad.', 1),
      leaf('his-mex-contemp-15-2-2', '15.2.2', 'José López Portillo (1976-1982)', 'Alianza para el Producción; Cantarell; nacionalización de la banca (1982).', 2),
    ]),
    branch('his-mex-contemp-15-3', '15.3', 'La Era Neoliberal y la Alternancia Política', 3, [
      leaf('his-mex-contemp-15-3-1', '15.3.1', 'Miguel de la Madrid (1982-1988)', 'Neoliberalismo; GATT (1986); terremoto de 1985; elecciones de 1988 y «caída del sistema».', 1),
      leaf('his-mex-contemp-15-3-2', '15.3.2', 'Carlos Salinas de Gortari (1988-1994)', 'Privatizaciones; reformas a arts. 3, 27 y 130; TLCAN (1994); EZLN en Chiapas; asesinatos de Colosio y Ruiz Massieu.', 2),
      leaf('his-mex-contemp-15-3-3', '15.3.3', 'Ernesto Zedillo (1994-2000)', 'Error de Diciembre / Efecto Tequila; Fobaproa; autonomía del IFE (hoy INE).', 3),
      leaf('his-mex-contemp-15-3-4', '15.3.4', 'La Alternancia del año 2000', 'Triunfo de Vicente Fox (PAN); fin de 71 años de PRI en la presidencia.', 4),
    ]),
  ]),
];

/** Convierte codigos 8–15 → 1–8 (temario independiente). */
function normalizeMexicoTopics(topics) {
  const shift = (node, isRoot) => {
    const parts = (node.codigo || '').split('.');
    const rootNum = parseInt(parts[0], 10) - 7;
    parts[0] = String(rootNum);
    return {
      ...node,
      codigo: parts.join('.'),
      orden: isRoot ? rootNum : node.orden,
      children: node.children?.map((c) => shift(c, false)),
    };
  };
  return topics.map((t) => shift(t, true));
}

const topics = normalizeMexicoTopics(rawMexicoTopics);

function countLeaves(list) {
  let n = 0;
  for (const t of list) {
    if (t.children?.length) n += countLeaves(t.children);
    else n++;
  }
  return n;
}

const outPath = path.join(__dirname, '../src/data/unam-temario-historia-mexico.ts');
const content = `import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Historia de México — Examen UNAM. */
export const UNAM_HISTORIA_MEXICO_TOPICS: UnamTemarioTopic[] = ${JSON.stringify(topics, null, 2)} as UnamTemarioTopic[];
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log('Written', outPath);
console.log('Blocks:', topics.length);
console.log('Leaf count:', countLeaves(topics));