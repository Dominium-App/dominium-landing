'use client'

import { useState } from 'react'
import Image from 'next/image'

/* Muestra la foto de /public/equipo/{slug}.webp; si todavía no existe,
   cae al monograma sobre verde sin romper el layout. */
export default function FotoEquipo({
  slug,
  alt,
  initials,
}: {
  slug: string
  alt: string
  initials: string
}) {
  const [falla, setFalla] = useState(false)

  return (
    <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-forest">
      {falla ? (
        <span className="absolute inset-0 flex items-center justify-center text-[24px] font-semibold text-on-forest">
          {initials}
        </span>
      ) : (
        <Image
          src={`/equipo/${slug}.webp`}
          alt={alt}
          fill
          sizes="112px"
          className="object-cover"
          onError={() => setFalla(true)}
        />
      )}
    </div>
  )
}
