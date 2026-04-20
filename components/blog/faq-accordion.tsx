'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/lib/blog'

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      aria-labelledby="faqs-heading"
      role="region"
      className="flex flex-col gap-4"
    >
      <h2
        id="faqs-heading"
        className="font-serif font-bold leading-[1.2]"
        style={{
          fontSize: 'clamp(22px, 2.5vw, 26px)',
          color: 'var(--color-ink)',
        }}
      >
        Preguntas frecuentes
      </h2>

      <div className="flex flex-col gap-3">
        {items.map((item, i) => {
          const open = openIndex === i
          const panelId = `faq-panel-${i}`
          const buttonId = `faq-button-${i}`
          return (
            <div
              key={i}
              className="rounded-[12px] overflow-hidden"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: `1px solid ${open ? 'var(--color-accent)' : 'var(--color-border)'}`,
                transition: 'border-color 0.15s ease',
              }}
            >
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
              >
                <span
                  className="text-[16px] font-semibold leading-snug"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  className="shrink-0 transition-transform duration-200"
                  style={{
                    color: 'var(--color-ink-tertiary)',
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                  aria-hidden="true"
                />
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!open}
                className="px-5 pb-5 pt-0"
              >
                <p
                  className="text-[15.5px] leading-[1.7]"
                  style={{ color: 'var(--color-ink-secondary)' }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
