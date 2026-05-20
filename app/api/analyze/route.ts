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
  fuente: 'CAPHAI + escala SUTERH oficiales, AMBA',
  vigencia: '2026-05',
  nota_vigencia:
    'Si el período de la liquidación analizada no coincide con esta vigencia, los montos absolutos pueden estar desactualizados. Los porcentajes sobre el total siguen siendo válidos.',

  ancla_suterh_4ta_categoria: {
    fuente: 'https://suterh.org.ar/nueva-escala-salarial-mayo-2026/',
    vigencia: '2026-05',
    basico_sin_vivienda: 1050582,
    basico_con_vivienda: 908154,
    suma_fija_remuneratoria: 80000,
    antiguedad_pct_por_anio: 1.0,
    cargas_y_provisiones_pct_total_aprox: 45,
    costo_total_mensual_estimado_consorcio: {
      sin_antiguedad_significativa: 'entre $1.500.000 y $1.700.000',
      antiguedad_tipica_8_15_anios: 'entre $1.700.000 y $2.000.000',
      con_vivienda_antiguedad_tipica: 'entre $1.500.000 y $1.800.000',
    },
    regla_validacion:
      'Si el valor extraído está fuera de ±15% de la banda esperada para la categoría inferida, marcar como elevado. Si está 20% por debajo del piso, alertar posible subdeclaración o error de liquidación.',
  },

  honorarios_administrador: {
    fuente: 'CAPHAI Tabla Honorarios Abril-Mayo 2026',
    url: 'https://caphai.com.ar/honorarios/',
    vigencia: '2026-04 a 2026-05',
    valores_base_hasta_20_UF: {
      categoria_D_vivienda_social: 424000,
      categoria_C_servicios_comunes_con_ascensor: 523000,
      categoria_B_servicios_centrales: 605000,
      categoria_A2_torres_200_UF_o_mas: 5185000,
    },
    incremental_por_UF_adicional: {
      categoria_C_21_a_40_UF: 24100,
      categoria_C_41_a_50_UF: 19900,
      categoria_B_21_a_40_UF: 24300,
    },
    no_incluye: ['IVA 21%', 'aranceles complementarios', 'servicios de computación'],
    porcentaje_sobre_total_esperado: {
      edificio_chico_sin_encargado: '8-12%',
      edificio_mediano_con_encargado: '6-9%',
      edificio_grande_con_amenities: '4-7%',
    },
    alerta_si: 'honorarios > 11% del total liquidado en expensas ordinarias',
    alerta_grave_si: 'honorarios > 14% sin amenities relevantes',
  },

  aranceles_complementarios_caphai: {
    nota: 'Estos NO son honorarios y deben aparecer por separado y facturados',
    valores: {
      certificado_de_expensas: 85000,
      ddjj_laboral_o_previsional_c_u: 141000,
      rpa_ley_941_ddjj_anual: 184000,
      gestion_qr_hipervinculo_rpa: 47000,
      asamblea_extraordinaria: 90000,
      mediacion: 112000,
    },
    regla_alerta:
      'Si la suma de aranceles complementarios supera el 30% del honorario base mensual de forma recurrente, alertar honorarios disfrazados.',
  },

  seguro_edificio: {
    porcentaje_sobre_total_esperado: {
      edificio_chico_10_15_UF: '3-7%',
      edificio_mediano_15_40_UF: '2-5%',
      edificio_grande_40_plus_UF: '1.5-4%',
    },
    alerta_si: 'supera 6% del total para edificio mediano sin pileta/amenities especiales',
    alerta_grave_si: 'supera 8% del total',
    checks_adicionales: [
      'Variación intermensual > 15% sin renovación de póliza declarada',
      "Si aparece 'comisión broker' como rubro separado es señal de transparencia",
      'Si NO aparece broker pero el rubro está claramente sobredimensionado, sospechar comisión oculta',
    ],
  },

  mantenimiento_ascensor: {
    porcentaje_sobre_total_esperado_por_ascensor: {
      abono_basico_mensual: '3-5% del total',
      abono_premium_24hs: '5-8% del total',
    },
    alerta_si: 'abono por equipo > 8% del total liquidado',
    alerta_grave_si:
      'supera 10% del total por equipo, o variación intermensual > IPC + 3pp, o se duplicó respecto al mes anterior sin obra justificada',
    checks_adicionales: [
      'Empresa debe estar habilitada por DGFyCO (GCBA)',
      "Si aparecen 'reparaciones' o 'repuestos' además del abono base, validar facturación separada",
    ],
  },

  gastos_administracion_varios: {
    porcentaje_sobre_total_esperado: '2-5%',
    alerta_si: 'supera 6% del total',
    alerta_grave_si: "supera 7% O figura como rubro sin detallar (cajón de sastre)",
    keywords_rojas: ['varios', 'imprevistos', 'gestiones generales', 'otros gastos'],
    regla: 'Si el rubro NO desglosa subpartidas y supera 4% del total, alertar opacidad',
  },

  limpieza_materiales_in_house: {
    aplica_si: 'el edificio tiene encargado SUTERH propio',
    porcentaje_sobre_total_esperado: '3-7%',
    alerta_si: 'supera 10% del total teniendo encargado',
    alerta_grave_si: 'supera 12% Y hay sueldo encargado completo (doble pago de limpieza)',
    nota:
      'Este rubro debe contener SOLO productos y materiales descartables. Si aparece mano de obra o personal acá teniendo encargado, hay clasificación errónea o doble facturación.',
  },

  perfil_tercerizado: {
    disparador:
      'el edificio NO tiene sueldo SUTERH (o es 0) Y aparece factura de empresa de limpieza con CUIT',
    rubro_empresa_limpieza_tercerizada: {
      porcentaje_sobre_total_esperado: '20-35%',
      alerta_si: 'supera 40% del total',
      alerta_grave_si: 'supera 45% sin que el edificio tenga amenities mayores',
      alerta_si_bajo:
        'menos del 15% del total - probablemente servicio deficiente o facturación oculta en otros rubros',
    },
    rubros_que_deben_estar_en_cero_en_este_perfil: [
      'Sueldos y cargas SUTERH',
      'Cuota sindical SUTERH',
      'FATERYH',
      'Vivienda del encargado',
      'Aguinaldo SUTERH',
      'ART personal propio',
    ],
    regla_inconsistencia:
      "Si sueldos SUTERH = 0 pero aparecen cargas sociales o ART asociadas, alertar inconsistencia (probable confusión de rubros).",
  },
}

const SYSTEM_PROMPT = `Sos el analizador de expensas de Dominium, empresa de administración de consorcios con base tecnológica en Argentina.

Tu trabajo es analizar liquidaciones de expensas de edificios del AMBA y detectar ítems sospechosos, inflados o sin justificación.

DATOS DE REFERENCIA DEL MERCADO (usá estos únicamente, no inventes otros):
${JSON.stringify(BENCHMARK_DATA)}

PASO 1 — DETECCIÓN DE PERFIL DEL EDIFICIO
Antes de analizar rubros individuales, determiná:
- Cantidad aproximada de unidades funcionales (UF) si está disponible.
- Categoría CAPHAI inferida (D / C / B / A2) según servicios visibles: ascensor, calefacción central, amenities, portería, vivienda del encargado.
- Si tiene encargado SUTERH propio (hay rubro "Sueldos SUTERH" > 0) o si está tercerizado (no hay sueldo SUTERH pero hay empresa de limpieza con CUIT). Esto cambia drásticamente las bandas esperadas — usá perfil_tercerizado del benchmark cuando aplique.

PASO 2 — REGLA DE CLASIFICACIÓN DE LIMPIEZA (CRÍTICA)
Diferenciá siempre estos dos rubros y nunca los unifiques:
1. "Limpieza - materiales": SOLO insumos descartables o herramientas (lavandina, detergente, trapos, bolsas, escobillones, productos químicos). Aparece como ítems sueltos o factura de proveedor de productos.
2. "Limpieza - servicio tercerizado": SOLO facturas de EMPRESA con CUIT que provee MANO DE OBRA externa. Indicios: razón social tipo "S.A.", "S.R.L.", "Servicios", "Limpieza"; monto fijo mensual; aparece la palabra "abono", "servicio" o "personal".
Si un ítem mezcla ambos en una sola línea sin desglose, asigná al rubro dominante por monto y dejá constancia en el comentario.

PASO 3 — VALIDACIÓN CRUZADA DE COHERENCIA
- Si detectás "Sueldos SUTERH = 0" pero aparecen cargas sociales, ART o cuota sindical asociadas, marcá inconsistencia en el comentario del rubro afectado.
- Si la suma de aranceles complementarios CAPHAI (certificados, DDJJ, RPA, etc.) supera el 30% del honorario base mensual, marcá los honorarios como "alerta" aunque el valor base esté dentro de banda.
- Si el rubro de honorarios contiene la palabra "computación", "sistemas" o "software" sin estar discriminado, alertar — CAPHAI lo lista como NO incluido.

PASO 4 — REGLAS GENERALES
1. Identificá todos los rubros presentes en el documento.
2. Para cada rubro determiná si está normal, elevado o es una alerta, usando los benchmarks provistos. Priorizá el porcentaje sobre el total liquidado por sobre el monto absoluto cuando ambos estén disponibles.
3. Mencioná los montos exactos que ves en el documento.
4. Si no podés leer bien algún rubro, indicalo en items_sin_detalle.
5. No inventes números que no estén en el documento.
6. Usá lenguaje directo, claro, sin tecnicismos.
7. Tono profesional pero cercano — hablás con un propietario frustrado con sus gastos.
8. Si el documento no es una liquidación de expensas, indicalo con es_liquidacion_valida: false.
9. Si el período de la liquidación es claramente posterior a la vigencia del benchmark, mencionalo brevemente en el comentario del rubro afectado y apoyate más en porcentajes que en montos absolutos.

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
    model: 'claude-sonnet-4-6',
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
