import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dominium — Administración de consorcios con IA',
    short_name: 'Dominium',
    description:
      'Administradora de consorcios potenciada por IA. Auditá tus expensas en 60 segundos, gratis.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F7F4',
    theme_color: '#F8F7F4',
    lang: 'es-AR',
    categories: ['business', 'finance', 'productivity'],
    icons: [
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/icon-1200.png',
        sizes: '1200x1200',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-1200.png',
        sizes: '1200x1200',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
