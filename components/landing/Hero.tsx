import { ArrowRight, CheckCircle2, CalendarClock, Users } from "lucide-react";
import { ButtonLink } from "./ui";
import { HeroDashboard } from "./HeroDashboard";
import { meetingHref, siteConfig, isConfigured } from "./site-config";

export function Hero() {
  const bookingExternal = isConfigured(siteConfig.meeting.bookingUrl);
  return (
    <section id="accueil" aria-labelledby="hero-title" className="relative -mt-[68px] overflow-hidden pt-[68px]">
      {/* Fond : trame discrète qui s'estompe */}
      <div
        aria-hidden="true"
        className="lp-grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_30%,black,transparent)]"
      />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-5 pb-20 pt-12 sm:px-8 md:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-20">
        <div className="lg:col-span-5">
          <p
            className="lp-rise mb-6 inline-flex items-center gap-2 rounded-full border border-lp-line bg-white px-3 py-1.5 text-[12.5px] font-medium text-lp-muted"
            style={{ "--lp-delay": "0ms" } as React.CSSProperties}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-lp-teal" aria-hidden="true" />
            Pour les écoles, collèges et lycées privés
          </p>
          <h1
            id="hero-title"
            tabIndex={-1}
            className="lp-display lp-rise text-[36px] font-bold leading-[1.08] text-lp-navy outline-none focus:outline-none sm:text-[46px] lg:text-[50px]"
            style={{ "--lp-delay": "60ms" } as React.CSSProperties}
          >
            Une gestion scolaire plus simple.{" "}
            <span className="text-lp-blue">Un établissement plus performant.</span>
          </h1>
          <p
            className="lp-rise mt-6 max-w-[520px] text-[17px] leading-relaxed text-lp-muted"
            style={{ "--lp-delay": "120ms" } as React.CSSProperties}
          >
            Centralisez vos opérations administratives, simplifiez votre gestion financière et rapprochez votre
            établissement des familles grâce à une solution pensée pour les écoles privées.
          </p>
          <div
            className="lp-rise mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ "--lp-delay": "180ms" } as React.CSSProperties}
          >
            <ButtonLink href={meetingHref()} external={bookingExternal}>
              Planifier une démonstration
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="#fonctionnalites" variant="secondary">
              Découvrir la solution
            </ButtonLink>
          </div>
          <p
            className="lp-rise mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-lp-navy/70"
            style={{ "--lp-delay": "240ms" } as React.CSSProperties}
          >
            <span>Administration</span>
            <span aria-hidden="true" className="text-lp-teal">•</span>
            <span>Finance</span>
            <span aria-hidden="true" className="text-lp-teal">•</span>
            <span>Communication</span>
            <span aria-hidden="true" className="text-lp-teal">•</span>
            <span>Pilotage</span>
          </p>
        </div>

        {/* Composition visuelle */}
        <figure
          className="lp-rise relative lg:col-span-7 lg:-mr-10 xl:-mr-16"
          style={{ "--lp-delay": "200ms" } as React.CSSProperties}
        >
          <figcaption className="sr-only">
            Aperçu illustratif d&apos;un tableau de bord de gestion scolaire : présences des élèves et des enseignants,
            emploi du temps, encaissements, notifications et progression des moyennes. Données fictives.
          </figcaption>
          <div aria-hidden="true" className="relative">
            <HeroDashboard />

            {/* Carte flottante : paiement */}
            <div
              className="lp-float absolute -bottom-6 -left-3 hidden w-[210px] rounded-xl border border-lp-line bg-white p-3 shadow-[0_18px_40px_-18px_rgba(20,43,74,0.35)] sm:block lg:-left-10"
              style={{ "--lp-float-delay": "0s" } as React.CSSProperties}
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#e7f6f3] text-[#1d7f70]">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-lp-navy">Paiement enregistré</p>
                  <p className="truncate text-[10px] text-lp-muted">Famille Ben Salah · 450 DT</p>
                </div>
              </div>
            </div>

            {/* Carte flottante : réunion */}
            <div
              className="lp-float absolute -top-5 right-4 hidden w-[200px] rounded-xl border border-lp-line bg-white p-3 shadow-[0_18px_40px_-18px_rgba(20,43,74,0.35)] sm:block"
              style={{ "--lp-float-delay": "-3.5s" } as React.CSSProperties}
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#e9f1fc] text-lp-blue">
                  <CalendarClock className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-lp-navy">Réunion parents</p>
                  <p className="text-[10px] text-lp-muted">Samedi 24 oct. · 10:00</p>
                </div>
              </div>
              <div className="mt-2.5 flex items-center gap-1.5 border-t border-lp-line pt-2">
                <Users className="h-3 w-3 text-lp-muted" />
                <span className="text-[9.5px] text-lp-muted">86 familles notifiées</span>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
