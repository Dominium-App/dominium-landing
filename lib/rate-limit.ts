import { NextRequest } from 'next/server'

// Rate limit en memoria (por instancia tibia de la lambda). No es perfecto
// entre cold starts ni compartido entre instancias, pero frena el abuso basico
// de spam/costo. Para limites duros usar un store externo (Redis/Upstash).
//
// TODO: en serverless el limite efectivo es (N instancias activas x LIMIT), no
// LIMIT. Para trafico real esto tiene que ir a Vercel KV o Upstash con una
// ventana deslizante compartida entre instancias.
const buckets = new Map<string, Map<string, number[]>>()

// Barrido de claves vencidas: sin esto los Map crecen sin limite mientras la
// instancia siga viva.
const SWEEP_INTERVAL_MS = 5 * 60 * 1000
let lastSweep = Date.now()

function sweep(): void {
  const now = Date.now()
  if (now - lastSweep < SWEEP_INTERVAL_MS) return
  lastSweep = now
  const cutoff = now - DAY_WINDOW_MS
  for (const [name, map] of buckets) {
    for (const [key, arr] of map) {
      const fresh = arr.filter((t) => t > cutoff)
      if (fresh.length === 0) map.delete(key)
      else if (fresh.length !== arr.length) map.set(key, fresh)
    }
    if (map.size === 0) buckets.delete(name)
  }
}

function bucketFor(name: string): Map<string, number[]> {
  let m = buckets.get(name)
  if (!m) {
    m = new Map()
    buckets.set(name, m)
  }
  return m
}

export function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  const xri = req.headers.get('x-real-ip')
  if (xri) return xri
  return 'unknown'
}

function checkLimit(name: string, key: string, windowMs: number, limit: number): boolean {
  const map = bucketFor(name)
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

const SHORT_WINDOW_MS = 10 * 60 * 1000
const DAY_WINDOW_MS = 24 * 60 * 60 * 1000

// Devuelve true si esta permitido; false si supero el limite corto o diario.
export function rateLimit(
  req: NextRequest,
  name: string,
  opts: { shortLimit: number; dayLimit: number },
): boolean {
  sweep()
  const ip = getClientIp(req)
  if (!checkLimit(`${name}:short`, ip, SHORT_WINDOW_MS, opts.shortLimit)) return false
  if (!checkLimit(`${name}:day`, ip, DAY_WINDOW_MS, opts.dayLimit)) return false
  return true
}
