import Reveal from './reveal'

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
    <section className="bg-canvas py-24 md:py-32" aria-label="Cuánto cuesta Dominium">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="font-serif text-[clamp(32px,4.6vw,52px)] font-bold leading-[1.1] tracking-[-0.01em] text-ink text-balance">
              Cuesta lo mismo que ya pagás.
            </h2>
            <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-ink-2">
              El honorario clásico de administración: un porcentaje de las expensas, igual al
              que tu consorcio le paga hoy a su administrador. No es un gasto nuevo. Lo que
              cambia es lo que recibís a cambio.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <figure
              className="mx-auto w-full max-w-[420px] rounded-2xl border border-line bg-surface p-6"
              role="img"
              aria-label="Detalle del honorario: el mismo porcentaje de expensas que pagás hoy incluye a Vero 24/7, la cuenta propia del consorcio regulada por BCRA, la auditoría de cada gasto y la app; sin costo de implementación, sin comisiones escondidas y sin permanencia"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-3">
                Tu honorario, desglosado
              </p>

              <dl className="mt-4 flex flex-col gap-2.5">
                {incluye.map((row) => (
                  <div key={row.concepto} className="flex items-baseline gap-2">
                    <dt className="shrink text-[14px] leading-snug text-ink">{row.concepto}</dt>
                    <span className="mb-[3px] min-w-4 flex-1 border-b border-dotted border-border-strong" aria-hidden="true" />
                    <dd className="shrink-0 text-[13.5px] font-semibold text-ink tabular-nums">
                      {row.valor}
                    </dd>
                  </div>
                ))}
              </dl>

              <dl className="mt-4 flex flex-col gap-2.5 border-t border-line pt-4">
                {ceros.map((row) => (
                  <div key={row.concepto} className="flex items-baseline gap-2">
                    <dt className="shrink text-[14px] leading-snug text-ink-2">{row.concepto}</dt>
                    <span className="mb-[3px] min-w-4 flex-1 border-b border-dotted border-border-strong" aria-hidden="true" />
                    <dd className="shrink-0 text-[13.5px] font-semibold text-live-ink tabular-nums">
                      {row.valor}
                    </dd>
                  </div>
                ))}
              </dl>

              <figcaption className="mt-5 flex items-baseline justify-between border-t border-line pt-4">
                <span className="text-[14px] font-semibold text-ink">
                  Costo extra sobre tu expensa actual
                </span>
                <span className="text-[24px] font-bold leading-none text-forest tabular-nums">
                  $ 0
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
