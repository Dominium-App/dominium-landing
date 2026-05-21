import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import TrustBar from '@/components/trust-bar'
import Problema from '@/components/problema'
import PorQueSuben from '@/components/por-que-suben'
import Analizador from '@/components/analizador'
import AnalizadorSeoContent from '@/components/analizador-seo-content'
import LoQueDetectaVero from '@/components/lo-que-detecta-vero'
import Comparador from '@/components/comparador'
import ComoFunciona from '@/components/como-funciona'
import FaqHome from '@/components/faq-home'
import Administradores from '@/components/administradores'
import CtaFooter from '@/components/cta-footer'

export const metadata: Metadata = {
  title: 'Auditá tus expensas con IA: gratis y en 60 segundos',
  description:
    '¿Las expensas no paran de subir y nadie te explica por qué? Subí tu liquidación y Vero detecta sobreprecios, gastos ocultos y mala administración del fondo de reserva. CABA + AMBA. Sin registro.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Las expensas no paran de subir y nadie te explica por qué. Nosotros sí.',
    description:
      'Subí tu liquidación. Vero, nuestra IA, te muestra partida por partida cuánto pagás de más en expensas. Administradora AI-first en CABA y AMBA. Gratis.',
    url: '/',
    type: 'website',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cómo funciona el analizador de expensas de Dominium?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Subís una foto o PDF de tu última liquidación de expensas. Vero, nuestra IA entrenada con datos de mercado del AMBA, identifica los rubros, los compara con valores de referencia y detecta sobreprecios, ítems sin justificación o problemas en el fondo de reserva. El resultado llega en pocos segundos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Es gratis auditar mis expensas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. El análisis con Vero es 100% gratuito y no requiere registro previo ni tarjeta de crédito. Solo te pedimos un dato de contacto para enviarte el informe.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Dominium es una administradora de consorcios real?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Dominium es una administradora de consorcios en CABA y AMBA que combina administración profesional con tecnología de IA. La propuesta se basa en transparencia total: dashboard online con cada peso, acceso a facturas 24/7 y auditoría continua de proveedores. Los fondos operativos se manejan a través de infraestructura bancaria regulada por BCRA (vía Cresium).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué zonas cubre Dominium?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Operamos en CABA y todo el AMBA (Área Metropolitana de Buenos Aires). El analizador de expensas funciona para cualquier liquidación de propiedad horizontal de Argentina.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué tipo de ahorros puedo obtener cambiándome a Dominium?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trabajamos para eliminar comisiones ocultas, sobreprecios en proveedores y gastos administrativos no justificados. El ahorro depende del estado actual de cada consorcio y se evalúa caso por caso.',
      },
    },
  ],
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
        <TrustBar />
        <Analizador />
        <PorQueSuben />
        <Problema />
        <LoQueDetectaVero />
        <Comparador />
        <ComoFunciona />
        <AnalizadorSeoContent />
        <FaqHome />
        <Administradores />
        <CtaFooter />
      </main>
    </>
  )
}
