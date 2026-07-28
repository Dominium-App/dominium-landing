import type { CSSProperties } from 'react'
import Indice from './indice'

const cargos = [
  {
    n: 'I',
    frase: '«Pasá por la oficina.»',
    detalle:
      'Las facturas del edificio existen. Verlas es un trámite, y casi nadie lo hace dos veces.',
    sangria: 'lg:ml-0',
  },
  {
    n: 'II',
    frase: 'Quince días para una respuesta.',
    detalle:
      'Un mail sin contestar, un teléfono que atiende de 9 a 17 y una urgencia que no eligió el horario.',
    sangria: 'lg:ml-[18%]',
  },
  {
    n: 'III',
    frase: 'Cuatro páginas de códigos.',
    detalle:
      'La liquidación llega puntual todos los meses. Qué se pagó, a quién y por qué, no llega nunca.',
    sangria: 'lg:ml-[7%]',
  },
]

export default function Cargo() {
  return (
    <section
      id="problema"
      className="relative isolate overflow-hidden bg-night pb-28 pt-24 md:pb-40 md:pt-32"
      aria-label="El problema de la administración tradicional"
    >
      <div
        className="rules pointer-events-none absolute inset-0 opacity-60"
        style={{ '--rule-cols': 4, '--rule-ink': 'rgba(244,246,241,0.04)' } as CSSProperties}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1240px] px-6">
        <Indice n="01" label="El problema" tone="dark" />

        <h2 className="s-rise mt-8 max-w-[18ch] text-[clamp(26px,3.4vw,42px)] font-medium leading-[1.15] tracking-[-0.02em] text-on-forest-dim">
          Nadie odia a su administrador.{' '}
          <span className="text-on-forest">Hasta que necesita algo.</span>
        </h2>

        <ol className="mt-20 flex flex-col gap-10 md:mt-28 md:gap-14">
          {cargos.map((cargo, i) => (
            <li key={cargo.n} className={cargo.sangria}>
              <div className="group -mx-5 px-5 transition-colors duration-300 hover:bg-forest md:-mx-8 md:px-8">
                <span
                  className="s-rule block h-px w-full bg-on-forest-faint transition-colors duration-300 group-hover:bg-gold-light/60"
                  style={{ '--d': i * 0.5 } as CSSProperties}
                  aria-hidden="true"
                />
                <div className="mt-6 flex flex-col gap-6 pb-9 md:flex-row md:items-start md:gap-12">
                  <span className="hairline-caps shrink-0 pt-3 text-gold-light/70 transition-colors duration-300 group-hover:text-gold-light md:w-12">
                    {cargo.n}
                  </span>
                  <p
                    className="s-mask flex-1 text-[clamp(30px,4.6vw,62px)] font-bold leading-[0.98] tracking-[-0.03em] text-on-forest transition-colors duration-300 group-hover:text-white"
                    style={{ '--d': 0.4 } as CSSProperties}
                  >
                    {cargo.frase}
                  </p>
                  <p
                    className="s-rise max-w-[32ch] text-[15.5px] leading-relaxed text-on-forest-dim transition-colors duration-300 group-hover:text-on-forest md:w-[26%] md:pt-4"
                    style={{ '--d': 1 } as CSSProperties}
                  >
                    {cargo.detalle}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p
          className="s-rise mt-24 max-w-[22ch] text-[clamp(24px,3.2vw,40px)] font-medium leading-[1.2] tracking-[-0.02em] text-on-forest-dim md:mt-32"
          style={{ '--d': 0.4 } as CSSProperties}
        >
          No es mala fe.{' '}
          <span className="text-gold-light">
            Es un oficio que se quedó sin sistema.
          </span>
        </p>
      </div>
    </section>
  )
}
