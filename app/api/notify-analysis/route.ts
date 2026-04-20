import { NextRequest, NextResponse } from 'next/server'

interface LeadData {
  nombre: string
  localidad: string
  whatsapp: string
}

interface Rubro {
  nombre: string
  monto: number
  estado: 'normal' | 'elevado' | 'alerta'
  comentario: string
}

interface AnalysisResult {
  edificio_detectado: string | null
  periodo: string | null
  total_expensas: number | null
  unidad: string | null
  rubros: Rubro[]
  items_sin_detalle: string[]
  conclusion: {
    resumen: string
    ahorro_estimado: string
    principal_problema: string
  }
}

function formatMonto(n: number | null): string {
  return n !== null ? `$${n.toLocaleString('es-AR')}` : '—'
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function buildHtml(lead: LeadData, result: AnalysisResult): string {
  const waDigits = lead.whatsapp.replace(/\D/g, '')

  const rubrosRows = result.rubros
    .map((r) => {
      const color =
        r.estado === 'alerta'
          ? '#C0392B'
          : r.estado === 'elevado'
            ? '#B45309'
            : '#1A7A4A'
      const bg =
        r.estado === 'alerta'
          ? '#FEF2F2'
          : r.estado === 'elevado'
            ? '#FFFBEB'
            : '#F0FAF5'
      return `<tr>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;">${escapeHtml(r.nombre)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:right;font-variant-numeric:tabular-nums;">${formatMonto(r.monto)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;">
          <span style="display:inline-block;padding:2px 8px;border-radius:999px;background:${bg};color:${color};font-size:11px;font-weight:600;text-transform:uppercase;">${r.estado}</span>
        </td>
      </tr>`
    })
    .join('')

  const sinDetalle =
    result.items_sin_detalle.length > 0
      ? `<p style="margin:16px 0 0;font-size:13px;color:#666;"><strong>Sin detalle:</strong> ${escapeHtml(result.items_sin_detalle.join(', '))}</p>`
      : ''

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#FAFAF8;color:#1a1a1a;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eaeaea;">
    <div style="padding:20px 24px;background:#3B7DD8;color:#fff;">
      <p style="margin:0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.85;">Dominium · Vero</p>
      <h1 style="margin:4px 0 0;font-size:20px;">Nuevo análisis de expensas</h1>
    </div>

    <div style="padding:20px 24px;border-bottom:1px solid #eaeaea;">
      <p style="margin:0 0 12px;font-size:12px;font-weight:600;text-transform:uppercase;color:#666;">Datos del contacto</p>
      <p style="margin:4px 0;font-size:15px;"><strong>${escapeHtml(lead.nombre)}</strong></p>
      <p style="margin:4px 0;font-size:14px;color:#555;">${escapeHtml(lead.localidad)}</p>
      <p style="margin:4px 0;font-size:14px;">
        <a href="https://wa.me/${waDigits}" style="color:#25D366;text-decoration:none;font-weight:600;">WhatsApp: ${escapeHtml(lead.whatsapp)}</a>
      </p>
    </div>

    <div style="padding:20px 24px;">
      <p style="margin:0 0 12px;font-size:12px;font-weight:600;text-transform:uppercase;color:#666;">Liquidación analizada</p>
      <p style="margin:4px 0;font-size:14px;"><strong>Edificio:</strong> ${escapeHtml(result.edificio_detectado ?? '—')}</p>
      <p style="margin:4px 0;font-size:14px;"><strong>Período:</strong> ${escapeHtml(result.periodo ?? '—')}</p>
      <p style="margin:4px 0;font-size:14px;"><strong>Total:</strong> ${formatMonto(result.total_expensas)}</p>

      <table style="width:100%;border-collapse:collapse;margin-top:16px;font-size:14px;">
        <thead>
          <tr style="background:#FAFAF8;">
            <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;color:#666;">Rubro</th>
            <th style="padding:10px 12px;text-align:right;font-size:12px;text-transform:uppercase;color:#666;">Monto</th>
            <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;color:#666;">Estado</th>
          </tr>
        </thead>
        <tbody>${rubrosRows}</tbody>
      </table>
      ${sinDetalle}
    </div>

    <div style="padding:20px 24px;background:#EAF2FB;border-top:3px solid #3B7DD8;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;color:#666;">Conclusión</p>
      <p style="margin:0 0 12px;font-size:14px;line-height:1.5;">${escapeHtml(result.conclusion.resumen)}</p>
      <p style="margin:0 0 4px;font-size:14px;"><strong>Principal problema:</strong> ${escapeHtml(result.conclusion.principal_problema)}</p>
      <p style="margin:0;font-size:14px;"><strong>Ahorro estimado:</strong> ${escapeHtml(result.conclusion.ahorro_estimado)}</p>
    </div>
  </div>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Resend no configurado' }, { status: 500 })
  }

  const { lead, result } = (await req.json()) as {
    lead: LeadData
    result: AnalysisResult
  }

  const to = process.env.NOTIFICATION_EMAIL ?? 'hola@dominium.com.ar'
  const subject = `Nuevo análisis — ${lead.nombre} · ${lead.localidad}`

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
      html: buildHtml(lead, result),
      reply_to: to,
    }),
  })

  const data = await res.json()
  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }
  return NextResponse.json({ ok: true, id: data.id })
}
