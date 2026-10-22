import { Clock3, PieChart, MessageCircle, FolderKanban, LineChart, Compass } from "lucide-react";
import { Eyebrow } from "./ui";
import { Reveal } from "./Reveal";

const benefits = [
  {
    icon: Clock3,
    title: "Gain de temps administratif",
    text: "Réduisez les manipulations répétitives et facilitez l'organisation quotidienne.",
  },
  {
    icon: PieChart,
    title: "Meilleure visibilité financière",
    text: "Retrouvez plus facilement les informations relatives aux paiements, aux échéances et aux calculs.",
  },
  {
    icon: MessageCircle,
    title: "Communication plus fluide",
    text: "Facilitez le partage des informations entre l'établissement, les enseignants et les familles.",
  },
  {
    icon: FolderKanban,
    title: "Organisation renforcée",
    text: "Regroupez les informations importantes dans un environnement cohérent.",
  },
  {
    icon: LineChart,
    title: "Meilleur suivi scolaire",
    text: "Facilitez la consultation des présences, des résultats et des activités.",
  },
  {
    icon: Compass,
    title: "Décisions mieux informées",
    text: "Appuyez votre gestion sur des informations plus accessibles et des tableaux de bord synthétiques.",
  },
];

export function Benefits() {
  return (
    <section id="avantages" aria-labelledby="benefits-title" className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <Eyebrow tone="teal">Avantages</Eyebrow>
            <h2 id="benefits-title" className="lp-display text-[32px] font-bold leading-[1.1] text-lp-navy sm:text-[44px] lg:text-[52px]">
              Moins de tâches répétitives.
              <br />
              <span className="text-lp-muted/80">Plus de temps pour l&apos;essentiel.</span>
            </h2>
          </Reveal>
          <Reveal delay={80} className="self-end lg:col-span-4">
            <p className="text-[16.5px] leading-relaxed text-lp-muted">
              Une gestion plus centralisée permet aux équipes de se concentrer sur ce qui compte : l&apos;accompagnement
              des élèves et la qualité de l&apos;établissement.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-2xl border border-lp-line sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              key={title}
              delay={(i % 3) * 70}
              className={`group relative -mb-px -mr-px border-b border-r border-lp-line p-7 transition-colors duration-300 hover:bg-lp-bg sm:p-9 ${
                i === 0 ? "bg-lp-bg/60" : "bg-white"
              }`}
            >
              <span
                aria-hidden="true"
                className="grid h-11 w-11 place-items-center rounded-xl bg-[#e7f6f3] text-[#1d7f70] transition-transform duration-300 group-hover:-translate-y-0.5"
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="lp-display mt-6 text-[19px] font-bold text-lp-navy">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-lp-muted">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
