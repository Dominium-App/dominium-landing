"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, FileX, PiggyBank, Receipt } from "lucide-react";

const hallazgos = [
  {
    Icon: TrendingUp,
    title: "Honorarios fuera del rango de mercado",
    body: "Comparamos los honorarios del administrador con valores de referencia para edificios similares en tu barrio. Si están por encima del rango razonable, te los marcamos como alerta con su contexto.",
  },
  {
    Icon: FileX,
    title: "Ítems sin descripción o sin contraparte",
    body: 'Rubros que aparecen como "gastos varios", "imprevistos" o sin desglose. Vero los identifica y los señala como ítems que tu administrador debería poder justificar partida por partida.',
  },
  {
    Icon: PiggyBank,
    title: "Fondo de reserva mal gestionado",
    body: "Cuotas que entran y no se rinden, movimientos sin documentar o acumulación insuficiente. Vero revisa si el fondo de reserva cumple su función o se usa como caja paralela.",
  },
  {
    Icon: Receipt,
    title: "Comisiones ocultas en proveedores",
    body: "El seguro del edificio, los contratos de ascensor y servicios contratados son los rubros donde más aparecen márgenes de broker no declarados. Comparamos con valores reales de mercado.",
  },
];

export default function LoQueDetectaVero() {
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
      id="que-detecta-vero"
      className="py-[100px] md:py-[120px]"
      style={{ backgroundColor: "var(--color-surface)" }}
      aria-label="Qué busca Vero en tu liquidación"
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
            La auditoría, en detalle
          </p>
          <h2
            className="font-serif font-bold text-balance leading-[1.15]"
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              color: "var(--color-ink)",
            }}
          >
            Qué busca Vero
            <br />
            en tu liquidación.
          </h2>
          <p
            className="text-[16px] leading-relaxed"
            style={{ color: "var(--color-ink-secondary)" }}
          >
            Estos son los patrones que detectamos al auditar liquidaciones de expensas
            en propiedad horizontal. Si están en tu liquidación, Vero te los marca.
          </p>
        </div>

        {/* Grid 2x2 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {hallazgos.map((h, i) => (
            <article
              key={h.title}
              className="rounded-[16px] p-6 md:p-7 flex flex-col gap-4 transition-all duration-200"
              style={{
                backgroundColor: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, transform 0.5s ease ${0.1 + i * 0.08}s, border-color 0.2s ease, box-shadow 0.2s ease`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--color-accent)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--color-border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--color-accent-glow)" }}
                  aria-hidden="true"
                >
                  <h.Icon size={20} style={{ color: "var(--color-accent)" }} />
                </div>
                <h3
                  className="text-[17px] md:text-[18px] font-semibold leading-snug"
                  style={{ color: "var(--color-ink)" }}
                >
                  {h.title}
                </h3>
              </div>
              <p
                className="text-[14.5px] leading-relaxed"
                style={{ color: "var(--color-ink-secondary)" }}
              >
                {h.body}
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div
          className="flex flex-col items-center gap-3"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.4s",
          }}
        >
          <a
            href="#analizador"
            className="inline-flex items-center h-[52px] px-6 rounded-full text-[15px] font-semibold text-white transition-colors duration-150"
            style={{ backgroundColor: "var(--color-accent)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-accent-light)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-accent)")
            }
          >
            Auditar mi liquidación →
          </a>
          <p
            className="text-[12.5px]"
            style={{ color: "var(--color-ink-tertiary)" }}
          >
            Análisis gratuito · Sin registro · Resultado en menos de 60 segundos
          </p>
        </div>
      </div>
    </section>
  );
}
