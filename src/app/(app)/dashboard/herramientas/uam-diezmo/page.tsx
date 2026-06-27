import { UamDiezmoSimulator } from '@/components/tools/UamDiezmoSimulator';
import { ToolPageShell } from '@/components/tools/ToolPageShell';
import { STUDY_TOOLS_BY_SLUG } from '@/data/study-tools/tools-meta';

export default function UamDiezmoToolPage() {
  const tool = STUDY_TOOLS_BY_SLUG['uam-diezmo'];
  return (
    <ToolPageShell title={tool.title} description={tool.description} tag={tool.tag}>
      <UamDiezmoSimulator />
    </ToolPageShell>
  );
}
