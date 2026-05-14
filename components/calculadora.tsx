"use client";

import { useState, useMemo } from "react";
import { AlertCircle, TrendingUp, TrendingDown, Check } from "lucide-react";

type BarrioKey =
  | "palermo"
  | "belgrano"
  | "caballito"
  | "recoleta"
  | "villa-crespo"
  | "nunez"
  | "almagro"
  | "otro";

const BARRIOS: { key: BarrioKey; label: string; basePerUnit: number }[] = [
  { key: "palermo", label: "Palermo", basePerUnit: 14200 },
  { key: "belgrano", label: "Belgrano", basePerUnit: 13800 },
  { key: "caballito", label: "Caballito", basePerUnit: 11500 },
  { key: "recoleta", label: "Recoleta", basePerUnit: 15400 },
  { key: "villa-crespo", label: "Villa Crespo", basePerUnit: 12300 },
  { key: "nunez", label: "Núñez", basePerUnit: 13100 },
  { key: "almagro", label: "Almagro", basePerUnit: 10900 },
  { key: "otro", label: "Otro / GBA", basePerUnit: 11200 },
];

type Antiguedad = "nuevo" | "intermedio" | "viejo";
const ANTIGUEDADES: { key: Antiguedad; label: string; multiplier: number }[] = [
  { key: "nuevo", label: "Menos de 15 años", multiplier: 0.85 },
  { key: "intermedio", label: "15 a 40 años", multiplier: 1.0 },
  { key: "viejo", label: "Más de 40 años", multiplier: 1.18 },
];

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("es-AR");
}

export default function Calculadora() {
  const [barrio, setBarrio] = useState<BarrioKey>("palermo");
  const [unidades, setUnidades] = useState<number>(20);
  const [antiguedad, setAntiguedad] = useState<Antiguedad>("intermedio");
  const [conAmenities, setConAmenities] = useState(false);
  const [conEncargado, setConEncargado] = useState(true);
  const [misExpensas, setMisExpensas] = useState<string>("");

  const result = useMemo(() => {
    const b = BARRIOS.find((x) => x.key === barrio)!;
    const ant = ANTIGUEDADES.find((x) => x.key === antiguedad)!;

    // Base per unit, adjusted
    let base = b.basePerUnit * ant.multiplier;
    if (conAmenities) base *= 1.22;
    if (conEncargado) base *= 1.15;

    // Range: ±12%
    const min = base * 0.88;
    const max = base * 1.12;
    const promedio = base;

    const miMonto = Number(misExpensas.replace(/[^\d]/g, "")) || null;
    let diff: number | null = null;
    let pct: number | null = null;
    if (miMonto && miMonto > 0) {
      diff = miMonto - promedio;
      pct = (diff / promedio) * 100;
    }

    return { min, max, promedio, miMonto, diff, pct };
  }, [barrio, unidades, antiguedad, conAmenities, conEncargado, misExpensas]);
  void unidades;

  const status: "ok" | "elevado" | "alto" | null =
    result.pct === null
      ? null
      : result.pct < 12
        ? "ok"
        : result.pct < 30
          ? "elevado"
          : "alto";

  const statusConfig = {
    ok: {
      bg: "var(--color-accent-glow)",
      border: "var(--color-accent)",
      color: "var(--color-accent)",
      Icon: Check,
      title: "Dentro del rango esperado",
      msg: "Tu liquidación está alineada con edificios similares del barrio. Igualmente, una auditoría con IA puede detectar ítems específicos optimizables.",
    },
    elevado: {
      bg: "#FFFBEB",
      border: "#FCD34D",
      color: "#B45309",
      Icon: AlertCircle,
      title: "Pagás más que el promedio del barrio",
      msg: "Tu liquidación está entre 12% y 30% por encima del rango esperado. Hay margen claro de auditoría partida por partida.",
    },
    alto: {
      bg: "#FEF2F2",
      border: "#FCA5A5",
      color: "#C0392B",
      Icon: AlertCircle,
      title: "Estás pagando significativamente de más",
      msg: "Tu liquidación está más de 30% por encima del promedio comparable. Pedí auditoría inmediata para entender qué rubros lo explican.",
    },
  };

  return (
    <div
      className="rounded-[20px] overflow-hidden"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.08)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Inputs */}
        <div className="p-6 md:p-8 flex flex-col gap-5">
          <p
            className="text-[13px] font-semibold uppercase tracking-wide"
            style={{ color: "var(--color-ink-tertiary)" }}
          >
            Datos de tu edificio
          </p>

          <Field label="Barrio">
            <select
              value={barrio}
              onChange={(e) => setBarrio(e.target.value as BarrioKey)}
              className="w-full h-[44px] px-3 rounded-lg text-[14px] outline-none"
              style={{
                border: "1.5px solid var(--color-border)",
                backgroundColor: "white",
                color: "var(--color-ink)",
              }}
            >
              {BARRIOS.map((b) => (
                <option key={b.key} value={b.key}>
                  {b.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label={`Cantidad de unidades: ${unidades}`}>
            <input
              type="range"
              min={4}
              max={120}
              value={unidades}
              onChange={(e) => setUnidades(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: "var(--color-accent)" }}
            />
          </Field>

          <Field label="Antigüedad">
            <div className="grid grid-cols-3 gap-2">
              {ANTIGUEDADES.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  onClick={() => setAntiguedad(a.key)}
                  className="h-[40px] rounded-lg text-[12.5px] font-medium transition-colors duration-150"
                  style={{
                    border:
                      antiguedad === a.key
                        ? "1.5px solid var(--color-accent)"
                        : "1.5px solid var(--color-border)",
                    backgroundColor:
                      antiguedad === a.key
                        ? "var(--color-accent-glow)"
                        : "white",
                    color:
                      antiguedad === a.key
                        ? "var(--color-accent)"
                        : "var(--color-ink-secondary)",
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </Field>

          <div className="flex flex-col gap-2 pt-1">
            <Toggle
              label="Tiene amenities (SUM, piscina, gym, etc.)"
              checked={conAmenities}
              onChange={setConAmenities}
            />
            <Toggle
              label="Tiene encargado permanente"
              checked={conEncargado}
              onChange={setConEncargado}
            />
          </div>

          <div
            className="h-px w-full my-1"
            style={{ backgroundColor: "var(--color-border)" }}
          />

          <Field label="¿Cuánto pagás hoy? (opcional)">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Ej: 285000"
              value={misExpensas}
              onChange={(e) => setMisExpensas(e.target.value)}
              className="w-full h-[44px] px-3 rounded-lg text-[14px] outline-none"
              style={{
                border: "1.5px solid var(--color-border)",
                backgroundColor: "white",
                color: "var(--color-ink)",
              }}
            />
            <p
              className="text-[11.5px] mt-1"
              style={{ color: "var(--color-ink-tertiary)" }}
            >
              Lo comparamos con el rango esperado para tu edificio.
            </p>
          </Field>
        </div>

        {/* Result */}
        <div
          className="p-6 md:p-8 flex flex-col gap-5"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          <p
            className="text-[13px] font-semibold uppercase tracking-wide"
            style={{ color: "var(--color-ink-tertiary)" }}
          >
            Rango esperado de expensas por unidad
          </p>

          <div className="flex flex-col gap-3">
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-ink-tertiary)" }}
              >
                Estimado por unidad
              </p>
              <p
                className="font-serif font-bold mt-1"
                style={{
                  fontSize: "clamp(28px, 5vw, 40px)",
                  color: "var(--color-ink)",
                }}
              >
                {fmt(result.min)}
                <span
                  className="text-[16px] font-sans font-normal mx-2"
                  style={{ color: "var(--color-ink-tertiary)" }}
                >
                  a
                </span>
                {fmt(result.max)}
              </p>
              <p
                className="text-[12.5px] mt-1"
                style={{ color: "var(--color-ink-tertiary)" }}
              >
                Promedio comparable: {fmt(result.promedio)} / mes
              </p>
            </div>

            {status && (
              <div
                className="rounded-xl p-4 flex gap-3"
                style={{
                  backgroundColor: statusConfig[status].bg,
                  border: `1.5px solid ${statusConfig[status].border}`,
                }}
              >
                {(() => {
                  const Cmp = statusConfig[status].Icon;
                  return (
                    <Cmp
                      size={20}
                      style={{ color: statusConfig[status].color }}
                      className="shrink-0 mt-0.5"
                    />
                  );
                })()}
                <div className="flex flex-col gap-1">
                  <p
                    className="text-[14px] font-semibold"
                    style={{ color: statusConfig[status].color }}
                  >
                    {statusConfig[status].title}
                  </p>
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{ color: statusConfig[status].color, opacity: 0.85 }}
                  >
                    {statusConfig[status].msg}
                  </p>
                  {result.pct !== null && result.diff !== null && (
                    <p
                      className="text-[12.5px] mt-2 font-medium flex items-center gap-1"
                      style={{ color: statusConfig[status].color }}
                    >
                      {result.diff > 0 ? (
                        <TrendingUp size={13} />
                      ) : (
                        <TrendingDown size={13} />
                      )}
                      {result.diff > 0
                        ? `Pagás ${fmt(Math.abs(result.diff))}/mes más que el promedio (+${Math.round(result.pct)}%)`
                        : `Pagás ${fmt(Math.abs(result.diff))}/mes menos que el promedio (${Math.round(result.pct)}%)`}
                    </p>
                  )}
                </div>
              </div>
            )}

            <a
              href="/#analizador"
              className="inline-flex items-center justify-center h-[50px] rounded-full text-[15px] font-semibold text-white transition-colors duration-150"
              style={{ backgroundColor: "var(--color-accent)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-accent-light)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-accent)")
              }
            >
              Auditar mi liquidación con IA →
            </a>
            <p
              className="text-[11.5px] text-center"
              style={{ color: "var(--color-ink-tertiary)" }}
            >
              La calculadora es una estimación basada en datos del mercado AMBA.
              Para un análisis preciso, subí tu liquidación al analizador.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[12.5px] font-semibold"
        style={{ color: "var(--color-ink-secondary)" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <span
        className="relative inline-block rounded-full transition-colors duration-200"
        style={{
          width: "36px",
          height: "20px",
          backgroundColor: checked ? "var(--color-accent)" : "var(--color-border)",
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <span
          className="absolute top-0.5 rounded-full bg-white shadow-sm transition-all duration-200"
          style={{
            width: "16px",
            height: "16px",
            left: checked ? "18px" : "2px",
          }}
        />
      </span>
      <span
        className="text-[13.5px]"
        style={{ color: "var(--color-ink-secondary)" }}
      >
        {label}
      </span>
    </label>
  );
}
