import type { Metadata } from 'next'
import AdmNavigation from '@/components/adm-navigation'
import AdmHero from '@/components/adm-hero'
import AdmAcknowledgment from '@/components/adm-acknowledgment'
import AdmOfferings from '@/components/adm-offerings'
import AdmProcess from '@/components/adm-process'
import AdmTestimonials from '@/components/adm-testimonials'
import AdmContact from '@/components/adm-contact'

const SITE_URL = 'https://dominium.com.ar'

export const metadata: Metadata = {
  title: 'Plan de Retiro para Administradores de Consorcios',
  description:
    '¿Querés retirarte de la administración de consorcios? Cobrá 18 meses de comisiones por el traspaso ordenado de tu cartera. Tus clientes en las mejores manos. Tu reputación, intacta.',
  alternates: { canonical: '/administradores' },
  keywords: [
    'plan de retiro administrador consorcios',
    'vender cartera administrador',
    'transición administración consorcios',
    'jubilación administrador edificios',
    'traspaso cartera consorcios CABA',
  ],
  openGraph: {
    title: 'Plan de Retiro para Administradores de Consorcios | Dominium',
    description:
      '18 meses de comisiones por el traspaso de tu cartera. Una salida digna después de años de trabajo.',
    url: '/administradores',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plan de Retiro para Administradores | Dominium',
    description:
      '18 meses de comisiones por el traspaso ordenado de tu cartera de consorcios.',
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
      name: 'Para Administradores',
      item: `${SITE_URL}/administradores`,
    },
  ],
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/administradores#service`,
  name: 'Plan de Retiro para Administradores de Consorcios',
  serviceType: 'Transición y traspaso de cartera de administración',
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'AdministrativeArea', name: 'AMBA, Argentina' },
  description:
    'Programa para administradores de consorcios que quieren retirarse. Incluye 18 meses de comisiones, rol de Asesor Externo y gestión completa de la transición.',
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Administradores de consorcios',
    geographicArea: { '@type': 'AdministrativeArea', name: 'CABA y AMBA' },
  },
  offers: {
    '@type': 'Offer',
    description: '18 meses de comisiones post-traspaso',
    priceCurrency: 'ARS',
    availability: 'https://schema.org/InStock',
  },
}

export default function AdministradoresPage() {
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
        <AdmNavigation />
        <AdmHero />
        <AdmAcknowledgment />
        <AdmOfferings />
        <AdmProcess />
        <AdmTestimonials />
        <AdmContact />
      </main>
    </>
  )
}
