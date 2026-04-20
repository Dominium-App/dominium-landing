import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import Navigation from '@/components/navigation'
import CtaFooter from '@/components/cta-footer'
import ArticleBody from '@/components/blog/article-body'
import ArticleCard from '@/components/blog/article-card'
import CTABlock from '@/components/blog/cta-block'
import FaqAccordion from '@/components/blog/faq-accordion'
import JurisdictionWidget from '@/components/blog/jurisdiction-widget'
import ReadingProgressBar from '@/components/blog/reading-progress-bar'
import ShareButtons from '@/components/blog/share-buttons'
import TableOfContents from '@/components/blog/table-of-contents'
import {
  articles,
  countWordsInContent,
  extractHeadings,
  formatDate,
  getArticleBySlug,
  getRelatedArticles,
  HUB_COLORS,
  readingMinutesFromContent,
} from '@/lib/blog'

const SITE_URL = 'https://dominium.com.ar'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) {
    return {
      title: 'Artículo no encontrado',
      robots: { index: false, follow: true },
    }
  }

  const url = `/blog/${article.slug}`
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      type: 'article',
      publishedTime: article.date,
      authors: ['Equipo Dominium'],
      tags: [article.hub],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const headings = extractHeadings(article.content)
  const minutes = readingMinutesFromContent(article.content) || article.readingMinutes
  const related = getRelatedArticles(article.slug, article.hub)
  const hubColors = HUB_COLORS[article.hub]

  const articleUrl = `${SITE_URL}/blog/${article.slug}`
  const imageUrl = `${articleUrl}/opengraph-image`
  const wordCount = countWordsInContent(article.content)
  const keywords = [
    article.hub,
    'consorcios',
    'administración de consorcios',
    'CABA',
    'AMBA',
    'Ley 941',
    'propiedad horizontal',
  ]

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      name: 'Equipo Dominium',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon-1200.png`,
        width: 1200,
        height: 1200,
      },
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    articleSection: article.hub,
    inLanguage: 'es-AR',
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    wordCount,
    keywords: keywords.join(', '),
    about: [
      { '@type': 'Thing', name: article.hub },
      { '@type': 'Thing', name: 'Administración de consorcios' },
    ],
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${SITE_URL}/blog/${article.slug}`,
      },
    ],
  }

  const faqJsonLd = article.faqs && article.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <main>
        <Navigation />
        <ReadingProgressBar />

        <article className="pt-28 md:pt-32 pb-[100px] md:pb-[120px]">
          <div className="mx-auto max-w-[1120px] px-6">
            {/* Breadcrumb */}
            <nav
              aria-label="Ruta de navegación"
              className="flex items-center gap-1.5 text-[13px] mb-8"
              style={{ color: 'var(--color-ink-tertiary)' }}
            >
              <Link
                href="/"
                className="hover:underline transition-colors"
                style={{ color: 'var(--color-ink-tertiary)' }}
              >
                Inicio
              </Link>
              <ChevronRight size={14} aria-hidden="true" />
              <Link
                href="/blog"
                className="hover:underline transition-colors"
                style={{ color: 'var(--color-ink-tertiary)' }}
              >
                Blog
              </Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span
                className="truncate max-w-[420px]"
                style={{ color: 'var(--color-ink-secondary)' }}
              >
                {article.title}
              </span>
            </nav>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,65fr)_minmax(0,35fr)] gap-10 lg:gap-14">
              {/* MAIN COLUMN */}
              <div className="flex flex-col gap-8 min-w-0">
                {/* Category badge */}
                <span
                  className="inline-flex self-start text-[11px] font-semibold uppercase tracking-[0.08em] px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: hubColors.bg,
                    color: hubColors.text,
                    border: `1px solid ${hubColors.border}`,
                  }}
                >
                  {article.hub}
                </span>

                {/* H1 */}
                <h1
                  className="font-serif font-bold leading-[1.1] tracking-[-0.01em] text-balance"
                  style={{
                    fontSize: 'clamp(30px, 4.5vw, 48px)',
                    color: 'var(--color-ink)',
                  }}
                >
                  {article.title}
                </h1>

                {/* Metadata */}
                <div
                  className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13.5px]"
                  style={{ color: 'var(--color-ink-tertiary)' }}
                >
                  <span>{formatDate(article.date)}</span>
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: 'var(--color-border-strong)' }}
                    aria-hidden="true"
                  />
                  <span>{minutes} min de lectura</span>
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: 'var(--color-border-strong)' }}
                    aria-hidden="true"
                  />
                  <span>Equipo Dominium</span>
                </div>

                {/* Featured visual — hub gradient (no image available) */}
                <div
                  className="w-full rounded-[16px] aspect-[2/1] relative overflow-hidden"
                  style={{ backgroundColor: hubColors.bg }}
                  aria-hidden="true"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse at 75% 30%, ${hubColors.border}, transparent 70%)`,
                      opacity: 0.55,
                    }}
                  />
                  <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.08 }}>
                    <defs>
                      <pattern
                        id={`article-dots-${article.slug}`}
                        x="0"
                        y="0"
                        width="22"
                        height="22"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="2" cy="2" r="1" fill={hubColors.text} />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#article-dots-${article.slug})`} />
                  </svg>
                  <div
                    className="absolute inset-0 flex items-end p-8 font-serif font-bold leading-[1.05]"
                    style={{
                      color: hubColors.text,
                      opacity: 0.22,
                      fontSize: 'clamp(40px, 7vw, 96px)',
                    }}
                  >
                    {article.hub}
                  </div>
                </div>

                {/* Share buttons (top) */}
                <ShareButtons title={article.title} slug={article.slug} />

                {/* Body */}
                <ArticleBody content={article.content} />

                {/* Inline CTA */}
                <div className="pt-2">
                  <CTABlock ctaType={article.ctaType} variant="inline" />
                </div>

                {/* FAQs */}
                {article.faqs && article.faqs.length > 0 && (
                  <div className="pt-4">
                    <FaqAccordion items={article.faqs} />
                  </div>
                )}

                {/* Share buttons (bottom) */}
                <div
                  className="pt-6 border-t"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <ShareButtons title={article.title} slug={article.slug} />
                </div>
              </div>

              {/* SIDEBAR */}
              <aside className="min-w-0">
                <div className="lg:sticky lg:top-24 flex flex-col gap-6">
                  <TableOfContents headings={headings} />
                  <CTABlock ctaType={article.ctaType} variant="compact" />
                  <JurisdictionWidget />
                </div>
              </aside>
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <section
                aria-labelledby="related-heading"
                className="mt-20 md:mt-24"
              >
                <div
                  className="border-t pt-12"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                    <h2
                      id="related-heading"
                      className="font-serif font-bold leading-[1.2]"
                      style={{
                        fontSize: 'clamp(24px, 3vw, 32px)',
                        color: 'var(--color-ink)',
                      }}
                    >
                      Seguir leyendo
                    </h2>
                    <Link
                      href="/blog"
                      className="text-[14px] font-medium hover:underline"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      Ver todos los artículos →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {related.map((r) => (
                      <ArticleCard key={r.slug} article={r} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        </article>

        <CtaFooter />
      </main>
    </>
  )
}
