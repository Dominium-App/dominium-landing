type Torre = {
  x: number
  ancho: number
  alto: number
  cols: number
  filas: number
  remate?: 'tanque' | 'antena'
}

const BASE = 320
const PAD = 16
const VENTANA_ALTO = 16
const GAP_X = 14
const GAP_Y = 12

const torres: Torre[] = [
  { x: 40, ancho: 132, alto: 176, cols: 3, filas: 5, remate: 'tanque' },
  { x: 196, ancho: 176, alto: 248, cols: 4, filas: 7 },
  { x: 396, ancho: 108, alto: 148, cols: 2, filas: 4, remate: 'antena' },
  { x: 528, ancho: 196, alto: 288, cols: 4, filas: 8, remate: 'tanque' },
  { x: 748, ancho: 140, alto: 196, cols: 3, filas: 5 },
  { x: 912, ancho: 168, alto: 264, cols: 4, filas: 7, remate: 'antena' },
  { x: 1104, ancho: 120, alto: 168, cols: 3, filas: 4 },
  { x: 1248, ancho: 152, alto: 224, cols: 3, filas: 6, remate: 'tanque' },
]

const encendidas = new Set([
  '0-1-0', '0-3-2', '1-0-1', '1-2-3', '1-5-0', '2-1-1', '3-2-0', '3-4-3',
  '3-6-1', '4-0-2', '4-3-0', '5-1-2', '5-4-1', '6-0-0', '6-2-2', '7-1-1',
  '7-3-0', '7-4-2',
])

const VIVA = '3-1-2'

function ventanas(torre: Torre, indice: number) {
  const anchoVentana =
    (torre.ancho - PAD * 2 - (torre.cols - 1) * GAP_X) / torre.cols
  const techo = BASE - torre.alto

  return Array.from({ length: torre.filas }, (_, fila) =>
    Array.from({ length: torre.cols }, (_, col) => {
      const clave = `${indice}-${fila}-${col}`
      const viva = clave === VIVA
      const prendida = viva || encendidas.has(clave)

      return (
        <rect
          key={clave}
          x={torre.x + PAD + col * (anchoVentana + GAP_X)}
          y={techo + 24 + fila * (VENTANA_ALTO + GAP_Y)}
          width={anchoVentana}
          height={VENTANA_ALTO}
          fill={viva ? 'var(--gold-light)' : 'currentColor'}
          opacity={prendida ? 0.55 : 0.12}
          className={viva ? 'ventana-viva' : undefined}
        />
      )
    }),
  )
}

function remate(torre: Torre, indice: number) {
  const techo = BASE - torre.alto
  if (torre.remate === 'tanque') {
    return (
      <rect
        key={`tanque-${indice}`}
        className="traza"
        x={torre.x + torre.ancho * 0.52}
        y={techo - 24}
        width={36}
        height={24}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        pathLength={1}
      />
    )
  }
  if (torre.remate === 'antena') {
    return (
      <line
        key={`antena-${indice}`}
        className="traza"
        x1={torre.x + torre.ancho * 0.3}
        y1={techo}
        x2={torre.x + torre.ancho * 0.3}
        y2={techo - 40}
        stroke="currentColor"
        strokeWidth={1}
        pathLength={1}
      />
    )
  }
  return null
}

export default function Edificios({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 1440 ${BASE}`}
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <line
        className="traza"
        x1="0"
        y1={BASE}
        x2="1440"
        y2={BASE}
        stroke="currentColor"
        strokeWidth={1}
        pathLength={1}
      />
      {torres.map((torre, i) => (
        <g key={torre.x}>
          <path
            className="traza"
            d={`M${torre.x} ${BASE}V${BASE - torre.alto}H${torre.x + torre.ancho}V${BASE}`}
            stroke="currentColor"
            strokeWidth={1}
            pathLength={1}
            style={{ animationDelay: `${i * 40}ms` }}
          />
          {remate(torre, i)}
          {ventanas(torre, i)}
        </g>
      ))}
    </svg>
  )
}
