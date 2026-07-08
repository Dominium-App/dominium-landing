import VeroMark from './vero-mark'
import Reveal from './reveal'

type Turn = { from: 'vecino' | 'vero'; text: string }

const destacado: { titulo: string; chat: Turn[] } = {
  titulo: 'Expensas y pagos',
  chat: [
    { from: 'vecino', text: '¿Cuánto debo?' },
    {
      from: 'vero',
      text: 'Tenés pendiente julio: $ 184.500, vence el 1/7. Transferí a torre.madero.consorcio y se imputa sola. ¿Te paso el CVU?',
    },
    { from: 'vecino', text: 'Dale' },
    { from: 'vero', text: '0000003100098765432101. Cuando llegue te confirmo por acá.' },
    { from: 'vecino', text: 'Listo, ya transferí' },
    {
      from: 'vero',
      text: 'Recibido: $ 184.500,00 imputados a 4°B. Quedás al día, con la boleta en la app.',
    },
  ],
}

const secundarios: { titulo: string; chat: Turn[] }[] = [
  {
    titulo: 'Reservas',
    chat: [
      { from: 'vecino', text: '¿Está libre la parrilla el sábado?' },
      { from: 'vero', text: 'Sí, quedan dos turnos: de 12 a 16 o de 17 a 21. ¿Te reservo alguno?' },
      { from: 'vecino', text: 'El de 12' },
      { from: 'vero', text: 'Listo, parrilla reservada el sábado de 12 a 16 a nombre de 4°B.' },
    ],
  },
  {
    titulo: 'Reglamento',
    chat: [
      { from: 'vecino', text: '¿Puedo tener un perro en el edificio?' },
      {
        from: 'vero',
        text: 'Sí. El reglamento permite mascotas (artículo 14), con la condición de que circulen con correa por los espacios comunes.',
      },
      { from: 'vecino', text: '¿Y hay horario de ruidos?' },
      { from: 'vero', text: 'De 22 a 8 rige el descanso. Si un vecino lo incumple, avisame y lo gestiono sin decir quién reportó.' },
    ],
  },
]

const masPreguntas = [
  '¿Qué se votó en la última asamblea?',
  'Se rompió el portero eléctrico, te mando foto',
  '¿Cómo se calculó el interés de mi mora?',
  'Quiero dar de alta a mi inquilino',
  '¿Cuánto gastamos en el ascensor este año?',
]

function ChatCard({
  titulo,
  chat,
  featured = false,
}: {
  titulo: string
  chat: Turn[]
  featured?: boolean
}) {
  const bubble = featured ? 'text-[14px]' : 'text-[13.5px]'
  return (
    <article
      className={`flex h-full flex-col rounded-3xl border border-line bg-surface ${featured ? 'p-6' : 'p-5'}`}
    >
      <header className="flex items-center gap-2.5 border-b border-line pb-3.5">
        <span
          className={`flex items-center justify-center rounded-full bg-vero-light ${featured ? 'h-8 w-8' : 'h-7 w-7'}`}
        >
          <VeroMark size={featured ? 19 : 17} />
        </span>
        <h3 className={`font-semibold text-ink ${featured ? 'text-[15px]' : 'text-[14px]'}`}>
          {titulo}
        </h3>
        {featured && (
          <span className="ml-auto flex items-center gap-1.5 text-[11.5px] font-medium text-live-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />
            en línea
          </span>
        )}
      </header>
      <div className={`flex flex-col pt-4 ${featured ? 'gap-2.5' : 'gap-2'}`}>
        {chat.map((turn, i) =>
          turn.from === 'vecino' ? (
            <p
              key={i}
              className={`max-w-[85%] self-end rounded-2xl rounded-tr-md bg-live-soft px-3.5 py-2 leading-snug text-ink ${bubble}`}
            >
              {turn.text}
            </p>
          ) : (
            <p
              key={i}
              className={`max-w-[85%] self-start rounded-2xl rounded-tl-md bg-surface-2 px-3.5 py-2 leading-snug text-ink ${bubble}`}
            >
              {turn.text}
            </p>
          ),
        )}
      </div>
    </article>
  )
}

export default function VeroEscenarios() {
  return (
    <section className="border-t border-line bg-surface py-24 md:py-32" aria-label="Qué le podés preguntar a Vero">
      <div className="mx-auto max-w-[1120px] px-6">
        <Reveal className="max-w-[640px]">
          <h2 className="font-serif text-[clamp(30px,4.2vw,46px)] font-bold leading-[1.12] text-ink text-balance">
            Preguntale lo que sea. A cualquier hora.
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-2">
            Vero no es un menú de opciones ni un bot que deriva. Conoce tu unidad, tu deuda, el
            reglamento y la historia del edificio, y resuelve en la misma conversación.
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-5 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <ChatCard featured {...destacado} />
          </Reveal>
          <div className="flex flex-col gap-5 lg:mt-12">
            {secundarios.map((e, i) => (
              <Reveal key={e.titulo} delay={(i + 1) * 90}>
                <ChatCard {...e} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <ul className="mt-10 flex flex-wrap gap-2.5" aria-label="Otras consultas que resuelve Vero">
            {masPreguntas.map((q) => (
              <li
                key={q}
                className="rounded-full border border-line bg-surface-2 px-4 py-2 text-[13.5px] leading-snug text-ink-2"
              >
                “{q}”
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-[70ch] text-[14px] leading-relaxed text-ink-3">
            Y si algo la excede, lo pasa al equipo humano de Dominium y te avisa quién lo tomó.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
