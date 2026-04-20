'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import ArticleCard from './article-card'
import { type Article, HUBS, type Hub } from '@/lib/blog'

type FilterValue = 'all' | Hub

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: 'Todos', value: 'all' },
  ...HUBS.map((h) => ({ label: h, value: h as FilterValue })),
]

export default function BlogListing({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<FilterValue>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return articles.filter((a) => {
      const hubMatch = filter === 'all' || a.hub === filter
      const queryMatch = !q || a.title.toLowerCase().includes(q)
      return hubMatch && queryMatch
    })
  }, [articles, query, filter])

  return (
    <section
      className="pb-[100px] md:pb-[120px]"
      style={{ backgroundColor: 'var(--color-bg)' }}
      aria-label="Listado de artículos"
    >
      <div className="mx-auto max-w-[1120px] px-6 flex flex-col gap-8">
        {/* Search bar */}
        <div className="w-full max-w-[560px]">
          <label htmlFor="blog-search" className="sr-only">
            Buscar por título
          </label>
          <div
            className="relative flex items-center rounded-full h-[50px] px-5 gap-3"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <Search size={18} color="var(--color-ink-tertiary)" aria-hidden="true" />
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título…"
              className="flex-1 bg-transparent outline-none text-[15px]"
              style={{ color: 'var(--color-ink)' }}
              autoComplete="off"
            />
          </div>
        </div>

        {/* Filters */}
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filtrar por categoría"
        >
          {FILTERS.map((f) => {
            const active = filter === f.value
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={active}
                className="inline-flex items-center h-[36px] px-4 rounded-full text-[13px] font-medium transition-colors duration-150"
                style={{
                  backgroundColor: active ? 'var(--color-accent)' : 'var(--color-surface)',
                  color: active ? 'white' : 'var(--color-ink-secondary)',
                  border: `1px solid ${active ? 'var(--color-accent)' : 'var(--color-border)'}`,
                }}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div
            className="rounded-[16px] p-12 text-center"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p className="text-[15px]" style={{ color: 'var(--color-ink-secondary)' }}>
              No encontramos artículos que coincidan. Probá con otra búsqueda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
