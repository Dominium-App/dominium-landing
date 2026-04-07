'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function AdmNavigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Para propietarios', href: '/' },
    { label: 'Nosotros', href: '/nosotros' },
  ]

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          backgroundColor: scrolled ? 'rgba(248,247,244,0.85)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        }}
        aria-label="Navegación principal"
      >
        <div className="mx-auto max-w-[1120px] px-6 h-16 flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-serif text-[22px] font-bold tracking-tight"
            style={{ color: 'var(--color-ink)' }}
            aria-label="Dominium — Inicio"
          >
            Dominium
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium transition-colors duration-150 relative group"
                style={{ color: 'var(--color-ink-secondary)' }}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-200 group-hover:w-full"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />
              </Link>
            ))}
            <a
              href="#contacto"
              className="inline-flex items-center h-[42px] px-5 rounded-full text-[15px] font-semibold text-white transition-colors duration-150"
              style={{ backgroundColor: 'var(--color-accent)', letterSpacing: '0.02em' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent-light)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent)')}
            >
              Hablemos en privado
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={22} color="var(--color-ink)" />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          <div className="flex items-center justify-between px-6 h-16">
            <span
              className="font-serif text-[22px] font-bold"
              style={{ color: 'var(--color-ink)' }}
            >
              Dominium
            </span>
            <button
              className="p-2 rounded-lg"
              onClick={() => setMobileOpen(false)}
              aria-label="Cerrar menú"
            >
              <X size={22} color="var(--color-ink)" />
            </button>
          </div>
          <div className="flex flex-col gap-2 px-6 pt-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[20px] font-medium py-3 border-b"
                style={{
                  color: 'var(--color-ink)',
                  borderColor: 'var(--color-border)',
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              className="mt-6 inline-flex items-center justify-center h-[50px] px-6 rounded-full text-[15px] font-semibold text-white"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              Hablemos en privado →
            </a>
          </div>
        </div>
      )}
    </>
  )
}
