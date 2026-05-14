"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function StickyMobileCta() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  const isAdmin =
    pathname === "/administradores" || pathname.startsWith("/administradores/");

  useEffect(() => {
    function onScroll() {
      // show after scrolling 35% of viewport height
      const threshold = window.innerHeight * 0.35;
      setVisible(window.scrollY > threshold);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isAdmin) return null;

  const href = "/#analizador";
  const label = "Auditar mis expensas gratis →";

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300"
      style={{
        transform: visible ? "translateY(0)" : "translateY(110%)",
        backgroundColor: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
        paddingBottom: "max(env(safe-area-inset-bottom), 12px)",
      }}
      aria-hidden={!visible}
    >
      <div className="px-4 pt-3">
        <a
          href={href}
          className="flex items-center justify-center w-full h-[50px] rounded-full text-[15px] font-semibold text-white"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          {label}
        </a>
      </div>
    </div>
  );
}
