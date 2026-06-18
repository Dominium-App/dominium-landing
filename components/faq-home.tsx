"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "¿Cómo funciona el analizador de expensas con IA?",
    a: "Subís una foto o PDF de tu última liquidación. Vero, nuestra IA entrenada con datos de mercado del AMBA, identifica los rubros, los compara con valores de referencia y detecta sobreprecios, ítems sin justificación o problemas en el fondo de reserva. El resultado llega en menos de 60 segundos.",
  },
  {
    q: "¿Es realmente gratis? ¿Hay alguna letra chica?",
    a: "Sí, es 100% gratuito. No requiere registro previo ni tarjeta de crédito. Solo te pedimos un dato de contacto para enviarte el informe completo y poder responder dudas si las hubiera. Sin spam, sin llamadas comerciales no solicitadas.",
  },
  {
    q: "¿Dominium es una administradora de consorcios real?",
    a: "Sí. Dominium es una administradora de consorcios en CABA y AMBA que combina administración profesional con tecnología de IA. Nuestra propuesta se basa en transparencia total: dashboard online con cada peso, acceso a facturas 24/7 y auditoría continua de proveedores. Los fondos operativos se manejan a través de infraestructura bancaria regulada por BCRA (vía Cresium).",
  },
  {
    q: "¿Qué pasa si descubro sobreprecios en mi liquidación?",
    a: "Te explicamos cuáles son los rubros con alerta y te damos un plan para abordarlos: desde renegociar con tu administrador actual hasta acompañarte en el cambio de administración, asamblea y carta documento.",
  },
  {
    q: "¿Qué zonas cubre Dominium?",
    a: "Operamos en CABA y todo el AMBA (Área Metropolitana de Buenos Aires). Cubrimos barrios como Palermo, Belgrano, Caballito, Recoleta, Villa Crespo, Núñez y Almagro entre otros. El analizador con IA funciona para cualquier liquidación de propiedad horizontal de Argentina.",
  },
  {
    q: "¿Mis datos están seguros? ¿Qué hacen con la liquidación que subo?",
    a: "Tus datos están cifrados en tránsito y en reposo. La liquidación se procesa de forma confidencial y no se comparte con terceros. Podés solicitar la eliminación de tus datos cuando quieras escribiendo a hola@dominium.com.ar.",
  },
  {
    q: "¿Qué tipo de ahorros puedo obtener cambiándome a Dominium?",
    a: "Trabajamos para eliminar comisiones ocultas, sobreprecios en proveedores y gastos administrativos no justificados. El ahorro real depende del estado actual de cada consorcio y se evalúa caso por caso después de auditar la liquidación.",
  },
];

export default function FaqHome() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-[100px] md:py-[120px]"
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-[820px] px-6 flex flex-col gap-10">
        <div className="text-center flex flex-col gap-3">
          <p
            className="text-[12px] font-semibold tracking-[0.1em] uppercase"
            style={{ color: "var(--color-accent)" }}
          >
            Preguntas frecuentes
          </p>
          <h2
            id="faq-heading"
            className="font-serif font-bold text-balance leading-[1.15]"
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "var(--color-ink)",
            }}
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
                className="rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: `1px solid ${isOpen ? "var(--color-accent)" : "var(--color-border)"}`,
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-[15.5px] font-semibold"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {f.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className="shrink-0 transition-transform duration-200"
                    style={{
                      color: "var(--color-ink-tertiary)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                    }}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{
                    maxHeight: isOpen ? "400px" : "0",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p
                    className="px-5 pb-5 text-[14.5px] leading-relaxed"
                    style={{ color: "var(--color-ink-secondary)" }}
                  >
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p
          className="text-[13px] text-center"
          style={{ color: "var(--color-ink-tertiary)" }}
        >
          ¿Tu pregunta no está acá? Escribinos a{" "}
          <a
            href="mailto:hola@dominium.com.ar"
            className="underline"
            style={{ color: "var(--color-accent)" }}
          >
            hola@dominium.com.ar
          </a>{" "}
          o{" "}
          <a
            href="https://wa.me/5491136520670"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: "var(--color-accent)" }}
          >
            por WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  );
}
