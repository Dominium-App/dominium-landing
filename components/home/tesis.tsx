import type { CSSProperties } from 'react'
import Indice from './indice'

const lineas = ['Se administra con', 'una planilla, una carpeta', 'y un teléfono que']

export default function Tesis() {
  return (
    <section
      id="tesis"
      className="relative isolate overflow-hidden bg-paper py-28 md:py-44"
      aria-label="Por qué existe Dominium"
    >
      <div
        className="rules pointer-events-none absolute inset-0"
        style={{ '--rule-cols': 3, '--rule-ink': 'rgba(0,0,0,0.045)' } as CSSProperties}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1240px] px-6">
        <Indice n="02" label="Por qué existimos" />

        <p
          className="s-rise mt-10 max-w-[38ch] text-[17px] leading-relaxed text-ink-2 md:text-[19px]"
          style={{ '--d': 0.3 } as CSSProperties}
        >
          Un edificio mediano mueve decenas de millones de pesos por año: sueldos, seguros,
          ascensores, obras, un fondo de reserva.
        </p>

        <p className="mt-10 text-[clamp(36px,8.2vw,118px)] text-ink md:mt-14">
          {lineas.map((linea, i) => (
            <span
              key={linea}
              className="s-mask display block"
              style={{ '--d': i * 0.5 } as CSSProperties}
            >
              {linea}
            </span>
          ))}
          <span
            className="s-mask display block"
            style={{ '--d': 1.5 } as CSSProperties}
          >
            atiende{' '}
            <span className="relative whitespace-nowrap">
              de 9 a 17.
              <span
                className="s-rule absolute -bottom-[0.06em] left-0 h-[0.05em] w-full bg-gold"
                style={{ '--d': 2 } as CSSProperties}
                aria-hidden="true"
              />
            </span>
          </span>
        </p>

        <div className="mt-16 flex justify-end md:mt-24">
          <div
            className="s-rise max-w-[46ch] border-t border-paper-line pt-7"
            style={{ '--d': 0.4 } as CSSProperties}
          >
            <p className="text-[17px] leading-relaxed text-ink md:text-[20px]">
              Dominium no es un software para tu administrador.{' '}
              <span className="font-semibold">Es la administración entera, reescrita:</span> una
              IA que atiende siempre, un banco regulado en lugar de una caja, y cada número
              abierto para todo el edificio.
            </p>
            <p className="hairline-caps mt-6 text-gold-deep">Dominium · CABA, 2026</p>
          </div>
        </div>
      </div>
    </section>
  )
}
