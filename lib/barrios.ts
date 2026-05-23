export type Barrio = {
  slug: string
  nombre: string
  comuna: string
  caracteristicas: string[]
  /** Frase corta para meta description (max ~120 chars) */
  hookSeo: string
  /** Frase para el H1/hero */
  hookHero: string
  /** Notas locales: tipo de edificios, contexto urbano */
  contexto: string
  /** Barrios linderos (para internal linking) */
  vecinos: string[]
}

export const BARRIOS: Barrio[] = [
  {
    slug: 'palermo',
    nombre: 'Palermo',
    comuna: '14',
    caracteristicas: [
      'Mezcla de edificios nuevos premium y construcciones de los 70-80',
      'Amenities frecuentes (SUM, gym, piscina) en torres recientes',
      'Costo de servicios y proveedores por encima del promedio CABA',
      'Alta rotación de propietarios e inquilinos',
    ],
    hookSeo:
      'Administrador de consorcio en Palermo. Auditoría de expensas con IA. Transparencia y trazabilidad para edificios de Palermo Soho, Hollywood y Chico.',
    hookHero:
      'La administración que tu edificio de Palermo merece.',
    contexto:
      'Palermo concentra una alta densidad de edificios en propiedad horizontal, con realidades muy distintas según subzona: torres premium con amenities completos en Palermo Chico y Las Cañitas, edificios de los 70-80 en Palermo Viejo, y construcciones recientes en Palermo Hollywood y Soho. Los honorarios de administración suelen estar por encima del promedio porteño.',
    vecinos: ['villa-crespo', 'belgrano', 'recoleta', 'colegiales'],
  },
  {
    slug: 'belgrano',
    nombre: 'Belgrano',
    comuna: '13',
    caracteristicas: [
      'Edificios consolidados con encargado permanente',
      'Belgrano R con casas y edificios bajos; Belgrano C con torres',
      'Proveedores tradicionales con contratos de larga data',
      'Población estable, asambleas con quórum predecible',
    ],
    hookSeo:
      'Administrador de consorcio en Belgrano. Auditoría de expensas con IA y administración transparente para edificios de Belgrano C, R y Bajo Belgrano.',
    hookHero:
      'Administración moderna para edificios de Belgrano.',
    contexto:
      'Belgrano combina edificios de larga data (Belgrano C y Bajo Belgrano) con desarrollos más recientes. Es una de las zonas con mayor proporción de encargados permanentes y servicios contratados a largo plazo, lo que muchas veces genera rubros sin licitación renovados automáticamente desde hace años.',
    vecinos: ['nunez', 'palermo', 'colegiales'],
  },
  {
    slug: 'caballito',
    nombre: 'Caballito',
    comuna: '6',
    caracteristicas: [
      'Alta densidad de edificios en propiedad horizontal',
      'Caballito Norte y Sur con perfiles distintos',
      'Honorarios de administradores levemente por debajo del promedio',
      'Asambleas activas y propietarios involucrados',
    ],
    hookSeo:
      'Administrador de consorcio en Caballito. Auditá tus expensas con IA. Transparencia y reducción de gastos para edificios de Caballito Norte y Sur.',
    hookHero:
      'Tu consorcio en Caballito, administrado distinto.',
    contexto:
      'Caballito tiene una densidad altísima de edificios en propiedad horizontal y propietarios involucrados, lo que históricamente ha generado asambleas activas. Es uno de los barrios donde más cambios de administrador se procesan al año en CABA.',
    vecinos: ['almagro', 'villa-crespo', 'flores'],
  },
  {
    slug: 'recoleta',
    nombre: 'Recoleta',
    comuna: '2',
    caracteristicas: [
      'Edificios antiguos de alto valor patrimonial',
      'Costos de mantenimiento más altos por instalaciones complejas',
      'Encargados permanentes en casi todos los edificios',
      'Asambleas más formales, reglamentos de copropiedad antiguos',
    ],
    hookSeo:
      'Administrador de consorcio en Recoleta. Auditoría de expensas con IA y administración transparente para edificios patrimoniales y modernos.',
    hookHero:
      'Recoleta merece administración a la altura.',
    contexto:
      'Recoleta concentra muchos edificios patrimoniales de alto valor con instalaciones complejas (ascensores antiguos, calderas centrales, fachadas catalogadas). Esto se traduce en gastos de mantenimiento más altos pero también en mayor margen para optimización con proveedores adecuados.',
    vecinos: ['palermo'],
  },
  {
    slug: 'villa-crespo',
    nombre: 'Villa Crespo',
    comuna: '15',
    caracteristicas: [
      'Edificios de los 70 y 80 conviviendo con nuevos desarrollos',
      'Buen mix de unidades funcionales y departamentos familiares',
      'Asambleas con quórum a veces difícil',
      'Costos intermedios entre Palermo y Almagro',
    ],
    hookSeo:
      'Administrador de consorcio en Villa Crespo. Auditá tus expensas con IA. Transparencia total para edificios del barrio.',
    hookHero:
      'Villa Crespo: tu edificio puede pagar menos.',
    contexto:
      'Villa Crespo mezcla edificios de los 70 y 80, construcciones más recientes y propietarios con perfiles diversos. Es uno de los barrios donde más liquidaciones auditamos con discrepancias entre lo que cobra el administrador y los valores de mercado.',
    vecinos: ['palermo', 'caballito', 'almagro'],
  },
  {
    slug: 'almagro',
    nombre: 'Almagro',
    comuna: '5',
    caracteristicas: [
      'Densidad altísima de edificios en propiedad horizontal',
      'Predominan construcciones de los 60-80 con encargado SUTERH',
      'Proveedores históricos cuyas tarifas raramente se renegocian',
      'Propietarios involucrados, asambleas activas',
    ],
    hookSeo:
      'Administrador de consorcio en Almagro. Auditá tus expensas con IA. Transparencia para edificios de Almagro Norte y Sur.',
    hookHero:
      'Almagro: tu edificio, sin sorpresas en la liquidación.',
    contexto:
      'Almagro tiene una de las densidades de propiedad horizontal más altas de CABA, con edificios construidos entre los 60 y los 80 que requieren mantenimiento intensivo. Los consorcios suelen tener encargado SUTERH y contratos con proveedores históricos que rara vez se ponen a licitación, lo que abre un margen claro de optimización cuando se auditan partida por partida.',
    vecinos: ['caballito', 'villa-crespo'],
  },
  {
    slug: 'nunez',
    nombre: 'Núñez',
    comuna: '13',
    caracteristicas: [
      'Edificios residenciales tranquilos cerca del Río de la Plata',
      'Mezcla de casas, edificios bajos y torres sobre Cabildo',
      'Encargado permanente común en la mayoría de los edificios',
      'Propietarios estables, reglamentos de copropiedad antiguos',
    ],
    hookSeo:
      'Administrador de consorcio en Núñez. Administración transparente con IA para edificios sobre Cabildo y zonas residenciales cerca del Río.',
    hookHero:
      'Núñez merece administración a la altura del barrio.',
    contexto:
      'Núñez combina edificios de altura sobre la avenida Cabildo con zonas residenciales más tranquilas hacia el Río de la Plata. Es un barrio de propietarios estables, con encargados permanentes en la mayoría de los edificios y reglamentos de copropiedad de larga data, lo que dificulta renegociar proveedores sin una auditoría previa.',
    vecinos: ['belgrano'],
  },
  {
    slug: 'colegiales',
    nombre: 'Colegiales',
    comuna: '13',
    caracteristicas: [
      'Ex zona industrial reconvertida en barrio residencial premium',
      'Edificios nuevos con amenities completos (SUM, gym, pileta)',
      'Propietarios jóvenes y alta demanda de alquileres',
      'Costos de proveedores en alza por la cantidad de servicios comunes',
    ],
    hookSeo:
      'Administrador de consorcio en Colegiales. Auditá expensas con IA. Administración moderna para edificios premium y reconvertidos.',
    hookHero:
      'Colegiales: administración tan moderna como tu edificio.',
    contexto:
      'Colegiales se transformó de zona industrial en uno de los barrios con más desarrollos premium de CABA. Predominan edificios nuevos con amenities completos que requieren administradores capaces de manejar proveedores múltiples, expensas con muchos rubros y costos en alza sin que el propietario pierda visibilidad de a dónde se va cada peso.',
    vecinos: ['belgrano', 'palermo'],
  },
  {
    slug: 'flores',
    nombre: 'Flores',
    comuna: '7',
    caracteristicas: [
      'Barrio extenso con perfiles muy diversos según subzona',
      'Edificios de los 70-80 conviven con torres recientes sobre Rivadavia',
      'Comercio activo y demanda inmobiliaria sostenida',
      'Costos de administración por debajo del promedio CABA',
    ],
    hookSeo:
      'Administrador de consorcio en Flores. Auditoría de expensas con IA. Transparencia para edificios de Flores Norte y Sur.',
    hookHero:
      'Tu consorcio en Flores, administrado distinto.',
    contexto:
      'Flores es uno de los barrios más extensos y heterogéneos de CABA, con edificios desde los 60 hasta torres premium recientes sobre Rivadavia y Pedro Goyena. Los costos de administración suelen ser menores al promedio porteño, pero la dispersión de proveedores genera oportunidades concretas de optimización cuando se audita la liquidación con criterio.',
    vecinos: ['caballito'],
  },
]

export function getBarrio(slug: string): Barrio | undefined {
  return BARRIOS.find((b) => b.slug === slug)
}

export const BARRIO_SLUGS = BARRIOS.map((b) => b.slug)
