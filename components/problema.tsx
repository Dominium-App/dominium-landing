'use client'

import { useEffect, useRef, useState } from 'react'

const cards = [
  {
    headline: 'Solo un PDF',
    label:
      'La liquidación de expensas llega cada mes sin un desglose claro y sin nada con qué compararla.',
  },
  {
    headline: 'Excel y mail',
    label:
      'El administrador tradicional opera sin trazabilidad: para ver una factura hay que pedirla y esperar.',
  },
  {
    headline: 'Sin auditoría',
    label:
      'Nadie contrasta los rubros contra precios de mercado actuales. Los sobreprecios se repiten mes a mes.',
  },
]

function ProblemaCard({ headline, label }: { headline: string; label: string }) {
  return (
    <article
      className="rounded-[16px] p-8 flex flex-col gap-3"
      style={{
        backgroundColor: '#1A1A18',
        border: '1px solid #2A2A28',
      }}
    >
      <p
        className="font-serif font-bold leading-[1.1]"
        style={{ fontSize: 'clamp(26px, 3vw, 32px)', color: '#6B9E7A' }}
      >
        {headline}
      </p>
      <p className="text-[15px] leading-relaxed" style={{ color: '#C4C3BF' }}>
        {label}
      </p>
    </article>
  )
}

export default function Problema() {
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
      id="problema"
      className="py-[100px] md:py-[120px]"
      style={{ backgroundColor: 'var(--color-ink)' }}
      aria-label="El problema con las expensas"
    >
      <div className="mx-auto max-w-[1120px] px-6 flex flex-col items-center gap-12">
        {/* Copy */}
        <div
          className="text-center max-w-[720px] flex flex-col gap-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <h2
            className="font-serif font-bold leading-[1.15] text-white text-balance"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            No es que no entiendas.<br />
            Es que está diseñado para<br />
            que no entiendas.
          </h2>
          <p
            className="text-[17px] leading-relaxed max-w-[600px] mx-auto"
            style={{ color: '#C4C3BF' }}
          >
            Una liquidación de expensas típica está llena de ítems sin descripción y servicios sin cotización alternativa, con un fondo de reserva que nadie monitorea. Así funcionó siempre. Hasta ahora.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.6s ease ${0.1 + i * 0.1}s, transform 0.6s ease ${0.1 + i * 0.1}s`,
              }}
            >
              <ProblemaCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
