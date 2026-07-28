export default function Indice({
  n,
  label,
  tone = 'light',
  className = '',
}: {
  n: string
  label: string
  tone?: 'light' | 'dark'
  className?: string
}) {
  const ink = tone === 'dark' ? 'text-gold-light' : 'text-forest'
  const rule = tone === 'dark' ? 'bg-gold-light/40' : 'bg-forest/30'

  return (
    <p className={`flex items-center gap-3.5 ${className}`}>
      <span className={`hairline-caps ${ink}`}>{n}</span>
      <span className={`s-rule h-px w-8 shrink-0 md:w-12 ${rule}`} aria-hidden="true" />
      <span className={`hairline-caps ${ink}`}>{label}</span>
    </p>
  )
}
