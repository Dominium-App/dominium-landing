import Reveal from '@/components/home/reveal'

const filas = [
  {
    titulo: 'Cuando Vero deriva',
    detalle:
      'Lo toma una persona del equipo y te avisa quién. Las urgencias —agua, gas, ascensor— despachan guardia al momento, a cualquier hora.',
  },
  {
    titulo: 'Dónde está la plata',
    detalle:
      'En una cuenta a nombre del consorcio, con CVU y alias propios, sobre Cresium: infraestructura financiera regulada por el BCRA. Nosotros no la tocamos.',
  },
  {
    titulo: 'Cómo auditamos',
    detalle:
      'Cada gasto se compara contra referencias reales del mercado: escala salarial SUTERH, honorarios CAPHAI y valores de zona del AMBA.',
  },
]

export default function Respaldo() {
  return (
    <section className="border-t border-line bg-surface py-24 md:py-32" aria-label="Cómo trabaja Dominium">
      <div className="mx-auto max-w-[1120px] px-6">
        <Reveal className="max-w-[640px]">
          <h2 className="font-serif text-[clamp(28px,3.8vw,42px)] font-bold leading-[1.12] text-ink text-balance">
            Cómo trabajamos, en concreto.
          </h2>
        </Reveal>

        <dl className="mt-12 flex flex-col">
          {filas.map((f, i) => (
            <Reveal key={f.titulo} delay={i * 70}>
              <div className="grid gap-2 border-t border-line py-7 md:grid-cols-[1fr_1.6fr] md:gap-10">
                <dt className="text-[18px] font-semibold leading-snug text-ink">{f.titulo}</dt>
                <dd className="max-w-[62ch] text-[15.5px] leading-relaxed text-ink-2">{f.detalle}</dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={120}>
          <p className="mt-10 border-t border-line pt-6 text-[13px] text-ink-3">
            Dominium SAS · Ciudad Autónoma de Buenos Aires · Operando en CABA y AMBA desde 2026
          </p>
        </Reveal>
      </div>
    </section>
  )
}
