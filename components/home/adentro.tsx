import type { CSSProperties } from 'react'
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

const pasos = [
  {
    n: '01',
    titulo: 'Vero recibe y responde.',
    detalle:
      'Los vecinos escriben al WhatsApp de siempre. Vero conoce la unidad, las expensas, el reglamento y las gestiones abiertas.',
  },
  {
    n: '02',
    titulo: 'El equipo se hace responsable.',
    detalle:
      'Cuando hace falta una persona, un proveedor o una decisión del consejo, Dominium toma el caso y comunica quién lo está resolviendo.',
  },
  {
    n: '03',
    titulo: 'Todo queda registrado.',
    detalle:
      'Reclamos, pagos, facturas, documentos y movimientos del edificio quedan disponibles en la app para propietarios y consejo.',
  },
]

export default function Adentro() {
  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden bg-canvas py-24 md:py-32"
      aria-label="Cómo administra Dominium"
    >
      <div className="mx-auto max-w-[1240px] px-6">
        <Indice n="02" label="Cómo funciona" />

        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_420px] lg:items-start lg:gap-24">
          <div>
            <h2 className="headline max-w-[18ch] text-[clamp(34px,5.2vw,72px)] text-ink">
              Nosotros administramos. La tecnología hace el trabajo más rápido y visible.
            </h2>
            <p className="mt-7 max-w-[58ch] text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
              No te damos una plataforma para que el consejo haga de administrador. Dominium
              asume la gestión completa y usa tecnología propia para sacar trabajo manual del
              medio.
            </p>

            <ol className="mt-14 border-t border-line md:mt-16">
              {pasos.map((paso, i) => (
                <li
                  key={paso.n}
                  className="s-rise grid gap-3 border-b border-line py-7 md:grid-cols-[56px_0.85fr_1.25fr] md:items-start md:gap-6"
                  style={{ '--d': i * 0.3 } as CSSProperties}
                >
                  <span className="hairline-caps pt-1 text-gold-deep">{paso.n}</span>
                  <h3 className="text-[20px] font-semibold leading-snug text-ink">{paso.titulo}</h3>
                  <p className="text-[15.5px] leading-relaxed text-ink-2">{paso.detalle}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="s-lift flex justify-center lg:sticky lg:top-28" style={{ '--d': 0.3 } as CSSProperties}>
            <PhoneFrame label="Conversación con Vero: una vecina informa una pérdida de agua, Vero abre la gestión y deriva el seguimiento al equipo humano de Dominium">
              <WhatsappVero hora="02:47" turnos={conversacion} />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  )
}
