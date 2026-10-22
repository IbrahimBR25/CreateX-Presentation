import type { ReactNode } from "react";
import { siteConfig } from "./site-config";

/* ============================================================================
   Primitives visuelles partagées du site de présentation
   ============================================================================ */

export function Logo({ inverted = false }: { inverted?: boolean }) {
  if (inverted) {
    return (
      <span className="flex items-center gap-3">
        <span className="inline-flex items-center rounded-xl bg-white px-3 py-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
          <img
            src="/brand/createx-logo.png"
            alt={`${siteConfig.brandName} — ${siteConfig.slogan}`}
            width={180}
            height={70}
            className="h-8 w-auto max-w-[190px] object-contain"
          />
        </span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2.5">
      <img
        src="/brand/createx-logo.png"
        alt={`${siteConfig.brandName} — ${siteConfig.slogan}`}
        width={200}
        height={78}
        className="h-9 sm:h-10 w-auto max-w-[210px] object-contain mix-blend-multiply"
      />
    </span>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "light" | "outline-light";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-lp-navy text-white shadow-[0_1px_2px_rgba(20,43,74,0.2),0_6px_16px_-6px_rgba(20,43,74,0.45)] hover:bg-[#1c3a63]",
  secondary: "bg-white text-lp-navy border border-lp-line hover:border-[#c9d3e1] hover:bg-[#fbfcfe]",
  ghost: "text-lp-navy hover:bg-lp-soft",
  light: "bg-white text-lp-navy hover:bg-[#eef3fa]",
  "outline-light": "border border-white/25 text-white hover:bg-white/10 hover:border-white/40",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] px-5 text-[14.5px] font-semibold transition-[background-color,border-color,transform,box-shadow] duration-200 active:scale-[0.98] ${buttonStyles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

export function Eyebrow({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "teal" | "light" }) {
  const tones = {
    blue: "text-lp-blue",
    teal: "text-[#23917f]",
    light: "text-[#8fb6ee]",
  };
  return (
    <p className={`mb-4 flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.14em] ${tones[tone]}`}>
      <span aria-hidden="true" className="h-px w-6 bg-current opacity-60" />
      {children}
    </p>
  );
}

/** Cadre de fenêtre d'application utilisé par toutes les maquettes. */
export function MockWindow({
  children,
  title,
  className = "",
  label = "Aperçu illustratif",
}: {
  children: ReactNode;
  title: string;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`lp-mock overflow-hidden rounded-2xl border border-lp-line bg-white shadow-[0_1px_2px_rgba(20,43,74,0.04),0_24px_48px_-24px_rgba(20,43,74,0.25)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-lp-line bg-[#fbfcfe] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e3e8f0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e3e8f0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e3e8f0]" />
        </span>
        <span className="truncate text-[11px] font-medium text-lp-muted">{title}</span>
        <span className="ml-auto shrink-0 rounded-full bg-lp-soft px-2 py-0.5 text-[10px] font-semibold text-lp-blue">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

/** Pastille de statut pour les maquettes. */
export function Pill({ tone, children }: { tone: "ok" | "warn" | "late" | "info" | "neutral"; children: ReactNode }) {
  const tones = {
    ok: "bg-[#e7f6f3] text-[#1d7f70]",
    warn: "bg-[#fdf4e3] text-[#9a6412]",
    late: "bg-[#fcecee] text-[#b2384a]",
    info: "bg-[#e9f1fc] text-[#2b62b5]",
    neutral: "bg-[#f1f4f8] text-lp-muted",
  };
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

/** Initiales d'avatar fictif. */
export function Avatar({ name, tone = 0 }: { name: string; tone?: number }) {
  const palette = ["bg-[#e9f1fc] text-[#2b62b5]", "bg-[#e7f6f3] text-[#1d7f70]", "bg-[#f1eefb] text-[#5b4bb0]", "bg-[#fdf4e3] text-[#9a6412]"];
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-bold ${palette[tone % palette.length]}`}>
      {initials}
    </span>
  );
}
