import { createServerSupabaseClient } from '@/lib/supabase/server';
import { syncClerkUserToSupabase } from '@/lib/supabase/users';
import type { PremiumScope } from './config';

export interface PremiumSyncResult {
  ok: boolean;
  clerkId?: string;
  email?: string;
  rowsUpdated: number;
  error?: string;
  retriedSync?: boolean;
}

async function updatePremiumByClerkId(
  clerkId: string,
  scope: PremiumScope,
  stripeCustomerId?: string
): Promise<PremiumSyncResult> {
  const supabase = createServerSupabaseClient();
  const payload = {
    subscription_status: 'active',
    premium_scope: scope,
    status: 'premium',
    is_premium: true,
    stripe_customer_id: stripeCustomerId ?? null,
  };

  let { data, error } = await supabase
    .from('users')
    .update(payload)
    .eq('clerk_id', clerkId)
    .select('id');

  if (!error && (!data || data.length === 0)) {
    await syncClerkUserToSupabase(clerkId);
    const retry = await supabase
      .from('users')
      .update(payload)
      .eq('clerk_id', clerkId)
      .select('id');
    data = retry.data;
    error = retry.error;
    if (!error && data && data.length > 0) {
      return { ok: true, clerkId, rowsUpdated: data.length, retriedSync: true };
    }
  }

  if (error) {
    return { ok: false, clerkId, rowsUpdated: 0, error: error.message };
  }

  const rowsUpdated = data?.length ?? 0;
  if (rowsUpdated === 0) {
    return {
      ok: false,
      clerkId,
      rowsUpdated: 0,
      error: 'Ninguna fila actualizada en users (clerk_id no encontrado)',
    };
  }

  return { ok: true, clerkId, rowsUpdated };
}

export async function activateUserPremiumByClerkId(
  clerkId: string,
  scope: PremiumScope,
  stripeCustomerId?: string
): Promise<PremiumSyncResult> {
  return updatePremiumByClerkId(clerkId, scope, stripeCustomerId);
}

export async function activateUserPremiumByEmail(
  email: string,
  scope: PremiumScope,
  stripeCustomerId?: string
): Promise<PremiumSyncResult> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('users')
    .update({
      subscription_status: 'active',
      premium_scope: scope,
      status: 'premium',
      is_premium: true,
      stripe_customer_id: stripeCustomerId ?? null,
    })
    .eq('email', email)
    .select('id');

  if (error) {
    return { ok: false, email, rowsUpdated: 0, error: error.message };
  }

  const rowsUpdated = data?.length ?? 0;
  if (rowsUpdated === 0) {
    return {
      ok: false,
      email,
      rowsUpdated: 0,
      error: 'Ninguna fila actualizada en users (email no encontrado)',
    };
  }

  return { ok: true, email, rowsUpdated };
}

export async function deactivateUserPremium(clerkId: string): Promise<PremiumSyncResult> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('users')
    .update({
      subscription_status: 'canceled',
      premium_scope: null,
      status: 'free_tier',
      is_premium: false,
    })
    .eq('clerk_id', clerkId)
    .select('id');

  if (error) {
    return { ok: false, clerkId, rowsUpdated: 0, error: error.message };
  }

  return { ok: true, clerkId, rowsUpdated: data?.length ?? 0 };
}
