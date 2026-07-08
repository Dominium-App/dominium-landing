import { ArrowDownLeft, ArrowUpRight, ChevronLeft, ChevronRight, Landmark, TrendingUp } from 'lucide-react'

const APP = {
  card: '#FFFFFF',
  border: '#E2E0DA',
  text: '#0D0D0B',
  text2: '#5C5B57',
  muted: '#9B9A96',
  primary: '#1A3A2A',
  success: '#1A3A2A',
  successBg: '#E8F2EC',
  error: '#DC2626',
  surface: '#F0EEE9',
  inflow: '#4ADE80',
  outflow: '#F87171',
}

type Movimiento = {
  icon: typeof Landmark
  iconColor: string
  iconBg: string
  titulo: string
  categoria: string
  monto: string
  entra: boolean
}

const hoy: Movimiento[] = [
  {
    icon: ArrowDownLeft,
    iconColor: APP.success,
    iconBg: APP.successBg,
    titulo: 'Expensa 4°B',
    categoria: 'Depósito',
    monto: '+ $ 184.500,00',
    entra: true,
  },
  {
    icon: ArrowUpRight,
    iconColor: APP.text,
    iconBg: APP.surface,
    titulo: 'Limpieza Brilla SA',
    categoria: 'Retiro',
    monto: '− $ 145.000,00',
    entra: false,
  },
]

const ayer: Movimiento[] = [
  {
    icon: ArrowUpRight,
    iconColor: APP.text,
    iconBg: APP.surface,
    titulo: 'OTIS Ascensores',
    categoria: 'Retiro',
    monto: '− $ 89.000,00',
    entra: false,
  },
  {
    icon: TrendingUp,
    iconColor: APP.success,
    iconBg: APP.successBg,
    titulo: 'Rendimiento',
    categoria: 'Rendimiento',
    monto: '+ $ 5.230,00',
    entra: true,
  },
]

function Fila({ icon: Icon, iconColor, iconBg, titulo, categoria, monto, entra }: Movimiento) {
  return (
    <li className="flex items-center gap-3 py-2.5">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={14} color={iconColor} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12.5px] font-semibold" style={{ color: APP.text }}>
          {titulo}
        </p>
        <p className="text-[10.5px]" style={{ color: APP.muted }}>
          {categoria}
        </p>
      </div>
      <p
        className="text-[12.5px] font-bold tabular-nums"
        style={{ color: entra ? APP.success : APP.error }}
      >
        {monto}
      </p>
    </li>
  )
}

export default function FinanzasSheet() {
  return (
    <figure
      className="w-full max-w-[360px] rounded-3xl border p-5 shadow-(--shadow-sheet)"
      style={{ backgroundColor: APP.card, borderColor: APP.border }}
      role="img"
      aria-label="Tab Finanzas de la app: balance del consorcio con ingresos y egresos del mes, y el detalle de cada movimiento con su categoría"
    >
      <div className="relative overflow-hidden rounded-2xl p-4" style={{ backgroundColor: APP.primary }}>
        <span
          className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
          aria-hidden="true"
        />
        <p className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Balance del consorcio
        </p>
        <p className="mt-1.5 text-[28px] font-extrabold leading-none text-white tabular-nums">
          $ 2.418.900,00
        </p>
        <div className="mt-3.5 flex items-center gap-8">
          <div>
            <p className="flex items-center gap-1.5 text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: APP.inflow }} aria-hidden="true" />
              Ingresos
            </p>
            <p className="mt-0.5 text-[13px] font-bold text-white tabular-nums">$ 2.290.500,00</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: APP.outflow }} aria-hidden="true" />
              Egresos
            </p>
            <p className="mt-0.5 text-[13px] font-bold text-white tabular-nums">$ 654.000,00</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between px-1">
        <ChevronLeft size={15} color={APP.muted} aria-hidden="true" />
        <p className="text-[12.5px] font-bold" style={{ color: APP.text }}>
          Julio 2026
        </p>
        <ChevronRight size={15} color="#C8C5BC" aria-hidden="true" />
      </div>

      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: APP.muted }}>
        Hoy
      </p>
      <ul className="divide-y" style={{ borderColor: APP.border }}>
        {hoy.map((m) => (
          <Fila key={m.titulo} {...m} />
        ))}
      </ul>

      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: APP.muted }}>
        Ayer
      </p>
      <ul className="divide-y" style={{ borderColor: APP.border }}>
        {ayer.map((m) => (
          <Fila key={m.titulo} {...m} />
        ))}
      </ul>
    </figure>
  )
}
