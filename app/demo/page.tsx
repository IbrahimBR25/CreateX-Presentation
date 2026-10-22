"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { SpaceSwitcher } from "@/components/SpaceSwitcher";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  UserCheck,
  Clock,
  Wallet,
  Bell,
  Calendar,
  BookOpen,
  MessageSquare,
  User,
  Settings,
  Search,
  TrendingUp,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Award,
  Eye,
  Check,
  CheckCircle2,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Video,
  Sparkles,
  Building2,
  Mail,
  Phone,
  Plus,
  ExternalLink,
} from "lucide-react";

// ============================================================================
// DATA DEFINITIONS (FRENCH CONTENT PRESERVED)
// ============================================================================

type NavSection =
  | "dashboard"
  | "teachers"
  | "students"
  | "attendance"
  | "finance"
  | "pedagogy"
  | "notices"
  | "calendar"
  | "messages"
  | "meeting";

interface StudentRecord {
  id: string;
  studentId: string;
  name: string;
  email: string;
  classe: string;
  dob: string;
  phone: string;
  address: string;
  tuitionStatus: "Payé" | "En retard" | "En attente";
  tuitionAmount: string;
  avatarBg: string;
  initials: string;
}

interface TeacherRecord {
  id: string;
  teacherId: string;
  name: string;
  email: string;
  subject: string;
  classes: string;
  hoursTracked: number;
  hourlyRate: number;
  calculatedSalary: string;
  presenceRate: number;
  status: "Présent" | "Cours en ligne" | "En réunion";
  avatarBg: string;
  initials: string;
}

const STUDENTS_DATA: StudentRecord[] = [
  {
    id: "st-1",
    studentId: "2026-01-001",
    name: "Sarah Miller",
    email: "smiller@createx.edu",
    classe: "10A",
    dob: "18/04/2010",
    phone: "(555) 101-0101",
    address: "101 Av. des Jasmins, Tunis",
    tuitionStatus: "Payé",
    tuitionAmount: "1 450 DT",
    avatarBg: "#FFE681",
    initials: "SM",
  },
  {
    id: "st-2",
    studentId: "2026-02-002",
    name: "Ethan Brown",
    email: "ebrown@createx.edu",
    classe: "12B",
    dob: "22/07/2008",
    phone: "(555) 101-0102",
    address: "202 Rue du Lac, Les Berges",
    tuitionStatus: "Payé",
    tuitionAmount: "1 600 DT",
    avatarBg: "#BDEAF8",
    initials: "EB",
  },
  {
    id: "st-3",
    studentId: "2026-03-003",
    name: "Olivia Mansouri",
    email: "omansouri@createx.edu",
    classe: "9B",
    dob: "29/09/2011",
    phone: "(555) 101-0103",
    address: "303 Bd. Carthage, La Marsa",
    tuitionStatus: "En retard",
    tuitionAmount: "1 350 DT",
    avatarBg: "#D0CBFF",
    initials: "OM",
  },
  {
    id: "st-4",
    studentId: "2026-01-004",
    name: "Lucas Johnson",
    email: "ljohnson@createx.edu",
    classe: "11A",
    dob: "03/11/2009",
    phone: "(555) 101-0104",
    address: "404 Rue des Pins, Ennasr",
    tuitionStatus: "Payé",
    tuitionAmount: "1 450 DT",
    avatarBg: "#BDEAF8",
    initials: "LJ",
  },
  {
    id: "st-5",
    studentId: "2026-02-005",
    name: "Mia Williams",
    email: "mwilliams@createx.edu",
    classe: "8B",
    dob: "19/01/2012",
    phone: "(555) 101-0105",
    address: "505 Av. Bourguiba, Sousse",
    tuitionStatus: "Payé",
    tuitionAmount: "1 250 DT",
    avatarBg: "#FFE681",
    initials: "MW",
  },
  {
    id: "st-6",
    studentId: "2026-03-006",
    name: "Noah Davis",
    email: "ndavis@createx.edu",
    classe: "9C",
    dob: "05/06/2011",
    phone: "(555) 101-0106",
    address: "606 Rue Ibn Khaldoun, Tunis",
    tuitionStatus: "En retard",
    tuitionAmount: "1 350 DT",
    avatarBg: "#D0CBFF",
    initials: "ND",
  },
  {
    id: "st-7",
    studentId: "2026-01-007",
    name: "Emma Wilson",
    email: "ewilson@createx.edu",
    classe: "7C",
    dob: "20/02/2013",
    phone: "(555) 101-0107",
    address: "707 Rue des Orangers, Menzah",
    tuitionStatus: "Payé",
    tuitionAmount: "1 150 DT",
    avatarBg: "#BDEAF8",
    initials: "EW",
  },
  {
    id: "st-8",
    studentId: "2026-02-008",
    name: "Liam Thompson",
    email: "lthompson@createx.edu",
    classe: "10B",
    dob: "08/11/2010",
    phone: "(555) 101-0108",
    address: "808 Av. de la Liberté, Tunis",
    tuitionStatus: "En attente",
    tuitionAmount: "1 450 DT",
    avatarBg: "#FFE681",
    initials: "LT",
  },
];

const TEACHERS_DATA: TeacherRecord[] = [
  {
    id: "tr-1",
    teacherId: "ENS-2026-01",
    name: "Mme Jackson",
    email: "jackson@createx.edu",
    subject: "Mathématiques",
    classes: "10A, 11A, 12B",
    hoursTracked: 42,
    hourlyRate: 45,
    calculatedSalary: "1 890 DT",
    presenceRate: 98,
    status: "Présent",
    avatarBg: "#D0CBFF",
    initials: "MJ",
  },
  {
    id: "tr-2",
    teacherId: "ENS-2026-02",
    name: "M. Rodriguez",
    email: "rodriguez@createx.edu",
    subject: "Français & Théâtre",
    classes: "8B, 9B, 9C",
    hoursTracked: 38,
    hourlyRate: 42,
    calculatedSalary: "1 596 DT",
    presenceRate: 96,
    status: "Présent",
    avatarBg: "#BDEAF8",
    initials: "MR",
  },
  {
    id: "tr-3",
    teacherId: "ENS-2026-03",
    name: "Dr. Lila Ramirez",
    email: "ramirez@createx.edu",
    subject: "Sciences & SVT",
    classes: "10A, 10B, 12B",
    hoursTracked: 40,
    hourlyRate: 48,
    calculatedSalary: "1 920 DT",
    presenceRate: 100,
    status: "Cours en ligne",
    avatarBg: "#FFE681",
    initials: "LR",
  },
  {
    id: "tr-4",
    teacherId: "ENS-2026-04",
    name: "Mme Heather Morris",
    email: "morris@createx.edu",
    subject: "Anglais & Langues",
    classes: "7C, 8B, 9B",
    hoursTracked: 36,
    hourlyRate: 40,
    calculatedSalary: "1 440 DT",
    presenceRate: 95,
    status: "Présent",
    avatarBg: "#D0CBFF",
    initials: "HM",
  },
  {
    id: "tr-5",
    teacherId: "ENS-2026-05",
    name: "M. Karim Abid",
    email: "kabid@createx.edu",
    subject: "Physique & Robotique",
    classes: "11A, 12B, Club",
    hoursTracked: 44,
    hourlyRate: 45,
    calculatedSalary: "1 980 DT",
    presenceRate: 97,
    status: "Présent",
    avatarBg: "#BDEAF8",
    initials: "KA",
  },
];

const ATTENDANCE_WEEKLY = {
  all: [
    { day: "Lun", present: 72, teachers: 66 },
    { day: "Mar", present: 82, teachers: 75 },
    { day: "Mer", present: 95, teachers: 88, highlight: true },
    { day: "Jeu", present: 79, teachers: 84 },
    { day: "Ven", present: 76, teachers: 70 },
  ],
  grade10: [
    { day: "Lun", present: 88, teachers: 80 },
    { day: "Mar", present: 91, teachers: 84 },
    { day: "Mer", present: 97, teachers: 90, highlight: true },
    { day: "Jeu", present: 89, teachers: 86 },
    { day: "Ven", present: 85, teachers: 82 },
  ],
  college: [
    { day: "Lun", present: 76, teachers: 70 },
    { day: "Mar", present: 84, teachers: 76 },
    { day: "Mer", present: 93, teachers: 82, highlight: true },
    { day: "Jeu", present: 81, teachers: 79 },
    { day: "Ven", present: 78, teachers: 72 },
  ],
};

const NOTICE_BOARD_ITEMS = [
  {
    id: "nb-1",
    title: "Olympiades de Mathématiques",
    date: "18/04/2026",
    author: "Par Mme Jackson",
    role: "(Prof. Math)",
    views: "325",
    category: "Académique",
    badgeBg: "#BDEAF8",
    description:
      "Inscriptions ouvertes pour le concours inter-écoles de mathématiques. Séances de préparation chaque mercredi.",
  },
  {
    id: "nb-2",
    title: "Photos de l'Annuaire Scolaire",
    date: "15/04/2026",
    author: "Par le Comité",
    role: "(Vie Scolaire)",
    views: "587",
    category: "Événement",
    badgeBg: "#FFE681",
    description:
      "Merci d'envoyer les photos de classe et des clubs avant la fin de la semaine via l'espace partagé.",
  },
  {
    id: "nb-3",
    title: "Auditions de la Pièce de Théâtre",
    date: "12/04/2026",
    author: "Par M. Rodriguez",
    role: "(Club Théâtre)",
    views: "1.2K",
    category: "Clubs",
    badgeBg: "#D0CBFF",
    description:
      "Les auditions pour le spectacle annuel auront lieu ce jeudi à l'auditorium principal à 15h30.",
  },
  {
    id: "nb-4",
    title: "Sortie Scolaire du 15 Avril — Confirmation",
    date: "10/04/2026",
    author: "Par l'Administration",
    role: "(Direction)",
    views: "992",
    category: "Parents",
    badgeBg: "#BDEAF8",
    description:
      "Rappel envoyé aux parents : merci de confirmer la présence de votre enfant pour la sortie pédagogique.",
  },
  {
    id: "nb-5",
    title: "Mise à jour du Règlement & Uniforme",
    date: "06/04/2026",
    author: "Par la Directrice",
    role: "(Linda Adora)",
    views: "192",
    category: "Administration",
    badgeBg: "#FFE681",
    description:
      "Consultez la note officielle concernant les tenues de sport et le calendrier des examens trimestriels.",
  },
];

const PARENT_MESSAGES = [
  {
    id: "msg-1",
    sender: "Dr. Lila Ramirez",
    time: "09:00",
    preview:
      "Veuillez vérifier que le rapport mensuel d'assiduité est validé avant l'échéance du 30 avril.",
    unread: 4,
    avatarBg: "#BDEAF8",
    initials: "LR",
  },
  {
    id: "msg-2",
    sender: "Mme Heather Morris",
    time: "10:15",
    preview:
      "N'oubliez pas la formation de l'équipe sur les outils numériques prévue le 5 mai à 15h00.",
    unread: 2,
    avatarBg: "#FFE681",
    initials: "HM",
  },
  {
    id: "msg-3",
    sender: "M. Carl Jenkins (Parent)",
    time: "14:00",
    preview:
      "Suite au rappel reçu, le virement des frais de scolarité du trimestre a bien été effectué.",
    unread: 0,
    avatarBg: "#D0CBFF",
    initials: "CJ",
  },
  {
    id: "msg-4",
    sender: "Mme Amira Mansouri (Parent)",
    time: "15:10",
    preview:
      "Présence confirmée pour la sortie scolaire du 15 avril via le portail parents.",
    unread: 1,
    avatarBg: "#BDEAF8",
    initials: "AM",
  },
  {
    id: "msg-5",
    sender: "Mme Tina Goldberg",
    time: "16:45",
    preview:
      "Mise à jour des supports de cours et des quiz en ligne prévue ce vendredi après-midi.",
    unread: 2,
    avatarBg: "#FFE681",
    initials: "TG",
  },
];

const AGENDA_ITEMS = [
  {
    time: "08:00",
    grade: "Tous les niveaux",
    title: "Appel Numérique & Annonces",
    bg: "#F2F0FF",
    border: "#D0CBFF",
  },
  {
    time: "10:00",
    grade: "Niveaux 3e–5e",
    title: "Révision Mathématiques & Exercices",
    bg: "#FFF8DB",
    border: "#FFE681",
  },
  {
    time: "10:30",
    grade: "Niveaux 6e–8e",
    title: "Expérience Sciences & Discussion",
    bg: "#DFF4FC",
    border: "#BDEAF8",
  },
  {
    time: "14:30",
    grade: "En ligne / Tutorat",
    title: "Séance de Soutien & Réunion Parents",
    bg: "#F8FAFC",
    border: "#E7EBF2",
  },
];

export default function SchoolHubPastelDashboard() {
  // Navigation & Sidebar State
  const [activeNav, setActiveNav] = useState<NavSection>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Filters & Interactive State
  const [globalSearch, setGlobalSearch] = useState<string>("");
  const [attendanceFilter, setAttendanceFilter] = useState<"all" | "grade10" | "college">("all");
  const [selectedDay, setSelectedDay] = useState<number>(22);
  const [directoryTab, setDirectoryTab] = useState<"students" | "teachers">("students");
  const [statusFilter, setStatusFilter] = useState<"Tous" | "Payé" | "En retard">("Tous");
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>(["st-2"]);
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(8);

  // Parent Notification Confirmation State
  const [tripConfirmed, setTripConfirmed] = useState<boolean>(false);

  // Meeting Form State
  const [schoolName, setSchoolName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [meetingFormat, setMeetingFormat] = useState<string>("Démo en présentiel");
  const [meetingSubmitted, setMeetingSubmitted] = useState<boolean>(false);

  const filteredStudents = useMemo(() => {
    return STUDENTS_DATA.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
        student.studentId.toLowerCase().includes(globalSearch.toLowerCase()) ||
        student.classe.toLowerCase().includes(globalSearch.toLowerCase()) ||
        student.address.toLowerCase().includes(globalSearch.toLowerCase());
      const matchesStatus =
        statusFilter === "Tous" || student.tuitionStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [globalSearch, statusFilter]);

  const filteredTeachers = useMemo(() => {
    return TEACHERS_DATA.filter(
      (t) =>
        t.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
        t.subject.toLowerCase().includes(globalSearch.toLowerCase()) ||
        t.classes.toLowerCase().includes(globalSearch.toLowerCase())
    );
  }, [globalSearch]);

  const filteredNotices = useMemo(() => {
    return NOTICE_BOARD_ITEMS.filter(
      (n) =>
        n.title.toLowerCase().includes(globalSearch.toLowerCase()) ||
        n.author.toLowerCase().includes(globalSearch.toLowerCase()) ||
        n.category.toLowerCase().includes(globalSearch.toLowerCase())
    );
  }, [globalSearch]);

  const toggleStudentSelection = (id: string) => {
    setSelectedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNavClick = (section: NavSection, anchorId?: string) => {
    setActiveNav(section);
    setMobileSidebarOpen(false);
    if (anchorId) {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolName.trim() || !contactEmail.trim() || !contactPhone.trim()) {
      toast.error("Veuillez remplir tous les champs pour planifier la réunion.");
      return;
    }
    setMeetingSubmitted(true);
    toast.success("Demande de réunion enregistrée !", {
      description: `Confirmation envoyée à ${contactEmail} (${meetingFormat}).`,
    });
  };

  const currentBars = ATTENDANCE_WEEKLY[attendanceFilter];

  const NAV_ITEMS: {
    id: NavSection;
    label: string;
    icon: React.ElementType;
    anchor: string;
    badge?: string;
  }[] = [
    { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard, anchor: "sec-overview" },
    { id: "teachers", label: "Enseignants", icon: UserCheck, anchor: "sec-directory" },
    { id: "students", label: "Élèves", icon: Users, anchor: "sec-directory", badge: "1 248" },
    { id: "attendance", label: "Présences", icon: Clock, anchor: "sec-attendance" },
    { id: "finance", label: "Finances", icon: Wallet, anchor: "sec-finance" },
    { id: "notices", label: "Annonces", icon: Bell, anchor: "sec-notices" },
    { id: "calendar", label: "Calendrier", icon: Calendar, anchor: "sec-calendar" },
    { id: "pedagogy", label: "Bibliothèque & Cours", icon: BookOpen, anchor: "sec-pedagogy" },
    { id: "messages", label: "Messages", icon: MessageSquare, anchor: "sec-messages", badge: "4" },
  ];

  return (
    <div
      style={{ backgroundColor: "#F4F6FA", color: "#303747" }}
      className="sh-page min-h-screen flex flex-col lg:flex-row font-sans"
    >
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-[#303747]/15 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* =====================================================================
          SIDEBAR (White #FFFFFF surface, subtle right border #E7EBF2,
          active item with pale blue #DFF4FC background & #35B8D5 cyan-blue icon)
      ===================================================================== */}
      <aside
        style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between border-r border-[#E7EBF2] bg-white transition-all duration-300 lg:sticky lg:top-0 lg:h-screen ${
          sidebarCollapsed ? "lg:w-20" : "lg:w-60"
        } ${
          mobileSidebarOpen
            ? "translate-x-0 w-60 shadow-lg"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto px-3.5 py-5">
          {/* Brand Logo */}
          <div className="flex items-center justify-between px-2 mb-6">
            <button
              type="button"
              onClick={() => handleNavClick("dashboard", "sec-overview")}
              className="flex items-center gap-2.5 text-left"
            >
              <div
                style={{ backgroundColor: "#DFF4FC", color: "#35B8D5" }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
              >
                <GraduationCap className="h-5 w-5" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <span className="block text-[15px] font-bold tracking-tight text-[#303747] leading-none">
                    CreateX
                  </span>
                  <span className="mt-0.5 block text-[11px] font-medium text-[#8A93A3]">
                    Gestion Scolaire
                  </span>
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? "Déplier le menu" : "Réduire le menu"}
              className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg border border-[#E7EBF2] text-[#8A93A3] hover:bg-[#F8FAFC] hover:text-[#303747]"
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="h-3.5 w-3.5" />
              ) : (
                <PanelLeftClose className="h-3.5 w-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden rounded-lg p-1 text-[#8A93A3] hover:bg-[#F8FAFC]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* MENU Group */}
          <div className="mb-5">
            {!sidebarCollapsed && (
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#8A93A3]">
                MENU
              </p>
            )}
            <nav aria-label="Menu principal" className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (item.id === "teachers") setDirectoryTab("teachers");
                      if (item.id === "students") setDirectoryTab("students");
                      handleNavClick(item.id, item.anchor);
                    }}
                    title={item.label}
                    style={
                      isActive
                        ? { backgroundColor: "#DFF4FC", color: "#303747" }
                        : undefined
                    }
                    className={`group flex w-full items-center justify-between rounded-[10px] px-3 py-2.5 text-[13px] font-medium transition-colors ${
                      isActive
                        ? "sh-nav-active font-semibold text-[#303747]"
                        : "text-[#5A6275] hover:bg-[#F8FAFC] hover:text-[#303747]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        style={{ color: isActive ? "#35B8D5" : "#8A93A3" }}
                        className="h-[17px] w-[17px] shrink-0"
                      />
                      {!sidebarCollapsed && <span>{item.label}</span>}
                    </span>
                    {!sidebarCollapsed && item.badge && (
                      <span
                        style={{
                          backgroundColor: isActive ? "#FFFFFF" : "#F2F0FF",
                          color: "#303747",
                        }}
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ESPACES MÉTIERS Group (Links to secondary pages) */}
          {!sidebarCollapsed && (
            <div className="mb-5">
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#8A93A3]">
                PORTAILS DÉDIÉS
              </p>
              <div className="space-y-1">
                <Link
                  href="/admin"
                  className="flex items-center justify-between rounded-[10px] px-3 py-2 text-[12px] font-medium text-[#5A6275] hover:bg-[#F8FAFC] hover:text-[#303747]"
                >
                  <span>Portail Direction</span>
                  <ExternalLink className="h-3 w-3 text-[#8A93A3]" />
                </Link>
                <Link
                  href="/teacher"
                  className="flex items-center justify-between rounded-[10px] px-3 py-2 text-[12px] font-medium text-[#5A6275] hover:bg-[#F8FAFC] hover:text-[#303747]"
                >
                  <span>Espace Enseignant</span>
                  <ExternalLink className="h-3 w-3 text-[#8A93A3]" />
                </Link>
                <Link
                  href="/student"
                  className="flex items-center justify-between rounded-[10px] px-3 py-2 text-[12px] font-medium text-[#5A6275] hover:bg-[#F8FAFC] hover:text-[#303747]"
                >
                  <span>Espace Élève</span>
                  <ExternalLink className="h-3 w-3 text-[#8A93A3]" />
                </Link>
                <Link
                  href="/parent"
                  className="flex items-center justify-between rounded-[10px] px-3 py-2 text-[12px] font-medium text-[#5A6275] hover:bg-[#F8FAFC] hover:text-[#303747]"
                >
                  <span>Portail Parent</span>
                  <ExternalLink className="h-3 w-3 text-[#8A93A3]" />
                </Link>
              </div>
            </div>
          )}

          {/* OTHER Group */}
          <div>
            {!sidebarCollapsed && (
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#8A93A3]">
                AUTRE
              </p>
            )}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => handleNavClick("meeting", "sec-meeting")}
                style={
                  activeNav === "meeting"
                    ? { backgroundColor: "#DFF4FC", color: "#303747" }
                    : undefined
                }
                className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-[13px] font-medium transition-colors ${
                  activeNav === "meeting"
                    ? "font-semibold text-[#303747]"
                    : "text-[#5A6275] hover:bg-[#F8FAFC] hover:text-[#303747]"
                }`}
              >
                <Sparkles
                  style={{ color: activeNav === "meeting" ? "#35B8D5" : "#8A93A3" }}
                  className="h-[17px] w-[17px] shrink-0"
                />
                {!sidebarCollapsed && <span>Planifier une réunion</span>}
              </button>
              <button
                type="button"
                onClick={() =>
                  toast.info("Profil : Linda Adora — Directrice d'établissement")
                }
                className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-[13px] font-medium text-[#5A6275] hover:bg-[#F8FAFC] hover:text-[#303747]"
              >
                <User className="h-[17px] w-[17px] shrink-0 text-[#8A93A3]" />
                {!sidebarCollapsed && <span>Profil</span>}
              </button>
              <button
                type="button"
                onClick={() =>
                  toast.info("Paramètres de l'établissement : Année scolaire 2026-2027")
                }
                className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-[13px] font-medium text-[#5A6275] hover:bg-[#F8FAFC] hover:text-[#303747]"
              >
                <Settings className="h-[17px] w-[17px] shrink-0 text-[#8A93A3]" />
                {!sidebarCollapsed && <span>Paramètres</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Soft Pastel Card inside Sidebar */}
        {!sidebarCollapsed && (
          <div className="p-3.5">
            <div
              style={{ backgroundColor: "#DFF4FC", borderColor: "#BDEAF8" }}
              className="rounded-2xl border p-4"
            >
              <p className="text-xs font-semibold leading-snug text-[#303747]">
                Gérez les données de votre école simplement
              </p>
              <p className="mt-1 text-[11px] text-[#5A6275]">
                Plateforme tout-en-un web &amp; mobile
              </p>
              <button
                type="button"
                onClick={() => handleNavClick("meeting", "sec-meeting")}
                style={{ backgroundColor: "#FFFFFF", color: "#303747", borderColor: "#E7EBF2" }}
                className="mt-3 w-full rounded-[10px] border py-1.5 text-center text-[11px] font-semibold shadow-2xs transition hover:bg-[#F8FAFC]"
              >
                Planifier une démo
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* =====================================================================
          MAIN WORKSPACE (Top Navigation + Dashboard Grid)
      ===================================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP NAVIGATION BAR (White #FFFFFF, light border #E7EBF2) */}
        <header
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
          className="sticky top-0 z-30 border-b px-4 py-3 sm:px-6"
        >
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile toggle + Rounded Search */}
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="Ouvrir le menu"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
                className="inline-flex lg:hidden h-9 w-9 items-center justify-center rounded-[10px] border text-[#303747]"
              >
                <Menu className="h-4 w-4" />
              </button>

              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A93A3]" />
                <input
                  type="text"
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  placeholder="Rechercher un élève, un enseignant, une classe..."
                  style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2", color: "#303747" }}
                  className="w-full rounded-[10px] border py-2 pl-9 pr-4 text-[13px] placeholder:text-[#8A93A3] transition focus:border-[#35B8D5] focus:bg-white focus:outline-none"
                />
                {globalSearch && (
                  <button
                    type="button"
                    onClick={() => setGlobalSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-[#8A93A3] hover:text-[#303747]"
                  >
                    Effacer
                  </button>
                )}
              </div>
            </div>

            {/* Center: Spaces Switcher + Section Navigation Pills */}
            <div className="hidden lg:flex items-center gap-3">
              <SpaceSwitcher current="home" />

              <div
                style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2" }}
                className="hidden 2xl:flex items-center gap-1 rounded-[10px] border p-1"
              >
                {[
                  { label: "Vue Globale", section: "dashboard" as NavSection, anchor: "sec-overview" },
                  { label: "Administration", section: "attendance" as NavSection, anchor: "sec-attendance" },
                  { label: "Pédagogie", section: "pedagogy" as NavSection, anchor: "sec-pedagogy" },
                  { label: "Finances", section: "finance" as NavSection, anchor: "sec-finance" },
                  { label: "Parents", section: "messages" as NavSection, anchor: "sec-messages" },
                ].map((pill) => {
                  const active = activeNav === pill.section;
                  return (
                    <button
                      key={pill.label}
                      type="button"
                      onClick={() => handleNavClick(pill.section, pill.anchor)}
                      style={
                        active
                          ? { backgroundColor: "#DFF4FC", color: "#303747" }
                          : undefined
                      }
                      className={`rounded-[8px] px-3 py-1 text-[12px] font-medium transition ${
                        active
                          ? "font-semibold text-[#303747]"
                          : "text-[#8A93A3] hover:text-[#303747]"
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Meeting Action, Notifications & Current User */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleNavClick("meeting", "sec-meeting")}
                style={{ backgroundColor: "#DFF4FC", borderColor: "#BDEAF8", color: "#303747" }}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-[10px] border px-3.5 py-2 text-[12px] font-semibold transition hover:bg-[#BDEAF8]/60"
              >
                <Calendar className="h-3.5 w-3.5 text-[#35B8D5]" />
                <span>Planifier une réunion</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick("messages", "sec-messages")}
                title="Messages"
                style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2" }}
                className="relative flex h-9 w-9 items-center justify-center rounded-[10px] border text-[#303747] transition hover:bg-[#DFF4FC]"
              >
                <MessageSquare className="h-4 w-4 text-[#5A6275]" />
                <span
                  style={{ backgroundColor: "#DFF4FC", color: "#35B8D5" }}
                  className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold border border-[#BDEAF8]"
                >
                  4
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  toast.info("Notification : Rappel de sortie scolaire du 15 avril envoyé.")
                }
                title="Notifications"
                style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2" }}
                className="relative flex h-9 w-9 items-center justify-center rounded-[10px] border text-[#303747] transition hover:bg-[#DFF4FC]"
              >
                <Bell className="h-4 w-4 text-[#5A6275]" />
                <span
                  style={{ backgroundColor: "#35B8D5" }}
                  className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full"
                />
              </button>

              <div className="flex items-center gap-2.5 pl-2.5 border-l border-[#E7EBF2]">
                <div className="hidden md:block text-right">
                  <p className="text-[13px] font-semibold text-[#303747] leading-none">
                    Linda Adora
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#8A93A3]">Admin • Directrice</p>
                </div>
                <div
                  style={{ backgroundColor: "#D0CBFF", color: "#303747" }}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold"
                >
                  LA
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ===================================================================
            MAIN CONTENT CONTAINER
        =================================================================== */}
        <main className="flex-1 p-4 sm:p-6 space-y-6 max-w-[1560px] w-full mx-auto">
          {/* =================================================================
              WELCOME & INTRODUCTION PANEL
              (Bright white panel with subtle pastel lavender/blue accents)
          ================================================================= */}
          <section
            id="sec-overview"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
            className="sh-card p-5 sm:p-6"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-1.5 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#F2F0FF] px-3 py-1 text-[11px] font-semibold text-[#303747]">
                  <span
                    style={{ backgroundColor: "#D0CBFF" }}
                    className="h-2 w-2 rounded-full"
                  />
                  <span>Plateforme Tout-en-Un pour Écoles Privées</span>
                </div>
                <h1 className="text-[24px] sm:text-[28px] font-semibold tracking-tight text-[#303747] leading-snug">
                  Bienvenue sur CreateX — La gestion scolaire, réinventée
                </h1>
                <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#8A93A3]">
                  Centralisez l&apos;administration, le suivi pédagogique, les transactions
                  financières avec calcul automatique de la paie et la communication avec les
                  parents au sein d&apos;un espace unique et apaisé.
                </p>
              </div>

              {/* Three compact benefits with small pastel icons */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <div
                  style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2" }}
                  className="flex items-center gap-2.5 rounded-[12px] border px-3.5 py-2.5"
                >
                  <span
                    style={{ backgroundColor: "#D0CBFF", color: "#303746" }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[12px] font-semibold text-[#303747]">
                    Communication fluide
                  </span>
                </div>

                <div
                  style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2" }}
                  className="flex items-center gap-2.5 rounded-[12px] border px-3.5 py-2.5"
                >
                  <span
                    style={{ backgroundColor: "#BDEAF8", color: "#303747" }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[12px] font-semibold text-[#303747]">
                    Organisation optimisée
                  </span>
                </div>

                <div
                  style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2" }}
                  className="flex items-center gap-2.5 rounded-[12px] border px-3.5 py-2.5"
                >
                  <span
                    style={{ backgroundColor: "#FFE681", color: "#303747" }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg"
                  >
                    <Clock className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[12px] font-semibold text-[#303747]">
                    Gain de temps
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              MAIN 12-COLUMN DASHBOARD LAYOUT (Matching SchoolHub Reference)
              Left 8 cols: KPIs, Charts, Finance, Activity & Notice Board
              Right 4 cols: Calendar, Agenda, Messages & Parent Notification
          ================================================================= */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 items-start">
            {/* ===============================================================
                LEFT 8 COLUMNS
            =============================================================== */}
            <div className="xl:col-span-8 space-y-6">
              {/* FOUR COMPACT, EVENLY SIZED KPI STATISTIC CARDS */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {/* KPI 1: Élèves inscrits (Pastel Lavender #D0CBFF) */}
                <div
                  style={{ backgroundColor: "#D0CBFF", color: "#303747" }}
                  className="sh-kpi-lavender p-4 sm:p-5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{ backgroundColor: "#FFFFFF", color: "#1E7E5A" }}
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    >
                      <TrendingUp className="h-3 w-3" /> 15%
                    </span>
                    <MoreHorizontal className="h-4 w-4 text-[#303747]/60" />
                  </div>
                  <p className="mt-3.5 text-[26px] sm:text-[28px] font-semibold text-[#303747] tabular-nums leading-none">
                    1 248
                  </p>
                  <p className="mt-1.5 text-[12px] font-medium text-[#303747]/80">
                    Élèves inscrits
                  </p>
                </div>

                {/* KPI 2: Enseignants (Pastel Yellow #FFE681) */}
                <div
                  style={{ backgroundColor: "#FFE681", color: "#303747" }}
                  className="sh-kpi-yellow p-4 sm:p-5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{ backgroundColor: "#FFFFFF", color: "#9A6712" }}
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    >
                      <TrendingUp className="h-3 w-3" /> 3%
                    </span>
                    <MoreHorizontal className="h-4 w-4 text-[#303747]/60" />
                  </div>
                  <p className="mt-3.5 text-[26px] sm:text-[28px] font-semibold text-[#303747] tabular-nums leading-none">
                    84
                  </p>
                  <p className="mt-1.5 text-[12px] font-medium text-[#303747]/80">
                    Enseignants
                  </p>
                </div>

                {/* KPI 3: Personnel & Clubs (Pastel Lavender #D0CBFF) */}
                <div
                  style={{ backgroundColor: "#D0CBFF", color: "#303747" }}
                  className="sh-kpi-lavender p-4 sm:p-5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{ backgroundColor: "#FFFFFF", color: "#303747" }}
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    >
                      <TrendingUp className="h-3 w-3 text-[#35B8D5]" /> 3%
                    </span>
                    <MoreHorizontal className="h-4 w-4 text-[#303747]/60" />
                  </div>
                  <p className="mt-3.5 text-[26px] sm:text-[28px] font-semibold text-[#303747] tabular-nums leading-none">
                    32
                  </p>
                  <p className="mt-1.5 text-[12px] font-medium text-[#303747]/80">
                    Personnel &amp; Clubs
                  </p>
                </div>

                {/* KPI 4: Taux de réussite (Pastel Yellow #FFE681) */}
                <div
                  style={{ backgroundColor: "#FFE681", color: "#303747" }}
                  className="sh-kpi-yellow p-4 sm:p-5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{ backgroundColor: "#FFFFFF", color: "#1E7E5A" }}
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    >
                      <TrendingUp className="h-3 w-3" /> 5%
                    </span>
                    <MoreHorizontal className="h-4 w-4 text-[#303747]/60" />
                  </div>
                  <p className="mt-3.5 text-[26px] sm:text-[28px] font-semibold text-[#303747] tabular-nums leading-none">
                    95,8%
                  </p>
                  <p className="mt-1.5 text-[12px] font-medium text-[#303747]/80">
                    Taux de réussite
                  </p>
                </div>
              </div>

              {/* STUDENT ATTENDANCE VISUALIZATION + WEEKLY ATTENDANCE ANALYTICS */}
              <div id="sec-attendance" className="grid grid-cols-1 gap-6 md:grid-cols-12">
                {/* Student Circular Progress Chart Card (5 cols) */}
                <div
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
                  className="md:col-span-5 sh-card p-5 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-[16px] font-semibold text-[#303747]">Élèves</h2>
                    <MoreHorizontal className="h-4 w-4 text-[#8A93A3]" />
                  </div>

                  {/* Clean Circular Progress Chart with Pastel Blue (#BDEAF8) & Yellow (#FFE681) Rings */}
                  <div className="relative mx-auto my-4 flex h-44 w-44 items-center justify-center">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="46"
                        fill="none"
                        stroke="#F4F6FA"
                        strokeWidth="10"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="46"
                        fill="none"
                        stroke="#BDEAF8"
                        strokeWidth="10"
                        strokeDasharray="289"
                        strokeDashoffset="42"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="32"
                        fill="none"
                        stroke="#F4F6FA"
                        strokeWidth="10"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="32"
                        fill="none"
                        stroke="#FFE681"
                        strokeWidth="10"
                        strokeDasharray="201"
                        strokeDashoffset="35"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[22px] font-semibold text-[#303747] tabular-nums leading-none">
                        92%
                      </span>
                      <span className="mt-1 text-[11px] font-medium text-[#8A93A3]">
                        Présence jour
                      </span>
                    </div>
                  </div>

                  {/* Student breakdowns beneath a subtle divider */}
                  <div className="grid grid-cols-2 gap-4 border-t border-[#E7EBF2] pt-3.5 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1.5">
                        <span
                          style={{ backgroundColor: "#BDEAF8" }}
                          className="h-2.5 w-2.5 rounded-full"
                        />
                        <span className="text-[14px] font-semibold text-[#303747] tabular-nums">
                          586
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-[#8A93A3]">Garçons (47%)</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1.5">
                        <span
                          style={{ backgroundColor: "#FFE681" }}
                          className="h-2.5 w-2.5 rounded-full"
                        />
                        <span className="text-[14px] font-semibold text-[#303747] tabular-nums">
                          662
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-[#8A93A3]">Filles (53%)</p>
                    </div>
                  </div>
                </div>

                {/* Attendance Analytics Bar Chart Card (7 cols) */}
                <div
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
                  className="md:col-span-7 sh-card p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="text-[16px] font-semibold text-[#303747]">Présences</h2>
                      <div className="flex items-center gap-2">
                        <span
                          style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2" }}
                          className="inline-flex items-center gap-1 rounded-[8px] border px-2.5 py-1 text-[11px] font-medium text-[#8A93A3]"
                        >
                          Hebdomadaire <ChevronDown className="h-3 w-3" />
                        </span>
                        <select
                          aria-label="Filtrer par niveau"
                          value={attendanceFilter}
                          onChange={(e) =>
                            setAttendanceFilter(
                              e.target.value as "all" | "grade10" | "college"
                            )
                          }
                          style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2", color: "#303747" }}
                          className="rounded-[8px] border px-2.5 py-1 text-[11px] font-medium focus:border-[#35B8D5] focus:outline-none"
                        >
                          <option value="all">Tous niveaux</option>
                          <option value="grade10">Lycée (10e-12e)</option>
                          <option value="college">Collège (7e-9e)</option>
                        </select>
                      </div>
                    </div>

                    {/* Simple Legend */}
                    <div className="mt-2.5 flex items-center gap-5 text-[12px] text-[#8A93A3]">
                      <span className="flex items-center gap-1.5">
                        <span
                          style={{ backgroundColor: "#FFE681" }}
                          className="h-2.5 w-2.5 rounded-full"
                        />
                        Total Présents
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span
                          style={{ backgroundColor: "#BDEAF8" }}
                          className="h-2.5 w-2.5 rounded-full"
                        />
                        Enseignants Présents
                      </span>
                    </div>
                  </div>

                  {/* Paired Pastel Yellow & Pastel Blue Bars with Very Light Gridlines */}
                  <div className="mt-5 flex h-44 items-end justify-between gap-3 border-b border-[#E7EBF2] pb-3 px-2 sm:px-6 relative">
                    <div className="pointer-events-none absolute inset-x-0 inset-y-0 flex flex-col justify-between text-[10px] text-[#8A93A3] pr-2">
                      <div className="border-b border-[#E7EBF2]/70 pb-0.5">100</div>
                      <div className="border-b border-[#E7EBF2]/70 pb-0.5">75</div>
                      <div className="border-b border-[#E7EBF2]/70 pb-0.5">50</div>
                      <div className="border-b border-[#E7EBF2]/70 pb-0.5">25</div>
                      <div>0</div>
                    </div>

                    {currentBars.map((bar) => (
                      <div
                        key={bar.day}
                        className="relative z-10 flex flex-1 flex-col items-center justify-end h-full pl-6"
                      >
                        {bar.highlight && (
                          <div
                            style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
                            className="mb-1.5 rounded-[8px] border px-2 py-0.5 text-center shadow-2xs"
                          >
                            <span className="block text-[11px] font-semibold text-[#303747]">
                              {bar.present}%
                            </span>
                            <span className="block text-[9px] text-[#8A93A3]">Présent</span>
                          </div>
                        )}
                        <div className="flex items-end justify-center gap-1.5 h-full w-full">
                          <div
                            style={{
                              height: `${bar.present}%`,
                              backgroundColor: "#FFE681",
                            }}
                            className="w-3 sm:w-3.5 rounded-t-full transition-all duration-500"
                          />
                          <div
                            style={{
                              height: `${bar.teachers}%`,
                              backgroundColor: "#BDEAF8",
                            }}
                            className="w-3 sm:w-3.5 rounded-t-full transition-all duration-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Muted Axis Labels */}
                  <div className="mt-2 flex justify-between pl-6 px-2 sm:px-6 text-[11px] font-medium text-[#8A93A3]">
                    {currentBars.map((bar) => (
                      <span key={bar.day} className="flex-1 text-center">
                        {bar.day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* FINANCE AND PAYROLL ANALYTICS */}
              <div id="sec-finance" className="grid grid-cols-1 gap-6 md:grid-cols-12">
                {/* Financial Analytics Card (8 cols) */}
                <div
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
                  className="md:col-span-8 sh-card p-5 flex flex-col justify-between"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="text-[16px] font-semibold text-[#303747]">
                        Finances &amp; Paie Enseignants
                      </h2>
                      <p className="text-[12px] text-[#8A93A3]">
                        Frais de scolarité et calcul automatique des salaires selon les heures
                        suivies
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-[12px] text-[#8A93A3]">
                      <span className="flex items-center gap-1.5">
                        <span
                          style={{ backgroundColor: "#BDEAF8" }}
                          className="h-2.5 w-2.5 rounded-full"
                        />
                        Revenus
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span
                          style={{ backgroundColor: "#D0CBFF" }}
                          className="h-2.5 w-2.5 rounded-full"
                        />
                        Dépenses &amp; Paie
                      </span>
                    </div>
                  </div>

                  {/* Light Spline Chart (Pastel Blue #BDEAF8 & Pastel Lavender #D0CBFF) */}
                  <div className="relative mt-4 h-44 w-full">
                    <svg viewBox="0 0 520 140" className="h-full w-full overflow-visible">
                      {[20, 55, 90, 125].map((y) => (
                        <line
                          key={y}
                          x1="38"
                          y1={y}
                          x2="510"
                          y2={y}
                          stroke="#E7EBF2"
                          strokeWidth="1"
                        />
                      ))}
                      <text x="0" y="24" className="fill-[#8A93A3] text-[9px]">
                        1000K
                      </text>
                      <text x="0" y="59" className="fill-[#8A93A3] text-[9px]">
                        750K
                      </text>
                      <text x="0" y="94" className="fill-[#8A93A3] text-[9px]">
                        500K
                      </text>
                      <text x="0" y="128" className="fill-[#8A93A3] text-[9px]">
                        250K
                      </text>

                      {/* Soft Lavender Band on Sep */}
                      <rect
                        x="346"
                        y="15"
                        width="36"
                        height="110"
                        rx="8"
                        fill="#F2F0FF"
                      />

                      {/* Income Line (Pastel Blue / Subtle Cyan) */}
                      <path
                        d="M38,98 C75,55 110,85 150,58 C190,32 230,74 270,42 C310,18 345,28 364,26 C395,24 435,62 475,36 L508,28"
                        fill="none"
                        stroke="#8AD8F0"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Expense Line (Pastel Lavender) */}
                      <path
                        d="M38,112 C75,92 110,104 150,82 C190,64 230,96 270,74 C310,54 345,62 364,58 C395,54 435,84 475,65 L508,52"
                        fill="none"
                        stroke="#C2BBFF"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      <circle
                        cx="364"
                        cy="26"
                        r="4.5"
                        fill="#35B8D5"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                      <circle
                        cx="364"
                        cy="58"
                        r="4.5"
                        fill="#ACA2FF"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                    </svg>

                    {/* Clean White Tooltip */}
                    <div
                      style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
                      className="absolute top-3 left-[55%] sm:left-[60%] rounded-[10px] border px-3 py-2 shadow-xs"
                    >
                      <p className="text-[9px] text-[#8A93A3]">14 Avr 2026</p>
                      <div className="mt-1 space-y-0.5 text-[11px] font-semibold text-[#303747] tabular-nums">
                        <p className="flex items-center gap-1.5">
                          <span
                            style={{ backgroundColor: "#BDEAF8" }}
                            className="h-2 w-2 rounded-full"
                          />
                          825 000 DT
                        </p>
                        <p className="flex items-center gap-1.5">
                          <span
                            style={{ backgroundColor: "#D0CBFF" }}
                            className="h-2 w-2 rounded-full"
                          />
                          500 000 DT
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Months Axis */}
                  <div className="mt-2 grid grid-cols-12 text-center text-[10px] font-medium text-[#8A93A3] pl-6">
                    {[
                      "Jan",
                      "Fév",
                      "Mar",
                      "Avr",
                      "Mai",
                      "Juin",
                      "Juil",
                      "Août",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Déc",
                    ].map((m, idx) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setSelectedMonthIdx(idx)}
                        style={
                          selectedMonthIdx === idx
                            ? { backgroundColor: "#F2F0FF", color: "#303747" }
                            : undefined
                        }
                        className="rounded py-0.5 transition hover:text-[#303747]"
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2 Stacked White Financial Indicator Cards (4 cols) */}
                <div className="md:col-span-4 flex flex-col justify-between gap-4">
                  {/* Top Card: Tracked Payroll Hours */}
                  <div
                    style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
                    className="flex-1 sh-card p-5 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <div
                        style={{ backgroundColor: "#DFF4FC", color: "#35B8D5" }}
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                      >
                        <Clock className="h-5 w-5" />
                      </div>
                      <MoreHorizontal className="h-4 w-4 text-[#8A93A3]" />
                    </div>
                    <div className="my-2">
                      <p className="text-[24px] font-semibold text-[#303747] tabular-nums">
                        1 840 h
                      </p>
                      <p className="text-[12px] text-[#8A93A3]">
                        Heures enseignants (Paie auto)
                      </p>
                    </div>
                    <div>
                      <span className="sh-badge-success inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold">
                        <CheckCircle2 className="h-3 w-3" /> Synchronisé (15%)
                      </span>
                    </div>
                  </div>

                  {/* Bottom Card: Late Payment Alerts */}
                  <div
                    style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
                    className="flex-1 sh-card p-5 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <div
                        style={{ backgroundColor: "#FFF8DB", color: "#9A6712" }}
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                      >
                        <Wallet className="h-5 w-5" />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          toast.success(
                            "Relance automatique envoyée aux 12 familles en retard de paiement."
                          )
                        }
                        style={{ backgroundColor: "#FFF8DB", color: "#9A6712" }}
                        className="rounded-full px-2.5 py-1 text-[10px] font-semibold hover:opacity-90"
                      >
                        Relancer
                      </button>
                    </div>
                    <div className="my-2">
                      <p className="text-[24px] font-semibold text-[#303747] tabular-nums">
                        12 familles
                      </p>
                      <p className="text-[12px] text-[#8A93A3]">
                        Alertes retards de paiement
                      </p>
                    </div>
                    <div>
                      <span className="sh-badge-error inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold">
                        Alerte automatique active
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STUDENT ACTIVITY + ANNOUNCEMENTS (NOTICE BOARD) + RECENT ACTIVITY */}
              <div id="sec-notices" className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Student Activity (3 cols) */}
                <div
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
                  className="lg:col-span-4 sh-card p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[15px] font-semibold text-[#303747]">
                      Activités des Élèves
                    </h3>
                    <span className="text-[11px] font-medium text-[#8A93A3]">Tout voir</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div
                        style={{ backgroundColor: "#DFF4FC", color: "#35B8D5" }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-semibold"
                      >
                        <Award className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#303747]">
                          Champion Régional Robotique
                        </p>
                        <p className="mt-0.5 text-[12px] text-[#8A93A3] leading-snug">
                          Le club robotique remporte le défi d&apos;ingénierie inter-écoles.
                        </p>
                        <span
                          style={{ backgroundColor: "#F8FAFC" }}
                          className="mt-1 inline-block rounded px-2 py-0.5 text-[10px] text-[#8A93A3]"
                        >
                          Il y a 2 jours
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div
                        style={{ backgroundColor: "#F2F0FF", color: "#303747" }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-semibold"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#303747]">
                          Concours Régional de Débat
                        </p>
                        <p className="mt-0.5 text-[12px] text-[#8A93A3] leading-snug">
                          Qualification de l&apos;équipe d&apos;éloquence pour la finale.
                        </p>
                        <span
                          style={{ backgroundColor: "#F8FAFC" }}
                          className="mt-1 inline-block rounded px-2 py-0.5 text-[10px] text-[#8A93A3]"
                        >
                          Il y a 10 heures
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div
                        style={{ backgroundColor: "#FFF8DB", color: "#9A6712" }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-semibold"
                      >
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#303747]">
                          2e Prix au Salon des Sciences
                        </p>
                        <p className="mt-0.5 text-[12px] text-[#8A93A3] leading-snug">
                          Le club scientifique récompensé pour son projet écologique.
                        </p>
                        <span
                          style={{ backgroundColor: "#F8FAFC" }}
                          className="mt-1 inline-block rounded px-2 py-0.5 text-[10px] text-[#8A93A3]"
                        >
                          Il y a 3 semaines
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notice Board / Announcements (5 cols) */}
                <div
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
                  className="lg:col-span-5 sh-card p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[15px] font-semibold text-[#303747]">
                      Tableau d&apos;Affichage
                    </h3>
                    <MoreHorizontal className="h-4 w-4 text-[#8A93A3]" />
                  </div>

                  <div className="space-y-2.5">
                    {filteredNotices.map((notice) => (
                      <div
                        key={notice.id}
                        onClick={() => toast.info(`${notice.title} — ${notice.description}`)}
                        className="cursor-pointer flex items-center justify-between gap-2 rounded-[12px] p-2 transition hover:bg-[#DFF4FC]/50"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            style={{ backgroundColor: notice.badgeBg, color: "#303747" }}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-semibold"
                          >
                            <Award className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-[13px] font-semibold text-[#303747]">
                              {notice.title}
                            </p>
                            <p className="truncate text-[11px] text-[#8A93A3]">
                              {notice.author} {notice.role}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span
                            style={{ backgroundColor: "#DFF4FC", color: "#303747" }}
                            className="rounded-md px-2 py-0.5 text-[10px] font-medium tabular-nums"
                          >
                            {notice.date}
                          </span>
                          <span
                            style={{ backgroundColor: "#F2F0FF", color: "#303747" }}
                            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium tabular-nums"
                          >
                            <Eye className="h-2.5 w-2.5 text-[#8A93A3]" /> {notice.views}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity (3 cols) */}
                <div
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
                  className="lg:col-span-3 sh-card p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[15px] font-semibold text-[#303747]">
                      Activité Récente
                    </h3>
                    <span className="text-[11px] font-medium text-[#8A93A3]">Tout voir</span>
                  </div>
                  <p className="text-[11px] font-semibold text-[#8A93A3] mb-3">
                    Aujourd&apos;hui
                  </p>

                  <div className="space-y-3.5">
                    <div className="flex items-start gap-2.5">
                      <span
                        style={{ backgroundColor: "#FFE681", color: "#303747" }}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
                      >
                        MJ
                      </span>
                      <div>
                        <p className="text-[12px] leading-snug text-[#303747]">
                          <span className="font-semibold">Mme Johnson</span> a partagé un
                          support de <span className="font-semibold">Littérature</span>.
                        </p>
                        <span className="text-[10px] text-[#8A93A3]">Il y a 20 minutes</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span
                        style={{ backgroundColor: "#D0CBFF", color: "#303747" }}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
                      >
                        DL
                      </span>
                      <div>
                        <p className="text-[12px] leading-snug text-[#303747]">
                          <span className="font-semibold">David Lee</span> a terminé le quiz
                          d&apos;<span className="font-semibold">Histoire</span>.
                        </p>
                        <span className="text-[10px] text-[#8A93A3]">Il y a 1 heure</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span
                        style={{ backgroundColor: "#DFF4FC", color: "#35B8D5" }}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
                      >
                        <Bell className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <p className="text-[12px] leading-snug text-[#303747]">
                          <span className="font-semibold">Autorisation Sortie :</span> Musée
                          des Sciences (15 avril).
                        </p>
                        <span className="text-[10px] text-[#8A93A3]">Il y a 3 heures</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===============================================================
                RIGHT 4 COLUMNS (Calendar, Agenda, Messages & Parent Comms)
            =============================================================== */}
            <div id="sec-calendar" className="xl:col-span-4 space-y-6">
              {/* CALENDAR & AGENDA CARD */}
              <div
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
                className="sh-card p-5"
              >
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    aria-label="Mois précédent"
                    className="rounded-lg p-1 text-[#8A93A3] hover:bg-[#F8FAFC] hover:text-[#303747]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <h2 className="text-[15px] font-semibold text-[#303747]">Avril 2026</h2>
                  <button
                    type="button"
                    aria-label="Mois suivant"
                    className="rounded-lg p-1 text-[#8A93A3] hover:bg-[#F8FAFC] hover:text-[#303747]"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Week Strip — Selected date highlighted with pale blue (#DFF4FC) */}
                <div className="mt-4 grid grid-cols-7 gap-1 text-center">
                  {[
                    { day: "Dim", date: 19 },
                    { day: "Lun", date: 20 },
                    { day: "Mar", date: 21 },
                    { day: "Mer", date: 22 },
                    { day: "Jeu", date: 23 },
                    { day: "Ven", date: 24 },
                    { day: "Sam", date: 25 },
                  ].map((item) => {
                    const isSelected = selectedDay === item.date;
                    return (
                      <button
                        key={item.date}
                        type="button"
                        onClick={() => setSelectedDay(item.date)}
                        style={
                          isSelected
                            ? { backgroundColor: "#DFF4FC", color: "#303747" }
                            : undefined
                        }
                        className={`flex flex-col items-center rounded-[10px] py-2 transition ${
                          isSelected
                            ? "font-semibold text-[#303747]"
                            : "text-[#8A93A3] hover:bg-[#F8FAFC]"
                        }`}
                      >
                        <span className="text-[10px] text-[#8A93A3]">{item.day}</span>
                        <span className="mt-1 text-[13px] font-semibold text-[#303747] tabular-nums">
                          {item.date}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Agenda Section */}
                <div className="mt-5 border-t border-[#E7EBF2] pt-5">
                  <div className="flex items-center justify-between mb-3.5">
                    <h3 className="text-[15px] font-semibold text-[#303747]">Agenda</h3>
                    <MoreHorizontal className="h-4 w-4 text-[#8A93A3]" />
                  </div>

                  <div className="space-y-2.5">
                    {AGENDA_ITEMS.map((item) => (
                      <div
                        key={item.title}
                        style={{
                          backgroundColor: item.bg,
                          borderColor: item.border,
                        }}
                        className="flex items-center gap-3 rounded-[12px] border p-3"
                      >
                        <span className="text-[12px] font-semibold text-[#303747] tabular-nums shrink-0">
                          {item.time}
                        </span>
                        <div className="border-l border-[#303747]/15 pl-3 min-w-0">
                          <p className="text-[11px] text-[#8A93A3]">{item.grade}</p>
                          <p className="truncate text-[13px] font-semibold text-[#303747]">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* MESSAGES AND PARENT COMMUNICATIONS */}
              <div
                id="sec-messages"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
                className="sh-card p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[16px] font-semibold text-[#303747]">Messages</h2>
                  <button
                    type="button"
                    onClick={() => toast.info("Messagerie école-parents ouverte")}
                    className="text-[12px] font-medium text-[#8A93A3] hover:text-[#303747]"
                  >
                    Tout voir
                  </button>
                </div>

                <div className="divide-y divide-[#E7EBF2]">
                  {PARENT_MESSAGES.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => toast.info(`Message de ${m.sender} : ${m.preview}`)}
                      className="cursor-pointer flex items-start gap-3 py-3 first:pt-0 last:pb-0 transition hover:bg-[#F8FAFC] rounded-lg px-1"
                    >
                      <span
                        style={{ backgroundColor: m.avatarBg, color: "#303747" }}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                      >
                        {m.initials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-[13px] font-semibold text-[#303747]">
                            {m.sender}
                          </p>
                          <span className="shrink-0 text-[11px] text-[#8A93A3]">
                            {m.time}
                          </span>
                        </div>
                        <div className="mt-0.5 flex items-center justify-between gap-2">
                          <p className="line-clamp-2 text-[12px] text-[#8A93A3] leading-snug">
                            {m.preview}
                          </p>
                          {m.unread > 0 && (
                            <span
                              style={{ backgroundColor: "#DFF4FC", color: "#35B8D5" }}
                              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                            >
                              {m.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Parent Mobile Notification Reminder Card */}
                <div
                  style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2" }}
                  className="mt-5 rounded-[14px] border p-3.5"
                >
                  <div className="flex items-center justify-between text-[11px] font-medium text-[#8A93A3]">
                    <span className="flex items-center gap-1.5 font-semibold text-[#303747]">
                      <span
                        style={{ backgroundColor: "#DFF4FC", color: "#35B8D5" }}
                        className="flex h-5 w-5 items-center justify-center rounded-md"
                      >
                        <Bell className="h-3 w-3" />
                      </span>
                      Notification Portail Parents
                    </span>
                    <span>15 Avril</span>
                  </div>
                  <p className="mt-2 text-[12px] text-[#303747] leading-relaxed">
                    « Rappel : La sortie scolaire a lieu le 15 avril. Merci de confirmer la
                    présence. »
                  </p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setTripConfirmed(true);
                        toast.success("Présence confirmée pour la sortie scolaire du 15 avril !");
                      }}
                      style={{
                        backgroundColor: tripConfirmed ? "#EAF7F1" : "#DFF4FC",
                        color: tripConfirmed ? "#1E7E5A" : "#303747",
                      }}
                      className="flex-1 rounded-[8px] py-1.5 text-[11px] font-semibold transition"
                    >
                      {tripConfirmed ? "✓ Présence confirmée" : "Confirmer la présence"}
                    </button>
                    <span
                      style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
                      className="rounded-[8px] border px-2.5 py-1.5 text-[11px] text-[#8A93A3]"
                    >
                      Détails
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================
              STUDENT & TEACHER DIRECTORY TABLE
              (White background, pale gray/blue header, subtle separators,
              light-blue hover states, rounded search & restrained pagination)
          ================================================================= */}
          <section
            id="sec-directory"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
            className="sh-card p-5 sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E7EBF2] pb-4">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-[17px] font-semibold text-[#303747]">
                  {directoryTab === "students"
                    ? "Liste de Tous les Élèves"
                    : "Répertoire des Enseignants & Paie Horaire"}
                </h2>

                <div
                  style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2" }}
                  className="inline-flex rounded-[10px] border p-1"
                >
                  <button
                    type="button"
                    onClick={() => setDirectoryTab("students")}
                    style={
                      directoryTab === "students"
                        ? { backgroundColor: "#DFF4FC", color: "#303747" }
                        : undefined
                    }
                    className={`rounded-[8px] px-3 py-1 text-[12px] font-medium transition ${
                      directoryTab === "students"
                        ? "font-semibold text-[#303747]"
                        : "text-[#8A93A3] hover:text-[#303747]"
                    }`}
                  >
                    Élèves ({STUDENTS_DATA.length} sur 1 248)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirectoryTab("teachers")}
                    style={
                      directoryTab === "teachers"
                        ? { backgroundColor: "#DFF4FC", color: "#303747" }
                        : undefined
                    }
                    className={`rounded-[8px] px-3 py-1 text-[12px] font-medium transition ${
                      directoryTab === "teachers"
                        ? "font-semibold text-[#303747]"
                        : "text-[#8A93A3] hover:text-[#303747]"
                    }`}
                  >
                    Enseignants ({TEACHERS_DATA.length})
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {directoryTab === "students" && (
                  <div
                    style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2" }}
                    className="flex items-center gap-1 rounded-[10px] border p-1"
                  >
                    {(["Tous", "Payé", "En retard"] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setStatusFilter(status)}
                        style={
                          statusFilter === status
                            ? { backgroundColor: "#FFFFFF", color: "#303747" }
                            : undefined
                        }
                        className={`rounded-[7px] px-2.5 py-1 text-[11px] font-medium transition ${
                          statusFilter === status
                            ? "font-semibold shadow-2xs"
                            : "text-[#8A93A3] hover:text-[#303747]"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}

                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8A93A3]" />
                  <input
                    type="text"
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                    placeholder="Rechercher par nom ou ID..."
                    style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2", color: "#303747" }}
                    className="rounded-[10px] border py-1.5 pl-8 pr-3 text-[12px] placeholder:text-[#8A93A3] focus:border-[#35B8D5] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {directoryTab === "students" ? (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr
                      style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2" }}
                      className="border-b text-[11px] font-semibold text-[#8A93A3]"
                    >
                      <th className="py-3 pl-3 pr-2 w-8 rounded-l-[8px]">
                        <input
                          type="checkbox"
                          aria-label="Tout sélectionner"
                          checked={
                            selectedStudentIds.length === filteredStudents.length &&
                            filteredStudents.length > 0
                          }
                          onChange={(e) =>
                            setSelectedStudentIds(
                              e.target.checked ? filteredStudents.map((s) => s.id) : []
                            )
                          }
                          className="h-3.5 w-3.5 rounded border-[#E7EBF2]"
                        />
                      </th>
                      <th className="py-3 px-3">Nom de l&apos;élève</th>
                      <th className="py-3 px-3">Identifiant</th>
                      <th className="py-3 px-3">Classe</th>
                      <th className="py-3 px-3">Date de naissance</th>
                      <th className="py-3 px-3">Téléphone</th>
                      <th className="py-3 px-3">Adresse</th>
                      <th className="py-3 px-3 text-right rounded-r-[8px]">Scolarité</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7EBF2] text-[13px]">
                    {filteredStudents.map((student) => {
                      const isSelected = selectedStudentIds.includes(student.id);
                      return (
                        <tr
                          key={student.id}
                          onClick={() => toggleStudentSelection(student.id)}
                          style={
                            isSelected ? { backgroundColor: "#DFF4FC" } : undefined
                          }
                          className="cursor-pointer transition-colors hover:bg-[#DFF4FC]/50"
                        >
                          <td
                            className="py-3.5 pl-3 pr-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              aria-label={`Sélectionner ${student.name}`}
                              checked={isSelected}
                              onChange={() => toggleStudentSelection(student.id)}
                              className="h-3.5 w-3.5 rounded border-[#E7EBF2]"
                            />
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-3">
                              <span
                                style={{
                                  backgroundColor: student.avatarBg,
                                  color: "#303747",
                                }}
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                              >
                                {student.initials}
                              </span>
                              <div>
                                <p className="font-semibold text-[#303747]">{student.name}</p>
                                <p className="text-[11px] text-[#8A93A3]">{student.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 text-[12px] text-[#303747] tabular-nums">
                            {student.studentId}
                          </td>
                          <td className="py-3.5 px-3 text-[12px] font-medium text-[#303747]">
                            {student.classe}
                          </td>
                          <td className="py-3.5 px-3 text-[12px] text-[#8A93A3] tabular-nums">
                            {student.dob}
                          </td>
                          <td className="py-3.5 px-3 text-[12px] text-[#8A93A3] tabular-nums">
                            {student.phone}
                          </td>
                          <td className="py-3.5 px-3 text-[12px] text-[#8A93A3] max-w-[200px] truncate">
                            {student.address}
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <div className="inline-flex items-center gap-2">
                              <span className="text-[12px] font-semibold text-[#303747] tabular-nums">
                                {student.tuitionAmount}
                              </span>
                              {student.tuitionStatus === "Payé" && (
                                <span className="sh-badge-success rounded-full px-2.5 py-0.5 text-[10px] font-semibold">
                                  Payé
                                </span>
                              )}
                              {student.tuitionStatus === "En retard" && (
                                <span className="sh-badge-error rounded-full px-2.5 py-0.5 text-[10px] font-semibold">
                                  En retard
                                </span>
                              )}
                              {student.tuitionStatus === "En attente" && (
                                <span className="sh-badge-warning rounded-full px-2.5 py-0.5 text-[10px] font-semibold">
                                  En attente
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr
                      style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2" }}
                      className="border-b text-[11px] font-semibold text-[#8A93A3]"
                    >
                      <th className="py-3 px-3 rounded-l-[8px]">Enseignant</th>
                      <th className="py-3 px-3">Matière</th>
                      <th className="py-3 px-3">Classes</th>
                      <th className="py-3 px-3">Heures suivies</th>
                      <th className="py-3 px-3">Salaire calculé</th>
                      <th className="py-3 px-3">Présence</th>
                      <th className="py-3 px-3 text-right rounded-r-[8px]">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7EBF2] text-[13px]">
                    {filteredTeachers.map((teacher) => (
                      <tr
                        key={teacher.id}
                        className="transition-colors hover:bg-[#DFF4FC]/50"
                      >
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-3">
                            <span
                              style={{
                                backgroundColor: teacher.avatarBg,
                                color: "#303747",
                              }}
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                            >
                              {teacher.initials}
                            </span>
                            <div>
                              <p className="font-semibold text-[#303747]">{teacher.name}</p>
                              <p className="text-[11px] text-[#8A93A3]">{teacher.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-[12px] font-medium text-[#303747]">
                          {teacher.subject}
                        </td>
                        <td className="py-3.5 px-3 text-[12px] text-[#8A93A3]">
                          {teacher.classes}
                        </td>
                        <td className="py-3.5 px-3 text-[12px] font-semibold text-[#303747] tabular-nums">
                          {teacher.hoursTracked} h ({teacher.hourlyRate} DT/h)
                        </td>
                        <td className="py-3.5 px-3">
                          <span
                            style={{ backgroundColor: "#FFF8DB", color: "#9A6712" }}
                            className="rounded-[8px] px-2.5 py-1 text-[12px] font-semibold tabular-nums"
                          >
                            {teacher.calculatedSalary}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-[12px] font-semibold text-[#303747] tabular-nums">
                          {teacher.presenceRate}%
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <span
                            style={{ backgroundColor: "#DFF4FC", color: "#303747" }}
                            className="rounded-full px-3 py-1 text-[11px] font-semibold"
                          >
                            {teacher.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Restrained Pagination Controls */}
            <div className="mt-4 flex items-center justify-between border-t border-[#E7EBF2] pt-4 text-[12px] text-[#8A93A3]">
              <button
                type="button"
                style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2", color: "#303747" }}
                className="rounded-[8px] border px-3 py-1.5 font-medium transition hover:bg-[#DFF4FC]"
              >
                Précédent
              </button>
              <span>Page 1 sur 12</span>
              <button
                type="button"
                style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2", color: "#303747" }}
                className="rounded-[8px] border px-3 py-1.5 font-medium transition hover:bg-[#DFF4FC]"
              >
                Suivant
              </button>
            </div>
          </section>

          {/* =================================================================
              PEDAGOGY & ACADEMIC TRACKING
          ================================================================= */}
          <section id="sec-pedagogy" className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
              className="lg:col-span-7 sh-card p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E7EBF2] pb-4">
                <div>
                  <h2 className="text-[16px] font-semibold text-[#303747]">
                    Supports de Cours, Programmes &amp; Quiz en Ligne
                  </h2>
                  <p className="text-[12px] text-[#8A93A3]">
                    Ressources pédagogiques centralisées et évaluations par matière
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toast.success("Nouveau support de cours / quiz créé.")}
                  style={{ backgroundColor: "#DFF4FC", color: "#303747" }}
                  className="inline-flex items-center gap-1.5 rounded-[10px] px-3 py-1.5 text-[12px] font-semibold transition hover:bg-[#BDEAF8]"
                >
                  <Plus className="h-3.5 w-3.5 text-[#35B8D5]" /> Ajouter un cours
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {[
                  {
                    subject: "Mathématiques",
                    desc: "Fonctions, Analyse & Quiz N°4",
                    progress: "92%",
                    files: "14 Supports PDF • 4 Quiz",
                    badgeBg: "#D0CBFF",
                  },
                  {
                    subject: "Français",
                    desc: "Dissertation, Lecture & Grammaire",
                    progress: "85%",
                    files: "11 Supports PDF • 3 Quiz",
                    badgeBg: "#BDEAF8",
                  },
                  {
                    subject: "Sciences & SVT",
                    desc: "Biologie cellulaire & TP Labo",
                    progress: "78%",
                    files: "9 Supports PDF • 5 Quiz",
                    badgeBg: "#FFE681",
                  },
                  {
                    subject: "Anglais",
                    desc: "Compréhension orale & Expression",
                    progress: "74%",
                    files: "10 Audio/PDF • 3 Quiz",
                    badgeBg: "#DFF4FC",
                  },
                ].map((course) => (
                  <div
                    key={course.subject}
                    style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2" }}
                    className="rounded-[14px] border p-4 transition hover:bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-semibold text-[#303747]">
                        {course.subject}
                      </span>
                      <span
                        style={{ backgroundColor: course.badgeBg, color: "#303747" }}
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                      >
                        {course.progress}
                      </span>
                    </div>
                    <p className="mt-1 text-[12px] text-[#8A93A3]">{course.desc}</p>
                    <p className="mt-3 text-[11px] font-medium text-[#303747]">
                      {course.files}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
              className="lg:col-span-5 sh-card p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-[16px] font-semibold text-[#303747]">
                      Progression Académique
                    </h2>
                    <p className="text-[12px] text-[#8A93A3]">
                      Suivi détaillé des notes et objectifs par matière
                    </p>
                  </div>
                  <span
                    style={{ backgroundColor: "#DFF4FC", color: "#303747" }}
                    className="rounded-full px-3 py-1 text-[13px] font-semibold tabular-nums"
                  >
                    78% Global
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  {[
                    { label: "Mathématiques", val: "88%", score: "17,6 / 20", color: "#D0CBFF" },
                    { label: "Français", val: "82%", score: "16,4 / 20", color: "#BDEAF8" },
                    { label: "Sciences", val: "78%", score: "15,6 / 20", color: "#FFE681" },
                    { label: "Anglais", val: "74%", score: "14,8 / 20", color: "#BDEAF8" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-[12px] font-medium text-[#303747]">
                        <span>{item.label}</span>
                        <span className="font-semibold tabular-nums">{item.score}</span>
                      </div>
                      <div
                        style={{ backgroundColor: "#F4F6FA" }}
                        className="mt-1.5 h-2 w-full overflow-hidden rounded-full"
                      >
                        <div
                          style={{ width: item.val, backgroundColor: item.color }}
                          className="h-full rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2" }}
                className="mt-5 rounded-[12px] border p-3 text-[12px] text-[#8A93A3] flex items-center justify-between"
              >
                <span>Bulletins accessibles sur le portail parents</span>
                <span className="sh-badge-success rounded-full px-2.5 py-0.5 text-[10px] font-semibold">
                  Partagé
                </span>
              </div>
            </div>
          </section>

          {/* =================================================================
              MEETING SCHEDULER & CONSULTATION SECTION (Light White Card)
          ================================================================= */}
          <section
            id="sec-meeting"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2" }}
            className="sh-card p-6 sm:p-7"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 space-y-3.5">
                <span
                  style={{ backgroundColor: "#DFF4FC", color: "#303747" }}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold"
                >
                  <Calendar className="h-3.5 w-3.5 text-[#35B8D5]" /> PRÉSENTATION &amp; TARIFS
                </span>
                <h2 className="text-[22px] sm:text-[26px] font-semibold tracking-tight text-[#303747]">
                  Vous souhaitez simplifier la gestion quotidienne de votre école ?
                </h2>
                <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#8A93A3]">
                  Planifions une réunion de présentation personnalisée pour explorer la
                  plateforme en direct, discuter du fonctionnement de votre établissement et
                  vous présenter les formules tarifaires adaptées.
                </p>

                <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                  <div
                    style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2" }}
                    className="rounded-[12px] border p-3.5"
                  >
                    <p className="text-[13px] font-semibold text-[#303747]">
                      Démo personnalisée
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#8A93A3]">
                      En présentiel dans votre école ou en visioconférence.
                    </p>
                  </div>
                  <div
                    style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2" }}
                    className="rounded-[12px] border p-3.5"
                  >
                    <p className="text-[13px] font-semibold text-[#303747]">
                      Accompagnement complet
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#8A93A3]">
                      Importation de vos listes élèves et formation des équipes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div
                  style={{ backgroundColor: "#F8FAFC", borderColor: "#E7EBF2" }}
                  className="rounded-[16px] border p-5 sm:p-6"
                >
                  {meetingSubmitted ? (
                    <div className="text-center py-5 space-y-3">
                      <div
                        style={{ backgroundColor: "#EAF7F1", color: "#1E7E5A" }}
                        className="mx-auto flex h-11 w-11 items-center justify-center rounded-full"
                      >
                        <Check className="h-5 w-5" />
                      </div>
                      <h3 className="text-[16px] font-semibold text-[#303747]">
                        Demande de réunion confirmée
                      </h3>
                      <p className="text-[12px] text-[#8A93A3] max-w-md mx-auto">
                        Merci <strong className="text-[#303747]">{schoolName}</strong>. Notre
                        équipe vous contactera sous 24h à l&apos;adresse{" "}
                        <strong className="text-[#303747]">{contactEmail}</strong> (
                        {meetingFormat}).
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setMeetingSubmitted(false);
                          setSchoolName("");
                          setContactEmail("");
                          setContactPhone("");
                        }}
                        style={{ backgroundColor: "#DFF4FC", color: "#303747" }}
                        className="rounded-[10px] px-4 py-2 text-[12px] font-semibold"
                      >
                        Planifier un autre créneau
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleScheduleSubmit} className="space-y-3.5">
                      <h3 className="text-[16px] font-semibold text-[#303747]">
                        Planifier une réunion
                      </h3>

                      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="school-input"
                            className="block text-[11px] font-medium text-[#303747] mb-1"
                          >
                            Nom de l&apos;école / Contact
                          </label>
                          <div className="relative">
                            <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A93A3]" />
                            <input
                              id="school-input"
                              type="text"
                              required
                              value={schoolName}
                              onChange={(e) => setSchoolName(e.target.value)}
                              placeholder="École Privée..."
                              style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2", color: "#303747" }}
                              className="w-full rounded-[10px] border py-2.5 pl-9 pr-3 text-[13px] placeholder:text-[#8A93A3] focus:border-[#35B8D5] focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="email-input"
                            className="block text-[11px] font-medium text-[#303747] mb-1"
                          >
                            Adresse e-mail officielle
                          </label>
                          <div className="relative">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A93A3]" />
                            <input
                              id="email-input"
                              type="email"
                              required
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              placeholder="direction@ecole.tn"
                              style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2", color: "#303747" }}
                              className="w-full rounded-[10px] border py-2.5 pl-9 pr-3 text-[13px] placeholder:text-[#8A93A3] focus:border-[#35B8D5] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="phone-input"
                            className="block text-[11px] font-medium text-[#303747] mb-1"
                          >
                            Numéro de téléphone
                          </label>
                          <div className="relative">
                            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A93A3]" />
                            <input
                              id="phone-input"
                              type="tel"
                              required
                              value={contactPhone}
                              onChange={(e) => setContactPhone(e.target.value)}
                              placeholder="+216 98 000 000"
                              style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2", color: "#303747" }}
                              className="w-full rounded-[10px] border py-2.5 pl-9 pr-3 text-[13px] placeholder:text-[#8A93A3] focus:border-[#35B8D5] focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="format-select"
                            className="block text-[11px] font-medium text-[#303747] mb-1"
                          >
                            Type de réunion préféré
                          </label>
                          <div className="relative">
                            <Video className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A93A3]" />
                            <select
                              id="format-select"
                              value={meetingFormat}
                              onChange={(e) => setMeetingFormat(e.target.value)}
                              style={{ backgroundColor: "#FFFFFF", borderColor: "#E7EBF2", color: "#303747" }}
                              className="w-full rounded-[10px] border py-2.5 pl-9 pr-6 text-[13px] focus:border-[#35B8D5] focus:outline-none"
                            >
                              <option value="Démo en présentiel">Démo en présentiel</option>
                              <option value="Appel vidéo en ligne">Appel vidéo en ligne</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        style={{ backgroundColor: "#BDEAF8", color: "#303747", borderColor: "#E7EBF2" }}
                        className="mt-2 w-full rounded-[10px] border py-3 text-[13px] font-semibold transition hover:bg-[#DFF4FC]"
                      >
                        Demander une réunion &amp; les détails tarifaires →
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="flex flex-col gap-3 border-t border-[#E7EBF2] pt-4 pb-2 text-[12px] text-[#8A93A3] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-5">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> contact@createx.edu
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> +216 71 123 456
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <span>Conditions d&apos;utilisation</span>
              <span>Politique de confidentialité</span>
              <span>© {new Date().getFullYear()} CreateX</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
