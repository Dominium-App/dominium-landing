import type { CSSProperties } from 'react'
import Indice from './indice'

const razones = [
  {
    n: '01',
    titulo: 'Respuestas cuando las necesitás.',
    detalle:
      'Vero atiende por WhatsApp las 24 horas. Si una consulta, una urgencia o un conflicto necesita criterio humano, lo toma el equipo de Dominium.',
    prueba: 'IA para responder. Personas para resolver.',
  },
  {
    n: '02',
    titulo: 'Cada peso del edificio, a la vista.',
    detalle:
      'El consorcio tiene su propia cuenta. Los vecinos ven expensas, ingresos, pagos, facturas y saldos desde la app, sin pedir carpetas ni perseguir comprobantes.',
    prueba: 'Cuenta propia. Movimientos registrados.',
  },
  {
    n: '03',
    titulo: 'Honorarios claros.',
    detalle:
      'El honorario de administración se conversa de frente, lo aprueba el consorcio y queda visible en cada liquidación. No escondemos costos dentro de los rubros.',
    prueba: 'Un honorario declarado y visible.',
  },
]

export default function Cargo() {
  return (
    <section
      id="diferencias"
      className="relative isolate overflow-hidden bg-paper py-24 md:py-32"
      aria-label="Por qué cambiar a Dominium"
    >
      <div
        className="rules pointer-events-none absolute inset-0"
        style={{ '--rule-cols': 6, '--rule-ink': 'rgba(0,0,0,0.035)' } as CSSProperties}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1240px] px-6">
        <Indice n="01" label="Por qué Dominium" />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
          <h2 className="headline max-w-[18ch] text-[clamp(34px,5.2vw,72px)] text-ink">
            Una administración que responde, muestra y resuelve.
          </h2>
          <p className="max-w-[45ch] text-[17px] leading-relaxed text-ink-2 lg:pb-3 md:text-[19px]">
            No hace falta aprender todo nuestro producto. Estas son las tres diferencias que
            cambian la vida cotidiana del edificio.
          </p>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-paper-line bg-paper-line md:mt-20 lg:grid-cols-3">
          {razones.map((razon, i) => (
            <li
              key={razon.n}
              className="s-rise flex min-h-[360px] flex-col bg-paper px-7 py-8 transition-colors duration-300 hover:bg-paper-2 md:px-9 md:py-10"
              style={{ '--d': i * 0.3 } as CSSProperties}
            >
              <span className="hairline-caps text-gold-deep">{razon.n}</span>
              <h3 className="mt-12 text-[25px] font-semibold leading-tight tracking-[-0.02em] text-ink">
                {razon.titulo}
              </h3>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-2">{razon.detalle}</p>
              <p className="hairline-caps mt-auto border-t border-paper-line pt-6 text-forest">
                {razon.prueba}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
