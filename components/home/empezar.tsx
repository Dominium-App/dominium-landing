import Link from 'next/link'
import type { CSSProperties } from 'react'
import Indice from './indice'
import { WHATSAPP_CONSEJO } from '@/lib/contacto'

const pasos = [
  {
    n: '1',
    titulo: 'Auditá y mostralo',
    detalle:
      'Subí tu última liquidación al analizador y compartí el informe en el grupo del edificio. Los números convencen más que cualquier discurso.',
    offset: 'lg:mt-0',
  },
  {
    n: '2',
    titulo: 'El consorcio decide',
    detalle:
      'El cambio de administración se vota en asamblea, como marca la ley. Preparamos la documentación, el orden del día y respondemos las dudas de los vecinos.',
    offset: 'lg:mt-14',
  },
  {
    n: '3',
    titulo: 'Del traspaso nos ocupamos nosotros',
    detalle:
      'Libros, cuentas, proveedores, encargado, deudas en curso: la burocracia del cambio la maneja el equipo. El edificio no queda ni un día a la deriva.',
    offset: 'lg:mt-28',
  },
]

const puertas = [
  {
    quien: 'Sos vecino',
    detalle:
      'Pagás expensas y no sabés a dónde van. Empezá auditando tu última liquidación: gratis, sin registro y listo para compartir.',
    accion: 'Auditar mis expensas',
    href: '/#analizador',
    externo: false,
  },
  {
    quien: 'Estás en el consejo',
    detalle:
      'Sos quien firma, controla y da la cara en la asamblea. Hablemos de tu edificio en concreto, con números sobre la mesa.',
    accion: 'Escribirle a Vero',
    href: WHATSAPP_CONSEJO,
    externo: true,
  },
  {
    quien: 'Administrás consorcios',
    detalle:
      'Si estás pensando en dejar la actividad, el Plan de Retiro paga 18 meses de comisiones residuales por traspasar tu cartera.',
    accion: 'Conocer el Plan de Retiro',
    href: '/administradores',
    externo: false,
  },
]

const filaClass =
  'group grid gap-x-8 gap-y-3 border-t border-line px-2 py-8 transition-colors duration-300 last:border-b hover:bg-forest focus-visible:bg-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)_auto] md:items-center md:px-6 md:py-10'

function Puerta({ puerta }: { puerta: (typeof puertas)[number] }) {
  return (
    <>
      <span className="text-[22px] font-semibold leading-tight text-ink transition-colors duration-300 group-hover:text-on-forest group-focus-visible:text-on-forest md:text-[26px]">
        {puerta.quien}
      </span>
      <span className="max-w-[52ch] text-[15.5px] leading-relaxed text-ink-2 transition-colors duration-300 group-hover:text-on-forest-dim group-focus-visible:text-on-forest-dim">
        {puerta.detalle}
      </span>
      <span className="hairline-caps flex items-center gap-2.5 text-forest transition-colors duration-300 group-hover:text-gold-light group-focus-visible:text-gold-light">
        {puerta.accion}
        <span
          className="inline-block transition-transform duration-300 ease-(--ease-out-soft) group-hover:translate-x-1.5"
          aria-hidden="true"
        >
          →
        </span>
      </span>
    </>
  )
}

export default function Empezar() {
  return (
    <section
      id="empezar"
      className="border-t border-line bg-surface py-24 md:py-32"
      aria-label="Cómo empezar con Dominium"
    >
      <div className="mx-auto max-w-[1240px] px-6">
        <Indice n="08" label="Cómo empiezo" />

        <h2 className="headline mt-8 max-w-[16ch] text-[clamp(34px,5.4vw,76px)] text-ink">
          Cambiar de administración fue siempre un calvario.
        </h2>
        <p
          className="s-rise mt-6 max-w-[52ch] text-[17px] leading-relaxed text-ink-2 md:text-[19px]"
          style={{ '--d': 0.3 } as CSSProperties}
        >
          El miedo al trámite es lo que mantiene vivas a las malas administraciones. Lo
          desarmamos en tres pasos.
        </p>

        <ol className="mt-16 grid gap-12 md:mt-20 lg:grid-cols-3 lg:gap-10">
          {pasos.map((paso, i) => (
            <li
              key={paso.n}
              className={`s-rise ${paso.offset}`}
              style={{ '--d': i * 0.4 } as CSSProperties}
            >
              <span
                className="s-rule block h-[2px] w-full bg-forest/25"
                style={{ '--d': i * 0.4 } as CSSProperties}
                aria-hidden="true"
              />
              <span className="numeral mt-6 block text-[clamp(48px,6vw,84px)] text-forest">
                {paso.n}
              </span>
              <h3 className="mt-5 text-[21px] font-semibold leading-snug text-ink">
                {paso.titulo}
              </h3>
              <p className="mt-3 max-w-[42ch] text-[15.5px] leading-relaxed text-ink-2">
                {paso.detalle}
              </p>
            </li>
          ))}
        </ol>

        <Link
          href="/cambiar-administrador"
          className="hairline-caps group mt-14 inline-flex items-center gap-2.5 text-forest underline-offset-8 hover:underline focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest md:mt-20"
        >
          Ver la guía completa del cambio
          <span
            className="inline-block transition-transform duration-300 ease-(--ease-out-soft) group-hover:translate-x-1.5"
            aria-hidden="true"
          >
            →
          </span>
        </Link>

        <div className="mt-24 md:mt-32">
          <h3 className="headline text-[clamp(28px,3.8vw,48px)] text-ink">
            Entrá por donde estés parado.
          </h3>
          <div className="mt-10">
            {puertas.map((puerta) =>
              puerta.externo ? (
                <a
                  key={puerta.quien}
                  href={puerta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={filaClass}
                >
                  <Puerta puerta={puerta} />
                </a>
              ) : (
                <Link key={puerta.quien} href={puerta.href} className={filaClass}>
                  <Puerta puerta={puerta} />
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
