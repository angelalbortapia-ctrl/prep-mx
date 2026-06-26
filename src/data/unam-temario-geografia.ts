import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Geografía — Examen UNAM. */
export const UNAM_GEOGRAFIA_TOPICS: UnamTemarioTopic[] = [
  {
    "id": "geo-ciencia",
    "codigo": "1",
    "titulo": "La Geografía como Ciencia",
    "orden": 1,
    "status": "publicado",
    "children": [
      {
        "id": "geo-ciencia-1-1",
        "codigo": "1.1",
        "titulo": "Metodología y Conceptos Espaciales",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "geo-ciencia-1-1-1",
            "codigo": "1.1.1",
            "titulo": "Definición moderna",
            "descripcion": "La geografía como ciencia interdependiente que estudia las interrelaciones entre los factores físicos, biológicos y humanos que ocurren en la superficie terrestre.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "geo-ciencia-1-1-2",
            "codigo": "1.1.2",
            "titulo": "Hechos y Fenómenos Geográficos",
            "descripcion": "Hechos: acontecimientos de larga duración que transcurren lentamente (formación de una cordillera, deriva continental, un océano). Fenómenos: acontecimientos drásticos, rápidos y de corta duración (sismo, erupción volcánica, huracán).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "geo-ciencia-1-1-3",
            "codigo": "1.1.3",
            "titulo": "Principios Metodológicos de Emmanuel de Martonne",
            "descripcion": "Localización/extensión: ubicación exacta en el espacio geográfico. Causalidad: causas primarias del acontecimiento. Relación/conexión: interacción con otros elementos del entorno. Evolución/dinamismo: transformaciones a lo largo del tiempo.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "geo-ciencia-1-2",
        "codigo": "1.2",
        "titulo": "Cartografía y Coordenadas Geográficas",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "geo-ciencia-1-2-1",
            "codigo": "1.2.1",
            "titulo": "Puntos, líneas y círculos imaginarios",
            "descripcion": "Eje terrestre (inclinación 23°27′), polos, Ecuador (hemisferio norte/boreal y sur/austral), trópicos de Cáncer y Capricornio, círculos polares ártico y antártico. Meridianos: Greenwich (meridiano cero) divide hemisferio este y oeste.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "geo-ciencia-1-2-2",
            "codigo": "1.2.2",
            "titulo": "Coordenadas Geográficas",
            "descripcion": "Latitud: distancia angular respecto al Ecuador (0° a 90° N o S); zonas térmicas. Longitud: distancia angular respecto a Greenwich (0° a 180° E u O); husos horarios. Altitud: metros sobre el nivel del mar (msnm).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "geo-ciencia-1-2-3",
            "codigo": "1.2.3",
            "titulo": "Husos Horarios (cálculo UNAM)",
            "descripcion": "La Tierra gira 360° en 24 h → 15° por huso (360/24 = 15); 24 husos en total. Regla: hacia el este se suman horas (+); hacia el oeste se restan (−). Conocer los husos horarios oficiales de México.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "geo-ciencia-1-2-4",
            "codigo": "1.2.4",
            "titulo": "Proyecciones Cartográficas",
            "descripcion": "Cilíndrica (Mercator: navegación, deforma polos), cónica (latitudes medias y países templados), azimutal/cenital (zonas polares).",
            "orden": 4,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "geo-fisica",
    "codigo": "2",
    "titulo": "Geografía Física: El Paisaje Natural",
    "orden": 2,
    "status": "publicado",
    "children": [
      {
        "id": "geo-fisica-2-1",
        "codigo": "2.1",
        "titulo": "Litosfera y Dinámica Interna de la Tierra",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "geo-fisica-2-1-1",
            "codigo": "2.1.1",
            "titulo": "Estructura interna del planeta",
            "descripcion": "Núcleo (interno sólido y externo líquido, NiFe), manto (inferior y superior/astenosfera), corteza o litosfera (continental de granito/sial y oceánica de basalto/sima).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "geo-fisica-2-1-2",
            "codigo": "2.1.2",
            "titulo": "Tectónica de Placas y Deriva Continental",
            "descripcion": "Teoría de Alfred Wegener: supercontinente Pangea. Corrientes de convección del manto que mueven las placas.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "geo-fisica-2-1-3",
            "codigo": "2.1.3",
            "titulo": "Límites de placas tectónicas",
            "descripcion": "Divergentes: placas se separan, magma crea nueva corteza (Dorsal Mesoatlántica). Convergentes: subducción (Placa de Cocos bajo Norteamericana) o colisión continental (Himalaya). Transformantes: deslizamiento lateral (Falla de San Andrés).",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "geo-fisica-2-1-4",
            "codigo": "2.1.4",
            "titulo": "Sismicidad y Vulcanismo",
            "descripcion": "Foco/hipocentro y epicentro/epífoco. Escalas Richter (magnitud) y Mercalli (intensidad). Cinturón de Fuego del Pacífico. México: Zona A (asísmica, Yucatán, norte), B y C (penisísmica), D (altamente sísmica: costa del Pacífico central y sur por placas de Cocos y Rivera).",
            "orden": 4,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "geo-fisica-2-2",
        "codigo": "2.2",
        "titulo": "Relieve, Intemperismo y Erosión",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "geo-fisica-2-2-1",
            "codigo": "2.2.1",
            "titulo": "Formas del relieve",
            "descripcion": "Llanuras o planicies (baja altitud, agricultura y asentamientos), mesetas o altiplanicies (más de 500 msnm, ej. Meseta Central de México), montañas/cordilleras.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "geo-fisica-2-2-2",
            "codigo": "2.2.2",
            "titulo": "Modelado del relieve",
            "descripcion": "Intemperismo: degradación de rocas in situ (temperatura, agua). Erosión: desgaste con acarreo y depósito por viento (eólica), ríos (fluvial), lluvia (pluvial) u océanos (marina).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "geo-fisica-2-3",
        "codigo": "2.3",
        "titulo": "Hidrosfera: Aguas Oceánicas y Continentales",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "geo-fisica-2-3-1",
            "codigo": "2.3.1",
            "titulo": "Aguas Oceánicas",
            "descripcion": "Propiedades físicas (temperatura, densidad) y químicas (salinidad promedio 35 g/L).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "geo-fisica-2-3-2",
            "codigo": "2.3.2",
            "titulo": "Movimientos del océano",
            "descripcion": "Corrientes marinas: cálidas (ecuador, lluvias, agricultura; ej. Golfo) y frías (polos, desiertos costeros, pesca; ej. Humboldt, California). Mareas: flujo/pleamar y reflujo/bajamar por Luna y Sol.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "geo-fisica-2-3-3",
            "codigo": "2.3.3",
            "titulo": "Aguas Continentales",
            "descripcion": "Distribución del agua dulce (ríos, lagos, acuíferos, glaciares). Cuenca hidrológica. Ríos de México: Lerma-Santiago, Balsas, Grijalva-Usumacinta (más caudaloso), Bravo. Mundo: Amazonas, Nilo, Misisipi, Yangtsé.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "geo-fisica-2-4",
        "codigo": "2.4",
        "titulo": "Atmósfera, Climas y Regiones Naturales",
        "orden": 4,
        "status": "publicado",
        "children": [
          {
            "id": "geo-fisica-2-4-1",
            "codigo": "2.4.1",
            "titulo": "Capas de la atmósfera",
            "descripcion": "Troposfera (fenómenos meteorológicos), estratosfera (ozono O₃), mesosfera, termosfera/ionosfera (radio, auroras), exosfera.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "geo-fisica-2-4-2",
            "codigo": "2.4.2",
            "titulo": "Elementos y Factores del Clima",
            "descripcion": "Elementos: temperatura, presión, viento, humedad, precipitación. Factores: latitud, altitud, relieve, continentalidad, corrientes marinas.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "geo-fisica-2-4-3",
            "codigo": "2.4.3",
            "titulo": "Clasificación Climática de Köppen",
            "descripcion": "A: tropicales (>18 °C). B: secos/esteparios y desérticos. C: templados (mes frío entre −3 °C y 18 °C). D: fríos. E: polares. Minúsculas: f (lluvias todo el año), w (verano), s (invierno), m (monzón). Seco/polar: W, S, T, F. Ejemplos UNAM: Af (selva), Aw (sabana), BS (estepa), BW (desierto), Cf (bosque templado).",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "geo-fisica-2-4-4",
            "codigo": "2.4.4",
            "titulo": "Regiones Naturales",
            "descripcion": "Relación clima–vegetación–fauna. Biodiversidad. Países megadiversos (México, Brasil, Colombia, Australia, Indonesia, etc.).",
            "orden": 4,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "geo-humana",
    "codigo": "3",
    "titulo": "Geografía Humana: Población y Economía",
    "orden": 3,
    "status": "publicado",
    "children": [
      {
        "id": "geo-humana-3-1",
        "codigo": "3.1",
        "titulo": "Demografía y Dinámica de la Población Mundial y de México",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "geo-humana-3-1-1",
            "codigo": "3.1.1",
            "titulo": "Indicadores demográficos",
            "descripcion": "Población absoluta, densidad relativa (hab/km²), tasas de natalidad, mortalidad, morbilidad y fecundidad, esperanza de vida.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "geo-humana-3-1-2",
            "codigo": "3.1.2",
            "titulo": "Distribución de la población",
            "descripcion": "Países sobrepoblados (India, China, EE. UU., Indonesia, Pakistán). Vacíos demográficos. Focos en México: Eje Neovolcánico, ZMVM, Monterrey, Guadalajara.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "geo-humana-3-1-3",
            "codigo": "3.1.3",
            "titulo": "Estructura de la población",
            "descripcion": "Pirámides progresivas de base ancha (países en desarrollo) vs. regresivas de base estrecha (desarrollados, envejecimiento; Europa occidental, Japón).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "geo-humana-3-2",
        "codigo": "3.2",
        "titulo": "Fenómenos Migratorios",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "geo-humana-3-2-1",
            "codigo": "3.2.1",
            "titulo": "Conceptos",
            "descripcion": "Emigración (salida del lugar de origen) e inmigración (llegada al destino).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "geo-humana-3-2-2",
            "codigo": "3.2.2",
            "titulo": "Causas de la migración",
            "descripcion": "Económicas (empleo, salarios), políticas y sociales (guerras, persecuciones, refugiados), naturales (desastres).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "geo-humana-3-2-3",
            "codigo": "3.2.3",
            "titulo": "Principales flujos migratorios mundiales",
            "descripcion": "Latinoamérica → EE. UU.; África del Norte, Medio Oriente y Europa del Este → Europa occidental; sur y sureste asiático → Golfo Pérsico. Consecuencias: remesas, fuga de cerebros, multiculturalidad, xenofobia.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "geo-humana-3-3",
        "codigo": "3.3",
        "titulo": "Geografía Económica y Globalización",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "geo-humana-3-3-1",
            "codigo": "3.3.1",
            "titulo": "Sectores Económicos",
            "descripcion": "Primario: agricultura, ganadería, pesca, silvicultura, minería (extractiva). Secundario: industria manufacturera, textil, petroquímica, metalúrgica, construcción. Terciario: comercio, transportes, comunicaciones, turismo, finanzas, salud, educación.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "geo-humana-3-3-2",
            "codigo": "3.3.2",
            "titulo": "Globalización Económica y Neoliberalismo",
            "descripcion": "Interconexión mundial; libre flujo de capitales; transnacionalización; deslocalización industrial hacia mano de obra barata.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "geo-humana-3-3-3",
            "codigo": "3.3.3",
            "titulo": "Bloques Económicos Regionales",
            "descripcion": "T-MEC (México, EE. UU., Canadá), Unión Europea (Euro), MERCOSUR (Brasil, Argentina, Paraguay, Uruguay), APEC (Asia-Pacífico).",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "geo-humana-3-3-4",
            "codigo": "3.3.4",
            "titulo": "Desigualdad Socioeconómica Mundial",
            "descripcion": "Países centrales/desarrollados vs. periféricos/en desarrollo. Índice de Desarrollo Humano (IDH): esperanza de vida, escolaridad, PIB per cápita.",
            "orden": 4,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "geo-mexico",
    "codigo": "4",
    "titulo": "Organización Política y Geografía de México",
    "orden": 4,
    "status": "publicado",
    "children": [
      {
        "id": "geo-mexico-4-1",
        "codigo": "4.1",
        "titulo": "División Política Mundial y Fronteras",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "geo-mexico-4-1-1",
            "codigo": "4.1.1",
            "titulo": "Conceptos",
            "descripcion": "Territorio, estado y frontera (natural o artificial). Cambios por desintegración de URSS, Yugoslavia y Checoslovaquia. Conflictos fronterizos actuales.",
            "orden": 1,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "geo-mexico-4-2",
        "codigo": "4.2",
        "titulo": "Geografía de la República Mexicana",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "geo-mexico-4-2-1",
            "codigo": "4.2.1",
            "titulo": "Organización Territorial",
            "descripcion": "32 entidades federativas (31 estados y CDMX). Frontera norte con EE. UU. (Río Bravo); sureste con Guatemala (Suchiate, Usumacinta) y Belice (Río Hondo).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "geo-mexico-4-2-2",
            "codigo": "4.2.2",
            "titulo": "Principales Sistemas Montañosos de México",
            "descripcion": "Sierra Madre Occidental, Oriental, Eje Neovolcánico (Citlaltépetl, Popocatépetl, Iztaccíhuatl, Nevado de Toluca, Parícutin), Sierra Madre del Sur, Sierra Madre de Chiapas.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "geo-mexico-4-2-3",
            "codigo": "4.2.3",
            "titulo": "Geografía Económica de México",
            "descripcion": "Petróleo: Golfo y Sonda de Campeche. Minería: plata (Zacatecas, Chihuahua, Durango, Sonora). Agricultura comercial en norte/noroeste (Sinaloa, Sonora); subsistencia en sur/sureste. Maquiladora en frontera norte (BC, Chihuahua, Coahuila, Tamaulipas, Nuevo León).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      }
    ]
  }
] as UnamTemarioTopic[];
