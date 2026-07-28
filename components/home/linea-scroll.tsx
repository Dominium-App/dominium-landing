export default function LineaScroll() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-(--z-overlay) h-[2px]"
      aria-hidden="true"
    >
      <div className="s-progress h-full w-full origin-left scale-x-0 bg-gold-light" />
    </div>
  )
}
