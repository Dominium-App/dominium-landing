'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle2, AlertTriangle, XCircle, Zap } from 'lucide-react'

// Vero avatar mark — minimal geometric SVG
function VeroMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-label="Vero">
      <circle cx="16" cy="16" r="15" stroke="#3B7DD8" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="6" fill="#3B7DD8" />
      <line x1="16" y1="1" x2="16" y2="7" stroke="#3B7DD8" strokeWidth="1.5" />
      <line x1="16" y1="25" x2="16" y2="31" stroke="#3B7DD8" strokeWidth="1.5" />
    </svg>
  )
}

const mockFindings = [
  {
    icon: <CheckCircle2 size={16} />,
    text: 'Consorcio general — dentro del rango',
    color: '#1A7A4A',
    bg: '#F0FAF5',
    border: '#B6E8CC',
  },
  {
    icon: <AlertTriangle size={16} />,
    text: 'Servicio de limpieza — 34% por encima del promedio',
    color: '#B45309',
    bg: '#FFFBEB',
    border: '#FCD34D',
  },
  {
    icon: <XCircle size={16} />,
    text: 'Fondo de reserva — acumulación insuficiente',
    color: '#C0392B',
    bg: '#FEF2F2',
    border: '#FCA5A5',
  },
]

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll('.hero-reveal')
    elements?.forEach((el, i) => {
      ;(el as HTMLElement).style.opacity = '0'
      ;(el as HTMLElement).style.transform = 'translateY(20px)'
      setTimeout(() => {
        ;(el as HTMLElement).style.transition = 'opacity 0.6s ease, transform 0.6s ease'
        ;(el as HTMLElement).style.opacity = '1'
        ;(el as HTMLElement).style.transform = 'translateY(0)'
      }, 100 + i * 100)
    })
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[92vh] flex items-center overflow-hidden pt-16"
      style={{ backgroundColor: 'var(--color-bg)' }}
      aria-label="Hero — Dominium"
    >
      {/* Background dot grid (right half) */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full pointer-events-none"
        style={{ opacity: 0.04 }}
        aria-hidden="true"
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="var(--color-ink)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Radial gradient bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[60%] h-[60%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom right, #E8F2EC 0%, transparent 70%)',
          opacity: 0.4,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1120px] px-6 w-full py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT: Copy */}
          <div className="flex flex-col gap-6">
            {/* Label */}
            <p
              className="hero-reveal text-[12px] font-medium tracking-[0.1em] uppercase"
              style={{ color: 'var(--color-accent)' }}
            >
              Administración Inteligente de Consorcios
            </p>

            {/* H1 */}
            <h1
              className="hero-reveal font-serif font-bold leading-[1.1] tracking-[-0.02em] text-balance"
              style={{
                fontSize: 'clamp(40px, 5vw, 64px)',
                color: 'var(--color-ink)',
              }}
            >
              ¿Cuánto estás<br />
              pagando de más<br />
              en expensas?
            </h1>

            {/* Subheadline */}
            <p
              className="hero-reveal text-[18px] leading-relaxed max-w-[480px]"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              Subí tu última liquidación y Vero, nuestra IA, detecta en segundos si estás pagando de más, si hay gastos ocultos, o si tu fondo de reserva está mal administrado.
            </p>

            {/* CTAs */}
            <div className="hero-reveal flex flex-col gap-3">
              <div>
                <a
                  href="#analizador"
                  className="inline-flex items-center h-[50px] px-6 rounded-full text-[15px] font-semibold text-white transition-colors duration-150"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent-light)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent)')}
                >
                  Analizar mis expensas gratis →
                </a>
              </div>
              <p
                className="text-[13px]"
                style={{ color: 'var(--color-ink-tertiary)' }}
              >
                Sin registro · Resultado en 60 segundos · +500 liquidaciones analizadas
              </p>
            </div>
          </div>

          {/* RIGHT: Floating Vero Analysis Card */}
          <div className="hero-reveal flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-[400px] rounded-[16px] p-6 flex flex-col gap-4"
              style={{
                backgroundColor: 'var(--color-surface)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 32px rgba(0,0,0,0.12)',
                animation: 'card-settle 0.8s ease 0.5s both',
                transformOrigin: 'center',
              }}
              aria-label="Ejemplo de análisis de Vero"
            >
              {/* Floating badge */}
              <div
                className="absolute -top-3 -right-3 px-3 py-1 rounded-full text-[11px] font-semibold text-white"
                style={{ backgroundColor: 'var(--color-vero)', letterSpacing: '0.05em' }}
              >
                IA · Tiempo real
              </div>

              {/* Header */}
              <div className="flex items-center gap-3">
                <VeroMark size={36} />
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: 'var(--color-ink)' }}>
                    Vero analizó tu liquidación
                  </p>
                  <p className="text-[12px]" style={{ color: 'var(--color-ink-tertiary)' }}>
                    Análisis completado · 3 hallazgos
                  </p>
                </div>
              </div>

              <div
                className="h-px w-full"
                style={{ backgroundColor: 'var(--color-border)' }}
                aria-hidden="true"
              />

              {/* Finding rows */}
              <div className="flex flex-col gap-2">
                {mockFindings.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg px-3 py-2.5 text-[13px]"
                    style={{
                      backgroundColor: f.bg,
                      border: `1px solid ${f.border}`,
                      color: f.color,
                    }}
                  >
                    <span className="mt-0.5 shrink-0" style={{ color: f.color }}>
                      {f.icon}
                    </span>
                    <span className="leading-snug">{f.text}</span>
                  </div>
                ))}
              </div>

              <div
                className="h-px w-full"
                style={{ backgroundColor: 'var(--color-border)' }}
                aria-hidden="true"
              />

              {/* Savings */}
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-medium uppercase tracking-wide" style={{ color: 'var(--color-ink-tertiary)' }}>
                  Ahorro potencial detectado
                </p>
                <p className="text-[18px] font-bold font-serif" style={{ color: 'var(--color-accent)' }}>
                  $47.200<span className="text-[13px] font-sans font-medium">/mes</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
