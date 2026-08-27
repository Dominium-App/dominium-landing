// Contrato del analizador de expensas. Lo importan el route de /api/analyze,
// el de /api/notify-analysis y el componente del front, para que la forma del
// informe viva en un solo lugar.

export type Veredicto = 'normal' | 'elevado' | 'alerta'
export type Confianza = 'alta' | 'media' | 'baja'
export type ClaseRubro = 'ordinaria' | 'extraordinaria'
export type PerfilPersonal = 'suterh_propio' | 'tercerizado' | 'desconocido'
export type Cobertura = 'completa' | 'parcial'
export type Severidad = 'info' | 'advertencia' | 'alerta'

// Taxonomía cerrada de rubros. El extractor solo puede devolver estos ids;
// cualquier línea que no encaje va a items_sin_detalle.
export type RubroId =
  | 'sueldos_suterh'
  | 'cargas_sociales_suterh'
  | 'cuota_sindical_suterh'
  | 'honorarios_administracion'
  | 'aranceles_complementarios'
  | 'seguro_edificio'
  | 'mantenimiento_ascensor'
  | 'limpieza_materiales'
  | 'limpieza_servicio_tercerizado'
  | 'gastos_administracion_varios'
  | 'fondo_reserva'
  | 'servicios_publicos_comunes'
  | 'limpieza_tanque'
  | 'matafuegos'
  | 'control_plagas'
  | 'jardineria'
  | 'bombas_portero_electrico'
  | 'gastos_bancarios'
  | 'intereses_mora'
  | 'honorarios_contables_legales'
  | 'seguridad_vigilancia'
  | 'obras_mejoras'
  | 'otros'

export type CategoriaCaphyai = 'D' | 'C' | 'B' | 'A' | 'A1' | 'A2'

// --- Etapa 1: extracción (la produce el LLM, la valida zod server-side) ---

export interface RubroExtraido {
  id: RubroId
  etiqueta_documento: string
  monto: number
  clase: ClaseRubro
  cita_textual: string
  confianza: Confianza
}

export interface PerfilEdificio {
  nombre: string | null
  periodo: string | null
  uf: number | null
  unidades_complementarias: number | null
  ascensores: number | null
  amenities: number | null
  amenities_detalle: string[]
  servicios_centrales: boolean | null
  vivienda_social: boolean | null
  torre_o_complejo: boolean | null
  perfil_personal: PerfilPersonal
  encargado_con_vivienda: boolean | null
  encargado_antiguedad_anios: number | null
}

export interface Extraccion {
  es_liquidacion_valida: boolean
  mensaje_error: string | null
  edificio: PerfilEdificio
  total_declarado: number | null
  rubros: RubroExtraido[]
  items_sin_detalle: string[]
}

// --- Etapa 2: auditoría (TypeScript puro, determinístico) ---

export interface RubroAuditado {
  id: RubroId
  etiqueta: string
  monto: number
  clase: ClaseRubro
  pct_sobre_ordinarias: number | null
  veredicto: Veredicto
  exceso_estimado: number
  cita_textual: string
  confianza: Confianza
  motivo: string
  banda_calibrada: boolean
}

export interface Hallazgo {
  codigo: string
  severidad: Severidad
  titulo: string
  detalle: string
  rubros_afectados: RubroId[]
}

export interface Totales {
  total_declarado: number | null
  total_ordinarias: number
  total_extraordinarias: number
  suma_items_leidos: number
  desvio_cobertura_pct: number | null
}

export interface Metricas {
  costo_por_uf: number | null
  ahorro_estimado_mensual: number
}

export interface Conclusion {
  resumen: string
  principal_problema: string
}

export interface Informe {
  es_liquidacion_valida: boolean
  mensaje_error: string | null
  cobertura: Cobertura
  edificio: {
    nombre: string | null
    periodo: string | null
    uf: number | null
    unidades_complementarias: number | null
    ascensores: number | null
    amenities: number | null
    servicios_centrales: boolean | null
    perfil_personal: PerfilPersonal
    categoria_caphyai: CategoriaCaphyai | null
  }
  totales: Totales
  rubros: RubroAuditado[]
  items_sin_detalle: string[]
  hallazgos: Hallazgo[]
  metricas: Metricas
  conclusion: Conclusion
}

// --- Respuesta del endpoint ---

export interface MetaAnalisis {
  motor_version: string
  benchmark_vigencia: string
  escala_periodo_usada: string | null
  redaccion: 'llm' | 'template'
}

export interface RespuestaAnalisis {
  ok: boolean
  informe?: Informe
  meta?: MetaAnalisis
  error?: string
}
