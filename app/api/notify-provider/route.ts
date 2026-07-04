import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'

interface ProviderData {
  fullName: string
  email: string
  phone: string
  dniCuit: string
  trades: string[]
  coverageZones: string[]
  licenses?: { trade: string; number: string }[]
  hasInsurance: boolean
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function chips(items: string[]): string {
  return items
    .map(
      (i) =>
        `<span style="display:inline-block;margin:0 6px 6px 0;padding:4px 10px;border-radius:999px;background:#E8F1EC;color:#1A3A2A;font-size:13px;">${escapeHtml(
          i,
        )}</span>`,
    )
    .join('')
}

function buildHtml(data: ProviderData): string {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#FAFAF8;color:#1a1a1a;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eaeaea;">
    <div style="padding:20px 24px;background:#1A3A2A;color:#fff;">
      <p style="margin:0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.85;">Dominium · Proveedores</p>
      <h1 style="margin:4px 0 0;font-size:20px;">Nueva postulación de proveedor</h1>
    </div>

    <div style="padding:20px 24px;border-bottom:1px solid #eaeaea;">
      <p style="margin:0 0 12px;font-size:12px;font-weight:600;text-transform:uppercase;color:#666;">Datos</p>
      <p style="margin:4px 0;font-size:15px;"><strong>${escapeHtml(data.fullName)}</strong></p>
      <p style="margin:4px 0;font-size:14px;color:#555;">${escapeHtml(data.email)} · ${escapeHtml(data.phone)}</p>
      <p style="margin:4px 0;font-size:14px;color:#555;">DNI/CUIT: ${escapeHtml(data.dniCuit)}</p>
      <p style="margin:4px 0;font-size:14px;color:#555;">Seguro: ${data.hasInsurance ? 'Sí' : 'No'}</p>
    </div>

    <div style="padding:20px 24px;border-bottom:1px solid #eaeaea;">
      <p style="margin:0 0 10px;font-size:12px;font-weight:600;text-transform:uppercase;color:#666;">Oficios</p>
      <div>${chips(data.trades)}</div>
    </div>

    ${
      data.licenses && data.licenses.length
        ? `<div style="padding:20px 24px;border-bottom:1px solid #eaeaea;">
      <p style="margin:0 0 10px;font-size:12px;font-weight:600;text-transform:uppercase;color:#666;">Matrículas</p>
      ${data.licenses
        .map(
          (l) =>
            `<p style="margin:4px 0;font-size:14px;color:#555;"><strong>${escapeHtml(l.trade)}:</strong> ${escapeHtml(l.number)}</p>`,
        )
        .join('')}
    </div>`
        : ''
    }

    <div style="padding:20px 24px;">
      <p style="margin:0 0 10px;font-size:12px;font-weight:600;text-transform:uppercase;color:#666;">Zonas de cobertura</p>
      <div>${chips(data.coverageZones)}</div>
    </div>
  </div>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  if (!rateLimit(req, 'notify-provider', { shortLimit: 5, dayLimit: 30 })) {
    return NextResponse.json({ error: 'Demasiadas solicitudes, probá más tarde.' }, { status: 429 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Resend no configurado' }, { status: 500 })
  }

  const data = (await req.json()) as ProviderData

  if (
    !data.fullName?.trim() ||
    !data.email?.trim() ||
    !data.phone?.trim() ||
    !data.dniCuit?.trim() ||
    !data.trades?.length ||
    !data.coverageZones?.length
  ) {
    return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
  }

  const to = process.env.NOTIFICATION_EMAIL ?? 'hola@dominium.com.ar'
  const subject = `Nuevo proveedor — ${data.fullName}`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'Dominium <hola@dominium.com.ar>',
      to,
      subject,
      html: buildHtml(data),
      reply_to: data.email,
    }),
  })

  const resData = await res.json()
  if (!res.ok) {
    return NextResponse.json({ error: 'No se pudo enviar la notificación.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true, id: resData.id })
}
