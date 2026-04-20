"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const benefits = [
  "18 meses de comisiones post-traspaso",
  "Rol de Asesor Externo para suavizar la transición",
  "Dominium maneja toda la burocracia del cambio",
];

export default function Administradores() {
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
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="administradores"
      className="py-[100px] md:py-[120px]"
      style={{ backgroundColor: "var(--color-accent)" }}
      aria-label="Para administradores que quieren retirarse"
    >
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div
            className="flex flex-col gap-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <p
              className="text-[12px] font-semibold tracking-[0.1em] uppercase"
              style={{ color: "#8ABF9A" }}
            >
              Para Administradores
            </p>
            <h2
              className="font-serif font-bold text-white text-balance leading-[1.15]"
              style={{ fontSize: "clamp(26px, 4vw, 40px)" }}
            >
              ¿Pensando en dejar
              <br />
              la administración?
            </h2>
            <p
              className="text-[17px] leading-relaxed max-w-[440px]"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Tenés una cartera de edificios construida durante años. Dominium
              te ofrece una transición digna: 18 meses de comisiones por el
              traspaso de tus consorcios, y la certeza de que tus clientes
              quedan en las mejores manos.
            </p>

            {/* Benefits */}
            <ul className="flex flex-col gap-3">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    color="#8ABF9A"
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[15px] text-white leading-snug">
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div>
              <Link
                href="/administradores"
                className="inline-flex items-center h-[50px] px-6 rounded-full text-[15px] font-semibold transition-colors duration-150"
                style={{
                  backgroundColor: "white",
                  color: "var(--color-accent)",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#F0FAF5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                }
              >
                Quiero saber más sobre el Plan de Retiro →
              </Link>
            </div>
          </div>

          {/* Right: retirement plan card */}
          <div
            className="flex justify-center lg:justify-end"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}
          >
            <div
              className="w-full max-w-sm rounded-[16px] p-8 flex flex-col gap-6"
              style={{
                backgroundColor: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
              aria-label="Plan de Retiro Dominium"
            >
              <p className="text-[16px] font-semibold text-white">
                Plan de Retiro Dominium
              </p>

              {/* Timeline steps */}
              <div className="flex flex-col gap-0">
                {[
                  { step: "01", text: "Cartera promedio de 20 edificios" },
                  { step: "02", text: "Comisiones durante 18 meses" },
                  {
                    step: "03",
                    text: "Ingreso garantizado mientras descansás",
                  },
                ].map((item, i, arr) => (
                  <div key={i} className="flex gap-4">
                    {/* Timeline column */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0"
                        style={{
                          backgroundColor:
                            i === arr.length - 1
                              ? "#8ABF9A"
                              : "rgba(255,255,255,0.12)",
                          color:
                            i === arr.length - 1
                              ? "var(--color-accent)"
                              : "rgba(255,255,255,0.7)",
                        }}
                        aria-hidden="true"
                      >
                        {item.step}
                      </div>
                      {i < arr.length - 1 && (
                        <div
                          className="w-px flex-1 my-1"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.15)",
                            minHeight: "24px",
                          }}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    {/* Text */}
                    <p
                      className="text-[14px] leading-snug pb-5"
                      style={{
                        color:
                          i === arr.length - 1
                            ? "#8ABF9A"
                            : "rgba(255,255,255,0.75)",
                        fontWeight: i === arr.length - 1 ? 600 : 400,
                        paddingBottom: i < arr.length - 1 ? "16px" : "0",
                      }}
                    >
                      {i === arr.length - 1 ? "= " : ""}
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
