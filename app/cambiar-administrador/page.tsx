import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, Users, ArrowRight } from 'lucide-react'
import Navigation from '@/components/navigation'
import Comparador from '@/components/comparador'
import LoQueDetectaVero from '@/components/lo-que-detecta-vero'
import FaqHome from '@/components/faq-home'
import CtaFooter from '@/components/cta-footer'

const SITE_URL = 'https://dominium.com.ar'

export const metadata: Metadata = {
  title: 'Cambiar administrador de consorcio en CABA — guía + acompañamiento',
  description:
    'Te ayudamos a cambiar de administrador de consorcio en CABA paso a paso: convocatoria de asamblea, quórum, carta documento y traspaso. Acompañamiento legal y operativo. Ley 941.',
  alternates: { canonical: '/cambiar-administrador' },
  keywords: [
    'cambiar administrador consorcio',
    'cambiar administrador de consorcio CABA',
    'remover administrador consorcio',
    'cambiar administración edificio',
    'carta documento administrador',
    'asamblea remoción administrador',
    'Ley 941 cambio administrador',
    'nuevo administrador consorcio',
  ],
  openGraph: {
    title: 'Cambiar administrador de consorcio en CABA — Dominium',
    description:
      'Te acompañamos en el cambio: asamblea, quórum, carta documento y traspaso. Sin abogados intermediarios.',
    url: '/cambiar-administrador',
    type: 'website',
  },
}

const proceso = [
  {
    n: '01',
    title: 'Auditamos tu administración actual',
    body: 'Análisis de las últimas 3 liquidaciones con Vero. Detectamos sobreprecios, rubros sin justificar y problemas en el fondo de reserva.',
    time: 'Día 1-3',
  },
  {
    n: '02',
    title: 'Te armamos el caso',
    body: 'Recibís un informe técnico con números concretos para llevar a la asamblea. Plantilla de orden del día y modelo de convocatoria incluidos.',
    time: 'Día 4-7',
  },
  {
    n: '03',
    title: 'Convocatoria de asamblea',
    body: 'Te asesoramos para que la convocatoria cumpla la Ley 941 y no pueda ser anulada por defecto de forma. Verificamos plazos y quórum.',
    time: 'Día 8-15',
  },
  {
    n: '04',
    title: 'Asamblea y votación',
    body: 'Acompañamiento durante la asamblea. Acta validada según marco legal porteño. Notificación formal al administrador removido.',
    time: 'Día 20-30',
  },
  {
    n: '05',
    title: 'Carta documento (si hace falta)',
    body: 'Si el administrador removido no entrega documentación o se niega al traspaso, te asistimos con la carta documento y los plazos de la DGDyPC.',
    time: 'Día 30-45',
  },
  {
    n: '06',
    title: 'Ya somos tu administradora',
    body: 'Onboarding completo: digitalizamos documentación, integramos proveedores y publicamos el primer dashboard de transparencia.',
    time: 'Día 30-45',
  },
]

const blockers = [
  {
    blocker: '"Es un quilombo armar la asamblea"',
    solution: 'Te damos el modelo de convocatoria, calculamos el quórum y te avisamos los plazos. Cero burocracia para vos.',
  },
  {
    blocker: '"El administrador actual no va a soltar"',
    solution: 'Carta documento + Ley 941. Si se niega, la DGDyPC tiene facultades para multarlo y suspenderlo del RPA.',
  },
  {
    blocker: '"No sé si los demás propietarios van a estar de acuerdo"',
    solution: 'Te ayudamos a comunicar a tu consorcio: informe técnico con números, comparativos con el barrio y casos similares.',
  },
  {
    blocker: '"Y si el nuevo administrador es peor?"',
    solution: 'Te damos dashboard de transparencia desde el día uno. Cada peso, cada proveedor, cada votación: auditable y visible.',
  },
]

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cambio de administrador de consorcio',
  serviceType: 'Asesoramiento y administración de consorcios',
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'AdministrativeArea', name: 'CABA + AMBA' },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Cambiar administrador',
      item: `${SITE_URL}/cambiar-administrador`,
    },
  ],
}

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo cambiar de administrador de consorcio en CABA',
  description:
    'Proceso paso a paso para remover al administrador actual y designar uno nuevo según Ley 941.',
  totalTime: 'P45D',
  step: proceso.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
}

export default function CambiarAdministradorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main>
        <Navigation />

        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="mx-auto max-w-[920px] px-6 text-center flex flex-col items-center gap-6">
            <p
              className="text-[12px] font-semibold tracking-[0.1em] uppercase"
              style={{ color: 'var(--color-accent)' }}
            >
              Cambio de administrador — CABA + AMBA
            </p>
            <h1
              className="font-serif font-bold leading-[1.05] tracking-[-0.02em] text-balance"
              style={{
                fontSize: 'clamp(34px, 5vw, 58px)',
                color: 'var(--color-ink)',
              }}
            >
              Cambiá de administrador
              <br />
              <span style={{ color: 'var(--color-accent)' }}>sin que sea un trámite imposible.</span>
            </h1>
            <p
              className="text-[18px] leading-relaxed max-w-[640px]"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              Te acompañamos en cada paso: auditoría, asamblea, carta documento y traspaso. Sin
              abogados intermediarios, sin meses de demora, sin riesgo de anulación por defecto de
              forma.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a
                href="#proceso"
                className="inline-flex items-center justify-center h-[52px] px-6 rounded-full text-[15px] font-semibold text-white"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                Ver el proceso completo ↓
              </a>
              <Link
                href="/#analizador"
                className="inline-flex items-center justify-center h-[52px] px-6 rounded-full text-[15px] font-semibold"
                style={{ border: '1.5px solid var(--color-border)', color: 'var(--color-ink)' }}
              >
                Auditar mi administración actual
              </Link>
            </div>
          </div>
        </section>

        {/* Proceso visual */}
        <section
          id="proceso"
          className="py-[100px] md:py-[120px]"
          style={{ backgroundColor: 'var(--color-surface)' }}
        >
          <div className="mx-auto max-w-[1120px] px-6 flex flex-col gap-12">
            <div className="text-center max-w-[680px] mx-auto flex flex-col gap-4">
              <p
                className="text-[12px] font-semibold tracking-[0.1em] uppercase"
                style={{ color: 'var(--color-accent)' }}
              >
                El proceso, paso a paso
              </p>
              <h2
                className="font-serif font-bold text-balance leading-[1.15]"
                style={{
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  color: 'var(--color-ink)',
                }}
              >
                De auditar a administrar.<br />45 días en promedio.
              </h2>
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: 'var(--color-ink-secondary)' }}
              >
                Cumpliendo Ley 941 y el Código Civil y Comercial. Sin atajos, pero sin demoras
                innecesarias.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {proceso.map((p) => (
                <article
                  key={p.n}
                  className="rounded-[16px] p-6 flex flex-col gap-3"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[24px] font-serif font-bold leading-none"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {p.n}
                    </span>
                    <span
                      className="text-[11px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: 'var(--color-accent-glow)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      {p.time}
                    </span>
                  </div>
                  <h3
                    className="text-[17px] font-semibold leading-snug"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-[14px] leading-relaxed"
                    style={{ color: 'var(--color-ink-secondary)' }}
                  >
                    {p.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Objection handling */}
        <section
          className="py-[100px] md:py-[120px]"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          <div className="mx-auto max-w-[920px] px-6 flex flex-col gap-12">
            <div className="text-center max-w-[680px] mx-auto flex flex-col gap-4">
              <p
                className="text-[12px] font-semibold tracking-[0.1em] uppercase"
                style={{ color: 'var(--color-accent)' }}
              >
                Los miedos que escuchamos siempre
              </p>
              <h2
                className="font-serif font-bold text-balance leading-[1.15]"
                style={{
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  color: 'var(--color-ink)',
                }}
              >
                Lo que pensás. Lo que pasa.
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {blockers.map((b, i) => (
                <div
                  key={i}
                  className="rounded-[16px] p-6 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-4"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div>
                    <p
                      className="text-[11px] font-semibold uppercase tracking-wider mb-2"
                      style={{ color: 'var(--color-ink-tertiary)' }}
                    >
                      Te decís
                    </p>
                    <p
                      className="text-[15px] font-medium leading-snug"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      {b.blocker}
                    </p>
                  </div>
                  <ArrowRight
                    size={20}
                    className="mx-auto md:mx-0 mt-0 md:mt-7 rotate-90 md:rotate-0"
                    style={{ color: 'var(--color-accent)' }}
                  />
                  <div>
                    <p
                      className="text-[11px] font-semibold uppercase tracking-wider mb-2"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      Cómo lo resolvemos
                    </p>
                    <p
                      className="text-[15px] leading-snug"
                      style={{ color: 'var(--color-ink-secondary)' }}
                    >
                      {b.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Comparador />

        {/* Resource block */}
        <section
          className="py-[80px] md:py-[100px]"
          style={{ backgroundColor: 'var(--color-surface)' }}
        >
          <div className="mx-auto max-w-[920px] px-6 flex flex-col gap-8">
            <div className="text-center flex flex-col gap-3">
              <p
                className="text-[12px] font-semibold tracking-[0.1em] uppercase"
                style={{ color: 'var(--color-accent)' }}
              >
                Guías relacionadas
              </p>
              <h2
                className="font-serif font-bold leading-[1.15]"
                style={{
                  fontSize: 'clamp(24px, 3.5vw, 34px)',
                  color: 'var(--color-ink)',
                }}
              >
                Recursos para tu consorcio.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  href: '/blog/como-cambiar-administrador-consorcio-caba',
                  title: 'Guía completa CABA',
                  body: '8 pasos legales para cambiar de administrador según Ley 941.',
                  Icon: FileText,
                },
                {
                  href: '/blog/asamblea-extraordinaria-consorcio-caba-guia',
                  title: 'Asamblea extraordinaria',
                  body: 'Quórum, plazos y modelo de convocatoria que no se anula.',
                  Icon: Users,
                },
                {
                  href: '/blog/carta-documento-remocion-administrador-consorcio',
                  title: 'Carta documento',
                  body: 'Cuando el administrador removido no quiere irse.',
                  Icon: FileText,
                },
              ].map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="block rounded-[14px] p-5 flex flex-col gap-3 transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <card.Icon size={20} style={{ color: 'var(--color-accent)' }} />
                  <h3
                    className="text-[16px] font-semibold leading-snug"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-[13.5px] leading-relaxed"
                    style={{ color: 'var(--color-ink-secondary)' }}
                  >
                    {card.body}
                  </p>
                  <span
                    className="text-[13px] font-medium mt-auto"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Leer guía →
                  </span>
                </Link>
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

