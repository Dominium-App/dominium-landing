'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'

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
    icon: <XCircle size={16} />,
    text: 'Honorarios admin — 47% por encima del mercado',
    color: '#C0392B',
    bg: '#FEF2F2',
    border: '#FCA5A5',
  },
  {
    icon: <AlertTriangle size={16} />,
    text: 'Factura de ascensor duplicada — $89.400',
    color: '#B45309',
    bg: '#FFFBEB',
    border: '#FCD34D',
  },
  {
    icon: <XCircle size={16} />,
    text: 'Fondo de reserva sin movimiento documentado',
    color: '#C0392B',
    bg: '#FEF2F2',
    border: '#FCA5A5',
  },
  {
    icon: <CheckCircle2 size={16} />,
    text: 'Sueldo encargado — alineado a escala SUTERH',
    color: '#1A7A4A',
    bg: '#F0FAF5',
    border: '#B6E8CC',
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
              La primera administradora AI-first de Argentina
            </p>

            {/* H1 */}
            <h1
              className="hero-reveal font-serif font-bold leading-[1.05] tracking-[-0.02em] text-balance"
              style={{
                fontSize: 'clamp(36px, 5vw, 60px)',
                color: 'var(--color-ink)',
              }}
            >
              Las expensas no paran<br />
              de subir y nadie te<br />
              explica por qué.<br />
              <span style={{ color: 'var(--color-accent)' }}>Nosotros sí.</span>
            </h1>

            {/* Subheadline */}
            <p
              className="hero-reveal text-[18px] leading-relaxed max-w-[480px]"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              Subí tu última liquidación. En 60 segundos, <strong>Vero</strong> (nuestra IA) te muestra <strong>partida por partida</strong> cuánto pagás de más, qué rubros no están justificados y dónde se está yendo el fondo de reserva.
            </p>

            {/* CTAs */}
            <div className="hero-reveal flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#analizador"
                  className="inline-flex items-center justify-center h-[52px] px-6 rounded-full text-[15px] font-semibold text-white transition-colors duration-150"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent-light)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent)')}
                >
                  Auditar mi liquidación gratis →
                </a>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center h-[52px] px-6 rounded-full text-[15px] font-semibold transition-colors duration-150"
                  style={{
                    border: '1.5px solid var(--color-border-strong, #D5D2CC)',
                    color: 'var(--color-ink)',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-alt, #F0EFEB)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  Ver cómo funciona ↓
                </a>
              </div>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: 'var(--color-ink-tertiary)' }}
              >
                Sin registro · Resultado en 60s · Auditoría con IA · Datos cifrados
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
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <VeroMark size={36} />
                  <div>
                    <p className="text-[13px] font-semibold" style={{ color: 'var(--color-ink)' }}>
                      Así se ve un informe de Vero
                    </p>
                    <p className="text-[12px]" style={{ color: 'var(--color-ink-tertiary)' }}>
                      Ejemplo ilustrativo · El tuyo será específico
                    </p>
                  </div>
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

              {/* Before/After savings */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="rounded-lg p-3"
                  style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: '#9A2E22' }}>
                    Pagás hoy
                  </p>
                  <p className="text-[18px] font-bold font-serif mt-1" style={{ color: '#C0392B', textDecoration: 'line-through' }}>
                    $284.500
                  </p>
                </div>
                <div
                  className="rounded-lg p-3"
                  style={{ backgroundColor: 'var(--color-accent-glow)', border: '1px solid var(--color-accent)' }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: 'var(--color-accent)' }}>
                    Deberías pagar
                  </p>
                  <p className="text-[18px] font-bold font-serif mt-1" style={{ color: 'var(--color-accent)' }}>
                    $237.300
                  </p>
                </div>
              </div>
              <div
                className="rounded-lg px-3 py-2.5 flex items-center justify-between"
                style={{ backgroundColor: 'var(--color-ink)', color: 'white' }}
              >
                <p className="text-[12px] uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Ahorro / mes
                </p>
                <p className="text-[18px] font-bold font-serif">
                  $47.200
                  <span className="text-[12px] font-sans font-normal" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {' '}· $566K/año
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
