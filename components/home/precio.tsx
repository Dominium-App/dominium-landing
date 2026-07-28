import type { CSSProperties } from 'react'
import Indice from './indice'

const noGanamos = [
  { concepto: 'Comisión de proveedores', valor: '$ 0' },
  { concepto: 'Retorno por obras y refacciones', valor: '$ 0' },
  { concepto: 'Margen escondido en los rubros', valor: '$ 0' },
  { concepto: 'Publicidad dentro de la app', valor: 'no hay' },
]

const delEdificio = [
  { concepto: 'Intereses de mora', valor: 'van al consorcio' },
  { concepto: 'Rendimiento de la cuenta', valor: 'va al consorcio' },
  { concepto: 'Datos de los vecinos', valor: 'no se venden' },
]

export default function Precio() {
  return (
    <section
      id="precio"
      className="relative isolate overflow-hidden bg-night py-24 md:py-36"
      aria-label="Cómo gana dinero Dominium"
    >
      <div
        className="rules pointer-events-none absolute inset-0 opacity-70"
        style={{ '--rule-cols': 5, '--rule-ink': 'rgba(244,246,241,0.045)' } as CSSProperties}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1240px] px-6">
        <Indice n="07" label="Cómo ganamos plata" tone="dark" />

        <div className="mt-14 grid gap-16 lg:grid-cols-[1.25fr_minmax(0,420px)] lg:gap-24">
          <div>
            <p className="hairline-caps text-on-forest-dim">
              Lo que ganamos por fuera del honorario
            </p>
            <div className="halo-gold mt-4">
              <p
                className="numeral s-mask text-[clamp(96px,19vw,260px)] text-gold-light"
                style={{ '--d': 0.2 } as CSSProperties}
              >
                $ 0
              </p>
            </div>
            <span
              className="s-rule mt-6 block h-px w-full bg-on-forest-faint"
              style={{ '--d': 0.6 } as CSSProperties}
              aria-hidden="true"
            />
            <h2
              className="s-rise mt-8 max-w-[24ch] text-[clamp(26px,3.4vw,44px)] font-medium leading-[1.15] tracking-[-0.02em] text-on-forest"
              style={{ '--d': 0.7 } as CSSProperties}
            >
              Ganamos de una sola cosa.
            </h2>
            <p
              className="s-rise mt-6 max-w-[52ch] text-[17px] leading-relaxed text-on-forest-dim"
              style={{ '--d': 0.9 } as CSSProperties}
            >
              El honorario que tu consorcio aprueba en asamblea: declarado, visible en cada
              liquidación y conversado de frente. No hay una segunda caja. En este rubro casi
              siempre la hay, y es la que nadie te muestra.
            </p>
          </div>

          <figure
            className="s-lift group mx-auto w-full max-w-[420px] rotate-[-1.4deg] rounded-2xl bg-paper p-7 shadow-(--shadow-sheet) transition-transform duration-500 ease-(--ease-out-soft) hover:rotate-0"
            role="img"
            aria-label="Detalle de los ingresos de Dominium: cero por comisiones de proveedores, retornos por obras, margen escondido en los rubros y publicidad en la app; los intereses de mora y el rendimiento de la cuenta quedan para el consorcio y los datos de los vecinos no se venden. El único ingreso es el honorario de administración."
          >
            <p className="hairline-caps text-gold-deep">De acá no ganamos nada</p>

            <dl className="mt-5 flex flex-col gap-2.5">
              {noGanamos.map((row) => (
                <div key={row.concepto} className="flex items-baseline gap-2">
                  <dt className="shrink text-[14px] leading-snug text-ink">{row.concepto}</dt>
                  <span
                    className="mb-[3px] min-w-4 flex-1 border-b border-dotted border-paper-line"
                    aria-hidden="true"
                  />
                  <dd className="shrink-0 text-[13.5px] font-semibold text-ink tabular-nums">
                    {row.valor}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="hairline-caps mt-6 text-gold-deep">Esto es del edificio</p>

            <dl className="mt-4 flex flex-col gap-2.5">
              {delEdificio.map((row) => (
                <div key={row.concepto} className="flex items-baseline gap-2">
                  <dt className="shrink text-[14px] leading-snug text-ink-2">{row.concepto}</dt>
                  <span
                    className="mb-[3px] min-w-4 flex-1 border-b border-dotted border-paper-line"
                    aria-hidden="true"
                  />
                  <dd className="shrink-0 text-[13.5px] font-semibold text-live-ink tabular-nums">
                    {row.valor}
                  </dd>
                </div>
              ))}
            </dl>

            <figcaption className="mt-6 border-t border-paper-line pt-4">
              <span className="hairline-caps text-ink-3">Único ingreso</span>
              <span className="mt-1.5 block text-[16px] font-semibold text-forest">
                El honorario de administración
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
