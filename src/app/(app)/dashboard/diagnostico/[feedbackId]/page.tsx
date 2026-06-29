import { auth } from '@clerk/nextjs/server';
import { DiagnosticoResultView } from '@/components/diagnostico/DiagnosticoResultView';
import { getExamSessionSummary } from '@/lib/supabase/exam-session';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { getSupabaseUserByClerkId, syncClerkUserToSupabase } from '@/lib/supabase/users';

interface PageProps {
  params: { feedbackId: string };
}

export default async function DiagnosticoPage({ params }: PageProps) {
  const { userId } = await auth();
  let summary = null;

  if (userId && isSupabaseConfigured) {
    let dbUser = await getSupabaseUserByClerkId(userId);
    if (!dbUser) dbUser = await syncClerkUserToSupabase(userId);
    if (dbUser) {
      summary = await getExamSessionSummary(dbUser.id, params.feedbackId);
    }
  }

  return (
    <DiagnosticoResultView feedbackId={params.feedbackId} serverSummary={summary} />
  );
}
