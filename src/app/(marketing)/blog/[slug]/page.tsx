import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import { getBlogPost, blogPosts } from '@/data/blog-posts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sm2InteractiveTimeline } from '@/components/marketing/Sm2InteractiveTimeline';
import { buildJourneyHref } from '@/lib/journey-links';

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://prepmx.com';

interface PageProps {
  params: { slug: string };
}

/** SSG: rutas pre-generadas en build para SEO y carga instantánea. */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps) {
  const post = getBlogPost(params.slug);
  if (!post) return { title: 'Artículo no encontrado' };
  const url = `${BASE}/blog/${post.slug}`;
  return {
    title: `${post.title} | PrepMX`,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const simHref = buildJourneyHref('/simulador-gratis', {
    uni: post.universidad === 'general' ? 'todas' : post.universidad,
    plan: post.universidad === 'general' ? 'todo' : 'universidad',
    extra: { freemium: 'diagnostico' },
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: 'PrepMX' },
    publisher: { '@type': 'Organization', name: 'PrepMX' },
    keywords: post.tags.join(', '),
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Button asChild variant="ghost" className="mb-6 -ml-2 h-10 rounded-xl">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al blog
        </Link>
      </Button>

      <Badge variant="secondary" className="uppercase">
        {post.universidad}
      </Badge>
      <h1 className="mt-3 text-3xl font-black tracking-tight">{post.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {post.publishedAt} · {post.readMinutes} min de lectura
      </p>

      {post.interactive === 'sm2-timeline' ? (
        <Sm2InteractiveTimeline variant="blog" showBlogLink={false} className="mt-8" />
      ) : null}

      <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>

      <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 text-center">
        <p className="font-semibold">¿Listo para practicar?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Diagnóstico gratis de 10 preguntas — sin tarjeta.
        </p>
        <Button asChild className="mt-4 h-11 rounded-xl">
          <Link href={simHref}>Probar simulador gratis</Link>
        </Button>
      </div>
    </article>
  );
}
