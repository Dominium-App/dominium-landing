'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import AppScreen from './app-screen'
import FinanzasSheet from './finanzas-sheet'
import Indice from './indice'
import PagoSheet from './pago-sheet'
import PhoneFrame from './phone-frame'
import WhatsappVero, { type Turno } from './whatsapp-vero'

const chatPago: Turno[] = [
  { de: 'vecino', texto: '¿Cuánto debo?', hora: '09:12' },
  {
    de: 'vero',
    texto:
      'Julio: $ 184.500, vence el 1/7. Transferí a torre.madero.consorcio y se imputa sola.',
    hora: '09:12',
  },
  { de: 'vecino', texto: 'Listo, ya transferí', hora: '09:26' },
  {
    de: 'vero',
    texto: 'Recibido: $ 184.500,00 imputados a 4°B. Quedás al día, con la boleta en la app.',
    hora: '09:27',
  },
]

type Escena = {
  n: string
  titulo: string
  copy: string
  nota: string
  media: ReactNode
}

const escenas: Escena[] = [
  {
    n: '01',
    titulo: 'Vero vive en el WhatsApp de siempre.',
    copy: 'No hay portal con clave que nadie usa. Le escribís como a cualquier contacto: conoce tu unidad, tu deuda, el reglamento y la historia del edificio, y resuelve en la misma conversación.',
    nota: 'Si algo la excede, lo toma una persona del equipo y te avisa quién.',
    media: (
      <PhoneFrame label="Conversación de WhatsApp con Vero: un vecino pregunta cuánto debe, Vero le pasa el monto, el vencimiento y el alias del consorcio, y le confirma la imputación cuando llega la transferencia">
        <WhatsappVero hora="09:12" turnos={chatPago} />
      </PhoneFrame>
    ),
  },
  {
    n: '02',
    titulo: 'Tus expensas, sin misterio.',
    copy: 'Abrís la app y sabés dónde estás parado: cuánto vence, cuándo y si estás al día. Cada expensa trae su desglose por categoría, y la mora se calcula sola con el interés a la vista.',
    nota: 'Si pagás de más, queda como saldo a favor y se descuenta de la próxima.',
    media: (
      <PhoneFrame label="Pantalla de inicio de la app de Dominium: la expensa de julio con su vencimiento y botón de pagar, el saldo a favor, el balance del consorcio y los accesos a reservas y documentos">
        <AppScreen />
      </PhoneFrame>
    ),
  },
  {
    n: '03',
    titulo: 'Transferís. Se imputa solo.',
    copy: 'El consorcio tiene su propia cuenta con CVU y alias. Copiás los datos, transferís el monto exacto desde el banco o la billetera que uses, y el pago se acredita a tu unidad.',
    nota: 'Sin comprobante, sin esperar que alguien lo cargue a mano.',
    media: <PagoSheet />,
  },
  {
    n: '04',
    titulo: 'Cada peso del edificio, a la vista.',
    copy: 'El balance del consorcio y todos sus movimientos, mes por mes: qué entró, qué se pagó y a quién. Cada egreso con su comprobante y su factura conciliada, a un tap.',
    nota: 'Y detrás, el equipo compara cada gasto contra la escala SUTERH, los honorarios CAPHAI y valores de zona.',
    media: <FinanzasSheet />,
  },
]

function Texto({ escena }: { escena: Escena }) {
  return (
    <>
      <span className="hairline-caps text-gold-deep">{escena.n}</span>
      <h3 className="headline mt-5 text-[clamp(28px,4vw,54px)] text-ink">{escena.titulo}</h3>
      <p className="mt-6 max-w-[50ch] text-[16.5px] leading-relaxed text-ink-2 md:text-[18px]">
        {escena.copy}
      </p>
      <p className="mt-5 max-w-[46ch] border-l-2 border-forest/25 pl-4 text-[15px] leading-relaxed text-ink-3">
        {escena.nota}
      </p>
    </>
  )
}

export default function Adentro() {
  const [activa, setActiva] = useState(0)
  const paneles = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiva(Number(entry.target.getAttribute('data-escena')))
          }
        }
      },
      { rootMargin: '-48% 0px -48% 0px' },
    )
    for (const panel of paneles.current) {
      if (panel) observer.observe(panel)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="producto"
      className="relative bg-canvas py-24 md:py-32"
      aria-label="Así se ve un edificio administrado por Dominium"
    >
      <div className="mx-auto max-w-[1240px] px-6">
        <Indice n="03" label="Cómo funciona" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-20">
          <h2 className="headline text-[clamp(32px,4.8vw,64px)] text-ink">
            Un edificio Dominium,
            <br />
            por dentro.
          </h2>
          <p
            className="s-rise max-w-[46ch] text-[17px] leading-relaxed text-ink-2 lg:pb-3"
            style={{ '--d': 0.3 } as CSSProperties}
          >
            Cuatro pantallas reales de la app que usan los vecinos hoy. Nada de esto es una
            promesa: es lo que pasa el primer día.
          </p>
        </div>

        <div className="mt-16 hidden lg:grid lg:grid-cols-[1fr_420px] lg:gap-24">
          <div>
            {escenas.map((escena, i) => (
              <div
                key={escena.n}
                data-escena={i}
                ref={(el) => {
                  paneles.current[i] = el
                }}
                className="flex min-h-[80vh] flex-col justify-center"
              >
                <div
                  className="transition-[opacity,transform] duration-500 ease-(--ease-out-soft)"
                  style={{
                    opacity: activa === i ? 1 : 0.28,
                    transform: activa === i ? 'none' : 'translateY(6px)',
                  }}
                >
                  <Texto escena={escena} />
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="sticky top-[13vh] flex h-[74vh] items-center">
              <div className="relative flex h-full w-full items-center justify-center">
                {escenas.map((escena, i) => (
                  <div
                    key={escena.n}
                    className="absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-500 ease-(--ease-out-soft)"
                    style={{
                      opacity: activa === i ? 1 : 0,
                      transform: activa === i ? 'none' : 'translateY(18px) scale(0.965)',
                      pointerEvents: activa === i ? 'auto' : 'none',
                    }}
                    aria-hidden={activa !== i}
                  >
                    {escena.media}
                  </div>
                ))}
              </div>

              <ol className="absolute -left-12 top-1/2 flex -translate-y-1/2 flex-col gap-3" aria-hidden="true">
                {escenas.map((escena, i) => (
                  <li
                    key={escena.n}
                    className="h-6 w-px origin-center transition-[background-color,transform] duration-300"
                    style={{
                      backgroundColor:
                        activa === i ? 'var(--forest)' : 'var(--color-border-strong)',
                      transform: activa === i ? 'scaleY(1)' : 'scaleY(0.6)',
                    }}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-20 lg:hidden">
          {escenas.map((escena) => (
            <div key={escena.n}>
              <div className="s-lift flex justify-center" style={{ '--d': 0.2 } as CSSProperties}>
                {escena.media}
              </div>
              <div className="s-rise mt-9" style={{ '--d': 0.5 } as CSSProperties}>
                <Texto escena={escena} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
