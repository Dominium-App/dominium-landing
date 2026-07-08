import type { ReactNode } from 'react'

export default function PhoneFrame({
  children,
  className = '',
  label,
}: {
  children: ReactNode
  className?: string
  label: string
}) {
  return (
    <figure
      className={`relative w-[290px] shrink-0 rounded-[46px] bg-[#060A08] p-[10px] shadow-(--shadow-phone) ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="relative overflow-hidden rounded-[37px]">
        <div
          className="pointer-events-none absolute left-1/2 top-2.5 z-10 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-[#060A08]"
          aria-hidden="true"
        />
        {children}
      </div>
    </figure>
  )
}
