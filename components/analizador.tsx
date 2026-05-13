"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Upload,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MessageSquare,
  RotateCcw,
  Lock,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================

interface LeadData {
  nombre: string;
  localidad: string;
  whatsapp: string;
}

type Estado = "normal" | "elevado" | "alerta";

interface Rubro {
  nombre: string;
  monto: number;
  estado: Estado;
  comentario: string;
}

interface AnalysisResult {
  es_liquidacion_valida: boolean;
  mensaje_error: string | null;
  edificio_detectado: string | null;
  periodo: string | null;
  total_expensas: number | null;
  unidad: string | null;
  rubros: Rubro[];
  items_sin_detalle: string[];
  conclusion: {
    resumen: string;
    ahorro_estimado: string;
    principal_problema: string;
  };
}

// 1: upload (auto-analiza al subir) · 2: loading · 3: gate (lead capture) · 4: results
type Step = 1 | 2 | 3 | 4;

// ============================================================
// HELPERS
// ============================================================

function VeroMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-label="Vero"
    >
      <circle cx="16" cy="16" r="15" stroke="#3B7DD8" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="6" fill="#3B7DD8" />
      <line x1="16" y1="1" x2="16" y2="7" stroke="#3B7DD8" strokeWidth="1.5" />
      <line
        x1="16"
        y1="25"
        x2="16"
        y2="31"
        stroke="#3B7DD8"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const LOADING_MESSAGES = [
  "Leyendo tu liquidación...",
  "Identificando los rubros...",
  "Comparando con promedios del mercado...",
  "Preparando tu informe...",
];

const ESTADO_CONFIG: Record<
  Estado,
  {
    bg: string;
    border: string;
    text: string;
    label: string;
    Icon: typeof CheckCircle2;
  }
> = {
  normal: {
    bg: "#F0FAF5",
    border: "#B6E8CC",
    text: "#1A7A4A",
    label: "Normal",
    Icon: CheckCircle2,
  },
  elevado: {
    bg: "#FFFBEB",
    border: "#FCD34D",
    text: "#B45309",
    label: "Elevado",
    Icon: AlertTriangle,
  },
  alerta: {
    bg: "#FEF2F2",
    border: "#FCA5A5",
    text: "#C0392B",
    label: "Alerta",
    Icon: XCircle,
  },
};

function formatMonto(n: number): string {
  return "$" + n.toLocaleString("es-AR");
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function callAnthropic(file: File): Promise<AnalysisResult> {
  const base64 = await fileToBase64(file);
  const mediaType = file.type;

  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base64, mediaType }),
  });

  if (!res.ok) {
    let errMsg = `API error ${res.status}`;
    try {
      const errBody = await res.json();
      if (errBody?.error) errMsg = errBody.error;
    } catch {
      try {
        errMsg = await res.text();
      } catch {
        // Ignorar — usar mensaje por defecto
      }
    }
    throw new Error(errMsg);
  }

  const data = await res.json();
  const text = data.content?.[0]?.text ?? "";

  return JSON.parse(text) as AnalysisResult;
}

function TrustItem({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[13px]"
      style={{ color: "var(--color-ink-secondary)" }}
    >
      <CheckCircle2 size={14} color="#1A7A4A" aria-hidden="true" />
      {label}
    </span>
  );
}

// ============================================================
// STEP 1 — Upload (auto-analiza al subir un archivo válido)
// ============================================================

interface Step1Props {
  onNext: (file: File) => void;
}

function Step1Upload({ onNext }: Step1Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const MAX_SIZE_MB = 10;
  const ACCEPTED = [".pdf", ".jpg", ".jpeg", ".png", ".webp"];
  const ACCEPTED_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  function validateAndSubmit(f: File) {
    setError(null);
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError("Ese formato no está soportado. Subí un PDF, JPG o PNG.");
      return;
    }
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      setError("El archivo es muy grande. Intentá con uno de menos de 10MB.");
      return;
    }
    onNext(f);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }
  function handleDragLeave() {
    setIsDragging(false);
  }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) validateAndSubmit(f);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) validateAndSubmit(f);
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p
          className="text-[18px] font-semibold"
          style={{ color: "var(--color-ink)" }}
        >
          Subí tu última liquidación de expensas
        </p>
        <p
          className="text-[14px] mt-1"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          Foto, PDF o captura de pantalla — lo que tengas
        </p>
      </div>

      {/* Trust signals */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <TrustItem label="100% gratis" />
        <TrustItem label="Sin registro" />
        <TrustItem label="Resultado en 60 segundos" />
      </div>

      {/* Dropzone — click anywhere abre el picker; al elegir archivo arranca el análisis */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileRef.current?.click();
          }
        }}
        className="relative flex flex-col items-center gap-4 rounded-[16px] py-10 px-6 text-center transition-all duration-200 cursor-pointer"
        style={{
          border: isDragging
            ? "2px solid #3B7DD8"
            : "2px dashed var(--color-border)",
          backgroundColor: isDragging ? "var(--color-vero-light)" : "#FAFAF8",
        }}
        aria-label="Zona de carga de liquidación"
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: isDragging
              ? "var(--color-vero-light)"
              : "var(--color-surface-alt)",
          }}
          aria-hidden="true"
        >
          <Upload
            size={24}
            color={
              isDragging ? "var(--color-vero)" : "var(--color-ink-secondary)"
            }
          />
        </div>
        <div>
          <p
            className="text-[16px] font-semibold"
            style={{
              color: isDragging ? "var(--color-vero)" : "var(--color-ink)",
            }}
          >
            Arrastrá o tocá para analizar
          </p>
          <p
            className="text-[13px] mt-1"
            style={{ color: "var(--color-ink-tertiary)" }}
          >
            {ACCEPTED.join(", ")} · Máximo {MAX_SIZE_MB}MB
          </p>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept={ACCEPTED.join(",")}
          className="sr-only"
          onChange={handleChange}
          aria-label="Seleccionar archivo de liquidación"
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
    </div>
  );
}

// ============================================================
// STEP 2 — Loading
// ============================================================

function Step2Loading() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: "var(--color-vero-light)",
          animation: "vero-pulse 1.4s ease-in-out infinite",
        }}
        aria-hidden="true"
      >
        <VeroMark size={36} />
      </div>

      <div className="text-center">
        <p
          className="text-[17px] font-semibold"
          style={{ color: "var(--color-ink)" }}
        >
          Vero está analizando tu liquidación...
        </p>
        <p
          className="text-[14px] mt-2 min-h-[22px] transition-opacity duration-300"
          style={{ color: "var(--color-ink-tertiary)" }}
          aria-live="polite"
        >
          {LOADING_MESSAGES[msgIndex]}
        </p>
      </div>

      <div
        className="w-full max-w-xs overflow-hidden rounded-full"
        style={{ height: "3px", backgroundColor: "var(--color-border)" }}
        role="progressbar"
        aria-label="Analizando"
      >
        <div
          className="h-full rounded-full"
          style={{
            width: "40%",
            backgroundColor: "var(--color-vero)",
            animation: "indeterminate-bar 1.5s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes indeterminate-bar {
          0%   { transform: translateX(-250%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// STEP 3 — Gate (lead capture entre análisis y resultados)
// ============================================================

interface Step3GateProps {
  result: AnalysisResult;
  onUnlock: (lead: LeadData) => Promise<void>;
}

function Step3Gate({ result, onUnlock }: Step3GateProps) {
  const [nombre, setNombre] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const alertasCount = result.rubros.filter((r) => r.estado === "alerta").length;
  const elevadosCount = result.rubros.filter((r) => r.estado === "elevado").length;
  const teaserRubros = result.rubros.slice(0, 3);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (!nombre.trim() || !localidad.trim() || !whatsapp.trim()) return;

    setSubmitting(true);
    setError(null);
    try {
      await onUnlock({
        nombre: nombre.trim(),
        localidad: localidad.trim(),
        whatsapp: whatsapp.trim(),
      });
    } catch {
      setError(
        "No pudimos enviar tu informe. Probá de nuevo en unos segundos.",
      );
      setSubmitting(false);
    }
  }

  const canSubmit =
    nombre.trim() !== "" &&
    localidad.trim() !== "" &&
    whatsapp.trim() !== "" &&
    !submitting;

  const inputClass =
    "w-full h-[44px] px-3 rounded-lg text-[14px] outline-none transition-all duration-150";
  const inputStyle = {
    border: "1.5px solid var(--color-border)",
    backgroundColor: "white",
    color: "var(--color-ink)",
  };
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "var(--color-accent)";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "var(--color-border)";
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Success indicator */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#F0FAF5", border: "1.5px solid #B6E8CC" }}
          aria-hidden="true"
        >
          <CheckCircle2 size={26} color="#1A7A4A" />
        </div>
        <p
          className="text-[18px] font-semibold"
          style={{ color: "var(--color-ink)" }}
        >
          Tu informe está listo
        </p>
        <p
          className="text-[13px]"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          Detectamos {alertasCount + elevadosCount > 0
            ? `${alertasCount + elevadosCount} rubros que requieren tu atención`
            : "todo dentro de los promedios del mercado"}
          .
        </p>
      </div>

      {/* Teaser stats */}
      <div className="grid grid-cols-3 gap-2">
        <TeaserStat
          label="Total expensas"
          value={
            result.total_expensas !== null
              ? formatMonto(result.total_expensas)
              : "—"
          }
        />
        <TeaserStat
          label="Con alerta"
          value={alertasCount.toString()}
          highlight={alertasCount > 0}
        />
        <TeaserStat
          label="Ahorro estimado"
          value={result.conclusion.ahorro_estimado}
          prominent
        />
      </div>

      {/* Blurred preview */}
      <div className="relative rounded-xl overflow-hidden">
        <div
          className="flex flex-col gap-2 p-3"
          style={{
            filter: "blur(5px)",
            pointerEvents: "none",
            userSelect: "none",
            border: "1px solid var(--color-border)",
            borderRadius: "12px",
            backgroundColor: "#FAFAF8",
          }}
          aria-hidden="true"
        >
          {teaserRubros.map((rubro, i) => (
            <div key={i} className="flex justify-between text-[13px]">
              <span style={{ color: "var(--color-ink)" }}>{rubro.nombre}</span>
              <span
                className="font-semibold"
                style={{ color: "var(--color-ink)" }}
              >
                {formatMonto(rubro.monto)}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold"
            style={{
              backgroundColor: "white",
              border: "1px solid var(--color-border)",
              color: "var(--color-ink-secondary)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            <Lock size={12} />
            Desbloqueá el desglose completo
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={inputClass}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={submitting}
          />
          <input
            type="text"
            required
            placeholder="Localidad (ej: Palermo)"
            value={localidad}
            onChange={(e) => setLocalidad(e.target.value)}
            className={inputClass}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={submitting}
          />
        </div>
        <input
          type="tel"
          required
          placeholder="WhatsApp (ej: 11 5555-1234)"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className={inputClass}
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={submitting}
        />

        {error && (
          <p
            className="text-[12px] px-3 py-2 rounded-lg"
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

        <button
          type="submit"
          disabled={!canSubmit}
          className="h-[52px] rounded-full text-[15px] font-semibold text-white transition-all duration-150 mt-1"
          style={{
            backgroundColor: canSubmit
              ? "var(--color-accent)"
              : "var(--color-border)",
            cursor: canSubmit ? "pointer" : "not-allowed",
          }}
          onMouseEnter={(e) => {
            if (canSubmit)
              e.currentTarget.style.backgroundColor =
                "var(--color-accent-light)";
          }}
          onMouseLeave={(e) => {
            if (canSubmit)
              e.currentTarget.style.backgroundColor = "var(--color-accent)";
          }}
        >
          {submitting ? "Preparando tu informe..." : "Ver mi informe completo →"}
        </button>

        <p
          className="text-[11px] text-center"
          style={{ color: "var(--color-ink-tertiary)" }}
        >
          Tu información es confidencial. No hacemos spam.
        </p>
      </form>
    </div>
  );
}

interface TeaserStatProps {
  label: string;
  value: string;
  highlight?: boolean;
  prominent?: boolean;
}

function TeaserStat({ label, value, highlight, prominent }: TeaserStatProps) {
  return (
    <div
      className="flex flex-col gap-1 p-3 rounded-xl"
      style={{
        backgroundColor: prominent
          ? "var(--color-vero-light)"
          : "var(--color-surface-alt)",
        border: `1px solid ${prominent ? "var(--color-vero)" : "var(--color-border)"}`,
      }}
    >
      <p
        className="text-[10px] font-semibold uppercase tracking-wide"
        style={{ color: "var(--color-ink-tertiary)" }}
      >
        {label}
      </p>
      <p
        className="font-serif font-bold leading-tight"
        style={{
          fontSize: "clamp(15px, 3vw, 20px)",
          color: prominent
            ? "var(--color-accent)"
            : highlight
              ? "#C0392B"
              : "var(--color-ink)",
        }}
      >
        {value}
      </p>
    </div>
  );
}

// ============================================================
// STEP 4 — Results
// ============================================================

interface Step4Props {
  result: AnalysisResult;
  onRetry: () => void;
}

function Step4Results({ result, onRetry }: Step4Props) {
  const [rowsVisible, setRowsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRowsVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const alertas = result.rubros.filter((r) => r.estado === "alerta");
  const elevados = result.rubros.filter((r) => r.estado === "elevado");
  const normales = result.rubros.filter((r) => r.estado === "normal");

  function buildWhatsAppMessage(): string {
    const edificio = result.edificio_detectado ?? "mi edificio";
    const periodo = result.periodo ?? "";
    const total = result.total_expensas
      ? formatMonto(result.total_expensas)
      : "—";

    const alertaLines = alertas
      .map((r) => `🔴 ${r.nombre}: ${formatMonto(r.monto)} — ${r.comentario}`)
      .join("\n");
    const elevadoLines = elevados
      .map((r) => `🟡 ${r.nombre}: ${formatMonto(r.monto)} — ${r.comentario}`)
      .join("\n");
    const normalLines = normales
      .map((r) => `✅ ${r.nombre}: ${formatMonto(r.monto)}`)
      .join("\n");

    const problemasSection =
      alertas.length > 0 || elevados.length > 0
        ? `*Rubros con alerta:*\n${[alertaLines, elevadoLines].filter(Boolean).join("\n")}\n\n`
        : "";

    return [
      `📊 *Análisis de expensas — ${edificio}${periodo ? " — " + periodo : ""}*`,
      `Análisis realizado por Dominium`,
      ``,
      `💰 *Total expensas: ${total}*`,
      ``,
      problemasSection.trimEnd(),
      normalLines ? `✅ *Rubros normales:*\n${normalLines}` : "",
      ``,
      `📌 *Conclusión:*`,
      result.conclusion.resumen,
      ``,
      `💸 *Ahorro estimado: ${result.conclusion.ahorro_estimado} por mes*`,
      ``,
      `---`,
      `Informe generado por Dominium · dominium.com.ar`,
    ]
      .filter((l) => l !== null && l !== undefined)
      .join("\n")
      .trim();
  }

  function handleWhatsApp() {
    const msg = buildWhatsAppMessage();
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header del resultado */}
      <div
        style={{
          opacity: rowsVisible ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        <p
          className="text-[12px] font-medium"
          style={{ color: "var(--color-ink-tertiary)" }}
        >
          {[result.edificio_detectado, result.periodo]
            .filter(Boolean)
            .join(" · ")}
        </p>
        {result.total_expensas !== null && (
          <p
            className="font-serif font-bold mt-2"
            style={{
              fontSize: "clamp(28px, 5vw, 40px)",
              color: "var(--color-ink)",
            }}
          >
            {formatMonto(result.total_expensas)}
            <span
              className="text-[15px] font-sans font-normal ml-1"
              style={{ color: "var(--color-ink-secondary)" }}
            >
              / mes
            </span>
          </p>
        )}
      </div>

      {/* Tabla de rubros */}
      <div className="flex flex-col gap-3">
        <p
          className="text-[12px] font-semibold uppercase tracking-wide"
          style={{ color: "var(--color-ink-tertiary)" }}
        >
          Desglose por rubro
        </p>
        {result.rubros.map((rubro, i) => {
          const cfg = ESTADO_CONFIG[rubro.estado];
          return (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{
                border: "1px solid var(--color-border)",
                opacity: rowsVisible ? 1 : 0,
                transform: rowsVisible ? "translateX(0)" : "translateX(-8px)",
                transition: `opacity 0.4s ease ${i * 70}ms, transform 0.4s ease ${i * 70}ms`,
              }}
            >
              {/* Mobile: stacked layout */}
              <div className="p-3 flex flex-col gap-1 sm:hidden">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className="text-[14px] font-semibold"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {rubro.nombre}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold shrink-0"
                    style={{
                      backgroundColor: cfg.bg,
                      color: cfg.text,
                      border: `1px solid ${cfg.border}`,
                    }}
                  >
                    <cfg.Icon size={10} />
                    {cfg.label}
                  </span>
                </div>
                <p
                  className="text-[15px] font-semibold"
                  style={{ color: "var(--color-ink)" }}
                >
                  {formatMonto(rubro.monto)}
                </p>
                <p
                  className="text-[12px] leading-snug"
                  style={{ color: "var(--color-ink-secondary)" }}
                >
                  {rubro.comentario}
                </p>
              </div>

              {/* Desktop: single row */}
              <div className="hidden sm:flex items-start gap-3 p-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p
                      className="text-[14px] font-semibold"
                      style={{ color: "var(--color-ink)" }}
                    >
                      {rubro.nombre}
                    </p>
                    <div className="flex items-center gap-3">
                      <p
                        className="text-[14px] font-semibold"
                        style={{ color: "var(--color-ink)" }}
                      >
                        {formatMonto(rubro.monto)}
                      </p>
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                        style={{
                          backgroundColor: cfg.bg,
                          color: cfg.text,
                          border: `1px solid ${cfg.border}`,
                        }}
                      >
                        <cfg.Icon size={10} />
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                  <p
                    className="text-[12px] leading-snug mt-1"
                    style={{ color: "var(--color-ink-secondary)" }}
                  >
                    {rubro.comentario}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Box de alertas */}
      {alertas.length > 0 && (
        <div
          className="rounded-xl p-4"
          style={{
            backgroundColor: "#FEF2F2",
            border: "1.5px solid #FCA5A5",
            opacity: rowsVisible ? 1 : 0,
            transition: "opacity 0.4s ease 0.4s",
          }}
        >
          <p
            className="text-[13px] font-semibold mb-2"
            style={{ color: "#C0392B" }}
          >
            Ítems que requieren atención
          </p>
          <ul className="flex flex-col gap-1">
            {alertas.map((r, i) => (
              <li
                key={i}
                className="flex items-start justify-between gap-2 text-[13px]"
                style={{ color: "#7F1D1D" }}
              >
                <span>• {r.nombre}</span>
                <span className="font-semibold shrink-0">
                  {formatMonto(r.monto)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Box de ítems sin detalle */}
      {result.items_sin_detalle.length > 0 && (
        <div
          className="rounded-xl p-4"
          style={{
            backgroundColor: "var(--color-surface-alt)",
            border: "1px solid var(--color-border)",
            opacity: rowsVisible ? 1 : 0,
            transition: "opacity 0.4s ease 0.5s",
          }}
        >
          <p
            className="text-[13px]"
            style={{ color: "var(--color-ink-secondary)" }}
          >
            Tu liquidación tiene rubros sin desglose:{" "}
            <span className="font-medium" style={{ color: "var(--color-ink)" }}>
              {result.items_sin_detalle.join(", ")}
            </span>
          </p>
          <p
            className="text-[12px] mt-1"
            style={{ color: "var(--color-ink-tertiary)" }}
          >
            Un buen administrador debe poder justificar cada peso.
          </p>
        </div>
      )}

      {/* Conclusión */}
      <div
        className="rounded-xl p-5"
        style={{
          backgroundColor: "var(--color-vero-light)",
          borderLeft: "3px solid var(--color-vero)",
          opacity: rowsVisible ? 1 : 0,
          transition: "opacity 0.4s ease 0.55s",
        }}
      >
        <p
          className="text-[14px] leading-relaxed"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          {result.conclusion.resumen}
        </p>
        {result.conclusion.principal_problema && (
          <p
            className="text-[14px] font-semibold mt-3"
            style={{ color: "var(--color-ink)" }}
          >
            Principal problema: {result.conclusion.principal_problema}
          </p>
        )}

        {/* Ahorro estimado — elemento más prominente */}
        <div className="mt-5 pt-4" style={{ borderTop: "1px solid #C8DCF3" }}>
          <p
            className="text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-ink-tertiary)" }}
          >
            Ahorro estimado por mes
          </p>
          <p
            className="font-serif font-bold mt-1"
            style={{
              fontSize: "clamp(32px, 6vw, 48px)",
              color: "var(--color-accent)",
            }}
          >
            {result.conclusion.ahorro_estimado}
          </p>
        </div>
      </div>

      {/* WhatsApp share */}
      <div
        className="flex flex-col gap-3"
        style={{
          opacity: rowsVisible ? 1 : 0,
          transition: "opacity 0.4s ease 0.65s",
        }}
      >
        <button
          onClick={handleWhatsApp}
          className="w-full flex items-center justify-center gap-2 rounded-full text-[15px] font-semibold text-white transition-colors duration-150"
          style={{
            minHeight: "52px",
            backgroundColor: "#25D366",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#1ebe5a")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#25D366")
          }
          aria-label="Compartir informe en WhatsApp"
        >
          <MessageSquare size={18} />
          📲 Compartir informe en mi grupo de WhatsApp
        </button>
        <p
          className="text-[12px] text-center"
          style={{ color: "var(--color-ink-tertiary)" }}
        >
          Se abre WhatsApp con el informe listo para compartir en tu grupo de
          consorcio.
        </p>
      </div>

      {/* Hablar con un asesor */}
      <div
        className="flex flex-col items-center gap-3"
        style={{
          opacity: rowsVisible ? 1 : 0,
          transition: "opacity 0.4s ease 0.75s",
        }}
      >
        <div
          className="my-1 w-full"
          style={{ height: "1px", backgroundColor: "var(--color-border)" }}
          aria-hidden="true"
        />
        <p
          className="text-[14px] text-center"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          ¿Querés que un asesor te explique el informe en detalle?
        </p>
        <a
          href="https://wa.me/5491136520670"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 h-[48px] px-6 rounded-full text-[14px] font-semibold transition-all duration-150"
          style={{
            border: "1.5px solid var(--color-accent)",
            color: "var(--color-accent)",
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              "var(--color-accent-glow)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          Hablar con un asesor →
        </a>
      </div>

      {/* Retry */}
      <button
        onClick={onRetry}
        className="flex items-center justify-center gap-2 text-[13px] transition-colors self-center"
        style={{ color: "var(--color-ink-tertiary)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--color-ink-secondary)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--color-ink-tertiary)")
        }
      >
        <RotateCcw size={13} />
        Analizar otra liquidación
      </button>

      {/* Footnote */}
      <p
        className="text-[11px] text-center leading-relaxed"
        style={{ color: "var(--color-ink-tertiary)" }}
      >
        Análisis generado por IA · Los datos son orientativos · Dominium no se
        responsabiliza por decisiones tomadas en base a este informe.
      </p>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function Analizador() {
  const [step, setStep] = useState<Step>(1);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleFileNext = useCallback(async (file: File) => {
    setApiError(null);
    setStep(2);

    async function attempt(): Promise<AnalysisResult> {
      return callAnthropic(file);
    }

    let res: AnalysisResult;
    try {
      res = await attempt();
    } catch {
      // Reintentar una vez silenciosamente si hay error de JSON o red
      try {
        res = await attempt();
      } catch (err2) {
        const msg = err2 instanceof Error ? err2.message : "Error desconocido";
        setApiError(`Hubo un problema al analizar. Intentá de nuevo. (${msg})`);
        setStep(1);
        return;
      }
    }

    setResult(res);
    // Si el documento no es válido, saltamos el gate y mostramos el error directo.
    // El gate (paso 3) solo aparece cuando hay un informe real para desbloquear.
    setStep(res.es_liquidacion_valida ? 3 : 4);
  }, []);

  const handleUnlock = useCallback(
    async (lead: LeadData) => {
      if (!result) throw new Error("Sin informe para enviar");

      const res = await fetch("/api/notify-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead, result }),
      });
      if (!res.ok) throw new Error("notify failed");

      setStep(4);
    },
    [result],
  );

  function handleRetry() {
    setResult(null);
    setApiError(null);
    setStep(1);
  }

  const stepTitle: Record<Step, string> = {
    1: "Analizá tus expensas",
    2: "",
    3: "Tu informe está listo",
    4: "Tu informe",
  };

  return (
    <section
      ref={sectionRef}
      id="analizador"
      className="py-[80px] md:py-[120px]"
      style={{ backgroundColor: "var(--color-bg)" }}
      aria-label="Analizador de expensas Vero"
    >
      <div className="mx-auto max-w-[1120px] px-6 flex flex-col items-center gap-10">
        {/* Section header */}
        <div
          className="flex flex-col items-center gap-4 text-center"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p
            className="text-[12px] font-semibold tracking-[0.1em] uppercase"
            style={{ color: "var(--color-vero)" }}
          >
            Vero · Analizador de Expensas
          </p>
          <h2
            className="font-serif font-bold text-balance leading-[1.15]"
            style={{
              fontSize: "clamp(26px, 4vw, 40px)",
              color: "var(--color-ink)",
            }}
          >
            Entendé qué pagás
            <br />
            para pagar menos.
          </h2>
          <p
            className="text-[16px] leading-relaxed max-w-[520px]"
            style={{ color: "var(--color-ink-secondary)" }}
          >
            Subí tu liquidación y Vero la analiza al instante. Detectamos
            ineficiencias, comparamos con edificios similares, y te damos un
            informe listo para compartir en tu grupo.
          </p>
        </div>

        {/* Analyzer card */}
        <div
          className="w-full max-w-[820px] rounded-[16px] overflow-hidden"
          style={{
            backgroundColor: "var(--color-surface)",
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.06), 0 8px 40px rgba(0,0,0,0.10)",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
          }}
        >
          {/* Card header with step indicator */}
          {step !== 2 && (
            <div
              className="px-6 pt-6 pb-4 flex items-center justify-between"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center gap-2.5">
                <VeroMark size={24} />
                {stepTitle[step] && (
                  <p
                    className="text-[14px] font-semibold"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {stepTitle[step]}
                  </p>
                )}
              </div>
              {/* Step dots */}
              <div className="flex items-center gap-1.5">
                {([1, 2, 3, 4] as Step[]).map((s) => (
                  <div
                    key={s}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: s === step ? "16px" : "6px",
                      height: "6px",
                      backgroundColor:
                        s <= step ? "var(--color-vero)" : "var(--color-border)",
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          )}

          <div className={step === 2 ? "p-8 md:p-10" : "p-6 md:p-8"}>
            {/* Error banner for API errors */}
            {apiError && (
              <div
                className="mb-5 px-4 py-3 rounded-lg text-[13px]"
                style={{
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FCA5A5",
                  color: "var(--color-destructive)",
                }}
                role="alert"
              >
                {apiError}
              </div>
            )}

            {step === 1 && <Step1Upload onNext={handleFileNext} />}

            {step === 2 && <Step2Loading />}

            {step === 3 && result && (
              <Step3Gate result={result} onUnlock={handleUnlock} />
            )}

            {step === 4 && result && (
              <>
                {!result.es_liquidacion_valida ? (
                  /* Invalid document — show error + back button */
                  <div className="flex flex-col gap-5 py-2">
                    <div
                      className="rounded-xl p-4"
                      style={{
                        backgroundColor: "#FFFBEB",
                        border: "1.5px solid #FCD34D",
                      }}
                    >
                      <p
                        className="text-[14px] font-semibold mb-1"
                        style={{ color: "#B45309" }}
                      >
                        No pudimos detectar una liquidación de expensas.
                      </p>
                      <p className="text-[13px]" style={{ color: "#92400E" }}>
                        {result.mensaje_error ?? "¿Es la liquidación completa?"}
                      </p>
                    </div>
                    <button
                      onClick={handleRetry}
                      className="h-[48px] rounded-full text-[14px] font-semibold transition-all duration-150"
                      style={{
                        border: "1.5px solid var(--color-accent)",
                        color: "var(--color-accent)",
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--color-accent-glow)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      Volver a subir
                    </button>
                  </div>
                ) : (
                  <Step4Results result={result} onRetry={handleRetry} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
