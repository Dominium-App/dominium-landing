import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'
import type { Informe } from '@/lib/expensas/tipos'

interface LeadData {
  nombre: string
  localidad?: string
  whatsapp: string
}

function formatMonto(n: number | null): string {
  return n !== null ? `$${Math.round(n).toLocaleString('es-AR')}` : '—'
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const COLOR_VEREDICTO: Record<Informe['rubros'][number]['veredicto'], { color: string; bg: string }> = {
  alerta: { color: '#C0392B', bg: '#FEF2F2' },
  elevado: { color: '#B45309', bg: '#FFFBEB' },
  normal: { color: '#1A7A4A', bg: '#F0FAF5' },
}

function buildHtml(lead: LeadData, informe: Informe): string {
  const waDigits = lead.whatsapp.replace(/\D/g, '')

  const rubrosRows = informe.rubros
    .map((r) => {
      const c = COLOR_VEREDICTO[r.veredicto]
      const pct = r.pct_sobre_ordinarias != null ? `${r.pct_sobre_ordinarias}%` : '—'
      return `<tr>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;">${escapeHtml(r.etiqueta)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:right;font-variant-numeric:tabular-nums;">${formatMonto(r.monto)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:right;">${pct}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;">
          <span style="display:inline-block;padding:2px 8px;border-radius:999px;background:${c.bg};color:${c.color};font-size:11px;font-weight:600;text-transform:uppercase;">${r.veredicto}</span>
        </td>
      </tr>`
    })
    .join('')

  const hallazgos =
    informe.hallazgos.filter((h) => h.severidad !== 'info').length > 0
      ? `<p style="margin:16px 0 4px;font-size:12px;font-weight:600;text-transform:uppercase;color:#666;">Hallazgos</p>
         <ul style="margin:0;padding-left:18px;font-size:13px;color:#333;">
         ${informe.hallazgos
           .filter((h) => h.severidad !== 'info')
           .map((h) => `<li style="margin:4px 0;"><strong>${escapeHtml(h.titulo)}:</strong> ${escapeHtml(h.detalle)}</li>`)
           .join('')}
         </ul>`
      : ''

  const sinDetalle =
    informe.items_sin_detalle.length > 0
      ? `<p style="margin:16px 0 0;font-size:13px;color:#666;"><strong>Sin detalle:</strong> ${escapeHtml(informe.items_sin_detalle.join(', '))}</p>`
      : ''

  const parcial =
    informe.cobertura === 'parcial'
      ? `<p style="margin:8px 0 0;font-size:13px;color:#B45309;"><strong>Informe parcial:</strong> la suma de rubros leídos difiere ${informe.totales.desvio_cobertura_pct ?? '—'}% del total declarado.</p>`
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
      ${lead.localidad ? `<p style="margin:4px 0;font-size:14px;color:#555;">${escapeHtml(lead.localidad)}</p>` : ''}
      <p style="margin:4px 0;font-size:14px;">
        <a href="https://wa.me/${waDigits}" style="color:#25D366;text-decoration:none;font-weight:600;">WhatsApp: ${escapeHtml(lead.whatsapp)}</a>
      </p>
    </div>

    <div style="padding:20px 24px;">
      <p style="margin:0 0 12px;font-size:12px;font-weight:600;text-transform:uppercase;color:#666;">Liquidación analizada</p>
      <p style="margin:4px 0;font-size:14px;"><strong>Edificio:</strong> ${escapeHtml(informe.edificio.nombre ?? '—')}</p>
      <p style="margin:4px 0;font-size:14px;"><strong>Período:</strong> ${escapeHtml(informe.edificio.periodo ?? '—')}</p>
      <p style="margin:4px 0;font-size:14px;"><strong>Total declarado:</strong> ${formatMonto(informe.totales.total_declarado)}</p>
      <p style="margin:4px 0;font-size:14px;"><strong>Categoría CAPHyAI estimada:</strong> ${informe.edificio.categoria_caphyai ?? '—'}</p>
      <p style="margin:4px 0;font-size:14px;"><strong>Costo por UF:</strong> ${formatMonto(informe.metricas.costo_por_uf)}</p>
      ${parcial}

      <table style="width:100%;border-collapse:collapse;margin-top:16px;font-size:14px;">
        <thead>
          <tr style="background:#FAFAF8;">
            <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;color:#666;">Rubro</th>
            <th style="padding:10px 12px;text-align:right;font-size:12px;text-transform:uppercase;color:#666;">Monto</th>
            <th style="padding:10px 12px;text-align:right;font-size:12px;text-transform:uppercase;color:#666;">%</th>
            <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;color:#666;">Estado</th>
          </tr>
        </thead>
        <tbody>${rubrosRows}</tbody>
      </table>
      ${hallazgos}
      ${sinDetalle}
    </div>

    <div style="padding:20px 24px;background:#EAF2FB;border-top:3px solid #3B7DD8;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;color:#666;">Conclusión</p>
      <p style="margin:0 0 12px;font-size:14px;line-height:1.5;">${escapeHtml(informe.conclusion.resumen)}</p>
      <p style="margin:0 0 4px;font-size:14px;"><strong>Principal problema:</strong> ${escapeHtml(informe.conclusion.principal_problema)}</p>
      <p style="margin:0;font-size:14px;"><strong>Ahorro estimado:</strong> ${formatMonto(informe.metricas.ahorro_estimado_mensual)} por mes</p>
    </div>
  </div>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  if (!rateLimit(req, 'notify-analysis', { shortLimit: 5, dayLimit: 30 })) {
    return NextResponse.json({ error: 'Demasiadas solicitudes, probá más tarde.' }, { status: 429 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Resend no configurado' }, { status: 500 })
  }

  let lead: LeadData
  let informe: Informe
  try {
    const body = (await req.json()) as { lead: LeadData; informe: Informe }
    lead = body.lead
    informe = body.informe
    if (!lead?.nombre || !lead?.whatsapp || !informe?.rubros) {
      throw new Error('payload incompleto')
    }
  } catch {
    return NextResponse.json({ error: 'No pudimos procesar el informe.' }, { status: 400 })
  }

  const to = process.env.NOTIFICATION_EMAIL ?? 'hola@dominium.com.ar'
  const subject = lead.localidad
    ? `Nuevo análisis — ${lead.nombre} · ${lead.localidad}`
    : `Nuevo análisis — ${lead.nombre}`

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
      html: buildHtml(lead, informe),
      reply_to: to,
    }),
  })

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    return NextResponse.json({ error: 'No se pudo enviar la notificación.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true, id: data?.id })
}
