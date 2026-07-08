import { Building2, Calendar, ChevronRight, FolderOpen, Home, Receipt, Ticket, Wallet } from 'lucide-react'

const APP = {
  bg: '#F8F7F4',
  card: '#FFFFFF',
  border: '#E2E0DA',
  text: '#0D0D0B',
  text2: '#5C5B57',
  muted: '#9B9A96',
  primary: '#1A3A2A',
  successBg: '#E8F2EC',
  warning: '#D97706',
  blue: '#3B7DD8',
}

export default function AppScreen() {
  return (
    <div className="relative flex h-[560px] flex-col" style={{ backgroundColor: APP.bg }}>
      <div className="flex items-center justify-between px-6 pb-2 pt-3.5">
        <span className="text-[12px] font-semibold tabular-nums" style={{ color: APP.text }}>
          09:41
        </span>
        <span className="text-[10px] tracking-wide" style={{ color: APP.muted }} aria-hidden="true">
          ●●● ▲ ▉
        </span>
      </div>

      <div className="flex items-center justify-between px-5 pt-1">
        <div>
          <p className="text-[16px] font-bold" style={{ color: APP.text }}>
            Hola, Martín
          </p>
          <p className="text-[11px]" style={{ color: APP.text2 }}>
            Torre Madero · 4°B
          </p>
        </div>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-white"
          style={{ backgroundColor: APP.primary }}
        >
          M
        </span>
      </div>

      <div className="px-5 pt-5">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em]" style={{ color: APP.muted }}>
          Pendientes de pago
        </p>
        <div
          className="relative mt-2 overflow-hidden rounded-2xl p-4"
          style={{ backgroundColor: APP.primary }}
        >
          <span
            className="pointer-events-none absolute -right-6 -top-10 h-28 w-28 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            aria-hidden="true"
          />
          <div className="flex items-start justify-between gap-2">
            <p className="whitespace-nowrap text-[11.5px] font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Expensa de Julio 2026
            </p>
            <span
              className="shrink-0 rounded-[5px] px-1.5 py-0.5 text-[9px] font-bold tracking-wide"
              style={{ backgroundColor: 'rgba(255,255,255,0.92)', color: APP.warning }}
            >
              PENDIENTE
            </span>
          </div>
          <p className="mt-2 text-[27px] font-extrabold leading-none text-white tabular-nums">
            $ 184.500,00
          </p>
          <div className="mt-3.5 flex items-end justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Vencimiento
              </p>
              <p className="text-[12px] font-semibold text-white tabular-nums">01/07/2026</p>
            </div>
            <span
              className="rounded-lg px-4 py-1.5 text-[12px] font-bold"
              style={{ backgroundColor: '#FFFFFF', color: APP.primary }}
            >
              Pagar
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-3">
        <div
          className="flex items-center gap-2 rounded-full px-3.5 py-2"
          style={{ backgroundColor: APP.successBg }}
        >
          <Wallet size={13} color={APP.primary} aria-hidden="true" />
          <p className="text-[11.5px] font-semibold" style={{ color: APP.primary }}>
            Saldo a favor
          </p>
          <p className="ml-auto text-[11.5px] font-bold tabular-nums" style={{ color: APP.primary }}>
            $ 12.000,00
          </p>
        </div>
      </div>

      <div className="px-5 pt-3">
        <div
          className="flex items-center gap-3 rounded-xl border p-3"
          style={{ backgroundColor: APP.card, borderColor: APP.border }}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: '#F0EEE9' }}
          >
            <Wallet size={14} color={APP.primary} aria-hidden="true" />
          </span>
          <div className="flex-1">
            <p className="text-[9.5px] font-semibold uppercase tracking-wide" style={{ color: APP.muted }}>
              Consorcio
            </p>
            <p className="text-[13.5px] font-bold tabular-nums" style={{ color: APP.text }}>
              $ 2.418.900,00
            </p>
          </div>
          <ChevronRight size={15} color={APP.muted} aria-hidden="true" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 px-5 pt-3">
        <span
          className="flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11.5px] font-semibold"
          style={{ backgroundColor: APP.card, borderColor: APP.border, color: APP.text }}
        >
          <Calendar size={13} color={APP.blue} aria-hidden="true" />
          Reservas
        </span>
        <span
          className="flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11.5px] font-semibold"
          style={{ backgroundColor: APP.card, borderColor: APP.border, color: APP.text }}
        >
          <FolderOpen size={13} color={APP.primary} aria-hidden="true" />
          Documentos
        </span>
      </div>

      <div className="absolute inset-x-4 bottom-3.5">
        <div
          className="flex h-[52px] items-center justify-between rounded-full border px-3 shadow-(--shadow-bar)"
          style={{ backgroundColor: 'rgba(255,255,255,0.92)', borderColor: 'rgba(255,255,255,0.6)' }}
        >
          <span
            className="flex items-center gap-1.5 rounded-full px-3 py-2"
            style={{ backgroundColor: 'rgba(26,58,42,0.12)' }}
          >
            <Home size={16} color={APP.primary} aria-hidden="true" />
            <span className="text-[11px] font-bold" style={{ color: APP.primary }}>
              Inicio
            </span>
          </span>
          <Receipt size={17} color={APP.muted} aria-hidden="true" />
          <Wallet size={17} color={APP.muted} aria-hidden="true" />
          <Ticket size={17} color={APP.muted} aria-hidden="true" />
          <Building2 size={17} color={APP.muted} aria-hidden="true" className="mr-1" />
        </div>
      </div>
    </div>
  )
}
