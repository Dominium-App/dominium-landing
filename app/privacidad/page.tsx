import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo Dominium SAS recolecta, usa y protege tus datos personales: analizador de expensas, formularios de contacto, cookies y derechos del titular según Ley 25.326.",
  alternates: { canonical: "/privacidad" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "10 de julio de 2026";

export default function PrivacidadPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Política de Privacidad"
      lastUpdated={LAST_UPDATED}
    >
      <h2>1. Quién es el responsable de tus datos</h2>
      <p>
        El responsable del tratamiento de los datos personales recolectados a
        través de <a href="https://www.dominium.com.ar">dominium.com.ar</a> y de
        la <strong>aplicación móvil Dominium</strong> (iOS y Android) es{" "}
        <strong>Dominium SAS</strong>, con domicilio en la Ciudad Autónoma de
        Buenos Aires, Argentina. Para cualquier consulta relacionada con tus
        datos, podés escribirnos a{" "}
        <a href="mailto:hola@dominium.com.ar">hola@dominium.com.ar</a>.
      </p>

      <h2>2. Qué datos recolectamos</h2>
      <p>
        Recolectamos sólo los datos necesarios para prestar el servicio.
        Específicamente:
      </p>
      <ul>
        <li>
          <strong>Datos del formulario del analizador de expensas:</strong>{" "}
          nombre, localidad (barrio o partido) y número de WhatsApp. Los pedimos
          para enviarte el informe generado por Vero.
        </li>
        <li>
          <strong>Archivos de liquidación de expensas:</strong> el documento
          (PDF, JPG, PNG o WEBP) que subís al analizador. Se procesa
          exclusivamente para generar tu informe.
        </li>
        <li>
          <strong>Datos del formulario de contacto para administradores:</strong>{" "}
          nombre y un dato de contacto (email o teléfono) que vos elijas
          informar.
        </li>
        <li>
          <strong>Datos técnicos:</strong> dirección IP, tipo de dispositivo,
          navegador, páginas visitadas y eventos de uso, recolectados con fines
          de analítica anónima.
        </li>
      </ul>
      <p>
        En la <strong>aplicación móvil Dominium</strong> (para vecinos,
        administradores y proveedores) recolectamos, además:
      </p>
      <ul>
        <li>
          <strong>Datos de tu cuenta y tu consorcio:</strong> nombre, apellido,
          email, teléfono, CUIT/CUIL cuando corresponde, y la información de tus
          unidades funcionales y expensas.
        </li>
        <li>
          <strong>Datos de pagos:</strong> pago de expensas, historial y
          transferencias, procesados por nuestro proveedor de infraestructura
          bancaria. No almacenamos datos completos de tarjetas.
        </li>
        <li>
          <strong>Contenido que subís:</strong> fotos y archivos (por ejemplo,
          comprobantes o facturas) tomados con la cámara o elegidos de tu
          galería, y notas de voz, cuando decidís enviarlos.
        </li>
        <li>
          <strong>Identificadores del dispositivo y notificaciones:</strong>{" "}
          identificadores del dispositivo y el token necesario para enviarte
          notificaciones push.
        </li>
        <li>
          <strong>Ubicación aproximada:</strong> solo si otorgás el permiso, y
          únicamente para funciones que lo requieren (por ejemplo, asignar
          proveedores cercanos al edificio).
        </li>
      </ul>
      <p>
        La app solicita acceso a cámara, fotos, micrófono, notificaciones y
        ubicación solo para las funciones descriptas y con tu autorización
        previa. Podés gestionar o revocar estos permisos en cualquier momento
        desde los ajustes de tu teléfono.
      </p>

      <h2>3. Para qué usamos tus datos</h2>
      <p>Tratamos tus datos personales para:</p>
      <ul>
        <li>
          Generar el informe del analizador y enviártelo por el canal informado.
        </li>
        <li>
          Responder consultas comerciales y avanzar conversaciones cuando lo
          pediste activamente (cambio de administrador, contratación, etc.).
        </li>
        <li>
          Mejorar el sitio, la experiencia de usuario y la calidad de los
          modelos de IA (en este caso, siempre con datos anonimizados o
          agregados).
        </li>
        <li>
          Cumplir obligaciones legales, contables o fiscales aplicables.
        </li>
      </ul>
      <p>
        <strong>No enviamos publicidad masiva no solicitada</strong>, ni vendemos
        ni cedemos tu información personal a terceros para fines publicitarios.
      </p>

      <h2>4. Base legal del tratamiento</h2>
      <p>
        Conforme a la Ley 25.326 de Protección de Datos Personales y normas
        concordantes, las bases legales que sustentan el tratamiento son:
      </p>
      <ul>
        <li>
          <strong>Tu consentimiento</strong>, al enviar los formularios o subir
          una liquidación al analizador.
        </li>
        <li>
          <strong>Ejecución de un servicio solicitado por vos</strong> (recibir
          el informe, recibir información comercial).
        </li>
        <li>
          <strong>Cumplimiento de obligaciones legales</strong> de Dominium SAS.
        </li>
        <li>
          <strong>Interés legítimo</strong> en mejorar el producto, siempre que
          no prevalezcan tus derechos y libertades fundamentales.
        </li>
      </ul>

      <h2>5. Con quién compartimos tus datos</h2>
      <p>
        Trabajamos con proveedores tecnológicos que actúan como encargados del
        tratamiento, exclusivamente para prestar funciones específicas:
      </p>
      <ul>
        <li>
          <strong>Anthropic (EE.UU.):</strong> procesa el contenido de tu
          liquidación para generar el análisis con IA (modelo Claude).
        </li>
        <li>
          <strong>Resend (EE.UU.):</strong> envía el informe del analizador y
          notificaciones internas por correo electrónico.
        </li>
        <li>
          <strong>Vercel (EE.UU.):</strong> alojamiento del sitio, ejecución
          serverless y métricas anónimas de uso (Vercel Analytics).
        </li>
        <li>
          <strong>Cresium:</strong> infraestructura bancaria para el
          procesamiento de pagos de expensas y los fondos operativos de los
          consorcios administrados. Cresium está regulada por el BCRA.
        </li>
        <li>
          <strong>Apple y Google:</strong> servicios de notificaciones push para
          entregarte avisos en la aplicación móvil.
        </li>
        <li>
          <strong>Proveedor de mensajería (WhatsApp):</strong> a través del cual
          funciona la asistente Vero para comunicarse con los vecinos.
        </li>
        <li>
          <strong>Expo (EE.UU.):</strong> infraestructura para la construcción y
          entrega de la aplicación móvil.
        </li>
      </ul>
      <p>
        Algunos de estos proveedores procesan datos en países que pueden no
        contar con un nivel de protección equivalente al argentino. En esos
        casos, los datos se transfieren bajo cláusulas contractuales que exigen
        estándares de seguridad razonables.
      </p>

      <h2>6. Cuánto tiempo guardamos tus datos</h2>
      <ul>
        <li>
          <strong>Liquidaciones subidas al analizador:</strong> se procesan al
          momento y no se conservan más allá del tiempo estrictamente necesario
          para producir y entregar el informe.
        </li>
        <li>
          <strong>Datos de contacto:</strong> los conservamos mientras exista una
          relación o un interés legítimo en mantener la comunicación, y los
          eliminamos cuando lo solicites o cuando dejen de ser necesarios.
        </li>
        <li>
          <strong>Datos requeridos por ley</strong> (facturación, cuentas
          contables, obligaciones impositivas): los conservamos durante los
          plazos legales aplicables.
        </li>
      </ul>

      <h2>7. Tus derechos</h2>
      <p>
        Según la Ley 25.326, en cualquier momento podés ejercer los siguientes
        derechos sobre tus datos personales:
      </p>
      <ul>
        <li>
          <strong>Acceso:</strong> saber qué datos tuyos tenemos y cómo los
          usamos.
        </li>
        <li>
          <strong>Rectificación:</strong> corregir datos inexactos o
          incompletos.
        </li>
        <li>
          <strong>Supresión:</strong> pedir que eliminemos tus datos cuando ya
          no sean necesarios.
        </li>
        <li>
          <strong>Oposición:</strong> oponerte al tratamiento por motivos
          legítimos, salvo que la ley nos obligue a continuarlo.
        </li>
      </ul>
      <p>
        Para ejercer cualquiera de estos derechos, escribinos a{" "}
        <a href="mailto:hola@dominium.com.ar">hola@dominium.com.ar</a>.
        Respondemos en un plazo razonable y, en cualquier caso, dentro de los
        plazos establecidos por la normativa vigente.
      </p>
      <p>
        <strong>Eliminación de tu cuenta:</strong> si usás la aplicación móvil
        Dominium, podés solicitar la eliminación de tu cuenta y de tus datos
        personales escribiéndonos a{" "}
        <a href="mailto:hola@dominium.com.ar">hola@dominium.com.ar</a>.
        Conservaremos únicamente los datos que la ley nos obligue a retener
        (por ejemplo, registros contables o fiscales).
      </p>
      <p>
        Si considerás que el tratamiento que hacemos de tus datos no se ajusta a
        la ley, podés presentar un reclamo ante la{" "}
        <strong>Agencia de Acceso a la Información Pública (AAIP)</strong>,
        autoridad de control en Argentina.
      </p>

      <h2>8. Cookies y analítica</h2>
      <p>
        Utilizamos cookies estrictamente necesarias para el funcionamiento del
        sitio y herramientas de analítica anónima (Vercel Analytics) que nos
        permiten entender cómo se usan las páginas, sin identificarte
        personalmente. No usamos cookies publicitarias de terceros.
      </p>

      <h2>9. Seguridad</h2>
      <p>
        Las comunicaciones con el sitio están cifradas en tránsito (HTTPS/TLS).
        Tomamos medidas técnicas y organizativas razonables para proteger tus
        datos contra accesos no autorizados, alteración o destrucción. Ninguna
        transmisión por internet es 100% segura, por lo que no podemos
        garantizar seguridad absoluta.
      </p>

      <h2>10. Menores de edad</h2>
      <p>
        El sitio no está dirigido a menores de edad. Si tomamos conocimiento de
        que recolectamos datos de una persona menor de 18 años sin
        autorización de su representante legal, eliminaremos esa información.
      </p>

      <h2>11. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta Política de Privacidad para reflejar cambios en
        nuestras prácticas o en la normativa. La fecha de última actualización
        figura al inicio de esta página.
      </p>

      <h2>12. Contacto</h2>
      <p>
        Para cualquier consulta sobre privacidad o ejercicio de derechos,
        escribinos a{" "}
        <a href="mailto:hola@dominium.com.ar">hola@dominium.com.ar</a>. Si
        querés volver, podés ir a la{" "}
        <Link href="/">página principal</Link> o leer nuestros{" "}
        <Link href="/terminos">Términos y Condiciones</Link>.
      </p>
    </LegalLayout>
  );
}
