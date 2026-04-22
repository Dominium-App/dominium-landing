import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Dominium | Administración de consorcios con IA — Auditá tus expensas gratis",
    template: "%s | Dominium",
  },
  description:
    "Administradora de consorcios potenciada por IA en CABA y AMBA. Subí tu liquidación y Vero detecta en segundos cuánto pagás de más en expensas. Sin registro.",
  keywords: [
    "administración de consorcios",
    "administradora de consorcios CABA",
    "analizador de expensas",
    "auditoría de expensas",
    "expensas AMBA",
    "liquidación de expensas",
    "IA administración consorcios",
    "Vero Dominium",
    "cambiar de administrador",
    "consorcio propiedad horizontal",
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
    title: "Dominium | Administración de consorcios con IA",
    description:
      "Subí tu liquidación y descubrí en segundos cuánto pagás de más en expensas. Análisis gratuito con IA. Administradora registrada en CABA.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dominium | Auditá tus expensas con IA — Gratis",
    description:
      "¿Cuánto pagás de más en expensas? Vero, nuestra IA, te lo dice en segundos. Análisis gratuito sin registro.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Dominium",
  legalName: "Dominium SAS",
  url: SITE_URL,
  logo: `${SITE_URL}/icon-1200.png`,
  description:
    "Administradora de consorcios de nueva generación potenciada por IA. Auditoría de expensas en tiempo real.",
  foundingDate: "2026",
  areaServed: { "@type": "AdministrativeArea", name: "AMBA, Argentina" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ciudad Autónoma de Buenos Aires",
    addressRegion: "CABA",
    addressCountry: "AR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hola@dominium.com.ar",
    availableLanguage: ["Spanish"],
    areaServed: "AR",
  },
  sameAs: [],
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

        <Analytics />
      </body>
    </html>
  );
}
