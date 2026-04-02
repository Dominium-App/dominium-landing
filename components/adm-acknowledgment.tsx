'use client'

import { useEffect, useRef, useState } from 'react'

export default function AdmAcknowledgment() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="py-[80px] md:py-[100px]"
      style={{ backgroundColor: 'var(--color-surface)' }}
      aria-label="Reconocimiento a los administradores"
    >
      <div className="mx-auto max-w-[780px] px-6 text-center">
        <p
          className="leading-relaxed"
          style={{
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            color: 'var(--color-ink-secondary)',
            fontStyle: 'italic',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          "Sabemos que tu cartera no es solo un negocio.
          Son relaciones de 10, 20, 30 años con consorcistas que te conocen.
          Una transición mal hecha los perjudica a ellos — y a vos."
        </p>
      </div>
    </section>
  )
}
