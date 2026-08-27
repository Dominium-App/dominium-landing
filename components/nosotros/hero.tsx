import Image from 'next/image'

export default function NosotrosHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-night pt-32 pb-16 md:pb-24"
      aria-label="Quiénes somos"
    >
      <Image
        src="/fondos/edificio-dusk.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[center_60%] opacity-70"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-night/45 via-night/25 to-night"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1120px] px-6">
        <div className="max-w-[760px]">
          <p className="home-rise text-[12px] font-semibold uppercase tracking-[0.1em] text-gold-light">
            Quiénes somos
          </p>
          <h1
            className="home-rise mt-5 font-serif text-[clamp(32px,4.8vw,54px)] font-bold leading-[1.1] tracking-[-0.01em] text-on-forest text-balance"
            style={{ animationDelay: '80ms' }}
          >
            Nos cansamos de que pagar expensas sea un acto de fe.
          </h1>
          <p
            className="home-rise mt-6 max-w-[58ch] text-[17px] leading-relaxed text-on-forest-dim"
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
