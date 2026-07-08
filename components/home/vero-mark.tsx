export default function VeroMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="15" stroke="var(--vero-blue)" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="6" fill="var(--vero-blue)" />
      <line x1="16" y1="1" x2="16" y2="7" stroke="var(--vero-blue)" strokeWidth="1.5" />
      <line x1="16" y1="25" x2="16" y2="31" stroke="var(--vero-blue)" strokeWidth="1.5" />
    </svg>
  )
}
