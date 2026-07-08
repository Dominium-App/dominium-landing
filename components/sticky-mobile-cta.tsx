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
      className="md:hidden fixed bottom-0 left-0 right-0 z-(--z-float) border-t border-line bg-canvas transition-transform duration-300"
      style={{
        transform: visible ? "translateY(0)" : "translateY(110%)",
        paddingBottom: "max(env(safe-area-inset-bottom), 12px)",
      }}
      aria-hidden={!visible}
    >
      <div className="px-4 pt-3">
        <a
          href={href}
          tabIndex={visible ? 0 : -1}
          className="flex h-[50px] w-full items-center justify-center rounded-full bg-forest text-[15px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          {label}
        </a>
      </div>
    </div>
  );
}
