import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Química — Examen UNAM. */
export const UNAM_QUIMICA_TOPICS: UnamTemarioTopic[] = [
  {
    "id": "qui-estructura",
    "codigo": "1",
    "titulo": "Estructura Atómica y Propiedades Periódicas",
    "orden": 1,
    "status": "publicado",
    "children": [
      {
        "id": "qui-estructura-1-1",
        "codigo": "1.1",
        "titulo": "El Átomo y Partículas Subatómicas",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "qui-estructura-1-1-1",
            "codigo": "1.1.1",
            "titulo": "Modelos Atómicos",
            "descripcion": "Evolución histórica y aportaciones clave: Dalton, Thomson y el budín de pasas, Rutherford y el núcleo, Bohr y los niveles de energía, Modelo Mecano-Cuántico de Schrödinger.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "qui-estructura-1-1-2",
            "codigo": "1.1.2",
            "titulo": "Estructura nuclear",
            "descripcion": "Identificación y propiedades de protones (p⁺), neutrones (n⁰) y electrones (e⁻).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "qui-estructura-1-1-3",
            "codigo": "1.1.3",
            "titulo": "Relaciones de masa",
            "descripcion": "Número Atómico (Z = p⁺), Masa Atómica o Número de Masa (A = p⁺ + n⁰). Cálculo de neutrones: n⁰ = A − Z.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "qui-estructura-1-1-4",
            "codigo": "1.1.4",
            "titulo": "Isótopos",
            "descripcion": "Átomos del mismo elemento con igual Z pero diferente A y n⁰. Ejemplos: protio, deuterio, tritio; Carbono-12 y Carbono-14.",
            "orden": 4,
            "status": "publicado"
          },
          {
            "id": "qui-estructura-1-1-5",
            "codigo": "1.1.5",
            "titulo": "Iones",
            "descripcion": "Cationes (pérdida de electrones, carga positiva) y aniones (ganancia de electrones, carga negativa).",
            "orden": 5,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "qui-estructura-1-2",
        "codigo": "1.2",
        "titulo": "Configuración Electrónica y Números Cuánticos",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "qui-estructura-1-2-1",
            "codigo": "1.2.1",
            "titulo": "Reglas de distribución electrónica",
            "descripcion": "Principio de Aufbau (regla de las diagonales o del serrucho). Principio de exclusión de Pauli (máximo dos electrones por orbital con espines opuestos). Regla de Hund (máxima multiplicidad: orbitales de igual energía se llenan primero con un electrón cada uno).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "qui-estructura-1-2-2",
            "codigo": "1.2.2",
            "titulo": "Números Cuánticos",
            "descripcion": "Principal (n): nivel de energía (1, 2, 3, …, 7). Azimutal o secundario (l): forma del orbital; subniveles s(0), p(1), d(2), f(3). Magnético (m_l): orientación espacial (de −l a +l). Espín (s o m_s): giro del electrón (+½, −½).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "qui-estructura-1-2-3",
            "codigo": "1.2.3",
            "titulo": "Electrones de valencia",
            "descripcion": "Identificación de los electrones del nivel más externo, responsables de los enlaces químicos.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "qui-estructura-1-3",
        "codigo": "1.3",
        "titulo": "Tabla Periódica y Propiedades Periódicas",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "qui-estructura-1-3-1",
            "codigo": "1.3.1",
            "titulo": "Organización estructural",
            "descripcion": "Periodos (filas = niveles de energía) y grupos/familias (columnas = propiedades similares y misma cantidad de electrones de valencia). Bloques s, p, d, f.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "qui-estructura-1-3-2",
            "codigo": "1.3.2",
            "titulo": "Familias representativas",
            "descripcion": "Metales alcalinos (IA), alcalinotérreos (IIA), halógenos (VIIA) y gases nobles (VIIIA). Diferenciación entre metales, no metales y metaloides.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "qui-estructura-1-3-3",
            "codigo": "1.3.3",
            "titulo": "Propiedades periódicas",
            "descripcion": "Radio atómico (aumenta de arriba a abajo y de derecha a izquierda). Energía de ionización (aumenta de abajo a arriba y de izquierda a derecha). Afinidad electrónica (igual tendencia). Electronegatividad (escala de Pauling; Flúor el más electronegativo, Francio el menos; aumenta de abajo a arriba y de izquierda a derecha).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      }
    ],
    "guideSlug": "quimica"
  },
  {
    "id": "qui-enlace",
    "codigo": "2",
    "titulo": "Enlace Químico y Fuerzas Intermoleculares",
    "orden": 2,
    "status": "publicado",
    "children": [
      {
        "id": "qui-enlace-2-1",
        "codigo": "2.1",
        "titulo": "Enlaces Químicos Intramoleculares",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "qui-enlace-2-1-1",
            "codigo": "2.1.1",
            "titulo": "Regla del Octeto",
            "descripcion": "Tendencia de los átomos a completar 8 electrones en su capa de valencia para adquirir estabilidad de gas noble.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "qui-enlace-2-1-2",
            "codigo": "2.1.2",
            "titulo": "Estructuras de Lewis",
            "descripcion": "Representación de puntos y cruces de los electrones de valencia y los pares enlazantes/solitarios en moléculas simples.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "qui-enlace-2-1-3",
            "codigo": "2.1.3",
            "titulo": "Tipos de enlace según la diferencia de electronegatividad (ΔEN)",
            "descripcion": "Enlace iónico (ΔEN ≥ 1.7): transferencia de electrones de metal a no metal; redes cristalinas; altos puntos de fusión/ebullición; conduce fundido o en solución. Enlace covalente (ΔEN < 1.7): compartición entre no metales — no polar (ΔEN 0 a 0.4, ej. O₂, H₂), polar (ΔEN 0.5 a 1.6, ej. H₂O, HCl), coordinado o dativo (un átomo aporta el par, ej. NH₄⁺). Enlace metálico: cationes y mar de electrones deslocalizados; ductilidad, maleabilidad y conductividad.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "qui-enlace-2-2",
        "codigo": "2.2",
        "titulo": "Fuerzas Intermoleculares",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "qui-enlace-2-2-1",
            "codigo": "2.2.1",
            "titulo": "Definición",
            "descripcion": "Interacciones atractivas entre moléculas independientes; determinan punto de ebullición y solubilidad.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "qui-enlace-2-2-2",
            "codigo": "2.2.2",
            "titulo": "Puentes de Hidrógeno",
            "descripcion": "Fuerza inusualmente fuerte cuando el hidrógeno se enlaza a F, O o N. Explica propiedades anómalas del agua (alto punto de ebullición, densidad del hielo).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "qui-enlace-2-2-3",
            "codigo": "2.2.3",
            "titulo": "Interacciones Dipolo-Dipolo",
            "descripcion": "Atracción entre el extremo positivo de una molécula polar y el extremo negativo de otra.",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "qui-enlace-2-2-4",
            "codigo": "2.2.4",
            "titulo": "Fuerzas de Dispersión de London",
            "descripcion": "Dipolos inducidos temporales presentes en todas las moléculas; críticas en moléculas no polares y gases nobles.",
            "orden": 4,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "qui-nomenclatura",
    "codigo": "3",
    "titulo": "Nomenclatura Química Inorgánica",
    "orden": 3,
    "status": "publicado",
    "children": [
      {
        "id": "qui-nomenclatura-3-1",
        "codigo": "3.1",
        "titulo": "Reglas del Sistema IUPAC y Clásico",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "qui-nomenclatura-3-1-1",
            "codigo": "3.1.1",
            "titulo": "Números de oxidación",
            "descripcion": "Reglas para asignar estados de oxidación: oxígeno suele ser −2, hidrógeno +1, elementos libres valen 0, la suma en compuestos neutros debe dar 0.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "qui-nomenclatura-3-1-2",
            "codigo": "3.1.2",
            "titulo": "Compuestos Binarios",
            "descripcion": "Óxidos básicos (metálicos): metal + oxígeno (ej. CaO, Fe₂O₃). Óxidos ácidos o anhídridos: no metal + oxígeno (ej. CO₂, SO₃). Hidrácidos: H + no metal del grupo VIA o VIIA en solución acuosa (ej. HCl(ac), H₂S(ac)). Sales binarias: metal + no metal (ej. NaCl, FeCl₃).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "qui-nomenclatura-3-1-3",
            "codigo": "3.1.3",
            "titulo": "Compuestos Ternarios",
            "descripcion": "Hidróxidos o bases: metal + ion hidroxilo (OH)⁻ (ej. NaOH, Al(OH)₃). Oxácidos: H + no metal + O (ej. H₂SO₄, HNO₃). Oxisales: metal + no metal + O; derivadas de oxácidos (ej. CaCO₃, CuSO₄).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "qui-reacciones",
    "codigo": "4",
    "titulo": "Reacciones Químicas y Estequiometría",
    "orden": 4,
    "status": "publicado",
    "children": [
      {
        "id": "qui-reacciones-4-1",
        "codigo": "4.1",
        "titulo": "Tipos de Reacciones Químicas",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "qui-reacciones-4-1-1",
            "codigo": "4.1.1",
            "titulo": "Clasificación por reagrupamiento de átomos",
            "descripcion": "Síntesis o adición: A + B → AB. Descomposición o análisis: AB → A + B. Sustitución simple: A + BC → AC + B. Sustitución doble o metátesis: AB + CD → AD + CB.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "qui-reacciones-4-1-2",
            "codigo": "4.1.2",
            "titulo": "Clasificación por cambios energéticos",
            "descripcion": "Endotérmicas (absorben calor, ΔH > 0) y exotérmicas (liberan calor, ΔH < 0).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "qui-reacciones-4-1-3",
            "codigo": "4.1.3",
            "titulo": "Reacciones de Combustión",
            "descripcion": "Hidrocarburo + O₂ → CO₂ + H₂O + energía (combustión completa).",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "qui-reacciones-4-2",
        "codigo": "4.2",
        "titulo": "Balanceo de Ecuaciones Químicas",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "qui-reacciones-4-2-1",
            "codigo": "4.2.1",
            "titulo": "Método por Tanteo",
            "descripcion": "Ajuste de coeficientes estequiométricos por inspección directa. Orden recomendado: metales, no metales, hidrógeno y oxígeno.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "qui-reacciones-4-2-2",
            "codigo": "4.2.2",
            "titulo": "Método Redox (Óxido-Reducción)",
            "descripcion": "Identificación del átomo que se oxida (pierde electrones, aumenta número de oxidación; agente reductor) y del que se reduce (gana electrones, disminuye número de oxidación; agente oxidante). Balanceo por semi-reacciones igualando electrones intercambiados.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "qui-reacciones-4-3",
        "codigo": "4.3",
        "titulo": "Cálculos Estequiométricos",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "qui-reacciones-4-3-1",
            "codigo": "4.3.1",
            "titulo": "Conceptos fundamentales de cantidad",
            "descripcion": "Mol: unidad de cantidad de sustancia (6.022 × 10²³ entidades — Número de Avogadro). Masa molar (M): masa en gramos de un mol (g/mol). Volumen molar: un mol de gas ideal en CNPT (1 atm y 0 °C) ocupa 22.4 L.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "qui-reacciones-4-3-2",
            "codigo": "4.3.2",
            "titulo": "Ley de la Conservación de la Materia (Lavoisier)",
            "descripcion": "La masa total de los reactivos es igual a la masa total de los productos.",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "qui-reacciones-4-3-3",
            "codigo": "4.3.3",
            "titulo": "Relaciones estequiométricas",
            "descripcion": "Relaciones mol-mol, masa-masa y masa-volumen a partir de una ecuación química balanceada.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "qui-soluciones",
    "codigo": "5",
    "titulo": "Soluciones y Propiedades Ácido-Base",
    "orden": 5,
    "status": "publicado",
    "children": [
      {
        "id": "qui-soluciones-5-1",
        "codigo": "5.1",
        "titulo": "Mezclas y Soluciones Acuosas",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "qui-soluciones-5-1-1",
            "codigo": "5.1.1",
            "titulo": "Componentes de una solución",
            "descripcion": "Soluto (fase dispersa, menor cantidad) y disolvente/solvente (fase dispersante, mayor cantidad). El agua como disolvente universal.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "qui-soluciones-5-1-2",
            "codigo": "5.1.2",
            "titulo": "Soluciones según grado de saturación",
            "descripcion": "Diluidas, concentradas, saturadas (máxima cantidad de soluto a una temperatura) y sobresaturadas (sistema inestable con exceso de soluto logrado por calentamiento).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "qui-soluciones-5-1-3",
            "codigo": "5.1.3",
            "titulo": "Unidades de concentración cuantitativas",
            "descripcion": "% masa = (masa de soluto / masa total de solución) × 100. % volumen = (volumen de soluto / volumen total de solución) × 100. Molaridad (M) = moles de soluto (n) / litros de solución (V); n = masa / masa molar.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "qui-soluciones-5-2",
        "codigo": "5.2",
        "titulo": "Teorías y Propiedades de Ácidos y Bases",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "qui-soluciones-5-2-1",
            "codigo": "5.2.1",
            "titulo": "Modelos Teóricos",
            "descripcion": "Arrhenius: ácido libera H⁺ en solución acuosa; base libera OH⁻. Brønsted-Lowry: ácido donador de H⁺; base aceptor de H⁺; pares conjugados ácido/base. Lewis: ácido acepta par de electrones; base dona par de electrones.",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "qui-soluciones-5-2-2",
            "codigo": "5.2.2",
            "titulo": "Escala de pH y pOH",
            "descripcion": "pH = −log[H⁺]. A 25 °C: pH + pOH = 14. pH < 7 (ácido), pH = 7 (neutro), pH > 7 (básico o alcalino). Problemas con potencias de 10 (ej. [H⁺] = 1 × 10⁻³ M → pH = 3).",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "qui-soluciones-5-2-3",
            "codigo": "5.2.3",
            "titulo": "Reacciones de Neutralización",
            "descripcion": "Ácido + base → sal + agua.",
            "orden": 3,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "qui-organica",
    "codigo": "6",
    "titulo": "Química Orgánica (Química del Carbono)",
    "orden": 6,
    "status": "publicado",
    "children": [
      {
        "id": "qui-organica-6-1",
        "codigo": "6.1",
        "titulo": "El Átomo de Carbono y sus Propiedades",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "qui-organica-6-1-1",
            "codigo": "6.1.1",
            "titulo": "Tetravalencia",
            "descripcion": "Capacidad del carbono de formar 4 enlaces covalentes estables. Propiedad de concatenación (cadenas lineales, ramificadas o cíclicas).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "qui-organica-6-1-2",
            "codigo": "6.1.2",
            "titulo": "Hibridación de orbitales",
            "descripcion": "sp³: enlaces sencillos (σ), geometría tetraédrica, ángulos 109.5° (alcanos). sp²: doble enlace (σ + π), geometría trigonal plana, 120° (alquenos). sp: triple enlace (σ + 2π), geometría lineal, 180° (alquinos).",
            "orden": 2,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "qui-organica-6-2",
        "codigo": "6.2",
        "titulo": "Hidrocarburos",
        "orden": 2,
        "status": "publicado",
        "children": [
          {
            "id": "qui-organica-6-2-1",
            "codigo": "6.2.1",
            "titulo": "Alcanos o Parafinas",
            "descripcion": "Hidrocarburos saturados (CₙH₂ₙ₊₂). Nomenclatura IUPAC con prefijos (met-, et-, prop-, but-, pent-, etc.) y terminación «-ano». Radicales alquilo (metil, etil, isopropil).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "qui-organica-6-2-2",
            "codigo": "6.2.2",
            "titulo": "Alquenos u Olefinas",
            "descripcion": "Hidrocarburos insaturados con doble enlace (CₙH₂ₙ). Terminación «-eno».",
            "orden": 2,
            "status": "publicado"
          },
          {
            "id": "qui-organica-6-2-3",
            "codigo": "6.2.3",
            "titulo": "Alquinos o Acetilenos",
            "descripcion": "Hidrocarburos insaturados con triple enlace (CₙH₂ₙ₋₂). Terminación «-ino».",
            "orden": 3,
            "status": "publicado"
          },
          {
            "id": "qui-organica-6-2-4",
            "codigo": "6.2.4",
            "titulo": "Hidrocarburos Aromáticos",
            "descripcion": "Basados en el anillo de benceno (C₆H₆) con electrones deslocalizados (resonancia). Bencenos monosustituidos y disustituidos (orto-, meta-, para-).",
            "orden": 4,
            "status": "publicado"
          }
        ]
      },
      {
        "id": "qui-organica-6-3",
        "codigo": "6.3",
        "titulo": "Grupos Funcionales",
        "orden": 3,
        "status": "publicado",
        "children": [
          {
            "id": "qui-organica-6-3-1",
            "codigo": "6.3.1",
            "titulo": "Identificación por estructura",
            "descripcion": "Alcoholes: R-OH. Éteres: R-O-R′. Aldehídos: R-CHO (carbonilo terminal). Cetonas: R-CO-R′ (carbonilo intermedio). Ácidos carboxílicos: R-COOH. Ésteres: R-COO-R′ (aromas frutales). Aminas: R-NH₂, R-NHR′. Amidas: R-CO-NH₂.",
            "orden": 1,
            "status": "publicado"
          }
        ]
      }
    ]
  },
  {
    "id": "qui-ambiente",
    "codigo": "7",
    "titulo": "Química y Medio Ambiente",
    "orden": 7,
    "status": "publicado",
    "children": [
      {
        "id": "qui-ambiente-7-1",
        "codigo": "7.1",
        "titulo": "Contaminación Ambiental",
        "orden": 1,
        "status": "publicado",
        "children": [
          {
            "id": "qui-ambiente-7-1-1",
            "codigo": "7.1.1",
            "titulo": "El Aire",
            "descripcion": "Composición normal de la atmósfera (78% N₂, 21% O₂). Contaminantes primarios (CO, NOₓ, SO₂, hidrocarburos no quemados) y secundarios (ozono troposférico O₃, H₂SO₄ de la lluvia ácida).",
            "orden": 1,
            "status": "publicado"
          },
          {
            "id": "qui-ambiente-7-1-2",
            "codigo": "7.1.2",
            "titulo": "Fenómenos globales",
            "descripcion": "Efecto invernadero: retención de calor por CO₂, CH₄ y vapor de agua. Inversión térmica: estancamiento de contaminantes por aire frío bajo capa de aire caliente. Lluvia ácida: disolución de óxidos de azufre y nitrógeno en agua de lluvia, pH por debajo de 5.6.",
            "orden": 2,
            "status": "publicado"
          }
        ]
      }
    ]
  }
] as UnamTemarioTopic[];
