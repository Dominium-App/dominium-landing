import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import CtaFooter from '@/components/cta-footer'
import BlogHero from '@/components/blog/blog-hero'
import BlogListing from '@/components/blog/blog-listing'
import { articles } from '@/lib/blog'

const SITE_URL = 'https://dominium.com.ar'

export const metadata: Metadata = {
  title: 'Blog: cambiar administrador, auditar expensas y Ley 941 (2026)',
  description:
    'Guías prácticas paso a paso sobre cambio de administrador, auditoría de expensas, Ley 941 y derechos del consorcista. CABA y GBA explicado sin lenguaje de abogado.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog Dominium — Todo lo que necesitás saber sobre tu consorcio',
    description:
      'Guías prácticas, derechos, normativa CABA y GBA. Sin lenguaje de abogado.',
    url: '/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Dominium — Guías sobre consorcios',
    description:
      'Guías prácticas sobre cambio de administrador, expensas y derechos del consorcista.',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
  ],
}

const blogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE_URL}/blog#blog`,
  url: `${SITE_URL}/blog`,
  name: 'Blog Dominium',
  description:
    'Guías prácticas sobre consorcios, expensas y normativa de propiedad horizontal en CABA y GBA.',
  inLanguage: 'es-AR',
  publisher: { '@id': `${SITE_URL}/#organization` },
  blogPost: articles.map((a) => ({
    '@type': 'BlogPosting',
    headline: a.title,
    description: a.excerpt,
    url: `${SITE_URL}/blog/${a.slug}`,
    datePublished: a.date,
    dateModified: a.date,
    author: { '@type': 'Organization', name: 'Equipo Dominium' },
  })),
}

const blogFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cómo cambio de administrador de consorcio en CABA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En CABA, el cambio se rige por la Ley 941 y el Código Civil y Comercial. Los pasos esenciales son: (1) convocar asamblea extraordinaria con los plazos legales, (2) alcanzar el quórum y la mayoría exigidos por el reglamento, (3) labrar el acta y notificar al administrador removido, (4) si el administrador removido se niega al traspaso, enviar carta documento. Tenemos una guía completa paso a paso.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo audito las expensas de mi edificio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Podés auditarlas en dos niveles: (1) revisión manual contrastando rubros con facturas y precios de mercado, (2) análisis con IA partida por partida usando Vero, nuestro analizador. El segundo método es gratis, sin registro y devuelve resultados en menos de 60 segundos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué obligaciones tiene el administrador según la Ley 941?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La Ley 941 obliga al administrador inscripto en el RPA a: rendir cuentas documentadas, dar acceso a facturas a los copropietarios, convocar asambleas anuales, mantener al día el libro de actas y el fondo de reserva, contratar seguros vigentes y proveedores en regla. El incumplimiento puede derivar en multas y suspensión por parte de la DGDyPC.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué hacer si el administrador no responde o no muestra facturas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El acceso a facturas es un derecho del consorcista según Ley 941. Si el administrador no responde por escrito, podés: (1) labrar nota formal con acuse de recibo, (2) llevar el tema a asamblea, (3) hacer denuncia en la DGDyPC. Si la situación es estructural, conviene evaluar el cambio de administrador.',
      },
    },
    {
      '@type': 'Question',
      name: '¿En qué se diferencia un administrador con IA de uno tradicional?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un administrador con IA puede auditar liquidaciones, detectar sobreprecios y procesar consultas en tiempo real, sin depender de horarios humanos. Un administrador tradicional opera con Excel y mail, sin trazabilidad automática. La diferencia clave es transparencia: acceso 24/7 a cada peso del consorcio vs. depender de un pedido formal.',
      },
    },
  ],
}

export default function BlogIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogFaqJsonLd) }}
      />
      <main>
        <Navigation />
        <BlogHero />
        <BlogListing
          articles={[...articles].sort(
            (a, b) => +new Date(b.date) - +new Date(a.date),
          )}
        />
        <CtaFooter />
      </main>
    </>
  )
}
