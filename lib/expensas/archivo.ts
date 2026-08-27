// Validación de tipo de archivo por magic bytes: que nadie mande cualquier cosa
// declarada como image/png y termine costándonos una llamada al modelo.

export const MEDIA_TYPES_PERMITIDOS = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
])

// ~10MB binario ≈ ~14MB en base64.
export const MAX_BASE64_LENGTH = 14 * 1024 * 1024

function empiezaCon(bytes: Uint8Array, firma: number[]): boolean {
  if (bytes.length < firma.length) return false
  return firma.every((b, i) => bytes[i] === b)
}

export function firmaCoincide(base64: string, mediaType: string): boolean {
  let head: Buffer
  try {
    head = Buffer.from(base64.slice(0, 64), 'base64')
  } catch {
    return false
  }
  const bytes = new Uint8Array(head)

  switch (mediaType) {
    case 'application/pdf':
      return empiezaCon(bytes, [0x25, 0x50, 0x44, 0x46]) // %PDF
    case 'image/png':
      return empiezaCon(bytes, [0x89, 0x50, 0x4e, 0x47]) // \x89PNG
    case 'image/jpeg':
      return empiezaCon(bytes, [0xff, 0xd8, 0xff]) // \xFF\xD8\xFF
    case 'image/webp':
      // RIFF....WEBP
      return (
        empiezaCon(bytes, [0x52, 0x49, 0x46, 0x46]) &&
        bytes.length >= 12 &&
        bytes[8] === 0x57 &&
        bytes[9] === 0x45 &&
        bytes[10] === 0x42 &&
        bytes[11] === 0x50
      )
    default:
      return false
  }
}
