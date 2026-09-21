import { FormEvent, useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  ArrowRight,
  Award,
  BarChart3,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileText,
  Headphones,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  NotebookPen,
  Phone,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
  Zap,
} from "lucide-react";

type LegalModal = "privacy" | "legal" | null;

type FormState = {
  name: string;
  email: string;
  service: string;
  message: string;
};

const WHATSAPP_URL = "https://wa.me/22892598260";

const services = [
  {
    number: "01",
    icon: BriefcaseBusiness,
    title: "Gestion Administrative & Courrier",
    description:
      "Nous structurons vos tâches récurrentes, suivons vos dossiers et fluidifions chaque échange administratif.",
    tone: "navy",
  },
  {
    number: "02",
    icon: Clock3,
    title: "Organisation d’Agenda",
    description:
      "Un agenda maîtrisé, des priorités claires et des rendez-vous qui s’enchaînent sans friction.",
    tone: "mint",
  },
  {
    number: "03",
    icon: FileText,
    title: "Rédaction & Correction de Documents",
    description:
      "Des documents précis, lisibles et prêts à être partagés, de l’email professionnel au rapport complet.",
    tone: "peach",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Assistance Digitale & IA",
    description:
      "Nous vous aidons à automatiser les bons réflexes et à tirer parti de l’IA sans perdre votre exigence.",
    tone: "lilac",
  },
];

const trustItems = [
  { icon: LockKeyhole, label: "Données protégées" },
  { icon: ShieldCheck, label: "Confidentialité stricte" },
  { icon: FileCheck2, label: "Anti-fraude activé" },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#accueil" className="flex items-center gap-3" aria-label="Optima Assist, accueil">
      <span
        className={`relative grid size-10 place-items-center overflow-hidden rounded-xl ${
          light ? "bg-white/10 ring-1 ring-white/15" : "bg-navy"
        }`}
      >
        <span className="absolute -right-1 -top-2 size-6 rounded-full bg-emerald opacity-80" />
        <span className="relative text-lg font-black tracking-tighter text-white">OA</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`text-[15px] font-extrabold tracking-[-0.04em] ${light ? "text-white" : "text-navy"}`}>
          OPTIMA
        </span>
        <span className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] ${light ? "text-white/55" : "text-slate-500"}`}>
          Assist
        </span>
      </span>
    </a>
  );
}

function SectionEyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <div className={`mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] ${light ? "text-emerald-light" : "text-emerald"}`}>
      <span className="h-px w-8 bg-current" />
      {children}
    </div>
  );
}

function LegalDialog({ type, onClose }: { type: Exclude<LegalModal, null>; onClose: () => void }) {
  const privacy = type === "privacy";
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-navy/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl sm:p-9">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald">Optima Assist</p>
            <h2 className="font-display text-3xl font-bold tracking-[-0.04em] text-navy">
              {privacy ? "Politique de confidentialité" : "Mentions légales"}
            </h2>
          </div>
          <button onClick={onClose} className="grid size-10 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200" aria-label="Fermer">
            <X size={18} />
          </button>
        </div>
        {privacy ? (
          <div className="space-y-5 text-sm leading-7 text-slate-600">
            <p>Optima Assist traite vos informations uniquement pour répondre à votre demande et organiser la prestation souhaitée. Nous ne vendons ni ne partageons vos données à des fins commerciales.</p>
            <h3 className="font-bold text-navy">Données collectées</h3>
            <p>Les champs du formulaire (nom, email, service et message) sont utilisés pour vous recontacter. Les informations sont conservées le temps nécessaire au suivi de votre demande, puis supprimées selon nos procédures internes.</p>
            <h3 className="font-bold text-navy">Vos droits</h3>
            <p>Vous pouvez demander l’accès, la rectification ou la suppression de vos informations en écrivant à digitalelitelabservices@gmail.com. Toute demande est traitée avec discrétion et dans les meilleurs délais.</p>
            <p className="rounded-2xl bg-slate-50 p-4 text-xs text-slate-500">Dernière mise à jour : septembre 2026.</p>
          </div>
        ) : (
          <div className="space-y-5 text-sm leading-7 text-slate-600">
            <p><strong className="text-navy">Optima Assist</strong> est une agence d’assistance administrative, digitale et IA basée à Tsévié, Togo.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Email</p><p className="mt-1 font-medium text-navy">digitalelitelabservices@gmail.com</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Téléphone</p><p className="mt-1 font-medium text-navy">+228 92 59 82 60</p></div>
            </div>
            <h3 className="font-bold text-navy">Responsabilité</h3>
            <p>Les contenus présentés sur ce site sont informatifs et ne constituent pas un avis juridique, financier ou réglementaire. Les prestations sont définies avec chaque client selon ses besoins.</p>
          </div>
        )}
        <button onClick={onClose} className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-navy px-6 text-sm font-bold text-white transition hover:bg-navy-light">J’ai compris</button>
      </div>
    </div>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<LegalModal>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", email: "", service: "", message: "" });
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({ name: false, email: false, service: false, message: false });
  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Votre demande a bien été envoyée.");
    },
    onError: () => toast.error("Un problème est survenu. Écrivez-nous directement sur WhatsApp."),
  });

  const errors = {
    name: form.name.trim().length < 2 ? "Indiquez votre nom." : "",
    email: !/^\S+@\S+\.\S+$/.test(form.email) ? "Email non valide." : "",
    service: !form.service ? "Choisissez un service." : "",
    message: form.message.trim().length < 12 ? "Décrivez brièvement votre besoin." : "",
  };
  const isValid = !Object.values(errors).some(Boolean);

  const setField = (field: keyof FormState, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTouched({ name: true, email: true, service: true, message: true });
    if (!isValid) return;
    submitContact.mutate(form);
  };
  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-light text-slate-700">
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="container flex h-24 items-center justify-between">
          <Logo light />
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            {[['Services', 'services'], ['Notre approche', 'approche'], ['Contact', 'contact']].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-sm font-medium text-white/70 transition hover:text-white">{label}</button>
            ))}
          </nav>
          <div className="hidden items-center gap-5 sm:flex">
            <a href="mailto:digitalelitelabservices@gmail.com" className="text-sm font-medium text-white/70 transition hover:text-white">Nous écrire</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-emerald px-5 text-sm font-bold text-white shadow-lg shadow-emerald/20 transition hover:-translate-y-0.5 hover:bg-emerald-light active:scale-[0.97]">
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
          <button onClick={() => setMobileOpen((open) => !open)} className="grid size-11 place-items-center rounded-full bg-white/10 text-white sm:hidden" aria-label="Ouvrir le menu">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="mx-4 rounded-2xl border border-white/10 bg-navy/95 p-4 shadow-2xl backdrop-blur-xl sm:hidden">
            <div className="flex flex-col gap-1">
              {[['Services', 'services'], ['Notre approche', 'approche'], ['Contact', 'contact']].map(([label, id]) => (
                <button key={id} onClick={() => scrollTo(id)} className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-white/80 hover:bg-white/10">{label}</button>
              ))}
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald text-sm font-bold text-white"><MessageCircle size={16} /> Contacter sur WhatsApp</a>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="accueil" className="relative isolate overflow-hidden bg-navy">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(5,150,105,0.22),transparent_28%),radial-gradient(circle_at_10%_90%,rgba(96,165,250,0.12),transparent_28%)]" />
          <div className="absolute right-[11%] top-28 size-2 rounded-full bg-emerald-light shadow-[0_0_24px_8px_rgba(110,231,183,0.35)]" />
          <div className="absolute left-[7%] top-[42%] size-1.5 rounded-full bg-white/35" />
          <div className="container relative grid min-h-[720px] items-center gap-14 pb-16 pt-36 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12 lg:pb-20 lg:pt-40">
            <div className="max-w-2xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-light backdrop-blur">
                <span className="size-1.5 rounded-full bg-emerald-light" /> Votre temps mérite mieux
              </div>
              <h1 className="font-display text-[clamp(3.3rem,7vw,6.6rem)] font-bold leading-[0.93] tracking-[-0.065em] text-white">
                L’efficacité,<br /><span className="text-emerald-light">enfin</span> organisée.
              </h1>
              <p className="mt-8 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">Optima Assist prend en charge l’administratif, le digital et les détails qui ralentissent votre activité — pour que vous puissiez vous concentrer sur l’essentiel.</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-emerald px-7 text-sm font-bold text-white shadow-xl shadow-emerald/20 transition hover:-translate-y-1 hover:bg-emerald-light active:scale-[0.97]">
                  <MessageCircle size={18} /> Contacter sur WhatsApp <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                </a>
                <button onClick={() => scrollTo("services")} className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white/20 px-7 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/5 active:scale-[0.97]">Voir nos Services <ChevronRight size={17} /></button>
              </div>
              <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-medium text-slate-400">
                <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-light" /> Réponse sous 24h</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-light" /> Sans engagement</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-light" /> 100% confidentiel</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[510px] lg:mr-0">
              <div className="absolute -inset-5 rounded-[42px] bg-emerald/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#11294b] p-4 shadow-2xl shadow-black/20 sm:p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-rose-400" /><span className="size-2 rounded-full bg-amber-300" /><span className="size-2 rounded-full bg-emerald-light" /></div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Optima / workspace</span>
                  <span className="text-slate-500"><BarChart3 size={16} /></span>
                </div>
                <div className="grid gap-4 py-5 sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.045] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Cette semaine</p>
                    <p className="mt-3 text-4xl font-bold tracking-[-0.07em] text-white">+42<span className="text-lg text-emerald-light">%</span></p>
                    <p className="mt-1 text-xs text-slate-400">de temps récupéré</p>
                    <div className="mt-7 flex h-20 items-end gap-1.5">
                      {[28, 42, 34, 55, 48, 72, 88, 68, 93, 79, 100, 92].map((height, index) => <span key={index} className={`flex-1 rounded-t-md ${index > 8 ? "bg-emerald" : "bg-white/15"}`} style={{ height: `${height}%` }} />)}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-white/8 bg-white/[0.045] p-4">
                      <div className="flex items-center justify-between"><span className="text-xs font-semibold text-white">Priorités du jour</span><span className="rounded-full bg-emerald/15 px-2 py-1 text-[10px] font-bold text-emerald-light">4/4</span></div>
                      <div className="mt-4 space-y-3">
                        {['Courrier trié', 'Agenda synchronisé', 'Brief préparé'].map((item) => <div key={item} className="flex items-center gap-2.5 text-xs text-slate-300"><span className="grid size-5 place-items-center rounded-full bg-emerald/20 text-emerald-light"><Check size={12} /></span>{item}</div>)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-emerald/20 bg-emerald/[0.09] p-4"><span className="grid size-9 place-items-center rounded-xl bg-emerald text-white"><Zap size={17} /></span><div><p className="text-xs font-bold text-white">Automatisation active</p><p className="mt-0.5 text-[10px] text-emerald-light/80">3 actions optimisées par l’IA</p></div></div>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3"><span className="flex items-center gap-2 text-[11px] text-slate-400"><span className="size-2 rounded-full bg-emerald-light" /> Assistance en ligne</span><span className="text-[10px] font-semibold text-slate-500">mis à jour à l’instant</span></div>
              </div>
              <div className="absolute -bottom-6 -left-5 flex items-center gap-3 rounded-2xl border border-slate-200/60 bg-white p-3.5 shadow-xl shadow-navy/10 sm:-left-10"><span className="grid size-10 place-items-center rounded-xl bg-emerald/10 text-emerald"><ShieldCheck size={21} /></span><div><p className="text-xs font-bold text-navy">Vos données</p><p className="mt-0.5 text-[10px] text-slate-500">sont entre de bonnes mains</p></div></div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-light to-transparent" />
        </section>

        <section className="container relative z-10 -mt-1 pb-20 pt-10 sm:pt-16">
          <div className="grid gap-4 rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-xl shadow-navy/[0.04] sm:grid-cols-3 sm:p-7">
            {trustItems.map(({ icon: Icon, label }, index) => <div key={label} className={`flex items-center gap-4 ${index !== 0 ? "border-t border-slate-100 pt-4 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0" : ""}`}><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-emerald/10 text-emerald"><Icon size={20} /></span><div><p className="text-sm font-bold text-navy">{label}</p><p className="mt-1 text-xs text-slate-500">Notre engagement quotidien</p></div></div>)}
          </div>
        </section>

        <section id="services" className="container scroll-mt-20 pb-28">
          <div className="grid items-end gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div><SectionEyebrow>Nos expertises</SectionEyebrow><h2 className="max-w-md font-display text-4xl font-bold leading-[1.02] tracking-[-0.06em] text-navy sm:text-5xl">L’espace mental pour <span className="text-emerald">aller plus loin.</span></h2></div>
            <p className="max-w-lg text-base leading-7 text-slate-500 lg:justify-self-end">Une assistance souple et précise, conçue pour les entrepreneurs, équipes et organisations qui veulent avancer avec plus de clarté.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {services.map(({ number, icon: Icon, title, description, tone }) => <article key={number} className={`group relative overflow-hidden rounded-[26px] border border-slate-200/70 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/[0.06] sm:p-8 ${tone === 'navy' ? 'hover:border-navy/20' : ''}`}><div className="flex items-start justify-between"><span className={`grid size-12 place-items-center rounded-2xl ${tone === 'navy' ? 'bg-navy text-white' : tone === 'mint' ? 'bg-emerald/10 text-emerald' : tone === 'peach' ? 'bg-orange-100 text-orange-600' : 'bg-violet-100 text-violet-600'}`}><Icon size={22} /></span><span className="font-display text-4xl font-bold tracking-[-0.08em] text-slate-200 transition group-hover:text-slate-300">{number}</span></div><h3 className="mt-10 max-w-xs text-xl font-bold leading-tight tracking-[-0.03em] text-navy">{title}</h3><p className="mt-3 max-w-md text-sm leading-6 text-slate-500">{description}</p><div className="mt-7 flex items-center gap-2 text-xs font-bold text-emerald opacity-0 transition group-hover:opacity-100">En savoir plus <ArrowRight size={14} /></div></article>)}
          </div>
        </section>

        <section id="approche" className="scroll-mt-20 bg-navy py-24 text-white sm:py-32">
          <div className="container grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
            <div><SectionEyebrow light>Notre approche</SectionEyebrow><h2 className="max-w-xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.06em] sm:text-6xl">Le calme de savoir que <span className="text-emerald-light">tout est sous contrôle.</span></h2><p className="mt-8 max-w-lg text-base leading-8 text-slate-300">Chez Optima Assist, nous ne nous contentons pas d’exécuter. Nous comprenons votre façon de travailler, nous anticipons vos besoins et nous construisons un système qui vous ressemble.</p><div className="mt-10 grid max-w-xl gap-5 sm:grid-cols-2"><div className="flex gap-3"><span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-emerald text-white"><Check size={14} /></span><div><p className="font-bold">Une vraie présence</p><p className="mt-1 text-sm leading-6 text-slate-400">Un interlocuteur fiable, à vos côtés.</p></div></div><div className="flex gap-3"><span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-emerald text-white"><Check size={14} /></span><div><p className="font-bold">Une méthode claire</p><p className="mt-1 text-sm leading-6 text-slate-400">Des process simples et documentés.</p></div></div></div></div>
            <div className="relative mx-auto w-full max-w-md"><div className="absolute inset-0 rounded-[34px] bg-emerald/10 blur-3xl" /><div className="relative rounded-[30px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur"><div className="flex items-center justify-between border-b border-white/10 pb-5"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-emerald text-white"><Award size={21} /></span><div><p className="text-sm font-bold">Votre espace de confiance</p><p className="mt-1 text-xs text-slate-400">Une organisation qui respire</p></div></div><span className="text-xs font-bold text-emerald-light">100%</span></div><div className="py-7"><div className="mb-3 flex items-end justify-between"><span className="text-xs text-slate-400">Indice de sérénité</span><span className="font-display text-4xl font-bold tracking-[-0.08em] text-white">94<span className="text-lg text-emerald-light">/100</span></span></div><div className="h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[94%] rounded-full bg-gradient-to-r from-emerald to-emerald-light" /></div><div className="mt-7 grid grid-cols-3 gap-2 text-center"><div className="rounded-2xl bg-white/[0.05] p-3"><p className="font-display text-2xl font-bold text-white">24h</p><p className="mt-1 text-[10px] text-slate-500">réponse</p></div><div className="rounded-2xl bg-white/[0.05] p-3"><p className="font-display text-2xl font-bold text-white">4.9</p><p className="mt-1 text-[10px] text-slate-500">satisfaction</p></div><div className="rounded-2xl bg-white/[0.05] p-3"><p className="font-display text-2xl font-bold text-white">0</p><p className="mt-1 text-[10px] text-slate-500">surprise</p></div></div></div><div className="flex items-center gap-2 text-xs text-slate-400"><span className="size-2 rounded-full bg-emerald-light" /> Processus suivi et sécurisé</div></div></div>
          </div>
        </section>

        <section id="contact" className="container scroll-mt-20 py-24 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div><SectionEyebrow>Parlons de vous</SectionEyebrow><h2 className="max-w-md font-display text-4xl font-bold leading-[1.02] tracking-[-0.06em] text-navy sm:text-6xl">Un premier pas vers <span className="text-emerald">plus de légèreté.</span></h2><p className="mt-7 max-w-md text-base leading-7 text-slate-500">Dites-nous ce qui vous prend du temps. Nous reviendrons vers vous avec une première piste concrète, sans jargon et sans engagement.</p><div className="mt-10 space-y-4"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald/30 hover:shadow-lg"><span className="grid size-11 place-items-center rounded-xl bg-emerald/10 text-emerald"><MessageCircle size={20} /></span><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">WhatsApp</p><p className="mt-1 font-bold text-navy">+228 92 59 82 60</p></div><ArrowRight size={17} className="ml-auto text-slate-400" /></a><a href="mailto:digitalelitelabservices@gmail.com" className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald/30 hover:shadow-lg"><span className="grid size-11 place-items-center rounded-xl bg-navy/5 text-navy"><Mail size={20} /></span><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Email</p><p className="mt-1 break-all font-bold text-navy">digitalelitelabservices@gmail.com</p></div><ArrowRight size={17} className="ml-auto shrink-0 text-slate-400" /></a></div></div>
            <div className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-xl shadow-navy/[0.05] sm:p-9">
              {submitted ? <div className="flex min-h-[440px] flex-col items-center justify-center text-center"><span className="grid size-16 place-items-center rounded-full bg-emerald/10 text-emerald"><CheckCircle2 size={34} /></span><h3 className="mt-6 font-display text-3xl font-bold tracking-[-0.05em] text-navy">Merci pour votre confiance.</h3><p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">Votre demande est bien arrivée. Notre équipe vous répondra dans les 24 heures.</p><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-emerald px-6 text-sm font-bold text-white transition hover:bg-emerald-light"><MessageCircle size={17} /> Continuer sur WhatsApp</a><button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", service: "", message: "" }); }} className="mt-4 text-xs font-bold text-slate-400 underline underline-offset-4 hover:text-navy">Envoyer une autre demande</button></div> : <form onSubmit={handleSubmit} noValidate><div className="mb-8 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald">Formulaire rapide</p><h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.05em] text-navy">Par où commence-t-on ?</h3></div><span className="grid size-11 place-items-center rounded-2xl bg-slate-100 text-navy"><NotebookPen size={20} /></span></div><div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="mb-2 block text-xs font-bold text-navy">Nom complet</span><input value={form.name} onChange={(e) => setField('name', e.target.value)} onBlur={() => setTouched((t) => ({ ...t, name: true }))} className={`field ${touched.name && errors.name ? 'field-error' : ''}`} placeholder="Votre nom" />{touched.name && errors.name && <span className="mt-1.5 block text-xs text-red-500">{errors.name}</span>}</label><label className="block"><span className="mb-2 block text-xs font-bold text-navy">Adresse email</span><input value={form.email} type="email" onChange={(e) => setField('email', e.target.value)} onBlur={() => setTouched((t) => ({ ...t, email: true }))} className={`field ${touched.email && errors.email ? 'field-error' : ''}`} placeholder="vous@entreprise.com" />{touched.email && errors.email && <span className="mt-1.5 block text-xs text-red-500">{errors.email}</span>}</label><label className="block sm:col-span-2"><span className="mb-2 block text-xs font-bold text-navy">Service souhaité</span><select value={form.service} onChange={(e) => setField('service', e.target.value)} onBlur={() => setTouched((t) => ({ ...t, service: true }))} className={`field ${touched.service && errors.service ? 'field-error' : ''}`}><option value="">Sélectionner une expertise</option><option>Gestion administrative & courrier</option><option>Organisation d’agenda</option><option>Rédaction & correction de documents</option><option>Assistance digitale & IA</option><option>Je ne sais pas encore</option></select>{touched.service && errors.service && <span className="mt-1.5 block text-xs text-red-500">{errors.service}</span>}</label><label className="block sm:col-span-2"><span className="mb-2 block text-xs font-bold text-navy">Votre besoin</span><textarea value={form.message} onChange={(e) => setField('message', e.target.value)} onBlur={() => setTouched((t) => ({ ...t, message: true }))} className={`field min-h-32 resize-y ${touched.message && errors.message ? 'field-error' : ''}`} placeholder="En quelques mots, qu’aimeriez-vous nous déléguer ?" />{touched.message && errors.message && <span className="mt-1.5 block text-xs text-red-500">{errors.message}</span>}</label></div><div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="flex items-center gap-2 text-[11px] leading-5 text-slate-400"><LockKeyhole size={14} className="shrink-0 text-emerald" /> Vos informations restent confidentielles.</p><button type="submit" disabled={submitContact.isPending} className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-navy px-6 text-sm font-bold text-white transition hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.97]">{submitContact.isPending ? "Envoi en cours…" : "Envoyer ma demande"} {!submitContact.isPending && <ArrowRight size={16} className="transition group-hover:translate-x-1" />}</button></div></form>}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#102746] text-white">
        <div className="container py-14 sm:py-16"><div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]"><div><Logo light /><p className="mt-6 max-w-xs text-sm leading-6 text-slate-400">L’assistance qui vous rend du temps, de la clarté et de l’élan.</p><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-emerald-light hover:text-white"><MessageCircle size={16} /> Échanger avec nous <ArrowRight size={14} /></a></div><div><p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white/45">Navigation</p><div className="flex flex-col items-start gap-3 text-sm text-slate-400"><button onClick={() => scrollTo('services')} className="transition hover:text-white">Nos services</button><button onClick={() => scrollTo('approche')} className="transition hover:text-white">Notre approche</button><button onClick={() => scrollTo('contact')} className="transition hover:text-white">Nous contacter</button></div></div><div><p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white/45">Nous trouver</p><div className="space-y-3 text-sm text-slate-400"><a href="mailto:digitalelitelabservices@gmail.com" className="flex gap-2 transition hover:text-white"><Mail size={15} className="mt-0.5 shrink-0 text-emerald-light" /> digitalelitelabservices@gmail.com</a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex gap-2 transition hover:text-white"><Phone size={15} className="mt-0.5 shrink-0 text-emerald-light" /> +228 92 59 82 60</a><p className="flex gap-2"><span className="mt-0.5 shrink-0 text-emerald-light">⌖</span> Tsévié, Togo</p></div></div></div><div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Optima Assist. Tous droits réservés.</p><div className="flex gap-5"><button onClick={() => setLegalModal('privacy')} className="transition hover:text-white">Politique de Confidentialité</button><button onClick={() => setLegalModal('legal')} className="transition hover:text-white">Mentions Légales</button></div></div></div>
      </footer>
      {legalModal && <LegalDialog type={legalModal} onClose={() => setLegalModal(null)} />}
    </div>
  );
}
