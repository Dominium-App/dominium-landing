import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import LineaScroll from '@/components/home/linea-scroll'
import Hero from '@/components/home/hero'
import Cargo from '@/components/home/cargo'
import Adentro from '@/components/home/adentro'
import Libro from '@/components/home/libro'
import Analizador from '@/components/analizador'
import Empezar from '@/components/home/empezar'
import Dudas from '@/components/home/dudas'
import CtaFooter from '@/components/cta-footer'
import { featuredHomeFaqs } from '@/lib/faqs'

export const metadata: Metadata = {
  title: 'Dominium administra tu consorcio | CABA y AMBA',
  description:
    'Dominium es una administración de consorcios completa. Nuestro equipo usa tecnología e inteligencia artificial para responder 24/7, automatizar la operación y mostrar cada peso del edificio.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Dominium — Administramos tu consorcio',
    description:
      'Una administración de consorcios completa, con equipo humano, tecnología propia e inteligencia artificial. Atención 24/7 y cada peso a la vista.',
    url: '/',
    type: 'website',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: featuredHomeFaqs.map((faq) => ({
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
      <LineaScroll />
      <main>
        <Navigation dark />
        <Hero />
        <Cargo />
        <Adentro />
        <Libro />
        <Empezar />
        <Analizador indice="05" />
        <Dudas />
        <CtaFooter cta={false} appPromo={false} />
      </main>
    </>
  )
}
