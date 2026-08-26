'use client'

import { useState } from 'react'
import { featuredHomeFaqs as faqs } from '@/lib/faqs'
import { WHATSAPP_CONSEJO } from '@/lib/contacto'
import Boton from './boton'
import Indice from './indice'

export default function Dudas() {
  const [abierta, setAbierta] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-paper py-24 md:py-32" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Indice n="06" label="Antes de hablar" />
            <h2
              id="faq-heading"
              className="headline mt-8 text-[clamp(32px,4.4vw,60px)] text-ink"
            >
              Cuatro dudas importantes.
            </h2>
            <p className="mt-6 max-w-[38ch] text-[16px] leading-relaxed text-ink-2">
              Si tu pregunta no está acá, escribinos a{' '}
              <a
                href="mailto:hola@dominium.com.ar"
                className="text-forest underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                hola@dominium.com.ar
              </a>
              .
            </p>
          </div>

          <dl className="lg:pt-2">
            {faqs.map((faq, i) => {
              const activa = abierta === i
              return (
                <div key={faq.q} className="border-t border-paper-line last:border-b">
                  <dt>
                    <button
                      onClick={() => setAbierta(activa ? null : i)}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-forest"
                      aria-expanded={activa}
                    >
                      <span
                        className={`text-[17px] font-semibold leading-snug transition-colors duration-200 md:text-[19px] ${
                          activa ? 'text-forest' : 'text-ink group-hover:text-forest'
                        }`}
                      >
                        {faq.q}
                      </span>
                      <span
                        className={`hairline-caps mt-1 shrink-0 text-[15px] transition-transform duration-300 ease-(--ease-out-soft) ${
                          activa ? 'rotate-45 text-forest' : 'rotate-0 text-ink-3'
                        }`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                  </dt>
                  <dd
                    className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
                    style={{
                      gridTemplateRows: activa ? '1fr' : '0fr',
                      opacity: activa ? 1 : 0,
                    }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="max-w-[62ch] pb-7 pr-10 text-[15.5px] leading-relaxed text-ink-2">
                        {faq.a}
                      </p>
                    </div>
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>

        <div
          id="contacto"
          className="relative mt-20 overflow-hidden rounded-[28px] bg-night px-7 py-12 md:mt-28 md:px-12 md:py-16 lg:flex lg:items-end lg:justify-between lg:gap-16"
        >
          <div className="relative max-w-[760px]">
            <p className="hairline-caps text-gold-light">El próximo paso</p>
            <h2 className="headline mt-5 text-[clamp(34px,5vw,68px)] text-on-forest">
              Contanos qué pasa en tu edificio.
            </h2>
            <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-on-forest-dim md:text-[19px]">
              Hablamos de la administración actual, revisamos los números y te explicamos cómo
              sería el cambio. Sin compromiso y con personas del equipo.
            </p>
          </div>
          <div className="relative mt-9 shrink-0 lg:mt-0">
            <Boton href={WHATSAPP_CONSEJO} tone="bone" external>
              Hablar sobre mi edificio
            </Boton>
          </div>
        </div>
      </div>
    </section>
  )
}
