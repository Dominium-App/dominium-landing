import Link from 'next/link'
import type { CSSProperties } from 'react'
import { WHATSAPP_CONSEJO } from '@/lib/contacto'
import Boton from './boton'
import Indice from './indice'

const pasos = [
  {
    n: '1',
    titulo: 'Hablamos del edificio.',
    detalle: 'Revisamos la situación actual, las expensas y lo que el consejo necesita resolver.',
  },
  {
    n: '2',
    titulo: 'El consorcio decide.',
    detalle: 'Preparamos la propuesta, la documentación y el orden del día para la asamblea.',
  },
  {
    n: '3',
    titulo: 'Nos ocupamos del traspaso.',
    detalle: 'Libros, cuentas, proveedores, encargado y deudas: Dominium recibe todo sin dejar al edificio a la deriva.',
  },
]

export default function Empezar() {
  return (
    <section
      id="cambiar"
      className="border-t border-line bg-surface py-24 md:py-32"
      aria-label="Cómo cambiar la administración por Dominium"
    >
      <div className="mx-auto max-w-[1240px] px-6">
        <Indice n="04" label="Cómo empezar" />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
          <h2 className="headline max-w-[16ch] text-[clamp(34px,5.2vw,72px)] text-ink">
            Cambiar de administración no tiene que ser un calvario.
          </h2>
          <p className="max-w-[46ch] text-[17px] leading-relaxed text-ink-2 lg:pb-3 md:text-[19px]">
            El consorcio toma la decisión. Del orden, los papeles y la continuidad operativa nos
            ocupamos nosotros.
          </p>
        </div>

        <ol className="mt-16 grid gap-8 md:mt-20 lg:grid-cols-3 lg:gap-10">
          {pasos.map((paso, i) => (
            <li
              key={paso.n}
              className="s-rise border-t-2 border-forest/25 pt-6"
              style={{ '--d': i * 0.3 } as CSSProperties}
            >
              <span className="numeral text-[64px] leading-none text-forest">{paso.n}</span>
              <h3 className="mt-6 text-[21px] font-semibold leading-snug text-ink">{paso.titulo}</h3>
              <p className="mt-3 max-w-[40ch] text-[15.5px] leading-relaxed text-ink-2">
                {paso.detalle}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-16">
          <Boton href={WHATSAPP_CONSEJO} tone="forest" external>
            Hablar sobre mi edificio
          </Boton>
          <Link
            href="/cambiar-administrador"
            className="hairline-caps px-2 py-3 text-forest underline-offset-8 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Ver la guía completa del cambio →
          </Link>
        </div>
      </div>
    </section>
  )
}
