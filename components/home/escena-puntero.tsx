'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export default function EscenaPuntero({
  children,
  className = '',
  label,
}: {
  children: ReactNode
  className?: string
  label: string
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let cx = 0
    let cy = 0
    let centrar = false

    const aplicar = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const x = centrar ? 0.5 : (cx - rect.left) / rect.width
      const y = centrar ? 0.5 : (cy - rect.top) / rect.height
      el.style.setProperty('--mx', x.toFixed(4))
      el.style.setProperty('--my', y.toFixed(4))
      el.style.setProperty('--px', (x * 2 - 1).toFixed(4))
      el.style.setProperty('--py', (y * 2 - 1).toFixed(4))
    }

    const programar = () => {
      if (!frame) frame = requestAnimationFrame(aplicar)
    }

    const mover = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      cx = e.clientX
      cy = e.clientY
      centrar = false
      el.dataset.puntero = 'on'
      programar()
    }

    const salir = () => {
      centrar = true
      el.dataset.puntero = 'off'
      programar()
    }

    el.addEventListener('pointermove', mover, { passive: true })
    el.addEventListener('pointerleave', salir)
    return () => {
      el.removeEventListener('pointermove', mover)
      el.removeEventListener('pointerleave', salir)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section ref={ref} className={`escena-puntero ${className}`} aria-label={label}>
      {children}
    </section>
  )
}
