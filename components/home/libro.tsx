import type { CSSProperties } from 'react'
import Indice from './indice'

const controles = [
  {
    n: '01',
    titulo: 'La cuenta está a nombre del consorcio.',
    detalle:
      'Cada edificio tiene CVU y alias propios sobre infraestructura financiera de Cresium, regulada por el BCRA. La plata no pasa por una cuenta personal del administrador.',
    sello: 'Cresium · BCRA',
  },
  {
    n: '02',
    titulo: 'Cada movimiento tiene respaldo.',
    detalle:
      'Ingresos, transferencias y pagos a proveedores se concilian y quedan visibles junto con sus comprobantes. El consejo no necesita pedir una rendición para saber qué pasó.',
    sello: 'Conciliación y trazabilidad',
  },
  {
    n: '03',
    titulo: 'Ganamos solamente el honorario.',
    detalle:
      'No cobramos comisiones de proveedores, retornos por obras ni márgenes escondidos. Los intereses de mora y el rendimiento de la cuenta quedan en el consorcio.',
    sello: '$0 por fuera del honorario',
  },
]

export default function Libro() {
  return (
    <section
      id="confianza"
      className="relative isolate overflow-hidden bg-night py-24 md:py-32"
      aria-label="Cómo protege Dominium el dinero del consorcio"
    >
      <div
        className="rules pointer-events-none absolute inset-0 opacity-70"
        style={{ '--rule-cols': 6, '--rule-ink': 'rgba(244,246,241,0.045)' } as CSSProperties}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1240px] px-6">
        <Indice n="03" label="Por qué confiar" tone="dark" />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
          <h2 className="headline max-w-[16ch] text-[clamp(36px,5.4vw,76px)] text-on-forest">
            La plata es del consorcio. Siempre.
          </h2>
          <p className="max-w-[44ch] text-[17px] leading-relaxed text-on-forest-dim lg:pb-3 md:text-[19px]">
            La confianza no debería depender de una carpeta cerrada ni de la palabra del
            administrador. Diseñamos controles que se pueden verificar.
          </p>
        </div>

        <dl className="mt-16 border-t border-on-forest-faint md:mt-20">
          {controles.map((control, i) => (
            <div
              key={control.n}
              className="s-rise grid gap-x-8 gap-y-4 border-b border-on-forest-faint py-8 md:grid-cols-[64px_minmax(0,0.9fr)_minmax(0,1.2fr)_auto] md:items-start md:py-10"
              style={{ '--d': i * 0.3 } as CSSProperties}
            >
              <span className="hairline-caps pt-1 text-gold-light">{control.n}</span>
              <dt className="text-[21px] font-semibold leading-snug text-on-forest">
                {control.titulo}
              </dt>
              <dd className="max-w-[52ch] text-[15.5px] leading-relaxed text-on-forest-dim">
                {control.detalle}
              </dd>
              <dd className="hairline-caps rounded-full border border-on-forest-faint px-3.5 py-2 text-center text-gold-light">
                {control.sello}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
