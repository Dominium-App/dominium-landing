export default function NosotrosHero() {
  return (
    <section className="bg-canvas pt-32 pb-16 md:pb-20" aria-label="Quiénes somos">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="max-w-[720px]">
          <p className="home-rise text-[12px] font-semibold uppercase tracking-[0.1em] text-forest">
            Quiénes somos
          </p>
          <h1
            className="home-rise mt-5 font-serif text-[clamp(32px,4.8vw,54px)] font-bold leading-[1.1] tracking-[-0.01em] text-ink text-balance"
            style={{ animationDelay: '80ms' }}
          >
            Nos cansamos de que pagar expensas sea un acto de fe.
          </h1>
          <p
            className="home-rise mt-6 max-w-[58ch] text-[17px] leading-relaxed text-ink-2"
            style={{ animationDelay: '160ms' }}
          >
            Dominium es una administración de consorcios hecha de nuevo: Vero atendiendo por
            WhatsApp a toda hora, la plata en una cuenta del edificio regulada por BCRA y cada
            gasto a la vista. Esto es quiénes estamos detrás, y cómo trabajamos.
          </p>
        </div>
      </div>
    </section>
  )
}
