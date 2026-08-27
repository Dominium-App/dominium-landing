import Reveal from '@/components/home/reveal'
import FotoEquipo from './foto-equipo'

/* Fotos en /public/equipo/{slug}.webp — retrato cuadrado, cara centrada.
   Si falta la foto, se ve el monograma sobre verde. */
const team = [
  {
    name: 'Lucio Majewski',
    role: 'CEO',
    slug: 'lucio',
    initials: 'LM',
    linea: 'Dirección y vínculo con el consorcio.',
  },
  {
    name: 'Santiago Suppes',
    role: 'COO',
    slug: 'santiago',
    initials: 'SS',
    linea: 'Administrador matriculado y licenciado en sistemas.',
  },
  {
    name: 'Enzo Cazenave',
    role: 'CTO',
    slug: 'enzo',
    initials: 'EC',
    linea: 'Tecnología y sistemas.',
  },
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
                <FotoEquipo
                  slug={member.slug}
                  alt={`${member.name}, ${member.role} de Dominium`}
                  initials={member.initials}
                />
                <h3 className="mt-5 text-[20px] font-semibold text-ink">{member.name}</h3>
                <p className="mt-1 text-[14px] font-medium text-ink-3">{member.role}</p>
                <p className="mt-2 max-w-[26ch] text-[14px] leading-relaxed text-ink-2">
                  {member.linea}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
