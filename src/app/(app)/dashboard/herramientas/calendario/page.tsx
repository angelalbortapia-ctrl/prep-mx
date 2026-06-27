import { SmartCalendarGenerator } from '@/components/tools/SmartCalendarGenerator';
import { ToolPageShell } from '@/components/tools/ToolPageShell';
import { STUDY_TOOLS_BY_SLUG } from '@/data/study-tools/tools-meta';

export default function CalendarioToolPage() {
  const tool = STUDY_TOOLS_BY_SLUG.calendario;
  return (
    <ToolPageShell title={tool.title} description={tool.description} tag={tool.tag}>
      <SmartCalendarGenerator />
    </ToolPageShell>
  );
}
