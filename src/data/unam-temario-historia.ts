import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Historia Universal — Examen UNAM. */
export const UNAM_HISTORIA_TOPICS: UnamTemarioTopic[] = [
  {
    "id": "his-ciencia",
    "codigo": "1",
    "titulo": "La Historia como Ciencia",
    "orden": 1,
    "status": "publicado",
    "children": [
      {
        "id": "his-ciencia-1-1",
        "codigo": "1.1",
        "titulo": "Concepto e Interpretación de la Historia",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "his-ciencia-1-1-1",
            "codigo": "1.1.1",
            "titulo": "Definición",
            "descripcion": "La historia como ciencia que estudia el pasado del hombre en sociedad para comprender el presente y proyectar el futuro.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-ciencia-1-1-2",
            "codigo": "1.1.2",
            "titulo": "Fuentes de la historia",
            "descripcion": "Fuentes primarias (directas, contemporáneas al hecho: documentos oficiales, monumentos, diarios, restos óseos) y secundarias (indirectas, interpretaciones posteriores: libros de texto, biografías, enciclopedias).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "his-ciencia-1-1-3",
            "codigo": "1.1.3",
            "titulo": "Corrientes de interpretación historiográfica",
            "descripcion": "Idealismo, positivismo (Comte, datos exactos), materialismo histórico (Marx, lucha de clases y economía), Escuela de los Annales (Braudel, procesos de larga duración).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "his-ciencia-1-2",
        "codigo": "1.2",
        "titulo": "Periodización Tradicional",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "his-ciencia-1-2-1",
            "codigo": "1.2.1",
            "titulo": "Criterio eurocentrista",
            "descripcion": "Edad Antigua: desde la invención de la escritura (aprox. 3500 a.C.) hasta la caída del Imperio Romano de Occidente (476 d.C.). Edad Media: del 476 d.C. hasta la caída de Constantinopla (1453) o el Descubrimiento de América (1492). Edad Moderna: de 1453/1492 hasta la Revolución Francesa (1789). Edad Contemporánea: desde 1789 hasta nuestros días.",
            "orden": 1,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "his-ilustracion",
    "codigo": "2",
    "titulo": "La Ilustración y las Revoluciones Burguesas",
    "orden": 2,
    "status": "publicado",
    "children": [
      {
        "id": "his-ilustracion-2-1",
        "codigo": "2.1",
        "titulo": "La Ilustración (Siglo XVIII)",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "his-ilustracion-2-1-1",
            "codigo": "2.1.1",
            "titulo": "Concepto",
            "descripcion": "Movimiento intelectual, filosófico y cultural europeo («Siglo de las Luces») que defendía el uso de la razón, el pensamiento crítico y la ciencia frente al dogmatismo religioso y el absolutismo monárquico.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-ilustracion-2-1-2",
            "codigo": "2.1.2",
            "titulo": "Ideas políticas y económicas",
            "descripcion": "Montesquieu: división de poderes (ejecutivo, legislativo, judicial) en El espíritu de las leyes. Rousseau: el contrato social y la soberanía popular. Voltaire: libertad de expresión, tolerancia religiosa y laicismo. Adam Smith: liberalismo económico (libre mercado, no intervención del Estado, laissez-faire).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "his-ilustracion-2-1-3",
            "codigo": "2.1.3",
            "titulo": "Difusión",
            "descripcion": "La creación de La Enciclopedia por Diderot y D'Alembert. El fenómeno del Despotismo Ilustrado («Todo para el pueblo, pero sin el pueblo»).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "his-ilustracion-2-2",
        "codigo": "2.2",
        "titulo": "Independencia de las Trece Colonias Inglesas (1776)",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "his-ilustracion-2-2-1",
            "codigo": "2.2.1",
            "titulo": "Causas",
            "descripcion": "Impuestos excesivos decretados por la corona británica tras la Guerra de los Siete Años (Ley del Timbre, impuesto al té), falta de representación política en el Parlamento («No taxation without representation»).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-ilustracion-2-2-2",
            "codigo": "2.2.2",
            "titulo": "Proceso",
            "descripcion": "El motín del té en Boston (1773), los Congresos de Filadelfia, la Declaración de Independencia (4 de julio de 1776, redactada por Thomas Jefferson), apoyo militar de Francia y España.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "his-ilustracion-2-2-3",
            "codigo": "2.2.3",
            "titulo": "Consecuencias",
            "descripcion": "Tratado de París (1783), nacimiento de Estados Unidos como la primera república democrática constitucional y federal, ejemplo para la Revolución Francesa y la emancipación de Hispanoamérica.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "his-ilustracion-2-3",
        "codigo": "2.3",
        "titulo": "Revolución Francesa (1789)",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "his-ilustracion-2-3-1",
            "codigo": "2.3.1",
            "titulo": "Causas",
            "descripcion": "Crisis financiera del Estado absolutista de Luis XVI, privilegios del Primer Estado (Clero) y Segundo Estado (Nobleza), descontento y hambruna del Tercer Estado o Estado Llano (burguesía, campesinos y artesanos).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-ilustracion-2-3-2",
            "codigo": "2.3.2",
            "titulo": "Etapas del movimiento",
            "descripcion": "Estados Generales y Asamblea Nacional (1789): Juramento del Juego de Pelota, toma de la Bastilla (14 de julio), Declaración de los Derechos del Hombre y del Ciudadano. Asamblea Legislativa y Convención Nacional: ejecución de Luis XVI, abolición de la monarquía, República y época del «Terror» (Robespierre; Jacobinos vs. Girondinos). El Directorio: etapa moderada burguesa derrocada por el golpe del 18 de brumario de Napoleón Bonaparte (1799).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "his-ilustracion-2-4",
        "codigo": "2.4",
        "titulo": "Imperio Napoleónico y la Restauración",
        "orden": 4,
        "status": "publicado",
        "children": [
          {
            "id": "his-ilustracion-2-4-1",
            "codigo": "2.4.1",
            "titulo": "Expansión napoleónica",
            "descripcion": "Difusión de las ideas liberales y el Código Civil Napoleónico por Europa; bloqueo continental a Inglaterra, invasión a España y Portugal (1808). Derrota final en la Batalla de Waterloo (1815).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-ilustracion-2-4-2",
            "codigo": "2.4.2",
            "titulo": "El Congreso de Viena (1815)",
            "descripcion": "Reunión de las potencias vencedoras (Austria, Prusia, Rusia, Gran Bretaña) para restaurar el absolutismo monárquico, redefinir el mapa de Europa y crear la Santa Alianza para sofocar brotes revolucionarios liberales.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "his-siglo-xix",
    "codigo": "3",
    "titulo": "Movimientos Sociales y Políticos del Siglo XIX",
    "orden": 3,
    "status": "publicado",
    "children": [
      {
        "id": "his-siglo-xix-3-1",
        "codigo": "3.1",
        "titulo": "Revoluciones Liberales de 1830 y 1848",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "his-siglo-xix-3-1-1",
            "codigo": "3.1.1",
            "titulo": "Revolución de 1830",
            "descripcion": "Caída del rey absolutista Carlos X en Francia e instauración de una monarquía constitucional con Luis Felipe de Orleans («El rey burgués»).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-siglo-xix-3-1-2",
            "codigo": "3.1.2",
            "titulo": "Revolución de 1848 («La primavera de los pueblos»)",
            "descripcion": "Caída de Luis Felipe en Francia, proclamación de la Segunda República, auge de demandas nacionalistas, obreras y democráticas en toda Europa Central.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "his-siglo-xix-3-2",
        "codigo": "3.2",
        "titulo": "Movimientos Obreros y Doctrinas Sociales",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "his-siglo-xix-3-2-1",
            "codigo": "3.2.1",
            "titulo": "Primeras protestas obreras",
            "descripcion": "Ludismo: destrucción de máquinas industriales como protesta por la pérdida de empleos. Cartismo: envío de cartas al parlamento británico solicitando derechos políticos para los obreros (sufragio universal masculino).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-siglo-xix-3-2-2",
            "codigo": "3.2.2",
            "titulo": "Doctrinas sociales",
            "descripcion": "Socialismo utópico: propuestas idealistas de reforma social pacífica (Robert Owen, Charles Fourier y sus falansterios, Saint-Simon). Socialismo científico (marxismo): Karl Marx y Friedrich Engels (El Manifiesto Comunista, 1848); materialismo histórico, infraestructura y superestructura, plusvalía, dictadura del proletariado. Anarquismo: rechazo a la autoridad coercitiva (Bakunin, Proudhon).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "his-siglo-xix-3-3",
        "codigo": "3.3",
        "titulo": "Unificaciones Nacionales",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "his-siglo-xix-3-3-1",
            "codigo": "3.3.1",
            "titulo": "Unificación Italiana (1861-1870)",
            "descripcion": "Liderada por el Reino de Piamonte-Cerdeña (Rey Víctor Manuel II, el ministro Camilo Cavour y las campañas militares de Giuseppe Garibaldi con los «camisas rojas»). Anexión de los Estados Pontificios.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-siglo-xix-3-3-2",
            "codigo": "3.3.2",
            "titulo": "Unificación Alemana (1871)",
            "descripcion": "Liderada por el Reino de Prusia (Rey Guillermo I y el canciller Otto von Bismarck, el «Canciller de Hierro»). Guerras contra Dinamarca (1864), Austria (1866) y Francia (Guerra Franco-Prusiana, 1870-1871). Nacimiento del Segundo Reich alemán en Versalles.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "his-imperialismo",
    "codigo": "4",
    "titulo": "El Imperialismo y la Primera Guerra Mundial",
    "orden": 4,
    "status": "publicado",
    "children": [
      {
        "id": "his-imperialismo-4-1",
        "codigo": "4.1",
        "titulo": "El Imperialismo del Siglo XIX",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "his-imperialismo-4-1-1",
            "codigo": "4.1.1",
            "titulo": "Causas",
            "descripcion": "Segunda Revolución Industrial (necesidad de materias primas baratas como petróleo, caucho, metales; mercados para exportar excedentes y capitales), crecimiento demográfico europeo, ideas de superioridad racial («la carga del hombre blanco»).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-imperialismo-4-1-2",
            "codigo": "4.1.2",
            "titulo": "El reparto colonial",
            "descripcion": "La Conferencia de Berlín (1884-1885) convocada por Bismarck para organizar la colonización de África. Principales imperios: británico (el más extenso, de El Cairo a El Cabo) y francés.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "his-imperialismo-4-2",
        "codigo": "4.2",
        "titulo": "La Primera Guerra Mundial (1914-1918)",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "his-imperialismo-4-2-1",
            "codigo": "4.2.1",
            "titulo": "Antecedentes",
            "descripcion": "La «Paz Armada» (carrera armamentista en un periodo sin conflicto directo), rivalidad industrial y colonial, el conflicto nacionalista en los Balcanes («el polvorín de Europa»).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-imperialismo-4-2-2",
            "codigo": "4.2.2",
            "titulo": "Formación de bloques",
            "descripcion": "Triple Entente (Aliados): Gran Bretaña, Francia y el Imperio Ruso (más tarde Italia, EE. UU. y Grecia). Triple Alianza (Potencias Centrales): Imperio Alemán, Imperio Austro-Húngaro e Italia (cambia de bando; se unen el Imperio Otomano y Bulgaria).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "his-imperialismo-4-2-3",
            "codigo": "4.2.3",
            "titulo": "Detonante",
            "descripcion": "El asesinato del archiduque Francisco Fernando, heredero al trono austrohúngaro, en Sarajevo (28 de junio de 1914) por un nacionalista serbio.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "his-imperialismo-4-2-4",
            "codigo": "4.2.4",
            "titulo": "Fases del conflicto",
            "descripcion": "Guerra de movimientos (1914): Plan Schlieffen alemán; freno en la Batalla del Marne. Guerra de trincheras (1915-1917): estancamiento, gases tóxicos, tanques, ametralladoras, aviación, submarinos; Verdún y Somme. Crisis de 1917: salida de Rusia (Revolución Bolchevique, Tratado de Brest-Litovsk); entrada de EE. UU. (Lusitania, Telegrama Zimmermann).",
            "orden": 4,
            "status": "publicado"
          },
          {
            "id": "his-imperialismo-4-2-5",
            "codigo": "4.2.5",
            "titulo": "Fin del conflicto y Tratados de Paz",
            "descripcion": "Rendición de Alemania (Armisticio de Compiègne). Tratado de Versalles (1919): sanciones económicas, territoriales y militares a Alemania. Desintegración de los imperios austrohúngaro, otomano y ruso; creación de la Sociedad de Naciones (antecedente de la ONU).",
            "orden": 5,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "his-entreguerras",
    "codigo": "5",
    "titulo": "Periodo de Entreguerras y la Segunda Guerra Mundial",
    "orden": 5,
    "status": "publicado",
    "children": [
      {
        "id": "his-entreguerras-5-1",
        "codigo": "5.1",
        "titulo": "La Revolución Rusa (1917)",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "his-entreguerras-5-1-1",
            "codigo": "5.1.1",
            "titulo": "Antecedentes",
            "descripcion": "Autocracia zarista de Nicolás II, crisis económica y derrotas militares en la Gran Guerra.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-entreguerras-5-1-2",
            "codigo": "5.1.2",
            "titulo": "Etapas",
            "descripcion": "Revolución de Febrero: caída del zar y gobierno provisional liberal (Kerensky). Revolución de Octubre (bolchevique): liderada por Vladímir Lenin y León Trotsky; consignas «Paz, tierra y pan»; derrocamiento del gobierno provisional, Estado socialista y creación de la URSS (1922).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "his-entreguerras-5-2",
        "codigo": "5.2",
        "titulo": "El Mundo en Crisis (Años 20 y 30)",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "his-entreguerras-5-2-1",
            "codigo": "5.2.1",
            "titulo": "El crac del 29 y la Gran Depresión",
            "descripcion": "Especulación bursátil en Wall Street y el «Jueves Negro» (24 de octubre de 1929). Crisis económica mundial, desempleo masivo y colapso financiero. En EE. UU.: el New Deal de Franklin D. Roosevelt (intervención del Estado, keynesianismo).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-entreguerras-5-2-2",
            "codigo": "5.2.2",
            "titulo": "Ascenso de los Totalitarismos",
            "descripcion": "Fascismo en Italia: Benito Mussolini tras la Marcha sobre Roma (1922); nacionalismo extremo, culto al líder (Duce), corporativismo, anticomunismo. Nazismo en Alemania: Adolf Hitler y el Partido Nazi (1933); superioridad aria, antisemitismo, Lebensraum, rechazo a Versalles. Militarismo en Japón: expansión en Asia (invasión a Manchuria).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "his-entreguerras-5-3",
        "codigo": "5.3",
        "titulo": "La Segunda Guerra Mundial (1939-1945)",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "his-entreguerras-5-3-1",
            "codigo": "5.3.1",
            "titulo": "Causas",
            "descripcion": "Debilidad de la Sociedad de Naciones, política de apaciguamiento de las potencias occidentales, expansionismo del Eje, pacto de no agresión germano-soviético (Ribbentrop-Molotov).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-entreguerras-5-3-2",
            "codigo": "5.3.2",
            "titulo": "Detonante",
            "descripcion": "La invasión alemana a Polonia el 1 de septiembre de 1939. Francia y Gran Bretaña declaran la guerra.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "his-entreguerras-5-3-3",
            "codigo": "5.3.3",
            "titulo": "Bloques en conflicto",
            "descripcion": "El Eje: Alemania, Italia y Japón. Los Aliados: Gran Bretaña, Francia (en el exilio), la URSS (tras la invasión de Hitler en 1941) y EE. UU. (tras Pearl Harbor, diciembre de 1941).",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "his-entreguerras-5-3-4",
            "codigo": "5.3.4",
            "titulo": "Fases y batallas clave",
            "descripcion": "Blitzkrieg: ocupación de Polonia, Dinamarca, Noruega, Bélgica y Francia; Batalla de Inglaterra. Punto de quiebre (1942-1943): derrota alemana en Stalingrado; derrota del Eje en El Alamein. Fin (1944-1945): Desembarco de Normandía (Día D, 6 de junio de 1944); capitulación alemana (mayo de 1945); bombas atómicas en Hiroshima y Nagasaki (Truman); rendición de Japón (agosto-septiembre de 1945).",
            "orden": 4,
            "status": "publicado"
          },
          {
            "id": "his-entreguerras-5-3-5",
            "codigo": "5.3.5",
            "titulo": "Consecuencias",
            "descripcion": "Conferencias de Yalta y Potsdam (división de Alemania y Austria en cuatro zonas), revelación del Holocausto judío, fundación de la ONU (Conferencia de San Francisco, 1945).",
            "orden": 5,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "his-guerra-fria",
    "codigo": "6",
    "titulo": "La Guerra Fría y el Mundo Bipolar",
    "orden": 6,
    "status": "publicado",
    "children": [
      {
        "id": "his-guerra-fria-6-1",
        "codigo": "6.1",
        "titulo": "Configuración de la Guerra Fría",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "his-guerra-fria-6-1-1",
            "codigo": "6.1.1",
            "titulo": "Definición",
            "descripcion": "Periodo de tensiones políticas, ideológicas, económicas, culturales y tecnológicas (sin conflicto bélico directo a gran escala) entre el bloque capitalista (liderado por EE. UU.) y el socialista (liderado por la URSS).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-guerra-fria-6-1-2",
            "codigo": "6.1.2",
            "titulo": "Estrategias de contención y bloques",
            "descripcion": "Bloque occidental: Doctrina Truman, Plan Marshall, OTAN (1949). Bloque oriental: COMECON, Kominform, Pacto de Varsovia (1955).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "his-guerra-fria-6-2",
        "codigo": "6.2",
        "titulo": "Principales Conflictos Periféricos",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "his-guerra-fria-6-2-1",
            "codigo": "6.2.1",
            "titulo": "División de Alemania",
            "descripcion": "Bloqueo de Berlín (1948) y construcción del Muro de Berlín (1961) como símbolo de la división del mundo (la Cortina de Hierro).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-guerra-fria-6-2-2",
            "codigo": "6.2.2",
            "titulo": "Guerra de Corea (1950-1953)",
            "descripcion": "Enfrentamiento entre el norte comunista y el sur capitalista; armisticio de Panmunjom que consolida la división en el paralelo 38°.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "his-guerra-fria-6-2-3",
            "codigo": "6.2.3",
            "titulo": "Revolución Cubana (1959) y Crisis de los Misiles (1962)",
            "descripcion": "Derrocamiento de Fulgencio Batista por Fidel Castro. Bases de misiles soviéticos en Cuba pusieron al mundo al borde de una guerra nuclear; resuelta entre Kennedy y Jrushchov.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "his-guerra-fria-6-2-4",
            "codigo": "6.2.4",
            "titulo": "Guerra de Vietnam (1955-1975)",
            "descripcion": "Intervención militar de EE. UU. para evitar la unificación comunista; mayor derrota militar y social estadounidense; unificación bajo régimen comunista.",
            "orden": 4,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "his-guerra-fria-6-3",
        "codigo": "6.3",
        "titulo": "Procesos de Descolonización",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "his-guerra-fria-6-3-1",
            "codigo": "6.3.1",
            "titulo": "Concepto",
            "descripcion": "Desmantelamiento de los imperios coloniales en Asia y África impulsado por la debilidad de las potencias europeas tras la Segunda Guerra Mundial y el auge del nacionalismo autóctono.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-guerra-fria-6-3-2",
            "codigo": "6.3.2",
            "titulo": "Casos representativos",
            "descripcion": "Independencia de la India (1947, resistencia pacífica de Mahatma Gandhi y división de Pakistán), Guerra de Independencia de Argelia contra Francia (1954-1962), Conferencia de Bandung (1955) y Movimiento de Países No Alineados (Tercer Mundo).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "his-actual",
    "codigo": "7",
    "titulo": "Fin del Bloque Socialista y el Mundo Actual",
    "orden": 7,
    "status": "publicado",
    "children": [
      {
        "id": "his-actual-7-1",
        "codigo": "7.1",
        "titulo": "Caída de la URSS y el Bloque del Este",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "his-actual-7-1-1",
            "codigo": "7.1.1",
            "titulo": "Las reformas de Gorbachov (1985)",
            "descripcion": "Perestroika: reestructuración económica con elementos de libre mercado. Glasnost: apertura política y transparencia en los medios, permitiendo la crítica al partido.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-actual-7-1-2",
            "codigo": "7.1.2",
            "titulo": "El colapso",
            "descripcion": "Oleada revolucionaria pacífica en Europa Oriental (1989). Caída del Muro de Berlín (9 de noviembre de 1989) y reunificación de Alemania (1990). Desintegración de la URSS (diciembre de 1991); fin del mundo bipolar y hegemonía estadounidense.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "his-actual-7-2",
        "codigo": "7.2",
        "titulo": "El Orden Mundial Contemporáneo",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "his-actual-7-2-1",
            "codigo": "7.2.1",
            "titulo": "Globalización",
            "descripcion": "Integración mundial en los ámbitos económico, político, tecnológico, social y cultural, impulsada por el neoliberalismo (apertura comercial, privatizaciones, reducción del gasto público) y la revolución digital (Internet, telecomunicaciones).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "his-actual-7-2-2",
            "codigo": "7.2.2",
            "titulo": "Formación de bloques económicos actuales",
            "descripcion": "Tratado de Libre Comercio de América del Norte (T-MEC / antiguo TLCAN), Unión Europea (Tratado de Maastricht, moneda única Euro), Cooperación Económica Asia-Pacífico (APEC).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      }
    ]
  }
] as UnamTemarioTopic[];
