import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import StickyMobileCta from "@/components/sticky-mobile-cta";
import WhatsappFab from "@/components/whatsapp-fab";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_URL = "https://www.dominium.com.ar";
const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dominium — Administración de consorcios con IA en Buenos Aires",
    template: "%s | Dominium",
  },
  description:
    "Dominium administra tu edificio con Vero, una IA que responde a los vecinos por WhatsApp las 24 horas, banco regulado por BCRA y cada gasto a la vista. Mismo honorario que tu administración actual. Auditá tus expensas gratis en 60 segundos.",
  keywords: [
    "auditar expensas",
    "expensas muy altas",
    "administración de consorcios CABA",
    "administradora de consorcios",
    "analizador de expensas online",
    "auditoría de expensas IA",
    "cambiar administrador consorcio",
    "expensas Palermo Belgrano Caballito",
    "Ley 941 administrador",
    "administrador no muestra facturas",
    "Vero Dominium",
    "consorcio propiedad horizontal",
    "denunciar administrador consorcio",
  ],
  authors: [{ name: "Dominium SAS" }],
  creator: "Dominium SAS",
  publisher: "Dominium SAS",
  applicationName: "Dominium",
  category: "Real Estate Services",
  alternates: {
    canonical: "/",
    languages: { "es-AR": "/" },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "Dominium",
    title: "Dominium — Tu edificio ahora responde a las 2 de la mañana",
    description:
      "Administración de consorcios con IA: Vero atiende a los vecinos por WhatsApp 24/7, la plata del edificio en un banco regulado por BCRA y cada gasto auditado a la vista. Por el mismo honorario que ya pagás.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dominium — Administración de consorcios con IA",
    description:
      "Vero responde a los vecinos por WhatsApp 24/7, la plata del edificio en un banco regulado por BCRA y cada gasto auditado. Auditá tus expensas gratis en 60 segundos.",
  },
  robots: ALLOW_INDEXING
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, noimageindex: true },
      },
  icons: {
    icon: { url: "/favicon.png", type: "image/png" },
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  formatDetection: { telephone: false, email: false, address: false },
  verification: {
    google: "WvOA8StVdjtjjnBerhx-QYN4fvfRDRoL5wTbRa-UNVQ",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#12281D" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: "Dominium",
  legalName: "Dominium SAS",
  url: SITE_URL,
  logo: `${SITE_URL}/icon-1200.png`,
  image: `${SITE_URL}/icon-1200.png`,
  description:
    "Administradora de consorcios AI-first en CABA y AMBA. Auditoría de expensas con IA en tiempo real, transparencia total y reducción de gastos.",
  slogan: "La administración que siempre debió existir.",
  foundingDate: "2026",
  priceRange: "$$",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Ciudad Autónoma de Buenos Aires" },
    { "@type": "AdministrativeArea", name: "AMBA, Argentina" },
    { "@type": "City", name: "Palermo" },
    { "@type": "City", name: "Belgrano" },
    { "@type": "City", name: "Caballito" },
    { "@type": "City", name: "Recoleta" },
    { "@type": "City", name: "Villa Crespo" },
    { "@type": "City", name: "Núñez" },
    { "@type": "City", name: "Almagro" },
    { "@type": "City", name: "Colegiales" },
    { "@type": "City", name: "Flores" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ciudad Autónoma de Buenos Aires",
    addressRegion: "CABA",
    addressCountry: "AR",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hola@dominium.com.ar",
      telephone: "+54 9 11 7293-6904",
      availableLanguage: ["Spanish"],
      areaServed: "AR",
    },
  ],
  knowsAbout: [
    "Administración de consorcios",
    "Propiedad horizontal",
    "Ley 941",
    "Auditoría de expensas",
    "Fondo de reserva",
    "Asamblea de copropietarios",
  ],
  sameAs: ["https://instagram.com/dominium.com.ar"],
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Vero — Analizador de Expensas",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "Analizador de liquidaciones de expensas con inteligencia artificial. Detecta sobreprecios, gastos ocultos y mala administración del fondo de reserva.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
  provider: { "@id": `${SITE_URL}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={`${dmSans.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}

        <StickyMobileCta />
        <WhatsappFab />
        <Analytics />
      </body>
    </html>
  );
}
