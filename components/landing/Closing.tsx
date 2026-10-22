import { ArrowRight, Mail, Phone, CalendarCheck } from "lucide-react";
import { ButtonLink, Eyebrow } from "./ui";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { siteConfig, isConfigured, contactMailto, meetingHref } from "./site-config";

export function LinkedinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.76V21h-4v-5.2c0-1.24-.02-2.84-1.83-2.84-1.84 0-2.12 1.36-2.12 2.75V21h-4V9.75Z" />
    </svg>
  );
}

/* --- Section 9 : appel à l'action final ---------------------------------- */
export function FinalCta() {
  const bookingExternal = isConfigured(siteConfig.meeting.bookingUrl);
  const mail = contactMailto(siteConfig.meeting.emailSubject);
  return (
    <section aria-labelledby="cta-title" className="bg-lp-bg px-5 pb-20 pt-4 sm:px-8 lg:pb-28">
      <Reveal className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[24px] bg-lp-navy px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
        <div aria-hidden="true" className="lp-grid-bg-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_100%_50%,black,transparent)]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-1/2 hidden h-[340px] w-[340px] -translate-y-1/2 rounded-full border border-white/10 sm:block" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-8 top-1/2 hidden h-[200px] w-[200px] -translate-y-1/2 rounded-full border border-lp-teal/30 sm:block" />
        <div className="relative grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 id="cta-title" className="lp-display text-[30px] font-bold leading-[1.12] sm:text-[40px]">
              Prêt à simplifier la gestion de votre établissement&nbsp;?
            </h2>
            <p className="mt-5 max-w-[580px] text-[16.5px] leading-relaxed text-white/70">
              Échangeons sur vos besoins et découvrons comment une gestion plus centralisée pourrait accompagner le
              développement de votre école.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
            <ButtonLink href={meetingHref()} external={bookingExternal} variant="light">
              <CalendarCheck aria-hidden="true" className="h-4 w-4" />
              Planifier une démonstration
            </ButtonLink>
            <ButtonLink href={mail ?? "#contact"} variant="outline-light">
              Nous contacter
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* --- Section 10a : contact ---------------------------------------------- */
export function Contact() {
  const { email, phone, linkedin } = siteConfig.contact;
  const mail = contactMailto(siteConfig.meeting.emailSubject);
  const phoneReady = isConfigured(phone);

  const items = [
    {
      icon: Mail,
      label: "E-mail",
      value: email,
      href: mail,
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: phone,
      href: phoneReady ? `tel:${phone.replace(/[^\d+]/g, "")}` : null,
    },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-lp-line bg-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <Reveal className="lg:col-span-5">
          <Eyebrow>Contact</Eyebrow>
          <h2 id="contact-title" className="lp-display text-[30px] font-bold leading-[1.15] text-lp-navy sm:text-[38px]">
            Planifions un premier échange.
          </h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-lp-muted">
            Indiquez-nous quelques informations sur votre établissement. Nous reviendrons vers vous pour convenir
            d&apos;un rendez-vous et préparer une présentation adaptée à vos priorités.
          </p>

          <ul className="mt-10 space-y-3">
            {items.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lp-soft text-lp-navy">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12.5px] font-medium text-lp-muted">{label}</span>
                    <span className="block truncate text-[15.5px] font-semibold text-lp-navy">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} className="flex items-center gap-4 rounded-xl border border-lp-line p-3.5 transition-colors hover:border-[#c9d3e1] hover:bg-lp-bg">
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-xl border border-dashed border-lp-line p-3.5">{content}</div>
                  )}
                </li>
              );
            })}
            {isConfigured(linkedin) && (
              <li>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-lp-line p-3.5 transition-colors hover:border-[#c9d3e1] hover:bg-lp-bg"
                >
                  <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lp-soft text-lp-navy">
                    <LinkedinIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[12.5px] font-medium text-lp-muted">LinkedIn</span>
                    <span className="block text-[15.5px] font-semibold text-lp-navy">Suivez-nous</span>
                  </span>
                </a>
              </li>
            )}
          </ul>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
