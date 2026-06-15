import { NextResponse } from 'next/server';
import { requireAuthenticatedSupabaseUser } from '@/lib/supabase/users';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { DbBookmarkRow } from '@/types/database';

export const dynamic = 'force-dynamic';

function mapBookmark(row: DbBookmarkRow) {
  return {
    questionId: row.question_id,
    materia: row.materia,
    tema: row.tema,
    savedAt: row.saved_at,
  };
}

export async function GET() {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('user_bookmarks')
    .select('*')
    .eq('user_id', authResult.user.id)
    .order('saved_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    bookmarks: (data as DbBookmarkRow[]).map(mapBookmark),
  });
}

export async function POST(req: Request) {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  const body = (await req.json()) as {
    questionId?: string;
    materia?: string;
    tema?: string;
  };

  if (!body.questionId || !body.materia || !body.tema) {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('user_bookmarks')
    .upsert(
      {
        user_id: authResult.user.id,
        question_id: body.questionId,
        materia: body.materia,
        tema: body.tema,
        saved_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,question_id' }
    )
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bookmark: mapBookmark(data as DbBookmarkRow) });
}

export async function DELETE(req: Request) {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  const body = (await req.json()) as { questionId?: string };
  if (!body.questionId) {
    return NextResponse.json({ error: 'questionId requerido' }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();
  const { error } = await supabase
    .from('user_bookmarks')
    .delete()
    .eq('user_id', authResult.user.id)
    .eq('question_id', body.questionId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
