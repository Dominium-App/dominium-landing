import Reveal from './reveal'

const garantias = [
  {
    titulo: 'La cuenta es del consorcio, no del administrador',
    detalle:
      'Cada edificio tiene su CVU propio en Cresium, una entidad de infraestructura financiera regulada por el BCRA. La plata nunca pasa por la cuenta personal de nadie.',
  },
  {
    titulo: 'Cada movimiento queda registrado',
    detalle:
      'Las transferencias entrantes se concilian automáticamente y todo pago a proveedores aparece en las finanzas del edificio, con su factura conciliada. No hay caja en negro posible.',
  },
  {
    titulo: 'La mora se calcula sola, con interés simple',
    detalle:
      'Los punitorios los calcula el sistema todos los días, sin capitalizar y con el desglose visible: base, tasa, días. Nadie decide a mano cuánto te cobra.',
  },
  {
    titulo: 'Cada precio se compara contra el mercado',
    detalle:
      'Sueldos contra la escala SUTERH, honorarios contra CAPHAI, servicios contra valores de zona en el AMBA. Lo que está fuera de rango se marca, no se disimula.',
  },
]

export default function Confianza() {
  return (
    <section
      className="bg-forest-deep py-24 md:py-32"
      aria-label="Cómo se protege la plata del edificio"
    >
      <div className="mx-auto max-w-[1120px] px-6">
        <Reveal className="max-w-[640px]">
          <h2 className="font-serif text-[clamp(30px,4.2vw,46px)] font-bold leading-[1.12] text-on-forest text-balance">
            La plata del edificio no toca manos.
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-on-forest-dim">
            La desconfianza en los consorcios no es paranoia: es historia. Por eso el sistema
            está diseñado para que ni siquiera haga falta confiar.
          </p>
        </Reveal>

        <dl className="mt-14 flex flex-col">
          {garantias.map((g, i) => (
            <Reveal key={g.titulo} delay={i * 70}>
              <div className="grid gap-2 border-t border-on-forest-faint py-7 md:grid-cols-[1fr_1.4fr] md:gap-10">
                <dt className="text-[19px] font-semibold leading-snug text-on-forest">{g.titulo}</dt>
                <dd className="text-[15.5px] leading-relaxed text-on-forest-dim">{g.detalle}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
