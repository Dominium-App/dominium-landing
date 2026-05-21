"use client";

import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";

type Row = {
  feature: string;
  tradicional: { text: string; ok: boolean };
  dominium: { text: string; ok: boolean };
};

const rows: Row[] = [
  {
    feature: "Liquidación mensual",
    tradicional: { text: "PDF con códigos crípticos", ok: false },
    dominium: { text: "Dashboard con cada peso explicado", ok: true },
  },
  {
    feature: "Acceso a facturas",
    tradicional: { text: '"Pasá por la oficina"', ok: false },
    dominium: { text: "Online, 24/7, descargables", ok: true },
  },
  {
    feature: "Comparación con mercado",
    tradicional: { text: "Imposible — no tenés con qué", ok: false },
    dominium: { text: "Automática con IA", ok: true },
  },
  {
    feature: "Tiempo de respuesta",
    tradicional: { text: "5 a 15 días", ok: false },
    dominium: { text: "Menos de 24h (humano + IA)", ok: true },
  },
  {
    feature: "Auditoría del fondo de reserva",
    tradicional: { text: "Vos lo hacés — si podés", ok: false },
    dominium: { text: "Automática en cada cierre", ok: true },
  },
  {
    feature: "Trazabilidad de proveedores",
    tradicional: { text: "No hay historial visible", ok: false },
    dominium: { text: "Historial completo y comparable", ok: true },
  },
  {
    feature: "Tecnología",
    tradicional: { text: "Excel y mail", ok: false },
    dominium: { text: "App + IA + WhatsApp", ok: true },
  },
  {
    feature: "Comisiones ocultas",
    tradicional: { text: "Posibles — y difíciles de detectar", ok: false },
    dominium: { text: "Cero. Fee fijo declarado", ok: true },
  },
];

export default function Comparador() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="comparador"
      className="py-[100px] md:py-[120px]"
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-label="Tu administrador actual vs. Dominium"
    >
      <div className="mx-auto max-w-[1120px] px-6 flex flex-col items-center gap-12">
        {/* Header */}
        <div
          className="text-center max-w-[680px] flex flex-col gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p
            className="text-[12px] font-semibold tracking-[0.1em] uppercase"
            style={{ color: "var(--color-accent)" }}
          >
            La diferencia, sin vueltas
          </p>
          <h2
            className="font-serif font-bold text-balance leading-[1.15]"
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              color: "var(--color-ink)",
            }}
          >
            Tu administrador actual
            <br />
            vs. Dominium.
          </h2>
          <p
            className="text-[16px] leading-relaxed"
            style={{ color: "var(--color-ink-secondary)" }}
          >
            Mismo edificio. Mismo trabajo. Una diferencia clara en cómo lo hacemos.
          </p>
        </div>

        {/* Table — Desktop */}
        <div
          className="hidden md:block w-full rounded-[16px] overflow-hidden"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.06)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          {/* Header row */}
          <div
            className="grid grid-cols-[1.4fr_1fr_1fr]"
            style={{ borderBottom: "1px solid var(--color-border)" }}
          >
            <div className="px-6 py-5" />
            <div
              className="px-6 py-5 text-center"
              style={{
                backgroundColor: "var(--color-surface-alt, #F0EFEB)",
                borderLeft: "1px solid var(--color-border)",
              }}
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-ink-tertiary)" }}
              >
                Administrador tradicional
              </p>
            </div>
            <div
              className="px-6 py-5 text-center"
              style={{
                backgroundColor: "var(--color-ink)",
                borderLeft: "1px solid var(--color-border)",
              }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white">
                Dominium
              </p>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className="grid grid-cols-[1.4fr_1fr_1fr]"
              style={{
                borderTop: i === 0 ? "none" : "1px solid var(--color-border)",
              }}
            >
              <div className="px-6 py-4">
                <p
                  className="text-[14px] font-semibold"
                  style={{ color: "var(--color-ink)" }}
                >
                  {row.feature}
                </p>
              </div>
              <div
                className="px-6 py-4 flex items-start gap-2"
                style={{
                  backgroundColor: "var(--color-surface-alt, #F0EFEB)",
                  borderLeft: "1px solid var(--color-border)",
                }}
              >
                <X size={16} className="shrink-0 mt-0.5" style={{ color: "#C0392B" }} />
                <p
                  className="text-[13.5px] leading-snug"
                  style={{ color: "var(--color-ink-secondary)" }}
                >
                  {row.tradicional.text}
                </p>
              </div>
              <div
                className="px-6 py-4 flex items-start gap-2"
                style={{
                  backgroundColor: "rgba(46,125,80,0.04)",
                  borderLeft: "1px solid var(--color-border)",
                }}
              >
                <Check
                  size={16}
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--color-accent)" }}
                />
                <p
                  className="text-[13.5px] leading-snug font-medium"
                  style={{ color: "var(--color-ink)" }}
                >
                  {row.dominium.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stacked cards — Mobile */}
        <div className="md:hidden w-full flex flex-col gap-4">
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className="rounded-[14px] overflow-hidden"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`,
              }}
            >
              <div
                className="px-4 py-3"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <p
                  className="text-[14px] font-semibold"
                  style={{ color: "var(--color-ink)" }}
                >
                  {row.feature}
                </p>
              </div>
              <div className="grid grid-cols-2">
                <div
                  className="px-4 py-3 flex flex-col gap-1"
                  style={{ backgroundColor: "var(--color-surface-alt, #F0EFEB)" }}
                >
                  <div className="flex items-center gap-1">
                    <X size={12} style={{ color: "#C0392B" }} />
                    <p
                      className="text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: "var(--color-ink-tertiary)" }}
                    >
                      Tradicional
                    </p>
                  </div>
                  <p
                    className="text-[13px] leading-snug"
                    style={{ color: "var(--color-ink-secondary)" }}
                  >
                    {row.tradicional.text}
                  </p>
                </div>
                <div
                  className="px-4 py-3 flex flex-col gap-1"
                  style={{
                    backgroundColor: "rgba(46,125,80,0.05)",
                    borderLeft: "1px solid var(--color-border)",
                  }}
                >
                  <div className="flex items-center gap-1">
                    <Check size={12} style={{ color: "var(--color-accent)" }} />
                    <p
                      className="text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: "var(--color-accent)" }}
                    >
                      Dominium
                    </p>
                  </div>
                  <p
                    className="text-[13px] leading-snug font-medium"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {row.dominium.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA below */}
        <a
          href="#analizador"
          className="inline-flex items-center h-[52px] px-6 rounded-full text-[15px] font-semibold text-white transition-colors duration-150"
          style={{ backgroundColor: "var(--color-accent)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-accent-light)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-accent)")
          }
        >
          Auditar mi liquidación gratis →
        </a>
      </div>
    </section>
  );
}
