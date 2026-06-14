"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { ZONAS_COBERTURA } from "@/lib/barrios";

const TRADES = [
  "Plomería",
  "Electricidad",
  "Gas",
  "Cerrajería",
  "Climatización",
  "Albañilería",
  "Pintura",
  "Carpintería",
  "Electrodomésticos",
  "Control de plagas",
  "Limpieza",
  "General",
] as const;

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

function focusBorder(e: React.FocusEvent<HTMLInputElement>) {
  e.currentTarget.style.borderColor = "var(--color-accent)";
}
function blurBorder(e: React.FocusEvent<HTMLInputElement>) {
  e.currentTarget.style.borderColor = "var(--color-border)";
}

export default function ProviderForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dniCuit, setDniCuit] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [hasInsurance, setHasInsurance] = useState(false);
  const [trades, setTrades] = useState<string[]>([]);
  const [zones, setZones] = useState<string[]>([]);
  const [zoneInput, setZoneInput] = useState("");
  const [zoneFocused, setZoneFocused] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleTrade(trade: string) {
    setTrades((prev) =>
      prev.includes(trade) ? prev.filter((t) => t !== trade) : [...prev, trade],
    );
  }

  function addZone(raw?: string) {
    const value = (raw ?? zoneInput).trim();
    if (!value) return;
    if (!zones.some((z) => z.toLowerCase() === value.toLowerCase())) {
      setZones((prev) => [...prev, value]);
    }
    setZoneInput("");
  }

  const zoneSuggestions = zoneFocused
    ? ZONAS_COBERTURA.filter(
        (z) =>
          z.toLowerCase().includes(zoneInput.trim().toLowerCase()) &&
          !zones.some((sel) => sel.toLowerCase() === z.toLowerCase()),
      ).slice(0, 6)
    : [];

  function removeZone(zone: string) {
    setZones((prev) => prev.filter((z) => z !== zone));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    if (!fullName.trim() || !email.trim() || !phone.trim() || !dniCuit.trim()) {
      setError("Completá nombre, email, teléfono y DNI/CUIT.");
      return;
    }
    if (trades.length === 0) {
      setError("Elegí al menos un oficio.");
      return;
    }
    if (zones.length === 0) {
      setError("Agregá al menos una zona de cobertura.");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/notify-provider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          dniCuit: dniCuit.trim(),
          trades,
          coverageZones: zones,
          licenseNumber: licenseNumber.trim() || undefined,
          hasInsurance,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
    } catch {
      setError(
        "No pudimos enviar tu postulación. Probá de nuevo en unos minutos o escribinos a hola@dominium.com.ar.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="rounded-[16px] p-10 flex flex-col items-center gap-4 text-center"
        style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "var(--color-accent-glow)" }}
          aria-hidden="true"
        >
          <Check size={24} color="var(--color-accent)" />
        </div>
        <p className="font-semibold text-[18px]" style={{ color: "var(--color-ink)" }}>
          Recibimos tu postulación.
        </p>
        <p className="text-[15px]" style={{ color: "var(--color-ink-secondary)" }}>
          Nuestro equipo la va a revisar y te contactaremos por email o teléfono. ¡Gracias por
          querer sumarte a la red de Dominium!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[16px] p-8 flex flex-col gap-5"
      style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      noValidate
    >
      <div>
        <label htmlFor="pf-name" style={labelStyle}>
          Nombre completo
        </label>
        <input
          id="pf-name"
          type="text"
          required
          autoComplete="name"
          placeholder="Tu nombre"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={inputStyle}
          onFocus={focusBorder}
          onBlur={blurBorder}
        />
      </div>

      <div>
        <label htmlFor="pf-email" style={labelStyle}>
          Email
        </label>
        <input
          id="pf-email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          onFocus={focusBorder}
          onBlur={blurBorder}
        />
      </div>

      <div>
        <label htmlFor="pf-phone" style={labelStyle}>
          Teléfono
        </label>
        <input
          id="pf-phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="Para coordinar trabajos"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
          onFocus={focusBorder}
          onBlur={blurBorder}
        />
      </div>

      <div>
        <label htmlFor="pf-dni" style={labelStyle}>
          DNI o CUIT
        </label>
        <input
          id="pf-dni"
          type="text"
          required
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Solo números"
          value={dniCuit}
          onChange={(e) => setDniCuit(e.target.value.replace(/[^0-9]/g, ""))}
          style={inputStyle}
          onFocus={focusBorder}
          onBlur={blurBorder}
        />
      </div>

      <div>
        <span style={labelStyle}>Oficios</span>
        <div className="flex flex-wrap gap-2">
          {TRADES.map((trade) => {
            const active = trades.includes(trade);
            return (
              <button
                key={trade}
                type="button"
                onClick={() => toggleTrade(trade)}
                className="text-[13px] font-medium transition-colors duration-150"
                style={{
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: `1px solid ${active ? "var(--color-accent)" : "var(--color-border)"}`,
                  backgroundColor: active ? "var(--color-accent)" : "var(--color-surface)",
                  color: active ? "#fff" : "var(--color-ink-secondary)",
                  cursor: "pointer",
                }}
              >
                {trade}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="pf-zone" style={labelStyle}>
          Zonas de cobertura
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              id="pf-zone"
              type="text"
              autoComplete="off"
              placeholder="Buscá un barrio o zona..."
              value={zoneInput}
              onChange={(e) => setZoneInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addZone(zoneSuggestions[0] ?? zoneInput);
                }
              }}
              style={inputStyle}
              onFocus={(e) => {
                focusBorder(e);
                setZoneFocused(true);
              }}
              onBlur={(e) => {
                blurBorder(e);
                window.setTimeout(() => setZoneFocused(false), 120);
              }}
            />
            {zoneSuggestions.length > 0 && (
              <ul
                className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 max-h-[220px] overflow-auto rounded-[10px] py-1"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              >
                {zoneSuggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        addZone(s);
                      }}
                      className="block w-full text-left text-[14px] transition-colors duration-100"
                      style={{ padding: "9px 14px", color: "var(--color-ink)", cursor: "pointer" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "var(--color-surface-alt)")
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="button"
            onClick={() => addZone()}
            className="shrink-0 text-[15px] font-semibold text-white"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              backgroundColor: "var(--color-accent)",
              cursor: "pointer",
            }}
            aria-label="Agregar zona"
          >
            +
          </button>
        </div>
        {zones.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {zones.map((zone) => (
              <button
                key={zone}
                type="button"
                onClick={() => removeZone(zone)}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white"
                style={{
                  padding: "6px 12px",
                  borderRadius: "999px",
                  backgroundColor: "var(--color-accent)",
                  cursor: "pointer",
                }}
              >
                {zone}
                <X size={13} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="pf-license" style={labelStyle}>
          N° de matrícula (opcional)
        </label>
        <input
          id="pf-license"
          type="text"
          placeholder="Si tenés matrícula habilitante"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          style={inputStyle}
          onFocus={focusBorder}
          onBlur={blurBorder}
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={hasInsurance}
          onChange={(e) => setHasInsurance(e.target.checked)}
          style={{ width: "18px", height: "18px", accentColor: "var(--color-accent)" }}
        />
        <span className="text-[14px]" style={{ color: "var(--color-ink-secondary)" }}>
          Tengo seguro de responsabilidad civil
        </span>
      </label>

      {error && (
        <p
          className="text-[13px] px-3 py-2 rounded-lg"
          style={{ color: "var(--color-destructive)", backgroundColor: "#FEF2F2", border: "1px solid #FCA5A5" }}
          role="alert"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full h-[52px] rounded-full text-[15px] font-semibold text-white transition-colors duration-150"
        style={{
          backgroundColor: "var(--color-accent)",
          cursor: submitting ? "not-allowed" : "pointer",
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? "Enviando..." : "Enviar postulación →"}
      </button>
    </form>
  );
}
