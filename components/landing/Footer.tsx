import { Logo } from "./ui";
import { LinkedinIcon } from "./Closing";
import { navLinks, siteConfig, isConfigured, contactMailto } from "./site-config";

export function Footer() {
  const { email, phone, linkedin } = siteConfig.contact;
  const mail = contactMailto();
  const phoneReady = isConfigured(phone);

  return (
    <footer className="bg-[#0f2240] text-white/70">
      <div className="mx-auto max-w-[1200px] px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo inverted />
            <p className="mt-5 max-w-[380px] text-[14.5px] leading-relaxed text-white/60">{siteConfig.shortDescription}</p>
          </div>

          <nav aria-label="Liens du pied de page" className="md:col-span-3">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-white/45">Navigation</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[14.5px] transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="text-[14.5px] transition-colors hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-white/45">Nous contacter</p>
            <ul className="mt-4 space-y-2.5 text-[14.5px]">
              <li>
                {mail ? (
                  <a href={mail} className="transition-colors hover:text-white">
                    {email}
                  </a>
                ) : (
                  <span>{email}</span>
                )}
              </li>
              <li>
                {phoneReady ? (
                  <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="transition-colors hover:text-white">
                    {phone}
                  </a>
                ) : (
                  <span>{phone}</span>
                )}
              </li>
              {isConfigured(linkedin) && (
                <li>
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                    <LinkedinIcon className="h-4 w-4" /> LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.brandName}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
