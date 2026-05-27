import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso del sitio dominium.com.ar, del analizador de expensas con IA (Vero) y de los servicios de administración de consorcios de Dominium SAS.",
  alternates: { canonical: "/terminos" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "14 de mayo de 2026";

export default function TerminosPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Términos y Condiciones"
      lastUpdated={LAST_UPDATED}
    >
      <h2>1. Quiénes somos</h2>
      <p>
        Este sitio (<a href="https://www.dominium.com.ar">dominium.com.ar</a>) es
        operado por <strong>Dominium SAS</strong> (en adelante, &ldquo;Dominium&rdquo;), con
        domicilio en la Ciudad Autónoma de Buenos Aires, Argentina. Podés
        contactarnos en{" "}
        <a href="mailto:hola@dominium.com.ar">hola@dominium.com.ar</a>.
      </p>

      <h2>2. Aceptación de los términos</h2>
      <p>
        El uso de este sitio y de los servicios que ofrecemos (incluyendo el
        analizador de liquidaciones de expensas con inteligencia artificial,
        denominado &ldquo;Vero&rdquo;, los formularios de contacto y los servicios de
        administración de consorcios) implica la aceptación plena de estos
        Términos y Condiciones. Si no estás de acuerdo con alguno de los puntos,
        no utilices el sitio ni los servicios.
      </p>

      <h2>3. Descripción de los servicios</h2>
      <p>Dominium ofrece, a través de este sitio:</p>
      <ul>
        <li>
          <strong>Analizador de expensas con IA (Vero):</strong> herramienta
          gratuita que recibe una liquidación de expensas (imagen o PDF) y
          devuelve un análisis orientativo de sus rubros mediante modelos de
          lenguaje de terceros.
        </li>
        <li>
          <strong>Contacto comercial:</strong> formularios para solicitar
          información sobre cambio de administrador o servicios de
          administración de consorcios.
        </li>
        <li>
          <strong>Contenido editorial:</strong> guías y artículos del blog sobre
          consorcios, expensas, Ley 941 y normativa de propiedad horizontal.
        </li>
        <li>
          <strong>Servicios de administración:</strong> bajo contrato separado
          con cada consorcio, Dominium puede actuar como administradora bajo el
          régimen de propiedad horizontal aplicable.
        </li>
      </ul>

      <h2>4. El análisis con IA es orientativo</h2>
      <p>
        El informe generado por Vero es una <strong>estimación automatizada</strong>{" "}
        producida por inteligencia artificial. Sus resultados:
      </p>
      <ul>
        <li>No constituyen asesoramiento legal, contable, ni financiero profesional.</li>
        <li>
          No deben utilizarse como prueba única en procedimientos judiciales,
          administrativos o asamblearios.
        </li>
        <li>
          Pueden contener errores derivados de la calidad de la imagen subida,
          de la liquidación original, o de las limitaciones del modelo de IA.
        </li>
      </ul>
      <p>
        Antes de tomar decisiones relevantes (cambio de administrador, denuncia,
        impugnación), consultá con un profesional habilitado.
      </p>

      <h2>5. Uso aceptable</h2>
      <p>Al usar el sitio te comprometés a:</p>
      <ul>
        <li>
          No subir documentos que contengan datos personales de terceros sin su
          consentimiento, ni archivos que no sean liquidaciones de expensas
          legítimas.
        </li>
        <li>
          No realizar acciones que puedan dañar, sobrecargar o interferir con el
          funcionamiento del sitio o de la API (scraping masivo, ataques, etc.).
        </li>
        <li>
          No utilizar el sitio con fines ilícitos, fraudulentos o contrarios a
          la moral o las buenas costumbres.
        </li>
        <li>
          No suplantar la identidad de otra persona en los formularios de
          contacto.
        </li>
      </ul>

      <h2>6. Propiedad intelectual</h2>
      <p>
        Los contenidos del sitio (textos, diseños, logos, marca &ldquo;Dominium&rdquo;,
        marca &ldquo;Vero&rdquo;, guías del blog, código fuente) son propiedad de Dominium
        SAS o utilizados bajo licencia. Está permitido compartir links a las
        guías del blog y al sitio. No está permitida la reproducción total o
        sustancial del contenido sin autorización previa por escrito.
      </p>
      <p>
        El archivo de liquidación que cada usuario sube al analizador es de
        titularidad del propio usuario o del consorcio al que pertenece;
        Dominium lo procesa únicamente para producir el informe solicitado, en
        los términos descriptos en la{" "}
        <Link href="/privacidad">Política de Privacidad</Link>.
      </p>

      <h2>7. Limitación de responsabilidad</h2>
      <p>
        En la máxima medida permitida por la ley argentina, Dominium no será
        responsable por:
      </p>
      <ul>
        <li>
          Decisiones tomadas por los usuarios en base a los resultados del
          analizador con IA.
        </li>
        <li>
          Interrupciones, errores o demoras temporales del sitio, del
          analizador, o de los proveedores de infraestructura (Vercel, Anthropic,
          Resend, Cresium, entre otros).
        </li>
        <li>
          Pérdida de datos por causas atribuibles al usuario (subir archivos
          dañados, formato no soportado, etc.).
        </li>
      </ul>
      <p>
        Esta limitación no aplica a obligaciones que sean indelegables por ley,
        ni a la responsabilidad por dolo o culpa grave.
      </p>

      <h2>8. Servicios de administración (contrato separado)</h2>
      <p>
        Si Dominium llega a ser designada formalmente como administradora de un
        consorcio, la relación entre Dominium y ese consorcio se regirá por:{" "}
        <strong>(a)</strong> el reglamento de copropiedad del edificio,{" "}
        <strong>(b)</strong> el Código Civil y Comercial de la Nación
        (especialmente arts. 2065 a 2069), <strong>(c)</strong> la Ley 941 de
        CABA cuando aplique, y <strong>(d)</strong> el contrato específico de
        administración que se firme por separado. Estos Términos no reemplazan
        ese contrato.
      </p>

      <h2>9. Modificaciones</h2>
      <p>
        Podemos actualizar estos Términos en cualquier momento. La versión
        vigente es siempre la publicada en esta página, con la fecha de última
        actualización al inicio. El uso continuado del sitio luego de una
        modificación implica aceptación de la nueva versión.
      </p>

      <h2>10. Ley aplicable y jurisdicción</h2>
      <p>
        Estos Términos se rigen por las leyes de la República Argentina. Para
        cualquier controversia derivada del uso del sitio o de los servicios
        ofrecidos a través del mismo, las partes se someten a la jurisdicción
        de los tribunales ordinarios de la Ciudad Autónoma de Buenos Aires, sin
        perjuicio de los fueros que correspondan al consumidor cuando aplique
        la Ley 24.240 de Defensa del Consumidor.
      </p>

      <h2>11. Contacto</h2>
      <p>
        Para consultas, reclamos o ejercicio de derechos sobre estos términos,
        escribinos a{" "}
        <a href="mailto:hola@dominium.com.ar">hola@dominium.com.ar</a>.
      </p>
    </LegalLayout>
  );
}
