import { NextResponse } from 'next/server';
import { requireAuthenticatedSupabaseUser } from '@/lib/supabase/users';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { DEFAULT_EXAM_TOKENS } from '@/types/exam-tokens';

export const dynamic = 'force-dynamic';

export async function POST() {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  const current = authResult.user.exam_tokens ?? DEFAULT_EXAM_TOKENS;
  if (current <= 0) {
    return NextResponse.json({ error: 'Sin créditos disponibles', balance: 0 }, { status: 402 });
  }

  const next = current - 1;
  const supabase = createServerSupabaseClient();
  const { error } = await supabase
    .from('users')
    .update({ exam_tokens: next })
    .eq('id', authResult.user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ balance: next, consumed: 1 });
}

export async function GET() {
  const authResult = await requireAuthenticatedSupabaseUser();
  if ('error' in authResult) return authResult.error;

  return NextResponse.json({
    balance: authResult.user.exam_tokens ?? DEFAULT_EXAM_TOKENS,
  });
}
