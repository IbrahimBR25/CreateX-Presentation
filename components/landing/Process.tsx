import { ArrowRight, ShieldCheck } from "lucide-react";
import { Eyebrow, ButtonLink } from "./ui";
import { Reveal } from "./Reveal";
import { meetingHref, siteConfig, isConfigured } from "./site-config";

const steps = [
  {
    title: "Échange initial",
    text: "Nous découvrons votre établissement, son organisation et ses priorités.",
  },
  {
    title: "Présentation personnalisée",
    text: "Nous présentons les fonctionnalités les plus pertinentes pour vos besoins.",
  },
  {
    title: "Définition de la solution",
    text: "Nous discutons des modalités d'adaptation, de mise en œuvre et d'accompagnement.",
  },
  {
    title: "Proposition commerciale",
    text: "Nous étudions les modalités financières et les prochaines étapes ensemble.",
  },
];

export function Process() {
  const bookingExternal = isConfigured(siteConfig.meeting.bookingUrl);
  return (
    <section id="comment-ca-marche" aria-labelledby="process-title" className="border-t border-lp-line bg-lp-bg">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28">
        <Reveal className="max-w-[680px]">
          <Eyebrow>Comment ça marche</Eyebrow>
          <h2 id="process-title" className="lp-display text-[30px] font-bold leading-[1.15] text-lp-navy sm:text-[38px]">
            Une solution à discuter selon les besoins de votre établissement.
          </h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-lp-muted">
            Chaque école est différente. Notre démarche commence par l&apos;écoute, puis avance étape par étape, à votre
            rythme.
          </p>
        </Reveal>

        <ol className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {/* Ligne de liaison (bureau) */}
          <span aria-hidden="true" className="absolute left-[28px] right-[calc(25%-28px)] top-[27px] hidden h-px bg-[#cfd9e7] lg:block" />
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90} className="relative lg:pr-8">
              <div className="flex h-full flex-col rounded-2xl border border-lp-line bg-white p-6 lg:border-0 lg:bg-transparent lg:p-0">
                <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-lp-line bg-white text-[18px] font-bold text-lp-navy shadow-[0_8px_20px_-12px_rgba(20,43,74,0.35)] lp-display">
                  {i + 1}
                </span>
                <h3 className="lp-display mt-6 text-[18px] font-bold text-lp-navy">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-lp-muted">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14 flex flex-col items-start gap-5 rounded-2xl border border-[#cfe9e4] bg-[#f1faf8] p-6 sm:flex-row sm:items-center sm:p-7">
          <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-[#1d7f70]">
            <ShieldCheck className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <div className="flex-1">
            <p className="text-[16px] font-semibold text-lp-navy">Une rencontre pour explorer, sans engagement.</p>
            <p className="mt-1 text-[14.5px] leading-relaxed text-lp-muted">
              Le premier rendez-vous sert à comprendre vos besoins et à vous présenter la solution. Il n&apos;implique
              aucune obligation d&apos;achat.
            </p>
          </div>
          <ButtonLink href={meetingHref()} external={bookingExternal} className="shrink-0">
            Planifier un échange
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
