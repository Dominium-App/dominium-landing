'use client'

import { useState } from 'react'
import Indice from './indice'
import { homeFaqs as faqs } from '@/lib/faqs'

export default function Dudas() {
  const [abierta, setAbierta] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-paper py-24 md:py-32" aria-labelledby="faq-heading">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Indice n="09" label="Dudas" />
          <h2
            id="faq-heading"
            className="headline mt-8 text-[clamp(32px,4.4vw,60px)] text-ink"
          >
            Lo que más nos preguntan.
          </h2>
          <p className="mt-6 max-w-[36ch] text-[16px] leading-relaxed text-ink-2">
            ¿Tu pregunta no está acá? Escribinos a{' '}
            <a
              href="mailto:hola@dominium.com.ar"
              className="text-forest underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              hola@dominium.com.ar
            </a>{' '}
            o{' '}
            <a
              href="https://wa.me/5491172936904"
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              por WhatsApp
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
    </section>
  )
}
