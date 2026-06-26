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
  branch('his-ciencia', '1', 'La Historia como Ciencia', 1, [
    branch('his-ciencia-1-1', '1.1', 'Concepto e Interpretación de la Historia', 1, [
      leaf('his-ciencia-1-1-1', '1.1.1', 'Definición', 'La historia como ciencia que estudia el pasado del hombre en sociedad para comprender el presente y proyectar el futuro.', 1),
      leaf('his-ciencia-1-1-2', '1.1.2', 'Fuentes de la historia', 'Fuentes primarias (directas, contemporáneas al hecho: documentos oficiales, monumentos, diarios, restos óseos) y secundarias (indirectas, interpretaciones posteriores: libros de texto, biografías, enciclopedias).', 2),
      leaf('his-ciencia-1-1-3', '1.1.3', 'Corrientes de interpretación historiográfica', 'Idealismo, positivismo (Comte, datos exactos), materialismo histórico (Marx, lucha de clases y economía), Escuela de los Annales (Braudel, procesos de larga duración).', 3),
    ]),
    branch('his-ciencia-1-2', '1.2', 'Periodización Tradicional', 2, [
      leaf('his-ciencia-1-2-1', '1.2.1', 'Criterio eurocentrista', 'Edad Antigua: desde la invención de la escritura (aprox. 3500 a.C.) hasta la caída del Imperio Romano de Occidente (476 d.C.). Edad Media: del 476 d.C. hasta la caída de Constantinopla (1453) o el Descubrimiento de América (1492). Edad Moderna: de 1453/1492 hasta la Revolución Francesa (1789). Edad Contemporánea: desde 1789 hasta nuestros días.', 1),
    ]),
  ]),
  branch('his-ilustracion', '2', 'La Ilustración y las Revoluciones Burguesas', 2, [
    branch('his-ilustracion-2-1', '2.1', 'La Ilustración (Siglo XVIII)', 1, [
      leaf('his-ilustracion-2-1-1', '2.1.1', 'Concepto', 'Movimiento intelectual, filosófico y cultural europeo («Siglo de las Luces») que defendía el uso de la razón, el pensamiento crítico y la ciencia frente al dogmatismo religioso y el absolutismo monárquico.', 1),
      leaf('his-ilustracion-2-1-2', '2.1.2', 'Ideas políticas y económicas', 'Montesquieu: división de poderes (ejecutivo, legislativo, judicial) en El espíritu de las leyes. Rousseau: el contrato social y la soberanía popular. Voltaire: libertad de expresión, tolerancia religiosa y laicismo. Adam Smith: liberalismo económico (libre mercado, no intervención del Estado, laissez-faire).', 2),
      leaf('his-ilustracion-2-1-3', '2.1.3', 'Difusión', 'La creación de La Enciclopedia por Diderot y D\'Alembert. El fenómeno del Despotismo Ilustrado («Todo para el pueblo, pero sin el pueblo»).', 3),
    ]),
    branch('his-ilustracion-2-2', '2.2', 'Independencia de las Trece Colonias Inglesas (1776)', 2, [
      leaf('his-ilustracion-2-2-1', '2.2.1', 'Causas', 'Impuestos excesivos decretados por la corona británica tras la Guerra de los Siete Años (Ley del Timbre, impuesto al té), falta de representación política en el Parlamento («No taxation without representation»).', 1),
      leaf('his-ilustracion-2-2-2', '2.2.2', 'Proceso', 'El motín del té en Boston (1773), los Congresos de Filadelfia, la Declaración de Independencia (4 de julio de 1776, redactada por Thomas Jefferson), apoyo militar de Francia y España.', 2),
      leaf('his-ilustracion-2-2-3', '2.2.3', 'Consecuencias', 'Tratado de París (1783), nacimiento de Estados Unidos como la primera república democrática constitucional y federal, ejemplo para la Revolución Francesa y la emancipación de Hispanoamérica.', 3),
    ]),
    branch('his-ilustracion-2-3', '2.3', 'Revolución Francesa (1789)', 3, [
      leaf('his-ilustracion-2-3-1', '2.3.1', 'Causas', 'Crisis financiera del Estado absolutista de Luis XVI, privilegios del Primer Estado (Clero) y Segundo Estado (Nobleza), descontento y hambruna del Tercer Estado o Estado Llano (burguesía, campesinos y artesanos).', 1),
      leaf('his-ilustracion-2-3-2', '2.3.2', 'Etapas del movimiento', 'Estados Generales y Asamblea Nacional (1789): Juramento del Juego de Pelota, toma de la Bastilla (14 de julio), Declaración de los Derechos del Hombre y del Ciudadano. Asamblea Legislativa y Convención Nacional: ejecución de Luis XVI, abolición de la monarquía, República y época del «Terror» (Robespierre; Jacobinos vs. Girondinos). El Directorio: etapa moderada burguesa derrocada por el golpe del 18 de brumario de Napoleón Bonaparte (1799).', 2),
    ]),
    branch('his-ilustracion-2-4', '2.4', 'Imperio Napoleónico y la Restauración', 4, [
      leaf('his-ilustracion-2-4-1', '2.4.1', 'Expansión napoleónica', 'Difusión de las ideas liberales y el Código Civil Napoleónico por Europa; bloqueo continental a Inglaterra, invasión a España y Portugal (1808). Derrota final en la Batalla de Waterloo (1815).', 1),
      leaf('his-ilustracion-2-4-2', '2.4.2', 'El Congreso de Viena (1815)', 'Reunión de las potencias vencedoras (Austria, Prusia, Rusia, Gran Bretaña) para restaurar el absolutismo monárquico, redefinir el mapa de Europa y crear la Santa Alianza para sofocar brotes revolucionarios liberales.', 2),
    ]),
  ]),
  branch('his-siglo-xix', '3', 'Movimientos Sociales y Políticos del Siglo XIX', 3, [
    branch('his-siglo-xix-3-1', '3.1', 'Revoluciones Liberales de 1830 y 1848', 1, [
      leaf('his-siglo-xix-3-1-1', '3.1.1', 'Revolución de 1830', 'Caída del rey absolutista Carlos X en Francia e instauración de una monarquía constitucional con Luis Felipe de Orleans («El rey burgués»).', 1),
      leaf('his-siglo-xix-3-1-2', '3.1.2', 'Revolución de 1848 («La primavera de los pueblos»)', 'Caída de Luis Felipe en Francia, proclamación de la Segunda República, auge de demandas nacionalistas, obreras y democráticas en toda Europa Central.', 2),
    ]),
    branch('his-siglo-xix-3-2', '3.2', 'Movimientos Obreros y Doctrinas Sociales', 2, [
      leaf('his-siglo-xix-3-2-1', '3.2.1', 'Primeras protestas obreras', 'Ludismo: destrucción de máquinas industriales como protesta por la pérdida de empleos. Cartismo: envío de cartas al parlamento británico solicitando derechos políticos para los obreros (sufragio universal masculino).', 1),
      leaf('his-siglo-xix-3-2-2', '3.2.2', 'Doctrinas sociales', 'Socialismo utópico: propuestas idealistas de reforma social pacífica (Robert Owen, Charles Fourier y sus falansterios, Saint-Simon). Socialismo científico (marxismo): Karl Marx y Friedrich Engels (El Manifiesto Comunista, 1848); materialismo histórico, infraestructura y superestructura, plusvalía, dictadura del proletariado. Anarquismo: rechazo a la autoridad coercitiva (Bakunin, Proudhon).', 2),
    ]),
    branch('his-siglo-xix-3-3', '3.3', 'Unificaciones Nacionales', 3, [
      leaf('his-siglo-xix-3-3-1', '3.3.1', 'Unificación Italiana (1861-1870)', 'Liderada por el Reino de Piamonte-Cerdeña (Rey Víctor Manuel II, el ministro Camilo Cavour y las campañas militares de Giuseppe Garibaldi con los «camisas rojas»). Anexión de los Estados Pontificios.', 1),
      leaf('his-siglo-xix-3-3-2', '3.3.2', 'Unificación Alemana (1871)', 'Liderada por el Reino de Prusia (Rey Guillermo I y el canciller Otto von Bismarck, el «Canciller de Hierro»). Guerras contra Dinamarca (1864), Austria (1866) y Francia (Guerra Franco-Prusiana, 1870-1871). Nacimiento del Segundo Reich alemán en Versalles.', 2),
    ]),
  ]),
  branch('his-imperialismo', '4', 'El Imperialismo y la Primera Guerra Mundial', 4, [
    branch('his-imperialismo-4-1', '4.1', 'El Imperialismo del Siglo XIX', 1, [
      leaf('his-imperialismo-4-1-1', '4.1.1', 'Causas', 'Segunda Revolución Industrial (necesidad de materias primas baratas como petróleo, caucho, metales; mercados para exportar excedentes y capitales), crecimiento demográfico europeo, ideas de superioridad racial («la carga del hombre blanco»).', 1),
      leaf('his-imperialismo-4-1-2', '4.1.2', 'El reparto colonial', 'La Conferencia de Berlín (1884-1885) convocada por Bismarck para organizar la colonización de África. Principales imperios: británico (el más extenso, de El Cairo a El Cabo) y francés.', 2),
    ]),
    branch('his-imperialismo-4-2', '4.2', 'La Primera Guerra Mundial (1914-1918)', 2, [
      leaf('his-imperialismo-4-2-1', '4.2.1', 'Antecedentes', 'La «Paz Armada» (carrera armamentista en un periodo sin conflicto directo), rivalidad industrial y colonial, el conflicto nacionalista en los Balcanes («el polvorín de Europa»).', 1),
      leaf('his-imperialismo-4-2-2', '4.2.2', 'Formación de bloques', 'Triple Entente (Aliados): Gran Bretaña, Francia y el Imperio Ruso (más tarde Italia, EE. UU. y Grecia). Triple Alianza (Potencias Centrales): Imperio Alemán, Imperio Austro-Húngaro e Italia (cambia de bando; se unen el Imperio Otomano y Bulgaria).', 2),
      leaf('his-imperialismo-4-2-3', '4.2.3', 'Detonante', 'El asesinato del archiduque Francisco Fernando, heredero al trono austrohúngaro, en Sarajevo (28 de junio de 1914) por un nacionalista serbio.', 3),
      leaf('his-imperialismo-4-2-4', '4.2.4', 'Fases del conflicto', 'Guerra de movimientos (1914): Plan Schlieffen alemán; freno en la Batalla del Marne. Guerra de trincheras (1915-1917): estancamiento, gases tóxicos, tanques, ametralladoras, aviación, submarinos; Verdún y Somme. Crisis de 1917: salida de Rusia (Revolución Bolchevique, Tratado de Brest-Litovsk); entrada de EE. UU. (Lusitania, Telegrama Zimmermann).', 4),
      leaf('his-imperialismo-4-2-5', '4.2.5', 'Fin del conflicto y Tratados de Paz', 'Rendición de Alemania (Armisticio de Compiègne). Tratado de Versalles (1919): sanciones económicas, territoriales y militares a Alemania. Desintegración de los imperios austrohúngaro, otomano y ruso; creación de la Sociedad de Naciones (antecedente de la ONU).', 5),
    ]),
  ]),
  branch('his-entreguerras', '5', 'Periodo de Entreguerras y la Segunda Guerra Mundial', 5, [
    branch('his-entreguerras-5-1', '5.1', 'La Revolución Rusa (1917)', 1, [
      leaf('his-entreguerras-5-1-1', '5.1.1', 'Antecedentes', 'Autocracia zarista de Nicolás II, crisis económica y derrotas militares en la Gran Guerra.', 1),
      leaf('his-entreguerras-5-1-2', '5.1.2', 'Etapas', 'Revolución de Febrero: caída del zar y gobierno provisional liberal (Kerensky). Revolución de Octubre (bolchevique): liderada por Vladímir Lenin y León Trotsky; consignas «Paz, tierra y pan»; derrocamiento del gobierno provisional, Estado socialista y creación de la URSS (1922).', 2),
    ]),
    branch('his-entreguerras-5-2', '5.2', 'El Mundo en Crisis (Años 20 y 30)', 2, [
      leaf('his-entreguerras-5-2-1', '5.2.1', 'El crac del 29 y la Gran Depresión', 'Especulación bursátil en Wall Street y el «Jueves Negro» (24 de octubre de 1929). Crisis económica mundial, desempleo masivo y colapso financiero. En EE. UU.: el New Deal de Franklin D. Roosevelt (intervención del Estado, keynesianismo).', 1),
      leaf('his-entreguerras-5-2-2', '5.2.2', 'Ascenso de los Totalitarismos', 'Fascismo en Italia: Benito Mussolini tras la Marcha sobre Roma (1922); nacionalismo extremo, culto al líder (Duce), corporativismo, anticomunismo. Nazismo en Alemania: Adolf Hitler y el Partido Nazi (1933); superioridad aria, antisemitismo, Lebensraum, rechazo a Versalles. Militarismo en Japón: expansión en Asia (invasión a Manchuria).', 2),
    ]),
    branch('his-entreguerras-5-3', '5.3', 'La Segunda Guerra Mundial (1939-1945)', 3, [
      leaf('his-entreguerras-5-3-1', '5.3.1', 'Causas', 'Debilidad de la Sociedad de Naciones, política de apaciguamiento de las potencias occidentales, expansionismo del Eje, pacto de no agresión germano-soviético (Ribbentrop-Molotov).', 1),
      leaf('his-entreguerras-5-3-2', '5.3.2', 'Detonante', 'La invasión alemana a Polonia el 1 de septiembre de 1939. Francia y Gran Bretaña declaran la guerra.', 2),
      leaf('his-entreguerras-5-3-3', '5.3.3', 'Bloques en conflicto', 'El Eje: Alemania, Italia y Japón. Los Aliados: Gran Bretaña, Francia (en el exilio), la URSS (tras la invasión de Hitler en 1941) y EE. UU. (tras Pearl Harbor, diciembre de 1941).', 3),
      leaf('his-entreguerras-5-3-4', '5.3.4', 'Fases y batallas clave', 'Blitzkrieg: ocupación de Polonia, Dinamarca, Noruega, Bélgica y Francia; Batalla de Inglaterra. Punto de quiebre (1942-1943): derrota alemana en Stalingrado; derrota del Eje en El Alamein. Fin (1944-1945): Desembarco de Normandía (Día D, 6 de junio de 1944); capitulación alemana (mayo de 1945); bombas atómicas en Hiroshima y Nagasaki (Truman); rendición de Japón (agosto-septiembre de 1945).', 4),
      leaf('his-entreguerras-5-3-5', '5.3.5', 'Consecuencias', 'Conferencias de Yalta y Potsdam (división de Alemania y Austria en cuatro zonas), revelación del Holocausto judío, fundación de la ONU (Conferencia de San Francisco, 1945).', 5),
    ]),
  ]),
  branch('his-guerra-fria', '6', 'La Guerra Fría y el Mundo Bipolar', 6, [
    branch('his-guerra-fria-6-1', '6.1', 'Configuración de la Guerra Fría', 1, [
      leaf('his-guerra-fria-6-1-1', '6.1.1', 'Definición', 'Periodo de tensiones políticas, ideológicas, económicas, culturales y tecnológicas (sin conflicto bélico directo a gran escala) entre el bloque capitalista (liderado por EE. UU.) y el socialista (liderado por la URSS).', 1),
      leaf('his-guerra-fria-6-1-2', '6.1.2', 'Estrategias de contención y bloques', 'Bloque occidental: Doctrina Truman, Plan Marshall, OTAN (1949). Bloque oriental: COMECON, Kominform, Pacto de Varsovia (1955).', 2),
    ]),
    branch('his-guerra-fria-6-2', '6.2', 'Principales Conflictos Periféricos', 2, [
      leaf('his-guerra-fria-6-2-1', '6.2.1', 'División de Alemania', 'Bloqueo de Berlín (1948) y construcción del Muro de Berlín (1961) como símbolo de la división del mundo (la Cortina de Hierro).', 1),
      leaf('his-guerra-fria-6-2-2', '6.2.2', 'Guerra de Corea (1950-1953)', 'Enfrentamiento entre el norte comunista y el sur capitalista; armisticio de Panmunjom que consolida la división en el paralelo 38°.', 2),
      leaf('his-guerra-fria-6-2-3', '6.2.3', 'Revolución Cubana (1959) y Crisis de los Misiles (1962)', 'Derrocamiento de Fulgencio Batista por Fidel Castro. Bases de misiles soviéticos en Cuba pusieron al mundo al borde de una guerra nuclear; resuelta entre Kennedy y Jrushchov.', 3),
      leaf('his-guerra-fria-6-2-4', '6.2.4', 'Guerra de Vietnam (1955-1975)', 'Intervención militar de EE. UU. para evitar la unificación comunista; mayor derrota militar y social estadounidense; unificación bajo régimen comunista.', 4),
    ]),
    branch('his-guerra-fria-6-3', '6.3', 'Procesos de Descolonización', 3, [
      leaf('his-guerra-fria-6-3-1', '6.3.1', 'Concepto', 'Desmantelamiento de los imperios coloniales en Asia y África impulsado por la debilidad de las potencias europeas tras la Segunda Guerra Mundial y el auge del nacionalismo autóctono.', 1),
      leaf('his-guerra-fria-6-3-2', '6.3.2', 'Casos representativos', 'Independencia de la India (1947, resistencia pacífica de Mahatma Gandhi y división de Pakistán), Guerra de Independencia de Argelia contra Francia (1954-1962), Conferencia de Bandung (1955) y Movimiento de Países No Alineados (Tercer Mundo).', 2),
    ]),
  ]),
  branch('his-actual', '7', 'Fin del Bloque Socialista y el Mundo Actual', 7, [
    branch('his-actual-7-1', '7.1', 'Caída de la URSS y el Bloque del Este', 1, [
      leaf('his-actual-7-1-1', '7.1.1', 'Las reformas de Gorbachov (1985)', 'Perestroika: reestructuración económica con elementos de libre mercado. Glasnost: apertura política y transparencia en los medios, permitiendo la crítica al partido.', 1),
      leaf('his-actual-7-1-2', '7.1.2', 'El colapso', 'Oleada revolucionaria pacífica en Europa Oriental (1989). Caída del Muro de Berlín (9 de noviembre de 1989) y reunificación de Alemania (1990). Desintegración de la URSS (diciembre de 1991); fin del mundo bipolar y hegemonía estadounidense.', 2),
    ]),
    branch('his-actual-7-2', '7.2', 'El Orden Mundial Contemporáneo', 2, [
      leaf('his-actual-7-2-1', '7.2.1', 'Globalización', 'Integración mundial en los ámbitos económico, político, tecnológico, social y cultural, impulsada por el neoliberalismo (apertura comercial, privatizaciones, reducción del gasto público) y la revolución digital (Internet, telecomunicaciones).', 1),
      leaf('his-actual-7-2-2', '7.2.2', 'Formación de bloques económicos actuales', 'Tratado de Libre Comercio de América del Norte (T-MEC / antiguo TLCAN), Unión Europea (Tratado de Maastricht, moneda única Euro), Cooperación Económica Asia-Pacífico (APEC).', 2),
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

const outPath = path.join(__dirname, '../src/data/unam-temario-historia.ts');
const content = `import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Historia Universal — Examen UNAM. */
export const UNAM_HISTORIA_TOPICS: UnamTemarioTopic[] = ${JSON.stringify(topics, null, 2)} as UnamTemarioTopic[];
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log('Written', outPath);
console.log('Blocks:', topics.length);
console.log('Leaf count:', countLeaves(topics));
