"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("accueil")?.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Revenir en haut de la page"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-lp-line bg-white text-lp-navy shadow-[0_10px_24px_-10px_rgba(20,43,74,0.4)] transition-[opacity,transform,background-color] duration-300 hover:bg-lp-soft sm:bottom-8 sm:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
