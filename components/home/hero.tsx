import PhoneFrame from './phone-frame'
import WhatsappVero from './whatsapp-vero'

const WHATSAPP_URL =
  'https://wa.me/5491172936904?text=Hola%20Vero%2C%20quiero%20saber%20m%C3%A1s%20de%20Dominium%20para%20mi%20edificio'

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-forest-deep to-forest pt-16"
      aria-label="Dominium, administración de consorcios con inteligencia artificial"
    >
      <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-14 px-6 pb-20 pt-14 md:pb-28 md:pt-20 lg:flex-row lg:items-center lg:gap-10">
        <div className="flex max-w-[600px] flex-col items-start gap-6 lg:flex-1">
          <p className="home-rise inline-flex items-center gap-2 rounded-full border border-on-forest-faint px-4 py-1.5 text-[13px] font-medium text-on-forest-dim">
            Administración de consorcios · CABA y AMBA
          </p>

          <h1
            className="home-rise font-serif text-[clamp(34px,5.2vw,58px)] font-bold leading-[1.08] tracking-[-0.01em] text-on-forest text-balance"
            style={{ animationDelay: '80ms' }}
          >
            Tu edificio ahora responde a las 2 de la mañana.
          </h1>

          <p
            className="home-rise max-w-[54ch] text-[17px] leading-relaxed text-on-forest-dim"
            style={{ animationDelay: '160ms' }}
          >
            Dominium administra tu consorcio con Vero, una IA que atiende a los vecinos por
            WhatsApp las 24 horas. La plata del edificio en un banco regulado por BCRA, cada
            gasto a la vista en la app, y el mismo honorario que ya pagás hoy.
          </p>

          <div
            className="home-rise flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            style={{ animationDelay: '240ms' }}
          >
            <a
              href="#analizador"
              className="inline-flex h-[54px] items-center justify-center rounded-full bg-on-forest px-7 text-[16px] font-semibold text-forest-deep transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-forest"
            >
              Auditar mis expensas gratis
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[54px] items-center justify-center rounded-full border border-on-forest-faint px-7 text-[16px] font-semibold text-on-forest transition-colors duration-150 hover:border-on-forest-dim hover:bg-forest-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-forest"
            >
              Hablar con Vero
            </a>
          </div>

          <p className="home-rise text-[13px] text-on-forest-dim" style={{ animationDelay: '320ms' }}>
            Sin registro · Resultado en 60 segundos · Datos cifrados
          </p>
        </div>

        <div className="phone-settle lg:flex-none">
          <PhoneFrame
            label="Conversación de WhatsApp a las 2:47 de la mañana: un vecino reporta una pérdida de agua en la cochera y Vero responde al instante, despacha al plomero de guardia y abre la gestión"
            className="ring-1 ring-on-forest-faint"
          >
            <WhatsappVero />
          </PhoneFrame>
        </div>
      </div>
    </section>
  )
}
