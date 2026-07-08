import Link from 'next/link'
import Reveal from './reveal'

const pasos = [
  {
    titulo: 'Auditá y mostralo',
    detalle:
      'Subí tu última liquidación al analizador y compartí el informe en el grupo del edificio. Los números convencen más que cualquier discurso.',
  },
  {
    titulo: 'El consorcio decide',
    detalle:
      'El cambio de administración se vota en asamblea, como marca la ley. Preparamos la documentación, el orden del día y respondemos las dudas de los vecinos.',
  },
  {
    titulo: 'Del traspaso nos ocupamos nosotros',
    detalle:
      'Libros, cuentas, proveedores, encargado, deudas en curso: la burocracia del cambio la maneja el equipo de Dominium. El edificio no queda ni un día a la deriva.',
  },
]

export default function Cambio() {
  return (
    <section className="bg-canvas py-24 md:py-32" aria-label="Cómo cambiar de administración">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          <Reveal>
            <h2 className="font-serif text-[clamp(30px,4.2vw,46px)] font-bold leading-[1.12] text-ink text-balance">
              Cambiar de administración siempre fue un calvario. Ya no.
            </h2>
            <p className="mt-4 max-w-[48ch] text-[17px] leading-relaxed text-ink-2">
              El miedo al trámite es lo que mantiene vivas a las malas administraciones.
              Nosotros lo desarmamos en tres pasos.
            </p>
            <Link
              href="/cambiar-administrador"
              className="mt-8 inline-flex h-[50px] items-center rounded-full bg-forest px-7 text-[15px] font-semibold text-on-forest transition-colors duration-150 hover:bg-forest-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              Ver la guía completa del cambio
            </Link>
          </Reveal>

          <ol className="flex flex-col">
            {pasos.map((paso, i) => (
              <Reveal key={paso.titulo} delay={i * 90}>
                <li className="flex gap-6 border-t border-line py-7 first:border-t-0 lg:first:border-t">
                  <span className="text-[15px] font-semibold text-forest tabular-nums" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[19px] font-semibold text-ink">{paso.titulo}</h3>
                    <p className="mt-2 max-w-[58ch] text-[15.5px] leading-relaxed text-ink-2">
                      {paso.detalle}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
