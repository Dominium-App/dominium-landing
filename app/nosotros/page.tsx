import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import NosotrosHero from '@/components/nosotros-hero'
import CtaFooter from '@/components/cta-footer'

const SITE_URL = 'https://dominium.com.ar'

export const metadata: Metadata = {
  title: 'Nosotros — Equipo y misión de Dominium',
  description:
    'Conocé al equipo detrás de Dominium, la primera administradora de consorcios con IA en Argentina. Tecnología, transparencia y experiencia en propiedad horizontal.',
  alternates: { canonical: '/nosotros' },
  openGraph: {
    title: 'Nosotros — Equipo y misión de Dominium',
    description:
      'El equipo que está cambiando la administración de consorcios en Argentina. Conocé a Lucio, Santiago y Enzo.',
    url: '/nosotros',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nosotros — Equipo y misión de Dominium',
    description:
      'Conocé al equipo de la primera administradora de consorcios con IA en Argentina.',
  },
}

const team = [
  { name: 'Lucio Majewski', role: 'CEO', jobTitle: 'Chief Executive Officer' },
  { name: 'Santiago Suppes', role: 'COO', jobTitle: 'Chief Operating Officer' },
  { name: 'Enzo Cazenave', role: 'CTO', jobTitle: 'Chief Technology Officer' },
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Nosotros', item: `${SITE_URL}/nosotros` },
  ],
}

const aboutPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/nosotros#aboutpage`,
  url: `${SITE_URL}/nosotros`,
  name: 'Nosotros — Equipo y misión de Dominium',
  inLanguage: 'es-AR',
  isPartOf: { '@type': 'WebSite', name: 'Dominium', url: SITE_URL },
  about: { '@id': `${SITE_URL}/#organization` },
  mainEntity: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    employee: team.map((m) => ({
      '@type': 'Person',
      name: m.name,
      jobTitle: m.jobTitle,
      worksFor: { '@id': `${SITE_URL}/#organization` },
    })),
  },
}

export default function NosotrosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <main>
        <Navigation />
        <NosotrosHero />
        <CtaFooter />
      </main>
    </>
  )
}
