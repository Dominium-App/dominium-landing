import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Hero from '@/components/home/hero'
import Producto from '@/components/home/producto'
import VeroEscenarios from '@/components/home/vero-escenarios'
import Confianza from '@/components/home/confianza'
import Comparador from '@/components/comparador'
import Precio from '@/components/home/precio'
import Analizador from '@/components/analizador'
import ParaQuien from '@/components/home/para-quien'
import Cambio from '@/components/home/cambio'
import FaqHome from '@/components/faq-home'
import CtaFooter from '@/components/cta-footer'
import { homeFaqs } from '@/lib/faqs'

export const metadata: Metadata = {
  title: 'Administración de consorcios con IA en Buenos Aires',
  description:
    'Dominium administra tu edificio con Vero, una IA que responde a los vecinos por WhatsApp las 24 horas, banco regulado por BCRA y una app con cada gasto a la vista. Mismo honorario que tu administración actual. Auditá tus expensas gratis en 60 segundos.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Dominium — Tu edificio ahora responde a las 2 de la mañana',
    description:
      'Administración de consorcios con IA: Vero atiende por WhatsApp 24/7, la plata del edificio en un banco regulado por BCRA y cada gasto auditado a la vista. Por el mismo honorario que ya pagás.',
    url: '/',
    type: 'website',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main>
        <Navigation />
        <Hero />
        <Producto />
        <VeroEscenarios />
        <Confianza />
        <Comparador />
        <Precio />
        <Analizador />
        <ParaQuien />
        <Cambio />
        <FaqHome />
        <CtaFooter />
      </main>
    </>
  )
}
