'use client'

import Link from 'next/link'
import type { CtaType } from '@/lib/blog'

type Variant = 'inline' | 'compact'

const COPY: Record<CtaType, { eyebrow: string; heading: string; body: string; cta: string; href: string }> = {
  analizador: {
    eyebrow: 'Auditoría con IA',
    heading: '¿Tus expensas están bien liquidadas?',
    body:
      'Subí tu última liquidación y en 60 segundos te mandamos un análisis con los red flags. Gratis y sin registro.',
    cta: 'Analizar mi liquidación →',
    href: '/#analizador',
  },
  champion: {
    eyebrow: 'Programa Champion',
    heading: '¿Querés liderar el cambio en tu edificio?',
    body:
      'Tenemos un programa para vecinos que impulsan el cambio de administrador. Te damos las herramientas y, si cerramos el consorcio, te bonificamos las expensas ordinarias.',
    cta: 'Escribinos →',
    href: 'mailto:hola@dominium.com.ar?subject=Quiero%20ser%20Champion',
  },
  consulta: {
    eyebrow: '15 minutos, gratis',
    heading: '¿Tu caso tiene vueltas?',
    body: 'Charlemos 15 minutos. Sin costo, sin compromiso, sin venta.',
    cta: 'Agendá una charla →',
    href: 'mailto:hola@dominium.com.ar?subject=Agendar%20llamada',
  },
}

export default function CTABlock({
  ctaType,
  variant = 'inline',
}: {
  ctaType: CtaType
  variant?: Variant
}) {
  const copy = COPY[ctaType]
  const isCompact = variant === 'compact'
  const isMail = copy.href.startsWith('mailto:')

  const buttonClassName = `inline-flex items-center justify-center px-5 rounded-full font-semibold transition-colors duration-150 ${
    isCompact ? 'h-[42px] text-[14px]' : 'h-[48px] text-[15px]'
  }`
  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'white',
    color: 'var(--color-accent)',
    letterSpacing: '0.01em',
  }
  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    ;(e.currentTarget as HTMLElement).style.backgroundColor = '#F0FAF5'
  }
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    ;(e.currentTarget as HTMLElement).style.backgroundColor = 'white'
  }

  return (
    <aside
      className={`rounded-[16px] flex flex-col ${
        isCompact ? 'gap-3 p-6' : 'gap-4 p-8'
      }`}
      style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
      aria-label={copy.heading}
    >
      <p
        className="text-[11px] font-semibold tracking-[0.1em] uppercase"
        style={{ color: '#8ABF9A' }}
      >
        {copy.eyebrow}
      </p>
      <h3
        className={`font-serif font-bold leading-[1.2] text-balance ${
          isCompact ? 'text-[20px]' : 'text-[24px] md:text-[28px]'
        }`}
      >
        {copy.heading}
      </h3>
      <p
        className={`leading-relaxed ${isCompact ? 'text-[14px]' : 'text-[15px]'}`}
        style={{ color: 'rgba(255,255,255,0.78)' }}
      >
        {copy.body}
      </p>
      <div className="mt-1">
        {isMail ? (
          <a
            href={copy.href}
            className={buttonClassName}
            style={buttonStyle}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            {copy.cta}
          </a>
        ) : (
          <Link
            href={copy.href}
            className={buttonClassName}
            style={buttonStyle}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            {copy.cta}
          </Link>
        )}
      </div>
    </aside>
  )
}
