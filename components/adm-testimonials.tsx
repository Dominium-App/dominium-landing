'use client'

import { useEffect, useRef, useState } from 'react'

// Replace with real testimonials before launch
const testimonials = [
  {
    name: 'Juan M.',
    detail: '34 años de trayectoria',
    quote:
      'Fue más fácil de lo que pensaba. Y mis clientes están mejor atendidos que nunca.',
  },
  {
    name: 'Marta R.',
    detail: '28 años de trayectoria',
    quote:
      'Dominium manejó todo con discreción. Los consorcistas ni lo sintieron — fue una transición tranquila.',
  },
]

export default function AdmTestimonials() {
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
      aria-label="Administradores que ya confían en Dominium"
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
            Administradores que ya confían en Dominium
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item, i) => (
            <figure
              key={i}
              className="flex flex-col gap-5 p-8 rounded-[12px]"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
              }}
            >
              {/* Quote text */}
              <blockquote
                className="text-[16px] leading-relaxed flex-1"
                style={{ color: 'var(--color-ink)', fontStyle: 'italic' }}
              >
                "{item.quote}"
              </blockquote>

              {/* Attribution */}
              <figcaption className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div
                  className="w-11 h-11 rounded-full shrink-0"
                  style={{ backgroundColor: 'var(--color-surface-alt)' }}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-[14px] font-semibold"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="text-[13px]"
                    style={{ color: 'var(--color-ink-tertiary)' }}
                  >
                    {item.detail}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
