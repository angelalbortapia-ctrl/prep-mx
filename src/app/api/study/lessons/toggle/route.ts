import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import {
  applyLessonToggle,
  type LessonToggleInput,
} from '@/lib/supabase/lessons-progress';
import { requireAuthenticatedSupabaseUser } from '@/lib/supabase/users';
import type { CourseProgress } from '@/lib/course-progress';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  let body: LessonToggleInput;
  try {
    body = (await req.json()) as LessonToggleInput;
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  if (!body.reset && !body.importProgress && !body.lessonId) {
    return NextResponse.json({ error: 'lessonId requerido' }, { status: 400 });
  }

  try {
    const supabase = createServerSupabaseClient();
    const progress = await applyLessonToggle(supabase, authResult.user.id, body);
    return NextResponse.json({ progress, synced: true } satisfies {
      progress: CourseProgress;
      synced: boolean;
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al guardar progreso';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
