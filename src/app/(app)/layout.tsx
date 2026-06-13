import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Inicio' },
  { href: '/dashboard/plan', label: 'Mi plan' },
  { href: '/dashboard/simulacros', label: 'Simulacros' },
  { href: '/dashboard/tutor', label: 'Tutor IA' },
  { href: '/dashboard/perfil', label: 'Perfil' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-mesh md:flex-row">
      <aside className="border-b border-white/60 bg-white/80 backdrop-blur-md md:w-60 md:border-b-0 md:border-r">
        <Link href="/dashboard" className="flex items-center gap-2 p-4 font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-4 w-4" />
          </span>
          PrepMX
        </Link>
        <nav className="flex gap-1 overflow-x-auto px-2 pb-3 md:flex-col md:px-3 md:pb-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden border-t px-3 py-4 md:block">
          <Link href="/proyecto" className="text-xs text-muted-foreground hover:text-primary">
            Roadmap del proyecto →
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
