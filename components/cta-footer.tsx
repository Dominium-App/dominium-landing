"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Lock, ClipboardList, Bot, MessageCircle, Mail } from "lucide-react";

const trustItems = [
  { Icon: Lock, text: "Fondos protegidos por regulación BCRA" },
  { Icon: ClipboardList, text: "Administradora registrada GCBA" },
  { Icon: Bot, text: "IA desarrollada con Claude API" },
];

export default function CtaFooter() {
  const ctaRef = useRef<HTMLElement>(null);
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
    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Final CTA */}
      <section
        ref={ctaRef}
        id="contacto"
        className="py-[100px] md:py-[120px]"
        style={{ backgroundColor: "var(--color-bg)" }}
        aria-label="Contacto y llamado a la acción"
      >
        <div className="mx-auto max-w-[1120px] px-6 flex flex-col items-center gap-8">
          <div
            className="flex flex-col items-center gap-6 text-center max-w-[600px]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <h2
              className="font-serif font-bold text-balance leading-[1.15]"
              style={{
                fontSize: "clamp(26px, 4vw, 44px)",
                color: "var(--color-ink)",
              }}
            >
              Tu edificio merece
              <br />
              una administración distinta.
            </h2>
            <p
              className="text-[17px] leading-relaxed"
              style={{ color: "var(--color-ink-secondary)" }}
            >
              Miles de propietarios pagan de más todos los meses sin saberlo. El
              primer paso es entender qué estás pagando.
            </p>

            <Link
              href="/#analizador"
              className="w-full sm:w-auto inline-flex items-center justify-center h-[56px] px-8 rounded-full text-[16px] font-semibold text-white transition-colors duration-150"
              style={{ backgroundColor: "var(--color-accent)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-accent-light)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-accent)")
              }
            >
              Analizar mis expensas ahora — es gratis →
            </Link>

            {/* Trust row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-2">
              {trustItems.map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Icon
                    size={14}
                    color="var(--color-ink-tertiary)"
                    aria-hidden="true"
                  />
                  <span
                    className="text-[13px]"
                    style={{ color: "var(--color-ink-tertiary)" }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{ backgroundColor: "var(--color-ink)" }}
        aria-label="Pie de página Dominium"
      >
        <div className="mx-auto max-w-[1120px] px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Col 1: Brand */}
            <div className="flex flex-col gap-4">
              <p className="font-serif font-bold text-[22px] text-white">
                Dominium
              </p>
              <p
                className="text-[14px] leading-relaxed"
                style={{ color: "#9B9A96" }}
              >
                La administración que siempre debió existir.
              </p>
              <p className="text-[13px]" style={{ color: "#5C5B57" }}>
                © 2026 Dominium SAS
              </p>
            </div>

            {/* Col 2: Links */}
            <nav aria-label="Navegación footer">
              <p
                className="text-[12px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#5C5B57" }}
              >
                Plataforma
              </p>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Para propietarios",
                  "Para administradores",
                  "Cómo funciona",
                  "Preguntas frecuentes",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[14px] transition-colors duration-150"
                      style={{ color: "#9B9A96" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "white")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#9B9A96")
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Col 3: Legal */}
            <nav aria-label="Información legal">
              <p
                className="text-[12px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#5C5B57" }}
              >
                Legal
              </p>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Inscripción GCBA",
                  "Términos y condiciones",
                  "Política de privacidad",
                  "Regulación BCRA",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[14px] transition-colors duration-150"
                      style={{ color: "#9B9A96" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "white")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#9B9A96")
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Col 4: Contact */}
            <div className="flex flex-col gap-4">
              <p
                className="text-[12px] font-semibold uppercase tracking-widest"
                style={{ color: "#5C5B57" }}
              >
                Contacto
              </p>
              <div
                className="rounded-lg px-4 py-3 flex items-center gap-2"
                style={{
                  backgroundColor: "#1A1A18",
                  border: "1px solid #2A2A28",
                }}
              >
                <Bot size={16} color="var(--color-vero)" aria-hidden="true" />
                <p className="text-[13px]" style={{ color: "#9B9A96" }}>
                  Vero responde 24/7
                </p>
              </div>
              <a
                href="https://wa.me/5491136520670"
                className="flex items-center gap-2 text-[14px] transition-colors duration-150"
                style={{ color: "#9B9A96" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9B9A96")}
                aria-label="Contactar por WhatsApp"
              >
                <MessageCircle size={15} aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href="mailto:hola@dominium.com.ar"
                className="flex items-center gap-2 text-[14px] transition-colors duration-150"
                style={{ color: "#9B9A96" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9B9A96")}
                aria-label="Enviar email a Dominium"
              >
                <Mail size={15} aria-hidden="true" />
                hola@dominium.com.ar
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t" style={{ borderColor: "#2A2A28" }}>
          <div className="mx-auto max-w-[1120px] px-6 py-4 flex justify-center">
            <p className="text-[12px] text-center" style={{ color: "#5C5B57" }}>
              Dominium SAS · Administradora de Consorcios registrada · CABA,
              Argentina
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
