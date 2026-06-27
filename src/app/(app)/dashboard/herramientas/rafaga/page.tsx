import { BurstQuiz } from '@/components/tools/BurstQuiz';
import { ToolPageShell } from '@/components/tools/ToolPageShell';
import { STUDY_TOOLS_BY_SLUG } from '@/data/study-tools/tools-meta';

export default function RafagaToolPage() {
  const tool = STUDY_TOOLS_BY_SLUG.rafaga;
  return (
    <ToolPageShell title={tool.title} description={tool.description} tag={tool.tag}>
      <BurstQuiz />
    </ToolPageShell>
  );
}
