"use client";

import { Sparkles, MapPin, Lock, Timer } from "lucide-react";

const items = [
  {
    Icon: Sparkles,
    title: "Auditoría con IA",
    label: "Análisis partida por partida en cada liquidación",
  },
  {
    Icon: Timer,
    title: "60 segundos",
    label: "Tiempo promedio de análisis de una liquidación",
  },
  {
    Icon: MapPin,
    title: "CABA + AMBA",
    label: "Cobertura en propiedad horizontal del área metropolitana",
  },
  {
    Icon: Lock,
    title: "Sin registro",
    label: "Análisis gratuito sin tarjeta ni cuenta previa",
  },
];

export default function TrustBar() {
  return (
    <section
      className="py-8 md:py-10"
      style={{
        backgroundColor: "var(--color-surface-alt, #F0EFEB)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
      aria-label="Qué hace Dominium"
    >
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {items.map((i) => (
            <div key={i.title} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <i.Icon
                  size={14}
                  style={{ color: "var(--color-accent)" }}
                  aria-hidden="true"
                />
                <p
                  className="font-serif font-bold leading-none"
                  style={{
                    fontSize: "clamp(18px, 2.2vw, 24px)",
                    color: "var(--color-ink)",
                  }}
                >
                  {i.title}
                </p>
              </div>
              <p
                className="text-[12.5px] leading-snug"
                style={{ color: "var(--color-ink-secondary)" }}
              >
                {i.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
