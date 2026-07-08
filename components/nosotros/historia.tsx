import Reveal from '@/components/home/reveal'

export default function Historia() {
  return (
    <section className="border-t border-line bg-surface py-24 md:py-32" aria-label="Por qué existe Dominium">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <h2 className="font-serif text-[clamp(28px,3.8vw,42px)] font-bold leading-[1.12] text-ink text-balance">
              Por qué existe Dominium.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex max-w-[62ch] flex-col gap-5 text-[16.5px] leading-relaxed text-ink-2">
              {/* [COMPLETAR: historia de origen real del equipo — qué edificio o experiencia
                  concreta los llevó a fundar Dominium. Reemplaza o antecede al primer párrafo.] */}
              <p>
                La administración de consorcios funciona igual desde hace cincuenta años: una
                liquidación en PDF que nadie entiende, un administrador que atiende de 9 a 17
                —si atiende— y la plata de todos en una cuenta que no ves. No hace falta mala
                intención para que eso termine mal: alcanza con que nadie pueda mirar.
              </p>
              <p>
                Nuestra apuesta es que esto no se arregla con más control sobre el mismo
                sistema, sino cambiando el sistema. Una IA que atiende a los vecinos a
                cualquier hora. Una cuenta bancaria que es del edificio, no del administrador.
                Una app donde cada peso queda registrado con su comprobante. La transparencia
                no como promesa: como arquitectura.
              </p>
              <p className="text-ink">
                Por eso en este sitio no te pedimos que confíes en nosotros. Te mostramos cómo
                funciona, y el sistema está diseñado para que ni siquiera haga falta confiar.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
