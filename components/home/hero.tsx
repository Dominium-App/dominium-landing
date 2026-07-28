import type { CSSProperties } from 'react'
import Boton from './boton'
import Edificios from './edificios'
import EscenaPuntero from './escena-puntero'
import VeroAvatar from './vero-avatar'
import { WHATSAPP_VECINO } from '@/lib/contacto'

const mensajes = [
  {
    de: 'vecino' as const,
    hora: '02:47',
    texto: 'Vero, hay una pérdida de agua grande en la cochera',
  },
  {
    de: 'vero' as const,
    hora: '02:47',
    texto:
      '¿Podés cerrar la llave de paso del pasillo de cocheras? Es la roja, al lado del medidor.',
  },
  {
    de: 'vero' as const,
    hora: '02:48',
    texto:
      'Plomero de guardia en camino, llega 3:20. Abrí la gestión #481 así seguís todo desde la app.',
  },
]

export default function Hero() {
  return (
    <EscenaPuntero
      className="relative isolate overflow-hidden bg-night pb-16 pt-24 md:pb-20 md:pt-32"
      label="Dominium, administración de consorcios con inteligencia artificial en CABA y AMBA"
    >
      <div
        className="rules pointer-events-none absolute inset-0 opacity-70"
        style={{ '--rule-cols': 6, '--rule-ink': 'rgba(244,246,241,0.05)' } as CSSProperties}
        aria-hidden="true"
      />
      <div
        className="rules rules-luz pointer-events-none absolute inset-0"
        style={{ '--rule-cols': 6, '--rule-ink': 'rgba(234,192,98,0.42)' } as CSSProperties}
        aria-hidden="true"
      />
      <div className="luz-puntero pointer-events-none absolute inset-0" aria-hidden="true" />

      <div
        className="capa-mouse capa-lejos pointer-events-none absolute inset-x-0 bottom-[-28px] h-[150px] text-on-forest-faint md:h-[230px]"
        aria-hidden="true"
      >
        <Edificios className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-6">
        <div className="hero-line flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <span className="hairline-caps text-on-forest-dim">
            CABA y AMBA · Administración de consorcios
          </span>
          <span className="hairline-caps flex items-center gap-2 text-gold-light">
            <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />
            Vero en línea
          </span>
        </div>

        <h1 className="mt-10 text-[clamp(38px,7vw,96px)] text-on-forest md:mt-14">
          <span className="hero-line display block" style={{ animationDelay: '120ms' }}>
            La administración
          </span>
          <span className="hero-line display block" style={{ animationDelay: '220ms' }}>
            de consorcios que atiende
          </span>
          <span className="halo-gold inline-block">
            <span
              className="hero-line display block text-gold-light"
              style={{ animationDelay: '320ms' }}
            >
              a las 2:47 de la mañana.
            </span>
          </span>
        </h1>

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-20">
          <div className="hero-line" style={{ animationDelay: '460ms' }}>
            <span className="block h-px w-full bg-on-forest-faint" aria-hidden="true" />
            <p className="mt-7 max-w-[46ch] text-[17px] leading-relaxed text-on-forest-dim md:text-[19px]">
              Vero, nuestra IA, responde a los vecinos por WhatsApp las 24 horas. La plata del
              edificio vive en una cuenta propia regulada por BCRA y cada gasto queda a la vista
              en la app.{' '}
              <span className="text-on-forest">Sin comisiones de proveedores ni cajas paralelas.</span>
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Boton href="/#analizador" tone="bone">
                Auditar mis expensas gratis
              </Boton>
              <Boton href={WHATSAPP_VECINO} tone="ghost-bone" external>
                Escribirle a Vero
              </Boton>
            </div>

            <p className="hairline-caps mt-7 text-on-forest-faint">
              Sin registro · 60 segundos · Datos cifrados
            </p>
          </div>

          <figure
            className="capa-mouse capa-cerca relative lg:pt-1"
            role="img"
            aria-label="Conversación real de WhatsApp a las 2:47 de la mañana: un vecino avisa una pérdida de agua en la cochera, Vero le indica qué llave cerrar y despacha al plomero de guardia"
          >
            <figcaption
              className="hero-msg flex items-center gap-2.5 pb-4"
              style={{ animationDelay: '520ms' }}
            >
              <VeroAvatar size={30} className="ring-1 ring-on-forest-faint" />
              <span className="text-[13px] font-medium text-on-forest-dim">
                Vero · Torre Madero
              </span>
            </figcaption>

            <div className="flex flex-col gap-3">
              {mensajes.map((m, i) => (
                <div
                  key={m.texto}
                  className={`hero-msg flex ${m.de === 'vecino' ? 'justify-end' : 'justify-start'}`}
                  style={{ animationDelay: `${600 + i * 220}ms` }}
                >
                  <p
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-[14.5px] leading-snug ${
                      m.de === 'vecino'
                        ? 'rounded-tr-md border border-on-forest-faint bg-white/[0.07] text-on-forest'
                        : 'rounded-tl-md bg-on-forest text-forest-deep shadow-(--shadow-sheet)'
                    }`}
                  >
                    {m.texto}
                    <span
                      className={`mt-1.5 block text-[10.5px] tracking-wide ${
                        m.de === 'vecino' ? 'text-on-forest-faint' : 'text-ink-3'
                      }`}
                    >
                      {m.hora}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </figure>
        </div>

        <div
          className="hero-line mt-16 flex items-center gap-3 md:mt-24"
          style={{ animationDelay: '900ms' }}
        >
          <span
            className="relative flex h-9 w-px overflow-hidden bg-on-forest-faint"
            aria-hidden="true"
          >
            <span className="cue-run absolute inset-0 bg-gold-light" />
          </span>
          <span className="hairline-caps text-on-forest-faint">Seguí bajando</span>
        </div>
      </div>
    </EscenaPuntero>
  )
}
