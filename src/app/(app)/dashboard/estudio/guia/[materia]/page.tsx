import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StudyCourseView } from '@/components/study/StudyCourseView';
import { getStudyGuide, studyGuideSlugs } from '@/data/study-guides';

interface PageProps {
  params: { materia: string };
}

export function generateStaticParams(): Array<{ materia: string }> {
  return studyGuideSlugs.map((materia) => ({ materia }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const guide = getStudyGuide(params.materia);
  if (!guide) return { title: 'Guía no encontrada · PrepMX' };
  return {
    title: `${guide.titulo} · Guías de estudio · PrepMX`,
    description: guide.resumen,
  };
}

export default function EstudioGuiaPage({ params }: PageProps) {
  const guide = getStudyGuide(params.materia);
  if (!guide) notFound();

  return <StudyCourseView guide={guide} />;
}
