'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import AppScreen from './app-screen'
import FinanzasSheet from './finanzas-sheet'
import Indice from './indice'
import PhoneFrame from './phone-frame'
import WhatsappVero, { type Turno } from './whatsapp-vero'

const conversacion: Turno[] = [
  { de: 'vecino', texto: 'Hay una pérdida de agua en la cochera', hora: '02:47' },
  {
    de: 'vero',
    texto: 'Ya abrí la gestión #481. El plomero de guardia llega a las 3:20.',
    hora: '02:48',
  },
  {
    de: 'vero',
    texto: 'Martina, del equipo de Dominium, quedó a cargo. Podés seguir todo desde la app.',
    hora: '02:48',
  },
]

const escenas = [
  {
    n: '01',
    titulo: 'Escribís. Vero responde.',
    detalle:
      'Los vecinos usan el WhatsApp de siempre. Vero conoce la unidad y el edificio; cuando hace falta criterio humano, el equipo de Dominium toma la gestión.',
    media: (
      <PhoneFrame label="Conversación con Vero: una vecina informa una pérdida de agua, Vero abre la gestión y deriva el seguimiento al equipo humano de Dominium">
        <WhatsappVero hora="02:47" turnos={conversacion} />
      </PhoneFrame>
    ),
  },
  {
    n: '02',
    titulo: 'El edificio, en un solo lugar.',
    detalle:
      'Expensas, pagos, reclamos, documentos y reservas quedan ordenados en la app. Propietarios y consejo ven lo que necesitan sin perseguir al administrador.',
    media: (
      <PhoneFrame label="Inicio de la app de Dominium con la expensa pendiente, el saldo de la unidad, el balance del consorcio y accesos a reservas y documentos">
        <AppScreen />
      </PhoneFrame>
    ),
  },
  {
    n: '03',
    titulo: 'La plata queda a la vista.',
    detalle:
      'Cada ingreso y cada pago aparece en las finanzas del consorcio con su concepto y respaldo. El consejo puede entender qué pasó sin esperar una rendición.',
    media: <FinanzasSheet />,
  },
]

export default function Adentro() {
  const [activa, setActiva] = useState(0)
  const paneles = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    let frame: number | null = null

    const update = () => {
      frame = null
      const focusY = window.innerHeight * (window.innerWidth < 1024 ? 0.78 : 0.5)
      let siguiente = 0
      let distancia = Number.POSITIVE_INFINITY

      paneles.current.forEach((panel, i) => {
        if (!panel) return
        const rect = panel.getBoundingClientRect()
        const actual = Math.abs(rect.top + rect.height / 2 - focusY)
        if (actual < distancia) {
          distancia = actual
          siguiente = i
        }
      })

      setActiva(siguiente)
    }

    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      id="como-funciona"
      className="relative bg-canvas py-24 md:py-32"
      aria-label="Cómo administra Dominium"
    >
      <div className="mx-auto max-w-[1240px] px-6">
        <Indice n="02" label="Cómo funciona" />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
          <h2 className="headline max-w-[18ch] text-[clamp(34px,5.2vw,72px)] text-ink">
            Nosotros administramos. La tecnología hace el trabajo más rápido y visible.
          </h2>
          <p className="max-w-[50ch] text-[17px] leading-relaxed text-ink-2 lg:pb-3 md:text-[19px]">
            Dominium asume la gestión completa. Mientras bajás, mirá cómo una conversación se
            convierte en información clara para todo el edificio.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-24">
          <div className="sticky top-16 z-10 order-1 flex h-[430px] items-center justify-center overflow-hidden bg-canvas/95 backdrop-blur-sm lg:order-2 lg:top-[12vh] lg:h-[650px] lg:bg-transparent lg:backdrop-blur-none">
            <div className="relative flex h-full w-full items-center justify-center">
              {escenas.map((escena, i) => (
                <div
                  key={escena.n}
                  className="absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-500 ease-(--ease-out-soft)"
                  style={{
                    opacity: activa === i ? 1 : 0,
                    transform:
                      activa === i
                        ? 'translateY(0) scale(1)'
                        : i < activa
                          ? 'translateY(-24px) scale(0.96)'
                          : 'translateY(24px) scale(0.96)',
                    pointerEvents: activa === i ? 'auto' : 'none',
                  }}
                  aria-hidden={activa !== i}
                >
                  <div className="origin-center scale-[0.7] sm:scale-[0.78] lg:scale-100">
                    {escena.media}
                  </div>
                </div>
              ))}
            </div>

            <ol
              className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full border border-line bg-surface/90 px-3 py-2 shadow-sm lg:bottom-5"
              aria-label="Progreso de la demostración"
            >
              {escenas.map((escena, i) => (
                <li
                  key={escena.n}
                  className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                    activa === i ? 'w-7 bg-forest' : 'w-1.5 bg-line-strong'
                  }`}
                  aria-current={activa === i ? 'step' : undefined}
                />
              ))}
            </ol>
          </div>

          <ol className="order-2 lg:order-1">
            {escenas.map((escena, i) => (
              <li
                key={escena.n}
                ref={(element) => {
                  paneles.current[i] = element
                }}
                data-escena={i}
                className="flex min-h-[48vh] items-center border-t border-line py-12 last:border-b lg:min-h-[58vh] lg:py-16"
              >
                <div
                  className="max-w-[58ch] transition-[opacity,transform] duration-500 ease-(--ease-out-soft)"
                  style={{
                    opacity: activa === i ? 1 : 0.34,
                    transform: activa === i ? 'translateX(0)' : 'translateX(8px)',
                  }}
                >
                  <span className="hairline-caps text-gold-deep">{escena.n}</span>
                  <h3 className="headline mt-5 text-[clamp(30px,4vw,52px)] text-ink">
                    {escena.titulo}
                  </h3>
                  <p className="mt-5 max-w-[48ch] text-[16.5px] leading-relaxed text-ink-2 md:text-[18px]">
                    {escena.detalle}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p
          className="s-rise mt-12 max-w-[58ch] border-l-2 border-forest/25 pl-5 text-[16px] leading-relaxed text-ink-2 lg:mt-6"
          style={{ '--d': 0.2 } as CSSProperties}
        >
          La tecnología ordena y automatiza. La responsabilidad de administrar sigue siendo de
          Dominium.
        </p>
      </div>
    </section>
  )
}
