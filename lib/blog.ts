export type Hub =
  | 'Cambiar administrador'
  | 'Expensas'
  | 'Ley 941'
  | 'Derechos'
  | 'Local AMBA'

export type CtaType = 'analizador' | 'champion' | 'consulta'

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; id: string; text: string }
  | { type: 'h3'; id: string; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'blockquote'; text: string; attribution?: string }
  | { type: 'table'; headers: string[]; rows: string[][]; caption?: string }
  | { type: 'callout'; title: string; text: string; tone?: 'info' | 'warn' }

export type FaqItem = { q: string; a: string }

export type Article = {
  slug: string
  title: string
  excerpt: string
  hub: Hub
  date: string
  readingMinutes: number
  ctaType: CtaType
  content: ContentBlock[]
  faqs?: FaqItem[]
}

export const HUB_COLORS: Record<Hub, { bg: string; text: string; border: string }> = {
  'Cambiar administrador': {
    bg: 'var(--color-accent-glow)',
    text: 'var(--color-accent)',
    border: '#B6E8CC',
  },
  Expensas: {
    bg: 'var(--color-vero-light)',
    text: 'var(--color-vero)',
    border: '#BAD3F3',
  },
  'Ley 941': {
    bg: '#FFFBEB',
    text: '#B45309',
    border: '#FCD34D',
  },
  Derechos: {
    bg: '#F3EEFD',
    text: '#6D28D9',
    border: '#D6C7F5',
  },
  'Local AMBA': {
    bg: '#FEF2F2',
    text: '#9A2E22',
    border: '#FCA5A5',
  },
}

export const HUBS: Hub[] = [
  'Cambiar administrador',
  'Expensas',
  'Ley 941',
  'Derechos',
  'Local AMBA',
]

export const articles: Article[] = [
  {
    slug: 'como-cambiar-administrador-consorcio-caba',
    title: 'Cómo cambiar de administrador de consorcio en CABA: guía completa 2026',
    excerpt:
      'Un edificio de 18 unidades en Villa Crespo llevaba tres años con el fondo de reserva sin movimiento documentado. Esta guía documenta los pasos reales.',
    hub: 'Cambiar administrador',
    date: '2026-04-21',
    readingMinutes: 9,
    ctaType: 'champion',
    content: [
      {
        type: 'p',
        text: 'Un edificio de 18 unidades en Villa Crespo llevaba tres años con el fondo de reserva sin movimiento documentado. En la primera asamblea que intentaron convocar para discutirlo, el administrador invalidó la notificación por "defecto de forma". En la segunda faltaron dos votos para el quórum. Recién en la tercera lograron votarlo. Catorce meses desde que empezó el proceso.',
      },
      {
        type: 'p',
        text: 'Ese retraso no fue mala suerte. Fue falta de información sobre el procedimiento exacto que exige la normativa porteña. Esta guía documenta los pasos reales, los errores que retrasan el cambio y qué dicen la Ley 941 y el Código Civil sobre cada etapa.',
      },
      {
        type: 'h2',
        id: 'marco-legal',
        text: 'El marco legal que gobierna el proceso',
      },
      {
        type: 'p',
        text: 'En CABA, la administración de consorcios se rige por dos normas que se complementan y que es necesario conocer antes de dar cualquier paso.',
      },
      {
        type: 'p',
        text: 'La **Ley 941** (texto ordenado por Ley 3.254) es exclusiva de la Ciudad Autónoma de Buenos Aires. Crea el Registro Público de Administradores (RPA), establece las obligaciones del administrador y define las causales de remoción con consecuencias sancionatorias concretas. El organismo que la aplica es la Dirección General de Defensa y Protección del Consumidor (DGDyPC), que tiene facultades para multar y suspender administradores inscriptos en el RPA.',
      },
      {
        type: 'p',
        text: 'El **Código Civil y Comercial (CCyC)**, en sus artículos 2065 a 2069, regula la figura del administrador a nivel nacional: su designación, funciones, obligaciones y remoción por asamblea. Prevalece en todo lo que el reglamento de copropiedad no prevea.',
      },
      {
        type: 'callout',
        title: '¿Vivís en GBA?',
        tone: 'info',
        text: 'La Ley 941 no rige en Provincia de Buenos Aires. En partidos como Quilmes, Avellaneda, Lomas de Zamora, Lanús, Berazategui o Florencio Varela aplica solo el CCyC y la normativa municipal. El procedimiento de asamblea es similar, pero no existe un RPA provincial con las mismas obligaciones ni un organismo con el poder sancionatorio de la DGDyPC porteña.',
      },
      {
        type: 'h2',
        id: 'votos-necesarios',
        text: '¿Cuántos votos se necesitan para cambiar de administrador en CABA?',
      },
      {
        type: 'p',
        text: 'La remoción del administrador requiere una decisión de asamblea adoptada por mayoría absoluta de los propietarios del consorcio, de acuerdo con el artículo 2060 del CCyC. En la práctica, eso significa más del 50% de las unidades funcionales, con independencia de los porcentuales de dominio, salvo que el reglamento de copropiedad establezca una mayoría especial distinta para este caso.',
      },
      {
        type: 'p',
        text: 'Si el reglamento exige dos tercios o tres cuartos para remover al administrador, ese requisito prevalece sobre la norma general del CCyC. Antes de convocar la asamblea, hay que leer el reglamento completo y ubicar la cláusula de remoción.',
      },
      {
        type: 'h2',
        id: 'los-7-pasos',
        text: 'Cómo cambiar de administrador de consorcio: los 7 pasos',
      },
      {
        type: 'p',
        text: 'Estos pasos reflejan el proceso completo desde la decisión hasta el cambio efectivo. Sin contratiempos, el tiempo entre el paso 1 y el paso 7 es de 45 a 90 días. Con conflictos, puede extenderse a 6 meses.',
      },
      {
        type: 'ol',
        items: [
          '**Relevar el reglamento de copropiedad.** Ubicar la cláusula que regula la remoción: mayoría requerida, requisitos para convocar asamblea extraordinaria y plazos de preaviso. Si el reglamento es de los años \'80 o \'90 y no menciona la Ley 941, la norma vigente prevalece en lo que se contradigan.',
          '**Reunir voluntades antes de convocar.** Hablar informalmente con propietarios para estimar si existe mayoría real antes de formalizar nada. Una asamblea que fracasa por falta de quórum le da tiempo al administrador actual y debilita la posición del grupo que impulsa el cambio.',
          '**Enviar la convocatoria a asamblea extraordinaria.** La convocatoria debe cumplir los requisitos de la Ley 941: notificación fehaciente a todos los propietarios con al menos 5 días hábiles de anticipación, especificando el orden del día. Si el orden del día no menciona explícitamente "remoción del administrador y designación del nuevo", la decisión puede impugnarse después.',
          '**Celebrar la asamblea con quórum válido y labrar el acta.** El acta debe escribirse en el Libro de Actas del consorcio durante la propia asamblea, no redactarse después. Si no hay quórum en primera convocatoria, la segunda puede hacerse el mismo día o en fecha posterior según lo que indique el reglamento.',
          '**Enviar la carta documento al administrador.** Una vez aprobada la remoción, se formaliza con carta documento o medio de similar fehaciencia. A partir de la recepción, corre el plazo para que el administrador entregue toda la documentación del consorcio.',
          '**Auditar la documentación recibida.** Verificar que el administrador entregó: libros de actas, libros contables, contratos vigentes, documentación de seguros, credenciales de acceso a cuentas bancarias y Libro de Órdenes del personal. Cada ítem faltante es una infracción a la Ley 941, susceptible de denuncia ante la DGDyPC.',
          '**Registrar al nuevo administrador en el RPA.** El nuevo administrador debe estar inscripto en el Registro Público de Administradores de CABA antes de asumir. Podés verificar la inscripción en el sitio del Gobierno de la Ciudad. Contratar a alguien sin inscripción vigente es, por sí solo, una irregularidad bajo la Ley 941.',
        ],
      },
      {
        type: 'h2',
        id: 'documentacion-saliente',
        text: '¿Qué documentación tiene que entregar el administrador saliente?',
      },
      {
        type: 'p',
        text: 'Según la Ley 941 y el artículo 2067 del CCyC, el administrador saliente está obligado a entregar:',
      },
      {
        type: 'ul',
        items: [
          'Libros de Actas del consorcio',
          'Libros de Contabilidad (o equivalente digital certificado)',
          'Reglamento de copropiedad y sus modificaciones',
          'Contratos vigentes con proveedores y personal',
          'Pólizas de seguro vigentes',
          'Credenciales y accesos a cuentas bancarias del consorcio',
          'Comprobantes de pago de los últimos años',
          'CUIL y datos del encargado y personal del edificio',
          'Libro de Órdenes del encargado (si hay personal con vivienda)',
        ],
      },
      {
        type: 'p',
        text: 'La entrega de documentación es el campo de batalla más frecuente en los cambios de administrador en el AMBA. Lo que se repite una y otra vez es que el administrador saliente "no encuentra" ciertos contratos, que los accesos bancarios tardan semanas en transferirse, o que los libros contables aparecen incompletos. Cada uno de esos incumplimientos es una infracción a la Ley 941 y habilita una denuncia ante la DGDyPC con capacidad real de producir consecuencias: desde multas hasta la suspensión del RPA. Registrá todo por escrito.',
      },
      {
        type: 'h2',
        id: 'impugnacion',
        text: '¿Qué pasa si el administrador impugna la asamblea?',
      },
      {
        type: 'p',
        text: 'Un administrador que quiere permanecer no puede "negarse" a una remoción válidamente aprobada, pero sí puede atacar el proceso por defectos formales. Las impugnaciones más frecuentes:',
      },
      {
        type: 'ul',
        items: [
          'Convocatoria sin anticipación suficiente o notificación no fehaciente',
          'Orden del día no específico sobre la remoción',
          'Quórum mal computado (por ejemplo, contando inquilinos sin mandato)',
          'Acta con errores u omisiones en la votación',
        ],
      },
      {
        type: 'p',
        text: 'Cada uno de estos defectos es evitable si se ejecuta correctamente el procedimiento desde el paso 1. Que los administradores cuestionados apelen a la forma no es coincidencia: cuando la voluntad del consorcio es clara, la única defensa disponible es el procedimiento. Por eso el cumplimiento exacto de cada paso vale más que cualquier otro factor en este proceso.',
      },
      {
        type: 'h2',
        id: 'friccion-disenada',
        text: 'Por qué el proceso está diseñado para desalentar el cambio',
      },
      {
        type: 'p',
        text: 'El procedimiento formal tiene suficientes requisitos como para que cualquier error reinicie el reloj. Eso, en la práctica, funciona como un escudo pasivo para los administradores que aprovechan la desinformación de los consorcistas. No estamos diciendo que el sistema esté diseñado con mala intención: estamos señalando que la fricción existe y que favorece al statu quo. La única defensa efectiva es conocer el procedimiento exacto, ejecutarlo sin errores y documentar cada paso.',
      },
      {
        type: 'h2',
        id: 'cuanto-tiempo',
        text: 'Cuánto tiempo lleva en la realidad',
      },
      {
        type: 'ul',
        items: [
          '**Sin contratiempos.** 45 a 90 días desde la primera convocatoria hasta el registro del nuevo administrador.',
          '**Con conflictos documentados.** 4 a 6 meses.',
          '**Con impugnaciones judiciales.** Potencialmente más de un año.',
        ],
      },
      {
        type: 'p',
        text: 'Los factores que más retrasan el proceso en edificios del AMBA:',
      },
      {
        type: 'p',
        text: '**Quórum difícil.** En edificios con alta proporción de propietarios no residentes o unidades alquiladas, reunir la mayoría presencial puede ser complicado. El artículo 2059 del CCyC admite participación por medios electrónicos si el reglamento lo permite.',
      },
      {
        type: 'p',
        text: '**Reglamento desactualizado.** Muchos reglamentos de CABA son de antes de la Ley 941 y del CCyC. En esos casos, la norma vigente prevalece sobre las cláusulas que se le contradigan.',
      },
      {
        type: 'p',
        text: '**Administrador con acceso exclusivo a la documentación.** Situación frecuente cuando el consorcio nunca tuvo copia de sus propios contratos o libros. No impide el cambio, pero complica la auditoría posterior.',
      },
    ],
    faqs: [
      {
        q: '¿Se puede cambiar de administrador sin convocar asamblea?',
        a: 'No. La remoción del administrador es una decisión que la ley reserva exclusivamente a la asamblea de propietarios. No existe mecanismo unilateral válido para hacerlo. Cualquier acción que intente saltar la asamblea crea nulidades que el administrador saliente puede explotar legalmente.',
      },
      {
        q: '¿Los inquilinos pueden votar para cambiar al administrador?',
        a: 'En general, no. El derecho de voto en las asambleas corresponde a los propietarios de las unidades funcionales. Los inquilinos solo pueden votar si tienen mandato expreso y escrito del propietario y si el reglamento lo admite expresamente.',
      },
      {
        q: '¿Qué pasa si el administrador sigue cobrando honorarios después de la remoción?',
        a: 'Una vez notificado fehacientemente de su remoción por asamblea válida, el administrador pierde el derecho a honorarios por gestiones posteriores. Si los cobra de todas formas, hay acción de repetición y denuncia ante la DGDyPC. Conservá todos los comprobantes de notificación y las acreditaciones bancarias del período posterior.',
      },
      {
        q: '¿El nuevo administrador tiene que estar inscripto en el RPA?',
        a: 'Sí, obligatoriamente. La inscripción en el Registro Público de Administradores es un requisito de la Ley 941 para CABA. Podés verificar la vigencia de cualquier administrador en el sitio del Gobierno de la Ciudad buscando por nombre o número de matrícula.',
      },
      {
        q: '¿Puedo cambiar de administrador si el consorcio tiene deudas?',
        a: 'Sí. La existencia de deudas del consorcio no impide la remoción. Lo que puede complicarse es la auditoría contable si hay irregularidades que el administrador saliente quiere ocultar.',
      },
      {
        q: '¿Cuánto cuesta hacer el cambio de administrador?',
        a: 'El proceso en sí no tiene costos fijos obligatorios más allá del costo de la carta documento y eventualmente el asesoramiento letrado si hay impugnaciones. El nuevo administrador cobra sus honorarios desde que asume, no antes.',
      },
    ],
  },
  {
    slug: '10-senales-administrador-consorcio-fallando',
    title: '10 señales de que tu administrador de consorcio está fallando (y no es paranoia)',
    excerpt:
      'De cada 10 reclamos a la DGDyPC por administración de consorcios en CABA, más de la mitad corresponden a falta de rendición de cuentas. Cómo distinguir incompetencia real de gestión normal imperfecta.',
    hub: 'Ley 941',
    date: '2026-04-22',
    readingMinutes: 8,
    ctaType: 'analizador',
    content: [
      {
        type: 'p',
        text: 'De cada 10 reclamos que llegan a la Dirección General de Defensa y Protección del Consumidor (DGDyPC) por administración de consorcios en CABA, más de la mitad corresponden a falta de rendición de cuentas y cobros sin justificación documentada. No son edificios en crisis visible: son edificios de Almagro, Flores, Núñez, donde nadie detectó el problema hasta que se acumularon meses o años de irregularidades.',
      },
      {
        type: 'p',
        text: 'El problema tiene una causa concreta: la mayoría de los consorcistas no sabe exactamente qué está obligado a hacer su administrador. Sin ese parámetro, es imposible distinguir la incompetencia real de la gestión normal imperfecta.',
      },
      {
        type: 'h2',
        id: 'obligaciones-ley-941',
        text: '¿Qué está obligado a hacer el administrador según la Ley 941?',
      },
      {
        type: 'p',
        text: 'Bajo la Ley 941 y el artículo 2067 del CCyC, el administrador de un consorcio en CABA tiene obligaciones concretas y verificables: convocar asambleas ordinarias al menos una vez por año, rendir cuentas documentadas de toda la gestión económica, mantener actualizado el seguro del edificio, conservar la documentación del consorcio, informar sobre cualquier cambio en los contratos de servicios y no percibir comisiones o beneficios de proveedores sin autorización de la asamblea.',
      },
      {
        type: 'p',
        text: 'Ese último punto —las comisiones de proveedores— es el más frecuentemente violado y el más difícil de detectar sin mirar los números.',
      },
      {
        type: 'h2',
        id: 'senales-alarma',
        text: 'Las 10 señales de alarma concretas',
      },
      {
        type: 'h3',
        id: 'senal-1-liquidaciones-sin-detalle',
        text: '1. Las liquidaciones de expensas no tienen detalle suficiente',
      },
      {
        type: 'p',
        text: 'Una liquidación bien hecha desglosa cada partida: honorarios del administrador con base de cálculo, sueldo del encargado con todos los ítems del SUTERH, factura de Aysa, factura de Edesur o Edenor, mantenimiento de ascensores con nombre del proveedor, fondo de reserva. Si la liquidación que recibís muestra solo grandes rubros ("mantenimiento", "varios", "gastos generales") sin respaldo, eso no es un estilo distinto de presentar la información: es la ausencia de la información.',
      },
      {
        type: 'h3',
        id: 'senal-2-fondo-reserva',
        text: '2. El fondo de reserva no crece o directamente no existe',
      },
      {
        type: 'p',
        text: 'El fondo de reserva es obligatorio según el artículo 2067 del CCyC. Su función es cubrir gastos extraordinarios sin necesidad de expensas especiales de emergencia. Si en tres o cuatro años de liquidaciones el fondo de reserva no muestra crecimiento real, o si nunca aparece como línea separada, hay algo que no cierra.',
      },
      {
        type: 'h3',
        id: 'senal-3-mismos-proveedores',
        text: '3. Los proveedores siempre son los mismos y nunca se pidieron tres presupuestos',
      },
      {
        type: 'p',
        text: 'La Ley 941 establece ciertos requisitos para los presupuestos. En la práctica, muchos administradores trabajan siempre con los mismos proveedores, a veces con una relación comercial que el consorcio no conoce. Si en años de gestión los plomeros, los electricistas y los ascensoristas son siempre exactamente los mismos, sin ninguna comparación documentada, vale preguntar por qué.',
      },
      {
        type: 'h3',
        id: 'senal-4-sin-asambleas',
        text: '4. Las asambleas ordinarias no se convocan todos los años',
      },
      {
        type: 'p',
        text: 'La convocatoria a asamblea ordinaria anual es una obligación legal, no una opción. Su función principal es la aprobación de la rendición de cuentas del ejercicio. Un administrador que evita las asambleas ordinarias está evitando que el consorcio apruebe —o rechace— su gestión económica. Cada año sin asamblea es un año de gestión sin control.',
      },
      {
        type: 'h3',
        id: 'senal-5-reclamos-sin-respuesta',
        text: '5. Los reclamos escritos quedan sin respuesta en el plazo legal',
      },
      {
        type: 'p',
        text: 'La Ley 941 establece plazos concretos para que el administrador responda reclamos de los consorcistas. Si mandaste una nota firmada o un mensaje con constancia de lectura y no recibiste respuesta en tiempo, eso no es descortesía: es incumplimiento formal que puede documentarse y denunciarse.',
      },
      {
        type: 'h3',
        id: 'senal-6-seguros-vencidos',
        text: '6. Los seguros del edificio están vencidos o son insuficientes',
      },
      {
        type: 'p',
        text: 'El administrador tiene la obligación de mantener vigente el seguro de incendio del edificio —obligatorio por ley— y en muchos casos el seguro de responsabilidad civil. Si pedís las pólizas y las fechas de vencimiento no coinciden con el período en curso, o si los montos asegurados no se actualizaron en años, el riesgo lo corrés vos, no el administrador.',
      },
      {
        type: 'h3',
        id: 'senal-7-sin-acceso-documentos',
        text: '7. No hay acceso a los documentos del consorcio',
      },
      {
        type: 'p',
        text: 'El reglamento de copropiedad, los libros de actas, los libros de contabilidad y los contratos vigentes son documentos del consorcio, no del administrador. Cualquier propietario tiene derecho a consultarlos. Si pedís acceso y te lo niegan, o si el administrador dice que "los tiene él" y no los puede mostrar, eso es una señal de alerta mayor.',
      },
      {
        type: 'h3',
        id: 'senal-8-aumentos-sin-justificar',
        text: '8. Los aumentos de expensas no tienen justificación explícita',
      },
      {
        type: 'p',
        text: 'Las expensas suben por razones concretas: paritarias del SUTERH, ajuste de honorarios del administrador, tarifas de Aysa o Metrogas, inflación en contratos de mantenimiento. Si las expensas subieron 40% en un año pero ninguno de esos factores explica ese incremento en las liquidaciones, la diferencia tiene que estar en algún lado. Si no aparece desglosada, la pregunta es por qué.',
      },
      {
        type: 'h3',
        id: 'senal-9-sin-rpa',
        text: '9. El administrador no está inscripto en el RPA o la inscripción está vencida',
      },
      {
        type: 'p',
        text: 'Esta es la señal más directa y la más fácil de verificar. La inscripción en el Registro Público de Administradores de CABA es obligatoria bajo la Ley 941. Si tu administrador no figura en el RPA, o si su inscripción está suspendida o vencida, está operando fuera de la ley. Podés buscarlo en el sitio del Gobierno de la Ciudad.',
      },
      {
        type: 'h3',
        id: 'senal-10-obras-sin-autorizar',
        text: '10. Hay gastos de obra que nadie autorizó en asamblea',
      },
      {
        type: 'p',
        text: 'Las obras que superen la administración ordinaria del edificio requieren autorización de asamblea. Si aparecen en la liquidación gastos de obra o refacciones importantes que nunca se aprobaron, o si los montos son notoriamente superiores a los presupuestos que te mostraron, ese es el escenario donde el daño patrimonial al consorcio puede ser más grande.',
      },
      {
        type: 'h2',
        id: 'cuantas-senales',
        text: '¿Cuántas señales son suficientes para actuar?',
      },
      {
        type: 'p',
        text: 'Con una sola de estas señales ya tenés motivo para pedir explicaciones por escrito. Con dos o más, especialmente si involucran dinero no justificado o documentación inaccesible, ya tenés base para iniciar el proceso de cambio de administrador o para hacer una denuncia ante la DGDyPC.',
      },
      {
        type: 'p',
        text: 'Lo que observamos en los casos que analizamos es que los consorcistas esperan demasiado. Esperan que "se arregle solo", que el administrador "cambie", que "no sea para tanto". El problema es que cada mes que pasa sin control es un mes de gestión que nadie va a poder auditar después con facilidad. La documentación se pierde, los proveedores ya no recuerdan, las cuentas se mezclan.',
      },
      {
        type: 'blockquote',
        text: 'La señal más cara es la que se ignoró durante dos años.',
      },
    ],
    faqs: [
      {
        q: '¿Cómo denuncio a un administrador en CABA?',
        a: 'La denuncia se realiza ante la DGDyPC a través del sitio del Gobierno de la Ciudad de Buenos Aires. Necesitás documentar el incumplimiento con constancias escritas: liquidaciones, notas sin respuesta, pólizas vencidas, o la consulta al RPA que muestra inscripción irregular. El organismo tiene capacidad de multar y suspender administradores.',
      },
      {
        q: '¿Puede el administrador demandarme si lo denuncio?',
        a: 'El ejercicio del derecho de denuncia ante organismos administrativos no genera responsabilidad civil para el denunciante, siempre que la denuncia esté fundada en hechos reales. Si la denuncia es maliciosa o falsa puede haber consecuencias, pero ese no es el escenario de un consorcista que documenta incumplimientos reales.',
      },
      {
        q: '¿Las señales de este artículo aplican en Provincia de Buenos Aires?',
        a: 'En parte. Las señales vinculadas al CCyC —fondo de reserva, obligación de rendir cuentas, documentación accesible— aplican en toda la Argentina. Las vinculadas a la Ley 941 y al RPA aplican solo en CABA. En Quilmes, Avellaneda, Lomas de Zamora o Lanús los mecanismos de denuncia son distintos y el sistema de registro de administradores no tiene el mismo desarrollo.',
      },
      {
        q: '¿Puedo pedir los libros de contabilidad del consorcio sin ser el presidente del consorcio?',
        a: 'Sí. El derecho de acceso a la documentación del consorcio corresponde a todos los propietarios, no solo al consejo de propietarios o al representante del consorcio. Si el administrador te niega el acceso, ese rechazo debe ser por escrito y fundamentado, o constituye por sí mismo una infracción denunciable.',
      },
    ],
  },
  {
    slug: 'asamblea-extraordinaria-consorcio-caba-guia',
    title: 'Asamblea extraordinaria de consorcio en CABA: guía para convocarla sin errores',
    excerpt:
      'En muchos consorcios de Caballito, Palermo o Belgrano, el freno no es la falta de voluntad: es que nadie sabe exactamente cómo se convoca una asamblea extraordinaria de manera válida.',
    hub: 'Cambiar administrador',
    date: '2026-05-05',
    readingMinutes: 7,
    ctaType: 'champion',
    content: [
      {
        type: 'p',
        text: '¿Cuántas veces escuchás en tu edificio "habría que hacer una asamblea para tratar esto" y la asamblea nunca termina de hacerse? En muchos consorcios de Caballito, Palermo o Belgrano, el freno no es la falta de voluntad: es que nadie sabe exactamente cómo se convoca de manera válida, y nadie quiere ser el responsable si después el administrador la impugna por defecto de forma.',
      },
      {
        type: 'p',
        text: 'Esta guía cierra esa brecha. Todo lo que necesitás saber para convocar y celebrar una asamblea extraordinaria que no pueda caerse por un tecnicismo.',
      },
      {
        type: 'h2',
        id: 'ordinaria-vs-extraordinaria',
        text: 'Asamblea ordinaria vs. extraordinaria: la diferencia que importa',
      },
      {
        type: 'p',
        text: 'La asamblea ordinaria se convoca una vez por año, generalmente para aprobar la rendición de cuentas y el presupuesto del ejercicio siguiente. La convoca el administrador y tiene temario predeterminado.',
      },
      {
        type: 'p',
        text: 'La asamblea extraordinaria se convoca para tratar temas específicos que no pueden esperar a la asamblea anual, o que requieren una decisión formal del consorcio al margen del ciclo regular. El cambio de administrador, la aprobación de una obra importante, la modificación del reglamento de copropiedad y la designación del consejo de propietarios son los casos más frecuentes.',
      },
      {
        type: 'p',
        text: 'La diferencia práctica más importante: la asamblea extraordinaria puede ser convocada tanto por el administrador como por los propietarios que reúnan la cantidad de firmas que exige el reglamento o, en su defecto, el CCyC.',
      },
      {
        type: 'h2',
        id: 'cuantos-propietarios',
        text: '¿Cuántos propietarios se necesitan para convocar una asamblea extraordinaria?',
      },
      {
        type: 'p',
        text: 'El CCyC, en su artículo 2059, establece que cualquier propietario puede pedirle al administrador que convoque una asamblea extraordinaria. Si el administrador no la convoca en un plazo razonable, los propietarios que representen más del 5% del total de unidades funcionales pueden convocarla directamente.',
      },
      {
        type: 'p',
        text: 'El umbral real depende del reglamento de copropiedad: muchos reglamentos de edificios de CABA fijan porcentajes diferentes o exigen que la solicitud sea firmada por un número mínimo de propietarios. Revisá el reglamento antes de hacer cualquier movimiento.',
      },
      {
        type: 'p',
        text: 'En la práctica, lo que funciona mejor es solicitar primero al administrador que la convoque, por escrito y con constancia de recepción. Si no responde en un plazo razonable —típicamente 10 a 15 días— los propietarios quedan habilitados para convocarla directamente.',
      },
      {
        type: 'h2',
        id: 'como-se-convoca',
        text: 'Cómo se convoca una asamblea extraordinaria de consorcio en CABA',
      },
      {
        type: 'p',
        text: 'Estos son los pasos formales que debe cumplir la convocatoria para ser válida:',
      },
      {
        type: 'ol',
        items: [
          '**Redactar la convocatoria con el orden del día completo.** El orden del día tiene que ser específico. "Temas varios" o "gestión del administrador" no son suficientes para votar la remoción del administrador. El punto tiene que decir explícitamente "Remoción del administrador actual y designación del nuevo administrador" para que la votación posterior sea válida e inatacable.',
          '**Establecer fecha, hora y lugar.** La asamblea puede realizarse en el edificio o en cualquier otro lugar acordado. Si se va a admitir participación remota, eso tiene que indicarse en la convocatoria junto con el medio habilitado.',
          '**Notificar fehacientemente a todos los propietarios.** La notificación tiene que ser fehaciente, es decir, con constancia de recepción. Las opciones más comunes son carta documento, telegrama colacionado, o nota con firma de recepción del propietario. Algunos reglamentos admiten el correo electrónico si fue previamente aceptado como medio de notificación.',
          '**Respetar el plazo de anticipación.** La Ley 941 y el CCyC establecen plazos mínimos de anticipación entre la notificación y la asamblea. Si la convocatoria se notifica con menos anticipación que la que exige el reglamento o la norma, la asamblea puede impugnarse.',
          '**Consignar la segunda convocatoria.** Muchos reglamentos admiten que en la misma citación se indique una segunda convocatoria para el mismo día —generalmente media hora después— o para una fecha posterior, en caso de que no haya quórum en la primera. Esto evita tener que reiniciar el proceso completo si falta quórum.',
        ],
      },
      {
        type: 'h2',
        id: 'quorum',
        text: '¿Qué quórum se necesita para sesionar?',
      },
      {
        type: 'p',
        text: 'El quórum para que la asamblea sesione válidamente depende del reglamento de copropiedad. En ausencia de previsión reglamentaria, el CCyC establece como regla general la mayoría absoluta de los propietarios para la primera convocatoria.',
      },
      {
        type: 'p',
        text: 'Para la segunda convocatoria, la mayoría de los reglamentos establecen un quórum menor —muchas veces cualquier número de propietarios presentes— o admiten que las decisiones se adopten por mayoría de los presentes. Esta es la razón por la que incluir la segunda convocatoria en la misma citación es una práctica recomendable: si falta quórum en la primera, no se pierde todo el trabajo de la convocatoria.',
      },
      {
        type: 'h2',
        id: 'sin-quorum-segunda',
        text: '¿Qué pasa si no hay quórum ni en la segunda convocatoria?',
      },
      {
        type: 'p',
        text: 'Hay que reiniciar el proceso. Esto puede ocurrir en edificios con alta proporción de propietarios no residentes o con muchas unidades alquiladas donde los dueños no participan activamente. En esos casos, la estrategia más efectiva es trabajar previamente con cada propietario de manera individual, obtener compromisos de asistencia y, si el reglamento lo permite, explorar la alternativa del voto por poder o por medios electrónicos.',
      },
      {
        type: 'p',
        text: 'El fracaso por falta de quórum no invalida los intentos anteriores ni modifica el derecho de los propietarios a seguir convocando.',
      },
      {
        type: 'h2',
        id: 'acta',
        text: 'El acta: el documento que vale más que la asamblea misma',
      },
      {
        type: 'p',
        text: 'La asamblea sin acta válida no produce efectos jurídicos. El acta tiene que:',
      },
      {
        type: 'ul',
        items: [
          'Labrarse en el Libro de Actas del consorcio durante la propia asamblea, no redactarse después con fecha de la asamblea',
          'Consignar la lista de propietarios presentes con indicación de sus unidades funcionales',
          'Registrar el desarrollo de la votación con el resultado numérico exacto',
          'Ser firmada por todos los presentes, o al menos por el presidente y el secretario de la asamblea según lo que indique el reglamento',
        ],
      },
      {
        type: 'p',
        text: 'Lo que más frecuentemente impugnan los administradores removidos es justamente el acta: omisión de firmas, registro incompleto de la votación, ausencia de algún propietario cuyo voto era necesario. El acta bien labrada es el escudo contra esas impugnaciones.',
      },
    ],
    faqs: [
      {
        q: '¿Puede el administrador negarse a convocar la asamblea extraordinaria si se la piden los propietarios?',
        a: 'No puede negarse indefinidamente. Si los propietarios solicitan la convocatoria por escrito y el administrador no responde en un plazo razonable, quedan habilitados para convocarla directamente. Ese incumplimiento también es denunciable ante la DGDyPC como falta a las obligaciones del administrador bajo la Ley 941.',
      },
      {
        q: '¿Qué pasa si el administrador convoca la asamblea pero pone un orden del día distinto al que pidieron los propietarios?',
        a: 'El administrador no puede cambiar los puntos que los propietarios pidieron expresamente que se incluyeran en el orden del día. Si lo hace, los propietarios tienen la opción de convocar ellos mismos una asamblea con el orden del día correcto, una vez vencido el plazo razonable de respuesta.',
      },
      {
        q: '¿Se puede hacer la asamblea por Zoom o WhatsApp?',
        a: 'Depende del reglamento. El CCyC admite asambleas por medios electrónicos si el reglamento lo permite o si la asamblea lo decide por unanimidad. En la práctica, muchos consorcios de CABA empezaron a usar herramientas digitales a partir de 2020 y algunos reglamentos fueron actualizados para incorporarlo. Si el reglamento no lo prevé, la presencialidad sigue siendo el requisito.',
      },
      {
        q: '¿El Libro de Actas puede ser digital?',
        a: 'La Ley 941 establece requisitos sobre los libros del consorcio. En caso de duda, el formato físico con hojas foliadas es la opción más segura para evitar impugnaciones posteriores.',
      },
    ],
  },
  {
    slug: 'carta-documento-remocion-administrador-consorcio',
    title: 'La carta documento que le cierra la puerta al administrador que no quiere irse',
    excerpt:
      'La asamblea aprobó el cambio, pero el administrador removido sigue firmando contratos y cobrando honorarios. La carta documento es el acto jurídico que produce el cese efectivo: modelo, plazos y los errores que la dejan sin valor.',
    hub: 'Cambiar administrador',
    date: '2026-05-08',
    readingMinutes: 9,
    ctaType: 'champion',
    content: [
      {
        type: 'p',
        text: 'Hay un momento muy específico en el proceso de cambio de administrador donde todo lo que se logró en la asamblea puede desmoronarse. No es en la votación. No es en el quórum. Es en los días siguientes, cuando el administrador removido sigue atendiendo el edificio como si nada, sigue firmando contratos, sigue cobrando honorarios, y el consorcio no sabe exactamente cómo frenarlo.',
      },
      {
        type: 'p',
        text: 'La carta documento es el mecanismo que cierra esa puerta. Bien hecha, es inatacable. Mal hecha, le da al administrador saliente semanas —a veces meses— de maniobra.',
      },
      {
        type: 'h2',
        id: 'no-se-manda',
        text: 'Lo que pasa cuando no se manda o se manda mal',
      },
      {
        type: 'p',
        text: 'El escenario más frecuente que vemos: la asamblea aprobó el cambio, todos se fueron contentos, y nadie mandó la carta documento esa semana. El administrador saliente, que conoce el procedimiento mejor que cualquier propietario, sigue operando. Sigue pagando proveedores —con criterio propio. Sigue siendo el interlocutor del encargado. Sigue teniendo acceso a la cuenta bancaria del consorcio.',
      },
      {
        type: 'p',
        text: 'Cada día que pasa sin notificación fehaciente es un día que el administrador puede argumentar que su gestión fue legítima. Y en algunos casos, es un día donde el daño patrimonial al consorcio sigue acumulándose.',
      },
      {
        type: 'p',
        text: 'La carta documento no es un trámite burocrático de cierre. Es el acto jurídico que produce el cambio efectivo.',
      },
      {
        type: 'h2',
        id: 'que-hace',
        text: 'Qué hace exactamente la carta documento',
      },
      {
        type: 'p',
        text: 'Tres cosas concretas desde el momento en que el administrador la recibe.',
      },
      {
        type: 'p',
        text: '**Le pone fecha al cese.** A partir de la recepción, cualquier gasto que autorice, cualquier contrato que firme y cualquier honorario que cobre es ilegítimo. Esa fecha es la línea que separa la gestión válida de la que puede reclamarse.',
      },
      {
        type: 'p',
        text: '**Activa el reloj de la entrega de documentación.** La Ley 941 establece que el administrador tiene un plazo para entregar toda la documentación del consorcio. Ese plazo no empieza con la asamblea: empieza con la notificación fehaciente. Sin carta documento, el reloj no corre.',
      },
      {
        type: 'p',
        text: '**Construye el expediente.** Si después hay que denunciar ante la DGDyPC o iniciar una acción civil, la carta documento con su acuse de recibo es la pieza central del caso. Sin ella, todo lo que vino antes —el acta, la votación, los meses de reclamos— pierde fuerza probatoria.',
      },
      {
        type: 'h2',
        id: 'elementos',
        text: 'Qué tiene que decir: los elementos que no pueden faltar',
      },
      {
        type: 'p',
        text: 'Una carta documento de remoción de administrador que resiste cualquier impugnación incluye estos elementos en este orden.',
      },
      {
        type: 'h3',
        id: 'identificacion-consorcio',
        text: '1. Identificación completa del consorcio',
      },
      {
        type: 'p',
        text: 'Nombre del edificio, dirección exacta, CUIT del consorcio. Si hay error en alguno de estos datos, el administrador puede cuestionar el destinatario de la notificación.',
      },
      {
        type: 'h3',
        id: 'identificacion-administrador',
        text: '2. Identificación del administrador con matrícula RPA',
      },
      {
        type: 'p',
        text: 'Nombre completo y número de matrícula en el Registro Público de Administradores de CABA. La matrícula no es un detalle: es lo que vincula la notificación con la persona inscripta en el organismo que tiene capacidad sancionatoria.',
      },
      {
        type: 'h3',
        id: 'referencia-asamblea',
        text: '3. Referencia exacta a la asamblea',
      },
      {
        type: 'p',
        text: 'Fecha, tipo de asamblea (extraordinaria), resultado de la votación con número de votos a favor. Esta referencia tiene que coincidir exactamente con lo que dice el acta. Cualquier discrepancia entre la carta y el acta es un punto de ataque.',
      },
      {
        type: 'h3',
        id: 'notificacion-cese',
        text: '4. Notificación expresa del cese',
      },
      {
        type: 'p',
        text: 'No alcanza con "le informamos que fue removido". Tiene que decir que el vínculo cesa a partir de la recepción de la presente, o en la fecha que haya fijado la asamblea si fijó una distinta.',
      },
      {
        type: 'h3',
        id: 'listado-documentacion',
        text: '5. Listado de documentación a entregar con plazo',
      },
      {
        type: 'p',
        text: 'Cada ítem por separado. No "la documentación del consorcio": libros de actas, libros contables, reglamento de copropiedad, contratos vigentes con proveedores, pólizas de seguro vigentes, credenciales y claves de acceso a cuentas bancarias, Libro de Órdenes del encargado. El detalle importa porque cada ítem que no aparece en la carta es un ítem que el administrador puede decir que nadie le pidió.',
      },
      {
        type: 'h3',
        id: 'quien-recibe',
        text: '6. Quién recibe y dónde',
      },
      {
        type: 'p',
        text: 'Nombre del nuevo administrador o del consorcista autorizado, con domicilio de entrega. Sin este dato, el administrador puede alegar que no sabía dónde entregar.',
      },
      {
        type: 'h2',
        id: 'modelo',
        text: 'El modelo',
      },
      {
        type: 'callout',
        title: 'Modelo de carta documento',
        tone: 'info',
        text: 'Copiá el texto que sigue, completá los datos entre corchetes y revisalo contra el acta de la asamblea antes de mandarlo. Cualquier discrepancia entre el acta y la carta es un punto de ataque.',
      },
      {
        type: 'p',
        text: '[Ciudad], [fecha].',
      },
      {
        type: 'p',
        text: 'Sr./Sra. [Nombre completo del administrador]. Matrícula RPA N° [número]. [Domicilio del administrador].',
      },
      {
        type: 'p',
        text: '**Ref.:** Notificación de remoción — Consorcio de Propietarios [dirección del edificio].',
      },
      {
        type: 'p',
        text: 'En mi carácter de [presidente del consorcio / propietario autorizado por asamblea] del Consorcio de Propietarios del edificio sito en [dirección completa], CABA, CUIT [número], me dirijo a Ud. para notificarle fehacientemente:',
      },
      {
        type: 'p',
        text: 'Con fecha [fecha], en asamblea extraordinaria convocada y celebrada con el quórum reglamentario, los propietarios resolvieron su remoción del cargo de administrador por [mayoría absoluta / indicar mayoría obtenida]. La resolución consta en el Acta N° [número] del Libro de Actas del consorcio.',
      },
      {
        type: 'p',
        text: 'A partir de la recepción de la presente queda Ud. cesado en sus funciones como administrador del consorcio mencionado.',
      },
      {
        type: 'p',
        text: 'Le requerimos que en el plazo de [X] días hábiles desde la recepción de esta notificación haga entrega de la totalidad de la documentación del consorcio a [nombre del nuevo administrador / consorcista autorizado] en [domicilio], incluyendo sin carácter taxativo: libros de actas, libros contables, reglamento de copropiedad y sus modificaciones, contratos vigentes con proveedores y personal, pólizas de seguro, credenciales y claves de acceso a cuentas bancarias del consorcio, y Libro de Órdenes del encargado.',
      },
      {
        type: 'p',
        text: 'Le solicitamos asimismo que proceda de inmediato a la transferencia de los saldos bancarios a la cuenta que le indique el nuevo administrador.',
      },
      {
        type: 'p',
        text: 'Queda Ud. notificado de que el incumplimiento de los plazos establecidos será denunciado ante la Dirección General de Defensa y Protección del Consumidor conforme la Ley 941.',
      },
      {
        type: 'p',
        text: '[Nombre y firma]. [Cargo: Presidente del Consorcio / Propietario autorizado por Acta N°]. [DNI / CUIT].',
      },
      {
        type: 'h2',
        id: 'como-mandarla',
        text: 'Cómo mandarla y qué guardar',
      },
      {
        type: 'ul',
        items: [
          '**OCA o Correo Argentino — carta documento.** El medio estándar. Guardás el comprobante de envío el día que la mandás, y el acuse de recibo cuando vuelve firmado. Esos dos documentos juntos son la prueba completa.',
          '**Telegrama colacionado.** Mismo valor legal, algo más barato, texto más corto. Si el modelo completo no entra, usá el telegrama para la notificación del cese y mandá el detalle de documentación por separado en el mismo sobre.',
          '**Acta notarial.** Cuando el administrador tiene historial de "no recibir" cartas documento o de disputar el domicilio. Un escribano se presenta en el domicilio del administrador y deja constancia de la entrega. Más caro, imposible de impugnar.',
        ],
      },
      {
        type: 'p',
        text: '**Lo que no sirve:** WhatsApp con doble tilde azul, email sin firma digital certificada, nota entregada en mano sin firma de recepción, mensaje en el grupo del edificio.',
      },
      {
        type: 'h2',
        id: 'documentacion-incompleta',
        text: 'Qué hacer cuando la documentación llega incompleta',
      },
      {
        type: 'p',
        text: 'Pasa casi siempre. El administrador entrega algo, pero falta la mitad. El error más frecuente de los consorcistas en ese momento es rechazar lo que llegó y esperar que entregue todo junto.',
      },
      {
        type: 'p',
        text: 'No hagas eso. Recibí lo que llegue y labrá un acta de recepción en ese mismo momento, detallando exactamente qué recibiste y qué faltó. Firmá vos, firmá el nuevo administrador, y si podés conseguir que firme un testigo, mejor. Esa acta es el documento que prueba el incumplimiento parcial ante la DGDyPC.',
      },
      {
        type: 'p',
        text: 'Cada ítem que falta a partir de ese momento es una infracción separada a la Ley 941. No es un problema: es munición para el reclamo.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto tiempo tiene el administrador para entregar la documentación?',
        a: 'La Ley 941 establece plazos para la entrega de documentación tras la remoción. El plazo exacto conviene verificarlo con el texto vigente de la norma al momento del cambio, ya que puede haber sido modificado por resoluciones del RPA. En la práctica, entre 10 y 15 días hábiles es el rango más habitual en los casos que conocemos.',
      },
      {
        q: '¿Qué pasa si el administrador sigue cobrando honorarios después de recibir la carta?',
        a: 'A partir de la recepción de la carta documento, cualquier honorario que cobre es cobro indebido. Hay acción de repetición civil y denuncia ante la DGDyPC. Bloqueá el acceso a la cuenta bancaria del consorcio en cuanto el nuevo administrador esté operativo, sin esperar a que el saliente "cierre" su gestión.',
      },
      {
        q: '¿Hace falta un abogado para redactar la carta documento?',
        a: 'No es obligatorio. Con el modelo de arriba y el acta de la asamblea en mano, cualquier propietario puede redactarla y mandarla. Si hay señales de que el administrador saliente va a pelear —impugnó la asamblea, tiene contratos propios con proveedores del edificio, o hay irregularidades contables— media hora con un abogado de propiedad horizontal antes de mandarla puede evitar errores costosos.',
      },
      {
        q: '¿La carta documento sirve también para denunciar al administrador ante la DGDyPC?',
        a: 'Son dos actos distintos. La carta documento es la notificación al administrador. La denuncia ante la DGDyPC es una presentación separada ante el organismo de control, con la documentación que prueba el incumplimiento. Una no reemplaza a la otra, pero la carta documento con su acuse de recibo es la pieza central de cualquier denuncia posterior.',
      },
    ],
  },
  {
    slug: 'expensas-caba-guia-auditar-reclamar',
    title: 'Expensas en CABA: guía completa para entender, auditar y reclamar (2026)',
    excerpt:
      'El rubro "honorarios del administrador" subió por encima del IPC en muchos edificios de CABA. Cómo entender la liquidación, auditarla en serio y reclamar lo que corresponde.',
    hub: 'Expensas',
    date: '2026-05-12',
    readingMinutes: 11,
    ctaType: 'analizador',
    content: [
      {
        type: 'p',
        text: 'En 2024, el rubro "honorarios del administrador" creció en promedio por encima del IPC en los edificios de más de 20 unidades en CABA. No porque las paritarias del SUTERH hayan traccionado especialmente ese ítem, sino porque muchos reglamentos permiten que los honorarios se actualicen por decisión del administrador, sin pasar por asamblea, atados a indicadores que el propio administrador propone.',
      },
      {
        type: 'p',
        text: 'Eso no significa que todos los administradores abusen. Significa que el sistema tiene puntos ciegos que se vuelven costosos exactamente cuando nadie los controla. Esta guía te da los elementos para controlarlos.',
      },
      {
        type: 'h2',
        id: 'ordinarias-extraordinarias',
        text: 'Expensas ordinarias y extraordinarias: la diferencia que define quién vota qué',
      },
      {
        type: 'table',
        headers: ['', 'Expensas ordinarias', 'Expensas extraordinarias'],
        rows: [
          [
            '**Qué incluyen**',
            'Gastos de funcionamiento habitual: sueldo del encargado, servicios (Aysa, Edesur/Edenor, Metrogas), ascensores, limpieza, honorarios del administrador, seguros',
            'Obras de mejora, reparaciones no habituales, incorporación de nuevos servicios, refuerzo del fondo de reserva',
          ],
          [
            '**Quién las aprueba**',
            'El administrador las liquida en base al presupuesto anual aprobado en asamblea',
            'Requieren aprobación de asamblea, salvo urgencia debidamente documentada',
          ],
          [
            '**Quién las paga**',
            'Todos los propietarios o inquilinos',
            'Todos los propietarios',
          ],
          [
            '**Cómo se calculan**',
            'Proporcional al coeficiente de copropiedad de cada unidad',
            'Ídem',
          ],
        ],
      },
      {
        type: 'p',
        text: 'Esta distinción no es solo técnica. Es la que define si una reparación grande podía hacerse sin convocarte a asamblea, si tenés que pagarla como inquilino, y si el administrador la podía autorizar solo.',
      },
      {
        type: 'h2',
        id: 'que-incluye-liquidacion',
        text: 'Qué tiene que incluir una liquidación de expensas bien hecha',
      },
      {
        type: 'p',
        text: 'Una liquidación que cumple con la Ley 941 y con lo que cualquier propietario tiene derecho a controlar incluye, desglosados, los siguientes ítems:',
      },
      {
        type: 'h3',
        id: 'ingresos-del-periodo',
        text: 'Ingresos del período',
      },
      {
        type: 'ul',
        items: [
          'Expensas ordinarias recaudadas',
          'Expensas extraordinarias cobradas',
          'Rendimientos del fondo de reserva si existe inversión',
          'Intereses por mora de pagos anteriores',
        ],
      },
      {
        type: 'h3',
        id: 'egresos-del-periodo',
        text: 'Egresos del período',
      },
      {
        type: 'ul',
        items: [
          'Sueldo del encargado con todos los ítems: básico según escala SUTERH vigente, horas extra, antigüedad, adicional por vivienda si corresponde, aportes patronales, aguinaldo proporcional',
          'Factura de Aysa',
          'Factura de Edesur o Edenor',
          'Factura de Metrogas si hay gas centralizado',
          'Contrato de mantenimiento de ascensores con empresa, importe y vencimiento',
          'Seguros con número de póliza, compañía, cobertura y vencimiento',
          'Honorarios del administrador con base de cálculo y porcentaje o monto fijo',
          'Limpieza y mantenimiento con nombre del proveedor',
          'Cualquier otro gasto mayor con respaldo de factura o presupuesto',
        ],
      },
      {
        type: 'h3',
        id: 'estado-de-fondos',
        text: 'Estado de fondos',
      },
      {
        type: 'ul',
        items: [
          'Saldo inicial del período',
          'Saldo final del período',
          'Fondo de reserva si existe: saldo inicial, movimientos y saldo final',
        ],
      },
      {
        type: 'p',
        text: 'Si la liquidación que recibís no tiene esta estructura, no es una cuestión de estilo: hay información a la que tenés derecho y que no se está mostrando.',
      },
      {
        type: 'h2',
        id: 'como-auditar',
        text: 'Cómo auditar las expensas de tu consorcio',
      },
      {
        type: 'p',
        text: 'Una auditoría de expensas no requiere ser contador. Requiere metodología y acceso a los documentos que el administrador tiene obligación de conservar y mostrar.',
      },
      {
        type: 'ol',
        items: [
          '**Pedí las liquidaciones de los últimos 12 meses.** Comparalas entre sí. Los rubros que crecen por encima de la inflación son los primeros candidatos a revisar con más detalle.',
          '**Verificá el sueldo del encargado contra la escala SUTERH vigente.** El SUTERH publica las escalas salariales por categoría después de cada paritaria. Si el importe liquidado no coincide con lo que le corresponde al encargado según su categoría, hay una diferencia que puede ser un error o puede ser otra cosa.',
          '**Cruzá las facturas de servicios con los importes liquidados.** Aysa, Edesur y Metrogas emiten facturas digitales. Cualquier propietario puede pedirle al administrador los comprobantes de pago. Si el importe pagado no coincide con lo que se liquidó a los propietarios, la diferencia tiene que explicarse.',
          '**Controlá los honorarios del administrador.** La Ley 941 establece que los honorarios deben estar fijados o actualizados por asamblea. Si el reglamento de tu edificio establece una fórmula de actualización automática atada al IPC, al CVS o a otro índice, verificá que esa fórmula se aplique correctamente y que haya sido aprobada en asamblea.',
          '**Revisá los comprobantes de los gastos mayores.** Verificá que los presupuestos cumplan con los requisitos de la Ley 941 y que la documentación esté disponible para consulta. Pedir varios presupuestos es una buena práctica frecuente. La falta de acceso a la documentación o el incumplimiento de estos requisitos puede constituir una infracción.',
          '**Verificá el fondo de reserva si tu edificio lo tiene.** Si existe, tiene que aparecer en cada liquidación con saldo actualizado. Si lleva años sin crecer o aparece en cero después de gastos que no pasaron por asamblea, hay que preguntar.',
        ],
      },
      {
        type: 'h2',
        id: 'cuando-aumento-problema',
        text: '¿Cuándo un aumento de expensas es un problema real?',
      },
      {
        type: 'p',
        text: 'No todo aumento es abusivo. Las expensas suben cuando suben los costos reales que las componen: paritarias del SUTERH, tarifas de Aysa, Edesur o Metrogas, inflación en contratos de mantenimiento. En un contexto inflacionario como el argentino, las expensas que no suben son, en muchos casos, la señal de que algo no está bien calculado.',
      },
      {
        type: 'p',
        text: 'El problema real no es el aumento en sí: es el aumento que no se explica. Un aumento de expensas es problemático cuando:',
      },
      {
        type: 'ul',
        items: [
          'Supera consistentemente los índices que explican los costos del edificio sin que aparezca ninguna obra o mejora que lo justifique',
          'Coincide con el vencimiento del contrato con un proveedor y la renovación no fue a licitación',
          'Se explica principalmente por el crecimiento de los honorarios del administrador sin aprobación de asamblea',
          'Aparece concentrado en el rubro "gastos de administración y varios" sin desglose',
        ],
      },
      {
        type: 'p',
        text: 'En los edificios de más de 15 unidades en Palermo, Belgrano y Recoleta que analizamos, el ítem que más frecuentemente crece por encima del resto —y el que menos frecuentemente tiene documentación de respaldo disponible— es exactamente ese: "gastos de administración y varios". Es un rubro lo suficientemente amplio como para absorber muchas cosas.',
      },
      {
        type: 'h2',
        id: 'fondo-reserva',
        text: 'El fondo de reserva: qué es y por qué conviene tenerlo',
      },
      {
        type: 'p',
        text: 'El CCyC no impone la creación de un fondo de reserva como obligación universal. El artículo 2046 establece que el propietario está obligado a contribuir al fondo de reserva "si lo hay", lo que significa que su existencia depende de lo que haya resuelto cada consorcio en su reglamento o en asamblea.',
      },
      {
        type: 'p',
        text: 'Dicho eso, los consorcios que tienen un fondo de reserva bien constituido están en una posición notablemente mejor frente a gastos imprevistos: una rotura de cañería, un problema en el ascensor o un siniestro cubierto parcialmente por el seguro se absorben sin necesidad de cobrar expensas extraordinarias de emergencia ni de pedirle plata a los propietarios en 48 horas.',
      },
      {
        type: 'p',
        text: 'Lo que vemos en los edificios que se suman a nuestra plataforma es que cuando el fondo existe, en muchos casos el saldo real es mínimo o no está invertido en ningún instrumento que lo proteja de la inflación. Un fondo que nominalmente tiene $500.000 pesos pero no fue actualizado en dos años vale, en términos reales, una fracción de lo que debería. Si tu consorcio tiene fondo de reserva, la decisión sobre cómo administrarlo debería pasar por asamblea, no quedar en criterio exclusivo del administrador.',
      },
      {
        type: 'h2',
        id: 'que-podes-reclamar',
        text: 'Qué podés reclamar y ante quién',
      },
      {
        type: 'p',
        text: '**Ante el administrador:** cualquier propietario puede pedir por escrito acceso a las facturas, contratos y comprobantes de pago. El administrador tiene obligación de responder en plazo. Si no responde, eso es denunciable.',
      },
      {
        type: 'p',
        text: '**Ante la DGDyPC:** la falta de rendición de cuentas, la negativa a mostrar documentación, la falta de convocatoria a asamblea ordinaria y los honorarios cobrados sin aprobación de asamblea son infracciones a la Ley 941. La DGDyPC puede intimar al administrador, multar y suspender su inscripción en el RPA.',
      },
      {
        type: 'p',
        text: '**En asamblea:** los consorcistas tienen derecho a someter cualquier punto económico a votación. Si la asamblea no aprueba la rendición de cuentas, el administrador no puede darse por descargado de su gestión.',
      },
      {
        type: 'p',
        text: '**En sede judicial:** si hay daño patrimonial demostrable, hay acción civil. Es la vía más costosa y lenta, pero la que puede producir reparación económica real.',
      },
    ],
    faqs: [
      {
        q: '¿Las expensas pueden subir sin que lo vote la asamblea?',
        a: 'Las expensas ordinarias pueden ajustarse dentro del presupuesto anual aprobado en asamblea. Si los costos reales superan el presupuesto por una paritaria más alta o un aumento de tarifa, el administrador puede liquidar por encima, pero debe informarlo y someterlo a aprobación en la próxima asamblea ordinaria. Los honorarios del administrador específicamente deben estar fijados o actualizados por asamblea.',
      },
      {
        q: '¿El inquilino tiene que pagar las expensas extraordinarias?',
        a: 'En la mayoría de los casos, no. Las expensas extraordinarias suelen ser responsabilidad del propietario, aunque esto puede variar según lo que establezca cada contrato de alquiler. Si tenés dudas sobre tu situación específica, revisá el contrato o consultalo con la inmobiliaria interviniente.',
      },
      {
        q: '¿Cómo sé si el administrador está cobrando comisiones de los proveedores?',
        a: 'Es difícil saberlo sin una auditoría, porque las comisiones no suelen aparecer en los estados contables del consorcio: son pagadas directamente por el proveedor al administrador. La señal indirecta más frecuente es que los precios de ciertos servicios son consistentemente más altos que los del mercado para edificios similares, y que los proveedores no cambian nunca aunque haya quejas. La Ley 941 prohíbe expresamente que el administrador perciba beneficios de proveedores sin autorización expresa de asamblea.',
      },
      {
        q: '¿Qué pasa si no pago las expensas?',
        a: 'Las expensas impagas generan intereses punitorios según lo que establezca el reglamento de copropiedad. El consorcio puede iniciar juicio ejecutivo por la deuda, que tiene un trámite relativamente ágil. La deuda de expensas no se detiene alegando que el administrador no rinde cuentas: son dos cuestiones separadas en la jurisprudencia porteña.',
      },
      {
        q: '¿Puedo dejar de pagar las expensas si sospecho irregularidades?',
        a: 'No es recomendable. La deuda de expensas es ejecutable judicialmente y las irregularidades del administrador no son una defensa válida para el no pago. La vía correcta es pagar y simultáneamente reclamar, documentar e iniciar el proceso de control o cambio de administrador. Las dos cosas se pueden hacer al mismo tiempo.',
      },
      {
        q: '¿La DGDyPC puede obligar al administrador a devolver dinero?',
        a: 'La DGDyPC tiene facultades sancionatorias —multas, suspensión del RPA— pero no puede ordenar la devolución de dinero al consorcio, eso es una acción civil. Sin embargo, la sola apertura de un sumario ante la DGDyPC suele producir un efecto práctico: muchos administradores aceleran la rendición de cuentas y la entrega de documentación cuando ven que el proceso sancionatorio avanzó.',
      },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getRelatedArticles(slug: string, hub: Hub, limit = 3): Article[] {
  return articles
    .filter((a) => a.slug !== slug && a.hub === hub)
    .slice(0, limit)
}

export function countWordsInContent(content: ContentBlock[]): number {
  let count = 0
  for (const block of content) {
    if (block.type === 'p' || block.type === 'h2' || block.type === 'h3') {
      count += block.text.split(/\s+/).length
    } else if (block.type === 'ul' || block.type === 'ol') {
      count += block.items.reduce((n, item) => n + item.split(/\s+/).length, 0)
    } else if (block.type === 'blockquote' || block.type === 'callout') {
      count += block.text.split(/\s+/).length
    } else if (block.type === 'table') {
      count += block.rows.flat().reduce((n, cell) => n + cell.split(/\s+/).length, 0)
      count += block.headers.reduce((n, h) => n + h.split(/\s+/).length, 0)
    }
  }
  return count
}

export function readingMinutesFromContent(content: ContentBlock[]): number {
  const words = countWordsInContent(content)
  return Math.max(1, Math.round(words / 220))
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function extractHeadings(
  content: ContentBlock[],
): { id: string; text: string; level: 2 | 3 }[] {
  return content
    .filter((b): b is Extract<ContentBlock, { type: 'h2' | 'h3' }> =>
      b.type === 'h2' || b.type === 'h3',
    )
    .map((b) => ({ id: b.id, text: b.text, level: b.type === 'h2' ? 2 : 3 }))
}
