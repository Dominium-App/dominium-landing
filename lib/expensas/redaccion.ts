import { z } from 'zod'
import type { Conclusion, Informe } from './tipos'
import { llamarConJsonSchema, type SystemBlock } from './anthropic.ts'
import { construirConclusionTemplate } from './plantilla-conclusion.ts'

export const MODELO_REDACCION = process.env.ANALYZE_MODELO_REDACCION ?? 'claude-sonnet-5'
// Activada por defecto. Se apaga con ANALYZE_REDACCION=off.
export const REDACCION_HABILITADA = process.env.ANALYZE_REDACCION !== 'off'

const conclusionSchema = z.object({
  resumen: z.string().min(1),
  principal_problema: z.string(),
})

const CONCLUSION_JSON_SCHEMA: Record<string, unknown> = {
  type: 'object',
  additionalProperties: false,
  required: ['resumen', 'principal_problema'],
  properties: {
    resumen: { type: 'string' },
    principal_problema: { type: 'string' },
  },
}

const SYSTEM_REDACCION = `Sos Vero, la asistente de Dominium. Te paso un informe de auditoría de expensas YA CALCULADO y tenés que ponerlo en palabras para un propietario.

REGLAS
- No cambiás ningún veredicto ni ningún número. Solo describís lo que ya está en el informe.
- No inventás rubros, montos ni problemas que no estén en el informe.
- "resumen": 2 a 4 oraciones. Qué se revisó, qué se encontró, y el ahorro estimado si es mayor a cero. Mencioná si el informe es parcial.
- "principal_problema": una frase corta con el hallazgo más importante, o "Sin problemas mayores detectados" si no hay alertas.
- Castellano rioplatense con voseo. Directo, cercano, sin jerga técnica, sin emojis. Hablás con alguien cansado de que le suban las expensas.`

export async function redactarConclusion(
  informe: Informe,
  apiKey: string,
): Promise<Conclusion> {
  const resumenMotor = construirConclusionTemplate(informe)
  const insumo = {
    edificio: informe.edificio,
    cobertura: informe.cobertura,
    totales: informe.totales,
    metricas: informe.metricas,
    rubros: informe.rubros.map((r) => ({
      etiqueta: r.etiqueta,
      veredicto: r.veredicto,
      pct_sobre_ordinarias: r.pct_sobre_ordinarias,
      exceso_estimado: r.exceso_estimado,
      motivo: r.motivo,
    })),
    hallazgos: informe.hallazgos,
    borrador_determinista: resumenMotor,
  }

  const system: SystemBlock[] = [{ type: 'text', text: SYSTEM_REDACCION }]
  const messages = [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: `Informe de auditoría:\n${JSON.stringify(insumo)}\n\nRedactá resumen y principal_problema según el schema.`,
        },
      ],
    },
  ]

  const texto = await llamarConJsonSchema({
    apiKey,
    model: MODELO_REDACCION,
    maxTokens: 1200,
    effort: 'low',
    system,
    messages,
    jsonSchema: CONCLUSION_JSON_SCHEMA,
    timeoutMs: 12_000,
  })

  return conclusionSchema.parse(JSON.parse(texto))
}
