# Product

## Register

brand

## Users

- **Vecinos de consorcios (propietarios e inquilinos) en CABA y AMBA.** Llegan hartos: expensas que suben sin explicación, administrador que no contesta, liquidaciones opacas. Buscan en Google "expensas muy altas", "auditar expensas", "cambiar administrador".
- **Presidentes de consejo / propietarios activos.** Los que pueden mover al edificio a cambiar de administración. Necesitan argumentos concretos para convencer al resto en asamblea.
- **Administradores tradicionales** considerando el Plan de Retiro (18 meses de comisiones residuales por traspasar su cartera).

## Product Purpose

Dominium es una administración de consorcios AI-first en Argentina: reemplaza al administrador tradicional con Vero (una IA que atiende a los vecinos 24/7 por WhatsApp), infraestructura bancaria regulada por BCRA (CVU propio del consorcio vía Cresium) y una app donde cada peso del edificio queda a la vista. Cuesta lo mismo que la administración actual (el honorario clásico, un porcentaje de las expensas).

La landing debe lograr que un visitante entienda en segundos qué es Dominium, y convertir por dos vías: el analizador gratuito de expensas (momento "wow" sin registro) y la conversación directa con Vero por WhatsApp (hablar con Vero ES probar el producto).

## Brand Personality

Fintech-premium sobria y cálida a la vez. Voz rioplatense con voseo, directa, frases cortas, como la administradora que te conoce hace años. Cero jerga corporativa, cero emojis en la voz de Vero, cero promesas infladas. Referencias declaradas: Apple Wallet, Revolut, Mercury, Ramp, Linear.

## Anti-references

- Template SaaS genérico: grids de cards idénticas con ícono + título + párrafo, hero-metric con gradientes.
- ERPs y dashboards administrativos (Tango Gestión).
- Prueba social inventada: no hay testimonios ni contadores de clientes; la confianza se construye con especificidad (BCRA, SUTERH, CAPHAI, CCyC) y mostrando el producto real.
- Rojo para egresos: el dinero que sale va en tinta neutra; el rojo se reserva para problemas reales (mora, vencido).

## Design Principles

1. **El producto es el protagonista, tal como existe.** Mockups fieles a las pantallas reales de la app en producción (home con card verde de expensa, pago por CVU con countdown, tab Finanzas como extracto), nunca al spec de rediseño no shippeado ni ilustraciones genéricas. Ante la duda, verificar contra el working tree de dominium-mobile.
2. **Mostrar, no prometer.** Cada claim se demuestra: la conversación de las 2 AM, el desglose por rubro, el CVU con alias. Lo que el producto no hace todavía, no aparece.
3. **La plata se trata con respeto.** Montos en cifras tabulares con formato es-AR ($ 1.234,56), jerarquía tipográfica clara, hairlines en vez de sombras.
4. **Una idea por pantalla.** Scroll largo con secciones que no se pisan entre sí; si dos secciones dicen lo mismo, sobra una.
5. **Verde bosque como identidad, no como decoración.** #1A3A2A carga superficies enteras (hero, footer, sidebar del panel); Playfair Display solo para el wordmark y momentos editoriales.

## Accessibility & Inclusion

- WCAG AA: contraste ≥4.5:1 en texto de cuerpo (la tinta terciaria #9B9A96 no se usa sobre fondos claros para texto informativo).
- `prefers-reduced-motion` respetado en todo reveal, count-up y animación.
- Foco visible por teclado en todos los interactivos; hover nunca es el único estado.
- Español argentino (es-AR), un solo h1 por página, jerarquía de headings real.
