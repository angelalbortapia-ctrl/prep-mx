import { auth, clerkClient } from '@clerk/nextjs/server';
import type { DbUserRow } from '@/types/database';
import { isSupabaseConfigured } from './client';
import { createServerSupabaseClient } from './server';

export async function getSupabaseUserByClerkId(clerkId: string): Promise<DbUserRow | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', clerkId)
    .maybeSingle();
  if (error || !data) return null;
  return data as DbUserRow;
}

export async function requireAuthenticatedSupabaseUser(): Promise<
  { clerkId: string; user: DbUserRow } | { error: Response }
> {
  const { userId } = await auth();
  if (!userId) {
    return { error: new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401 }) };
  }

  if (!isSupabaseConfigured) {
    return {
      error: new Response(JSON.stringify({ error: 'Supabase no configurado' }), { status: 503 }),
    };
  }

  let user = await getSupabaseUserByClerkId(userId);
  if (!user) {
    user = await syncClerkUserToSupabase(userId);
  }
  if (!user) {
    return {
      error: new Response(JSON.stringify({ error: 'Perfil no encontrado' }), { status: 404 }),
    };
  }

  return { clerkId: userId, user };
}

/** Upsert del usuario Clerk → tabla `users` de Supabase. */
export async function syncClerkUserToSupabase(clerkId: string): Promise<DbUserRow | null> {
  if (!isSupabaseConfigured) return null;

  const client = await clerkClient();
  const clerkUser = await client.users.getUser(clerkId);
  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) return null;

  const meta = clerkUser.publicMetadata as Record<string, unknown>;
  const supabase = createServerSupabaseClient();

  const payload = {
    clerk_id: clerkId,
    email,
    full_name: typeof meta.fullName === 'string' ? meta.fullName : clerkUser.fullName ?? null,
    exam_target: typeof meta.examTarget === 'string' ? meta.examTarget : null,
    exam_date: typeof meta.examDate === 'string' ? meta.examDate : null,
    status: 'free_tier',
  };

  const { data, error } = await supabase
    .from('users')
    .upsert(payload, { onConflict: 'clerk_id' })
    .select('*')
    .single();

  if (error || !data) return null;
  return data as DbUserRow;
}
