import { StudyZoneView } from '@/components/study/StudyZoneView';
import { getStudyMaterias } from '@/data/study-materias';

export const dynamic = 'force-dynamic';

export default function EstudioPage() {
  const materias = getStudyMaterias();

  return (
    <div className="pb-24 md:pb-8">
      <StudyZoneView materias={materias} />
    </div>
  );
}
