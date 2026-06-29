/**
 * Valida el banco estático del simulador gratis: esquema, KaTeX y claves de respuesta.
 * Uso: npm run validate:freemium
 */
import { getFreemiumPoolAll } from '../src/lib/freemium-questions';
import { validateQuestionIntegrity } from '../src/lib/validate-question';
import { validateKatexInText, type QuestionValidationIssue } from './question-import-schema';

function main() {
  const pool = getFreemiumPoolAll();
  const issues: QuestionValidationIssue[] = [];
  const mathPhysicsIds: string[] = [];

  pool.forEach((q, index) => {
    const materia = q.materia.toLowerCase();
    if (materia.includes('matematic') || materia.includes('fisica')) {
      mathPhysicsIds.push(q.id);
    }

    for (const issue of validateQuestionIntegrity(q)) {
      issues.push({ index, field: issue.field, message: `[${issue.id}] ${issue.message}` });
    }

    const fields: Array<[string, string]> = [
      ['pregunta', q.pregunta],
      ['explicacion', q.explicacion],
      ...q.opciones.map((o) => [`opciones.${o.id}`, o.texto] as [string, string]),
    ];
    for (const [field, text] of fields) {
      for (const msg of validateKatexInText(text, field)) {
        issues.push({ index, field, message: `[${q.id}] ${msg}` });
      }
    }
  });

  console.log(`\n📋 Banco freemium: ${pool.length} preguntas únicas`);
  console.log(`   Matemáticas / Física: ${mathPhysicsIds.length} (${mathPhysicsIds.join(', ')})\n`);

  if (issues.length) {
    console.error(`⛔ ${issues.length} problema(s):\n`);
    for (const i of issues) {
      const q = pool[i.index];
      console.error(`  #${i.index + 1} [${q?.id ?? '?'}] ${i.field}: ${i.message}`);
    }
    process.exit(1);
  }

  console.log('✅ Esquema, claves de respuesta y KaTeX OK en todo el banco freemium.');
  console.log('   Tip: abre /simulador-gratis en móvil y revisa fracciones en opciones A–D.\n');
}

main();
