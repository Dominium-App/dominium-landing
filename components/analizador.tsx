'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Upload,
  Building2,
  Sparkles,
  Wrench,
  PiggyBank,
  Zap,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  MessageSquare,
} from 'lucide-react'

// Vero mark
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

// Score arc SVG
function ScoreArc({ score, animate }: { score: number; animate: boolean }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  // Map 0-100 to 3/4 of circle (270°)
  const offset = circumference - (circumference * 0.75 * score) / 100

  return (
    <svg width="140" height="140" viewBox="0 0 140 140" aria-hidden="true">
      {/* Background track */}
      <circle
        cx="70"
        cy="70"
        r={radius}
        fill="none"
        stroke="#D0E8F5"
        strokeWidth="8"
        strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
        strokeDashoffset={circumference * 0.125}
        strokeLinecap="round"
        transform="rotate(135 70 70)"
      />
      {/* Animated fill */}
      <circle
        cx="70"
        cy="70"
        r={radius}
        fill="none"
        stroke="#3B7DD8"
        strokeWidth="8"
        strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
        strokeDashoffset={animate ? circumference * 0.125 + offset * 0.75 : circumference}
        strokeLinecap="round"
        transform="rotate(135 70 70)"
        style={{
          transition: animate ? 'stroke-dashoffset 1.2s ease 0.3s' : 'none',
        }}
      />
      {/* Score text */}
      <text
        x="70"
        y="67"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="26"
        fontWeight="700"
        fill="#0D0D0B"
        fontFamily="var(--font-playfair), serif"
      >
        {score}
      </text>
      <text
        x="70"
        y="86"
        textAnchor="middle"
        fontSize="12"
        fill="#9B9A96"
        fontFamily="var(--font-dm-sans), sans-serif"
      >
        de 100
      </text>
    </svg>
  )
}

const analysisMessages = [
  'Identificando categorías de gasto...',
  'Comparando con 500+ edificios similares...',
  'Detectando anomalías financieras...',
  'Calculando ahorro potencial...',
]

const resultRows = [
  {
    Icon: Building2,
    name: 'Consorcio general',
    amount: '$124.000',
    status: 'Normal' as const,
    detail: 'Dentro del rango esperado para su tipo de edificio',
  },
  {
    Icon: Sparkles,
    name: 'Servicio de limpieza',
    amount: '$89.000',
    status: 'Alerta' as const,
    detail: '34% por encima del promedio para edificios de este tipo',
  },
  {
    Icon: Wrench,
    name: 'Mantenimiento ascensores',
    amount: '$45.000',
    status: 'Revisar' as const,
    detail: 'Sin contrato visible. Recomendamos solicitar documentación',
  },
  {
    Icon: Zap,
    name: 'Gas y electricidad',
    amount: '$67.000',
    status: 'Normal' as const,
    detail: 'Acorde al promedio estacional',
  },
  {
    Icon: PiggyBank,
    name: 'Fondo de reserva',
    amount: '$12.000',
    status: 'Alerta' as const,
    detail: 'Acumulación insuficiente. El mínimo recomendado es $38.000',
  },
]

const statusConfig = {
  Normal: {
    bg: '#F0FAF5',
    border: '#B6E8CC',
    text: '#1A7A4A',
    Icon: CheckCircle2,
  },
  Revisar: {
    bg: '#FFFBEB',
    border: '#FCD34D',
    text: '#B45309',
    Icon: AlertTriangle,
  },
  Alerta: {
    bg: '#FEF2F2',
    border: '#FCA5A5',
    text: '#C0392B',
    Icon: XCircle,
  },
}

type AnalyzerState = 'upload' | 'analyzing' | 'results'

export default function Analizador() {
  const [state, setState] = useState<AnalyzerState>('upload')
  const [isDragging, setIsDragging] = useState(false)
  const [msgIndex, setMsgIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showAlt, setShowAlt] = useState(false)
  const [altValue, setAltValue] = useState('')
  const [rowsVisible, setRowsVisible] = useState(false)
  const [scoreAnimate, setScoreAnimate] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [sectionVisible, setSectionVisible] = useState(false)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const msgRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const startAnalysis = useCallback(() => {
    setState('analyzing')
    setProgress(0)
    setMsgIndex(0)

    // Progress bar
    let p = 0
    progressRef.current = setInterval(() => {
      p += 100 / 40 // 4 seconds, 100ms intervals
      setProgress(Math.min(p, 100))
    }, 100)

    // Rotating messages
    msgRef.current = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % analysisMessages.length)
    }, 2000)

    // After 4 seconds → results
    setTimeout(() => {
      clearInterval(progressRef.current!)
      clearInterval(msgRef.current!)
      setState('results')
      setTimeout(() => {
        setRowsVisible(true)
        setScoreAnimate(true)
      }, 200)
    }, 4200)
  }, [])

  useEffect(() => {
    return () => {
      if (progressRef.current) clearInterval(progressRef.current)
      if (msgRef.current) clearInterval(msgRef.current)
    }
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = () => setIsDragging(false)
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length > 0) {
      setTimeout(() => startAnalysis(), 400)
    }
  }
  const handleFileChange = () => {
    setTimeout(() => startAnalysis(), 400)
  }

  return (
    <section
      ref={sectionRef}
      id="analizador"
      className="py-[100px] md:py-[120px]"
      style={{ backgroundColor: 'var(--color-bg)' }}
      aria-label="Analizador de expensas Vero"
    >
      <div className="mx-auto max-w-[1120px] px-6 flex flex-col items-center gap-10">
        {/* Section header */}
        <div
          className="flex flex-col items-center gap-4 text-center"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p
            className="text-[12px] font-semibold tracking-[0.1em] uppercase"
            style={{ color: 'var(--color-vero)' }}
          >
            Vero · Analizador de Expensas
          </p>
          <h2
            className="font-serif font-bold text-balance leading-[1.15]"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)', color: 'var(--color-ink)' }}
          >
            Entendé qué pagás<br />para pagar menos.
          </h2>
          <p
            className="text-[16px] leading-relaxed max-w-[520px]"
            style={{ color: 'var(--color-ink-secondary)' }}
          >
            Subí tu liquidación y Vero la analiza al instante. Detectamos ineficiencias, comparamos tus gastos con edificios similares, y te damos un informe listo para compartir con tu consejo.
          </p>
        </div>

        {/* Analyzer card */}
        <div
          className="w-full max-w-[800px] rounded-[16px] overflow-hidden"
          style={{
            backgroundColor: 'var(--color-surface)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 8px 40px rgba(0,0,0,0.10)',
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
          }}
        >
          {/* ---- STATE 1: UPLOAD ---- */}
          {state === 'upload' && (
            <div className="p-8 md:p-10 flex flex-col gap-6">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="flex flex-col items-center gap-4 rounded-[16px] py-12 px-6 text-center cursor-pointer transition-all duration-200"
                style={{
                  border: isDragging
                    ? '2px solid #3B7DD8'
                    : '2px dashed var(--color-border)',
                  backgroundColor: isDragging ? 'var(--color-vero-light)' : '#FAFAF8',
                }}
                aria-label="Zona de carga de liquidación"
              >
                <VeroMark size={40} />
                <div>
                  <p
                    className="text-[18px] font-semibold"
                    style={{ color: isDragging ? 'var(--color-vero)' : 'var(--color-ink)' }}
                  >
                    Arrastrá tu liquidación aquí
                  </p>
                  <p className="text-[13px] mt-1" style={{ color: 'var(--color-ink-tertiary)' }}>
                    PDF o imagen · Máximo 10MB
                  </p>
                </div>
                <label
                  className="inline-flex items-center h-[44px] px-5 rounded-full text-[14px] font-semibold cursor-pointer transition-colors duration-150"
                  style={{
                    border: '1.5px solid var(--color-accent)',
                    color: 'var(--color-accent)',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = 'var(--color-accent-glow)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  Elegir archivo
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                    aria-label="Seleccionar archivo de liquidación"
                  />
                </label>
              </div>

              {/* Alt: manual amount */}
              <div className="flex flex-col items-center gap-3">
                {!showAlt ? (
                  <button
                    className="text-[14px] font-medium transition-colors duration-150"
                    style={{ color: 'var(--color-vero)' }}
                    onClick={() => setShowAlt(true)}
                  >
                    ¿No tenés el PDF? Ingresá el monto total →
                  </button>
                ) : (
                  <div className="flex items-center gap-3 w-full max-w-sm">
                    <div className="relative flex-1">
                      <span
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[15px] font-medium"
                        style={{ color: 'var(--color-ink-secondary)' }}
                      >
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="0"
                        value={altValue}
                        onChange={(e) => setAltValue(e.target.value)}
                        className="w-full h-[48px] pl-7 pr-4 rounded-lg text-[15px] outline-none transition-all duration-150"
                        style={{
                          border: '1.5px solid var(--color-border)',
                          backgroundColor: 'white',
                          color: 'var(--color-ink)',
                        }}
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor = 'var(--color-accent)')
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.borderColor = 'var(--color-border)')
                        }
                        aria-label="Monto total de expensas"
                      />
                    </div>
                    <button
                      className="h-[48px] px-5 rounded-lg text-[14px] font-semibold text-white"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                      onClick={() => altValue && startAnalysis()}
                    >
                      Analizar
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ---- STATE 2: ANALYZING ---- */}
          {state === 'analyzing' && (
            <div className="p-8 md:p-10 flex flex-col items-center gap-6">
              {/* Pulsing Vero circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--color-vero-light)',
                  animation: 'vero-pulse 1.4s ease-in-out infinite',
                }}
                aria-hidden="true"
              >
                <VeroMark size={36} />
              </div>

              <div className="text-center">
                <p
                  className="text-[16px] font-medium"
                  style={{ color: 'var(--color-ink)' }}
                >
                  Vero está analizando tu liquidación...
                </p>
                <p
                  className="text-[14px] mt-1 min-h-[20px] transition-all duration-300"
                  style={{ color: 'var(--color-ink-tertiary)' }}
                  aria-live="polite"
                >
                  {analysisMessages[msgIndex]}
                </p>
              </div>

              {/* Progress bar */}
              <div
                className="w-full max-w-sm rounded-full overflow-hidden"
                style={{ height: '3px', backgroundColor: '#E2E0DA' }}
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full transition-all duration-100"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: 'var(--color-vero)',
                  }}
                />
              </div>
            </div>
          )}

          {/* ---- STATE 3: RESULTS ---- */}
          {state === 'results' && (
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left: result rows */}
                <div className="lg:col-span-3 flex flex-col gap-3">
                  <p
                    className="text-[13px] font-semibold uppercase tracking-wide mb-1"
                    style={{ color: 'var(--color-ink-tertiary)' }}
                  >
                    Análisis por categoría
                  </p>
                  {resultRows.map((row, i) => {
                    const cfg = statusConfig[row.status]
                    return (
                      <article
                        key={i}
                        className="flex items-start gap-3 rounded-xl p-4"
                        style={{
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'var(--color-surface)',
                          opacity: rowsVisible ? 1 : 0,
                          transform: rowsVisible ? 'translateX(0)' : 'translateX(-8px)',
                          transition: `opacity 0.4s ease ${i * 80}ms, transform 0.4s ease ${i * 80}ms`,
                        }}
                      >
                        {/* Category icon */}
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: 'var(--color-accent-glow)' }}
                          aria-hidden="true"
                        >
                          <row.Icon size={18} color="var(--color-accent)" />
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <p className="text-[14px] font-semibold" style={{ color: 'var(--color-ink)' }}>
                              {row.name}
                            </p>
                            <span
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                              style={{
                                backgroundColor: cfg.bg,
                                color: cfg.text,
                                border: `1px solid ${cfg.border}`,
                              }}
                            >
                              <cfg.Icon size={10} />
                              {row.status}
                            </span>
                          </div>
                          <p className="text-[13px] font-semibold mt-0.5" style={{ color: 'var(--color-ink)' }}>
                            {row.amount}
                          </p>
                          <p className="text-[12px] leading-snug mt-1" style={{ color: 'var(--color-ink-secondary)' }}>
                            {row.detail}
                          </p>
                        </div>
                      </article>
                    )
                  })}
                </div>

                {/* Right: score card */}
                <div
                  className="lg:col-span-2 rounded-[12px] p-5 flex flex-col gap-4"
                  style={{
                    backgroundColor: 'var(--color-vero-light)',
                    borderLeft: '3px solid var(--color-vero)',
                    opacity: rowsVisible ? 1 : 0,
                    transition: 'opacity 0.5s ease 0.4s',
                  }}
                >
                  {/* Vero header */}
                  <div className="flex items-center gap-2">
                    <VeroMark size={28} />
                    <p className="text-[13px] font-semibold" style={{ color: 'var(--color-vero)' }}>
                      Análisis de Vero
                    </p>
                  </div>

                  {/* Score arc */}
                  <div className="flex justify-center">
                    <ScoreArc score={62} animate={scoreAnimate} />
                  </div>
                  <p
                    className="text-[13px] text-center leading-snug"
                    style={{ color: 'var(--color-ink-secondary)' }}
                  >
                    Tu liquidación tiene oportunidades de mejora
                  </p>

                  <div
                    className="h-px w-full"
                    style={{ backgroundColor: '#C8DCF3' }}
                    aria-hidden="true"
                  />

                  {/* Savings */}
                  <div>
                    <p
                      className="text-[11px] font-semibold uppercase tracking-widest"
                      style={{ color: 'var(--color-ink-tertiary)' }}
                    >
                      Ahorro potencial estimado
                    </p>
                    <p
                      className="font-serif font-bold mt-1"
                      style={{ fontSize: '28px', color: 'var(--color-accent)' }}
                    >
                      $47.200<span className="text-[14px] font-sans font-medium">&nbsp;/ mes</span>
                    </p>
                  </div>

                  {/* Vero quote */}
                  <p
                    className="text-[13px] italic leading-relaxed"
                    style={{ color: 'var(--color-ink-secondary)', fontWeight: 300 }}
                  >
                    &ldquo;Detecté 2 servicios con precios por encima del mercado y un fondo de reserva que no cumple la normativa vigente.&rdquo;
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div
                className="mt-6 flex flex-col sm:flex-row items-center gap-3"
                style={{
                  opacity: rowsVisible ? 1 : 0,
                  transition: 'opacity 0.5s ease 0.6s',
                }}
              >
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 h-[50px] px-6 rounded-full text-[15px] font-semibold text-white transition-colors duration-150"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = 'var(--color-accent-light)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'var(--color-accent)')
                  }
                >
                  <MessageSquare size={16} />
                  Hablar con Dominium sobre tu edificio →
                </a>
                <button
                  className="inline-flex items-center gap-2 h-[50px] px-6 rounded-full text-[15px] font-semibold transition-all duration-150"
                  style={{
                    border: '1.5px solid var(--color-accent)',
                    color: 'var(--color-accent)',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = 'var(--color-accent-glow)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  <Download size={16} />
                  Descargar informe completo (PDF)
                </button>
              </div>
              <p
                className="mt-3 text-[12px] text-center"
                style={{
                  color: 'var(--color-ink-tertiary)',
                  opacity: rowsVisible ? 1 : 0,
                  transition: 'opacity 0.5s ease 0.7s',
                }}
              >
                Compartí este análisis en el grupo de tu edificio y pedí un cambio
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
