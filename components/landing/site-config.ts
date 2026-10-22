/**
 * ============================================================================
 * CONFIGURATION DU SITE DE PRÉSENTATION — CREATEX SCHOOL
 * ============================================================================
 */

export const siteConfig = {
  /** Nom commercial officiel de la plateforme. */
  brandName: "CreateX School",

  /** Slogan officiel de la plateforme. */
  slogan: "Empowering Private Schools",

  /** Initiales pour affichage compact ou secours. */
  brandInitials: "CX",

  /** Courte description utilisée dans le pied de page et les balises SEO. */
  shortDescription:
    "CreateX School — Solution complète de gestion scolaire pensée pour les écoles privées : administration, finances, communication avec les familles et pilotage réunis dans un même environnement.",

  contact: {
    /** Adresse e-mail officielle de contact. */
    email: "createx1000@gmail.com",
    /** Numéro de téléphone direct. */
    phone: "+216 26 544 039",
    /** URL LinkedIn (optionnelle). */
    linkedin: "",
  },

  meeting: {
    /**
     * Lien de prise de rendez-vous externe (Calendly, Google Agenda…).
     * Laissez vide pour diriger les CTA vers le formulaire de contact.
     */
    bookingUrl: "",
    /** Objet de l'e-mail pré-rempli lors d'une demande de démonstration. */
    emailSubject: "Demande de démonstration — CreateX School",
  },

  form: {
    /** Point de terminaison pour l'envoi direct par e-mail. */
    endpoint: "/api/contact",
  },

  /** Année affichée dans le copyright. */
  copyrightYear: new Date().getFullYear(),
} as const;

/** Une valeur est considérée « configurée » si elle n'est pas vide et ne contient pas de crochets de substitution. */
export function isConfigured(value: string | undefined | null): value is string {
  return !!value && value.trim() !== "" && !/[[\]]/.test(value);
}

/** Lien `mailto:` vers l'adresse de contact, ou `null` si l'adresse n'est pas encore configurée. */
export function contactMailto(subject?: string, body?: string): string | null {
  if (!isConfigured(siteConfig.contact.email)) return null;
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${siteConfig.contact.email}${query ? `?${query}` : ""}`;
}

/** Destination des boutons « Planifier une démonstration ». */
export function meetingHref(): string {
  return isConfigured(siteConfig.meeting.bookingUrl) ? siteConfig.meeting.bookingUrl : "#contact";
}

export const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#fonctionnalites", label: "Fonctionnalités" },
  { href: "#avantages", label: "Avantages" },
  { href: "#comment-ca-marche", label: "Comment ça marche" },
  { href: "#faq", label: "FAQ" },
] as const;
