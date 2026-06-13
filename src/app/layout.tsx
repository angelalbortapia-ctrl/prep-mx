import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PrepMX — Preparación UNAM, IPN y UAM',
  description:
    'Plataforma inteligente de preparación para exámenes de admisión con simulacros, plan adaptativo y tutor IA.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
