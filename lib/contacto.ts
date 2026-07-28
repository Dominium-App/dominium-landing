const WHATSAPP_BASE = 'https://wa.me/5491172936904'

export const whatsapp = (texto: string) =>
  `${WHATSAPP_BASE}?text=${encodeURIComponent(texto)}`

export const WHATSAPP_VECINO = whatsapp(
  'Hola Vero, quiero saber más de Dominium para mi edificio',
)

export const WHATSAPP_CONSEJO = whatsapp(
  'Hola Vero, soy del consejo de mi edificio y quiero saber cómo llevar Dominium al consorcio',
)
