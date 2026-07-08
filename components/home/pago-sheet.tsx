import { ArrowUpCircle, Copy } from 'lucide-react'

const rows = [
  { label: 'Alias del consorcio', value: 'torre.madero.consorcio' },
  { label: 'CVU del consorcio', value: '0000003100098765432101' },
  { label: 'Monto exacto', value: '$ 184.500,00' },
]

export default function PagoSheet() {
  return (
    <figure
      className="w-full max-w-[360px] rounded-3xl p-6 shadow-(--shadow-sheet)"
      style={{ backgroundColor: '#1A3A2A' }}
      role="img"
      aria-label="Pantalla de pago de la app: monto exacto a transferir, alias y CVU del consorcio con botones para copiar, y aviso de que el pago se imputa automáticamente"
    >
      <p className="text-center text-[13px] font-semibold text-white">Pagar expensas</p>

      <div className="mt-5 flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#1A3A2A]">
          <ArrowUpCircle size={13} aria-hidden="true" />
          Transferí exactamente
        </span>
      </div>
      <p className="mt-3 text-center text-[38px] font-extrabold leading-none text-white tabular-nums">
        $ 184.500,00
      </p>
      <p className="mt-2 text-center text-[12px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
        Torre Madero · 4°B
      </p>

      <div className="mt-5 rounded-[20px] p-3.5 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Tiempo para transferir
        </p>
        <p className="mt-1 text-[30px] font-extrabold leading-none text-white tabular-nums">28:47</p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center gap-3 rounded-xl bg-white px-3.5 py-2.5"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[9.5px] font-semibold uppercase tracking-wide text-[#9B9A96]">
                {row.label}
              </p>
              <p className="truncate text-[13px] font-bold text-[#0D0D0B] tabular-nums">{row.value}</p>
            </div>
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: '#F0EEE9' }}
            >
              <Copy size={13} color="#1A3A2A" aria-hidden="true" />
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-[11.5px] leading-snug" style={{ color: 'rgba(255,255,255,0.7)' }}>
        El pago se imputa automáticamente a tu unidad — no necesitás enviar comprobante.
      </p>
    </figure>
  )
}
