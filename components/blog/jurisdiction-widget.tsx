import { MapPin } from 'lucide-react'

export default function JurisdictionWidget() {
  return (
    <aside
      className="rounded-[12px] p-5 flex flex-col gap-3"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
      aria-label="Diferencias entre CABA y GBA"
    >
      <div className="flex items-center gap-2">
        <MapPin size={14} color="var(--color-accent)" aria-hidden="true" />
        <p
          className="text-[11px] font-semibold tracking-[0.1em] uppercase"
          style={{ color: 'var(--color-ink-tertiary)' }}
        >
          ¿CABA o GBA?
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div
          className="rounded-[8px] p-3 flex flex-col gap-1"
          style={{
            backgroundColor: 'var(--color-accent-glow)',
            border: '1px solid #B6E8CC',
          }}
        >
          <p className="text-[13px] font-semibold" style={{ color: 'var(--color-accent)' }}>
            CABA
          </p>
          <p className="text-[12.5px] leading-snug" style={{ color: 'var(--color-ink-secondary)' }}>
            Rige la Ley 941 y el RPA (Registro Público de Administradores). El
            administrador debe estar inscripto. Plazos y obligaciones definidos.
          </p>
        </div>
        <div
          className="rounded-[8px] p-3 flex flex-col gap-1"
          style={{
            backgroundColor: 'var(--color-surface-alt)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p className="text-[13px] font-semibold" style={{ color: 'var(--color-ink)' }}>
            GBA
          </p>
          <p className="text-[12.5px] leading-snug" style={{ color: 'var(--color-ink-secondary)' }}>
            Sin registro único unificado. Se aplica el Código Civil y Comercial
            y el reglamento de cada consorcio.
          </p>
        </div>
      </div>
    </aside>
  )
}
