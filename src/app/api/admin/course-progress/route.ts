import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { fetchCourseProgressSummaries } from '@/lib/supabase/lessons-progress';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

/** Resumen del curso guiado para seguimiento de alumnos (requiere sesión Clerk). */
export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json({ students: [], synced: false });
  }

  try {
    const supabase = createServerSupabaseClient();
    const students = await fetchCourseProgressSummaries(supabase);
    return NextResponse.json({ students, synced: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al cargar resumen';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
