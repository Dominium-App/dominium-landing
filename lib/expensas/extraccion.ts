import { z } from 'zod'
import type { Extraccion } from './tipos'
import { DESCRIPCION_RUBRO, RUBRO_IDS } from './taxonomia.ts'
import { llamarConJsonSchema, type SystemBlock } from './anthropic.ts'

export const MODELO_EXTRACCION = process.env.ANALYZE_MODELO_EXTRACCION ?? 'claude-opus-5'
export const EFFORT_EXTRACCION =
  (process.env.ANALYZE_EFFORT_EXTRACCION as 'low' | 'medium' | 'high' | undefined) ?? 'medium'

// ============================================================
// Validación server-side (zod). El motor nunca ve datos sin validar.
// ============================================================

const rubroIdEnum = z.enum(RUBRO_IDS as [string, ...string[]])
const confianzaEnum = z.enum(['alta', 'media', 'baja'])
const claseEnum = z.enum(['ordinaria', 'extraordinaria'])

const rubroSchema = z.object({
  id: rubroIdEnum,
  etiqueta_documento: z.string(),
  monto: z.number().finite().nonnegative(),
  clase: claseEnum,
  cita_textual: z.string().min(1),
  confianza: confianzaEnum,
})

export const extraccionSchema = z.object({
  es_liquidacion_valida: z.boolean(),
  mensaje_error: z.string().nullable(),
  edificio: z.object({
    nombre: z.string().nullable(),
    periodo: z.string().nullable(),
    uf: z.number().finite().nonnegative().nullable(),
    unidades_complementarias: z.number().finite().nonnegative().nullable(),
    ascensores: z.number().finite().nonnegative().nullable(),
    amenities: z.number().finite().nonnegative().nullable(),
    amenities_detalle: z.array(z.string()),
    servicios_centrales: z.boolean().nullable(),
    vivienda_social: z.boolean().nullable(),
    torre_o_complejo: z.boolean().nullable(),
    perfil_personal: z.enum(['suterh_propio', 'tercerizado', 'desconocido']),
    encargado_con_vivienda: z.boolean().nullable(),
    encargado_antiguedad_anios: z.number().finite().nonnegative().nullable(),
  }),
  total_declarado: z.number().finite().nonnegative().nullable(),
  rubros: z.array(rubroSchema),
  items_sin_detalle: z.array(z.string()),
})

export function parseExtraccion(raw: unknown): Extraccion {
  return extraccionSchema.parse(raw) as Extraccion
}

// ============================================================
// JSON Schema para output_config.format.
// (No admite minLength / minimum / maximum: eso lo cubre zod y el prompt.)
// ============================================================

function nullable(schema: Record<string, unknown>) {
  return { anyOf: [schema, { type: 'null' }] }
}

export const EXTRACCION_JSON_SCHEMA: Record<string, unknown> = {
  type: 'object',
  additionalProperties: false,
  required: [
    'es_liquidacion_valida',
    'mensaje_error',
    'edificio',
    'total_declarado',
    'rubros',
    'items_sin_detalle',
  ],
  properties: {
    es_liquidacion_valida: { type: 'boolean' },
    mensaje_error: nullable({ type: 'string' }),
    edificio: {
      type: 'object',
      additionalProperties: false,
      required: [
        'nombre',
        'periodo',
        'uf',
        'unidades_complementarias',
        'ascensores',
        'amenities',
        'amenities_detalle',
        'servicios_centrales',
        'vivienda_social',
        'torre_o_complejo',
        'perfil_personal',
        'encargado_con_vivienda',
        'encargado_antiguedad_anios',
      ],
      properties: {
        nombre: nullable({ type: 'string' }),
        periodo: nullable({ type: 'string' }),
        uf: nullable({ type: 'number' }),
        unidades_complementarias: nullable({ type: 'number' }),
        ascensores: nullable({ type: 'number' }),
        amenities: nullable({ type: 'number' }),
        amenities_detalle: { type: 'array', items: { type: 'string' } },
        servicios_centrales: nullable({ type: 'boolean' }),
        vivienda_social: nullable({ type: 'boolean' }),
        torre_o_complejo: nullable({ type: 'boolean' }),
        perfil_personal: { type: 'string', enum: ['suterh_propio', 'tercerizado', 'desconocido'] },
        encargado_con_vivienda: nullable({ type: 'boolean' }),
        encargado_antiguedad_anios: nullable({ type: 'number' }),
      },
    },
    total_declarado: nullable({ type: 'number' }),
    rubros: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'etiqueta_documento', 'monto', 'clase', 'cita_textual', 'confianza'],
        properties: {
          id: { type: 'string', enum: RUBRO_IDS },
          etiqueta_documento: { type: 'string' },
          monto: { type: 'number' },
          clase: { type: 'string', enum: ['ordinaria', 'extraordinaria'] },
          cita_textual: { type: 'string' },
          confianza: { type: 'string', enum: ['alta', 'media', 'baja'] },
        },
      },
    },
    items_sin_detalle: { type: 'array', items: { type: 'string' } },
  },
}

// ============================================================
// System prompt (estable → se cachea).
// ============================================================

const TAXONOMIA_TEXTO = RUBRO_IDS.map((id) => `- ${id}: ${DESCRIPCION_RUBRO[id]}`).join('\n')

export const SYSTEM_EXTRACCION = `Sos el extractor de liquidaciones de expensas de Dominium, administradora de consorcios del AMBA.

Tu único trabajo es LEER y NORMALIZAR lo que dice el documento. No calculás porcentajes, no comparás con ningún valor de mercado, no emitís veredictos. Eso lo hace otro sistema después.

TAXONOMÍA DE RUBROS (usá exactamente estos identificadores):
${TAXONOMIA_TEXTO}

REGLAS
1. Para cada línea con un monto, elegí el id de la taxonomía que mejor corresponda y transcribí en "cita_textual" la línea tal cual figura en el documento (sin reescribirla).
2. PROHIBIDO devolver un rubro sin "cita_textual". Si ves un concepto pero no podés citar la línea textual, no lo pongas en "rubros": va como string en "items_sin_detalle".
3. No sumes ni infieras montos que no estén escritos. Si un número está ilegible, el ítem va a "items_sin_detalle".
4. "clase": "extraordinaria" solo si el documento lo indica (expensa extraordinaria, fondo de obra, cuota de obra). Ante la duda, "ordinaria".
5. "confianza": "alta" si el monto y el concepto se leen sin ambigüedad; "media" si tuviste que interpretar; "baja" si es dudoso.
6. Diferenciá SIEMPRE limpieza_materiales (solo insumos descartables) de limpieza_servicio_tercerizado (factura de empresa con CUIT que provee personal). Nunca los unifiques.
7. "total_declarado": el total de expensas del período que figura en el documento (o del total del edificio, no el de una unidad), o null si no está.

PERFIL DEL EDIFICIO (campo "edificio")
- "uf": cantidad de unidades funcionales del edificio. "unidades_complementarias": cocheras, bauleras, guardacoches.
- "ascensores": cantidad de equipos.
- "amenities": cantidad de amenities (SUM, pileta, gimnasio, solárium, sauna, laundry, coworking...). "amenities_detalle": la lista.
- "servicios_centrales": true si hay calefacción central, agua caliente central, climatización central o cualquier servicio compartido por 2+ unidades.
- "vivienda_social": true si es FONAVI, BHN o instituto provincial de vivienda.
- "torre_o_complejo": true si el documento lo describe como torre o complejo.
- "perfil_personal": "suterh_propio" si hay sueldo de encargado > 0; "tercerizado" si no hay sueldo propio pero sí factura de empresa de limpieza; "desconocido" si no se puede determinar.
- "encargado_con_vivienda": true si el encargado tiene vivienda en el edificio (suele figurar como "con vivienda" / "sin vivienda" en la escala aplicada).
- "encargado_antiguedad_anios": años de antigüedad del encargado si figuran, si no null.

Si el documento NO es una liquidación de expensas, devolvé "es_liquidacion_valida": false y explicá brevemente en "mensaje_error" (castellano rioplatense, sin tecnicismos). En ese caso "rubros" e "items_sin_detalle" van vacíos.`

// ============================================================
// Llamada
// ============================================================

export async function extraer(
  base64: string,
  mediaType: string,
  apiKey: string,
): Promise<Extraccion> {
  const isPdf = mediaType === 'application/pdf'
  const documentBlock = isPdf
    ? { type: 'document', source: { type: 'base64', media_type: mediaType, data: base64 } }
    : { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } }

  const system: SystemBlock[] = [
    { type: 'text', text: SYSTEM_EXTRACCION, cache_control: { type: 'ephemeral' } },
  ]

  const messages = [
    {
      role: 'user',
      content: [
        documentBlock,
        { type: 'text', text: 'Extraé la liquidación según el schema.' },
      ],
    },
  ]

  let ultimoError: unknown
  for (let intento = 0; intento < 2; intento++) {
    const texto = await llamarConJsonSchema({
      apiKey,
      model: MODELO_EXTRACCION,
      maxTokens: 8000,
      effort: EFFORT_EXTRACCION,
      system,
      messages,
      jsonSchema: EXTRACCION_JSON_SCHEMA,
      timeoutMs: 42_000,
    })
    try {
      return parseExtraccion(JSON.parse(texto))
    } catch (err) {
      ultimoError = err
    }
  }
  throw ultimoError instanceof Error ? ultimoError : new Error('extraccion_invalida')
}
