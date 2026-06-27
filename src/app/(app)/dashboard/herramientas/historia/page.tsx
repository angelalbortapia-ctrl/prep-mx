import { HistoryTimeline } from '@/components/tools/HistoryTimeline';
import { ToolPageShell } from '@/components/tools/ToolPageShell';
import { STUDY_TOOLS_BY_SLUG } from '@/data/study-tools/tools-meta';

export default function HistoriaToolPage() {
  const tool = STUDY_TOOLS_BY_SLUG.historia;
  return (
    <ToolPageShell title={tool.title} description={tool.description} tag={tool.tag}>
      <HistoryTimeline />
    </ToolPageShell>
  );
}
