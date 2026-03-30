'use client'

import { useEffect, useRef, useState } from 'react'
import { Eye, Bot, TrendingDown } from 'lucide-react'

const cards = [
  {
    Icon: Eye,
    title: 'Transparencia Total',
    body: 'Accedés al estado financiero de tu consorcio en tiempo real. Cada gasto, cada proveedor, cada votación — auditado y visible.',
  },
  {
    Icon: Bot,
    title: 'Vero trabaja por vos',
    body: 'Nuestra IA gestiona reclamos, proveedores y comunicaciones 24/7. El 80% de los tickets se resuelven sin intervención humana.',
  },
  {
    Icon: TrendingDown,
    title: 'Ahorro Real',
    body: 'Detectamos ineficiencias sistémicas y las eliminamos. El ahorro promedio en los primeros 6 meses es del 18% en gastos variables.',
  },
]

export default function ComoFunciona() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="py-[100px] md:py-[120px]"
      style={{ backgroundColor: 'var(--color-surface)' }}
      aria-label="Cómo funciona Dominium"
    >
      <div className="mx-auto max-w-[1120px] px-6 flex flex-col items-center gap-12">
        {/* Header */}
        <div
          className="text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <h2
            className="font-serif font-bold text-balance leading-[1.15]"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)', color: 'var(--color-ink)' }}
          >
            La administración que<br />siempre debió existir.
          </h2>
        </div>

        {/* Cards */}
        <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Connecting dashed line (desktop only) */}
          <div
            className="hidden md:block absolute top-8 left-[calc(33%+16px)] right-[calc(33%+16px)] h-px"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, var(--color-border) 0, var(--color-border) 6px, transparent 6px, transparent 12px)',
            }}
            aria-hidden="true"
          />

          {cards.map((card, i) => (
            <article
              key={i}
              className="relative flex flex-col gap-4 p-8 rounded-[12px] cursor-default"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s, border-color 0.2s ease, box-shadow 0.2s ease`,
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-accent)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              {/* Step number */}
              <span
                className="absolute top-4 right-5 text-[13px] font-semibold"
                style={{ color: 'var(--color-ink-tertiary)' }}
                aria-hidden="true"
              >
                0{i + 1}
              </span>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-accent-glow)' }}
                aria-hidden="true"
              >
                <card.Icon size={22} color="var(--color-accent)" />
              </div>

              <h3
                className="text-[20px] font-semibold"
                style={{ color: 'var(--color-ink)' }}
              >
                {card.title}
              </h3>
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: 'var(--color-ink-secondary)' }}
              >
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
