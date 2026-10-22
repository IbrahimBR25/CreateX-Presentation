"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Eyebrow } from "./ui";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "À quels types d'établissements cette solution s'adresse-t-elle ?",
    a: "La solution est pensée pour les établissements scolaires privés : écoles primaires, collèges et lycées. Elle peut convenir à des structures de tailles différentes ; l'échange initial permet de vérifier son adéquation avec votre organisation.",
  },
  {
    q: "Quelles tâches peut-elle contribuer à simplifier ?",
    a: "Elle peut faciliter le suivi des présences, la gestion des emplois du temps, le suivi des paiements et des échéances, le calcul des salaires à partir des heures enregistrées, la communication avec les parents, le partage de supports de cours et la consultation de tableaux de bord.",
  },
  {
    q: "Est-il possible d'adapter la solution aux besoins de notre établissement ?",
    a: "Les possibilités d'adaptation dépendent de vos besoins et du périmètre retenu. Nous les examinerons ensemble lors de la rencontre afin de définir ce qui est pertinent pour votre établissement.",
  },
  {
    q: "Comment sont organisées la mise en place et la prise en main ?",
    a: "Les modalités de mise en place, de reprise des données existantes et de formation des équipes sont définies avec vous selon votre organisation et votre calendrier. Elles seront précisées lors de nos échanges.",
  },
  {
    q: "Comment les données de l'établissement sont-elles protégées ?",
    a: "La protection des données, en particulier celles des élèves, est un sujet essentiel. Les mesures techniques et organisationnelles, les conditions d'hébergement et les règles d'accès pourront vous être présentées en détail lors de la rencontre.",
  },
  {
    q: "Quel est le coût de la solution ?",
    a: "Le coût dépend des besoins de votre établissement et du périmètre convenu (fonctionnalités, nombre d'utilisateurs, accompagnement). Une proposition commerciale vous est remise après la définition de la solution.",
  },
  {
    q: "Comment pouvons-nous organiser une démonstration ?",
    a: "Il vous suffit de remplir le formulaire de contact ci-dessous ou de nous écrire directement. Nous reviendrons vers vous pour convenir d'un créneau adapté à votre emploi du temps.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-lp-line bg-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <Reveal className="lg:col-span-4">
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="faq-title" className="lp-display text-[30px] font-bold leading-[1.15] text-lp-navy sm:text-[38px]">
            Questions fréquentes
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-lp-muted">
            Vous ne trouvez pas la réponse à votre question&nbsp;?{" "}
            <a href="#contact" className="font-semibold text-lp-blue underline-offset-4 hover:underline">
              Écrivez-nous
            </a>
            , nous vous répondrons volontiers.
          </p>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-8">
          <ul className="divide-y divide-lp-line border-y border-lp-line">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-start justify-between gap-6 py-5 text-left text-[16px] font-semibold text-lp-navy transition-colors hover:text-lp-blue sm:text-[17px]"
                    >
                      {item.q}
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-300 ${
                          isOpen ? "rotate-45 border-lp-navy bg-lp-navy text-white" : "border-lp-line text-lp-navy"
                        }`}
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={2.2} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    data-open={isOpen}
                    className="lp-collapse"
                    inert={!isOpen}
                  >
                    <div>
                      <p className="max-w-[640px] pb-6 pr-12 text-[15px] leading-relaxed text-lp-muted">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
