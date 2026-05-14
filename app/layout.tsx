import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import StickyMobileCta from "@/components/sticky-mobile-cta";
import WhatsappFab from "@/components/whatsapp-fab";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_URL = "https://dominium.com.ar";
const IS_PROD = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Auditá tus expensas con IA: gratis y en 60 segundos | Dominium",
    template: "%s | Dominium",
  },
  description:
    "¿Las expensas no paran de subir y nadie te explica por qué? Subí tu liquidación y Vero detecta sobreprecios en 60 segundos. Administradora con IA en CABA y AMBA. Sin registro.",
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
    title: "Las expensas no paran de subir y nadie te explica por qué",
    description:
      "Subí tu liquidación. Vero, nuestra IA, te muestra partida por partida cuánto pagás de más, qué rubros no están justificados y dónde se está yendo el fondo de reserva. Gratis y en 60 segundos.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auditá tus expensas con IA en 60 segundos — Dominium",
    description:
      "Subí tu liquidación y Vero detecta sobreprecios, gastos ocultos y problemas en el fondo de reserva. Gratis. Sin registro.",
  },
  robots: IS_PROD
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
    { media: "(prefers-color-scheme: light)", color: "#F8F7F4" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A18" },
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
      telephone: "+54 9 11 3652-0670",
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
