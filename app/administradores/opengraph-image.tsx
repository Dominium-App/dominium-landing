import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Plan de Retiro para Administradores | Dominium'

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
          backgroundColor: '#1A3A2A',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -260,
            right: -180,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background:
              'radial-gradient(circle, rgba(138,191,154,0.22) 0%, rgba(26,58,42,0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 6,
            backgroundColor: '#8ABF9A',
          }}
        />

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
          <div style={{ display: 'flex' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(138,191,154,0.18)',
                color: '#8ABF9A',
                border: '1px solid rgba(138,191,154,0.35)',
                padding: '12px 22px',
                borderRadius: 9999,
                fontFamily: 'DM Sans',
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Para Administradores
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              maxWidth: 1040,
              marginTop: 32,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontFamily: 'Playfair Display',
                fontSize: 70,
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              ¿Pensando en dejar la administración?
            </div>
            <div
              style={{
                display: 'flex',
                fontFamily: 'DM Sans',
                fontSize: 24,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.78)',
                lineHeight: 1.4,
                maxWidth: 900,
              }}
            >
              18 meses de comisiones por el traspaso ordenado de tu cartera de consorcios.
            </div>
          </div>

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
                  color: '#FFFFFF',
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
                  color: 'rgba(255,255,255,0.6)',
                  marginTop: 8,
                  letterSpacing: '0.02em',
                }}
              >
                dominium.com.ar/administradores
              </div>
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
