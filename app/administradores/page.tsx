import type { Metadata } from 'next'
import AdmNavigation from '@/components/adm-navigation'
import AdmHero from '@/components/adm-hero'
import AdmAcknowledgment from '@/components/adm-acknowledgment'
import AdmOfferings from '@/components/adm-offerings'
import AdmProcess from '@/components/adm-process'
import AdmTestimonials from '@/components/adm-testimonials'
import AdmContact from '@/components/adm-contact'

export const metadata: Metadata = {
  title: 'Para Administradores — Dominium',
  description:
    'Dominium acompaña a administradores de consorcio que quieren una transición ordenada. Tu cartera, en las mejores manos. Tu reputación, intacta.',
}

export default function AdministradoresPage() {
  return (
    <main>
      <AdmNavigation />
      <AdmHero />
      <AdmAcknowledgment />
      <AdmOfferings />
      <AdmProcess />
      <AdmTestimonials />
      <AdmContact />
    </main>
  )
}
