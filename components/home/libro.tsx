import type { CSSProperties } from 'react'
import Indice from './indice'

const asientos = [
  {
    n: '01',
    titulo: 'La cuenta es del consorcio, no del administrador',
    detalle:
      'Cada edificio tiene su CVU propio en Cresium, una entidad de infraestructura financiera regulada por el BCRA. La plata nunca pasa por la cuenta personal de nadie.',
    fuente: 'Cresium · BCRA',
  },
  {
    n: '02',
    titulo: 'Cada movimiento queda registrado',
    detalle:
      'Las transferencias entrantes se concilian automáticamente y todo pago a proveedores aparece en las finanzas del edificio, con su factura conciliada. No hay caja en negro posible.',
    fuente: 'Conciliación automática',
  },
  {
    n: '03',
    titulo: 'La mora se calcula sola, con interés simple',
    detalle:
      'Los punitorios los calcula el sistema todos los días, sin capitalizar y con el desglose visible: base, tasa, días. Nadie decide a mano cuánto te cobra.',
    fuente: 'Sin capitalizar',
  },
  {
    n: '04',
    titulo: 'Cada precio se compara contra el mercado',
    detalle:
      'Sueldos contra la escala SUTERH, honorarios contra CAPHAI, servicios contra valores de zona en el AMBA. Lo que está fuera de rango se marca, no se disimula.',
    fuente: 'SUTERH · CAPHAI',
  },
]

const marcas = ['BCRA', 'Cresium', 'SUTERH', 'CAPHAI', 'Ley 941', 'CCyC art. 2044']

export default function Libro() {
  return (
    <section
      id="confianza"
      className="relative isolate overflow-hidden bg-paper py-24 md:py-32"
      aria-label="Cómo se protege la plata del edificio"
    >
      <div
        className="rules pointer-events-none absolute inset-0"
        style={{ '--rule-cols': 8, '--rule-ink': 'rgba(0,0,0,0.035)' } as CSSProperties}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1240px] px-6">
        <Indice n="05" label="Por qué confiar" />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-20">
          <h2 className="headline text-[clamp(32px,4.8vw,64px)] text-ink">
            La plata del edificio
            <br />
            no toca manos.
          </h2>
          <p
            className="s-rise max-w-[44ch] text-[17px] leading-relaxed text-ink-2 lg:pb-3"
            style={{ '--d': 0.3 } as CSSProperties}
          >
            La desconfianza en los consorcios no es paranoia: es historia. Por eso el sistema
            está diseñado para que ni siquiera haga falta confiar.
          </p>
        </div>

        <dl className="mt-16 md:mt-20">
          {asientos.map((asiento, i) => (
            <div
              key={asiento.n}
              className="group grid gap-x-8 gap-y-3 border-t border-paper-line py-8 transition-colors duration-300 hover:bg-paper-2/50 md:grid-cols-[84px_minmax(0,1.15fr)_minmax(0,1.35fr)] md:items-baseline md:py-10 md:last:border-b"
              style={{ '--d': i * 0.35 } as CSSProperties}
            >
              <span
                className="numeral s-fade text-[clamp(34px,5vw,60px)] text-paper-line transition-colors duration-300 group-hover:text-forest"
                aria-hidden="true"
              >
                {asiento.n}
              </span>
              <dt className="s-rise text-[19px] font-semibold leading-snug text-ink md:text-[22px]">
                {asiento.titulo}
              </dt>
              <dd className="s-rise">
                <p className="text-[15.5px] leading-relaxed text-ink-2 md:text-[16.5px]">
                  {asiento.detalle}
                </p>
                <span className="hairline-caps mt-4 inline-block text-gold-deep">
                  {asiento.fuente}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-3">
          <span className="hairline-caps text-ink-3">Verificable contra</span>
          {marcas.map((marca) => (
            <span
              key={marca}
              className="hairline-caps rounded-full border border-paper-line px-3.5 py-1.5 text-ink-2"
            >
              {marca}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
