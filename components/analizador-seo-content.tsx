import Link from 'next/link'

export default function AnalizadorSeoContent() {
  return (
    <section
      className="py-[80px] md:py-[100px]"
      style={{ backgroundColor: 'var(--color-surface)' }}
      aria-labelledby="que-analiza-vero"
    >
      <div className="mx-auto max-w-[800px] px-6 flex flex-col gap-12">
        <header className="flex flex-col gap-4">
          <p
            className="text-[12px] font-semibold tracking-[0.1em] uppercase"
            style={{ color: 'var(--color-vero)' }}
          >
            Auditoría de expensas con IA
          </p>
          <h2
            id="que-analiza-vero"
            className="font-serif font-bold leading-[1.15] text-balance"
            style={{ fontSize: 'clamp(26px, 4vw, 38px)', color: 'var(--color-ink)' }}
          >
            ¿Qué analiza Vero en tu liquidación de expensas?
          </h2>
          <p className="text-[16px] leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
            Vero es la inteligencia artificial de Dominium, entrenada con datos del mercado de
            <strong> administración de consorcios en CABA y AMBA</strong>. Analiza cada rubro de tu
            liquidación de expensas y lo compara con valores de referencia de edificios similares en
            propiedad horizontal.
          </p>
        </header>

        <div className="flex flex-col gap-8">
          <article className="flex flex-col gap-3">
            <h3 className="text-[20px] font-semibold" style={{ color: 'var(--color-ink)' }}>
              Honorarios del administrador de consorcio
            </h3>
            <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
              Vero compara los honorarios del administrador con valores de referencia del mercado y
              te avisa cuando hay margen para renegociar o cambiar de administradora.
            </p>
          </article>

          <article className="flex flex-col gap-3">
            <h3 className="text-[20px] font-semibold" style={{ color: 'var(--color-ink)' }}>
              Seguro del edificio y comisiones ocultas
            </h3>
            <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
              El seguro del edificio es uno de los rubros donde más se esconden comisiones de broker
              sin declarar. Vero detecta diferencias relevantes respecto a edificios comparables del
              AMBA.
            </p>
          </article>

          <article className="flex flex-col gap-3">
            <h3 className="text-[20px] font-semibold" style={{ color: 'var(--color-ink)' }}>
              Mantenimiento de ascensores
            </h3>
            <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
              Contratos cerrados sin licitación o renovaciones automáticas son señales claras de
              alerta. Vero identifica este tipo de patrones en tu liquidación.
            </p>
          </article>

          <article className="flex flex-col gap-3">
            <h3 className="text-[20px] font-semibold" style={{ color: 'var(--color-ink)' }}>
              Sueldo del encargado bajo escala SUTERH
            </h3>
            <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
              El sueldo del encargado está fijado por la escala oficial del Sindicato Único de
              Trabajadores de Edificios de Renta y Horizontal (SUTERH). Cualquier discrepancia entre
              lo declarado y la escala vigente es un error administrativo o una irregularidad.
            </p>
          </article>

          <article className="flex flex-col gap-3">
            <h3 className="text-[20px] font-semibold" style={{ color: 'var(--color-ink)' }}>
              Fondo de reserva del consorcio
            </h3>
            <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
              Un fondo de reserva mal administrado es uno de los problemas más graves en propiedad
              horizontal. Vero detecta acumulación insuficiente, uso indebido o falta de transparencia
              en su gestión.
            </p>
          </article>
        </div>

        <div
          className="rounded-[16px] p-8 flex flex-col gap-4"
          style={{
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
          }}
        >
          <h2
            className="font-serif font-bold leading-[1.2]"
            style={{ fontSize: 'clamp(22px, 3vw, 30px)', color: 'var(--color-ink)' }}
          >
            ¿Por qué auditar tus expensas con IA?
          </h2>
          <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
            Una <strong>liquidación de expensas</strong> típica tiene muchos ítems sin descripción y
            servicios sin cotización alternativa. Auditarla a mano lleva horas y requiere conocer
            precios de mercado actualizados. Con Vero, tenés un{' '}
            <strong>analizador de expensas</strong> que hace el trabajo en segundos, gratis y sin
            registro.
          </p>
          <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
            Si descubrís sobreprecios o querés cambiar de administrador, Dominium ofrece{' '}
            <Link
              href="/#como-funciona"
              className="underline"
              style={{ color: 'var(--color-accent)' }}
            >
              administración de consorcios con transparencia total
            </Link>
            . Si sos administrador y querés retirarte, conocé nuestro{' '}
            <Link
              href="/administradores"
              className="underline"
              style={{ color: 'var(--color-accent)' }}
            >
              Plan de Retiro para Administradores
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <h2
            className="font-serif font-bold leading-[1.2]"
            style={{ fontSize: 'clamp(22px, 3vw, 30px)', color: 'var(--color-ink)' }}
          >
            Preguntas frecuentes sobre administración de consorcios
          </h2>

          <div className="flex flex-col gap-5">
            <details
              className="rounded-xl p-5 group"
              style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}
            >
              <summary
                className="text-[16px] font-semibold cursor-pointer"
                style={{ color: 'var(--color-ink)' }}
              >
                ¿Cómo funciona el analizador de expensas de Dominium?
              </summary>
              <p className="text-[14px] mt-3 leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
                Subís una foto o PDF de tu última liquidación. Vero, nuestra IA entrenada con datos
                de mercado del AMBA, identifica los rubros, los compara con valores de referencia y
                detecta sobreprecios, ítems sin justificación o problemas en el fondo de reserva. El
                resultado llega en pocos segundos.
              </p>
            </details>

            <details
              className="rounded-xl p-5 group"
              style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}
            >
              <summary
                className="text-[16px] font-semibold cursor-pointer"
                style={{ color: 'var(--color-ink)' }}
              >
                ¿Es gratis auditar mis expensas?
              </summary>
              <p className="text-[14px] mt-3 leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
                Sí. El análisis con Vero es 100% gratuito y no requiere registro previo ni tarjeta de
                crédito. Solo te pedimos un dato de contacto para enviarte el informe.
              </p>
            </details>

            <details
              className="rounded-xl p-5 group"
              style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}
            >
              <summary
                className="text-[16px] font-semibold cursor-pointer"
                style={{ color: 'var(--color-ink)' }}
              >
                ¿Dominium es una administradora de consorcios real?
              </summary>
              <p className="text-[14px] mt-3 leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
                Sí. Dominium es una administradora de consorcios registrada en CABA, con fondos
                protegidos por regulación BCRA. Combinamos administración profesional con tecnología
                de IA para ofrecer transparencia total.
              </p>
            </details>

            <details
              className="rounded-xl p-5 group"
              style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}
            >
              <summary
                className="text-[16px] font-semibold cursor-pointer"
                style={{ color: 'var(--color-ink)' }}
              >
                ¿Qué zonas cubre Dominium?
              </summary>
              <p className="text-[14px] mt-3 leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
                Operamos en CABA y todo el AMBA (Área Metropolitana de Buenos Aires). El analizador
                de expensas funciona para cualquier liquidación de propiedad horizontal de Argentina.
              </p>
            </details>

            <details
              className="rounded-xl p-5 group"
              style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}
            >
              <summary
                className="text-[16px] font-semibold cursor-pointer"
                style={{ color: 'var(--color-ink)' }}
              >
                ¿Qué tipo de ahorros puedo obtener cambiándome a Dominium?
              </summary>
              <p className="text-[14px] mt-3 leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
                Trabajamos para eliminar comisiones ocultas, sobreprecios en proveedores y gastos
                administrativos no justificados. El ahorro depende del estado actual de cada
                consorcio y se evalúa caso por caso.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  )
}
