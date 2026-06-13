import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export async function GET() {
  if (!isSupabaseConfigured) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        message: 'Falta .env.local con NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY',
      },
      { status: 503 }
    );
  }

  try {
    const supabase = createServerSupabaseClient();
    const { count, error } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json(
        { ok: false, configured: true, message: error.message },
        { status: 503 }
      );
    }

    return NextResponse.json({
      ok: true,
      configured: true,
      questionsCount: count ?? 0,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Error desconocido';
    return NextResponse.json({ ok: false, configured: false, message }, { status: 503 });
  }
}
