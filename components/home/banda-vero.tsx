import type { CSSProperties } from 'react'
import Indice from './indice'
import VeroMark from './vero-mark'

const filaA = [
  '¿Cuánto debo?',
  '¿Está libre la parrilla el sábado?',
  '¿Puedo tener un perro en el edificio?',
  'Se rompió el portero eléctrico, te mando foto',
  '¿Qué se votó en la última asamblea?',
]

const filaB = [
  '¿Cómo se calculó el interés de mi mora?',
  'Quiero dar de alta a mi inquilino',
  '¿Cuánto gastamos en el ascensor este año?',
  'Hay olor a gas en el palier',
  '¿Me pasás el CVU del consorcio?',
]

function Fila({
  preguntas,
  velocidad,
  invertida = false,
}: {
  preguntas: string[]
  velocidad: string
  invertida?: boolean
}) {
  const copia = (oculta: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={oculta || undefined}>
      {preguntas.map((pregunta) => (
        <li
          key={pregunta}
          className="flex items-center whitespace-nowrap text-[clamp(22px,3.2vw,44px)] font-medium leading-none tracking-[-0.02em] text-on-forest-dim transition-colors duration-300 hover:text-gold-light"
        >
          <span className="px-6 md:px-9">{pregunta}</span>
          <span className="text-gold-light/60" aria-hidden="true">
            ✳
          </span>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="marquee overflow-hidden py-6 md:py-8">
      <div
        className="marquee-track flex w-max"
        style={
          {
            '--speed': velocidad,
            '--dir': invertida ? 'reverse' : 'normal',
          } as CSSProperties
        }
      >
        {copia(false)}
        {copia(true)}
      </div>
    </div>
  )
}

export default function BandaVero() {
  return (
    <section
      id="vero"
      className="relative overflow-hidden bg-forest py-24 md:py-32"
      aria-label="Qué le podés preguntar a Vero"
    >
      <div className="mx-auto max-w-[1240px] px-6">
        <Indice n="04" label="Preguntale lo que sea" tone="dark" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-20">
          <h2 className="headline text-[clamp(30px,4.4vw,58px)] text-on-forest">
            No es un menú de opciones.
            <br />
            Es alguien que sabe.
          </h2>
          <p
            className="s-rise max-w-[44ch] text-[17px] leading-relaxed text-on-forest-dim lg:pb-3"
            style={{ '--d': 0.3 } as CSSProperties}
          >
            Vero conoce tu unidad, tu deuda, el reglamento y la historia del edificio. Escribile
            en castellano, como le escribirías a cualquiera.
          </p>
        </div>
      </div>

      <div className="mt-16 border-y border-on-forest-faint md:mt-20">
        <Fila preguntas={filaA} velocidad="58s" />
        <div className="h-px bg-on-forest-faint" aria-hidden="true" />
        <Fila preguntas={filaB} velocidad="72s" invertida />
      </div>

      <div className="mx-auto mt-14 flex max-w-[1240px] flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <p
          className="s-rise max-w-[52ch] text-[16px] leading-relaxed text-on-forest-dim"
          style={{ '--d': 0.2 } as CSSProperties}
        >
          Y si algo la excede —una urgencia, un conflicto entre vecinos, una decisión de
          consejo— lo toma una persona del equipo de Dominium y te dice quién.
        </p>
        <p className="s-rise flex shrink-0 items-center gap-2.5 rounded-full border border-on-forest-faint px-4 py-2">
          <VeroMark size={16} />
          <span className="hairline-caps text-on-forest-dim">Responde 24/7</span>
        </p>
      </div>
    </section>
  )
}
