"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { homeFaqs as faqs } from "@/lib/faqs";

export default function FaqHome() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="bg-canvas py-24 md:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto flex max-w-[820px] flex-col gap-10 px-6">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-forest">
            Preguntas frecuentes
          </p>
          <h2
            id="faq-heading"
            className="font-serif text-[clamp(28px,4vw,40px)] font-bold leading-[1.15] text-ink text-balance"
          >
            Lo que más nos preguntan.
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-xl border bg-surface transition-colors duration-200 ${
                  isOpen ? "border-forest" : "border-line"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-forest"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15.5px] font-semibold text-ink">
                    {f.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-ink-3 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-ink-2">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[13px] text-ink-3">
          ¿Tu pregunta no está acá? Escribinos a{" "}
          <a
            href="mailto:hola@dominium.com.ar"
            className="text-forest underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            hola@dominium.com.ar
          </a>{" "}
          o{" "}
          <a
            href="https://wa.me/5491172936904"
            target="_blank"
            rel="noopener noreferrer"
            className="text-forest underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            por WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  );
}
