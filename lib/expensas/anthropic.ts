// Cliente mínimo sobre la Messages API. El proyecto no usa el SDK de Anthropic
// (los otros route handlers también van con fetch), así que mantenemos ese patrón.

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const ANTHROPIC_VERSION = '2023-06-01'

export class AnthropicError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'AnthropicError'
    this.status = status
  }
}

export interface LlamadaOpts {
  apiKey: string
  model: string
  maxTokens: number
  system: SystemBlock[]
  messages: unknown[]
  jsonSchema: Record<string, unknown>
  effort?: 'low' | 'medium' | 'high'
  timeoutMs?: number
}

export interface SystemBlock {
  type: 'text'
  text: string
  cache_control?: { type: 'ephemeral' }
}

// Devuelve el texto crudo del primer bloque de la respuesta. Con
// output_config.format ese texto es JSON válido según el schema.
export async function llamarConJsonSchema(opts: LlamadaOpts): Promise<string> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), opts.timeoutMs ?? 55_000)

  let res: Response
  try {
    res = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': opts.apiKey,
        'anthropic-version': ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model: opts.model,
        max_tokens: opts.maxTokens,
        system: opts.system,
        messages: opts.messages,
        output_config: {
          effort: opts.effort ?? 'medium',
          format: { type: 'json_schema', schema: opts.jsonSchema },
        },
      }),
    })
  } catch (err) {
    clearTimeout(timeout)
    if (err instanceof Error && err.name === 'AbortError') {
      throw new AnthropicError('timeout', 504)
    }
    throw new AnthropicError('network', 502)
  }
  clearTimeout(timeout)

  const data = (await res.json().catch(() => null)) as AnthropicResponse | null

  if (!res.ok || !data) {
    const detalle =
      data && typeof data === 'object' && 'error' in data
        ? String((data as { error?: { message?: string } }).error?.message ?? '')
        : ''
    throw new AnthropicError(detalle || `http_${res.status}`, res.status || 502)
  }

  if (data.stop_reason === 'max_tokens') {
    throw new AnthropicError('max_tokens', 502)
  }
  if (data.stop_reason === 'refusal') {
    throw new AnthropicError('refusal', 422)
  }

  const texto = data.content?.find((b) => b.type === 'text')?.text ?? ''
  if (!texto) throw new AnthropicError('respuesta_vacia', 502)
  return texto
}

interface AnthropicResponse {
  stop_reason?: string
  content?: Array<{ type: string; text?: string }>
}
