import {
  Users,
  GraduationCap,
  UserCheck,
  CalendarDays,
  AlertTriangle,
  FileText,
  Megaphone,
  Paperclip,
  Video,
  Clock,
  MapPin,
  Download,
  TrendingUp,
  Trophy,
  Music,
  Bus,
  Calculator,
} from "lucide-react";
import { MockWindow, Pill, Avatar } from "./ui";

/* ============================================================================
   Maquettes de la vitrine produit — visuels illustratifs, données fictives.
   ============================================================================ */

const card = "rounded-xl border border-lp-line bg-white";
const floating =
  "lp-float absolute hidden rounded-xl border border-lp-line bg-white p-3.5 shadow-[0_24px_48px_-20px_rgba(20,43,74,0.45)] sm:block";

function PanelTitle({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <p className="text-[12px] font-semibold text-lp-navy">{children}</p>
      {aside}
    </div>
  );
}

/* --- 1. Tableau de bord administratif ----------------------------------- */
export function AdminMockup() {
  const teachers = [
    { name: "Karim Jaziri", subject: "Mathématiques", status: <Pill tone="ok">Présent</Pill> },
    { name: "Leïla Gharbi", subject: "Français", status: <Pill tone="ok">Présente</Pill> },
    { name: "Sami Bouazizi", subject: "Physique-Chimie", status: <Pill tone="warn">Retard 15 min</Pill> },
    { name: "Ines Mansouri", subject: "Anglais", status: <Pill tone="late">Absente · remplacée</Pill> },
  ];
  return (
    <div className="relative">
      <MockWindow title="Administration · Vue du jour">
        <div className="bg-[#f8fafd] p-4">
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { icon: Users, label: "Élèves inscrits", value: "428", sub: "18 classes" },
              { icon: GraduationCap, label: "Enseignants", value: "40", sub: "dont 6 vacataires" },
              { icon: UserCheck, label: "Présence du jour", value: "96,4 %", sub: "16 absences" },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className={`${card} p-3`}>
                <div className="flex items-center gap-1.5 text-lp-muted">
                  <Icon className="h-3.5 w-3.5" />
                  <span className="truncate text-[10.5px] font-medium">{label}</span>
                </div>
                <p className="mt-1 text-[18px] font-bold text-lp-navy">{value}</p>
                <p className="truncate text-[10px] text-lp-muted">{sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-2.5 grid gap-2.5 sm:grid-cols-5">
            <div className={`${card} p-3.5 sm:col-span-3`}>
              <PanelTitle aside={<span className="text-[10px] text-lp-muted">Aujourd&apos;hui</span>}>Équipe enseignante</PanelTitle>
              <ul className="divide-y divide-lp-line">
                {teachers.map((t, i) => (
                  <li key={t.name} className="flex items-center gap-2.5 py-2">
                    <Avatar name={t.name} tone={i} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11.5px] font-semibold text-lp-ink">{t.name}</p>
                      <p className="truncate text-[10px] text-lp-muted">{t.subject}</p>
                    </div>
                    {t.status}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2.5 sm:col-span-2">
              <div className={`${card} p-3.5`}>
                <PanelTitle>Prochaines activités</PanelTitle>
                <ul className="space-y-2.5">
                  {[
                    { d: "24", m: "oct.", t: "Réunion parents · 7e", h: "10:00" },
                    { d: "29", m: "oct.", t: "Sortie · Musée du Bardo", h: "08:30" },
                    { d: "05", m: "nov.", t: "Conseil de classe", h: "15:00" },
                  ].map((a) => (
                    <li key={a.t} className="flex items-center gap-2.5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-lp-soft text-center leading-none">
                        <span className="text-[12px] font-bold text-lp-navy">{a.d}</span>
                        <span className="-mt-1.5 text-[8.5px] text-lp-muted">{a.m}</span>
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold text-lp-ink">{a.t}</p>
                        <p className="text-[10px] text-lp-muted">{a.h}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${card} p-3.5`}>
                <PanelTitle>Cours en cours · 10 h</PanelTitle>
                <div className="flex flex-wrap gap-1.5">
                  {["7e A · Maths", "8e B · SVT", "9e A · Français", "1re S · Anglais"].map((c) => (
                    <span key={c} className="rounded-md bg-[#e9f1fc] px-2 py-1 text-[10px] font-semibold text-[#2b62b5]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MockWindow>

      <div className={`${floating} -bottom-7 -right-4 w-[220px] lg:-right-8`}>
        <p className="text-[10.5px] font-medium text-lp-muted">Appel de 8 h</p>
        <div className="mt-1 flex items-end justify-between">
          <p className="text-[20px] font-bold text-lp-navy">14 / 18</p>
          <Pill tone="info">classes validées</Pill>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#eef2f7]">
          <div className="h-full w-[78%] rounded-full bg-lp-blue" />
        </div>
      </div>
    </div>
  );
}

/* --- 2. Suivi financier -------------------------------------------------- */
export function FinanceMockup() {
  const rows = [
    { family: "Famille Ben Salah", cls: "8e B", amount: "450,000", status: <Pill tone="ok">Réglé</Pill> },
    { family: "Famille Trabelsi", cls: "7e A", amount: "450,000", status: <Pill tone="warn">Partiel · 200 DT</Pill> },
    { family: "Famille Hammami", cls: "1re S", amount: "520,000", status: <Pill tone="late">En retard · 12 j</Pill> },
    { family: "Famille Chaabane", cls: "9e A", amount: "405,000", status: <Pill tone="ok">Réglé · −10 %</Pill> },
    { family: "Famille Karoui", cls: "8e A", amount: "450,000", status: <Pill tone="neutral">Échéance 31/10</Pill> },
  ];
  const months = [
    { m: "Sept", a: 92, b: 100 },
    { m: "Oct", a: 78, b: 100 },
    { m: "Nov", a: 18, b: 100 },
  ];
  return (
    <div className="relative">
      <MockWindow title="Finances · Octobre">
        <div className="bg-[#f8fafd] p-4">
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: "Montant attendu", value: "108 000", tone: "text-lp-navy" },
              { label: "Encaissé", value: "84 250", tone: "text-[#1d7f70]" },
              { label: "Reste à percevoir", value: "23 750", tone: "text-[#b2384a]" },
            ].map((k) => (
              <div key={k.label} className={`${card} p-3`}>
                <p className="truncate text-[10.5px] font-medium text-lp-muted">{k.label}</p>
                <p className={`mt-1 text-[17px] font-bold ${k.tone}`}>
                  {k.value} <span className="text-[10px] font-semibold text-lp-muted">DT</span>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-2.5 grid gap-2.5 sm:grid-cols-5">
            <div className={`${card} overflow-hidden sm:col-span-3`}>
              <div className="px-3.5 pt-3.5">
                <PanelTitle aside={<span className="text-[10px] text-lp-muted">Frais de scolarité · T1</span>}>
                  État des paiements
                </PanelTitle>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-y border-lp-line bg-[#fbfcfe] text-[9.5px] uppercase tracking-wide text-lp-muted">
                    <th className="px-3.5 py-1.5 font-semibold">Famille</th>
                    <th className="hidden px-2 py-1.5 font-semibold sm:table-cell">Classe</th>
                    <th className="px-2 py-1.5 text-right font-semibold">Montant</th>
                    <th className="px-3.5 py-1.5 text-right font-semibold">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-lp-line">
                  {rows.map((r) => (
                    <tr key={r.family}>
                      <td className="truncate px-3.5 py-2 text-[11px] font-semibold text-lp-ink">{r.family}</td>
                      <td className="hidden px-2 py-2 text-[10.5px] text-lp-muted sm:table-cell">{r.cls}</td>
                      <td className="px-2 py-2 text-right text-[11px] text-lp-ink">{r.amount}</td>
                      <td className="px-3.5 py-2 text-right">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-2.5 sm:col-span-2">
              <div className={`${card} p-3.5`}>
                <PanelTitle>Taux d&apos;encaissement</PanelTitle>
                <div className="space-y-2">
                  {months.map((m) => (
                    <div key={m.m} className="flex items-center gap-2">
                      <span className="w-8 text-[10px] text-lp-muted">{m.m}</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#eef2f7]">
                        <div className={`h-full rounded-full ${m.m === "Oct" ? "bg-lp-blue" : "bg-[#b9cff0]"}`} style={{ width: `${m.a}%` }} />
                      </div>
                      <span className="w-8 text-right text-[10px] font-semibold text-lp-ink">{m.a} %</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${card} p-3.5`}>
                <PanelTitle aside={<Calculator className="h-3.5 w-3.5 text-lp-muted" />}>Calcul des salaires</PanelTitle>
                <div className="flex items-center gap-2">
                  <Avatar name="Karim Jaziri" />
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-semibold text-lp-ink">Karim Jaziri</p>
                    <p className="text-[10px] text-lp-muted">Heures enregistrées en octobre</p>
                  </div>
                </div>
                <dl className="mt-2.5 space-y-1 text-[10.5px]">
                  <div className="flex justify-between">
                    <dt className="text-lp-muted">Heures de présence</dt>
                    <dd className="font-semibold text-lp-ink">62 h</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-lp-muted">Cours supplémentaires</dt>
                    <dd className="font-semibold text-lp-ink">6 h</dd>
                  </div>
                  <div className="flex justify-between border-t border-lp-line pt-1.5">
                    <dt className="font-semibold text-lp-navy">Total estimé</dt>
                    <dd className="font-bold text-lp-navy">1 224 DT</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </MockWindow>

      <div className={`${floating} -left-4 -top-6 w-[240px] lg:-left-10`} style={{ "--lp-float-delay": "-2s" } as React.CSSProperties}>
        <div className="flex gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#fcecee] text-[#b2384a]">
            <AlertTriangle className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[11.5px] font-semibold text-lp-navy">Paiement en retard</p>
            <p className="text-[10.5px] leading-snug text-lp-muted">Famille Hammami · échéance du 10/10 non réglée</p>
            <p className="mt-1.5 text-[10.5px] font-semibold text-lp-blue">Envoyer un rappel</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- 3. Espace de communication ----------------------------------------- */
export function CommunicationMockup() {
  return (
    <div className="relative">
      <MockWindow title="Communication · Annonces et suivi">
        <div className="grid gap-2.5 bg-[#f8fafd] p-4 sm:grid-cols-5">
          <div className="space-y-2.5 sm:col-span-3">
            <div className={`${card} p-4`}>
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#e9f1fc] text-lp-blue">
                  <Megaphone className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11.5px] font-semibold text-lp-navy">Direction · École Horizon</p>
                  <p className="text-[10px] text-lp-muted">Destinataires : parents de 7e A et 7e B</p>
                </div>
                <Pill tone="info">Annonce</Pill>
              </div>
              <p className="mt-3 text-[13px] font-semibold text-lp-ink">Sortie pédagogique au musée du Bardo</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-lp-muted">
                Chers parents, une visite est organisée le jeudi 29 octobre. Départ à 8 h 30 depuis l&apos;école, retour prévu
                vers 13 h. Merci de confirmer la participation de votre enfant avant le 26 octobre.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-lp-line pt-3">
                <span className="inline-flex items-center gap-1 rounded-md border border-lp-line px-2 py-1 text-[10px] text-lp-muted">
                  <Paperclip className="h-3 w-3" /> Autorisation_sortie.pdf
                </span>
                <span className="ml-auto text-[10px] text-lp-muted">
                  <span className="font-semibold text-[#1d7f70]">41</span> confirmations sur 52
                </span>
              </div>
            </div>
            <div className={`${card} p-3.5`}>
              <PanelTitle aside={<span className="text-[10px] text-lp-muted">Mathématiques · 7e A</span>}>Supports de cours</PanelTitle>
              <ul className="space-y-1.5">
                {[
                  { n: "Chapitre 3 — Les fractions", s: "PDF · 1,2 Mo" },
                  { n: "Fiche d'exercices n° 5", s: "PDF · 340 Ko" },
                  { n: "Quiz : nombres décimaux", s: "10 questions" },
                ].map((f) => (
                  <li key={f.n} className="flex items-center gap-2.5 rounded-lg bg-[#fbfcfe] px-2.5 py-2">
                    <FileText className="h-4 w-4 shrink-0 text-lp-blue" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-semibold text-lp-ink">{f.n}</p>
                      <p className="text-[9.5px] text-lp-muted">{f.s}</p>
                    </div>
                    <Download className="h-3.5 w-3.5 text-lp-muted" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-2.5 sm:col-span-2">
            <div className={`${card} p-3.5`}>
              <PanelTitle>Progression scolaire</PanelTitle>
              <div className="flex items-center gap-2.5">
                <Avatar name="Yasmine Ben Salah" tone={2} />
                <div className="min-w-0">
                  <p className="truncate text-[11.5px] font-semibold text-lp-ink">Yasmine Ben Salah</p>
                  <p className="text-[10px] text-lp-muted">7e A</p>
                </div>
              </div>
              <div className="mt-3 flex items-end gap-1.5">
                <p className="text-[22px] font-bold leading-none text-lp-navy">15,40</p>
                <p className="pb-0.5 text-[10px] text-lp-muted">/ 20 · moyenne provisoire</p>
              </div>
              <p className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-[#1d7f70]">
                <TrendingUp className="h-3 w-3" /> +0,8 depuis septembre
              </p>
              <ul className="mt-3 space-y-1.5">
                {[
                  { s: "Mathématiques", v: 16.5 },
                  { s: "Français", v: 14.25 },
                  { s: "Sciences", v: 15.75 },
                ].map((m) => (
                  <li key={m.s}>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-lp-muted">{m.s}</span>
                      <span className="font-semibold text-lp-ink">{m.v.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-[#eef2f7]">
                      <div className="h-full rounded-full bg-[#7f72cc]" style={{ width: `${(m.v / 20) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-lp-navy p-3.5 text-white">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-white/60">Événement à venir</p>
              <p className="mt-1.5 text-[12.5px] font-semibold">Journée portes ouvertes</p>
              <p className="mt-1 flex items-center gap-1 text-[10.5px] text-white/70">
                <CalendarDays className="h-3 w-3" /> Samedi 14 novembre · 9 h – 13 h
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-[10.5px] text-white/70">
                <MapPin className="h-3 w-3" /> Cour principale
              </p>
            </div>
          </div>
        </div>
      </MockWindow>

      <div className={`${floating} -bottom-6 -left-4 w-[230px] lg:-left-10`} style={{ "--lp-float-delay": "-4s" } as React.CSSProperties}>
        <div className="flex gap-2.5">
          <Avatar name="Mohamed Trabelsi" tone={1} />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-lp-navy">M. Trabelsi · parent</p>
            <p className="text-[10.5px] leading-snug text-lp-muted">Merci, Adam participera à la sortie.</p>
            <p className="mt-1 text-[9.5px] text-lp-muted">Il y a 5 min</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- 4. Organisation scolaire ------------------------------------------- */
const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const hours = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"];
type Slot = { s: string; r: string; c: string } | null;
const C = {
  maths: "bg-[#e9f1fc] text-[#2b62b5] border-[#cfe0f7]",
  fr: "bg-[#f1eefb] text-[#5b4bb0] border-[#ded8f5]",
  sci: "bg-[#e7f6f3] text-[#1d7f70] border-[#c8ebe4]",
  ar: "bg-[#fdf4e3] text-[#9a6412] border-[#f4e1bb]",
  en: "bg-[#fcecee] text-[#b2384a] border-[#f4d2d8]",
  other: "bg-[#f1f4f8] text-[#56657a] border-[#e0e6ee]",
};
const grid: Slot[][] = [
  // une ligne par créneau, une colonne par jour
  [{ s: "Maths", r: "S12", c: C.maths }, { s: "SVT", r: "Labo", c: C.sci }, { s: "Anglais", r: "S08", c: C.en }, { s: "Physique", r: "Labo", c: C.sci }, { s: "Histoire", r: "S12", c: C.ar }, { s: "Maths", r: "S12", c: C.maths }],
  [{ s: "Maths", r: "S12", c: C.maths }, { s: "Arabe", r: "S12", c: C.ar }, { s: "Français", r: "S12", c: C.fr }, { s: "Français", r: "S12", c: C.fr }, { s: "Informatique", r: "Info", c: C.other }, { s: "Arabe", r: "S12", c: C.ar }],
  [{ s: "Français", r: "S12", c: C.fr }, { s: "Maths", r: "S12", c: C.maths }, { s: "Éd. physique", r: "Gym", c: C.other }, { s: "Maths", r: "S12", c: C.maths }, { s: "Anglais", r: "S08", c: C.en }, { s: "SVT", r: "Labo", c: C.sci }],
  [{ s: "Arabe", r: "S12", c: C.ar }, { s: "Anglais", r: "S08", c: C.en }, null, { s: "Arabe", r: "S12", c: C.ar }, { s: "Français", r: "S12", c: C.fr }, null],
  [{ s: "Physique", r: "Labo", c: C.sci }, { s: "Éd. civique", r: "S12", c: C.other }, null, { s: "Anglais", r: "S08", c: C.en }, { s: "Maths", r: "S12", c: C.maths }, null],
  [{ s: "Soutien maths", r: "S12", c: C.maths }, { s: "Club robotique", r: "Info", c: C.other }, null, { s: "Club théâtre", r: "Salle", c: C.other }, null, null],
];

export function OrganisationMockup() {
  return (
    <div className="relative">
      <MockWindow title="Organisation · Emploi du temps 8e B">
        <div className="bg-[#f8fafd] p-4">
          <div className={`${card} overflow-hidden`}>
            <div className="flex items-center justify-between border-b border-lp-line px-3.5 py-2.5">
              <p className="text-[12px] font-semibold text-lp-navy">Semaine du 19 au 24 octobre</p>
              <div className="flex gap-1.5">
                <Pill tone="info">8e B</Pill>
                <Pill tone="neutral">28 élèves</Pill>
              </div>
            </div>
            <div className="overflow-hidden p-2.5">
              <div className="grid grid-cols-[34px_repeat(6,minmax(0,1fr))] gap-1">
                <span />
                {days.map((d) => (
                  <span key={d} className="pb-1 text-center text-[10px] font-semibold text-lp-muted">
                    {d}
                  </span>
                ))}
                {hours.map((h, r) => (
                  <div key={h} className="contents">
                    <span className="pt-1 text-[9px] text-lp-muted">{h}</span>
                    {grid[r].map((slot, c) =>
                      slot ? (
                        <div key={c} className={`min-w-0 rounded-md border px-1 py-1 sm:px-1.5 ${slot.c}`}>
                          <p className="truncate text-[9px] font-semibold sm:text-[9.5px]">{slot.s}</p>
                          <p className="hidden truncate text-[8.5px] opacity-70 sm:block">{slot.r}</p>
                        </div>
                      ) : (
                        <div key={c} className="rounded-md border border-dashed border-lp-line" />
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
            <div className={`${card} p-3.5`}>
              <PanelTitle aside={<Video className="h-3.5 w-3.5 text-lp-muted" />}>Cours en ligne</PanelTitle>
              <ul className="space-y-2">
                {[
                  { t: "Révision · Physique 9e", h: "Mar. 18:00", who: "S. Bouazizi" },
                  { t: "Soutien · Anglais 1re", h: "Jeu. 17:30", who: "I. Mansouri" },
                ].map((c) => (
                  <li key={c.t} className="flex items-center gap-2.5">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#e9f1fc] text-lp-blue">
                      <Video className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-semibold text-lp-ink">{c.t}</p>
                      <p className="flex items-center gap-1 text-[10px] text-lp-muted">
                        <Clock className="h-2.5 w-2.5" /> {c.h} · {c.who}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${card} p-3.5`}>
              <PanelTitle>Clubs et activités</PanelTitle>
              <ul className="space-y-2">
                {[
                  { icon: Trophy, t: "Tournoi inter-classes", h: "Mer. 28 oct.", c: "bg-[#fdf4e3] text-[#9a6412]" },
                  { icon: Music, t: "Répétition chorale", h: "Ven. 30 oct.", c: "bg-[#f1eefb] text-[#5b4bb0]" },
                  { icon: Bus, t: "Sortie · Musée du Bardo", h: "Jeu. 29 oct.", c: "bg-[#e7f6f3] text-[#1d7f70]" },
                ].map(({ icon: Icon, t, h, c }) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${c}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <p className="min-w-0 flex-1 truncate text-[11px] font-semibold text-lp-ink">{t}</p>
                    <span className="shrink-0 text-[10px] text-lp-muted">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </MockWindow>

      <div className={`${floating} -right-4 -top-6 w-[210px] lg:-right-8`} style={{ "--lp-float-delay": "-1s" } as React.CSSProperties}>
        <div className="flex gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#e7f6f3] text-[#1d7f70]">
            <CalendarDays className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-lp-navy">Remplacement planifié</p>
            <p className="text-[10.5px] leading-snug text-lp-muted">Anglais · mer. 08:00 · Salle S08</p>
          </div>
        </div>
      </div>
    </div>
  );
}
