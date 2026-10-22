import type { Metadata } from "next";
import "./landing.css";
import { siteConfig } from "@/components/landing/site-config";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Problems } from "@/components/landing/Problems";
import { Solution } from "@/components/landing/Solution";
import { Showcase } from "@/components/landing/Showcase";
import { Benefits } from "@/components/landing/Benefits";
import { Process } from "@/components/landing/Process";
import { Faq } from "@/components/landing/Faq";
import { FinalCta, Contact } from "@/components/landing/Closing";
import { Footer } from "@/components/landing/Footer";
import { BackToTop } from "@/components/landing/BackToTop";

/* ============================================================================
   Site de présentation commerciale — page d'accueil
   (l'ancien prototype de tableau de bord est disponible sur /demo)
   ============================================================================ */

const description =
  "Solution de gestion scolaire pour les écoles privées en Tunisie : présences, emplois du temps, suivi des paiements, communication avec les parents et tableaux de bord réunis dans un seul environnement.";

export const metadata: Metadata = {
  title: `${siteConfig.brandName} — Solution de gestion scolaire pour écoles privées`,
  description,
  keywords: [
    "gestion scolaire",
    "logiciel école privée",
    "Tunisie",
    "suivi des présences",
    "emploi du temps",
    "paiements scolaires",
    "communication parents",
  ],
  openGraph: {
    title: `${siteConfig.brandName} — Une gestion scolaire plus simple`,
    description,
    type: "website",
    locale: "fr_TN",
  },
  robots: { index: true, follow: true },
};

export default function HomePage() {
  return (
    <div className="lp-root min-h-screen">
      {/* Sans JavaScript, le contenu reste visible */}
      <noscript>
        <style>{`.lp-reveal{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <Navbar />
      <main id="contenu">
        <Hero />
        <Problems />
        <Solution />
        <Showcase />
        <Benefits />
        <Process />
        <Faq />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
