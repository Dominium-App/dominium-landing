"use client";

import { useEffect, useRef, useState } from "react";
import { Lock, MessageCircle, Mail, Bot } from "lucide-react";

export default function AdmContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!formData.name.trim() || !formData.contact.trim()) {
      setError("Completá tu nombre y un medio de contacto.");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/notify-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
    } catch {
      setError(
        "No pudimos enviar tu consulta. Probá de nuevo en unos minutos o escribinos a hola@dominium.com.ar.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "48px",
    padding: "0 16px",
    borderRadius: "10px",
    border: "1px solid var(--color-border)",
    backgroundColor: "var(--color-surface)",
    color: "var(--color-ink)",
    fontSize: "15px",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.15s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 500,
    color: "var(--color-ink-secondary)",
    marginBottom: "6px",
  };

  return (
    <>
      {/* Contact section */}
      <section
        ref={sectionRef}
        id="contacto"
        className="py-[100px] md:py-[120px]"
        style={{ backgroundColor: "var(--color-surface-alt)" }}
        aria-label="Formulario de contacto"
      >
        <div className="mx-auto max-w-[1120px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: copy */}
            <div
              className="flex flex-col gap-6"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <h2
                className="font-serif font-bold text-balance leading-[1.15]"
                style={{
                  fontSize: "clamp(26px, 3.5vw, 40px)",
                  color: "var(--color-ink)",
                }}
              >
                ¿Querés explorar la posibilidad?
              </h2>
              <p
                className="text-[17px] leading-relaxed"
                style={{ color: "var(--color-ink-secondary)" }}
              >
                Sin compromiso. Sin presión. Solo una conversación.
              </p>

              {/* Trust items */}
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "var(--color-accent-glow)" }}
                    aria-hidden="true"
                  >
                    <Lock size={14} color="var(--color-accent)" />
                  </div>
                  <span
                    className="text-[14px]"
                    style={{ color: "var(--color-ink-secondary)" }}
                  >
                    Tu consulta es estrictamente confidencial
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "var(--color-accent-glow)" }}
                    aria-hidden="true"
                  >
                    <MessageCircle size={14} color="var(--color-accent)" />
                  </div>
                  <span
                    className="text-[14px]"
                    style={{ color: "var(--color-ink-secondary)" }}
                  >
                    Respondemos en menos de 24 horas
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "var(--color-accent-glow)" }}
                    aria-hidden="true"
                  >
                    <Lock size={14} color="var(--color-accent)" />
                  </div>
                  <span
                    className="text-[14px]"
                    style={{ color: "var(--color-ink-secondary)" }}
                  >
                    Sin compromiso de ningún tipo
                  </span>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition:
                  "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
              }}
            >
              {submitted ? (
                <div
                  className="rounded-[16px] p-10 flex flex-col items-center gap-4 text-center"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-accent-glow)" }}
                    aria-hidden="true"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12l5 5L19 7"
                        stroke="var(--color-accent)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    className="font-semibold text-[18px]"
                    style={{ color: "var(--color-ink)" }}
                  >
                    Recibimos tu consulta.
                  </p>
                  <p
                    className="text-[15px]"
                    style={{ color: "var(--color-ink-secondary)" }}
                  >
                    Nos pondremos en contacto con vos en menos de 24 horas. Tu
                    consulta es confidencial.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-[16px] p-8 flex flex-col gap-5"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                  noValidate
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="adm-name" style={labelStyle}>
                      Nombre completo
                    </label>
                    <input
                      id="adm-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor =
                          "var(--color-accent)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor =
                          "var(--color-border)")
                      }
                    />
                  </div>

                  {/* Phone / Email */}
                  <div>
                    <label htmlFor="adm-contact" style={labelStyle}>
                      Teléfono o email
                    </label>
                    <input
                      id="adm-contact"
                      type="text"
                      required
                      autoComplete="email tel"
                      placeholder="Para que podamos contactarte"
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor =
                          "var(--color-accent)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor =
                          "var(--color-border)")
                      }
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="adm-message" style={labelStyle}>
                      Contanos brevemente tu situación
                    </label>
                    <textarea
                      id="adm-message"
                      rows={4}
                      placeholder="¿Cuántos edificios manejás? ¿En qué plazos estás pensando? Cualquier detalle que quieras compartir..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      style={{
                        ...inputStyle,
                        height: "auto",
                        padding: "12px 16px",
                        resize: "vertical",
                        lineHeight: "1.6",
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor =
                          "var(--color-accent)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor =
                          "var(--color-border)")
                      }
                    />
                  </div>

                  {error && (
                    <p
                      className="text-[13px] px-3 py-2 rounded-lg"
                      style={{
                        color: "var(--color-destructive)",
                        backgroundColor: "#FEF2F2",
                        border: "1px solid #FCA5A5",
                      }}
                      role="alert"
                    >
                      {error}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-[52px] rounded-full text-[15px] font-semibold text-white transition-colors duration-150"
                    style={{
                      backgroundColor: "var(--color-accent)",
                      cursor: submitting ? "not-allowed" : "pointer",
                      opacity: submitting ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!submitting)
                        e.currentTarget.style.backgroundColor =
                          "var(--color-accent-light)";
                    }}
                    onMouseLeave={(e) => {
                      if (!submitting)
                        e.currentTarget.style.backgroundColor =
                          "var(--color-accent)";
                    }}
                  >
                    {submitting ? "Enviando..." : "Quiero que me contacten →"}
                  </button>

                  <p
                    className="text-center text-[12px]"
                    style={{ color: "var(--color-ink-tertiary)" }}
                  >
                    Respondemos en menos de 24 horas. Tu consulta es
                    confidencial.
                  </p>
                </form>
              )}
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
                © 2025 Dominium SAS
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
                  { label: "Para propietarios", href: "/" },
                  { label: "Para administradores", href: "/administradores" },
                  { label: "Cómo funciona", href: "/#como-funciona" },
                  { label: "Preguntas frecuentes", href: "#" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] transition-colors duration-150"
                      style={{ color: "#9B9A96" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "white")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#9B9A96")
                      }
                    >
                      {link.label}
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
                href="https://wa.me/5491100000000"
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
