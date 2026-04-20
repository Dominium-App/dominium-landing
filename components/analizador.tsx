"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MessageSquare,
  RotateCcw,
} from "lucide-react";

// ============================================================
// CONSTANTS
// ============================================================

const BENCHMARK_DATA = {
  fuente: "Promedios de mercado AMBA 2024-2025, elaboración Dominium",
  rubros: [
    {
      nombre: "Honorarios del administrador",
      referencia: "Entre 6% y 8% del total de la liquidación",
      alerta_si: "Supera el 10% del total",
      nota: "El rubro con mayor variación en el mercado",
    },
    {
      nombre: "Seguro del edificio",
      referencia:
        "Entre $80.000 y $180.000/mes para edificios de 10-30 unidades",
      alerta_si: "Supera $220.000 para edificios pequeños o medianos",
      nota: "Muchos administradores perciben comisión del broker sin declararlo",
    },
    {
      nombre: "Mantenimiento de ascensor",
      referencia: "Entre $60.000 y $120.000/mes por equipo según marca",
      alerta_si: "Supera $150.000 por equipo sin justificación",
      nota: "Contratos cerrados sin licitación son señal de alerta",
    },
    {
      nombre: "Sueldo encargado (SUTERH)",
      referencia: "Fijado por escala sindical SUTERH vigente",
      alerta_si: "Discrepancia entre lo declarado y la escala oficial",
      nota: "Rubro fijo. Variaciones son errores o irregularidades",
    },
    {
      nombre: "Gastos de administración varios",
      referencia: "No debería superar el 3-5% del total",
      alerta_si: "Supera el 7% o los ítems no están detallados",
      nota: "Rubro frecuentemente usado para esconder costos no justificados",
    },
    {
      nombre: "Limpieza y productos",
      referencia: "Entre $30.000 y $70.000/mes según tamaño del edificio",
      alerta_si: "Supera $90.000 sin personal propio declarado",
      nota: "Verificar si hay encargado que ya incluye limpieza",
    },
  ],
};

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
  const isPdf = file.type === "application/pdf";

  const mediaType = isPdf
    ? "application/pdf"
    : (file.type as "image/jpeg" | "image/png" | "image/webp");

  const documentBlock = isPdf
    ? {
        type: "document",
        source: { type: "base64", media_type: mediaType, data: base64 },
      }
    : {
        type: "image",
        source: { type: "base64", media_type: mediaType, data: base64 },
      };

  const systemPrompt = `Sos el analizador de expensas de Dominium, empresa de administración de consorcios con base tecnológica en Argentina.

Tu trabajo es analizar liquidaciones de expensas de edificios del AMBA y detectar ítems sospechosos, inflados o sin justificación.

DATOS DE REFERENCIA DEL MERCADO (usá estos únicamente, no inventes otros):
${JSON.stringify(BENCHMARK_DATA)}

REGLAS:
1. Identificá todos los rubros presentes en el documento
2. Para cada rubro determiná si está normal, elevado o es una alerta, usando los benchmarks provistos
3. Mencioná los montos exactos que ves en el documento
4. Si no podés leer bien algún rubro, indicalo en items_sin_detalle
5. No inventes números que no estén en el documento
6. Usá lenguaje directo, claro, sin tecnicismos
7. Tono profesional pero cercano — hablás con un propietario frustrado con sus gastos
8. Si el documento no es una liquidación de expensas, indicalo con es_liquidacion_valida: false

RESPONDÉ ÚNICAMENTE CON JSON PURO. Sin markdown, sin backticks, sin texto antes o después. Solo el objeto JSON:

{
  "es_liquidacion_valida": boolean,
  "mensaje_error": string | null,
  "edificio_detectado": string | null,
  "periodo": string | null,
  "total_expensas": number | null,
  "unidad": string | null,
  "rubros": [
    {
      "nombre": string,
      "monto": number,
      "estado": "normal" | "elevado" | "alerta",
      "comentario": string
    }
  ],
  "items_sin_detalle": [string],
  "conclusion": {
    "resumen": string,
    "ahorro_estimado": string,
    "principal_problema": string
  }
}`;

  const body = {
    model: "claude-sonnet-4-20250514",
    max_tokens: 1500,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [
          documentBlock,
          {
            type: "text",
            text: "Analizá esta liquidación de expensas y devolvé el JSON solicitado.",
          },
        ],
      },
    ],
  };

  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data.content?.[0]?.text ?? "";

  return JSON.parse(text) as AnalysisResult;
}

// ============================================================
// STEP 1 — Lead form
// ============================================================

function Step1Form({ onNext }: { onNext: (lead: LeadData) => void }) {
  const [nombre, setNombre] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const allFilled =
    nombre.trim() !== "" && localidad.trim() !== "" && whatsapp.trim() !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allFilled) return;
    const lead: LeadData = {
      nombre: nombre.trim(),
      localidad: localidad.trim(),
      whatsapp: whatsapp.trim(),
    };
    try {
      localStorage.setItem("dominium_lead", JSON.stringify(lead));
    } catch {
      // localStorage puede no estar disponible en algunos contextos
    }
    onNext(lead);
  }

  const inputClass =
    "w-full h-[48px] px-4 rounded-lg text-[15px] outline-none transition-all duration-150";
  const inputStyle = {
    border: "1.5px solid var(--color-border)",
    backgroundColor: "white",
    color: "var(--color-ink)",
  };

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "var(--color-accent)";
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "var(--color-border)";
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="nombre"
          className="text-[13px] font-medium"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          Tu nombre
        </label>
        <input
          id="nombre"
          type="text"
          required
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="localidad"
          className="text-[13px] font-medium"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          Localidad
        </label>
        <input
          id="localidad"
          type="text"
          required
          placeholder="Ej: Quilmes, Palermo, Lanús"
          value={localidad}
          onChange={(e) => setLocalidad(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="whatsapp"
          className="text-[13px] font-medium"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          WhatsApp
        </label>
        <input
          id="whatsapp"
          type="tel"
          required
          placeholder="11 5555-1234"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        disabled={!allFilled}
        className="h-[52px] rounded-full text-[15px] font-semibold text-white transition-all duration-150 mt-1"
        style={{
          backgroundColor: allFilled
            ? "var(--color-accent)"
            : "var(--color-border)",
          cursor: allFilled ? "pointer" : "not-allowed",
        }}
        onMouseEnter={(e) => {
          if (allFilled)
            e.currentTarget.style.backgroundColor = "var(--color-accent-light)";
        }}
        onMouseLeave={(e) => {
          if (allFilled)
            e.currentTarget.style.backgroundColor = "var(--color-accent)";
        }}
      >
        Continuar →
      </button>

      <p
        className="text-[12px] text-center"
        style={{ color: "var(--color-ink-tertiary)" }}
      >
        Tu información es confidencial. No hacemos spam.
      </p>
    </form>
  );
}

// ============================================================
// STEP 2 — File upload
// ============================================================

interface Step2Props {
  onNext: (file: File) => void;
}

function Step2Upload({ onNext }: Step2Props) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const MAX_SIZE_MB = 10;
  const ACCEPTED = [".pdf", ".jpg", ".jpeg", ".png", ".webp"];
  const ACCEPTED_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  function validateAndSet(f: File) {
    setError(null);
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError("Ese formato no está soportado. Subí un PDF, JPG o PNG.");
      return;
    }
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      setError("El archivo es muy grande. Intentá con uno de menos de 10MB.");
      return;
    }
    setFile(f);
    if (f.type.startsWith("image/")) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
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
    if (f) validateAndSet(f);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) validateAndSet(f);
  }

  // Clean up object URL on unmount
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

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

      {/* Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && fileRef.current?.click()}
        className="relative flex flex-col items-center gap-4 rounded-[16px] py-10 px-6 text-center transition-all duration-200"
        style={{
          border: isDragging
            ? "2px solid #3B7DD8"
            : "2px dashed var(--color-border)",
          backgroundColor: isDragging ? "var(--color-vero-light)" : "#FAFAF8",
          cursor: file ? "default" : "pointer",
        }}
        aria-label="Zona de carga de liquidación"
      >
        {file ? (
          /* Preview state */
          <div className="flex flex-col items-center gap-3 w-full">
            {preview ? (
              /* Image thumbnail */
              <div className="w-full max-w-[280px] overflow-hidden rounded-lg border border-[var(--color-border)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Preview de la liquidación"
                  className="w-full object-contain max-h-[180px]"
                />
              </div>
            ) : (
              /* PDF icon */
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "var(--color-accent-glow)" }}
              >
                <FileText size={28} color="var(--color-accent)" />
              </div>
            )}
            <p
              className="text-[14px] font-medium truncate max-w-full px-4"
              style={{ color: "var(--color-ink)" }}
            >
              {file.name}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                setPreview(null);
                setError(null);
                if (fileRef.current) fileRef.current.value = "";
              }}
              className="text-[13px] transition-colors"
              style={{ color: "var(--color-ink-tertiary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-destructive)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-ink-tertiary)")
              }
            >
              Cambiar archivo
            </button>
          </div>
        ) : (
          /* Empty state */
          <>
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
                  isDragging
                    ? "var(--color-vero)"
                    : "var(--color-ink-secondary)"
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
                Arrastrá o tocá para subir
              </p>
              <p
                className="text-[13px] mt-1"
                style={{ color: "var(--color-ink-tertiary)" }}
              >
                {ACCEPTED.join(", ")} · Máximo {MAX_SIZE_MB}MB
              </p>
            </div>
          </>
        )}

        <input
          ref={fileRef}
          type="file"
          accept={ACCEPTED.join(",")}
          className="sr-only"
          onChange={handleChange}
          aria-label="Seleccionar archivo de liquidación"
        />
      </div>

      {/* Inline error */}
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

      <button
        type="button"
        disabled={!file}
        onClick={() => file && onNext(file)}
        className="h-[52px] rounded-full text-[15px] font-semibold text-white transition-all duration-150"
        style={{
          backgroundColor: file ? "var(--color-accent)" : "var(--color-border)",
          cursor: file ? "pointer" : "not-allowed",
        }}
        onMouseEnter={(e) => {
          if (file)
            e.currentTarget.style.backgroundColor = "var(--color-accent-light)";
        }}
        onMouseLeave={(e) => {
          if (file)
            e.currentTarget.style.backgroundColor = "var(--color-accent)";
        }}
      >
        Analizar mis expensas →
      </button>
    </div>
  );
}

// ============================================================
// STEP 3 — Loading
// ============================================================

function Step3Loading() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      {/* Pulsing Vero circle */}
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

      {/* Indeterminate bar */}
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
// STEP 4 — Results
// ============================================================

interface Step4Props {
  result: AnalysisResult;
  lead: LeadData;
  onRetry: () => void;
}

function Step4Results({ result, lead, onRetry }: Step4Props) {
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
        <p
          className="text-[13px] mt-0.5"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          Informe para {lead.nombre}
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

      {/* CTA WhatsApp */}
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

        {/* Divider */}
        <div
          className="my-1"
          style={{ height: "1px", backgroundColor: "var(--color-border)" }}
          aria-hidden="true"
        />

        <div className="flex flex-col items-center gap-3">
          <p
            className="text-[14px] text-center"
            style={{ color: "var(--color-ink-secondary)" }}
          >
            ¿Querés que te llamemos para explicarte el informe?
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
  const [lead, setLead] = useState<LeadData | null>(null);
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

  function handleLeadNext(l: LeadData) {
    setLead(l);
    setStep(2);
  }

  const handleFileNext = useCallback(async (file: File) => {
    setApiError(null);
    setStep(3);

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
        setStep(2);
        return;
      }
    }

    if (!res.es_liquidacion_valida) {
      // Mostrar error de validación inline en step 4 con opción de volver
      setResult(res);
      setStep(4);
      return;
    }

    // Fire-and-forget: notificar al equipo por email. No bloquea la UX si falla.
    if (lead) {
      fetch("/api/notify-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead, result: res }),
      }).catch(() => {});
    }

    setResult(res);
    setStep(4);
  }, [lead]);

  function handleRetry() {
    setResult(null);
    setApiError(null);
    setStep(2);
  }

  const stepTitle: Record<Step, string> = {
    1: "Antes de empezar",
    2: "Tu liquidación",
    3: "",
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
          {step !== 3 && (
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

          <div className={step === 3 ? "p-8 md:p-10" : "p-6 md:p-8"}>
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

            {step === 1 && <Step1Form onNext={handleLeadNext} />}

            {step === 2 && <Step2Upload onNext={handleFileNext} />}

            {step === 3 && <Step3Loading />}

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
                  <Step4Results
                    result={result}
                    lead={lead!}
                    onRetry={handleRetry}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/*
 * SUPUESTOS ASUMIDOS:
 * 1. La API de Anthropic soporta acceso directo desde el browser con el header
 *    `anthropic-dangerous-direct-browser-access: true`. En producción, esto
 *    debería pasar por un backend proxy para no exponer la API key.
 * 2. El número de WhatsApp del asesor (`wa.me/5491100000000`) es un placeholder;
 *    reemplazar con el número real antes de producción.
 * 3. El componente reutiliza el nombre de exportación `default function Analizador`
 *    para no romper el import en `app/page.tsx`.
 * 4. `localStorage` puede no estar disponible en SSR; el acceso está envuelto en try/catch.
 * 5. Las imágenes muy grandes (>10MB pero leídas como base64) pueden superar límites
 *    de tokens del modelo; el límite de 10MB en el input mitiga esto parcialmente.
 * 6. El reintentar silencioso ante JSON inválido solo lo hace una vez para no entrar
 *    en loop y consumir créditos de API innecesariamente.
 * 7. El modelo `claude-sonnet-4-20250514` puede no estar disponible en todas las
 *    regiones; considerar fallback a `claude-3-5-sonnet-20241022` si aparece error 404.
 */
