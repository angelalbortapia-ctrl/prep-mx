import { StudyZoneView } from '@/components/study/StudyZoneView';
import {
  getCachedStudyMaterias,
  STATIC_CATALOG_REVALIDATE_SECONDS,
} from '@/lib/cache/static-catalog';

export const revalidate = STATIC_CATALOG_REVALIDATE_SECONDS;

export default async function EstudioPage() {
  const materias = await getCachedStudyMaterias();

  return (
    <div className="pb-24 md:pb-8">
      <StudyZoneView materias={materias} />
    </div>
  );
}
