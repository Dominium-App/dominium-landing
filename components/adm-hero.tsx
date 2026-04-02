'use client'

import { useEffect, useState } from 'react'

const transitionSteps = [
  { label: 'Tu cartera de hoy' },
  { label: 'Conversación privada' },
  { label: 'Propuesta a tu medida' },
  { label: 'Tus clientes, en buenas manos' },
]

export default function AdmHero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      className="relative pt-32 pb-[100px] md:pb-[120px] overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)' }}
      aria-label="Hero — Administradores de consorcio"
    >
      {/* Subtle background decoration */}
      <div
        className="absolute right-0 bottom-0 w-[60%] h-[80%] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 80% 80%, var(--color-accent-glow) 0%, transparent 65%)',
          opacity: 0.6,
        }}
      />

      <div className="relative mx-auto max-w-[1120px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="flex flex-col gap-6">
            <p
              className="text-[12px] font-semibold tracking-[0.1em] uppercase"
              style={{
                color: 'var(--color-accent)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
              }}
            >
              Para Administradores
            </p>

            <h1
              className="font-serif font-bold text-balance leading-[1.1]"
              style={{
                fontSize: 'clamp(30px, 4.5vw, 56px)',
                color: 'var(--color-ink)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
              }}
            >
              Construiste tu cartera durante décadas.{' '}
              <span style={{ color: 'var(--color-accent)' }}>Retírate tranquilo.</span>
            </h1>

            <p
              className="text-[17px] leading-relaxed max-w-[460px]"
              style={{
                color: 'var(--color-ink-secondary)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s',
              }}
            >
              Dominium trabaja con administradores que quieren hacer una transición ordenada.
              Tus clientes quedan en las mejores manos. Tu reputación, intacta.
            </p>

            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s',
              }}
            >
              <a
                href="#contacto"
                className="inline-flex items-center h-[52px] px-7 rounded-full text-[16px] font-semibold text-white transition-colors duration-150"
                style={{ backgroundColor: 'var(--color-accent)', letterSpacing: '0.01em' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = 'var(--color-accent-light)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'var(--color-accent)')
                }
              >
                Hablemos en privado →
              </a>
            </div>
          </div>

          {/* Right: transition card */}
          <div
            className="flex justify-center lg:justify-end"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s',
            }}
          >
            <div
              className="w-full max-w-[360px] rounded-[16px] p-8 flex flex-col gap-6"
              style={{
                backgroundColor: 'var(--color-accent)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 40px rgba(0,0,0,0.10)',
              }}
              aria-label="Cómo es una transición ordenada"
            >
              <p
                className="text-[13px] font-semibold tracking-[0.08em] uppercase"
                style={{ color: '#8ABF9A' }}
              >
                Transición Ordenada
              </p>

              <div className="flex flex-col gap-0">
                {transitionSteps.map((step, i) => {
                  const isLast = i === transitionSteps.length - 1
                  return (
                    <div key={i} className="flex gap-4">
                      {/* Timeline column */}
                      <div className="flex flex-col items-center">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: isLast
                              ? '#8ABF9A'
                              : 'rgba(255,255,255,0.12)',
                          }}
                          aria-hidden="true"
                        >
                          {isLast ? (
                            /* Checkmark for last step */
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path
                                d="M2 6l3 3 5-5"
                                stroke="var(--color-accent)"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: 'rgba(255,255,255,0.45)' }}
                            />
                          )}
                        </div>
                        {!isLast && (
                          <div
                            className="w-px flex-1 my-1.5"
                            style={{
                              backgroundColor: 'rgba(255,255,255,0.15)',
                              minHeight: '28px',
                            }}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      {/* Step label */}
                      <p
                        className="text-[14px] leading-snug"
                        style={{
                          color: isLast ? '#8ABF9A' : 'rgba(255,255,255,0.75)',
                          fontWeight: isLast ? 600 : 400,
                          paddingBottom: !isLast ? '20px' : '0',
                        }}
                      >
                        {step.label}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div
                className="pt-2 border-t"
                style={{ borderColor: 'rgba(255,255,255,0.12)' }}
              >
                <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Sin presión. Sin conflictos. A tus tiempos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
