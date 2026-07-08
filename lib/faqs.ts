export interface Faq {
  q: string
  a: string
}

export const homeFaqs: Faq[] = [
  {
    q: '¿Qué es Dominium exactamente?',
    a: 'Una administración de consorcios completa, no un software para tu administrador actual. Dominium reemplaza a la administración tradicional: Vero, nuestra IA, atiende a los vecinos por WhatsApp las 24 horas; la plata del edificio vive en una cuenta propia con CVU regulada por BCRA; y cada vecino ve expensas, gastos, facturas y reservas desde la app o la web.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'El honorario clásico de administración: un porcentaje de las expensas, el mismo esquema que tu consorcio ya paga hoy. No hay costo de implementación ni comisiones escondidas en los rubros. El porcentaje exacto depende del edificio y lo conversás directo con el equipo.',
  },
  {
    q: '¿Y si Vero no puede resolver algo?',
    a: 'Lo deriva al equipo humano de Dominium y te avisa quién lo tomó. Las urgencias (pérdidas de agua, gas, ascensor) despachan guardia al momento, a cualquier hora. Vero resuelve la mayoría de las consultas sola, pero nunca sos rehén de un bot: siempre hay personas detrás.',
  },
  {
    q: '¿Cómo funciona el analizador de expensas gratis?',
    a: 'Subís una foto o PDF de tu última liquidación. Vero identifica los rubros y los compara con referencias reales del mercado argentino: escala salarial SUTERH, honorarios CAPHAI y valores de zona del AMBA. En menos de 60 segundos tenés un informe con los sobreprecios y las alertas, listo para compartir en el grupo del edificio. Sin registro y sin tarjeta.',
  },
  {
    q: '¿Dónde está la plata del edificio?',
    a: 'En una cuenta a nombre del consorcio, con CVU y alias propios, operada sobre Cresium (infraestructura financiera regulada por BCRA). Nunca en la cuenta personal de un administrador. Cada transferencia se concilia automáticamente y todo movimiento queda registrado con su comprobante.',
  },
  {
    q: '¿Cómo es el cambio de administración?',
    a: 'Se decide en asamblea, como marca el Código Civil y Comercial. Dominium prepara la documentación y el orden del día, y después del voto se ocupa del traspaso completo: libros, cuentas, proveedores, encargado y deudas en curso. El edificio no queda a la deriva ni un día.',
  },
  {
    q: '¿Qué zonas cubre Dominium?',
    a: 'Administramos edificios en CABA y todo el AMBA (Área Metropolitana de Buenos Aires). El analizador de expensas funciona para cualquier liquidación de propiedad horizontal de Argentina.',
  },
  {
    q: '¿Mis datos están seguros?',
    a: 'Sí. Los datos viajan y se guardan cifrados, la liquidación que subís se procesa de forma confidencial y no se comparte con terceros. Podés pedir la eliminación de tus datos cuando quieras escribiendo a hola@dominium.com.ar.',
  },
]
