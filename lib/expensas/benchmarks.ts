import type { CategoriaCaphyai } from './tipos'

// Datos de referencia del mercado AMBA verificados a agosto 2026.
// NO actualizar sin fuente oficial. El motor de auditoría es el único consumidor.

export const BENCHMARK_VIGENCIA = '2026-08'

// ============================================================
// Escala SUTERH — CCT 589/10, acuerdo 87020/2026, 4ª categoría
// ============================================================

export interface EscalaSuterh {
  basico_con_vivienda: number
  basico_sin_vivienda: number
  suma_fija_remun: number
  antiguedad_por_anio: number
  provisorio: boolean
  nota?: string
}

export const ESCALA_SUTERH_4TA: Record<string, EscalaSuterh> = {
  '2026-07': {
    basico_con_vivienda: 997841,
    basico_sin_vivienda: 1146167,
    suma_fija_remun: 55000,
    antiguedad_por_anio: 11461.7,
    provisorio: false,
  },
  '2026-08': {
    basico_con_vivienda: 1016800,
    basico_sin_vivienda: 1167944,
    suma_fija_remun: 80000,
    antiguedad_por_anio: 11679.4,
    provisorio: false,
  },
  '2026-09': {
    basico_con_vivienda: 1016800,
    basico_sin_vivienda: 1167944,
    suma_fija_remun: 105000,
    antiguedad_por_anio: 11679.4,
    provisorio: true,
    nota: 'Septiembre no tiene aumento de básico (solo sube la suma fija) y el acuerdo tiene cláusula de revisión. Valor provisorio.',
  },
}

// Cargas patronales + FATERYH 6% + provisión SAC + vacaciones + ART ≈ 45% sobre el bruto.
export const CARGAS_Y_PROVISIONES_PCT = 0.45

export function periodosSuterhDisponibles(): string[] {
  return Object.keys(ESCALA_SUTERH_4TA).sort()
}

export function escalaSuterhPara(
  periodo: string | null,
): { periodo: string; escala: EscalaSuterh } | null {
  if (periodo && ESCALA_SUTERH_4TA[periodo]) {
    return { periodo, escala: ESCALA_SUTERH_4TA[periodo] }
  }
  return null
}

export interface CostoEncargadoEsperado {
  bruto: number
  costo_consorcio: number
  periodo: string
  provisorio: boolean
}

export function costoEncargadoEsperado(opts: {
  periodo: string
  conVivienda: boolean
  antiguedadAnios: number
}): CostoEncargadoEsperado | null {
  const found = escalaSuterhPara(opts.periodo)
  if (!found) return null
  const { escala } = found
  const basico = opts.conVivienda ? escala.basico_con_vivienda : escala.basico_sin_vivienda
  const antiguedad = escala.antiguedad_por_anio * Math.max(0, opts.antiguedadAnios)
  const bruto = basico + escala.suma_fija_remun + antiguedad
  return {
    bruto,
    costo_consorcio: bruto * (1 + CARGAS_Y_PROVISIONES_PCT),
    periodo: opts.periodo,
    provisorio: escala.provisorio,
  }
}

// ============================================================
// Honorarios CAPHyAI — tabla agosto/septiembre 2026
// ============================================================

export const HONORARIOS_VIGENCIA = '2026-08 a 2026-09'

// Mínimo hasta 20 UF, por categoría.
export const HONORARIO_MINIMO_HASTA_20_UF: Record<CategoriaCaphyai, number> = {
  D: 468000,
  C: 578000,
  B: 708000,
  A: 933200,
  A1: 1157000,
  A2: 5722000,
}

// Adicional por UF por encima de las primeras 20, por tramo.
// Tramos: 21-40 · 41-50 · 51-60 · 61-70 · 71-80 · 81-100 · 101+
const TRAMOS_UF: Array<[desde: number, hasta: number]> = [
  [21, 40],
  [41, 50],
  [51, 60],
  [61, 70],
  [71, 80],
  [81, 100],
  [101, Number.POSITIVE_INFINITY],
]

export const ADICIONAL_POR_UF: Record<Exclude<CategoriaCaphyai, 'A2'>, number[]> = {
  D: [21600, 18200, 16200, 15000, 13300, 11300, 9900],
  C: [26600, 22000, 19400, 17400, 15800, 14300, 11300],
  B: [28400, 27000, 23700, 22400, 19200, 17500, 14300],
  A: [29500, 28000, 26600, 24700, 23700, 22000, 19100],
  A1: [32500, 29500, 27700, 26700, 24900, 23700, 20100],
}

// Cocheras, guardacoches y bauleras computan 0,5 UF cada una para el honorario.
export const UF_POR_UNIDAD_COMPLEMENTARIA = 0.5

export function unidadesFuncionalesComputables(uf: number, complementarias: number): number {
  return uf + Math.max(0, complementarias) * UF_POR_UNIDAD_COMPLEMENTARIA
}

export function honorarioEsperado(categoria: CategoriaCaphyai, ufComputables: number): number {
  const base = HONORARIO_MINIMO_HASTA_20_UF[categoria]
  if (categoria === 'A2' || ufComputables <= 20) return base
  const tabla = ADICIONAL_POR_UF[categoria]
  let total = base
  for (let i = 0; i < TRAMOS_UF.length; i++) {
    const [desde, hasta] = TRAMOS_UF[i]
    if (ufComputables < desde) break
    const tope = Math.min(Math.floor(ufComputables), hasta)
    const unidadesEnTramo = tope - desde + 1
    if (unidadesEnTramo > 0) total += unidadesEnTramo * tabla[i]
  }
  return total
}

export interface InferenciaCategoria {
  categoria: CategoriaCaphyai
  motivo: string
}

// D = vivienda social · C = servicios comunes · B = servicios centrales
// A = hasta 2 amenities · A1 = 3 o más amenities · A2 = torres/complejos 200+ UF
export function inferirCategoria(perfil: {
  vivienda_social: boolean | null
  torre_o_complejo: boolean | null
  amenities: number | null
  servicios_centrales: boolean | null
  uf: number | null
}): InferenciaCategoria {
  if (perfil.vivienda_social) {
    return { categoria: 'D', motivo: 'Vivienda social (FONAVI, BHN o institutos provinciales).' }
  }
  const uf = perfil.uf ?? 0
  if (uf >= 200 && (perfil.torre_o_complejo || uf >= 200)) {
    return { categoria: 'A2', motivo: 'Torre o complejo de 200 UF o más.' }
  }
  const amenities = perfil.amenities ?? 0
  if (amenities >= 3) {
    return { categoria: 'A1', motivo: '3 o más amenities.' }
  }
  if (amenities >= 1) {
    return { categoria: 'A', motivo: `${amenities} amenity${amenities > 1 ? '/amenities' : ''} (hasta 2).` }
  }
  if (perfil.servicios_centrales) {
    return {
      categoria: 'B',
      motivo: 'Servicios centrales (calefacción, climatización o servicio compartido por 2 o más unidades).',
    }
  }
  return { categoria: 'C', motivo: 'Servicios comunes, sin amenities ni servicios centrales.' }
}

// ============================================================
// Aranceles complementarios CAPHyAI — agosto/septiembre 2026
// NO son honorarios: deben figurar por separado y facturados.
// ============================================================

export const ARANCELES_CAPHYAI: Record<string, number> = {
  certificado_de_expensas: 99000,
  ddjj_laboral_previsional_fiscal_judicial: 156000,
  rpa_ley_941_ddjj_anual: 203000,
  rpa_gestion_qr: 52000,
  rpa_escaneo_mensual: 99000,
  contestacion_de_oficios: 99000,
  asamblea_extraordinaria: 99000,
  mediacion_por_audiencia: 124000,
  convenio_de_pago: 155000,
  gestion_afip_por_tramite: 43000,
  ddjj_registro_empleadores_caba: 186000,
  anses_certificacion_de_servicios: 266000,
  art_liquidacion_de_siniestros: 78000,
  art_27_cct_activacion_y_cobro: 260000,
  rendicion_final_y_traspaso: 259000,
}

export const NO_INCLUIDO_EN_HONORARIO = [
  'IVA',
  'impuestos provinciales',
  'servicios de computación',
  'comisiones por gestión de cobranzas',
]

export const PALABRAS_COMPUTACION = ['computación', 'computacion', 'sistemas', 'software']

// Si los aranceles superan este % del honorario base de forma recurrente → honorario disfrazado.
export const ARANCELES_PCT_HONORARIO_ALERTA = 0.3
