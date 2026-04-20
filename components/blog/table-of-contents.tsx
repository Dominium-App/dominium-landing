'use client'

import { useEffect, useState } from 'react'

type Heading = { id: string; text: string; level: 2 | 3 }

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null,
  )

  useEffect(() => {
    if (headings.length === 0) return

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav
      aria-label="Tabla de contenidos"
      className="flex flex-col gap-3 rounded-[12px] p-5"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      <p
        className="text-[11px] font-semibold tracking-[0.1em] uppercase"
        style={{ color: 'var(--color-ink-tertiary)' }}
      >
        En esta guía
      </p>
      <ul className="flex flex-col gap-1">
        {headings.map((h) => {
          const active = activeId === h.id
          return (
            <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
              <a
                href={`#${h.id}`}
                className="block text-[13.5px] leading-snug py-1.5 transition-colors duration-150 relative"
                style={{
                  color: active ? 'var(--color-accent)' : 'var(--color-ink-secondary)',
                  fontWeight: active ? 600 : 400,
                }}
                aria-current={active ? 'location' : undefined}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = 'var(--color-ink)'
                }}
                onMouseLeave={(e) => {
                  if (!active)
                    e.currentTarget.style.color = 'var(--color-ink-secondary)'
                }}
              >
                {active && (
                  <span
                    className="absolute -left-5 top-0 bottom-0 w-[2px] rounded-full"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                    aria-hidden="true"
                  />
                )}
                {h.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
