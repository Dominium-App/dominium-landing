# Design Brief — Dominium Landing

*Fuente: derivado de `PRODUCT.md` (2026-07-07). El brief complementa ese contrato, no lo reemplaza — ante conflicto, gana `PRODUCT.md`.*

## 1. Product purpose

La landing hace que un visitante entienda en segundos que Dominium reemplaza al administrador tradicional de consorcios con Vero (una IA que atiende 24/7 por WhatsApp), banca regulada por BCRA (CVU propio del consorcio) y una app donde cada peso queda a la vista — al mismo costo que la administración actual.

## 2. Primary user

Vecino de consorcio (propietario o inquilino) en CABA/AMBA que llega desde Google — típicamente en el celular — harto de expensas que suben sin explicación y un administrador que no contesta; secundario: el presidente de consejo que necesita argumentos concretos para la asamblea.

## 3. Principles

En orden de resolución de conflictos (si dos aplican, gana el de arriba):

1. **El producto es el protagonista, tal como existe.** Mockups fieles a las pantallas reales de la app en producción, nunca al spec no shippeado ni ilustraciones genéricas. Ante la duda, verificar contra el working tree de dominium-mobile.
2. **Mostrar, no prometer.** Cada claim se demuestra: la conversación de las 2 AM, el desglose por rubro, el CVU con alias. Lo que el producto no hace todavía, no aparece.
3. **La plata se trata con respeto.** Montos en cifras tabulares formato es-AR ($ 1.234,56), jerarquía tipográfica clara, hairlines en vez de sombras.
4. **Una idea por pantalla.** Scroll largo con secciones que no se pisan; si dos secciones dicen lo mismo, sobra una.
5. **Verde bosque como identidad, no como decoración.** `#1A3A2A` carga superficies enteras (hero, footer); Playfair Display solo para el wordmark y momentos editoriales.

## 4. Success metric

El visitante entiende qué es Dominium dentro del primer viewport y ejecuta una de las dos conversiones observables: inicia el análisis gratuito de expensas, o abre la conversación de WhatsApp con Vero (hablar con Vero ES probar el producto).

## 5. Out of scope

- No hay prueba social inventada: cero testimonios, cero contadores de clientes; la confianza se construye con especificidad (BCRA, SUTERH, CAPHAI, CCyC) y mostrando el producto real.
- No usa el patrón template-SaaS: grids de cards idénticas ícono+título+párrafo, hero-metric con gradientes.
- No usa rojo para egresos: el dinero que sale va en tinta neutra; el rojo se reserva para problemas reales (mora, vencido).
- La home no vende el Plan de Retiro a administradores — eso vive en `/administradores`.
- No muestra features no shippeadas ni pantallas del spec de rediseño de la app.

## 6. Learned constraints

- **2026-07-07** — Piso de accesibilidad heredado de `PRODUCT.md`: WCAG AA (≥4.5:1 en cuerpo; la tinta terciaria `#9B9A96` no se usa sobre fondos claros para texto informativo); `prefers-reduced-motion` respetado en todo reveal/count-up; foco visible por teclado, hover nunca único estado; es-AR, un solo `h1` por página. *Why:* declarado como requisito del producto, no preferencia estética.
- **2026-07-07** — Voz de Vero: cero emojis, cero jerga corporativa, voseo rioplatense, frases cortas. *Why:* la voz es parte del producto que la landing demuestra.
- **2026-07-07** — Rojo en mockups de la app: la app real (`dominium-mobile` `finances.tsx`) muestra los egresos en rojo (`Colors.error`, dots `#F87171`/`#4ADE80`), así que los mockups de la landing lo replican tal cual. Resolución de conflicto: el principio 1 (fidelidad al producto shippeado) gana sobre la anti-referencia "no rojo para egresos", que sigue rigiendo para la UI propia de la landing (tablas del analizador, comparador, informes). *Why:* un mockup "corregido" dejaría de ser el producto real; si la app cambia, el mockup la sigue.
- **2026-07-07** — La landing es single-mode claro por diseño: no se autora dark mode (`color-scheme: light`). El único `themeColor` dark (`#12281D`) existe solo para el chrome del navegador. *Why:* decisión deliberada, no deuda — evita que un auditor futuro lo marque como gap.
- **2026-07-07** — Sin stagger entre personas, ni de layout ni de entrada: los miembros del equipo van todos a la misma altura y aparecen al mismo tiempo (sin delays escalonados en el reveal). El escalonado —espacial o temporal— queda reservado para bloques donde el orden significa algo (audiencias por prioridad, pasos).
