import Link from 'next/link'
import Reveal from './reveal'

const WHATSAPP_URL =
  'https://wa.me/5491172936904?text=Hola%20Vero%2C%20soy%20del%20consejo%20de%20mi%20edificio%20y%20quiero%20saber%20c%C3%B3mo%20llevar%20Dominium%20al%20consorcio'

export default function ParaQuien() {
  return (
    <section
      className="border-t border-line bg-surface py-24 md:py-32"
      aria-label="Para quién es Dominium"
    >
      <div className="mx-auto max-w-[1120px] px-6">
        <Reveal>
          <h2 className="max-w-[640px] font-serif text-[clamp(30px,4.2vw,46px)] font-bold leading-[1.12] text-ink text-balance">
            Entrá por donde estés parado.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
          <Reveal>
            <article className="flex h-full flex-col border-t border-forest pt-6">
              <h3 className="text-[22px] font-semibold text-ink">Sos vecino</h3>
              <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-ink-2">
                Pagás expensas y no sabés a dónde van. Empezá por auditar tu última
                liquidación: es gratis, sin registro, y el informe se comparte directo al grupo
                del edificio.
              </p>
              <a href="#analizador" className="mt-5 text-[15px] font-semibold text-forest underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest">
                Auditar mis expensas →
              </a>
            </article>
          </Reveal>

          <Reveal delay={90} className="md:mt-10">
            <article className="flex h-full flex-col border-t border-line pt-6">
              <h3 className="text-[20px] font-semibold text-ink">Estás en el consejo</h3>
              <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-ink-2">
                Sos quien firma, controla y da la cara en la asamblea. Con Dominium tenés
                liquidaciones auditadas, el fondo de reserva trazable y cada decisión
                documentada. Hablemos de tu edificio en concreto.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 text-[15px] font-semibold text-forest underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
              >
                Hablar con Vero por WhatsApp →
              </a>
            </article>
          </Reveal>

          <Reveal delay={180} className="md:mt-20">
            <article className="flex h-full flex-col border-t border-line pt-6">
              <h3 className="text-[20px] font-semibold text-ink">Administrás consorcios</h3>
              <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-ink-2">
                Si estás pensando en dejar la actividad, el Plan de Retiro te paga 18 meses de
                comisiones residuales por traspasar tu cartera, con un rol de asesor durante la
                transición.
              </p>
              <Link href="/administradores" className="mt-5 text-[15px] font-semibold text-forest underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest">
                Conocer el Plan de Retiro →
              </Link>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
