import type {
  ClaseRubro,
  Confianza,
  Extraccion,
  Hallazgo,
  Informe,
  RubroAuditado,
  RubroId,
  Severidad,
  Veredicto,
} from './tipos'
import { etiquetaRubro } from './taxonomia.ts'
import {
  BANDAS,
  clasificarPorBanda,
  COBERTURA_DESVIO_MAX_PCT,
  OPACIDAD_PCT_UMBRAL,
  PALABRAS_OPACAS,
} from './bandas.ts'
import {
  ARANCELES_PCT_HONORARIO_ALERTA,
  costoEncargadoEsperado,
  escalaSuterhPara,
  honorarioEsperado,
  inferirCategoria,
  PALABRAS_COMPUTACION,
  periodosSuterhDisponibles,
  unidadesFuncionalesComputables,
} from './benchmarks.ts'
import { construirConclusionTemplate, formatearPesos } from './plantilla-conclusion.ts'

export const MOTOR_VERSION = '2026-08.1'

// Antigüedad supuesta del encargado cuando el documento no la informa.
const ANTIGUEDAD_SUPUESTA_ANIOS = 8

export interface OpcionesAuditoria {
  // Período (YYYY-MM) a usar para la escala SUTERH si el de la liquidación no
  // tiene tabla cargada. Solo de referencia; el motor igual avisa.
  periodoFallbackSuterh?: string
}

export interface ResultadoAuditoria {
  informe: Informe
  escala_periodo_usada: string | null
}

interface RubroAgrupado {
  id: RubroId
  monto: number
  clase: ClaseRubro
  citas: string[]
  confianza: Confianza
}

const ORDEN_VEREDICTO: Record<Veredicto, number> = { normal: 0, elevado: 1, alerta: 2 }
const ORDEN_SEVERIDAD: Record<Severidad, number> = { info: 0, advertencia: 1, alerta: 2 }
const ORDEN_CONFIANZA: Record<Confianza, number> = { alta: 0, media: 1, baja: 2 }

function suma(ns: number[]): number {
  return ns.reduce((acc, n) => acc + n, 0)
}

function redondear(n: number): number {
  return Math.round(n)
}

function porcentaje(parte: number, total: number): number | null {
  if (total <= 0) return null
  return (parte / total) * 100
}

function excesoSobreBanda(monto: number, pct: number | null, normalMaxPct: number): number {
  if (pct == null || pct <= normalMaxPct || pct <= 0) return 0
  return Math.max(0, redondear((monto * (pct - normalMaxPct)) / pct))
}

export function auditarLiquidacion(
  extraccion: Extraccion,
  opts: OpcionesAuditoria = {},
): ResultadoAuditoria {
  if (!extraccion.es_liquidacion_valida) {
    return { informe: informeInvalido(extraccion), escala_periodo_usada: null }
  }

  const hallazgos: Hallazgo[] = []
  const agrupados = agrupar(extraccion.rubros)

  const ordinarias = agrupados.filter((g) => g.clase === 'ordinaria')
  const extraordinarias = agrupados.filter((g) => g.clase === 'extraordinaria')
  const totalOrdinarias = suma(ordinarias.map((g) => g.monto))
  const totalExtraordinarias = suma(extraordinarias.map((g) => g.monto))
  const sumaItems = totalOrdinarias + totalExtraordinarias
  const totalDeclarado = extraccion.total_declarado

  // --- Check de cobertura ---
  let cobertura: Informe['cobertura'] = 'completa'
  let desvioPct: number | null = null
  if (totalDeclarado && totalDeclarado > 0) {
    desvioPct = (Math.abs(sumaItems - totalDeclarado) / totalDeclarado) * 100
    if (desvioPct > COBERTURA_DESVIO_MAX_PCT) {
      cobertura = 'parcial'
      hallazgos.push({
        codigo: 'cobertura_parcial',
        severidad: 'advertencia',
        titulo: 'Informe parcial',
        detalle: `La suma de los rubros que pudimos leer difiere ${desvioPct.toFixed(1)}% del total declarado. Los porcentajes se calculan sobre lo leído y pueden subestimar algún rubro.`,
        rubros_afectados: [],
      })
    }
  }

  // Base para los porcentajes: total de ordinarias. Un mes con obra no distorsiona.
  const baseporcentaje = totalOrdinarias > 0 ? totalOrdinarias : sumaItems

  // --- Escala SUTERH del período de la liquidación ---
  const periodoLiquidacion = extraccion.edificio.periodo
  let escalaPeriodoUsada: string | null = null
  const escalaDirecta = escalaSuterhPara(periodoLiquidacion)
  if (escalaDirecta) {
    escalaPeriodoUsada = escalaDirecta.periodo
    if (escalaDirecta.escala.provisorio) {
      hallazgos.push({
        codigo: 'suterh_escala_provisoria',
        severidad: 'info',
        titulo: 'Escala salarial provisoria',
        detalle: `La escala SUTERH de ${escalaPeriodoUsada} es provisoria y puede corregirse por la cláusula de revisión del acuerdo.`,
        rubros_afectados: ['sueldos_suterh'],
      })
    }
  } else if (opts.periodoFallbackSuterh && escalaSuterhPara(opts.periodoFallbackSuterh)) {
    escalaPeriodoUsada = null
    hallazgos.push({
      codigo: 'suterh_sin_escala_periodo',
      severidad: 'info',
      titulo: 'Sin escala salarial para el período de la liquidación',
      detalle: `No tenemos la escala SUTERH publicada para ${periodoLiquidacion ?? 'el período detectado'}. Evaluamos el sueldo del encargado solo por su porcentaje sobre el total.`,
      rubros_afectados: ['sueldos_suterh'],
    })
  } else {
    hallazgos.push({
      codigo: 'suterh_sin_escala_periodo',
      severidad: 'info',
      titulo: 'Sin escala salarial para el período de la liquidación',
      detalle: `No tenemos la escala SUTERH para ${periodoLiquidacion ?? 'el período detectado'} (disponibles: ${periodosSuterhDisponibles().join(', ')}). El sueldo se evalúa solo por porcentaje sobre el total.`,
      rubros_afectados: ['sueldos_suterh'],
    })
  }

  // --- Categoría CAPHyAI y honorario esperado ---
  const { categoria, motivo: motivoCategoria } = inferirCategoria(extraccion.edificio)
  const complementarias = extraccion.edificio.unidades_complementarias ?? 0
  const ufComputables =
    extraccion.edificio.uf != null
      ? unidadesFuncionalesComputables(extraccion.edificio.uf, complementarias)
      : null
  const honorarioBase =
    ufComputables != null ? honorarioEsperado(categoria, ufComputables) : null

  hallazgos.push({
    codigo: 'honorarios_categoria',
    severidad: 'info',
    titulo: `Categoría CAPHyAI estimada: ${categoria}`,
    detalle:
      motivoCategoria +
      (ufComputables != null
        ? ` UF computables: ${ufComputables} (incluye ${complementarias} unidades complementarias a 0,5 c/u).`
        : ' No pudimos leer la cantidad de unidades funcionales, así que el honorario se evalúa solo por porcentaje.'),
    rubros_afectados: ['honorarios_administracion'],
  })

  const ctx: ContextoAuditoria = {
    baseporcentaje,
    categoria,
    motivoCategoria,
    ufComputables,
    honorarioBase,
    ascensores: extraccion.edificio.ascensores,
    perfilPersonal: extraccion.edificio.perfil_personal,
    escalaPeriodoUsada,
    encargadoConVivienda: extraccion.edificio.encargado_con_vivienda,
    encargadoAntiguedad: extraccion.edificio.encargado_antiguedad_anios,
  }

  const rubros: RubroAuditado[] = []
  for (const g of agrupados) {
    const { rubro, hallazgos: hs } = auditarRubro(g, ctx)
    rubros.push(rubro)
    hallazgos.push(...hs)
  }

  hallazgos.push(...coherenciaCruzada(extraccion, agrupados, rubros))

  // --- Métricas ---
  const totalRef = totalDeclarado && totalDeclarado > 0 ? totalDeclarado : sumaItems
  const costoPorUf =
    extraccion.edificio.uf && extraccion.edificio.uf > 0
      ? redondear(totalRef / extraccion.edificio.uf)
      : null
  const ahorro = redondear(suma(rubros.map((r) => r.exceso_estimado)))

  const informeParcial: Informe = {
    es_liquidacion_valida: true,
    mensaje_error: null,
    cobertura,
    edificio: {
      nombre: extraccion.edificio.nombre,
      periodo: extraccion.edificio.periodo,
      uf: extraccion.edificio.uf,
      unidades_complementarias: extraccion.edificio.unidades_complementarias,
      ascensores: extraccion.edificio.ascensores,
      amenities: extraccion.edificio.amenities,
      servicios_centrales: extraccion.edificio.servicios_centrales,
      perfil_personal: extraccion.edificio.perfil_personal,
      categoria_caphyai: categoria,
    },
    totales: {
      total_declarado: totalDeclarado,
      total_ordinarias: redondear(totalOrdinarias),
      total_extraordinarias: redondear(totalExtraordinarias),
      suma_items_leidos: redondear(sumaItems),
      desvio_cobertura_pct: desvioPct != null ? Number(desvioPct.toFixed(1)) : null,
    },
    rubros: ordenarRubros(rubros),
    items_sin_detalle: extraccion.items_sin_detalle,
    hallazgos: ordenarHallazgos(hallazgos),
    metricas: {
      costo_por_uf: costoPorUf,
      ahorro_estimado_mensual: Math.max(0, ahorro),
    },
    conclusion: { resumen: '', principal_problema: '' },
  }

  informeParcial.conclusion = construirConclusionTemplate(informeParcial)

  return { informe: informeParcial, escala_periodo_usada: escalaPeriodoUsada }
}

// ============================================================
// Auditoría por rubro
// ============================================================

interface ContextoAuditoria {
  baseporcentaje: number
  categoria: ReturnType<typeof inferirCategoria>['categoria']
  motivoCategoria: string
  ufComputables: number | null
  honorarioBase: number | null
  ascensores: number | null
  perfilPersonal: Extraccion['edificio']['perfil_personal']
  escalaPeriodoUsada: string | null
  encargadoConVivienda: boolean | null
  encargadoAntiguedad: number | null
}

function auditarRubro(
  g: RubroAgrupado,
  ctx: ContextoAuditoria,
): { rubro: RubroAuditado; hallazgos: Hallazgo[] } {
  const banda = BANDAS[g.id]
  const etiqueta = etiquetaRubro(g.id)
  const cita = g.citas.join(' · ')
  const textoCitas = g.citas.join(' ').toLowerCase()
  const hallazgos: Hallazgo[] = []

  if (g.clase === 'extraordinaria') {
    return {
      rubro: {
        id: g.id,
        etiqueta,
        monto: redondear(g.monto),
        clase: 'extraordinaria',
        pct_sobre_ordinarias: null,
        veredicto: 'normal',
        exceso_estimado: 0,
        cita_textual: cita,
        confianza: g.confianza,
        motivo: 'Gasto extraordinario: no entra en el cálculo de porcentajes sobre expensas ordinarias.',
        banda_calibrada: banda.calibrada,
      },
      hallazgos,
    }
  }

  const pct = porcentaje(g.monto, ctx.baseporcentaje)
  let exceso = excesoSobreBanda(g.monto, pct, banda.normal_max_pct)
  let motivo = motivoBanda(pct, banda)

  // Veredicto autoritativo: cuando hay un ancla dura (escala SUTERH, honorario
  // por categoría, banda por equipo), esa comparación MANDA sobre la banda %.
  // Un edificio chico tiene honorarios que son un % alto del total y eso no es
  // una alerta si el monto está bien contra la tabla CAPHyAI.
  let veredictoAutoritativo: Veredicto | null = null
  let forzarAlerta = false

  // --- Sueldo del encargado contra la escala SUTERH del período ---
  if (g.id === 'sueldos_suterh' && ctx.escalaPeriodoUsada) {
    const conVivienda = ctx.encargadoConVivienda ?? false
    const antiguedad = ctx.encargadoAntiguedad ?? ANTIGUEDAD_SUPUESTA_ANIOS
    const esperado = costoEncargadoEsperado({
      periodo: ctx.escalaPeriodoUsada,
      conVivienda,
      antiguedadAnios: antiguedad,
    })
    if (esperado) {
      const ratio = g.monto / esperado.costo_consorcio
      const antigTexto =
        ctx.encargadoAntiguedad != null
          ? `${antiguedad} años de antigüedad`
          : `${antiguedad} años de antigüedad estimados`
      motivo = `Comparado con la escala SUTERH de ${ctx.escalaPeriodoUsada} (${conVivienda ? 'con' : 'sin'} vivienda, ${antigTexto}): costo esperado para el consorcio ≈ ${formatearPesos(esperado.costo_consorcio)}.`
      if (ratio > 1.25) {
        veredictoAutoritativo = 'alerta'
        exceso = Math.max(exceso, redondear(g.monto - esperado.costo_consorcio * 1.15))
      } else if (ratio > 1.15) {
        veredictoAutoritativo = 'elevado'
        exceso = Math.max(exceso, redondear(g.monto - esperado.costo_consorcio * 1.15))
      } else if (ratio < 0.8) {
        veredictoAutoritativo = 'elevado'
        exceso = 0
        motivo += ' Está más de 20% por debajo del piso: posible subdeclaración o error de liquidación.'
      } else {
        veredictoAutoritativo = 'normal'
        exceso = 0
      }
    }
  }

  // --- Honorarios de administración contra el esperado por categoría ---
  if (g.id === 'honorarios_administracion') {
    if (PALABRAS_COMPUTACION.some((p) => textoCitas.includes(p))) {
      forzarAlerta = true
      hallazgos.push({
        codigo: 'honorarios_computacion',
        severidad: 'alerta',
        titulo: 'Honorarios con cargos de computación o sistemas',
        detalle:
          'CAPHyAI no incluye servicios de computación, sistemas o software dentro del honorario. Si no está discriminado y facturado aparte, es un cargo a cuestionar.',
        rubros_afectados: ['honorarios_administracion'],
      })
    }
    if (ctx.honorarioBase != null) {
      motivo = `Honorario esperado para categoría ${ctx.categoria} con ${ctx.ufComputables} UF computables ≈ ${formatearPesos(ctx.honorarioBase)}. ${ctx.motivoCategoria}`
      if (g.monto > ctx.honorarioBase * 1.3) {
        veredictoAutoritativo = 'alerta'
        exceso = Math.max(exceso, redondear(g.monto - ctx.honorarioBase))
      } else if (g.monto > ctx.honorarioBase * 1.15) {
        veredictoAutoritativo = 'elevado'
        exceso = Math.max(exceso, redondear(g.monto - ctx.honorarioBase))
      } else {
        veredictoAutoritativo = 'normal'
        exceso = 0
      }
    }
  }

  // --- Aranceles complementarios: honorario disfrazado ---
  if (g.id === 'aranceles_complementarios' && ctx.honorarioBase != null && ctx.honorarioBase > 0) {
    const rel = g.monto / ctx.honorarioBase
    motivo = `Equivalen al ${(rel * 100).toFixed(0)}% del honorario base (${formatearPesos(ctx.honorarioBase)}).`
    if (rel > ARANCELES_PCT_HONORARIO_ALERTA) {
      forzarAlerta = true
      exceso = Math.max(
        exceso,
        redondear(g.monto - ctx.honorarioBase * ARANCELES_PCT_HONORARIO_ALERTA),
      )
      hallazgos.push({
        codigo: 'aranceles_honorario_disfrazado',
        severidad: 'alerta',
        titulo: 'Aranceles complementarios altos',
        detalle: `Los aranceles equivalen al ${(rel * 100).toFixed(0)}% del honorario base. Por encima del 30% de forma recurrente suelen ser honorario encubierto.`,
        rubros_afectados: ['aranceles_complementarios', 'honorarios_administracion'],
      })
    }
  }

  // --- Ascensor: banda por equipo ---
  if (
    g.id === 'mantenimiento_ascensor' &&
    ctx.ascensores != null &&
    ctx.ascensores > 0 &&
    pct != null
  ) {
    const pctPorEquipo = pct / ctx.ascensores
    veredictoAutoritativo = clasificarPorBanda(pctPorEquipo, banda)
    exceso = excesoSobreBanda(g.monto, pctPorEquipo, banda.normal_max_pct)
    motivo = `${formatearPct(pctPorEquipo)} del total por equipo (${ctx.ascensores} ascensores).`
  }

  let veredicto = veredictoAutoritativo ?? clasificarPorBanda(pct ?? 0, banda)

  // --- Opacidad: rubro sin desglose con palabras cajón de sastre ---
  const sinDesglose = g.citas.length === 0 || PALABRAS_OPACAS.some((p) => textoCitas.includes(p))
  if (sinDesglose && pct != null && pct > OPACIDAD_PCT_UMBRAL) {
    forzarAlerta = true
    exceso = Math.max(exceso, excesoSobreBanda(g.monto, pct, OPACIDAD_PCT_UMBRAL))
    hallazgos.push({
      codigo: 'opacidad_rubro',
      severidad: 'alerta',
      titulo: `Rubro sin desglose: ${etiqueta}`,
      detalle: `Supera el ${OPACIDAD_PCT_UMBRAL}% del total y no detalla en qué se gastó. Un buen administrador justifica cada peso.`,
      rubros_afectados: [g.id],
    })
  }

  if (forzarAlerta) veredicto = 'alerta'

  return {
    rubro: {
      id: g.id,
      etiqueta,
      monto: redondear(g.monto),
      clase: 'ordinaria',
      pct_sobre_ordinarias: pct != null ? Number(pct.toFixed(1)) : null,
      veredicto,
      exceso_estimado: veredicto === 'normal' ? 0 : Math.max(0, redondear(exceso)),
      cita_textual: cita,
      confianza: g.confianza,
      motivo,
      banda_calibrada: banda.calibrada,
    },
    hallazgos,
  }
}

// ============================================================
// Coherencia cruzada
// ============================================================

function coherenciaCruzada(
  extraccion: Extraccion,
  agrupados: RubroAgrupado[],
  rubros: RubroAuditado[],
): Hallazgo[] {
  const hallazgos: Hallazgo[] = []
  const montoDe = (id: RubroId) => agrupados.find((g) => g.id === id)?.monto ?? 0
  const rubroDe = (id: RubroId) => rubros.find((r) => r.id === id)
  const idsPresentes = new Set(agrupados.map((g) => g.id))
  const perfil = extraccion.edificio.perfil_personal

  const sueldo = montoDe('sueldos_suterh')
  const cargas = montoDe('cargas_sociales_suterh')
  const sindical = montoDe('cuota_sindical_suterh')

  if (sueldo === 0 && (cargas > 0 || sindical > 0)) {
    hallazgos.push({
      codigo: 'suterh_cero_con_cargas',
      severidad: 'alerta',
      titulo: 'Sueldo del encargado en cero pero con cargas',
      detalle:
        'Figuran cargas sociales o cuota sindical SUTERH sin un sueldo asociado. O el sueldo está mal imputado, o hay un cargo que no corresponde.',
      rubros_afectados: ['sueldos_suterh', 'cargas_sociales_suterh', 'cuota_sindical_suterh'],
    })
  }

  if (perfil === 'tercerizado' && (sueldo > 0 || cargas > 0 || sindical > 0)) {
    hallazgos.push({
      codigo: 'tercerizado_con_suterh',
      severidad: 'alerta',
      titulo: 'Personal tercerizado con rubros de encargado propio',
      detalle:
        'El edificio no tiene encargado propio pero aparecen sueldos o cargas SUTERH. Probable confusión de rubros o doble costo de personal.',
      rubros_afectados: ['sueldos_suterh', 'limpieza_servicio_tercerizado'],
    })
  }

  if ((extraccion.edificio.ascensores ?? 0) >= 1 && !idsPresentes.has('mantenimiento_ascensor')) {
    const mencionado = extraccion.items_sin_detalle
      .join(' ')
      .toLowerCase()
      .includes('ascensor')
    if (!mencionado) {
      hallazgos.push({
        codigo: 'ascensor_sin_abono',
        severidad: 'alerta',
        titulo: 'Ascensor sin abono de mantenimiento',
        detalle:
          'El edificio tiene ascensor pero no figura un abono mensual de conservación. El mantenimiento por empresa habilitada es obligatorio.',
        rubros_afectados: ['mantenimiento_ascensor'],
      })
    }
  }

  if (perfil === 'suterh_propio' && sueldo > 0) {
    const mat = rubroDe('limpieza_materiales')
    if (
      mat &&
      mat.pct_sobre_ordinarias != null &&
      mat.pct_sobre_ordinarias > BANDAS.limpieza_materiales.elevado_max_pct
    ) {
      hallazgos.push({
        codigo: 'doble_facturacion_limpieza',
        severidad: 'advertencia',
        titulo: 'Posible doble facturación de limpieza',
        detalle:
          'Con encargado propio, el rubro de materiales de limpieza está muy por encima de lo esperado. Revisá que no haya mano de obra o servicio externo cargado ahí.',
        rubros_afectados: ['limpieza_materiales', 'limpieza_servicio_tercerizado'],
      })
    }
  }

  if (perfil === 'tercerizado') {
    const terc = rubroDe('limpieza_servicio_tercerizado')
    if (terc && terc.pct_sobre_ordinarias != null && terc.pct_sobre_ordinarias < 15) {
      hallazgos.push({
        codigo: 'limpieza_tercerizada_baja',
        severidad: 'advertencia',
        titulo: 'Servicio de limpieza tercerizado por debajo de lo habitual',
        detalle:
          'El costo del servicio tercerizado es menor al 15% del total. Puede ser un servicio reducido o haber costos de limpieza escondidos en otros rubros.',
        rubros_afectados: ['limpieza_servicio_tercerizado', 'limpieza_materiales'],
      })
    }
  }

  return hallazgos
}

// ============================================================
// Helpers
// ============================================================

function agrupar(rubros: Extraccion['rubros']): RubroAgrupado[] {
  const mapa = new Map<RubroId, RubroAgrupado>()
  for (const r of rubros) {
    const prev = mapa.get(r.id)
    if (!prev) {
      mapa.set(r.id, {
        id: r.id,
        monto: r.monto,
        clase: r.clase,
        citas: r.cita_textual ? [r.cita_textual] : [],
        confianza: r.confianza,
      })
      continue
    }
    prev.monto += r.monto
    if (r.cita_textual) prev.citas.push(r.cita_textual)
    if (ORDEN_CONFIANZA[r.confianza] > ORDEN_CONFIANZA[prev.confianza]) prev.confianza = r.confianza
    if (r.clase === 'ordinaria') prev.clase = 'ordinaria'
  }
  return [...mapa.values()]
}

function motivoBanda(pct: number | null, banda: { normal_max_pct: number; elevado_max_pct: number }): string {
  if (pct == null) return 'Sin total de referencia para calcular el porcentaje.'
  if (pct <= banda.normal_max_pct) return `${formatearPct(pct)} del total, dentro de lo esperado.`
  if (pct <= banda.elevado_max_pct) return `${formatearPct(pct)} del total, por encima de lo habitual.`
  return `${formatearPct(pct)} del total, bastante por encima de lo esperado.`
}

function formatearPct(pct: number): string {
  return pct.toFixed(1).replace('.', ',') + '%'
}

function ordenarRubros(rubros: RubroAuditado[]): RubroAuditado[] {
  return [...rubros].sort((a, b) => {
    const v = ORDEN_VEREDICTO[b.veredicto] - ORDEN_VEREDICTO[a.veredicto]
    if (v !== 0) return v
    return b.monto - a.monto
  })
}

function ordenarHallazgos(hallazgos: Hallazgo[]): Hallazgo[] {
  return [...hallazgos].sort((a, b) => ORDEN_SEVERIDAD[b.severidad] - ORDEN_SEVERIDAD[a.severidad])
}

function informeInvalido(extraccion: Extraccion): Informe {
  const mensaje =
    extraccion.mensaje_error ?? 'No pudimos detectar una liquidación de expensas en el archivo.'
  return {
    es_liquidacion_valida: false,
    mensaje_error: mensaje,
    cobertura: 'parcial',
    edificio: {
      nombre: null,
      periodo: null,
      uf: null,
      unidades_complementarias: null,
      ascensores: null,
      amenities: null,
      servicios_centrales: null,
      perfil_personal: 'desconocido',
      categoria_caphyai: null,
    },
    totales: {
      total_declarado: null,
      total_ordinarias: 0,
      total_extraordinarias: 0,
      suma_items_leidos: 0,
      desvio_cobertura_pct: null,
    },
    rubros: [],
    items_sin_detalle: [],
    hallazgos: [],
    metricas: { costo_por_uf: null, ahorro_estimado_mensual: 0 },
    conclusion: { resumen: mensaje, principal_problema: '' },
  }
}
