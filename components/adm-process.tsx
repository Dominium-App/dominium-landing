'use client'

import { useEffect, useRef, useState } from 'react'
import { Phone, FileText, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    number: '01',
    Icon: Phone,
    title: 'Conversación privada',
    body: 'Una llamada sin compromiso. Entendemos tu situación, tu cartera y tus tiempos. Sin presión, sin grabaciones.',
  },
  {
    number: '02',
    Icon: FileText,
    title: 'Propuesta a medida',
    body: 'Cada transición es distinta. Te presentamos un plan adaptado a vos: plazos, comunicación, compensación.',
  },
  {
    number: '03',
    Icon: CheckCircle2,
    title: 'Transición ordenada',
    body: 'Nos encargamos de la documentación, los consorcistas y la continuidad. Tu trabajo de años se transfiere con la seriedad que merece.',
  },
]

export default function AdmProcess() {
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
      style={{ backgroundColor: 'var(--color-surface-alt)' }}
      aria-label="Cómo funciona la transición"
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
            style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', color: 'var(--color-ink)' }}
          >
            Cómo funciona
          </h2>
        </div>

        {/* Steps */}
        <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Connecting dashed line (desktop only) */}
          <div
            className="hidden md:block absolute top-8 left-[calc(33%+16px)] right-[calc(33%+16px)] h-px"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, var(--color-border-strong) 0, var(--color-border-strong) 6px, transparent 6px, transparent 12px)',
            }}
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <article
              key={i}
              className="relative flex flex-col gap-4 p-8 rounded-[12px]"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
              }}
            >
              {/* Step number */}
              <span
                className="absolute top-4 right-5 text-[13px] font-semibold tabular-nums"
                style={{ color: 'var(--color-ink-tertiary)' }}
                aria-hidden="true"
              >
                {step.number}
              </span>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-accent-glow)' }}
                aria-hidden="true"
              >
                <step.Icon size={22} color="var(--color-accent)" />
              </div>

              <h3
                className="text-[19px] font-semibold leading-snug"
                style={{ color: 'var(--color-ink)' }}
              >
                {step.title}
              </h3>
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: 'var(--color-ink-secondary)' }}
              >
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
