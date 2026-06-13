import { MarketingThemeShell } from '@/components/marketing/MarketingThemeShell';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketingThemeShell>{children}</MarketingThemeShell>;
}
