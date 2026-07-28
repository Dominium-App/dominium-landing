import type { CSSProperties } from 'react'
import { ShieldCheck } from 'lucide-react'
import Boton from './boton'
import Edificios from './edificios'
import VeroMark from './vero-mark'
import { WHATSAPP_VECINO } from '@/lib/contacto'

export default function Cierre() {
  return (
    <section
      id="contacto"
      className="relative isolate overflow-hidden bg-night pb-44 pt-28 md:pb-64 md:pt-40"
      aria-label="Empezá con Dominium"
    >
      <div
        className="rules pointer-events-none absolute inset-0 opacity-70"
        style={{ '--rule-cols': 6, '--rule-ink': 'rgba(244,246,241,0.05)' } as CSSProperties}
        aria-hidden="true"
      />
      <p
        className="ghost-numeral numeral s-drift pointer-events-none absolute -top-8 left-[-3vw] select-none text-[28vw] leading-none md:left-[1vw] md:text-[16vw]"
        style={{ '--drift': '36px' } as CSSProperties}
        aria-hidden="true"
      >
        02:47
      </p>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[130px] text-on-forest-faint md:h-[200px]"
        aria-hidden="true"
      >
        <Edificios className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-6">
        <h2 className="text-[clamp(32px,6.4vw,92px)] text-on-forest">
          <span className="s-mask display block">Esta noche, a las 2:47,</span>
          <span className="s-mask display block" style={{ '--d': 0.5 } as CSSProperties}>
            alguien va a tener una urgencia.
          </span>
          <span className="halo-gold mt-4 inline-block md:mt-8">
            <span
              className="s-mask display block text-gold-light"
              style={{ '--d': 1 } as CSSProperties}
            >
              Vero va a contestar.
            </span>
          </span>
        </h2>

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
          <div className="s-rise" style={{ '--d': 0.3 } as CSSProperties}>
            <span className="block h-px w-full bg-on-forest-faint" aria-hidden="true" />
            <p className="mt-7 max-w-[48ch] text-[17px] leading-relaxed text-on-forest-dim md:text-[19px]">
              El primer paso no cuesta nada: auditá tu última liquidación en 60 segundos, o
              escribile a Vero y contale de tu edificio.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Boton href="/#analizador" tone="bone">
                Auditar mis expensas gratis
              </Boton>
              <Boton href={WHATSAPP_VECINO} tone="ghost-bone" external>
                Escribirle a Vero
              </Boton>
            </div>
          </div>

          <ul
            className="s-rise flex flex-col gap-3 lg:pb-2"
            style={{ '--d': 0.6 } as CSSProperties}
          >
            <li className="flex items-center gap-2.5">
              <VeroMark size={15} />
              <span className="text-[13.5px] text-on-forest-dim">
                Vero responde 24/7 por WhatsApp
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <ShieldCheck size={15} className="text-on-forest-dim" aria-hidden="true" />
              <span className="text-[13.5px] text-on-forest-dim">
                Infraestructura bancaria regulada por BCRA (vía Cresium)
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
