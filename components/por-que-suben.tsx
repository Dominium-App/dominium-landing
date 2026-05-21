"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, Search, Receipt, PiggyBank } from "lucide-react";

const razones = [
  {
    Icon: TrendingUp,
    title: "Inflación, pero solo en parte",
    body: "El IPC explica una porción del aumento, pero rara vez la totalidad. Cuando las expensas suben por encima de la inflación, hay rubros específicos detrás que vale la pena auditar.",
  },
  {
    Icon: Search,
    title: "Proveedores sin auditar",
    body: "Ascensor, limpieza, seguro, plomería. Contratos renovados automáticamente, cero cotizaciones alternativas, cero negociación.",
  },
  {
    Icon: Receipt,
    title: "Comisiones ocultas en facturación",
    body: "Brokers de seguros, gestoras de ABL, comisiones sobre proveedores. Rubros que llegan ya cargados antes de que veas la liquidación.",
  },
  {
    Icon: PiggyBank,
    title: "Fondo de reserva mal manejado",
    body: "Cuotas que entran y nunca se rinden. Sin trazabilidad de en qué se gastó, sin contraparte documental.",
  },
];

export default function PorQueSuben() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          o.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="por-que-suben"
      className="py-[100px] md:py-[120px]"
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-label="Por qué tus expensas suben"
    >
      <div className="mx-auto max-w-[1120px] px-6 flex flex-col gap-12">
        {/* Header */}
        <div
          className="text-center max-w-[720px] mx-auto flex flex-col gap-4"
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
            El motivo real
          </p>
          <h2
            className="font-serif font-bold text-balance leading-[1.15]"
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              color: "var(--color-ink)",
            }}
          >
            Por qué tus expensas<br />suben todos los meses<br />
            <span style={{ color: "var(--color-accent)" }}>(y no es solo inflación).</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {razones.map((r, i) => (
            <article
              key={r.title}
              className="rounded-[16px] p-6 md:p-8 flex flex-col gap-4 transition-all duration-200"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, transform 0.5s ease ${0.1 + i * 0.08}s, border-color 0.2s ease, box-shadow 0.2s ease`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--color-accent-glow)" }}
                  aria-hidden="true"
                >
                  <r.Icon size={20} style={{ color: "var(--color-accent)" }} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3
                    className="text-[18px] font-semibold leading-snug"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {r.title}
                  </h3>
                  <p
                    className="text-[14.5px] leading-relaxed"
                    style={{ color: "var(--color-ink-secondary)" }}
                  >
                    {r.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Inline CTA */}
        <div
          className="rounded-[16px] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 justify-between"
          style={{
            backgroundColor: "var(--color-ink)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s",
          }}
        >
          <div className="flex-1">
            <p className="text-[18px] md:text-[20px] font-semibold text-white leading-snug">
              ¿Querés saber cuál de estas razones está pasando en tu edificio?
            </p>
            <p
              className="text-[14px] mt-1"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Subí tu liquidación. Vero te lo muestra en 60 segundos.
            </p>
          </div>
          <a
            href="#analizador"
            className="inline-flex items-center h-[48px] px-6 rounded-full text-[15px] font-semibold transition-colors duration-150 shrink-0"
            style={{ backgroundColor: "var(--color-accent)", color: "white" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-accent-light)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-accent)")
            }
          >
            Auditar mi liquidación →
          </a>
        </div>
      </div>
    </section>
  );
}
