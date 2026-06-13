import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const body = (await req.json()) as {
    fullName?: string;
    universidad?: string;
    area?: string;
    examDate?: string;
    examTarget?: string;
  };

  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      ...body,
      onboardingComplete: true,
    },
  });

  return NextResponse.json({ ok: true });
}
