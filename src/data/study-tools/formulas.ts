export interface FormulaVariable {
  symbol: string;
  meaning: string;
  unit: string;
}

export interface FormulaEntry {
  id: string;
  category: 'fisica' | 'quimica';
  name: string;
  latex: string;
  plain: string;
  variables: FormulaVariable[];
  trap: string;
  whenToUse: string;
}

export const RESCUE_FORMULAS: FormulaEntry[] = [
  {
    id: 'segunda-ley-newton',
    category: 'fisica',
    name: 'Segunda ley de Newton',
    latex: 'F = m \\cdot a',
    plain: 'F = m · a',
    variables: [
      { symbol: 'F', meaning: 'Fuerza neta', unit: 'N (newtons)' },
      { symbol: 'm', meaning: 'Masa', unit: 'kg' },
      { symbol: 'a', meaning: 'Aceleración', unit: 'm/s²' },
    ],
    trap: 'Despeje trampa: a = F/m. Si F se duplica y m es constante, a se duplica (no confundir con peso P = mg).',
    whenToUse: 'Dinámica lineal, planos inclinados, fuerza resultante.',
  },
  {
    id: 'energia-cinetica',
    category: 'fisica',
    name: 'Energía cinética',
    latex: 'E_k = \\frac{1}{2} m v^2',
    plain: 'Ek = ½ m v²',
    variables: [
      { symbol: 'Ek', meaning: 'Energía cinética', unit: 'J (joules)' },
      { symbol: 'm', meaning: 'Masa', unit: 'kg' },
      { symbol: 'v', meaning: 'Velocidad', unit: 'm/s' },
    ],
    trap: 'La v va al cuadrado: duplicar velocidad cuadruplica Ek. Convierte km/h → m/s antes de sustituir.',
    whenToUse: 'Conservación de energía, choques, trabajo-energía.',
  },
  {
    id: 'ley-ohm',
    category: 'fisica',
    name: 'Ley de Ohm',
    latex: 'V = I \\cdot R',
    plain: 'V = I · R',
    variables: [
      { symbol: 'V', meaning: 'Diferencia de potencial', unit: 'V (volts)' },
      { symbol: 'I', meaning: 'Corriente', unit: 'A (amperes)' },
      { symbol: 'R', meaning: 'Resistencia', unit: 'Ω (ohmios)' },
    ],
    trap: 'En circuitos en serie R suma; en paralelo 1/R = Σ(1/Ri). No mezcles fórmulas sin el diagrama.',
    whenToUse: 'Circuitos DC, caída de voltaje, resistencias equivalentes.',
  },
  {
    id: 'molaridad',
    category: 'quimica',
    name: 'Molaridad',
    latex: 'M = \\frac{n}{V}',
    plain: 'M = n / V',
    variables: [
      { symbol: 'M', meaning: 'Concentración molar', unit: 'mol/L' },
      { symbol: 'n', meaning: 'Moles de soluto', unit: 'mol' },
      { symbol: 'V', meaning: 'Volumen de solución', unit: 'L (litros)' },
    ],
    trap: 'V en litros, no mL. Si dan mL, divide entre 1000 antes de despejar n = M·V.',
    whenToUse: 'Diluciones, estequiometría en solución, titulaciones.',
  },
  {
    id: 'densidad',
    category: 'quimica',
    name: 'Densidad',
    latex: '\\rho = \\frac{m}{V}',
    plain: 'ρ = m / V',
    variables: [
      { symbol: 'ρ', meaning: 'Densidad', unit: 'g/mL o kg/m³' },
      { symbol: 'm', meaning: 'Masa', unit: 'g o kg (coherente con V)' },
      { symbol: 'V', meaning: 'Volumen', unit: 'mL o m³' },
    ],
    trap: 'El examen mezcla g/mL con kg/L (iguales numéricamente). Unifica unidades antes de despejar.',
    whenToUse: 'Mezclas, identificación de sustancias, flotación.',
  },
  {
    id: 'gas-ideal',
    category: 'quimica',
    name: 'Ley de gases ideales',
    latex: 'P V = n R T',
    plain: 'PV = nRT',
    variables: [
      { symbol: 'P', meaning: 'Presión', unit: 'atm o Pa' },
      { symbol: 'V', meaning: 'Volumen', unit: 'L o m³' },
      { symbol: 'n', meaning: 'Moles', unit: 'mol' },
      { symbol: 'R', meaning: 'Constante', unit: '0.082 L·atm/mol·K' },
      { symbol: 'T', meaning: 'Temperatura absoluta', unit: 'K (°C + 273)' },
    ],
    trap: 'T siempre en Kelvin. Si olvidas convertir °C, la respuesta sale 273 veces mal.',
    whenToUse: 'Gases a presión/volumen variable, estequiometría gaseosa.',
  },
  {
    id: 'velocidad',
    category: 'fisica',
    name: 'Velocidad media',
    latex: 'v = \\frac{d}{t}',
    plain: 'v = d / t',
    variables: [
      { symbol: 'v', meaning: 'Velocidad', unit: 'm/s' },
      { symbol: 'd', meaning: 'Distancia o desplazamiento', unit: 'm' },
      { symbol: 't', meaning: 'Tiempo', unit: 's' },
    ],
    trap: 'MRU vs acelerado: esta fórmula es media. Con aceleración usa v = v₀ + at o ecuaciones cinemáticas.',
    whenToUse: 'Movimiento rectilíneo uniforme, tiempos de viaje.',
  },
];
