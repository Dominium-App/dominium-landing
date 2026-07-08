import Reveal from '@/components/home/reveal'

/* [COMPLETAR por persona: foto real (reemplaza el monograma), una línea concreta de
   trayectoria — qué hacía antes — y link a LinkedIn si quieren exponerlo.] */
const team = [
  { name: 'Lucio Majewski', role: 'CEO', initials: 'LM' },
  { name: 'Santiago Suppes', role: 'COO', initials: 'SS' },
  { name: 'Enzo Cazenave', role: 'CTO', initials: 'EC' },
]

export default function Equipo() {
  return (
    <section className="bg-canvas py-24 md:py-32" aria-label="El equipo de Dominium">
      <div className="mx-auto max-w-[1120px] px-6">
        <Reveal className="max-w-[640px]">
          <h2 className="font-serif text-[clamp(28px,3.8vw,42px)] font-bold leading-[1.12] text-ink text-balance">
            Detrás de Vero no hay un call center.
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-2">
            Hay un equipo con nombre y apellido que revisa cada liquidación, atiende las
            guardias y responde por cada edificio de la cartera.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {team.map((member) => (
            <Reveal key={member.name}>
              <article className="flex flex-col border-t border-line pt-6">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-live-soft">
                  <span className="text-[18px] font-semibold text-forest">{member.initials}</span>
                </span>
                <h3 className="mt-5 text-[20px] font-semibold text-ink">{member.name}</h3>
                <p className="mt-1 text-[14px] font-medium text-ink-3">{member.role}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
