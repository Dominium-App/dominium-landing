import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'
import type { RespuestaAnalisis } from '@/lib/expensas/tipos'
import {
  firmaCoincide,
  MAX_BASE64_LENGTH,
  MEDIA_TYPES_PERMITIDOS,
} from '@/lib/expensas/archivo'
import { extraer } from '@/lib/expensas/extraccion'
import { auditarLiquidacion, MOTOR_VERSION } from '@/lib/expensas/motor'
import { BENCHMARK_VIGENCIA } from '@/lib/expensas/benchmarks'
import { REDACCION_HABILITADA, redactarConclusion } from '@/lib/expensas/redaccion'
import { construirConclusionTemplate } from '@/lib/expensas/plantilla-conclusion'
import { AnthropicError } from '@/lib/expensas/anthropic'

export const maxDuration = 60

function error(mensaje: string, status: number): NextResponse<RespuestaAnalisis> {
  return NextResponse.json({ ok: false, error: mensaje }, { status })
}

export async function POST(req: NextRequest): Promise<NextResponse<RespuestaAnalisis>> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return error('El analizador no está disponible en este momento.', 500)
  }

  if (!rateLimit(req, 'analyze', { shortLimit: 5, dayLimit: 50 })) {
    return error(
      'Hiciste varios análisis seguidos. Esperá unos minutos y probá de nuevo.',
      429,
    )
  }

  let payload: { base64?: unknown; mediaType?: unknown }
  try {
    payload = await req.json()
  } catch {
    return error('No pudimos leer el archivo que enviaste.', 400)
  }

  const { base64, mediaType } = payload
  if (typeof base64 !== 'string' || typeof mediaType !== 'string') {
    return error('Falta el archivo o su tipo.', 400)
  }
  if (!MEDIA_TYPES_PERMITIDOS.has(mediaType)) {
    return error('Ese formato no está soportado. Subí un PDF, JPG, PNG o WEBP.', 400)
  }
  if (base64.length > MAX_BASE64_LENGTH) {
    return error('El archivo es muy grande. Probá con uno de menos de 10MB.', 413)
  }
  if (!firmaCoincide(base64, mediaType)) {
    return error('El archivo parece dañado o no es del tipo que dice ser.', 400)
  }

  // --- Etapa 1: extracción ---
  let extraccion
  try {
    extraccion = await extraer(base64, mediaType, apiKey)
  } catch (err) {
    const detalle = err instanceof Error ? err.message : String(err)
    const status = err instanceof AnthropicError ? err.status : 0
    console.error(`[analyze] etapa 1 falló (status ${status}): ${detalle}`)

    const debug = process.env.ANALYZE_DEBUG === '1' ? { detalle, status } : {}

    if (status === 504 || detalle === 'timeout') {
      return NextResponse.json(
        { ok: false, error: 'El análisis tardó demasiado. Probá de nuevo en un momento.', ...debug },
        { status: 504 },
      )
    }
    if (status === 401 || status === 403) {
      return NextResponse.json(
        { ok: false, error: 'El analizador no está bien configurado.', ...debug },
        { status: 500 },
      )
    }
    if (status === 429 || /credit balance|credits|quota/i.test(detalle)) {
      return NextResponse.json(
        { ok: false, error: 'El analizador está sin capacidad por ahora. Probá más tarde.', ...debug },
        { status: 429 },
      )
    }
    return NextResponse.json(
      { ok: false, error: 'No pudimos completar el análisis. Probá de nuevo en un momento.', ...debug },
      { status: 502 },
    )
  }

  // --- Etapa 2: auditoría determinística ---
  const { informe, escala_periodo_usada } = auditarLiquidacion(extraccion, {
    periodoFallbackSuterh: BENCHMARK_VIGENCIA,
  })

  // --- Etapa 3: redacción (opcional, con fallback a template) ---
  let fuenteRedaccion: 'llm' | 'template' = 'template'
  if (informe.es_liquidacion_valida && REDACCION_HABILITADA) {
    try {
      informe.conclusion = await redactarConclusion(informe, apiKey)
      fuenteRedaccion = 'llm'
    } catch {
      informe.conclusion = construirConclusionTemplate(informe)
    }
  } else if (informe.es_liquidacion_valida) {
    informe.conclusion = construirConclusionTemplate(informe)
  }

  return NextResponse.json({
    ok: true,
    informe,
    meta: {
      motor_version: MOTOR_VERSION,
      benchmark_vigencia: BENCHMARK_VIGENCIA,
      escala_periodo_usada,
      redaccion: fuenteRedaccion,
    },
  })
}
