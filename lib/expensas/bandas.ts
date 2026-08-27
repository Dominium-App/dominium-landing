import type { RubroId, Veredicto } from './tipos'

// Tabla de configuración de bandas, separada del motor.
// Los porcentajes son sobre el total de expensas ORDINARIAS.
//
// calibrada: true  → apoyada en datos reales de agosto 2026 (escalas y tablas
//                    oficiales, muestras de liquidaciones del AMBA):
//                    sueldos, honorarios, seguro, ascensores, limpieza, administración.
// calibrada: false → estimación inicial. Recalibrar con liquidaciones reales.

export interface BandaRubro {
  normal_max_pct: number
  elevado_max_pct: number
  calibrada: boolean
  nota?: string
}

export const BANDAS: Record<RubroId, BandaRubro> = {
  sueldos_suterh: {
    normal_max_pct: 45,
    elevado_max_pct: 55,
    calibrada: true,
    nota: 'El motor prioriza el contraste contra la escala SUTERH del período de la liquidación; la banda es respaldo.',
  },
  cargas_sociales_suterh: {
    normal_max_pct: 18,
    elevado_max_pct: 24,
    calibrada: true,
    nota: 'Deriva del 45% de cargas y provisiones sobre el bruto del encargado.',
  },
  cuota_sindical_suterh: {
    normal_max_pct: 4,
    elevado_max_pct: 7,
    calibrada: false,
  },
  honorarios_administracion: {
    normal_max_pct: 9,
    elevado_max_pct: 11,
    calibrada: true,
    nota: 'CAPHyAI ago-sep 2026. El motor además compara contra el honorario esperado por categoría y UF.',
  },
  aranceles_complementarios: {
    normal_max_pct: 3,
    elevado_max_pct: 5,
    calibrada: true,
    nota: 'Manda la regla de aranceles vs honorario base: >30% recurrente = honorario disfrazado.',
  },
  seguro_edificio: {
    normal_max_pct: 5,
    elevado_max_pct: 6,
    calibrada: true,
  },
  mantenimiento_ascensor: {
    normal_max_pct: 5,
    elevado_max_pct: 8,
    calibrada: true,
    nota: 'Por equipo. El motor divide el porcentaje del rubro por la cantidad de ascensores.',
  },
  limpieza_materiales: {
    normal_max_pct: 7,
    elevado_max_pct: 10,
    calibrada: true,
    nota: 'Aplica cuando hay encargado propio. Solo insumos: si hay mano de obra acá, es doble facturación.',
  },
  limpieza_servicio_tercerizado: {
    normal_max_pct: 40,
    elevado_max_pct: 45,
    calibrada: true,
    nota: 'Aplica cuando NO hay encargado propio. Por debajo de 15% también se marca (servicio deficiente o costo oculto).',
  },
  gastos_administracion_varios: {
    normal_max_pct: 5,
    elevado_max_pct: 6,
    calibrada: true,
    nota: 'Además se aplica la regla de opacidad si supera 4% sin desglose.',
  },
  // --- Estimaciones iniciales — recalibrar con datos reales ---
  fondo_reserva: { normal_max_pct: 12, elevado_max_pct: 18, calibrada: false },
  servicios_publicos_comunes: { normal_max_pct: 8, elevado_max_pct: 12, calibrada: false },
  limpieza_tanque: { normal_max_pct: 2, elevado_max_pct: 4, calibrada: false },
  matafuegos: { normal_max_pct: 1.5, elevado_max_pct: 3, calibrada: false },
  control_plagas: { normal_max_pct: 2, elevado_max_pct: 4, calibrada: false },
  jardineria: { normal_max_pct: 4, elevado_max_pct: 7, calibrada: false },
  bombas_portero_electrico: { normal_max_pct: 3, elevado_max_pct: 5, calibrada: false },
  gastos_bancarios: { normal_max_pct: 2, elevado_max_pct: 3.5, calibrada: false },
  intereses_mora: { normal_max_pct: 1, elevado_max_pct: 3, calibrada: false },
  honorarios_contables_legales: { normal_max_pct: 3, elevado_max_pct: 5, calibrada: false },
  seguridad_vigilancia: { normal_max_pct: 20, elevado_max_pct: 30, calibrada: false },
  obras_mejoras: {
    normal_max_pct: Number.POSITIVE_INFINITY,
    elevado_max_pct: Number.POSITIVE_INFINITY,
    calibrada: false,
    nota: 'Extraordinario: excluido del cálculo de porcentajes.',
  },
  otros: {
    normal_max_pct: 4,
    elevado_max_pct: 4,
    calibrada: false,
    nota: 'Sin desglose: manda la regla de opacidad.',
  },
}

// Regla de opacidad: rubro sin desglose que supera este % y contiene palabras cajón de sastre.
export const OPACIDAD_PCT_UMBRAL = 4
export const PALABRAS_OPACAS = [
  'varios',
  'imprevistos',
  'otros gastos',
  'gestiones generales',
  'gestion general',
]

// Check de cobertura: si la suma de ítems difiere más de esto del total declarado → informe parcial.
export const COBERTURA_DESVIO_MAX_PCT = 3

export function clasificarPorBanda(pct: number, banda: BandaRubro): Veredicto {
  if (pct <= banda.normal_max_pct) return 'normal'
  if (pct <= banda.elevado_max_pct) return 'elevado'
  return 'alerta'
}
