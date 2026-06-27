import type { UnamTemarioTopic } from './unam-temario';

/** Temario ultra-detallado de Química — Examen IPN. */
export const IPN_QUIMICA_TOPICS: UnamTemarioTopic[] = [
  {
    "id": "ipn-quim-3-1",
    "codigo": "3.1",
    "titulo": "Estructura de la materia y propiedades periódicas",
    "orden": 1,
    "status": "publicado",
    "children": [
      {
        "id": "ipn-quim-3-1-1",
        "codigo": "3.1.1",
        "titulo": "Números cuánticos avanzados",
        "orden": 1,
        "status": "publicado",
        "descripcion": "Determinación exacta de los 4 números cuánticos (n, l, m_l, s) para el electrón diferencial (el último electrón que entra en la configuración) de cualquier elemento o ion, incluyendo excepciones de llenado del bloque d (como el Cromo Z=24 y Cobre Z=29 que transfieren un electrón del orbital s al d)."
      },
      {
        "id": "ipn-quim-3-1-2",
        "codigo": "3.1.2",
        "titulo": "Configuración kernel",
        "orden": 2,
        "status": "publicado",
        "descripcion": "Uso del gas noble anterior entre corchetes para abreviar configuraciones de elementos pesados y determinar con rapidez el periodo, bloque y grupo de elementos de transición (d) y transición interna (f)."
      },
      {
        "id": "ipn-quim-3-1-3",
        "codigo": "3.1.3",
        "titulo": "Tendencias periódicas e isótopos",
        "orden": 3,
        "status": "publicado",
        "descripcion": "Predicción cualitativa de qué elemento es más electronegativo, tiene mayor energía de ionización o menor radio atómico comparando su posición en la tabla. Cálculo de la masa atómica promedio ponderada de un elemento a partir de la abundancia porcentual de sus isótopos estables en la naturaleza."
      }
    ]
  },
  {
    "id": "ipn-quim-3-2",
    "codigo": "3.2",
    "titulo": "Enlace químico y nomenclatura inorgánica",
    "orden": 2,
    "status": "publicado",
    "children": [
      {
        "id": "ipn-quim-3-2-1",
        "codigo": "3.2.1",
        "titulo": "Geometría molecular y fuerzas intermoleculares",
        "orden": 1,
        "status": "publicado",
        "descripcion": "Relación entre la estructura de Lewis, la hibridación del átomo central y la geometría tridimensional de la molécula según la teoría de repulsión de pares de electrones de valencia (lineal, trigonal plana, tetraédrica, piramidal trigonal, angular). Identificación de la polaridad neta de la molécula a partir de sus momentos dipolares vectoriales para predecir si presenta fuerzas de London, dipolo-dipolo o puentes de hidrógeno."
      },
      {
        "id": "ipn-quim-3-2-2",
        "codigo": "3.2.2",
        "titulo": "Nomenclatura sistemática, Stock y tradicional",
        "orden": 2,
        "status": "publicado",
        "descripcion": "Dominio absoluto de las tres nomenclaturas para compuestos complejos: sales ácidas (ej. bicarbonato de sodio / hidrógenocarbonato de sodio), oxisales polivalentes (ej. sulfato ferroso, nitrato de amonio) y oxácidos usando prefijos y sufijos (hipo-oso, -oso, -ico, per-ico)."
      }
    ]
  },
  {
    "id": "ipn-quim-3-3",
    "codigo": "3.3",
    "titulo": "Reacciones químicas y estequiometría avanzada",
    "orden": 3,
    "status": "publicado",
    "children": [
      {
        "id": "ipn-quim-3-3-1",
        "codigo": "3.3.1",
        "titulo": "Balanceo por óxido-reducción (Redox)",
        "orden": 1,
        "status": "publicado",
        "descripcion": "Asignación estricta de números de oxidación; planteamiento de semi-reacciones de oxidación y reducción; balanceo de electrones intercambiados multiplicando por factores cruzados; transferencia de coeficientes a la ecuación global y ajuste final por tanteo."
      },
      {
        "id": "ipn-quim-3-3-2",
        "codigo": "3.3.2",
        "titulo": "Reactivo limitante y rendimiento (filtro del IPN)",
        "orden": 2,
        "status": "publicado",
        "descripcion": "Reactivos matemáticos donde te dan las masas iniciales de dos reactivos distintos. Pasos obligatorios: (1) convertir gramos a moles dividiendo entre la masa molar de cada sustancia; (2) dividir los moles entre su coeficiente estequiométrico — el valor menor identifica al reactivo limitante; (3) usar solo los moles del reactivo limitante para calcular la masa teórica del producto; (4) calcular el rendimiento porcentual: % Rendimiento = (Masa real / Masa teórica) × 100."
      }
    ]
  },
  {
    "id": "ipn-quim-3-4",
    "codigo": "3.4",
    "titulo": "Química orgánica y soluciones",
    "orden": 4,
    "status": "publicado",
    "children": [
      {
        "id": "ipn-quim-3-4-1",
        "codigo": "3.4.1",
        "titulo": "Nomenclatura IUPAC de hidrocarburos complejos",
        "orden": 1,
        "status": "publicado",
        "descripcion": "Identificación de la cadena principal más larga que contenga las insaturaciones (dobles o triples enlaces); numeración dando prioridad a los carbonos con dobles/triples enlaces y luego a las ramificaciones. Clasificación y orden alfabético de radicales alquilo complejos (isopropil, sec-butil, tert-butil, isobutil)."
      },
      {
        "id": "ipn-quim-3-4-2",
        "codigo": "3.4.2",
        "titulo": "Molaridad en disoluciones",
        "orden": 2,
        "status": "publicado",
        "descripcion": "Operaciones numéricas de concentración para calcular la Molaridad (M = masa de soluto / (Masa molar × Litros de disolución)). Reactivos de dilución de soluciones utilizando la fórmula C₁·V₁ = C₂·V₂."
      }
    ]
  }
] as UnamTemarioTopic[];
