'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

/**
 * Capas decorativas del hero: aurora nocturna que respira, grano sutil y
 * la "linterna" del puntero que revela la grilla a la altura de las 2:47.
 * Todo es pointer-events-none y se apaga con prefers-reduced-motion.
 */
export default function HeroAmbiente() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const zona = el.parentElement ?? el
    let frame = 0
    let cx = 0
    let cy = 0

    const aplicar = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', ((cx - r.left) / r.width).toFixed(4))
      el.style.setProperty('--my', ((cy - r.top) / r.height).toFixed(4))
    }

    const mover = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      cx = e.clientX
      cy = e.clientY
      el.dataset.puntero = 'on'
      if (!frame) frame = requestAnimationFrame(aplicar)
    }

    const salir = () => {
      el.dataset.puntero = 'off'
    }

    zona.addEventListener('pointermove', mover, { passive: true })
    zona.addEventListener('pointerleave', salir)
    return () => {
      zona.removeEventListener('pointermove', mover)
      zona.removeEventListener('pointerleave', salir)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="aurora absolute inset-0" />
      <div className="estrellas absolute inset-x-0 top-0 h-[62%]" />
      <div className="estrellas estrellas-2 absolute inset-x-0 top-0 h-[62%]" />
      <div
        className="rules rules-luz absolute inset-0"
        style={{ '--rule-cols': 6, '--rule-ink': 'rgba(234,192,98,0.18)' } as CSSProperties}
      />
      <div className="luz-puntero absolute inset-0" />
      <div className="grano absolute inset-0 opacity-[0.14] mix-blend-overlay" />
    </div>
  )
}
