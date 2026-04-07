'use client'

import { useEffect, useState } from 'react'

const team = [
  {
    name: 'Lucio Majewski',
    role: 'CEO',
    initials: 'LM',
  },
  {
    name: 'Santiago Suppes',
    role: 'COO',
    initials: 'SS',
  },
  {
    name: 'Enzo Cazenave',
    role: 'CTO',
    initials: 'EC',
  },
]

export default function NosotrosHero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      className="relative pt-32 pb-[100px] md:pb-[120px]"
      style={{ backgroundColor: 'var(--color-bg)' }}
      aria-label="Nosotros"
    >
      <div className="mx-auto max-w-[1120px] px-6 flex flex-col items-center gap-16">
        {/* Header */}
        <div
          className="text-center max-w-[640px] flex flex-col gap-5"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p
            className="text-[12px] font-semibold tracking-[0.1em] uppercase"
            style={{ color: 'var(--color-accent)' }}
          >
            Quienes somos
          </p>
          <h1
            className="font-serif font-bold leading-[1.15] text-balance"
            style={{
              fontSize: 'clamp(30px, 4.5vw, 52px)',
              color: 'var(--color-ink)',
            }}
          >
            La administración que siempre debió existir.
          </h1>
          <p
            className="text-[17px] leading-relaxed"
            style={{ color: 'var(--color-ink-secondary)' }}
          >
            Dominium nació para transformar la forma en que se administran los consorcios.
            Combinamos tecnología, transparencia y un equipo que entiende el problema de adentro.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-[800px]">
          {team.map((member, i) => (
            <div
              key={member.name}
              className="flex flex-col items-center gap-4 rounded-[16px] p-8"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.6s ease ${0.15 + i * 0.1}s, transform 0.6s ease ${0.15 + i * 0.1}s`,
              }}
            >
              {/* Avatar placeholder */}
              <div
                className="w-[72px] h-[72px] rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-accent-glow)' }}
              >
                <span
                  className="text-[20px] font-semibold"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {member.initials}
                </span>
              </div>
              <div className="text-center flex flex-col gap-1">
                <p
                  className="text-[17px] font-semibold"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {member.name}
                </p>
                <p
                  className="text-[14px] font-medium"
                  style={{ color: 'var(--color-ink-tertiary)' }}
                >
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
