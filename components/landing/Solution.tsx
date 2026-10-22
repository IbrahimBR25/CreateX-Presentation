"use client";

import { useState } from "react";
import { ClipboardList, Landmark, MessageCircleHeart, Gauge, Check, ChevronDown } from "lucide-react";
import { Eyebrow } from "./ui";
import { Reveal } from "./Reveal";

const VISIBLE = 4;

const categories = [
  {
    key: "admin",
    letter: "A",
    icon: ClipboardList,
    title: "Gestion administrative",
    description: "Organisez la vie quotidienne de l'établissement, des présences aux activités extrascolaires.",
    accent: "text-lp-blue bg-[#e9f1fc]",
    items: [
      "Suivi des présences des élèves et des enseignants",
      "Gestion des emplois du temps",
      "Répertoire des enseignants et de leurs coordonnées",
      "Organisation des cours supplémentaires",
      "Planification des réunions et des cours en ligne",
      "Gestion des clubs, événements et sorties scolaires",
    ],
  },
  {
    key: "finance",
    letter: "B",
    icon: Landmark,
    title: "Gestion financière",
    description: "Gardez une vision claire des paiements, des échéances et des calculs liés au personnel.",
    accent: "text-[#1d7f70] bg-[#e7f6f3]",
    items: [
      "Suivi des paiements et des échéances",
      "Alertes concernant les paiements en retard",
      "Calcul des salaires selon les heures de présence enregistrées",
      "Gestion des réductions et des offres",
      "Consultation de tableaux de bord financiers",
    ],
  },
  {
    key: "comm",
    letter: "C",
    icon: MessageCircleHeart,
    title: "Communication et suivi pédagogique",
    description: "Rapprochez l'établissement, les enseignants et les familles autour de la scolarité des élèves.",
    accent: "text-[#5b4bb0] bg-[#f1eefb]",
    items: [
      "Communication centralisée avec les parents",
      "Notifications et annonces",
      "Suivi de la progression scolaire",
      "Mise à disposition des supports de cours",
      "Création de quiz et d'activités pédagogiques",
      "Partage d'informations concernant les activités scolaires",
    ],
  },
  {
    key: "pilot",
    letter: "D",
    icon: Gauge,
    title: "Pilotage et tableaux de bord",
    description: "Disposez des informations utiles pour suivre l'activité et orienter vos décisions.",
    accent: "text-lp-navy bg-[#e8edf4]",
    items: [
      "Vue d'ensemble des présences",
      "Indicateurs financiers",
      "Suivi des activités et des performances scolaires",
      "Accès centralisé aux informations utiles à l'administration",
      "Aide à la prise de décision grâce à une meilleure visibilité",
    ],
  },
];

function CategoryCard({ cat, index }: { cat: (typeof categories)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = cat.icon;
  const hidden = cat.items.length - VISIBLE;
  const listId = `features-${cat.key}`;

  return (
    <Reveal
      delay={(index % 2) * 80}
      className="group relative flex h-full flex-col rounded-2xl border border-lp-line bg-white p-7 transition-[box-shadow,border-color] duration-300 hover:border-[#d3dceb] hover:shadow-[0_24px_48px_-28px_rgba(20,43,74,0.28)] sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <span aria-hidden="true" className={`grid h-12 w-12 place-items-center rounded-xl ${cat.accent}`}>
          <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} />
        </span>
        <span aria-hidden="true" className="lp-display text-[13px] font-bold text-lp-muted/50">
          {cat.letter}
        </span>
      </div>
      <h3 className="lp-display mt-6 text-[21px] font-bold text-lp-navy">{cat.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-lp-muted">{cat.description}</p>

      <ul id={listId} className="mt-6 space-y-3 border-t border-lp-line pt-6">
        {cat.items.map((item, i) => {
          const isHidden = i >= VISIBLE && !expanded;
          return (
            <li key={item} hidden={isHidden} className="flex gap-3 text-[14.5px] leading-snug text-lp-ink">
              <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-lp-teal" strokeWidth={2.4} />
              {item}
            </li>
          );
        })}
      </ul>

      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={listId}
          className="mt-5 inline-flex items-center gap-1.5 self-start rounded-md text-[13.5px] font-semibold text-lp-blue transition-colors hover:text-lp-navy"
        >
          {expanded ? "Afficher moins" : `Voir ${hidden} fonctionnalité${hidden > 1 ? "s" : ""} de plus`}
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </Reveal>
  );
}

export function Solution() {
  return (
    <section id="fonctionnalites" aria-labelledby="solution-title" className="bg-lp-bg">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>La solution</Eyebrow>
            <h2 id="solution-title" className="lp-display text-[30px] font-bold leading-[1.15] text-lp-navy sm:text-[38px]">
              Une solution centralisée pour mieux gérer votre établissement.
            </h2>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-5">
            <p className="text-[16.5px] leading-relaxed text-lp-muted">
              La plateforme réunit les principales activités de gestion de l&apos;école dans un même environnement :
              l&apos;administration, les finances, la relation avec les familles et le suivi de l&apos;activité.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.key} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
