'use client'

import Link from 'next/link'
import { type Article, HUB_COLORS, formatDate, readingMinutesFromContent } from '@/lib/blog'

export default function ArticleCard({ article }: { article: Article }) {
  const hubColors = HUB_COLORS[article.hub]
  const minutes = readingMinutesFromContent(article.content) || article.readingMinutes

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col gap-4 rounded-[16px] overflow-hidden transition-all duration-200"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-accent)'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow =
          '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.08)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      aria-label={`Leer: ${article.title}`}
    >
      {/* Thumbnail — solid hub color */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden"
        style={{ backgroundColor: hubColors.bg }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 70% 40%, ${hubColors.border}, transparent 70%)`,
            opacity: 0.6,
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.08 }}
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={`dots-${article.slug}`}
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill={hubColors.text} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dots-${article.slug})`} />
        </svg>
        <div
          className="absolute inset-0 flex items-end p-6 font-serif font-bold text-[28px] leading-[1.1]"
          style={{ color: hubColors.text, opacity: 0.25 }}
        >
          {article.hub}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 px-6 pb-6 pt-2">
        {/* Badge */}
        <span
          className="inline-flex self-start text-[11px] font-semibold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: hubColors.bg,
            color: hubColors.text,
            border: `1px solid ${hubColors.border}`,
          }}
        >
          {article.hub}
        </span>

        {/* Title */}
        <h3
          className="font-serif font-bold leading-[1.2] text-[20px] line-clamp-3"
          style={{ color: 'var(--color-ink)' }}
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        <p
          className="text-[14px] leading-relaxed line-clamp-2"
          style={{ color: 'var(--color-ink-secondary)' }}
        >
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 pt-1">
          <span className="text-[12px]" style={{ color: 'var(--color-ink-tertiary)' }}>
            {formatDate(article.date)}
          </span>
          <span
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: 'var(--color-border-strong)' }}
            aria-hidden="true"
          />
          <span className="text-[12px]" style={{ color: 'var(--color-ink-tertiary)' }}>
            {minutes} min de lectura
          </span>
        </div>
      </div>
    </Link>
  )
}
