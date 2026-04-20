import { NextRequest, NextResponse } from 'next/server'

interface ContactData {
  name: string
  contact: string
  message: string
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function buildHtml(data: ContactData): string {
  const messageHtml = escapeHtml(data.message || '(sin mensaje)').replace(/\n/g, '<br/>')

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#FAFAF8;color:#1a1a1a;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eaeaea;">
    <div style="padding:20px 24px;background:#3B7DD8;color:#fff;">
      <p style="margin:0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.85;">Dominium · Administradores</p>
      <h1 style="margin:4px 0 0;font-size:20px;">Nueva consulta de contacto</h1>
    </div>

    <div style="padding:20px 24px;border-bottom:1px solid #eaeaea;">
      <p style="margin:0 0 12px;font-size:12px;font-weight:600;text-transform:uppercase;color:#666;">Datos del contacto</p>
      <p style="margin:4px 0;font-size:15px;"><strong>${escapeHtml(data.name)}</strong></p>
      <p style="margin:4px 0;font-size:14px;color:#555;">${escapeHtml(data.contact)}</p>
    </div>

    <div style="padding:20px 24px;">
      <p style="margin:0 0 12px;font-size:12px;font-weight:600;text-transform:uppercase;color:#666;">Mensaje</p>
      <p style="margin:0;font-size:14px;line-height:1.6;">${messageHtml}</p>
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

  const data = (await req.json()) as ContactData

  if (!data.name?.trim() || !data.contact?.trim()) {
    return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
  }

  const to = process.env.NOTIFICATION_EMAIL ?? 'hola@dominium.com.ar'
  const subject = `Consulta de administrador — ${data.name}`

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
      reply_to: to,
    }),
  })

  const resData = await res.json()
  if (!res.ok) {
    return NextResponse.json(resData, { status: res.status })
  }
  return NextResponse.json({ ok: true, id: resData.id })
}
