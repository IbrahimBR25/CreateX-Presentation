"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Copy, Info, Loader2, Mail, Send } from "lucide-react";
import { siteConfig, isConfigured, contactMailto } from "./site-config";

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
  | { kind: "sent" }
  | { kind: "error"; message: string }
  | { kind: "demo"; mailto: string | null; text: string };

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

function buildMessage(v: Values) {
  return [
    "Bonjour,",
    "",
    "Je souhaite planifier une démonstration de votre solution de gestion scolaire.",
    "",
    `Nom et prénom : ${v.name.trim()}`,
    `Établissement : ${v.school.trim()}`,
    `E-mail : ${v.email.trim()}`,
    `Téléphone : ${v.phone.trim() || "—"}`,
    "",
    "Message / centres d'intérêt :",
    v.message.trim() || "—",
  ].join("\n");
}

const interests = ["Gestion administrative", "Gestion financière", "Communication avec les parents", "Tableaux de bord"];

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState(false);

  const errors = validate(values);
  const endpointReady = isConfigured(siteConfig.form.endpoint);
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
    setCopied(false);
    const errs = validate(values);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`cf-${first}`)?.focus();
      setStatus({ kind: "error", message: "Veuillez corriger les champs signalés avant d'envoyer votre demande." });
      return;
    }

    if (!endpointReady) {
      // Mode démonstration : aucune donnée n'est envoyée ni effacée.
      const text = buildMessage(values);
      setStatus({ kind: "demo", mailto: contactMailto(siteConfig.meeting.emailSubject, text), text });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(siteConfig.form.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, subject: siteConfig.meeting.emailSubject }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ kind: "sent" });
      setValues(empty);
      setTouched({});
      setSubmitted(false);
    } catch {
      setStatus({
        kind: "error",
        message:
          "Votre demande n'a pas pu être envoyée. Vos informations sont conservées : réessayez dans un instant ou contactez-nous directement.",
      });
    }
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
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
    <form noValidate onSubmit={onSubmit} aria-describedby={endpointReady ? undefined : "cf-mode"} className="rounded-2xl border border-lp-line bg-white p-6 shadow-[0_24px_48px_-32px_rgba(20,43,74,0.3)] sm:p-8">
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
            placeholder="+216 …"
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
                    selected ? "border-lp-blue bg-[#e9f1fc] text-[#2b62b5]" : "border-lp-line text-lp-muted hover:border-[#c9d3e1] hover:text-lp-navy"
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

      {!endpointReady && (
        <p id="cf-mode" className="mt-6 flex gap-2.5 rounded-xl bg-lp-bg px-4 py-3 text-[13px] leading-relaxed text-lp-muted">
          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-lp-blue" />
          <span>
            Formulaire de démonstration : aucun envoi automatique n&apos;est encore configuré. Après validation, vous
            pourrez transmettre votre demande depuis votre messagerie.
          </span>
        </p>
      )}

      {/* Retours d'état */}
      <div aria-live="polite" className="empty:hidden">
        {status.kind === "error" && (
          <p role="alert" className="mt-5 flex gap-2.5 rounded-xl border border-[#f4d2d8] bg-[#fdf3f4] px-4 py-3 text-[14px] text-[#9b2c3d]">
            <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            {status.message}
          </p>
        )}
        {status.kind === "sent" && (
          <p className="mt-5 flex gap-2.5 rounded-xl border border-[#c8ebe4] bg-[#f1faf8] px-4 py-3 text-[14px] text-[#17695d]">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            Merci, votre demande a bien été transmise. Nous vous recontacterons pour convenir d&apos;un rendez-vous.
          </p>
        )}
        {status.kind === "demo" && (
          <div className="mt-5 rounded-xl border border-[#cfe0f7] bg-[#f3f7fd] px-4 py-4 text-[14px] text-lp-ink">
            <p className="flex gap-2.5 font-semibold text-lp-navy">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-lp-blue" />
              Votre demande est prête, mais elle n&apos;a pas encore été envoyée.
            </p>
            <p className="mt-1.5 pl-[26px] text-[13.5px] leading-relaxed text-lp-muted">
              {status.mailto
                ? "Ouvrez votre messagerie pour l'envoyer : le message est pré-rempli avec vos informations."
                : "L'adresse de contact n'est pas encore configurée sur ce site. Copiez votre message pour le transmettre par e-mail."}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 pl-[26px]">
              {status.mailto && (
                <a
                  href={status.mailto}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-[10px] bg-lp-navy px-4 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#1c3a63]"
                >
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  Ouvrir ma messagerie
                </a>
              )}
              <button
                type="button"
                onClick={() => copyText(status.text)}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-[10px] border border-lp-line bg-white px-4 text-[13.5px] font-semibold text-lp-navy transition-colors hover:border-[#c9d3e1]"
              >
                <Copy aria-hidden="true" className="h-4 w-4" />
                {copied ? "Message copié" : "Copier le message"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12.5px] text-lp-muted">
          <span className="text-[#d9534f]" aria-hidden="true">*</span> Champs obligatoires. Vos informations servent
          uniquement à vous recontacter.
        </p>
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="group inline-flex min-h-[46px] w-full shrink-0 items-center justify-center gap-2 rounded-[10px] bg-lp-navy px-6 text-[14.5px] font-semibold text-white shadow-[0_6px_16px_-6px_rgba(20,43,74,0.45)] transition-[background-color,transform] duration-200 hover:bg-[#1c3a63] active:scale-[0.98] disabled:opacity-70 sm:w-auto"
        >
          {status.kind === "sending" ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> Envoi en cours…
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
