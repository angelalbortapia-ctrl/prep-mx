import { FormulaRescueAccordion } from '@/components/tools/FormulaRescueAccordion';
import { ToolPageShell } from '@/components/tools/ToolPageShell';
import { STUDY_TOOLS_BY_SLUG } from '@/data/study-tools/tools-meta';

export default function FormulasToolPage() {
  const tool = STUDY_TOOLS_BY_SLUG.formulas;
  return (
    <ToolPageShell title={tool.title} description={tool.description} tag={tool.tag}>
      <FormulaRescueAccordion />
    </ToolPageShell>
  );
}
