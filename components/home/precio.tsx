import type { CSSProperties } from 'react'
import Indice from './indice'

const incluye = [
  { concepto: 'Honorario de administración', valor: 'mismo % que hoy' },
  { concepto: 'Vero, 24/7 por WhatsApp', valor: 'incluida' },
  { concepto: 'Cuenta propia del consorcio (CVU, BCRA)', valor: 'incluida' },
  { concepto: 'Auditoría de cada gasto', valor: 'incluida' },
  { concepto: 'App para todo el edificio', valor: 'incluida' },
]

const ceros = [
  { concepto: 'Implementación', valor: '$ 0' },
  { concepto: 'Comisiones escondidas en rubros', valor: '$ 0' },
  { concepto: 'Permanencia forzada', valor: 'no hay' },
]

export default function Precio() {
  return (
    <section
      id="precio"
      className="relative isolate overflow-hidden bg-night py-24 md:py-36"
      aria-label="Cuánto cuesta Dominium"
    >
      <div
        className="rules pointer-events-none absolute inset-0 opacity-70"
        style={{ '--rule-cols': 5, '--rule-ink': 'rgba(244,246,241,0.045)' } as CSSProperties}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1240px] px-6">
        <Indice n="07" label="Cuánto cuesta" tone="dark" />

        <div className="mt-14 grid gap-16 lg:grid-cols-[1.25fr_minmax(0,420px)] lg:gap-24">
          <div>
            <p className="hairline-caps text-on-forest-dim">
              Costo extra sobre tu expensa actual
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
              Cuesta lo mismo que ya pagás.
            </h2>
            <p
              className="s-rise mt-6 max-w-[52ch] text-[17px] leading-relaxed text-on-forest-dim"
              style={{ '--d': 0.9 } as CSSProperties}
            >
              El honorario clásico de administración: un porcentaje de las expensas, igual al que
              tu consorcio le paga hoy a su administrador. No es un gasto nuevo. Lo que cambia es
              lo que recibís a cambio.
            </p>
          </div>

          <figure
            className="s-lift group mx-auto w-full max-w-[420px] rotate-[-1.4deg] rounded-2xl bg-paper p-7 shadow-(--shadow-sheet) transition-transform duration-500 ease-(--ease-out-soft) hover:rotate-0"
            role="img"
            aria-label="Detalle del honorario: el mismo porcentaje de expensas que pagás hoy incluye a Vero 24/7, la cuenta propia del consorcio regulada por BCRA, la auditoría de cada gasto y la app; sin costo de implementación, sin comisiones escondidas y sin permanencia"
          >
            <p className="hairline-caps text-gold-deep">Tu honorario, desglosado</p>

            <dl className="mt-5 flex flex-col gap-2.5">
              {incluye.map((row) => (
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

            <dl className="mt-4 flex flex-col gap-2.5 border-t border-paper-line pt-4">
              {ceros.map((row) => (
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

            <figcaption className="mt-6 flex items-baseline justify-between border-t border-paper-line pt-4">
              <span className="text-[14px] font-semibold text-ink">
                Costo extra sobre tu expensa
              </span>
              <span className="numeral text-[28px] text-forest">$ 0</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
