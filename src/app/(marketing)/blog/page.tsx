import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/badge';
import { getBlogPostsByUni } from '@/data/blog-posts';

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://prepmx.com';

export const metadata = {
  title: 'Blog — Convocatorias UNAM, IPN y UAM | PrepMX',
  description:
    'Guías de convocatorias UNAM, IPN y UAM. Repetición espaciada SM-2, simulacros y estrategia para +100 aciertos.',
  alternates: { canonical: `${BASE}/blog` },
  openGraph: {
    title: 'Blog PrepMX — Convocatorias y repetición espaciada',
    description: 'Fechas UNAM, IPN y UAM. Por qué el PDF no basta y cómo SM-2 programa tus repasos.',
    url: `${BASE}/blog`,
    type: 'website',
  },
};

export default function BlogIndexPage() {
  const posts = getBlogPostsByUni();

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      <PageHeader
        title="Blog PrepMX"
        description="Convocatorias, estrategia de estudio y simulacros para UNAM, IPN y UAM."
      />

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30 hover:bg-primary/[0.02]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="uppercase">
                  {post.universidad}
                </Badge>
                {post.featured ? (
                  <Badge className="bg-indigo-600 text-white hover:bg-indigo-600">Destacado</Badge>
                ) : null}
                <span className="text-xs text-muted-foreground">
                  {post.publishedAt} · {post.readMinutes} min
                </span>
              </div>
              <h2 className="mt-2 text-lg font-bold">{post.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
