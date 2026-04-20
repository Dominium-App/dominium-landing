import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import Problema from '@/components/problema'
import Analizador from '@/components/analizador'
import AnalizadorSeoContent from '@/components/analizador-seo-content'
import ComoFunciona from '@/components/como-funciona'
import Administradores from '@/components/administradores'
import CtaFooter from '@/components/cta-footer'

export const metadata: Metadata = {
  title: 'Administración de consorcios con IA | Auditá tus expensas gratis',
  description:
    'Subí tu liquidación y Vero, nuestra IA, detecta cuánto pagás de más en expensas. Administradora de consorcios en CABA y AMBA. Análisis gratuito sin registro.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Administración de consorcios con IA | Dominium',
    description:
      'Auditá tu liquidación de expensas con IA. Detectá sobreprecios, gastos ocultos y mala administración del fondo de reserva. Gratis.',
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
        text: 'Sí. Dominium es una administradora de consorcios registrada en CABA, con fondos protegidos por regulación BCRA. Combinamos administración profesional con tecnología de IA para ofrecer transparencia total.',
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
        <Problema />
        <Analizador />
        <AnalizadorSeoContent />
        <ComoFunciona />
        <Administradores />
        <CtaFooter />
      </main>
    </>
  )
}
