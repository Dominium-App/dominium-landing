import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { auditarLiquidacion } from './motor.ts'
import type { Extraccion } from './tipos.ts'

const aqui = dirname(fileURLToPath(import.meta.url))

function fixture(nombre: string): Extraccion {
  return JSON.parse(readFileSync(join(aqui, '__fixtures__', nombre), 'utf8')) as Extraccion
}

const OPTS = { periodoFallbackSuterh: '2026-08' }

test('edificio A1 con SUM y pileta: honorarios NO se marcan como inflados', () => {
  const { informe } = auditarLiquidacion(fixture('edificio-a1-suterh.json'), OPTS)

  assert.equal(informe.edificio.categoria_caphyai, 'A1')

  const honorarios = informe.rubros.find((r) => r.id === 'honorarios_administracion')
  assert.ok(honorarios)
  // El % de honorarios sobre el total es alto en un edificio chico, pero el
  // monto esta dentro de la tabla CAPHyAI para A1: no es alerta.
  assert.equal(honorarios.veredicto, 'normal')
  assert.equal(honorarios.exceso_estimado, 0)

  assert.equal(informe.cobertura, 'completa')
  assert.equal(informe.metricas.ahorro_estimado_mensual, 0)
  assert.equal(
    informe.hallazgos.some((h) => h.codigo === 'aranceles_honorario_disfrazado'),
    false,
  )
  assert.equal(
    informe.rubros.every((r) => r.veredicto === 'normal'),
    true,
  )
})

test('edificio tercerizado: incoherencias, honorario disfrazado y ahorro calculado', () => {
  const { informe, escala_periodo_usada } = auditarLiquidacion(
    fixture('edificio-b-tercerizado.json'),
    OPTS,
  )

  assert.equal(informe.edificio.categoria_caphyai, 'B')
  assert.equal(escala_periodo_usada, '2026-08')

  const cero = informe.hallazgos.find((h) => h.codigo === 'suterh_cero_con_cargas')
  assert.ok(cero, 'debe detectar sueldo en cero con cuota sindical')
  assert.equal(cero.severidad, 'alerta')

  assert.ok(informe.hallazgos.some((h) => h.codigo === 'aranceles_honorario_disfrazado'))
  assert.ok(informe.hallazgos.some((h) => h.codigo === 'tercerizado_con_suterh'))
  assert.ok(informe.hallazgos.some((h) => h.codigo === 'opacidad_rubro'))

  assert.equal(informe.cobertura, 'parcial')
  assert.ok(informe.hallazgos.some((h) => h.codigo === 'cobertura_parcial'))

  const ahorroEsperado = informe.rubros.reduce((acc, r) => acc + r.exceso_estimado, 0)
  assert.equal(informe.metricas.ahorro_estimado_mensual, ahorroEsperado)
  assert.ok(ahorroEsperado > 0)
})

test('el motor es deterministico: dos corridas dan el mismo informe', () => {
  const a = auditarLiquidacion(fixture('edificio-b-tercerizado.json'), OPTS)
  const b = auditarLiquidacion(fixture('edificio-b-tercerizado.json'), OPTS)
  assert.deepEqual(a, b)
})

test('documento invalido: informe vacio y sin veredictos', () => {
  const invalido: Extraccion = {
    es_liquidacion_valida: false,
    mensaje_error: 'Esto parece una factura de luz, no una liquidacion de expensas.',
    edificio: {
      nombre: null,
      periodo: null,
      uf: null,
      unidades_complementarias: null,
      ascensores: null,
      amenities: null,
      amenities_detalle: [],
      servicios_centrales: null,
      vivienda_social: null,
      torre_o_complejo: null,
      perfil_personal: 'desconocido',
      encargado_con_vivienda: null,
      encargado_antiguedad_anios: null,
    },
    total_declarado: null,
    rubros: [],
    items_sin_detalle: [],
  }
  const { informe } = auditarLiquidacion(invalido, OPTS)
  assert.equal(informe.es_liquidacion_valida, false)
  assert.equal(informe.rubros.length, 0)
  assert.match(informe.conclusion.resumen, /factura de luz/)
})
