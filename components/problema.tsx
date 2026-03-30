'use client'

import { useEffect, useRef, useState } from 'react'

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])

  return count
}

const stats = [
  {
    value: 180000,
    display: (n: number) =>
      n >= 1000 ? `${Math.floor(n / 1000).toLocaleString('es-AR')}K+` : `${n}+`,
    label: 'edificios en propiedad horizontal solo en AMBA',
  },
  {
    value: 15,
    display: (n: number) => `${n}`,
    label: 'edificios que maneja un administrador tradicional. Dominium: 200+',
  },
  {
    value: 0,
    display: () => '0%',
    label: 'de las liquidaciones tradicionales permiten auditoría en tiempo real',
  },
]

function StatCard({
  value,
  display,
  label,
  animate,
}: {
  value: number
  display: (n: number) => string
  label: string
  animate: boolean
}) {
  const count = useCountUp(value, value === 0 ? 300 : 2000, animate)
  return (
    <article
      className="rounded-[16px] p-8 flex flex-col gap-3"
      style={{
        backgroundColor: '#1A1A18',
        border: '1px solid #2A2A28',
      }}
    >
      <p
        className="font-serif font-bold leading-none"
        style={{ fontSize: 'clamp(42px, 5vw, 52px)', color: 'var(--color-accent)' }}
        aria-label={display(value)}
      >
        {display(count)}
      </p>
      <p
        className="text-[15px] leading-relaxed"
        style={{ color: '#9B9A96' }}
      >
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
            style={{ color: '#9B9A96' }}
          >
            La liquidación de expensas promedio tiene 23 ítems sin descripción, 4 servicios sin cotización alternativa, y un fondo de reserva que nadie monitorea. Así funcionó siempre. Hasta ahora.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.6s ease ${0.1 + i * 0.1}s, transform 0.6s ease ${0.1 + i * 0.1}s`,
              }}
            >
              <StatCard {...stat} animate={visible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
