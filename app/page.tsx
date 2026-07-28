import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import LineaScroll from '@/components/home/linea-scroll'
import Hero from '@/components/home/hero'
import Cargo from '@/components/home/cargo'
import Tesis from '@/components/home/tesis'
import Adentro from '@/components/home/adentro'
import BandaVero from '@/components/home/banda-vero'
import Libro from '@/components/home/libro'
import Analizador from '@/components/analizador'
import Precio from '@/components/home/precio'
import Empezar from '@/components/home/empezar'
import Dudas from '@/components/home/dudas'
import Cierre from '@/components/home/cierre'
import CtaFooter from '@/components/cta-footer'
import { homeFaqs } from '@/lib/faqs'

export const metadata: Metadata = {
  title: 'Administración de consorcios con IA en Buenos Aires',
  description:
    'Dominium administra tu edificio con Vero, una IA que responde a los vecinos por WhatsApp las 24 horas, banco regulado por BCRA y una app con cada gasto a la vista. Sin comisiones de proveedores ni cajas paralelas. Auditá tus expensas gratis en 60 segundos.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Dominium — La administración de consorcios que atiende a las 2:47 de la mañana',
    description:
      'Administración de consorcios con IA: Vero atiende por WhatsApp 24/7, la plata del edificio en un banco regulado por BCRA y cada gasto auditado a la vista. Sin comisiones de proveedores ni cajas paralelas.',
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
      <LineaScroll />
      <main>
        <Navigation dark />
        <Hero />
        <Cargo />
        <Tesis />
        <Adentro />
        <BandaVero />
        <Libro />
        <Analizador indice="06" />
        <Precio />
        <Empezar />
        <Dudas />
        <Cierre />
        <CtaFooter cta={false} />
      </main>
    </>
  )
}
