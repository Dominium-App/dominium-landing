import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, CheckCircle2, TrendingDown, Sparkles } from 'lucide-react'
import Navigation from '@/components/navigation'
import Comparador from '@/components/comparador'
import LoQueDetectaVero from '@/components/lo-que-detecta-vero'
import CtaFooter from '@/components/cta-footer'
import { BARRIOS, BARRIO_SLUGS, getBarrio } from '@/lib/barrios'

const SITE_URL = 'https://dominium.com.ar'

type PageProps = { params: Promise<{ barrio: string }> }

export function generateStaticParams() {
  return BARRIO_SLUGS.map((barrio) => ({ barrio }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { barrio: slug } = await params
  const b = getBarrio(slug)
  if (!b) {
    return { title: 'Barrio no encontrado', robots: { index: false, follow: true } }
  }
  const url = `/administrador-consorcio/${b.slug}`
  return {
    title: `Administrador de consorcio en ${b.nombre} — Auditoría con IA`,
    description: b.hookSeo,
    alternates: { canonical: url },
    keywords: [
      `administrador de consorcio ${b.nombre}`,
      `administradora ${b.nombre}`,
      `expensas ${b.nombre}`,
      `cambiar administrador ${b.nombre}`,
      `auditoría expensas ${b.nombre}`,
      `consorcio ${b.nombre} CABA`,
    ],
    openGraph: {
      title: `Administrador de consorcio en ${b.nombre} | Dominium`,
      description: b.hookSeo,
      url,
      type: 'website',
    },
  }
}

function fmt(n: number) {
  return '$' + n.toLocaleString('es-AR')
}

export default async function BarrioPage({ params }: PageProps) {
  const { barrio: slug } = await params
  const b = getBarrio(slug)
  if (!b) notFound()

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Administrador de consorcio en ${b.nombre}`,
        item: `${SITE_URL}/administrador-consorcio/${b.slug}`,
      },
    ],
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Administración de consorcios en ${b.nombre}`,
    serviceType: 'Administración de propiedad horizontal',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: {
      '@type': 'City',
      name: b.nombre,
      address: {
        '@type': 'PostalAddress',
        addressLocality: b.nombre,
        addressRegion: 'CABA',
        addressCountry: 'AR',
      },
    },
  }

  const vecinosFull = b.vecinos.map((slug) => BARRIOS.find((x) => x.slug === slug)).filter(Boolean)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <main>
        <Navigation />

        {/* Hero */}
        <section
          className="pt-32 pb-16 md:pt-40 md:pb-20"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          <div className="mx-auto max-w-[1120px] px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
              <div className="flex flex-col gap-5">
                <p
                  className="text-[12px] font-semibold tracking-[0.1em] uppercase flex items-center gap-1.5"
                  style={{ color: 'var(--color-accent)' }}
                >
                  <MapPin size={13} />
                  {b.nombre} · Comuna {b.comuna}
                </p>
                <h1
                  className="font-serif font-bold leading-[1.05] tracking-[-0.02em] text-balance"
                  style={{
                    fontSize: 'clamp(34px, 5vw, 56px)',
                    color: 'var(--color-ink)',
                  }}
                >
                  {b.hookHero}
                </h1>
                <p
                  className="text-[18px] leading-relaxed max-w-[560px]"
                  style={{ color: 'var(--color-ink-secondary)' }}
                >
                  Dominium administra edificios en {b.nombre} con IA y transparencia total. Auditá
                  tu liquidación actual gratis y descubrí si estás pagando más de lo razonable para
                  un edificio comparable del barrio.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <Link
                    href="/#analizador"
                    className="inline-flex items-center justify-center h-[52px] px-6 rounded-full text-[15px] font-semibold text-white"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    Auditar mi liquidación →
                  </Link>
                  <Link
                    href="/calculadora-expensas"
                    className="inline-flex items-center justify-center h-[52px] px-6 rounded-full text-[15px] font-semibold"
                    style={{ border: '1.5px solid var(--color-border)', color: 'var(--color-ink)' }}
                  >
                    Calcular rango esperado
                  </Link>
                </div>
              </div>

              {/* Datos del barrio card */}
              <div
                className="rounded-[20px] p-6 md:p-8 flex flex-col gap-5"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)',
                }}
              >
                <p
                  className="text-[12px] font-semibold tracking-[0.1em] uppercase"
                  style={{ color: 'var(--color-ink-tertiary)' }}
                >
                  Datos de {b.nombre}
                </p>

                <div className="flex flex-col gap-1">
                  <p
                    className="text-[12.5px] font-semibold uppercase tracking-wide"
                    style={{ color: 'var(--color-ink-tertiary)' }}
                  >
                    Rango de expensas / unidad
                  </p>
                  <p
                    className="font-serif font-bold leading-none"
                    style={{
                      fontSize: 'clamp(22px, 3vw, 30px)',
                      color: 'var(--color-ink)',
                    }}
                  >
                    {fmt(b.rangoExpensas.min)}
                    <span
                      className="text-[14px] font-sans font-normal mx-2"
                      style={{ color: 'var(--color-ink-tertiary)' }}
                    >
                      a
                    </span>
                    {fmt(b.rangoExpensas.max)}
                  </p>
                  <p
                    className="text-[12px] mt-1"
                    style={{ color: 'var(--color-ink-tertiary)' }}
                  >
                    Estimado en base a datos de mercado AMBA.
                  </p>
                </div>

                <div
                  className="h-px w-full"
                  style={{ backgroundColor: 'var(--color-border)' }}
                />

                <div className="flex flex-col gap-2">
                  <p
                    className="text-[12.5px] font-semibold uppercase tracking-wide"
                    style={{ color: 'var(--color-ink-tertiary)' }}
                  >
                    Características de edificios en {b.nombre}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {b.caracteristicas.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-[13.5px]">
                        <CheckCircle2
                          size={14}
                          style={{ color: 'var(--color-accent)' }}
                          className="mt-0.5 shrink-0"
                        />
                        <span style={{ color: 'var(--color-ink-secondary)' }}>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contexto del barrio */}
        <section
          className="py-[80px] md:py-[100px]"
          style={{ backgroundColor: 'var(--color-surface)' }}
        >
          <div className="mx-auto max-w-[820px] px-6 flex flex-col gap-8">
            <h2
              className="font-serif font-bold leading-[1.2]"
              style={{
                fontSize: 'clamp(24px, 3.5vw, 34px)',
                color: 'var(--color-ink)',
              }}
            >
              ¿Cómo es administrar edificios en {b.nombre}?
            </h2>
            <p
              className="text-[16px] leading-relaxed"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              {b.contexto}
            </p>
            <p
              className="text-[16px] leading-relaxed"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              En Dominium administramos consorcios en {b.nombre} con una metodología distinta a la
              tradicional: dashboard con cada peso explicado, auditoría continua de proveedores con
              IA y trazabilidad del fondo de reserva en tiempo real. Si querés ver cómo se compara
              tu administración actual, podés{' '}
              <Link
                href="/#analizador"
                className="underline"
                style={{ color: 'var(--color-accent)' }}
              >
                auditar tu liquidación gratis
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Servicios */}
        <section
          className="py-[80px] md:py-[100px]"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          <div className="mx-auto max-w-[1120px] px-6 flex flex-col gap-12">
            <div className="text-center max-w-[600px] mx-auto flex flex-col gap-3">
              <h2
                className="font-serif font-bold leading-[1.15]"
                style={{
                  fontSize: 'clamp(24px, 3.5vw, 34px)',
                  color: 'var(--color-ink)',
                }}
              >
                Qué hacemos por tu edificio en {b.nombre}.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  Icon: Sparkles,
                  title: 'Auditoría continua con IA',
                  body: `Vero revisa cada liquidación en busca de sobreprecios, ítems sin justificar y desviaciones respecto a otros edificios de ${b.nombre}.`,
                },
                {
                  Icon: TrendingDown,
                  title: 'Reducción de gastos',
                  body: 'Renegociamos proveedores, eliminamos comisiones ocultas y optimizamos el fondo de reserva. El ahorro real depende del estado de cada consorcio.',
                },
                {
                  Icon: CheckCircle2,
                  title: 'Transparencia total',
                  body: 'Dashboard online, facturas accesibles 24/7, historial de proveedores y trazabilidad de cada peso del fondo de reserva.',
                },
              ].map((s) => (
                <article
                  key={s.title}
                  className="rounded-[16px] p-6 flex flex-col gap-3"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-accent-glow)' }}
                  >
                    <s.Icon size={20} style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <h3
                    className="text-[17px] font-semibold leading-snug"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-[14.5px] leading-relaxed"
                    style={{ color: 'var(--color-ink-secondary)' }}
                  >
                    {s.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <LoQueDetectaVero />
        <Comparador />

        {/* Barrios vecinos */}
        {vecinosFull.length > 0 && (
          <section
            className="py-[80px]"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            <div className="mx-auto max-w-[1120px] px-6">
              <h2
                className="font-serif font-bold leading-[1.15] mb-8"
                style={{
                  fontSize: 'clamp(22px, 3vw, 30px)',
                  color: 'var(--color-ink)',
                }}
              >
                Barrios linderos donde también administramos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vecinosFull.map((v) => (
                  <Link
                    key={v!.slug}
                    href={`/administrador-consorcio/${v!.slug}`}
                    className="rounded-[14px] p-5 flex items-center gap-3 transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <MapPin size={18} style={{ color: 'var(--color-accent)' }} />
                    <div>
                      <p
                        className="text-[15px] font-semibold"
                        style={{ color: 'var(--color-ink)' }}
                      >
                        Administrador en {v!.nombre}
                      </p>
                      <p
                        className="text-[12.5px]"
                        style={{ color: 'var(--color-ink-tertiary)' }}
                      >
                        Comuna {v!.comuna}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaFooter />
      </main>
    </>
  )
}
