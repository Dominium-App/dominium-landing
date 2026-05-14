import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Calculadora from '@/components/calculadora'
import FaqHome from '@/components/faq-home'
import CtaFooter from '@/components/cta-footer'

const SITE_URL = 'https://dominium.com.ar'

export const metadata: Metadata = {
  title: '¿Cuánto deberías pagar de expensas? Calculadora 2026',
  description:
    'Calculá el rango esperado de expensas para tu edificio según barrio, unidades, antigüedad y amenities. Comparalo con lo que pagás hoy. Gratis y al instante.',
  alternates: { canonical: '/calculadora-expensas' },
  keywords: [
    'calculadora expensas',
    'cuánto debería pagar expensas',
    'expensas promedio CABA',
    'expensas Palermo precio',
    'expensas Belgrano promedio',
    'cuánto cuestan las expensas',
    'comparar expensas',
    'expensas por unidad',
  ],
  openGraph: {
    title: 'Calculadora de expensas — ¿Cuánto deberías pagar? | Dominium',
    description:
      'Estimá el rango razonable de expensas para tu edificio en CABA y AMBA. Comparalo con lo que pagás.',
    url: '/calculadora-expensas',
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
      name: 'Calculadora de expensas',
      item: `${SITE_URL}/calculadora-expensas`,
    },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cómo se calculan las expensas esperadas para un edificio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El cálculo se basa en valores de mercado del AMBA por unidad, ajustados por barrio, antigüedad del edificio, presencia de amenities y de encargado permanente. El rango estimado contempla ±12% de variación normal entre edificios comparables.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué pasa si pago más que el rango estimado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pagar por encima del rango no significa irregularidad automática, pero indica que es razonable auditar partida por partida para entender qué rubros explican la diferencia. Subí tu liquidación al analizador y Vero te lo muestra al detalle.',
      },
    },
    {
      '@type': 'Question',
      name: '¿La calculadora reemplaza una auditoría real?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. La calculadora es una estimación global. Una auditoría real requiere analizar la liquidación completa rubro por rubro, contrastando con valores reales de proveedores y normativa vigente. Para eso usá nuestro analizador con IA.',
      },
    },
  ],
}

export default function CalculadoraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
              style={{ color: 'var(--color-vero)' }}
            >
              Calculadora de expensas
            </p>
            <h1
              className="font-serif font-bold leading-[1.05] tracking-[-0.02em] text-balance"
              style={{
                fontSize: 'clamp(34px, 5vw, 56px)',
                color: 'var(--color-ink)',
              }}
            >
              ¿Cuánto <em style={{ fontStyle: 'italic' }}>deberías</em> pagar
              <br />
              de expensas?
            </h1>
            <p
              className="text-[18px] leading-relaxed max-w-[600px]"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              Indicá tu barrio, cantidad de unidades, antigüedad y amenities. Te decimos el rango
              esperado para un edificio similar al tuyo, basado en datos de mercado del AMBA.
            </p>
          </div>
        </section>

        {/* Calculadora */}
        <section className="pb-[60px]" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="mx-auto max-w-[1000px] px-6">
            <Calculadora />
          </div>
        </section>

        {/* Educational content */}
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
              Cómo entender el rango estimado.
            </h2>
            <p
              className="text-[16px] leading-relaxed"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              Las expensas razonables para un edificio dependen de varios factores objetivos: el
              barrio define los costos laborales y de servicios, la cantidad de unidades determina
              cómo se reparte el costo, la antigüedad influye en gastos de mantenimiento, y los
              amenities suman gastos fijos. La calculadora combina estos factores con datos de
              mercado del AMBA para estimar un rango razonable.
            </p>
            <p
              className="text-[16px] leading-relaxed"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              Si pagás dentro del rango, no significa que no haya optimizaciones posibles — significa
              que estás en línea con edificios similares. Si pagás por encima, es razonable revisar
              honorarios del administrador, contratos de proveedores y la gestión del fondo de
              reserva. Para eso, podés usar nuestro{' '}
              <Link
                href="/auditar-expensas"
                className="underline"
                style={{ color: 'var(--color-accent)' }}
              >
                analizador de expensas con IA
              </Link>
              .
            </p>
          </div>
        </section>

        <FaqHome />
        <CtaFooter />
      </main>
    </>
  )
}
