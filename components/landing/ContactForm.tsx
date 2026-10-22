"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send, Sparkles } from "lucide-react";
import { siteConfig } from "./site-config";

type Values = {
  name: string;
  school: string;
  email: string;
  phone: string;
  message: string;
};
type Errors = Partial<Record<keyof Values, string>>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; message: string; needsActivation?: boolean }
  | { kind: "error"; message: string };

const empty: Values = { name: "", school: "", email: "", phone: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{8,20}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Veuillez indiquer votre nom et prénom.";
  if (v.school.trim().length < 2) e.school = "Veuillez indiquer le nom de votre établissement.";
  if (!v.email.trim()) e.email = "Veuillez indiquer votre adresse e-mail.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Cette adresse e-mail ne semble pas valide.";
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = "Ce numéro de téléphone ne semble pas valide.";
  if (v.message.length > 2000) e.message = "Votre message ne doit pas dépasser 2 000 caractères.";
  return e;
}

const interests = [
  "Gestion administrative",
  "Gestion financière",
  "Communication avec les parents",
  "Tableaux de bord & Pilotage",
];

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const errors = validate(values);
  const showError = (k: keyof Values) => (submitted || touched[k]) && errors[k];

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (status.kind !== "idle" && status.kind !== "sending") setStatus({ kind: "idle" });
  };
  const blur = (k: keyof Values) => () => setTouched((t) => ({ ...t, [k]: true }));

  const toggleInterest = (label: string) => {
    setValues((v) => {
      const has = v.message.includes(label);
      const message = has
        ? v.message.replace(new RegExp(`(^|, )${label}`), "").replace(/^, /, "")
        : v.message.trim()
          ? `${v.message.trim()}, ${label}`
          : label;
      return { ...v, message };
    });
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);

    const errs = validate(values);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`cf-${first}`)?.focus();
      setStatus({
        kind: "error",
        message: "Veuillez renseigner tous les champs obligatoires avant d'envoyer votre demande.",
      });
      return;
    }

    setStatus({ kind: "sending" });

    const payload = {
      _subject: `Nouvelle demande de démonstration — ${values.school.trim()} (${values.name.trim()})`,
      _template: "table",
      _captcha: "false",
      _replyto: values.email.trim(),
      "Nom et prénom": values.name.trim(),
      "Établissement scolaire": values.school.trim(),
      "E-mail professionnel": values.email.trim(),
      "Téléphone": values.phone.trim() || "Non renseigné",
      "Message / Besoins": values.message.trim() || "Demande de démonstration générale CreateX School",
    };

    let delivered = false;
    let needsActivation = false;

    // 1. Envoi direct via FormSubmit (service gratuit sécurisé, livraison directe sur Gmail sans ouverture d'Outlook)
    try {
      const fsRes = await fetch(`https://formsubmit.co/ajax/${siteConfig.contact.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await fsRes.json();
      if (data && (data.success === "true" || data.success === true)) {
        delivered = true;
      } else if (data && data.message && typeof data.message === "string" && data.message.toLowerCase().includes("activation")) {
        delivered = true;
        needsActivation = true;
      }
    } catch {
      // Ignorer et essayer la route interne
    }

    // 2. Envoi via la route interne
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      delivered = true;
    } catch {
      // route interne optionnelle
    }

    if (delivered) {
      setValues(empty);
      setTouched({});
      setSubmitted(false);
      setStatus({
        kind: "sent",
        needsActivation,
        message: needsActivation
          ? `Votre demande a bien été envoyée ! Un premier e-mail de confirmation d'activation a été envoyé à ${siteConfig.contact.email}.`
          : `Merci ${values.name} ! Votre demande a été transmise directement à ${siteConfig.contact.email}. Notre équipe vous contactera sous 24h.`,
      });
    } else {
      setStatus({
        kind: "error",
        message: "Une erreur réseau est survenue lors de l'envoi direct. Veuillez réessayer ou nous appeler directement au " + siteConfig.contact.phone,
      });
    }
  }

  const field =
    "block w-full rounded-[10px] border bg-white px-3.5 py-3 text-[15px] text-lp-ink placeholder:text-[#9aa5b5] transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-4";
  const fieldState = (k: keyof Values) =>
    showError(k)
      ? "border-[#d9534f] focus:border-[#d9534f] focus:ring-[#d9534f]/15"
      : "border-lp-line hover:border-[#c9d3e1] focus:border-lp-blue focus:ring-lp-blue/15";
  const label = "mb-1.5 block text-[13.5px] font-semibold text-lp-navy";

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="rounded-2xl border border-lp-line bg-white p-6 shadow-[0_24px_48px_-32px_rgba(20,43,74,0.3)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>
            Nom et prénom <span className="text-[#d9534f]" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={!!showError("name")}
            aria-describedby={showError("name") ? "cf-name-err" : undefined}
            value={values.name}
            onChange={set("name")}
            onBlur={blur("name")}
            className={`${field} ${fieldState("name")}`}
            placeholder="Ex. Sonia Ben Ali"
          />
          {showError("name") && (
            <p id="cf-name-err" className="mt-1.5 text-[13px] text-[#b2384a]">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-school" className={label}>
            Établissement scolaire <span className="text-[#d9534f]" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-school"
            name="school"
            autoComplete="organization"
            required
            aria-required="true"
            aria-invalid={!!showError("school")}
            aria-describedby={showError("school") ? "cf-school-err" : undefined}
            value={values.school}
            onChange={set("school")}
            onBlur={blur("school")}
            className={`${field} ${fieldState("school")}`}
            placeholder="Nom de l'école"
          />
          {showError("school") && (
            <p id="cf-school-err" className="mt-1.5 text-[13px] text-[#b2384a]">
              {errors.school}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>
            Adresse e-mail professionnelle <span className="text-[#d9534f]" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={!!showError("email")}
            aria-describedby={showError("email") ? "cf-email-err" : undefined}
            value={values.email}
            onChange={set("email")}
            onBlur={blur("email")}
            className={`${field} ${fieldState("email")}`}
            placeholder="direction@ecole.tn"
          />
          {showError("email") && (
            <p id="cf-email-err" className="mt-1.5 text-[13px] text-[#b2384a]">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-phone" className={label}>
            Numéro de téléphone <span className="font-normal text-lp-muted">(facultatif)</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={!!showError("phone")}
            aria-describedby={showError("phone") ? "cf-phone-err" : undefined}
            value={values.phone}
            onChange={set("phone")}
            onBlur={blur("phone")}
            className={`${field} ${fieldState("phone")}`}
            placeholder="+216 26 544 039"
          />
          {showError("phone") && (
            <p id="cf-phone-err" className="mt-1.5 text-[13px] text-[#b2384a]">
              {errors.phone}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className={label}>
            Message ou centres d&apos;intérêt <span className="font-normal text-lp-muted">(facultatif)</span>
          </label>
          <div className="mb-2.5 flex flex-wrap gap-2" role="group" aria-label="Ajouter un centre d'intérêt au message">
            {interests.map((it) => {
              const selected = values.message.includes(it);
              return (
                <button
                  key={it}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleInterest(it)}
                  className={`rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors duration-200 ${
                    selected
                      ? "border-lp-blue bg-[#e9f1fc] text-[#2b62b5]"
                      : "border-lp-line text-lp-muted hover:border-[#c9d3e1] hover:text-lp-navy"
                  }`}
                >
                  {it}
                </button>
              );
            })}
          </div>
          <textarea
            id="cf-message"
            name="message"
            rows={4}
            aria-invalid={!!showError("message")}
            aria-describedby={showError("message") ? "cf-message-err" : undefined}
            value={values.message}
            onChange={set("message")}
            onBlur={blur("message")}
            className={`${field} ${fieldState("message")} resize-y`}
            placeholder="Parlez-nous de votre établissement, de vos priorités ou de vos disponibilités."
          />
          {showError("message") && (
            <p id="cf-message-err" className="mt-1.5 text-[13px] text-[#b2384a]">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {/* Retours d'état après envoi */}
      <div aria-live="polite" className="empty:hidden">
        {status.kind === "error" && (
          <p
            role="alert"
            className="mt-5 flex gap-2.5 rounded-xl border border-[#f4d2d8] bg-[#fdf3f4] px-4 py-3 text-[14px] text-[#9b2c3d]"
          >
            <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            {status.message}
          </p>
        )}

        {status.kind === "sent" && (
          <div className="mt-5 rounded-xl border border-[#c8ebe4] bg-[#f1faf8] p-5 text-[14px] text-lp-ink">
            <p className="flex items-center gap-2 text-[15px] font-bold text-[#17695d]">
              <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-[#17695d]" />
              Demande envoyée directement avec succès !
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-lp-ink">
              {status.message}
            </p>
            {status.needsActivation && (
              <p className="mt-2 rounded-lg bg-white/80 p-2.5 text-[12.5px] text-[#0d594e]">
                <strong>Important pour l&apos;administrateur :</strong> Un e-mail d&apos;activation unique a été envoyé à <u>{siteConfig.contact.email}</u>. Cliquez simplement sur le lien à l&apos;intérieur pour valider la réception sans intermédiaire de tous les prochains formulaires.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12.5px] text-lp-muted">
          <span className="text-[#d9534f]" aria-hidden="true">*</span> Champs obligatoires. Envoi direct et confidentiel.
        </p>
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="group inline-flex min-h-[46px] w-full shrink-0 items-center justify-center gap-2 rounded-[10px] bg-lp-navy px-6 text-[14.5px] font-semibold text-white shadow-[0_6px_16px_-6px_rgba(20,43,74,0.45)] transition-[background-color,transform] duration-200 hover:bg-[#1c3a63] active:scale-[0.98] disabled:opacity-70 sm:w-auto"
        >
          {status.kind === "sending" ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> Envoi direct en cours…
            </>
          ) : (
            <>
              Demander une démonstration
              <Send aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
