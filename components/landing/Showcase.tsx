"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { LayoutDashboard, Wallet, MessagesSquare, CalendarRange, Check } from "lucide-react";
import { Eyebrow } from "./ui";
import { Reveal } from "./Reveal";
import { AdminMockup, FinanceMockup, CommunicationMockup, OrganisationMockup } from "./ShowcaseMockups";

const tabs = [
  {
    id: "admin",
    icon: LayoutDashboard,
    label: "Tableau de bord administratif",
    short: "Administration",
    title: "La journée de l'établissement, en un coup d'œil.",
    text: "Retrouvez les présences, l'équipe enseignante et les activités à venir sur un même écran, dès l'ouverture de l'école.",
    points: ["Synthèse des présences élèves et enseignants", "Informations sur les enseignants et les élèves", "Activités et réunions à venir", "Aperçu de l'emploi du temps du jour"],
    Mockup: AdminMockup,
    alt: "Aperçu illustratif d'un tableau de bord administratif : indicateurs de présence, liste de l'équipe enseignante, prochaines activités et cours en cours.",
  },
  {
    id: "finance",
    icon: Wallet,
    label: "Suivi financier",
    short: "Finance",
    title: "Des paiements et des échéances plus lisibles.",
    text: "Visualisez l'état des règlements, repérez les retards et préparez le calcul des salaires à partir des heures enregistrées.",
    points: ["Statut des paiements par famille", "Synthèse financière mensuelle", "Alertes en cas de paiement en retard", "Récapitulatif du calcul des salaires"],
    Mockup: FinanceMockup,
    alt: "Aperçu illustratif d'un suivi financier : montants attendus et encaissés, tableau de statut des paiements, alerte de retard et récapitulatif de salaire.",
  },
  {
    id: "communication",
    icon: MessagesSquare,
    label: "Espace de communication",
    short: "Communication",
    title: "Un lien plus direct avec les familles.",
    text: "Diffusez vos annonces, partagez les supports de cours et tenez les parents informés de la scolarité de leur enfant.",
    points: ["Annonces ciblées aux parents", "Partage de supports de cours", "Résumé de la progression scolaire", "Événements de l'établissement"],
    Mockup: CommunicationMockup,
    alt: "Aperçu illustratif d'un espace de communication : annonce aux parents pour une sortie scolaire, supports de cours, progression d'une élève et événement à venir.",
  },
  {
    id: "organisation",
    icon: CalendarRange,
    label: "Organisation scolaire",
    short: "Organisation",
    title: "Emplois du temps, cours en ligne et activités au même endroit.",
    text: "Consultez l'emploi du temps hebdomadaire, programmez les cours à distance et coordonnez la vie extrascolaire.",
    points: ["Emploi du temps hebdomadaire par classe", "Planning des cours en ligne", "Calendrier des clubs et activités", "Remplacements et salles"],
    Mockup: OrganisationMockup,
    alt: "Aperçu illustratif d'un module d'organisation : emploi du temps hebdomadaire d'une classe, cours en ligne programmés et calendrier des clubs.",
  },
] as const;

export function Showcase() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = tabs[active];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let next = active;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (active + 1) % tabs.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (active - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="showcase-title" className="relative overflow-hidden bg-lp-navy text-white">
      <div aria-hidden="true" className="lp-grid-bg-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <div className="flex justify-center">
            <Eyebrow tone="light">Aperçu de la solution</Eyebrow>
          </div>
          <h2 id="showcase-title" className="lp-display text-[30px] font-bold leading-[1.15] sm:text-[40px]">
            Visualisez votre établissement autrement.
          </h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-white/65">
            Quatre espaces pour l&apos;administration, les finances, la communication et l&apos;organisation. Les écrans
            ci-dessous sont des illustrations réalisées avec des données fictives.
          </p>
        </Reveal>

        {/* Sélecteur d'onglets */}
        <Reveal delay={80} className="mt-12">
          <div
            role="tablist"
            aria-label="Espaces de la solution"
            onKeyDown={onKeyDown}
            className="mx-auto grid max-w-[880px] grid-cols-2 gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 md:grid-cols-4"
          >
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              const selected = i === active;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`flex min-h-[46px] items-center justify-center gap-2 rounded-xl px-3 text-[13.5px] font-semibold transition-[background-color,color] duration-200 ${
                    selected ? "bg-white text-lp-navy shadow-[0_6px_20px_-8px_rgba(0,0,0,0.5)]" : "text-white/65 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <Icon aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.8} />
                  <span className="lg:hidden">{tab.short}</span>
                  <span className="hidden lg:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Panneau actif */}
        <div
          key={current.id}
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          tabIndex={0}
          className="lp-panel-in mt-14 grid items-center gap-12 rounded-2xl lg:grid-cols-12 lg:gap-14"
        >
          <div className="lg:col-span-4">
            <p className="text-[13px] font-semibold text-[#8fb6ee]">
              {String(active + 1).padStart(2, "0")} / {String(tabs.length).padStart(2, "0")} · {current.label}
            </p>
            <h3 className="lp-display mt-3 text-[24px] font-bold leading-tight sm:text-[28px]">{current.title}</h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-white/65">{current.text}</p>
            <ul className="mt-7 space-y-3">
              {current.points.map((p) => (
                <li key={p} className="flex gap-3 text-[14.5px] text-white/85">
                  <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lp-teal/15 text-lp-teal">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <figure className="lg:col-span-8">
            <figcaption className="sr-only">{current.alt}</figcaption>
            <div aria-hidden="true" className="text-lp-ink">
              <current.Mockup />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
