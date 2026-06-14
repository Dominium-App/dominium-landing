import type { Metadata } from "next";
import Navigation from "@/components/navigation";
import ProviderForm from "@/components/provider-form";

export const metadata: Metadata = {
  title: "Sumate como proveedor | Dominium",
  description:
    "¿Sos plomero, electricista, gasista o prestás otro oficio? Postulate para resolver trabajos en los edificios que administra Dominium.",
  alternates: { canonical: "/proveedores" },
  openGraph: {
    title: "Sumate como proveedor | Dominium",
    description:
      "Postulate para resolver trabajos en los edificios que administra Dominium.",
    url: "/proveedores",
    type: "website",
  },
};

export default function ProveedoresPage() {
  return (
    <>
      <Navigation />
      <main
        className="pt-[120px] pb-[100px] md:pt-[140px] md:pb-[120px]"
        style={{ backgroundColor: "var(--color-surface-alt)" }}
      >
        <div className="mx-auto max-w-[720px] px-6">
          <div className="flex flex-col gap-4 mb-10 text-center">
            <h1
              className="font-serif font-bold text-balance leading-[1.15] mx-auto"
              style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "var(--color-ink)" }}
            >
              Sumate a la red de proveedores de Dominium
            </h1>
            <p
              className="text-[17px] leading-relaxed mx-auto max-w-[560px]"
              style={{ color: "var(--color-ink-secondary)" }}
            >
              Dejanos tus datos y los oficios que ofrecés. Cuando un edificio necesite
              resolver algo cerca tuyo, te avisamos. Revisamos cada postulación antes de
              darte acceso.
            </p>
          </div>

          <ProviderForm />
        </div>
      </main>
    </>
  );
}
