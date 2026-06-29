import { NextResponse } from 'next/server';
import { buildSm2DemoEvents, SM2_DEMO_QUESTION } from '@/lib/sm2-demo';

export const dynamic = 'force-static';
export const revalidate = 86400;

/** Demo pública del algoritmo SM-2 (misma lógica que /api/study/sm2-summary en producción). */
export async function GET() {
  const events = buildSm2DemoEvents(42);

  return NextResponse.json({
    algorithm: 'SM-2',
    implementation: 'src/lib/sm2.ts',
    sampleQuestion: SM2_DEMO_QUESTION,
    events,
    seoNote:
      'Trayectoria educativa generada con calcularProximaRevision(); los repasos reales del alumno viven en /api/study/sm2-summary.',
  });
}
