import { NextRequest, NextResponse } from 'next/server'

// Endpoint temporal de diagnóstico. Hace la request más chica posible a Anthropic
// y devuelve el status y el cuerpo crudo, para ver qué está fallando de verdad.
// Solo responde si ANALYZE_DEBUG=1. Borrar este archivo cuando termine el debug.

export const maxDuration = 30

export async function GET(_req: NextRequest) {
  if (process.env.ANALYZE_DEBUG !== '1') {
    return NextResponse.json({ error: 'deshabilitado' }, { status: 404 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ paso: 'env', ok: false, detalle: 'ANTHROPIC_API_KEY no está seteada' })
  }

  const model = process.env.ANALYZE_MODELO_EXTRACCION ?? 'claude-sonnet-5'

  // 1) Request mínima, sin structured outputs.
  const minima = await probar(apiKey, {
    model,
    max_tokens: 16,
    messages: [{ role: 'user', content: 'hola' }],
  })

  // 2) Misma request pero con output_config (lo que usa el analizador de verdad).
  const conSchema = await probar(apiKey, {
    model,
    max_tokens: 64,
    messages: [{ role: 'user', content: 'Devolvé un objeto con un campo saludo.' }],
    output_config: {
      effort: 'medium',
      format: {
        type: 'json_schema',
        schema: {
          type: 'object',
          additionalProperties: false,
          required: ['saludo'],
          properties: { saludo: { type: 'string' } },
        },
      },
    },
  })

  return NextResponse.json({
    model,
    api_key_prefix: apiKey.slice(0, 12) + '…',
    request_minima: minima,
    request_con_schema: conSchema,
  })
}

async function probar(apiKey: string, body: Record<string, unknown>) {
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    })
    const texto = await res.text()
    return {
      status: res.status,
      ok: res.ok,
      ratelimit: {
        requests_limit: res.headers.get('anthropic-ratelimit-requests-limit'),
        requests_remaining: res.headers.get('anthropic-ratelimit-requests-remaining'),
        tokens_limit: res.headers.get('anthropic-ratelimit-tokens-limit'),
        tokens_remaining: res.headers.get('anthropic-ratelimit-tokens-remaining'),
        retry_after: res.headers.get('retry-after'),
      },
      body: texto.slice(0, 1200),
    }
  } catch (err) {
    return { status: 0, ok: false, body: err instanceof Error ? err.message : String(err) }
  }
}
