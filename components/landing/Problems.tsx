import { FileStack, CalendarX2, Calculator, MessagesSquare, EyeOff, ArrowDown } from "lucide-react";
import { Eyebrow } from "./ui";
import { Reveal } from "./Reveal";

const problems = [
  {
    icon: FileStack,
    title: "Des informations dispersées",
    text: "Registres papier, tableurs, dossiers partagés : les tâches administratives se répartissent entre plusieurs documents et outils.",
  },
  {
    icon: CalendarX2,
    title: "Présences et emplois du temps chronophages",
    text: "L'appel, les remplacements et les changements d'horaires demandent de nombreuses vérifications manuelles.",
  },
  {
    icon: Calculator,
    title: "Un suivi financier manuel",
    text: "Relances de paiements, échéances, réductions et calculs de salaires sont souvent réalisés à la main.",
  },
  {
    icon: MessagesSquare,
    title: "Une communication éclatée",
    text: "Appels, SMS, groupes de messagerie, papiers dans le cartable : les messages aux familles empruntent de multiples canaux.",
  },
  {
    icon: EyeOff,
    title: "Une vue d'ensemble difficile à obtenir",
    text: "Rassembler les chiffres clés de l'établissement demande du temps, au moment où il faut décider.",
  },
];

export function Problems() {
  return (
    <section aria-labelledby="problems-title" className="border-y border-lp-line bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Eyebrow>Les défis du quotidien</Eyebrow>
                <h2 id="problems-title" className="lp-display text-[30px] font-bold leading-[1.15] text-lp-navy sm:text-[38px]">
                  Le quotidien d&apos;un établissement scolaire ne devrait pas être compliqué.
                </h2>
                <p className="mt-5 max-w-[440px] text-[16.5px] leading-relaxed text-lp-muted">
                  Chaque école a son organisation. Pourtant, de nombreux établissements privés rencontrent des
                  difficultés similaires dans leur gestion quotidienne.
                </p>
              </Reveal>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {problems.map(({ icon: Icon, title, text }, i) => (
              <Reveal
                as="li"
                key={title}
                delay={i * 60}
                className="group flex gap-5 border-t border-lp-line py-7 first:border-t-0 first:pt-0 sm:gap-6"
              >
                <span className="w-7 shrink-0 pt-1 text-[13px] font-semibold tabular-nums text-lp-muted/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-lp-line bg-lp-bg text-lp-navy transition-colors duration-200 group-hover:border-[#cfdcf0] group-hover:bg-[#eef3fa] group-hover:text-lp-blue"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold text-lp-navy">{title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-lp-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-16 rounded-2xl bg-lp-bg px-6 py-10 text-center sm:px-10">
          <p className="lp-display mx-auto max-w-[640px] text-[22px] font-semibold leading-snug text-lp-navy sm:text-[26px]">
            Et si toutes ces opérations étaient réunies dans un seul environnement&nbsp;?
          </p>
          <a
            href="#fonctionnalites"
            className="mt-5 inline-flex items-center gap-2 text-[14.5px] font-semibold text-lp-blue hover:text-lp-navy"
          >
            Découvrir la solution
            <ArrowDown aria-hidden="true" className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
