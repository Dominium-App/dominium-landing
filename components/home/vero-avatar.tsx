import Image from 'next/image'

export default function VeroAvatar({
  size = 32,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <Image
      src="/vero.webp"
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
      className={`shrink-0 rounded-full object-cover ${className}`}
    />
  )
}
