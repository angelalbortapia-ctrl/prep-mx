import type { Metadata, Viewport } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { ExamTokensProviderShell } from '@/components/providers/ExamTokensProviderShell';
import { SubscriptionProviderShell } from '@/components/providers/SubscriptionProviderShell';
import { UniThemeProviderShell } from '@/components/providers/UniThemeProviderShell';
import { OfflineBanner } from '@/components/system/OfflineBanner';
import { PreviewExplorerShell } from '@/components/system/PreviewExplorerShell';
import './globals.css';

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
  return (
    <html lang="es">
      <body className="overscroll-y-none antialiased">
        <ClerkProvider>
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
        </ClerkProvider>
      </body>
    </html>
  );
}
