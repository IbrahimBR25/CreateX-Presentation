import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Wallet,
  MessageSquare,
  BookOpen,
  BarChart3,
  Settings,
  Bell,
  Search,
  CheckCircle2,
  AlertCircle,
  CalendarClock,
  TrendingUp,
} from "lucide-react";
import { Pill } from "./ui";

/* ============================================================================
   Maquette du tableau de bord (hero) — visuel statique et illustratif.
   Toutes les données sont fictives.
   ============================================================================ */

const sidebar = [
  { icon: LayoutDashboard, label: "Tableau de bord", active: true },
  { icon: Users, label: "Élèves" },
  { icon: CalendarDays, label: "Emplois du temps" },
  { icon: Wallet, label: "Finances" },
  { icon: MessageSquare, label: "Communication" },
  { icon: BookOpen, label: "Pédagogie" },
  { icon: BarChart3, label: "Rapports" },
];

const kpis = [
  { label: "Présence élèves", value: "96,4 %", sub: "412 / 428 aujourd'hui", tone: "text-[#1d7f70]", bar: 96, color: "bg-lp-teal" },
  { label: "Présence enseignants", value: "38 / 40", sub: "2 absences signalées", tone: "text-lp-blue", bar: 95, color: "bg-lp-blue" },
  { label: "Paiements d'octobre", value: "78 %", sub: "des échéances réglées", tone: "text-lp-navy", bar: 78, color: "bg-lp-navy" },
];

const timetable: { day: string; slots: ({ s: string; c: string } | null)[] }[] = [
  { day: "Lun", slots: [{ s: "Maths", c: "bg-[#e9f1fc] text-[#2b62b5]" }, { s: "Français", c: "bg-[#f1eefb] text-[#5b4bb0]" }, null] },
  { day: "Mar", slots: [{ s: "SVT", c: "bg-[#e7f6f3] text-[#1d7f70]" }, { s: "Maths", c: "bg-[#e9f1fc] text-[#2b62b5]" }, { s: "Arabe", c: "bg-[#fdf4e3] text-[#9a6412]" }] },
  { day: "Mer", slots: [{ s: "Anglais", c: "bg-[#fcecee] text-[#b2384a]" }, null, { s: "Club", c: "bg-[#f1f4f8] text-lp-muted" }] },
  { day: "Jeu", slots: [{ s: "Physique", c: "bg-[#e7f6f3] text-[#1d7f70]" }, { s: "Français", c: "bg-[#f1eefb] text-[#5b4bb0]" }, { s: "Maths", c: "bg-[#e9f1fc] text-[#2b62b5]" }] },
  { day: "Ven", slots: [{ s: "Histoire", c: "bg-[#fdf4e3] text-[#9a6412]" }, { s: "Info.", c: "bg-[#e9f1fc] text-[#2b62b5]" }, null] },
];

const finance = [
  { m: "Mai", v: 70 },
  { m: "Juin", v: 62 },
  { m: "Sept", v: 88 },
  { m: "Oct", v: 74 },
];

export function HeroDashboard() {
  return (
    <div className="lp-mock overflow-hidden rounded-2xl border border-lp-line bg-white text-lp-ink shadow-[0_1px_2px_rgba(20,43,74,0.05),0_40px_80px_-40px_rgba(20,43,74,0.35)]">
      <div className="flex">
        {/* Barre latérale */}
        <aside className="hidden w-[150px] shrink-0 flex-col bg-lp-navy px-2.5 py-4 md:flex">
          <div className="mb-5 flex items-center gap-2 px-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-white/10 text-[10px] font-bold text-white">É</span>
            <span className="text-[11px] font-semibold text-white">École Horizon</span>
          </div>
          <ul className="space-y-0.5">
            {sidebar.map(({ icon: Icon, label, active }) => (
              <li
                key={label}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[10.5px] ${
                  active ? "bg-white/10 font-semibold text-white" : "text-white/55"
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
                <span className="truncate">{label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center gap-2 rounded-md px-2 py-1.5 text-[10.5px] text-white/55">
            <Settings className="h-3.5 w-3.5" strokeWidth={1.8} />
            Paramètres
          </div>
        </aside>

        {/* Zone principale */}
        <div className="min-w-0 flex-1 bg-[#f8fafd] p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-bold text-lp-navy">Bonjour, Mme Gharbi</p>
              <p className="text-[10px] text-lp-muted">Jeudi 22 octobre · Trimestre 1</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-md border border-lp-line bg-white px-2 py-1 text-[10px] text-lp-muted sm:flex">
                <Search className="h-3 w-3" /> Rechercher…
              </span>
              <span className="relative grid h-6 w-6 place-items-center rounded-md border border-lp-line bg-white">
                <Bell className="h-3 w-3 text-lp-muted" />
                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#d9534f]" />
              </span>
            </div>
          </div>

          {/* Indicateurs */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {kpis.map((k, i) => (
              <div key={k.label} className={`rounded-lg border border-lp-line bg-white p-2.5 ${i === 2 ? "hidden sm:block" : ""}`}>
                <p className="truncate text-[9.5px] font-medium text-lp-muted">{k.label}</p>
                <p className={`mt-0.5 text-[15px] font-bold leading-tight ${k.tone}`}>{k.value}</p>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#eef2f7]">
                  <div className={`h-full rounded-full ${k.color}`} style={{ width: `${k.bar}%` }} />
                </div>
                <p className="mt-1 truncate text-[9px] text-lp-muted">{k.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-5">
            {/* Emploi du temps */}
            <div className="rounded-lg border border-lp-line bg-white p-2.5 sm:col-span-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10.5px] font-semibold text-lp-navy">Emploi du temps · 8e B</p>
                <span className="text-[9px] text-lp-muted">Semaine 43</span>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {timetable.map((d) => (
                  <div key={d.day} className="space-y-1">
                    <p className="text-center text-[9px] font-semibold text-lp-muted">{d.day}</p>
                    {d.slots.map((slot, i) =>
                      slot ? (
                        <div key={i} className={`truncate rounded px-1 py-1 text-center text-[8.5px] font-semibold ${slot.c}`}>
                          {slot.s}
                        </div>
                      ) : (
                        <div key={i} className="rounded border border-dashed border-lp-line py-1 text-center text-[8.5px] text-transparent">
                          —
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="rounded-lg border border-lp-line bg-white p-2.5 sm:col-span-2">
              <p className="mb-2 text-[10.5px] font-semibold text-lp-navy">Notifications</p>
              <ul className="space-y-1.5">
                <li className="flex gap-1.5">
                  <AlertCircle className="mt-px h-3 w-3 shrink-0 text-[#c0802a]" />
                  <p className="text-[9.5px] leading-snug text-lp-ink">
                    <span className="font-semibold">12 échéances</span> arrivent à terme
                  </p>
                </li>
                <li className="flex gap-1.5">
                  <CalendarClock className="mt-px h-3 w-3 shrink-0 text-lp-blue" />
                  <p className="text-[9.5px] leading-snug text-lp-ink">Réunion parents · sam. 10 h</p>
                </li>
                <li className="flex gap-1.5">
                  <CheckCircle2 className="mt-px h-3 w-3 shrink-0 text-lp-teal" />
                  <p className="text-[9.5px] leading-snug text-lp-ink">Appel de 8 h validé (14 classes)</p>
                </li>
              </ul>
            </div>

            {/* Aperçu financier */}
            <div className="rounded-lg border border-lp-line bg-white p-2.5 sm:col-span-2">
              <div className="mb-1 flex items-center justify-between">
                <p className="text-[10.5px] font-semibold text-lp-navy">Encaissements</p>
                <Pill tone="ok">
                  <TrendingUp className="h-2.5 w-2.5" /> à jour
                </Pill>
              </div>
              <p className="text-[14px] font-bold text-lp-navy">
                84 250 <span className="text-[10px] font-semibold text-lp-muted">DT</span>
              </p>
              <div className="mt-2 flex h-14 items-end gap-2">
                {finance.map((f) => (
                  <div key={f.m} className="flex flex-1 flex-col items-center gap-1">
                    <div className="flex h-11 w-full items-end overflow-hidden rounded-sm bg-[#f1f4f8]">
                      <div
                        className={`w-full rounded-sm ${f.m === "Oct" ? "bg-lp-blue" : "bg-[#c9daf4]"}`}
                        style={{ height: `${f.v}%` }}
                      />
                    </div>
                    <span className="text-[8.5px] text-lp-muted">{f.m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progression scolaire */}
            <div className="hidden rounded-lg border border-lp-line bg-white p-2.5 sm:col-span-3 sm:block">
              <div className="mb-1 flex items-center justify-between">
                <p className="text-[10.5px] font-semibold text-lp-navy">Progression des moyennes</p>
                <div className="flex items-center gap-2 text-[8.5px] text-lp-muted">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-lp-blue" /> Collège
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-lp-teal" /> Lycée
                  </span>
                </div>
              </div>
              <svg viewBox="0 0 240 80" className="h-[78px] w-full" preserveAspectRatio="none" aria-hidden="true">
                {[16, 36, 56].map((y) => (
                  <line key={y} x1="0" x2="240" y1={y} y2={y} stroke="#eef2f7" strokeWidth="1" />
                ))}
                <path d="M0 58 L48 52 L96 47 L144 44 L192 36 L240 30" fill="none" stroke="#3977D5" strokeWidth="2" strokeLinejoin="round" />
                <path d="M0 58 L48 52 L96 47 L144 44 L192 36 L240 30 L240 80 L0 80 Z" fill="#3977D5" opacity="0.07" />
                <path d="M0 64 L48 60 L96 55 L144 54 L192 47 L240 42" fill="none" stroke="#36B8A5" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="240" cy="30" r="3" fill="#3977D5" />
                <circle cx="240" cy="42" r="3" fill="#36B8A5" />
              </svg>
              <div className="flex justify-between text-[8.5px] text-lp-muted">
                <span>Sem. 37</span>
                <span>Sem. 39</span>
                <span>Sem. 41</span>
                <span>Sem. 43</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
