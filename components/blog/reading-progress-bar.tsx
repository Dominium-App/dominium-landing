'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement
      const scrollTop = window.scrollY
      const max = doc.scrollHeight - doc.clientHeight
      const pct = max > 0 ? Math.min(100, Math.max(0, (scrollTop / max) * 100)) : 0
      setProgress(pct)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none hidden md:block"
      aria-hidden="true"
    >
      <div
        className="h-full transition-[width] duration-75 ease-linear"
        style={{
          width: `${progress}%`,
          backgroundColor: 'var(--color-accent)',
        }}
      />
    </div>
  )
}
