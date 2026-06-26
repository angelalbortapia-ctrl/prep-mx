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
  branch('geo-ciencia', '1', 'La Geografía como Ciencia', 1, [
    branch('geo-ciencia-1-1', '1.1', 'Metodología y Conceptos Espaciales', 1, [
      leaf('geo-ciencia-1-1-1', '1.1.1', 'Definición moderna', 'La geografía como ciencia interdependiente que estudia las interrelaciones entre los factores físicos, biológicos y humanos que ocurren en la superficie terrestre.', 1),
      leaf('geo-ciencia-1-1-2', '1.1.2', 'Hechos y Fenómenos Geográficos', 'Hechos: acontecimientos de larga duración que transcurren lentamente (formación de una cordillera, deriva continental, un océano). Fenómenos: acontecimientos drásticos, rápidos y de corta duración (sismo, erupción volcánica, huracán).', 2),
      leaf('geo-ciencia-1-1-3', '1.1.3', 'Principios Metodológicos de Emmanuel de Martonne', 'Localización/extensión: ubicación exacta en el espacio geográfico. Causalidad: causas primarias del acontecimiento. Relación/conexión: interacción con otros elementos del entorno. Evolución/dinamismo: transformaciones a lo largo del tiempo.', 3),
    ]),
    branch('geo-ciencia-1-2', '1.2', 'Cartografía y Coordenadas Geográficas', 2, [
      leaf('geo-ciencia-1-2-1', '1.2.1', 'Puntos, líneas y círculos imaginarios', 'Eje terrestre (inclinación 23°27′), polos, Ecuador (hemisferio norte/boreal y sur/austral), trópicos de Cáncer y Capricornio, círculos polares ártico y antártico. Meridianos: Greenwich (meridiano cero) divide hemisferio este y oeste.', 1),
      leaf('geo-ciencia-1-2-2', '1.2.2', 'Coordenadas Geográficas', 'Latitud: distancia angular respecto al Ecuador (0° a 90° N o S); zonas térmicas. Longitud: distancia angular respecto a Greenwich (0° a 180° E u O); husos horarios. Altitud: metros sobre el nivel del mar (msnm).', 2),
      leaf('geo-ciencia-1-2-3', '1.2.3', 'Husos Horarios (cálculo UNAM)', 'La Tierra gira 360° en 24 h → 15° por huso (360/24 = 15); 24 husos en total. Regla: hacia el este se suman horas (+); hacia el oeste se restan (−). Conocer los husos horarios oficiales de México.', 3),
      leaf('geo-ciencia-1-2-4', '1.2.4', 'Proyecciones Cartográficas', 'Cilíndrica (Mercator: navegación, deforma polos), cónica (latitudes medias y países templados), azimutal/cenital (zonas polares).', 4),
    ]),
  ]),
  branch('geo-fisica', '2', 'Geografía Física: El Paisaje Natural', 2, [
    branch('geo-fisica-2-1', '2.1', 'Litosfera y Dinámica Interna de la Tierra', 1, [
      leaf('geo-fisica-2-1-1', '2.1.1', 'Estructura interna del planeta', 'Núcleo (interno sólido y externo líquido, NiFe), manto (inferior y superior/astenosfera), corteza o litosfera (continental de granito/sial y oceánica de basalto/sima).', 1),
      leaf('geo-fisica-2-1-2', '2.1.2', 'Tectónica de Placas y Deriva Continental', 'Teoría de Alfred Wegener: supercontinente Pangea. Corrientes de convección del manto que mueven las placas.', 2),
      leaf('geo-fisica-2-1-3', '2.1.3', 'Límites de placas tectónicas', 'Divergentes: placas se separan, magma crea nueva corteza (Dorsal Mesoatlántica). Convergentes: subducción (Placa de Cocos bajo Norteamericana) o colisión continental (Himalaya). Transformantes: deslizamiento lateral (Falla de San Andrés).', 3),
      leaf('geo-fisica-2-1-4', '2.1.4', 'Sismicidad y Vulcanismo', 'Foco/hipocentro y epicentro/epífoco. Escalas Richter (magnitud) y Mercalli (intensidad). Cinturón de Fuego del Pacífico. México: Zona A (asísmica, Yucatán, norte), B y C (penisísmica), D (altamente sísmica: costa del Pacífico central y sur por placas de Cocos y Rivera).', 4),
    ]),
    branch('geo-fisica-2-2', '2.2', 'Relieve, Intemperismo y Erosión', 2, [
      leaf('geo-fisica-2-2-1', '2.2.1', 'Formas del relieve', 'Llanuras o planicies (baja altitud, agricultura y asentamientos), mesetas o altiplanicies (más de 500 msnm, ej. Meseta Central de México), montañas/cordilleras.', 1),
      leaf('geo-fisica-2-2-2', '2.2.2', 'Modelado del relieve', 'Intemperismo: degradación de rocas in situ (temperatura, agua). Erosión: desgaste con acarreo y depósito por viento (eólica), ríos (fluvial), lluvia (pluvial) u océanos (marina).', 2),
    ]),
    branch('geo-fisica-2-3', '2.3', 'Hidrosfera: Aguas Oceánicas y Continentales', 3, [
      leaf('geo-fisica-2-3-1', '2.3.1', 'Aguas Oceánicas', 'Propiedades físicas (temperatura, densidad) y químicas (salinidad promedio 35 g/L).', 1),
      leaf('geo-fisica-2-3-2', '2.3.2', 'Movimientos del océano', 'Corrientes marinas: cálidas (ecuador, lluvias, agricultura; ej. Golfo) y frías (polos, desiertos costeros, pesca; ej. Humboldt, California). Mareas: flujo/pleamar y reflujo/bajamar por Luna y Sol.', 2),
      leaf('geo-fisica-2-3-3', '2.3.3', 'Aguas Continentales', 'Distribución del agua dulce (ríos, lagos, acuíferos, glaciares). Cuenca hidrológica. Ríos de México: Lerma-Santiago, Balsas, Grijalva-Usumacinta (más caudaloso), Bravo. Mundo: Amazonas, Nilo, Misisipi, Yangtsé.', 3),
    ]),
    branch('geo-fisica-2-4', '2.4', 'Atmósfera, Climas y Regiones Naturales', 4, [
      leaf('geo-fisica-2-4-1', '2.4.1', 'Capas de la atmósfera', 'Troposfera (fenómenos meteorológicos), estratosfera (ozono O₃), mesosfera, termosfera/ionosfera (radio, auroras), exosfera.', 1),
      leaf('geo-fisica-2-4-2', '2.4.2', 'Elementos y Factores del Clima', 'Elementos: temperatura, presión, viento, humedad, precipitación. Factores: latitud, altitud, relieve, continentalidad, corrientes marinas.', 2),
      leaf('geo-fisica-2-4-3', '2.4.3', 'Clasificación Climática de Köppen', 'A: tropicales (>18 °C). B: secos/esteparios y desérticos. C: templados (mes frío entre −3 °C y 18 °C). D: fríos. E: polares. Minúsculas: f (lluvias todo el año), w (verano), s (invierno), m (monzón). Seco/polar: W, S, T, F. Ejemplos UNAM: Af (selva), Aw (sabana), BS (estepa), BW (desierto), Cf (bosque templado).', 3),
      leaf('geo-fisica-2-4-4', '2.4.4', 'Regiones Naturales', 'Relación clima–vegetación–fauna. Biodiversidad. Países megadiversos (México, Brasil, Colombia, Australia, Indonesia, etc.).', 4),
    ]),
  ]),
  branch('geo-humana', '3', 'Geografía Humana: Población y Economía', 3, [
    branch('geo-humana-3-1', '3.1', 'Demografía y Dinámica de la Población Mundial y de México', 1, [
      leaf('geo-humana-3-1-1', '3.1.1', 'Indicadores demográficos', 'Población absoluta, densidad relativa (hab/km²), tasas de natalidad, mortalidad, morbilidad y fecundidad, esperanza de vida.', 1),
      leaf('geo-humana-3-1-2', '3.1.2', 'Distribución de la población', 'Países sobrepoblados (India, China, EE. UU., Indonesia, Pakistán). Vacíos demográficos. Focos en México: Eje Neovolcánico, ZMVM, Monterrey, Guadalajara.', 2),
      leaf('geo-humana-3-1-3', '3.1.3', 'Estructura de la población', 'Pirámides progresivas de base ancha (países en desarrollo) vs. regresivas de base estrecha (desarrollados, envejecimiento; Europa occidental, Japón).', 3),
    ]),
    branch('geo-humana-3-2', '3.2', 'Fenómenos Migratorios', 2, [
      leaf('geo-humana-3-2-1', '3.2.1', 'Conceptos', 'Emigración (salida del lugar de origen) e inmigración (llegada al destino).', 1),
      leaf('geo-humana-3-2-2', '3.2.2', 'Causas de la migración', 'Económicas (empleo, salarios), políticas y sociales (guerras, persecuciones, refugiados), naturales (desastres).', 2),
      leaf('geo-humana-3-2-3', '3.2.3', 'Principales flujos migratorios mundiales', 'Latinoamérica → EE. UU.; África del Norte, Medio Oriente y Europa del Este → Europa occidental; sur y sureste asiático → Golfo Pérsico. Consecuencias: remesas, fuga de cerebros, multiculturalidad, xenofobia.', 3),
    ]),
    branch('geo-humana-3-3', '3.3', 'Geografía Económica y Globalización', 3, [
      leaf('geo-humana-3-3-1', '3.3.1', 'Sectores Económicos', 'Primario: agricultura, ganadería, pesca, silvicultura, minería (extractiva). Secundario: industria manufacturera, textil, petroquímica, metalúrgica, construcción. Terciario: comercio, transportes, comunicaciones, turismo, finanzas, salud, educación.', 1),
      leaf('geo-humana-3-3-2', '3.3.2', 'Globalización Económica y Neoliberalismo', 'Interconexión mundial; libre flujo de capitales; transnacionalización; deslocalización industrial hacia mano de obra barata.', 2),
      leaf('geo-humana-3-3-3', '3.3.3', 'Bloques Económicos Regionales', 'T-MEC (México, EE. UU., Canadá), Unión Europea (Euro), MERCOSUR (Brasil, Argentina, Paraguay, Uruguay), APEC (Asia-Pacífico).', 3),
      leaf('geo-humana-3-3-4', '3.3.4', 'Desigualdad Socioeconómica Mundial', 'Países centrales/desarrollados vs. periféricos/en desarrollo. Índice de Desarrollo Humano (IDH): esperanza de vida, escolaridad, PIB per cápita.', 4),
    ]),
  ]),
  branch('geo-mexico', '4', 'Organización Política y Geografía de México', 4, [
    branch('geo-mexico-4-1', '4.1', 'División Política Mundial y Fronteras', 1, [
      leaf('geo-mexico-4-1-1', '4.1.1', 'Conceptos', 'Territorio, estado y frontera (natural o artificial). Cambios por desintegración de URSS, Yugoslavia y Checoslovaquia. Conflictos fronterizos actuales.', 1),
    ]),
    branch('geo-mexico-4-2', '4.2', 'Geografía de la República Mexicana', 2, [
      leaf('geo-mexico-4-2-1', '4.2.1', 'Organización Territorial', '32 entidades federativas (31 estados y CDMX). Frontera norte con EE. UU. (Río Bravo); sureste con Guatemala (Suchiate, Usumacinta) y Belice (Río Hondo).', 1),
      leaf('geo-mexico-4-2-2', '4.2.2', 'Principales Sistemas Montañosos de México', 'Sierra Madre Occidental, Oriental, Eje Neovolcánico (Citlaltépetl, Popocatépetl, Iztaccíhuatl, Nevado de Toluca, Parícutin), Sierra Madre del Sur, Sierra Madre de Chiapas.', 2),
      leaf('geo-mexico-4-2-3', '4.2.3', 'Geografía Económica de México', 'Petróleo: Golfo y Sonda de Campeche. Minería: plata (Zacatecas, Chihuahua, Durango, Sonora). Agricultura comercial en norte/noroeste (Sinaloa, Sonora); subsistencia en sur/sureste. Maquiladora en frontera norte (BC, Chihuahua, Coahuila, Tamaulipas, Nuevo León).', 3),
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

const outPath = path.join(__dirname, '../src/data/unam-temario-geografia.ts');
const content = `import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Geografía — Examen UNAM. */
export const UNAM_GEOGRAFIA_TOPICS: UnamTemarioTopic[] = ${JSON.stringify(topics, null, 2)} as UnamTemarioTopic[];
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log('Written', outPath);
console.log('Blocks:', topics.length);
console.log('Leaf count:', countLeaves(topics));
