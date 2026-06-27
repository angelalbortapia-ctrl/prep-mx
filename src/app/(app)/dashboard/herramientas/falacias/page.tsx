import { FallaciesDictionary } from '@/components/tools/FallaciesDictionary';
import { ToolPageShell } from '@/components/tools/ToolPageShell';
import { STUDY_TOOLS_BY_SLUG } from '@/data/study-tools/tools-meta';

export default function FalaciasToolPage() {
  const tool = STUDY_TOOLS_BY_SLUG.falacias;
  return (
    <ToolPageShell title={tool.title} description={tool.description} tag={tool.tag}>
      <FallaciesDictionary />
    </ToolPageShell>
  );
}
