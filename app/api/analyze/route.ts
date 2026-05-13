import { NextRequest, NextResponse } from 'next/server'

// Rate limit en memoria (por instancia tibia de la lambda). No es perfecto
// entre cold starts, pero combinado con el lockdown del payload (modelo y
// max_tokens fijos abajo) limita razonablemente la exposición de costo.
const ipShortBuckets = new Map<string, number[]>()
const ipDayBuckets = new Map<string, number[]>()

const SHORT_WINDOW_MS = 10 * 60 * 1000
const SHORT_LIMIT = 5
const DAY_WINDOW_MS = 24 * 60 * 60 * 1000
const DAY_LIMIT = 50

function checkLimit(
  map: Map<string, number[]>,
  key: string,
  windowMs: number,
  limit: number,
): boolean {
  const now = Date.now()
  const cutoff = now - windowMs
  const arr = (map.get(key) ?? []).filter((t) => t > cutoff)
  if (arr.length >= limit) {
    map.set(key, arr)
    return false
  }
  arr.push(now)
  map.set(key, arr)
  return true
}

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  const xri = req.headers.get('x-real-ip')
  if (xri) return xri
  return 'unknown'
}

const ALLOWED_MEDIA_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
])

// ~10MB binario = ~14MB en base64
const MAX_BASE64_LENGTH = 14 * 1024 * 1024

const BENCHMARK_DATA = {
  fuente: 'Promedios de mercado AMBA 2024-2025, elaboración Dominium',
  rubros: [
    {
      nombre: 'Honorarios del administrador',
      referencia: 'Entre 6% y 8% del total de la liquidación',
      alerta_si: 'Supera el 10% del total',
      nota: 'El rubro con mayor variación en el mercado',
    },
    {
      nombre: 'Seguro del edificio',
      referencia:
        'Entre $80.000 y $180.000/mes para edificios de 10-30 unidades',
      alerta_si: 'Supera $220.000 para edificios pequeños o medianos',
      nota: 'Muchos administradores perciben comisión del broker sin declararlo',
    },
    {
      nombre: 'Mantenimiento de ascensor',
      referencia: 'Entre $60.000 y $120.000/mes por equipo según marca',
      alerta_si: 'Supera $150.000 por equipo sin justificación',
      nota: 'Contratos cerrados sin licitación son señal de alerta',
    },
    {
      nombre: 'Sueldo encargado (SUTERH)',
      referencia: 'Fijado por escala sindical SUTERH vigente',
      alerta_si: 'Discrepancia entre lo declarado y la escala oficial',
      nota: 'Rubro fijo. Variaciones son errores o irregularidades',
    },
    {
      nombre: 'Gastos de administración varios',
      referencia: 'No debería superar el 3-5% del total',
      alerta_si: 'Supera el 7% o los ítems no están detallados',
      nota: 'Rubro frecuentemente usado para esconder costos no justificados',
    },
    {
      nombre: 'Limpieza y productos',
      referencia: 'Entre $30.000 y $70.000/mes según tamaño del edificio',
      alerta_si: 'Supera $90.000 sin personal propio declarado',
      nota: 'Verificar si hay encargado que ya incluye limpieza',
    },
  ],
}

const SYSTEM_PROMPT = `Sos el analizador de expensas de Dominium, empresa de administración de consorcios con base tecnológica en Argentina.

Tu trabajo es analizar liquidaciones de expensas de edificios del AMBA y detectar ítems sospechosos, inflados o sin justificación.

DATOS DE REFERENCIA DEL MERCADO (usá estos únicamente, no inventes otros):
${JSON.stringify(BENCHMARK_DATA)}

REGLAS:
1. Identificá todos los rubros presentes en el documento
2. Para cada rubro determiná si está normal, elevado o es una alerta, usando los benchmarks provistos
3. Mencioná los montos exactos que ves en el documento
4. Si no podés leer bien algún rubro, indicalo en items_sin_detalle
5. No inventes números que no estén en el documento
6. Usá lenguaje directo, claro, sin tecnicismos
7. Tono profesional pero cercano — hablás con un propietario frustrado con sus gastos
8. Si el documento no es una liquidación de expensas, indicalo con es_liquidacion_valida: false

RESPONDÉ ÚNICAMENTE CON JSON PURO. Sin markdown, sin backticks, sin texto antes o después. Solo el objeto JSON:

{
  "es_liquidacion_valida": boolean,
  "mensaje_error": string | null,
  "edificio_detectado": string | null,
  "periodo": string | null,
  "total_expensas": number | null,
  "unidad": string | null,
  "rubros": [
    {
      "nombre": string,
      "monto": number,
      "estado": "normal" | "elevado" | "alerta",
      "comentario": string
    }
  ],
  "items_sin_detalle": [string],
  "conclusion": {
    "resumen": string,
    "ahorro_estimado": string,
    "principal_problema": string
  }
}`

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key no configurada' }, { status: 500 })
  }

  const ip = getClientIp(req)
  if (!checkLimit(ipShortBuckets, ip, SHORT_WINDOW_MS, SHORT_LIMIT)) {
    return NextResponse.json(
      {
        error:
          'Demasiados análisis seguidos. Esperá unos minutos antes de reintentar.',
      },
      { status: 429 },
    )
  }
  if (!checkLimit(ipDayBuckets, ip, DAY_WINDOW_MS, DAY_LIMIT)) {
    return NextResponse.json(
      { error: 'Alcanzaste el límite diario de análisis. Intentá mañana.' },
      { status: 429 },
    )
  }

  let payload: { base64?: unknown; mediaType?: unknown }
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload inválido' }, { status: 400 })
  }

  const { base64, mediaType } = payload
  if (typeof base64 !== 'string' || typeof mediaType !== 'string') {
    return NextResponse.json(
      { error: 'Falta base64 o mediaType' },
      { status: 400 },
    )
  }
  if (!ALLOWED_MEDIA_TYPES.has(mediaType)) {
    return NextResponse.json({ error: 'mediaType no soportado' }, { status: 400 })
  }
  if (base64.length > MAX_BASE64_LENGTH) {
    return NextResponse.json({ error: 'Archivo demasiado grande' }, { status: 413 })
  }

  const isPdf = mediaType === 'application/pdf'
  const documentBlock = isPdf
    ? {
        type: 'document',
        source: { type: 'base64', media_type: mediaType, data: base64 },
      }
    : {
        type: 'image',
        source: { type: 'base64', media_type: mediaType, data: base64 },
      }

  const anthropicBody = {
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: [
          documentBlock,
          {
            type: 'text',
            text: 'Analizá esta liquidación de expensas y devolvé el JSON solicitado.',
          },
        ],
      },
    ],
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(anthropicBody),
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }

  return NextResponse.json(data)
}
