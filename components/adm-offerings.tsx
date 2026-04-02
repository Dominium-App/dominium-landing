'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeftRight, Award, Banknote } from 'lucide-react'

const offerings = [
  {
    Icon: ArrowLeftRight,
    title: 'Transición sin fricción',
    body: 'Nos ocupamos de toda la comunicación con los consorcistas. Vos avisás cuando quieras, como quieras. El proceso no genera conflicto.',
  },
  {
    Icon: Award,
    title: 'Tu nombre sigue importando',
    body: 'Podemos mencionar que la cartera fue administrada por vos durante años. Tu trayectoria es un activo, no algo a borrar.',
  },
  {
    Icon: Banknote,
    title: 'Compensación justa',
    body: 'Analizamos cada cartera individualmente. Si hay valor que transferís, lo reconocemos. Hablemos.',
  },
]

export default function AdmOfferings() {
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
      className="py-[100px] md:py-[120px]"
      style={{ backgroundColor: 'var(--color-bg)' }}
      aria-label="Lo que ofrecemos a administradores"
    >
      <div className="mx-auto max-w-[1120px] px-6 flex flex-col items-center gap-12">
        {/* Header */}
        <div
          className="text-center max-w-[600px]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <h2
            className="font-serif font-bold text-balance leading-[1.15]"
            style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', color: 'var(--color-ink)' }}
          >
            Lo que ofrecemos a quienes confían su cartera a Dominium
          </h2>
        </div>

        {/* Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {offerings.map((item, i) => (
            <article
              key={i}
              className="flex flex-col gap-5 p-8 rounded-[12px] cursor-default"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s, border-color 0.2s ease, box-shadow 0.2s ease`,
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
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-accent-glow)' }}
                aria-hidden="true"
              >
                <item.Icon size={22} color="var(--color-accent)" />
              </div>

              <h3
                className="text-[19px] font-semibold leading-snug"
                style={{ color: 'var(--color-ink)' }}
              >
                {item.title}
              </h3>
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: 'var(--color-ink-secondary)' }}
              >
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
