import type { Metadata, Viewport } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { ExamTokensProviderShell } from '@/components/providers/ExamTokensProviderShell';
import { SubscriptionProviderShell } from '@/components/providers/SubscriptionProviderShell';
import { UniThemeProviderShell } from '@/components/providers/UniThemeProviderShell';
import { OfflineBanner } from '@/components/system/OfflineBanner';
import { PostHogProvider } from '@/components/providers/PostHogProvider';
import { ConversionTagsProvider } from '@/components/providers/ConversionTagsProvider';
import { assertClientEnv } from '@/lib/env/client';
import { PreviewExplorerShell } from '@/components/system/PreviewExplorerShell';
import { fontReading, fontVariables } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import './globals.css';
import 'katex/dist/katex.min.css';
import './katex-theme.css';

export const metadata: Metadata = {
  title: 'PrepMX — Preparación UNAM, IPN y UAM',
  description:
    'Plataforma inteligente de preparación para exámenes de admisión con simulacros, plan adaptativo y tutor IA.',
  applicationName: 'PrepMX',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PrepMX',
  },
};

// Clave para apps híbridas: deshabilita el zoom por pellizco accidental,
// respeta el notch (viewport-fit=cover) y fija el theme-color nativo.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#1e3a8a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  assertClientEnv();

  return (
    <html lang="es" className={fontVariables}>
      <body className={cn(fontReading.className, 'font-normal overscroll-y-none antialiased')}>
        <ConversionTagsProvider />
        <ClerkProvider>
          <PostHogProvider>
            <QueryProvider>
            <SubscriptionProviderShell>
              <ExamTokensProviderShell>
                <UniThemeProviderShell>
                  <PreviewExplorerShell>
                    <OfflineBanner />
                    {children}
                  </PreviewExplorerShell>
                </UniThemeProviderShell>
              </ExamTokensProviderShell>
            </SubscriptionProviderShell>
            </QueryProvider>
          </PostHogProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
