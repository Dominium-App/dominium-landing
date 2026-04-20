import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Página no encontrada (404)',
  description:
    'La página que buscás no existe o fue movida. Volvé al inicio o auditá tus expensas con Dominium.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-[560px] flex flex-col items-center text-center gap-6">
        <p
          className="text-[12px] font-semibold tracking-[0.1em] uppercase"
          style={{ color: 'var(--color-accent)' }}
        >
          Error 404
        </p>
        <h1
          className="font-serif font-bold leading-[1.1] text-balance"
          style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--color-ink)' }}
        >
          Esta página se mudó —<br />o nunca existió.
        </h1>
        <p className="text-[17px] leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
          No encontramos lo que buscabas. Podés volver al inicio o auditar tu liquidación de
          expensas con Vero, nuestra IA.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-[50px] px-6 rounded-full text-[15px] font-semibold text-white"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            Volver al inicio
          </Link>
          <Link
            href="/#analizador"
            className="inline-flex items-center justify-center h-[50px] px-6 rounded-full text-[15px] font-semibold"
            style={{
              border: '1.5px solid var(--color-accent)',
              color: 'var(--color-accent)',
            }}
          >
            Analizar mis expensas →
          </Link>
        </div>

        <nav aria-label="Enlaces útiles" className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link href="/" className="text-[14px] underline" style={{ color: 'var(--color-ink-tertiary)' }}>
            Administración de consorcios
          </Link>
          <Link
            href="/administradores"
            className="text-[14px] underline"
            style={{ color: 'var(--color-ink-tertiary)' }}
          >
            Para administradores
          </Link>
          <Link href="/nosotros" className="text-[14px] underline" style={{ color: 'var(--color-ink-tertiary)' }}>
            Nosotros
          </Link>
        </nav>
      </div>
    </main>
  )
}
