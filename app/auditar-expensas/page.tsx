import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Upload, Sparkles, ShieldCheck } from 'lucide-react'
import Navigation from '@/components/navigation'
import Analizador from '@/components/analizador'
import LoQueDetectaVero from '@/components/lo-que-detecta-vero'
import FaqHome from '@/components/faq-home'
import CtaFooter from '@/components/cta-footer'

const SITE_URL = 'https://dominium.com.ar'

export const metadata: Metadata = {
  title: 'Auditar expensas online con IA — gratis y en 60 segundos',
  description:
    'Subí tu liquidación de expensas y nuestra IA detecta sobreprecios, comisiones ocultas y problemas en el fondo de reserva. Auditoría gratuita, sin registro, en menos de 60 segundos. CABA + AMBA.',
  alternates: { canonical: '/auditar-expensas' },
  keywords: [
    'auditar expensas',
    'auditar expensas online',
    'auditoría de expensas',
    'analizador de expensas',
    'cómo auditar expensas',
    'auditoría expensas CABA',
    'detectar sobreprecios expensas',
    'IA expensas',
  ],
  openGraph: {
    title: 'Auditar expensas online con IA — Dominium',
    description:
      'Subí tu liquidación y Vero detecta cuánto pagás de más en 60 segundos. Gratis, sin registro.',
    url: '/auditar-expensas',
    type: 'website',
  },
}

const features = [
  {
    Icon: Sparkles,
    title: 'IA entrenada con datos del AMBA',
    body: 'Vero compara tu liquidación con valores reales de mercado de edificios similares en CABA y GBA.',
  },
  {
    Icon: CheckCircle2,
    title: 'Partida por partida',
    body: 'Honorarios, ascensor, seguro, encargado, fondo de reserva. Cada rubro con su estado: normal, elevado o alerta.',
  },
  {
    Icon: ShieldCheck,
    title: 'Tus datos están protegidos',
    body: 'Procesamiento cifrado. No compartimos tu liquidación con terceros. Podés solicitar la eliminación cuando quieras.',
  },
  {
    Icon: Upload,
    title: 'PDF, foto o captura',
    body: 'Sirve cualquier formato. Lo que tengas a mano. Vero extrae los datos automáticamente.',
  },
]

const steps = [
  {
    n: '01',
    title: 'Subís tu liquidación',
    body: 'Foto, PDF o captura — lo que tengas. Aceptamos JPG, PNG y PDF de hasta 10MB. Sin registro previo.',
  },
  {
    n: '02',
    title: 'Vero analiza con IA',
    body: 'En menos de 60 segundos, identifica cada rubro y lo compara con valores de referencia del mercado AMBA.',
  },
  {
    n: '03',
    title: 'Recibís el informe',
    body: 'Desglose claro con rubros en alerta, ahorro estimado y conclusiones. Listo para compartir en tu grupo de WhatsApp.',
  },
  {
    n: '04',
    title: 'Decidís el próximo paso',
    body: 'Renegociar con tu administrador, llamar a asamblea o cambiar de administración. Te acompañamos en cualquiera de los tres.',
  },
]

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo auditar las expensas de tu edificio con IA',
  description:
    'Guía paso a paso para auditar la liquidación de expensas usando el analizador con IA de Dominium.',
  totalTime: 'PT2M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'ARS', value: '0' },
  step: steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Auditoría de expensas con IA',
  serviceType: 'Auditoría financiera de propiedad horizontal',
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'AdministrativeArea', name: 'AMBA, Argentina' },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'ARS' },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Auditar expensas',
      item: `${SITE_URL}/auditar-expensas`,
    },
  ],
}

export default function AuditarExpensasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main>
        <Navigation />

        {/* Hero */}
        <section
          className="pt-32 pb-16 md:pt-40 md:pb-20"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          <div className="mx-auto max-w-[920px] px-6 text-center flex flex-col items-center gap-6">
            <p
              className="text-[12px] font-semibold tracking-[0.1em] uppercase"
              style={{ color: 'var(--color-vero)' }}
            >
              Auditoría de expensas con IA
            </p>
            <h1
              className="font-serif font-bold leading-[1.05] tracking-[-0.02em] text-balance"
              style={{
                fontSize: 'clamp(36px, 5vw, 60px)',
                color: 'var(--color-ink)',
              }}
            >
              Auditá tus expensas online,
              <br />
              <span style={{ color: 'var(--color-accent)' }}>gratis y en 60 segundos.</span>
            </h1>
            <p
              className="text-[18px] leading-relaxed max-w-[640px]"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              Subí tu última liquidación de expensas. Vero, nuestra IA, la analiza partida por
              partida, la compara con valores de mercado del AMBA y te muestra cuánto estás pagando
              de más. Sin registro. Sin tarjeta.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a
                href="#analizador"
                className="inline-flex items-center justify-center h-[52px] px-6 rounded-full text-[15px] font-semibold text-white"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                Auditar mi liquidación →
              </a>
              <Link
                href="/blog/expensas-caba-guia-auditar-reclamar"
                className="inline-flex items-center justify-center h-[52px] px-6 rounded-full text-[15px] font-semibold"
                style={{
                  border: '1.5px solid var(--color-border)',
                  color: 'var(--color-ink)',
                }}
              >
                Leer la guía completa
              </Link>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section
          className="py-16 md:py-20"
          style={{ backgroundColor: 'var(--color-surface)' }}
        >
          <div className="mx-auto max-w-[1120px] px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => (
                <article
                  key={f.title}
                  className="flex flex-col gap-3"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-accent-glow)' }}
                  >
                    <f.Icon size={20} style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <h3
                    className="text-[17px] font-semibold leading-snug"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-[14.5px] leading-relaxed"
                    style={{ color: 'var(--color-ink-secondary)' }}
                  >
                    {f.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Analizador embebido */}
        <Analizador />

        {/* Steps */}
        <section className="py-[100px] md:py-[120px]" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="mx-auto max-w-[1120px] px-6 flex flex-col gap-12">
            <div className="text-center max-w-[640px] mx-auto flex flex-col gap-4">
              <p
                className="text-[12px] font-semibold tracking-[0.1em] uppercase"
                style={{ color: 'var(--color-accent)' }}
              >
                Cómo funciona
              </p>
              <h2
                className="font-serif font-bold text-balance leading-[1.15]"
                style={{
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  color: 'var(--color-ink)',
                }}
              >
                Auditar tus expensas en 4 pasos.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s) => (
                <article
                  key={s.n}
                  className="rounded-[16px] p-6 flex flex-col gap-3"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <span
                    className="text-[28px] font-serif font-bold leading-none"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {s.n}
                  </span>
                  <h3
                    className="text-[17px] font-semibold leading-snug"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-[14px] leading-relaxed"
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
        <FaqHome />
        <CtaFooter />
      </main>
    </>
  )
}
