import type { MetadataRoute } from 'next'

const SITE_URL = 'https://dominium.com.ar'
const IS_PROD = process.env.VERCEL_ENV === 'production'

export default function robots(): MetadataRoute.Robots {
  if (!IS_PROD) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
