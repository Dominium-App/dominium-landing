import VeroMark from './vero-mark'

const CHECKS = (
  <svg width="14" height="10" viewBox="0 0 16 11" fill="none" aria-hidden="true" className="inline-block">
    <path d="M11.07.65 5.6 6.1 3.5 4.02l-1.06 1.06 3.16 3.16L12.13 1.7 11.07.65Z" fill="#53BDEB" />
    <path d="M15.07.65 9.6 6.1l-.53-.52-1.06 1.06 1.59 1.6L15.13 1.7 15.07.65Z" fill="#53BDEB" />
  </svg>
)

function Outgoing({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[82%] rounded-xl rounded-tr-[4px] bg-[#005C4B] px-3 py-2">
        <p className="text-[12.5px] leading-[1.4] text-[#E9EDEF]">{text}</p>
        <p className="mt-0.5 text-right text-[9.5px] text-[#8FA9A2]">
          {time} {CHECKS}
        </p>
      </div>
    </div>
  )
}

function Incoming({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[82%] rounded-xl rounded-tl-[4px] bg-[#202C33] px-3 py-2">
        <p className="text-[12.5px] leading-[1.4] text-[#E9EDEF]">{text}</p>
        <p className="mt-0.5 text-right text-[9.5px] text-[#8696A0]">{time}</p>
      </div>
    </div>
  )
}

export default function WhatsappVero() {
  return (
    <div className="flex h-[560px] flex-col bg-[#0B141A]">
      <div className="flex items-center justify-between px-6 pb-1 pt-3.5">
        <span className="text-[12px] font-semibold text-[#E9EDEF] tabular-nums">02:47</span>
        <span className="text-[10px] tracking-wide text-[#8696A0]" aria-hidden="true">
          ●●● ▲ ▉
        </span>
      </div>

      <div className="flex items-center gap-2.5 border-b border-[#1D272E] bg-[#202C33] px-4 py-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B141A]">
          <VeroMark size={20} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-semibold text-[#E9EDEF]">Vero · Torre Madero</p>
          <p className="text-[10.5px] text-[#8696A0]">en línea</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-1.5 px-3 pb-3">
        <div className="mb-1 self-center rounded-md bg-[#182229] px-2.5 py-1">
          <span className="text-[10px] font-medium text-[#8696A0]">HOY 02:47</span>
        </div>
        <Outgoing text="Vero, hay una pérdida de agua grande en la cochera" time="02:47" />
        <Incoming
          text="Voy con eso ya. ¿Podés cerrar la llave de paso del pasillo de cocheras? Es la roja, al lado del medidor."
          time="02:47"
        />
        <Incoming
          text="Listo: plomero de guardia en camino, llega 3:20 aprox. Abrí la gestión #481 así seguís todo desde la app, y a la mañana le aviso al consejo."
          time="02:48"
        />
        <Outgoing text="Gracias!! No sabía a quién llamar a esta hora" time="02:49" />
        <Incoming text="Para eso estoy. Cualquier cosa escribime, quedo atenta." time="02:49" />
      </div>

      <div className="flex items-center gap-2 bg-[#202C33] px-3 py-2.5">
        <div className="flex-1 rounded-full bg-[#2A3942] px-3.5 py-2">
          <span className="text-[12px] text-[#8696A0]">Mensaje</span>
        </div>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00A884]" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#0B141A">
            <path d="M3.4 20.4 20.85 12 3.4 3.6v6.53L15 12 3.4 13.87v6.53Z" />
          </svg>
        </span>
      </div>
    </div>
  )
}
