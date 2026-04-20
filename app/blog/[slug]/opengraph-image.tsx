import { ImageResponse } from 'next/og'
import { getArticleBySlug, type Hub } from '@/lib/blog'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Dominium — Blog'

const HUB_HEX: Record<Hub, { bg: string; text: string; border: string }> = {
  'Cambiar administrador': { bg: '#E8F2EC', text: '#1A3A2A', border: '#B6E8CC' },
  Expensas: { bg: '#EBF3FD', text: '#3B7DD8', border: '#BAD3F3' },
  'Ley 941': { bg: '#FFFBEB', text: '#B45309', border: '#FCD34D' },
  Derechos: { bg: '#F3EEFD', text: '#6D28D9', border: '#D6C7F5' },
  'Local AMBA': { bg: '#FEF2F2', text: '#9A2E22', border: '#FCA5A5' },
}

async function loadFont(family: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family}`
  const css = await (
    await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  ).text()
  const match = css.match(/src:\s*url\(([^)]+)\)\s*format/)
  if (!match) throw new Error(`Font URL not found for ${family}`)
  const response = await fetch(match[1])
  if (!response.ok) throw new Error(`Font fetch failed for ${family}`)
  return await response.arrayBuffer()
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) throw new Error(`Article not found: ${slug}`)

  const hub = HUB_HEX[article.hub]

  const [playfairBold, dmSansSemiBold] = await Promise.all([
    loadFont('Playfair+Display:wght@700'),
    loadFont('DM+Sans:wght@600'),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#F8F7F4',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative radial */}
        <div
          style={{
            position: 'absolute',
            top: -260,
            right: -180,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${hub.bg} 0%, rgba(248,247,244,0) 70%)`,
          }}
        />
        {/* Bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 6,
            backgroundColor: '#1A3A2A',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          {/* Top: hub badge */}
          <div style={{ display: 'flex' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: hub.bg,
                color: hub.text,
                border: `1px solid ${hub.border}`,
                padding: '12px 22px',
                borderRadius: 9999,
                fontFamily: 'DM Sans',
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {article.hub}
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              display: 'flex',
              fontFamily: 'Playfair Display',
              fontSize: 60,
              fontWeight: 700,
              color: '#0D0D0B',
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              maxWidth: 1040,
              marginTop: 32,
              marginBottom: 32,
            }}
          >
            {article.title}
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Playfair Display',
                  fontSize: 38,
                  fontWeight: 700,
                  color: '#0D0D0B',
                  lineHeight: 1,
                }}
              >
                Dominium
              </div>
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'DM Sans',
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#5C5B57',
                  marginTop: 8,
                  letterSpacing: '0.02em',
                }}
              >
                dominium.com.ar
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                fontFamily: 'DM Sans',
                fontSize: 15,
                fontWeight: 600,
                color: '#1A3A2A',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Blog Dominium
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Playfair Display', data: playfairBold, weight: 700, style: 'normal' },
        { name: 'DM Sans', data: dmSansSemiBold, weight: 600, style: 'normal' },
      ],
    },
  )
}
