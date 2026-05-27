import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import Navigation from '@/components/navigation'
import Comparador from '@/components/comparador'
import CtaFooter from '@/components/cta-footer'
import { BARRIOS } from '@/lib/barrios'

const SITE_URL = 'https://www.dominium.com.ar'

export const metadata: Metadata = {
  title: 'Administrador de consorcio en CABA — Cobertura por barrio',
  description:
    'Dominium administra consorcios en los principales barrios de CABA: Palermo, Belgrano, Caballito, Recoleta, Villa Crespo y más. Auditoría de expensas con IA y transparencia total.',
  alternates: { canonical: '/administrador-consorcio' },
  keywords: [
    'administrador de consorcio CABA',
    'administradora de consorcios Ciudad de Buenos Aires',
    'administrador edificios CABA',
    'administración consorcios Buenos Aires',
  ],
  openGraph: {
    title: 'Administrador de consorcio en CABA — Cobertura por barrio | Dominium',
    description:
      'Administradora con IA en los principales barrios de CABA. Auditá tus expensas gratis.',
    url: '/administrador-consorcio',
    type: 'website',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Administrador de consorcio',
      item: `${SITE_URL}/administrador-consorcio`,
    },
  ],
}

export default function AdministradorConsorcioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main>
        <Navigation />

        {/* Hero */}
        <section
          className="pt-32 pb-12 md:pt-40 md:pb-16"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          <div className="mx-auto max-w-[920px] px-6 text-center flex flex-col items-center gap-6">
            <p
              className="text-[12px] font-semibold tracking-[0.1em] uppercase"
              style={{ color: 'var(--color-accent)' }}
            >
              Cobertura CABA + AMBA
            </p>
            <h1
              className="font-serif font-bold leading-[1.05] tracking-[-0.02em] text-balance"
              style={{
                fontSize: 'clamp(34px, 5vw, 56px)',
                color: 'var(--color-ink)',
              }}
            >
              Administrador de consorcio
              <br />
              <span style={{ color: 'var(--color-accent)' }}>donde está tu edificio.</span>
            </h1>
            <p
              className="text-[18px] leading-relaxed max-w-[640px]"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              Operamos en los principales barrios de CABA y todo el AMBA. Auditá tu liquidación
              actual y descubrí cómo administramos consorcios en tu zona.
            </p>
          </div>
        </section>

        {/* Grid de barrios */}
        <section className="pb-[80px] md:pb-[100px]" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="mx-auto max-w-[1120px] px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {BARRIOS.map((b) => (
                <Link
                  key={b.slug}
                  href={`/administrador-consorcio/${b.slug}`}
                  className="rounded-[16px] p-6 flex flex-col gap-4 transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} style={{ color: 'var(--color-accent)' }} />
                      <h2
                        className="text-[20px] font-semibold"
                        style={{ color: 'var(--color-ink)' }}
                      >
                        {b.nombre}
                      </h2>
                    </div>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: 'var(--color-accent-glow)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      Comuna {b.comuna}
                    </span>
                  </div>

                  <p
                    className="text-[13.5px] leading-relaxed"
                    style={{ color: 'var(--color-ink-secondary)' }}
                  >
                    {b.caracteristicas[0]}
                  </p>

                  <span
                    className="text-[13px] font-semibold mt-auto"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Ver administración en {b.nombre} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Comparador />
        <CtaFooter />
      </main>
    </>
  )
}
