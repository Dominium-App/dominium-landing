import type { Conclusion, Informe } from './tipos'

// Fallback determinístico de la etapa 3. Se usa cuando la redacción con LLM está
// desactivada o falla. No inventa nada: arma prosa con lo que el motor ya calculó.

export function formatearPesos(n: number): string {
  return '$' + Math.round(n).toLocaleString('es-AR')
}

export function construirConclusionTemplate(informe: Informe): Conclusion {
  if (!informe.es_liquidacion_valida) {
    return {
      resumen:
        informe.mensaje_error ??
        'No pudimos detectar una liquidación de expensas en el archivo.',
      principal_problema: '',
    }
  }

  const alertas = informe.rubros.filter((r) => r.veredicto === 'alerta')
  const elevados = informe.rubros.filter((r) => r.veredicto === 'elevado')
  const edificio = informe.edificio.nombre ?? 'tu edificio'
  const periodo = informe.edificio.periodo ? ` (${informe.edificio.periodo})` : ''

  const partes: string[] = []
  partes.push(
    `Revisamos ${informe.rubros.length} rubros de ${edificio}${periodo}.`,
  )

  if (alertas.length > 0 || elevados.length > 0) {
    const frag: string[] = []
    if (alertas.length > 0) frag.push(`${alertas.length} con alerta`)
    if (elevados.length > 0) frag.push(`${elevados.length} por encima de lo esperado`)
    partes.push(`Encontramos ${frag.join(' y ')}.`)
  } else {
    partes.push('Todos los rubros están dentro de los promedios del mercado.')
  }

  if (informe.metricas.ahorro_estimado_mensual > 0) {
    partes.push(
      `Estimamos hasta ${formatearPesos(informe.metricas.ahorro_estimado_mensual)} por mes de sobrecosto frente a los valores de referencia.`,
    )
  }

  if (informe.metricas.costo_por_uf != null) {
    partes.push(
      `El costo por unidad funcional es de ${formatearPesos(informe.metricas.costo_por_uf)}.`,
    )
  }

  if (informe.cobertura === 'parcial') {
    partes.push(
      'El informe es parcial: no pudimos leer todos los rubros del documento, así que algún porcentaje puede quedar corto.',
    )
  }

  const hallazgoTop = [...informe.hallazgos].sort(
    (a, b) => pesoSeveridad(b.severidad) - pesoSeveridad(a.severidad),
  )[0]

  let principalProblema = ''
  if (hallazgoTop && hallazgoTop.severidad !== 'info') {
    principalProblema = hallazgoTop.titulo
  } else if (alertas.length > 0) {
    const peor = [...alertas].sort((a, b) => b.exceso_estimado - a.exceso_estimado)[0]
    principalProblema = `${peor.etiqueta} por encima de lo esperado`
  } else if (elevados.length > 0) {
    principalProblema = `${elevados[0].etiqueta} algo elevado`
  } else {
    principalProblema = 'Sin problemas mayores detectados'
  }

  return { resumen: partes.join(' '), principal_problema: principalProblema }
}

function pesoSeveridad(s: 'info' | 'advertencia' | 'alerta'): number {
  return s === 'alerta' ? 2 : s === 'advertencia' ? 1 : 0
}
