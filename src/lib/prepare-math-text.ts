/** Símbolos Unicode → LaTeX para KaTeX (solo fórmulas aisladas). */
const UNICODE_TO_LATEX: [RegExp, string][] = [
  [/∫ₐᵇ/g, '\\int_{a}^{b}'],
  [/∫/g, '\\int'],
  [/π/g, '\\pi'],
  [/Δ/g, '\\Delta'],
  [/θ/g, '\\theta'],
  [/±/g, '\\pm'],
  [/∓/g, '\\mp'],
  [/·/g, '\\cdot'],
  [/≤/g, '\\leq'],
  [/≥/g, '\\geq'],
  [/≠/g, '\\neq'],
  [/∞/g, '\\infty'],
  [/²/g, '^2'],
  [/³/g, '^3'],
  [/ⁿ/g, '^n'],
  [/₀/g, '_0'],
  [/₁/g, '_1'],
  [/₂/g, '_2'],
  [/ₐ/g, '_a'],
  [/ᵇ/g, '^b'],
  [/ˣ/g, '^x'],
  [/ᵃ/g, '^a'],
  [/→/g, '\\to'],
  [/∘/g, '\\circ'],
];

/** Fragmento que parece fórmula aislada (no una oración entera). */
function isIsolatedFormula(fragment: string): boolean {
  const t = fragment.trim();
  if (t.length < 2 || t.length > 72) return false;
  if (/^(si|cuando|para|con|los|las|del|una|dos|tres|y|o)\b/i.test(t)) return false;
  return (
    (/[=]/.test(t) && /[²³√πΔθ±^()a-zA-Z0-9]/.test(t)) ||
    /^[a-zA-Z]\([^)]+\)\s*[=±]/.test(t) ||
    /^[Δθπ∫]/.test(t)
  );
}

export function toLatex(fragment: string): string {
  let s = fragment.trim();
  s = s.replace(/√\(\(([^)]+)\)/g, '\\sqrt{$1}');
  s = s.replace(/√\(([^)]+)\)/g, '\\sqrt{$1}');
  for (const [pattern, replacement] of UNICODE_TO_LATEX) {
    s = s.replace(pattern, replacement);
  }
  if (/√/.test(s)) s = s.replace(/√/g, '\\sqrt');
  s = s.replace(/([a-zA-Z])₂/g, '$1_2').replace(/([a-zA-Z])₁/g, '$1_1');
  s = s.replace(/\bsen\(/g, '\\sin(').replace(/\bcos\(/g, '\\cos(').replace(/\btan\(/g, '\\tan(');
  s = s.replace(/\bcot\(/g, '\\cot(').replace(/\bsec\(/g, '\\sec(').replace(/\bcsc\(/g, '\\csc(');
  s = s.replace(/\bln\(/g, '\\ln(');
  return s;
}

/**
 * Temario: solo fórmulas cortas en línea ($...$). El resto queda como texto normal.
 * Evita bloques display que rompen la lectura en listas.
 */
export function prepareTemarioMath(text: string): string {
  if (!text.trim()) return text;

  // Fórmulas entre paréntesis o con = cortas
  return text.replace(
    /(\([^)]{1,40}\)(?:\^?[²³])?(?:\s*[=±+\-]\s*[^,;.]{1,50})?|[a-zA-ZΔ][a-zA-Z0-9()_²³√πΔθ]*\s*=\s*[^,;.]{2,50})/g,
    (match) => {
      if (!isIsolatedFormula(match)) return match;
      return `$${toLatex(match)}$`;
    }
  );
}

/** Guías / quiz: el contenido ya trae $ y $$ — no tocar. */
export function prepareMathText(text: string): string {
  return text;
}

export function textLikelyHasMath(text: string): boolean {
  return /[=²³√∫πΔθ±^\\]|\$[^$]+\$|\b[fgh]\s*\(/.test(text);
}
