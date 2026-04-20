import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Dominium — Administración de consorcios con IA'

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

export default async function Image() {
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
        {/* Decorative radial — accent green */}
        <div
          style={{
            position: 'absolute',
            top: -260,
            right: -200,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background:
              'radial-gradient(circle, #E8F2EC 0%, rgba(248,247,244,0) 70%)',
          }}
        />
        {/* Vero blue accent radial */}
        <div
          style={{
            position: 'absolute',
            bottom: -220,
            right: 120,
            width: 500,
            height: 500,
            borderRadius: 9999,
            background:
              'radial-gradient(circle, #EBF3FD 0%, rgba(248,247,244,0) 70%)',
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

        {/* Content column */}
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
          {/* Eyebrow pill */}
          <div style={{ display: 'flex' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#E8F2EC',
                color: '#1A3A2A',
                border: '1px solid #B6E8CC',
                padding: '12px 22px',
                borderRadius: 9999,
                fontFamily: 'DM Sans',
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Administración de consorcios con IA
            </div>
          </div>

          {/* Headline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              maxWidth: 1040,
              marginTop: 40,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontFamily: 'Playfair Display',
                fontSize: 72,
                fontWeight: 700,
                color: '#0D0D0B',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              ¿Cuánto pagás de más en expensas?
            </div>
            <div
              style={{
                display: 'flex',
                fontFamily: 'DM Sans',
                fontSize: 26,
                fontWeight: 600,
                color: '#5C5B57',
                lineHeight: 1.4,
                maxWidth: 900,
              }}
            >
              Auditá tu liquidación con IA en 60 segundos. Gratis, sin registro.
            </div>
          </div>

          {/* Footer: wordmark + url */}
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
                  fontSize: 42,
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
                  marginTop: 10,
                  letterSpacing: '0.02em',
                }}
              >
                dominium.com.ar
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'DM Sans',
                fontSize: 15,
                fontWeight: 600,
                color: '#3B7DD8',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: 10,
                  height: 10,
                  borderRadius: 9999,
                  backgroundColor: '#3B7DD8',
                }}
              />
              Powered by Vero
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
