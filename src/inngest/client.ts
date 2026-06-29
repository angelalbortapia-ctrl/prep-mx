import { Inngest } from 'inngest';

export const inngest = new Inngest({ id: 'prep-mx' });

export type PrepMxEvents = {
  'prepmx/user.onboarded': {
    data: {
      clerkId: string;
      email: string;
      fullName?: string;
      hadDiagnostic?: boolean;
    };
  };
};
