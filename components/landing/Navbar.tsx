"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo, ButtonLink } from "./ui";
import { navLinks, meetingHref, siteConfig, isConfigured } from "./site-config";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#accueil");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mise en évidence de la section courante
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Menu mobile : fermeture avec Échap, blocage du défilement
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const bookingExternal = isConfigured(siteConfig.meeting.bookingUrl);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-lp-line bg-white/90 shadow-[0_1px_0_rgba(20,43,74,0.02),0_8px_24px_-16px_rgba(20,43,74,0.18)] backdrop-blur-md"
          : "border-b border-transparent bg-lp-bg/0"
      }`}
    >
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-lp-navy focus:shadow"
      >
        Aller au contenu
      </a>
      <nav aria-label="Navigation principale" className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <a href="#accueil" aria-label={`${siteConfig.brandName} — retour à l'accueil`} className="shrink-0">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
                className={`relative rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors duration-200 ${
                  active === link.href ? "text-lp-navy" : "text-lp-muted hover:text-lp-navy"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-lp-blue transition-opacity duration-200 ${
                    active === link.href ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ButtonLink href={meetingHref()} external={bookingExternal} className="hidden !min-h-[40px] !px-4 !text-[14px] sm:inline-flex">
            Planifier une démonstration
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="grid h-11 w-11 place-items-center rounded-[10px] text-lp-navy transition-colors hover:bg-lp-soft lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="h-[calc(100dvh-68px)] overflow-y-auto border-t border-lp-line bg-white px-5 pb-8 pt-4 sm:px-8 lg:hidden"
      >
        <ul className="flex flex-col">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-lp-line py-4 text-[17px] font-semibold text-lp-navy"
              >
                {link.label}
                <ArrowRight aria-hidden="true" className="h-4 w-4 text-lp-muted" />
              </a>
            </li>
          ))}
        </ul>
        <ButtonLink href={meetingHref()} external={bookingExternal} onClick={() => setOpen(false)} className="mt-6 w-full">
          Planifier une démonstration
        </ButtonLink>
        <ButtonLink href="#contact" variant="secondary" onClick={() => setOpen(false)} className="mt-3 w-full">
          Nous contacter
        </ButtonLink>
      </div>
    </header>
  );
}
