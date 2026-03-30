import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import Problema from '@/components/problema'
import Analizador from '@/components/analizador'
import ComoFunciona from '@/components/como-funciona'
import Administradores from '@/components/administradores'
import CtaFooter from '@/components/cta-footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Problema />
      <Analizador />
      <ComoFunciona />
      <Administradores />
      <CtaFooter />
    </main>
  )
}
