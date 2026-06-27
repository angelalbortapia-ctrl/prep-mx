import { CompatibilityCalculator } from '@/components/tools/CompatibilityCalculator';
import { ToolPageShell } from '@/components/tools/ToolPageShell';
import { STUDY_TOOLS_BY_SLUG } from '@/data/study-tools/tools-meta';

export default function CompatibilidadToolPage() {
  const tool = STUDY_TOOLS_BY_SLUG.compatibilidad;
  return (
    <ToolPageShell title={tool.title} description={tool.description} tag={tool.tag}>
      <CompatibilityCalculator />
    </ToolPageShell>
  );
}
