import type { ReactNode } from 'react'
import PhoneFrame from './phone-frame'
import AppScreen from './app-screen'
import PagoSheet from './pago-sheet'
import FinanzasSheet from './finanzas-sheet'
import Reveal from './reveal'

function Row({
  media,
  title,
  children,
  flip = false,
}: {
  media: ReactNode
  title: string
  children: ReactNode
  flip?: boolean
}) {
  return (
    <div
      className={`flex flex-col items-center gap-10 lg:gap-20 ${flip ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
    >
      <Reveal className="flex flex-1 justify-center">{media}</Reveal>
      <Reveal delay={80} className="flex-1">
        <h3 className="text-[clamp(24px,3vw,32px)] font-semibold leading-tight text-ink text-balance">
          {title}
        </h3>
        <div className="mt-4 flex max-w-[52ch] flex-col gap-3 text-[16px] leading-relaxed text-ink-2">
          {children}
        </div>
      </Reveal>
    </div>
  )
}

export default function Producto() {
  return (
    <section className="bg-canvas py-24 md:py-32" aria-label="Así se ve un edificio administrado por Dominium">
      <div className="mx-auto max-w-[1120px] px-6">
        <Reveal className="max-w-[640px]">
          <h2 className="font-serif text-[clamp(30px,4.2vw,46px)] font-bold leading-[1.12] text-ink text-balance">
            Un edificio Dominium, por dentro.
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-2">
            Nada de portales con clave que nadie usa. Cada vecino tiene la vida financiera del
            edificio en el bolsillo, y a Vero en WhatsApp.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-32">
          <Row
            media={
              <PhoneFrame label="Pantalla de inicio de la app de Dominium: la expensa de julio con su vencimiento y botón de pagar, el saldo a favor, el balance del consorcio y los accesos a reservas y documentos">
                <AppScreen />
              </PhoneFrame>
            }
            title="Tus expensas, sin misterio."
          >
            <p>
              Abrís la app y sabés dónde estás parado: cuánto vence, cuándo, y si estás al
              día. Cada expensa trae su desglose de gastos por categoría, y la mora se calcula
              sola, con el interés a la vista.
            </p>
            <p>
              Si pagás de más, queda como saldo a favor y se descuenta de la próxima.
            </p>
          </Row>

          <Row
            flip
            media={<PagoSheet />}
            title="Pagás por transferencia. Se imputa solo."
          >
            <p>
              El consorcio tiene su propia cuenta con CVU y alias. Copiás los datos, transferís
              el monto exacto desde el banco o billetera que uses, y el pago se acredita a tu
              unidad automáticamente: sin comprobante, sin esperar que alguien lo cargue.
            </p>
          </Row>

          <Row
            media={<FinanzasSheet />}
            title="Cada peso del edificio, a la vista."
          >
            <p>
              El balance del consorcio y todos sus movimientos, mes por mes: qué entró, qué se
              pagó y a quién. Cada egreso tiene su comprobante y su factura conciliada, a un
              tap.
            </p>
            <p>
              Y detrás, el equipo de Dominium compara cada gasto contra referencias reales del
              mercado: escala SUTERH, honorarios CAPHAI, valores de zona. Los sobreprecios no
              tienen dónde esconderse.
            </p>
          </Row>
        </div>
      </div>
    </section>
  )
}
