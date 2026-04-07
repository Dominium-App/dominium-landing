import type { Metadata } from 'next'
import Navigation from '@/components/navigation'
import NosotrosHero from '@/components/nosotros-hero'
import CtaFooter from '@/components/cta-footer'

export const metadata: Metadata = {
  title: 'Nosotros — Dominium',
  description:
    'Conocé al equipo detrás de Dominium, la administradora de consorcios de nueva generación.',
}

export default function NosotrosPage() {
  return (
    <main>
      <Navigation />
      <NosotrosHero />
      <CtaFooter />
    </main>
  )
}
