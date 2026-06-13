'use client';

import { UserButton } from '@clerk/nextjs';

export function AppUserMenu() {
  return (
    <div className="mb-3 flex items-center gap-2">
      <UserButton />
      <span className="text-xs text-muted-foreground">Mi cuenta</span>
    </div>
  );
}
