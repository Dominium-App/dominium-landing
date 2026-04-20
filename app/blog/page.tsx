import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import CtaFooter from '@/components/cta-footer'
import BlogHero from '@/components/blog/blog-hero'
import BlogListing from '@/components/blog/blog-listing'
import { articles } from '@/lib/blog'

const SITE_URL = 'https://dominium.com.ar'

export const metadata: Metadata = {
  title: 'Blog — Guías sobre consorcios, expensas y administración',
  description:
    'Guías prácticas sobre cambio de administrador, auditoría de expensas, Ley 941 y derechos del consorcista. Normativa CABA y GBA explicada sin lenguaje de abogado.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog Dominium — Todo lo que necesitás saber sobre tu consorcio',
    description:
      'Guías prácticas, derechos, normativa CABA y GBA. Sin lenguaje de abogado.',
    url: '/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Dominium — Guías sobre consorcios',
    description:
      'Guías prácticas sobre cambio de administrador, expensas y derechos del consorcista.',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
  ],
}

const blogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE_URL}/blog#blog`,
  url: `${SITE_URL}/blog`,
  name: 'Blog Dominium',
  description:
    'Guías prácticas sobre consorcios, expensas y normativa de propiedad horizontal en CABA y GBA.',
  inLanguage: 'es-AR',
  publisher: { '@id': `${SITE_URL}/#organization` },
  blogPost: articles.map((a) => ({
    '@type': 'BlogPosting',
    headline: a.title,
    description: a.excerpt,
    url: `${SITE_URL}/blog/${a.slug}`,
    datePublished: a.date,
    dateModified: a.date,
    author: { '@type': 'Organization', name: 'Equipo Dominium' },
  })),
}

export default function BlogIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <main>
        <Navigation />
        <BlogHero />
        <BlogListing
          articles={[...articles].sort(
            (a, b) => +new Date(b.date) - +new Date(a.date),
          )}
        />
        <CtaFooter />
      </main>
    </>
  )
}
