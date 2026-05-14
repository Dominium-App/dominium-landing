import Navigation from "@/components/navigation";
import CtaFooter from "@/components/cta-footer";

interface LegalLayoutProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({
  eyebrow,
  title,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <main>
      <Navigation />

      <article className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-[760px] px-6">
          {/* Header */}
          <header className="flex flex-col gap-4 mb-12">
            <p
              className="text-[12px] font-semibold tracking-[0.1em] uppercase"
              style={{ color: "var(--color-accent)" }}
            >
              {eyebrow}
            </p>
            <h1
              className="font-serif font-bold leading-[1.1] tracking-[-0.01em] text-balance"
              style={{
                fontSize: "clamp(32px, 4.5vw, 48px)",
                color: "var(--color-ink)",
              }}
            >
              {title}
            </h1>
            <p
              className="text-[13.5px]"
              style={{ color: "var(--color-ink-tertiary)" }}
            >
              Última actualización: {lastUpdated}
            </p>
          </header>

          {/* Body — Tailwind prose-like with our color tokens */}
          <div className="legal-prose flex flex-col gap-5">{children}</div>
        </div>
      </article>

      <CtaFooter />

      <style>{`
        .legal-prose h2 {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          font-size: clamp(22px, 3vw, 28px);
          line-height: 1.2;
          color: var(--color-ink);
          margin-top: 2rem;
          margin-bottom: 0.25rem;
        }
        .legal-prose h2:first-child { margin-top: 0; }
        .legal-prose h3 {
          font-weight: 600;
          font-size: 17px;
          line-height: 1.3;
          color: var(--color-ink);
          margin-top: 1.5rem;
        }
        .legal-prose p {
          font-size: 15.5px;
          line-height: 1.65;
          color: var(--color-ink-secondary);
        }
        .legal-prose ul, .legal-prose ol {
          padding-left: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .legal-prose ul li {
          list-style: disc;
          font-size: 15.5px;
          line-height: 1.6;
          color: var(--color-ink-secondary);
        }
        .legal-prose ol li {
          list-style: decimal;
          font-size: 15.5px;
          line-height: 1.6;
          color: var(--color-ink-secondary);
        }
        .legal-prose strong { color: var(--color-ink); font-weight: 600; }
        .legal-prose a {
          color: var(--color-accent);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
      `}</style>
    </main>
  );
}
