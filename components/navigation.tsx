'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const isActive = (href: string) => {
    const path = href.split('#')[0] || '/'
    if (path === '/') return pathname === '/'
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
    hamburgerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobile()
        return
      }
      if (e.key !== 'Tab' || !overlayRef.current) return
      const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen, closeMobile])

  const links = [
    { label: 'Auditar expensas', href: '/auditar-expensas' },
    { label: 'Cambiar administrador', href: '/cambiar-administrador' },
    { label: 'Blog', href: '/blog' },
    { label: 'Nosotros', href: '/nosotros' },
  ]

  const isAdmin = pathname === '/administradores' || pathname.startsWith('/administradores/')
  const cta = isAdmin
    ? { href: '#contacto', desktopLabel: 'Hablemos en privado', mobileLabel: 'Hablemos en privado →' }
    : { href: '/#analizador', desktopLabel: 'Auditar mis expensas', mobileLabel: 'Auditar mis expensas gratis' }

  const onDark = pathname === '/' && !scrolled

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-(--z-nav) border-b transition-[background-color,border-color] duration-300 ${
          scrolled
            ? 'border-line bg-canvas/85 backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
        aria-label="Navegación principal"
      >
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6">
          {/* Wordmark */}
          <Link
            href="/"
            className={`font-serif text-[22px] font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 ${
              onDark ? 'text-on-forest focus-visible:outline-on-forest' : 'text-ink focus-visible:outline-forest'
            }`}
            aria-label="Dominium — Inicio"
          >
            Dominium
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`group relative text-[15px] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 ${
                    onDark
                      ? 'text-on-forest focus-visible:outline-on-forest'
                      : active
                        ? 'text-forest focus-visible:outline-forest'
                        : 'text-ink-2 hover:text-ink focus-visible:outline-forest'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left transition-transform duration-200 ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100'
                    } ${onDark ? 'bg-on-forest' : 'bg-forest'}`}
                  />
                </Link>
              )
            })}
            <a
              href={cta.href}
              className={`inline-flex h-[42px] items-center rounded-full px-5 text-[15px] font-semibold tracking-[0.02em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                onDark
                  ? 'bg-on-forest text-forest-deep hover:bg-white focus-visible:outline-on-forest'
                  : 'bg-forest text-white hover:bg-forest-soft focus-visible:outline-forest'
              }`}
            >
              {cta.desktopLabel}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            className={`rounded-lg p-2 focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden ${
              onDark ? 'text-on-forest focus-visible:outline-on-forest' : 'text-ink focus-visible:outline-forest'
            }`}
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-(--z-overlay) flex flex-col bg-canvas"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <div className="flex h-16 items-center justify-between px-6">
            <span className="font-serif text-[22px] font-bold text-ink">Dominium</span>
            <button
              ref={closeRef}
              className="rounded-lg p-2 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              onClick={closeMobile}
              aria-label="Cerrar menú"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <div className="flex flex-col gap-2 px-6 pt-8">
            {links.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`border-b border-line py-3 text-[20px] font-medium underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
                    active ? 'text-forest underline' : 'text-ink'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              )
            })}
            <a
              href={cta.href}
              onClick={() => setMobileOpen(false)}
              className="mt-6 inline-flex h-[50px] items-center justify-center rounded-full bg-forest px-6 text-[15px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              {cta.mobileLabel}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
