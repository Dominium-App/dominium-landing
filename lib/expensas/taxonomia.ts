import type { RubroId } from './tipos'

// Etiqueta para mostrar al propietario (castellano rioplatense, sin jerga).
export const ETIQUETAS_RUBRO: Record<RubroId, string> = {
  sueldos_suterh: 'Sueldos del encargado (SUTERH)',
  cargas_sociales_suterh: 'Cargas sociales del encargado',
  cuota_sindical_suterh: 'Cuota sindical SUTERH / FATERYH',
  honorarios_administracion: 'Honorarios de administración',
  aranceles_complementarios: 'Aranceles complementarios',
  seguro_edificio: 'Seguro del edificio',
  mantenimiento_ascensor: 'Mantenimiento de ascensores',
  limpieza_materiales: 'Limpieza — materiales e insumos',
  limpieza_servicio_tercerizado: 'Limpieza — servicio tercerizado',
  gastos_administracion_varios: 'Gastos de administración varios',
  fondo_reserva: 'Fondo de reserva',
  servicios_publicos_comunes: 'Servicios públicos de espacios comunes',
  limpieza_tanque: 'Limpieza y desinfección de tanque',
  matafuegos: 'Matafuegos',
  control_plagas: 'Control de plagas',
  jardineria: 'Jardinería',
  bombas_portero_electrico: 'Bombas y portero eléctrico',
  gastos_bancarios: 'Gastos y comisiones bancarias',
  intereses_mora: 'Intereses por mora',
  honorarios_contables_legales: 'Honorarios contables y legales',
  seguridad_vigilancia: 'Seguridad y vigilancia',
  obras_mejoras: 'Obras y mejoras',
  otros: 'Otros gastos',
}

// Descripción corta que se le pasa al extractor para que mapee cada línea del
// documento al id correcto.
export const DESCRIPCION_RUBRO: Record<RubroId, string> = {
  sueldos_suterh: 'sueldo básico, suma fija, antigüedad, presentismo y aguinaldo del encargado propio.',
  cargas_sociales_suterh: 'aportes y contribuciones patronales, ART del personal propio, seguro de sepelio.',
  cuota_sindical_suterh: 'cuota sindical SUTERH, FATERYH 6%, cuota mutual, aportes gremiales.',
  honorarios_administracion: 'honorario mensual del administrador (CAPHyAI). No incluye aranceles ni IVA.',
  aranceles_complementarios: 'certificados de deuda, DDJJ, RPA Ley 941, oficios, mediaciones, gestiones AFIP/ANSES, rendición final.',
  seguro_edificio: 'póliza integral de consorcio, incendio, RC, cristales.',
  mantenimiento_ascensor: 'abono mensual de conservación de ascensores. Reparaciones y repuestos van aparte.',
  limpieza_materiales: 'solo insumos y productos descartables de limpieza. Nunca mano de obra.',
  limpieza_servicio_tercerizado: 'factura de empresa con CUIT que provee personal de limpieza externo.',
  gastos_administracion_varios: 'fotocopias, correo, librería, movilidad, gastos menores de gestión.',
  fondo_reserva: 'aporte al fondo de reserva del consorcio.',
  servicios_publicos_comunes: 'luz, gas y agua de espacios comunes (palier, ascensor, bombas, luces de emergencia).',
  limpieza_tanque: 'limpieza y desinfección periódica del tanque de agua con certificado.',
  matafuegos: 'recarga y control de matafuegos, mantenimiento de red de incendio.',
  control_plagas: 'desinfección, desratización y desinsectación.',
  jardineria: 'mantenimiento de jardines y espacios verdes comunes.',
  bombas_portero_electrico: 'mantenimiento de bombas de agua, presurizadoras y portero eléctrico.',
  gastos_bancarios: 'comisiones de cuenta, mantenimiento, transferencias, chequeras.',
  intereses_mora: 'intereses y punitorios por pagos fuera de término trasladados a expensas.',
  honorarios_contables_legales: 'honorarios de contador o abogado del consorcio no incluidos en la administración.',
  seguridad_vigilancia: 'servicio de vigilancia, monitoreo de alarmas, cámaras.',
  obras_mejoras: 'obras, refacciones y mejoras. Suelen ser expensa extraordinaria.',
  otros: 'cualquier gasto que no encaje en las categorías anteriores pero que igual figure con un monto.',
}

export const RUBRO_IDS = Object.keys(ETIQUETAS_RUBRO) as RubroId[]

export function esRubroId(x: unknown): x is RubroId {
  return typeof x === 'string' && x in ETIQUETAS_RUBRO
}

export function etiquetaRubro(id: RubroId): string {
  return ETIQUETAS_RUBRO[id]
}
