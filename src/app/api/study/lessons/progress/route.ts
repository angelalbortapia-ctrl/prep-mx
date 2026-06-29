import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { fetchCourseProgress } from '@/lib/supabase/lessons-progress';
import { requireAuthenticatedSupabaseUser } from '@/lib/supabase/users';

export const dynamic = 'force-dynamic';

export async function GET() {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  try {
    const supabase = createServerSupabaseClient();
    const progress = await fetchCourseProgress(supabase, authResult.user.id);
    return NextResponse.json({ progress, synced: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al cargar progreso';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
