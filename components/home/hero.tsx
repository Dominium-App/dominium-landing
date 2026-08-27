import type { CSSProperties } from 'react'
import { Check, Droplets, UserRound } from 'lucide-react'
import { WHATSAPP_CONSEJO } from '@/lib/contacto'
import Boton from './boton'
import Edificios from './edificios'

const eventos = [
  { hora: '02:47', texto: 'Vero recibe el reclamo y explica cómo cortar el agua.' },
  { hora: '02:48', texto: 'La gestión pasa a Martina, del equipo de Dominium.' },
  { hora: '02:49', texto: 'Plomero de guardia despachado.' },
  { hora: '03:20', texto: 'Llegada estimada al edificio.' },
]

export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-night pb-20 pt-24 md:pb-24 md:pt-28"
      aria-label="Dominium, administración de consorcios en CABA y AMBA"
    >
      <div
        className="rules pointer-events-none absolute inset-0 opacity-70"
        style={{ '--rule-cols': 6, '--rule-ink': 'rgba(244,246,241,0.05)' } as CSSProperties}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-[3vw] top-24 select-none md:top-16"
        aria-hidden="true"
      >
        <span className="ghost-numeral numeral block text-[32vw] leading-none opacity-25 md:text-[18vw]">
          02:47
        </span>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-28px] h-[150px] text-on-forest-faint md:h-[230px]"
        aria-hidden="true"
      >
        <Edificios className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-6">
        <div className="hero-line flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <span className="hairline-caps text-on-forest-dim">
            CABA y AMBA · Administración de consorcios
          </span>
          <span className="hairline-caps flex items-center gap-2 text-on-forest-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />
            Vero · IA en línea
          </span>
        </div>

        <div className="mt-12 grid gap-14 md:mt-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end lg:gap-24">
          <div>
            <h1 className="headline max-w-[11ch] text-[clamp(48px,7.6vw,104px)] text-on-forest">
              <span className="hero-line block" style={{ animationDelay: '120ms' }}>
                Administramos
              </span>
              <span className="hero-line block" style={{ animationDelay: '220ms' }}>
                tu consorcio.
              </span>
              <span
                className="hero-line mt-4 block max-w-[13ch] text-[clamp(32px,4.3vw,58px)] text-gold-light md:mt-6"
                style={{ animationDelay: '320ms' }}
              >
                Con una IA que atiende siempre.
              </span>
            </h1>

            <div className="hero-line mt-10 max-w-[690px]" style={{ animationDelay: '440ms' }}>
              <span className="block h-px w-full bg-on-forest-faint" aria-hidden="true" />
              <p className="mt-7 max-w-[54ch] text-[18px] leading-relaxed text-on-forest-dim md:text-[20px]">
                Vero responde a los vecinos por WhatsApp las 24 horas. Cuando una gestión
                necesita criterio, coordinación o presencia en el edificio, la toma nuestro
                equipo. Todo queda registrado y visible.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Boton href={WHATSAPP_CONSEJO} tone="bone" external>
                  Hablar sobre mi edificio
                </Boton>
                <Boton href="/#analizador" tone="ghost-bone">
                  Auditar mis expensas
                </Boton>
              </div>

              <p className="hairline-caps mt-7 text-on-forest-faint">
                Administración completa · Equipo humano · Información a la vista
              </p>
            </div>
          </div>

          <figure
            className="hero-line relative mx-auto w-full max-w-[420px] rotate-[1deg] rounded-[26px] bg-paper p-5 text-ink shadow-(--shadow-sheet) transition-transform duration-500 ease-(--ease-out-soft) hover:rotate-0 md:p-6"
            style={{ animationDelay: '520ms' }}
            role="img"
            aria-label="Ejemplo de una gestión de madrugada: Vero recibe el reclamo de un vecino, lo deriva al equipo de Dominium y se despacha un plomero de guardia"
          >
            <div className="flex items-start justify-between gap-4 border-b border-paper-line pb-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-alerta-soft text-alerta">
                  <Droplets size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="hairline-caps text-gold-deep">Vero + equipo · Gestión #481</p>
                  <h2 className="mt-1 text-[18px] font-semibold leading-tight text-ink">
                    Pérdida de agua
                  </h2>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-live-soft px-3 py-1.5 text-[11px] font-semibold text-live-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />
                En curso
              </span>
            </div>

            <div className="relative mt-5">
              <span
                className="absolute bottom-5 left-[53px] top-5 w-px bg-paper-line"
                aria-hidden="true"
              />
              <ol>
                {eventos.map((evento, i) => (
                  <li key={evento.hora} className="relative grid grid-cols-[42px_14px_1fr] gap-2 py-3">
                    <time className="font-mono text-[11px] font-medium text-ink-3">{evento.hora}</time>
                    <span
                      className={`relative z-10 mt-1 h-2.5 w-2.5 rounded-full ring-4 ring-paper ${
                        i < 3 ? 'bg-forest' : 'bg-gold'
                      }`}
                      aria-hidden="true"
                    />
                    <p className="text-[14px] leading-snug text-ink-2">{evento.texto}</p>
                  </li>
                ))}
              </ol>
            </div>

            <figcaption className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-paper-2 px-4 py-3.5">
              <span className="flex items-center gap-2.5 text-[13px] font-medium text-ink">
                <UserRound size={16} className="text-forest" aria-hidden="true" />
                Responsable: Martina
              </span>
              <span className="flex items-center gap-1.5 text-[12px] font-semibold text-live-ink">
                <Check size={14} aria-hidden="true" />
                Equipo Dominium
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
