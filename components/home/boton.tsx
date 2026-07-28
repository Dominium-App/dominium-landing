import Link from 'next/link'
import type { ReactNode } from 'react'

const tones = {
  bone: 'bg-on-forest text-forest-deep hover:bg-white focus-visible:outline-on-forest',
  'ghost-bone':
    'border border-on-forest-faint text-on-forest hover:border-on-forest-dim hover:bg-white/[0.06] focus-visible:outline-on-forest',
  forest: 'bg-forest text-on-forest hover:bg-forest-soft focus-visible:outline-forest',
  'ghost-forest':
    'border border-line-strong text-ink hover:border-forest hover:bg-forest/[0.05] focus-visible:outline-forest',
} as const

const sizes = {
  md: 'h-[50px] px-6 text-[15px]',
  lg: 'h-[58px] px-7 text-[16px]',
} as const

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <span>{children}</span>
      <span
        className="inline-block transition-transform duration-300 ease-(--ease-out-soft) group-hover:translate-x-1"
        aria-hidden="true"
      >
        →
      </span>
    </>
  )
}

export default function Boton({
  href,
  children,
  tone = 'forest',
  size = 'lg',
  external = false,
  className = '',
}: {
  href: string
  children: ReactNode
  tone?: keyof typeof tones
  size?: keyof typeof sizes
  external?: boolean
  className?: string
}) {
  const cls = `group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-[0.01em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${tones[tone]} ${sizes[size]} ${className}`

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        <Inner>{children}</Inner>
      </a>
    )
  }

  return (
    <Link href={href} className={cls}>
      <Inner>{children}</Inner>
    </Link>
  )
}
