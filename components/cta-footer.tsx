"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShieldCheck, MessageCircle, Mail } from "lucide-react";
import VeroMark from "@/components/home/vero-mark";

const WHATSAPP_URL =
  "https://wa.me/5491172936904?text=Hola%20Vero%2C%20quiero%20saber%20m%C3%A1s%20de%20Dominium%20para%20mi%20edificio";

const platformLinks = [
  { label: "Auditar expensas", href: "/auditar-expensas" },
  { label: "Cambiar administrador", href: "/cambiar-administrador" },
  { label: "Cobertura por barrio", href: "/administrador-consorcio" },
  { label: "Para administradores", href: "/administradores" },
  { label: "Blog", href: "/blog" },
  { label: "Nosotros", href: "/nosotros" },
];

const legalLinks = [
  { label: "Términos y condiciones", href: "/terminos" },
  { label: "Política de privacidad", href: "/privacidad" },
];

const footerLinkClass =
  "text-[14px] text-on-forest-dim transition-colors duration-150 hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-forest";

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
        className="bg-forest-deep py-24 md:py-32"
        aria-label="Contacto y llamado a la acción"
      >
        <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-8 px-6">
          <div
            className="flex max-w-[600px] flex-col items-center gap-6 text-center transition-[opacity,transform] duration-500 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <h2 className="font-serif text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-[-0.01em] text-on-forest text-balance">
              Tu edificio merece
              <br />
              una administración distinta.
            </h2>
            <p className="text-[17px] leading-relaxed text-on-forest-dim">
              El primer paso no cuesta nada: auditá tu última liquidación, o
              escribile a Vero y contale de tu edificio.
            </p>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/#analizador"
                className="inline-flex h-[56px] w-full items-center justify-center rounded-full bg-on-forest px-8 text-[16px] font-semibold text-forest-deep transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-forest sm:w-auto"
              >
                Auditar mis expensas gratis
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[56px] w-full items-center justify-center rounded-full border border-on-forest-faint px-8 text-[16px] font-semibold text-on-forest transition-colors duration-150 hover:border-on-forest-dim hover:bg-forest-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-forest sm:w-auto"
              >
                Hablar con Vero por WhatsApp
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-2 flex flex-col items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                <VeroMark size={14} />
                <span className="text-[13px] text-on-forest-dim">
                  Vero responde 24/7 por WhatsApp
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-on-forest-dim" aria-hidden="true" />
                <span className="text-[13px] text-on-forest-dim">
                  Infraestructura bancaria regulada por BCRA (vía Cresium)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-on-forest-faint bg-forest-deep" aria-label="Pie de página Dominium">
        <div className="mx-auto max-w-[1120px] px-6 py-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Col 1: Brand */}
            <div className="flex flex-col gap-4">
              <p className="font-serif text-[22px] font-bold text-white">
                Dominium
              </p>
              <p className="text-[14px] leading-relaxed text-on-forest-dim">
                La administración que siempre debió existir.
              </p>
              <p className="text-[13px] text-on-forest-dim">© 2026 Dominium SAS</p>
            </div>

            {/* Col 2: Links */}
            <nav aria-label="Navegación footer">
              <p className="mb-4 text-[12px] font-semibold uppercase tracking-widest text-on-forest-dim">
                Plataforma
              </p>
              <ul className="flex flex-col gap-2.5">
                {platformLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={footerLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Col 3: Legal */}
            <nav aria-label="Información legal">
              <p className="mb-4 text-[12px] font-semibold uppercase tracking-widest text-on-forest-dim">
                Legal
              </p>
              <ul className="flex flex-col gap-2.5">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={footerLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Col 4: Contact */}
            <div className="flex flex-col gap-4">
              <p className="text-[12px] font-semibold uppercase tracking-widest text-on-forest-dim">
                Contacto
              </p>
              <div className="flex items-center gap-2 rounded-lg border border-on-forest-faint bg-white/5 px-4 py-3">
                <VeroMark size={16} />
                <p className="text-[13px] text-on-forest-dim">
                  Vero responde 24/7
                </p>
              </div>
              <a
                href="https://wa.me/5491172936904"
                className={`flex items-center gap-2 ${footerLinkClass}`}
                aria-label="Contactar por WhatsApp"
              >
                <MessageCircle size={15} aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href="mailto:hola@dominium.com.ar"
                className={`flex items-center gap-2 ${footerLinkClass}`}
                aria-label="Enviar email a Dominium"
              >
                <Mail size={15} aria-hidden="true" />
                hola@dominium.com.ar
              </a>
              <a
                href="https://instagram.com/dominium.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 ${footerLinkClass}`}
                aria-label="Seguir a Dominium en Instagram"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                @dominium.com.ar
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-on-forest-faint">
          <div className="mx-auto flex max-w-[1120px] justify-center px-6 py-4">
            <p className="text-center text-[12px] text-on-forest-dim">
              Dominium SAS · CABA, Argentina
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
