export default function BlogHero() {
  return (
    <section
      className="relative pt-32 pb-14 md:pb-16"
      style={{ backgroundColor: 'var(--color-bg)' }}
      aria-label="Blog — Dominium"
    >
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="max-w-[820px] flex flex-col gap-5">
        <p
          className="text-[12px] font-semibold tracking-[0.1em] uppercase"
          style={{ color: 'var(--color-accent)' }}
        >
          Blog Dominium
        </p>
        <h1
          className="font-serif font-bold leading-[1.1] tracking-[-0.01em] text-balance"
          style={{
            fontSize: 'clamp(34px, 4.8vw, 56px)',
            color: 'var(--color-ink)',
          }}
        >
          Todo lo que necesitás saber sobre tu consorcio
        </h1>
        <p
          className="text-[18px] leading-relaxed max-w-[640px]"
          style={{ color: 'var(--color-ink-secondary)' }}
        >
          Guías prácticas, derechos, normativa CABA y GBA. Sin lenguaje de abogado.
        </p>
        </div>
      </div>
    </section>
  )
}
