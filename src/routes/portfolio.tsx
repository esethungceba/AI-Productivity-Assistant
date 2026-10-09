import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight, BarChart3, BookOpen, Briefcase, CheckCircle2, FileText, GraduationCap, Mail, MapPin, Moon,
  Printer, Scale, ShieldCheck, Sparkles, Sun, Lightbulb, Linkedin, Menu, X, Send, ArrowLeft,
} from "lucide-react";
import portrait from "@/assets/esethu-portrait.png.asset.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PROFILE, EDUCATION, SKILLS, EXPERIENCE, PROJECTS, DEVELOPMENT, type Project } from "@/lib/portfolio";

const TITLE = "Ngceba Esethu | Accounting Graduate & Aspiring Internal Auditor";
const DESC = "Portfolio of Ngceba Esethu, CPUT Accountancy graduate studying an Advanced Diploma in Internal Auditing in Cape Town, South Africa.";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const NAV = [["about", "About"], ["education", "Education"], ["skills", "Skills"], ["experience", "Experience"], ["projects", "Projects"], ["resume", "Résumé"], ["contact", "Contact"]] as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">{children}</p>;
}
function Section({ id, eyebrow, title, children, alt }: { id: string; eyebrow: string; title: string; children: ReactNode; alt?: boolean }) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 md:py-24 ${alt ? "bg-muted/60" : ""}`}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 max-w-3xl text-3xl font-bold md:text-4xl">{title}</h2>
        <div className="mt-4 h-px w-16 bg-gold" />
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  useEffect(() => { setDark(localStorage.getItem("portfolio-theme") === "dark"); }, []);
  const toggle = () => { const d = !dark; setDark(d); localStorage.setItem("portfolio-theme", d ? "dark" : "light"); };
  const themeCls = `portfolio${dark ? " dark" : ""}`;

  return (
    <div className={`${themeCls} min-h-screen`}>
      <header className="no-print sticky top-0 z-30 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 md:px-8">
          <a href="#top" className="font-display text-lg font-bold">Ngceba Esethu<span className="text-gold">.</span></a>
          <nav className="ml-auto hidden items-center gap-6 text-sm lg:flex">
            {NAV.map(([id, l]) => <a key={id} href={`#${id}`} className="text-muted-foreground transition-colors hover:text-foreground">{l}</a>)}
          </nav>
          <div className="ml-auto flex items-center gap-1 lg:ml-2">
            <Button variant="ghost" size="icon" onClick={toggle} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}>
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}>
              {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {menu && (
          <nav className="border-t px-5 py-3 lg:hidden">
            {NAV.map(([id, l]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)} className="block py-2 text-sm">{l}</a>)}
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Eyebrow>Accounting • Internal Audit • Analytical Thinking</Eyebrow>
              <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl lg:text-[3.4rem]">
                Building Trust Through Numbers, Analysis <span className="text-teal">&amp;</span> Integrity.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                I am Ngceba Esethu, an Accounting graduate currently pursuing an Advanced Diploma in Internal Auditing. I am passionate about understanding business processes, analysing financial information, identifying risks, and contributing to effective internal controls and organisational performance.
              </p>
              <div className="no-print mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg"><a href="#about">Explore My Profile <ArrowRight className="h-4 w-4" /></a></Button>
                <Button asChild size="lg" variant="outline"><a href="#resume"><FileText className="h-4 w-4" /> View My CV</a></Button>
                <Button asChild size="lg" variant="ghost"><a href="#contact">Let's Connect</a></Button>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-3 rounded-[2rem] border border-gold/40" aria-hidden />
              <img src={portrait.url} alt="Portrait of Ngceba Esethu" className="relative aspect-[4/5] w-full rounded-[1.6rem] object-cover object-top shadow-card" />
              <div className="absolute -bottom-5 -left-4 flex items-center gap-2 rounded-lg border bg-card px-4 py-2.5 text-sm shadow-card">
                <MapPin className="h-4 w-4 text-teal" /> {PROFILE.location}
              </div>
              <div className="absolute -right-4 top-8 hidden rounded-lg border bg-card p-3 shadow-card sm:block" aria-hidden>
                <div className="flex h-10 items-end gap-1">
                  {[40, 65, 50, 85, 70].map((h, i) => <div key={i} className="w-2 rounded-sm bg-teal/70" style={{ height: `${h}%` }} />)}
                </div>
                <div className="mt-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">Analysis</div>
              </div>
            </div>
          </div>
        </section>

        <Section id="about" eyebrow="About me" title="A Foundation in Accounting. A Future in Internal Audit." alt>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>I completed my Diploma in Accountancy at the Cape Peninsula University of Technology (CPUT) in 2025 and am now studying towards an Advanced Diploma in Internal Auditing.</p>
              <p>I am interested in building internal audit competency, effective risk management, operational efficiency, and working with financial information to solve problems analytically.</p>
              <p>Alongside my studies, I have supported high school learners academically and helped them pursue educational opportunities. I am eager to learn, quick to adapt to new technologies, and ready to grow in a professional environment.</p>
            </div>
            <div className="grid gap-4">
              {[
                [BarChart3, "Analytical Thinking", "Interpreting information and approaching problems logically."],
                [Scale, "Integrity & Accountability", "Recognising the importance of reliable information and responsible professional conduct."],
                [Lightbulb, "Continuous Learning", "Developing technical knowledge and adapting to new systems and workplace requirements."],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof BarChart3;
                return (
                  <div key={t as string} className="flex gap-4 rounded-lg border bg-card p-5">
                    <I className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div><h3 className="font-semibold">{t as string}</h3><p className="mt-1 text-sm text-muted-foreground">{d as string}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>

        <Section id="education" eyebrow="Education" title="Academic Journey">
          <ol className="relative space-y-8 border-l border-border pl-8">
            {EDUCATION.map((e) => (
              <li key={e.qualification} className="relative">
                <span className={`absolute -left-[2.6rem] flex h-9 w-9 items-center justify-center rounded-full border bg-card ${e.current ? "border-teal text-teal" : "text-gold"}`}>
                  <GraduationCap className="h-4 w-4" />
                </span>
                <div className="rounded-lg border bg-card p-5">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${e.current ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                    {e.current ? <Sparkles className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}{e.status}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{e.qualification}</h3>
                  <p className="text-sm text-muted-foreground">{e.school}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="skills" eyebrow="Skills & competencies" title="Competencies Listed on My CV" alt>
          <SkillsBoard />
        </Section>

        <Section id="experience" eyebrow="Experience" title="Experience, Responsibility & Community Impact.">
          <div className="rounded-lg border bg-card p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Briefcase className="h-5 w-5" /></div>
                <div><h3 className="text-xl font-semibold">{EXPERIENCE.role}</h3><p className="text-muted-foreground">{EXPERIENCE.organisation}</p></div>
              </div>
              <span className="rounded-full border border-gold/50 px-3 py-1 text-xs font-medium">{EXPERIENCE.period}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {EXPERIENCE.duties.map((d) => <li key={d} className="flex gap-3 text-sm leading-relaxed"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{d}</li>)}
            </ul>
            <div className="mt-6 border-t pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Transferable skills developed</p>
              <div className="mt-3 flex flex-wrap gap-2">{EXPERIENCE.transferable.map((t) => <span key={t} className="rounded-md bg-accent px-3 py-1 text-sm text-accent-foreground">{t}</span>)}</div>
            </div>
          </div>
        </Section>

        <Section id="projects" eyebrow="Portfolio" title="Projects & Applied Learning" alt>
          <p className="-mt-4 mb-8 max-w-2xl text-sm text-muted-foreground">These project spaces are reserved for work I will add over time. None of them are presented as completed work yet.</p>
          <div className="grid gap-5 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <article key={p.title} className="flex flex-col rounded-lg border bg-card p-6">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-muted-foreground">{p.category}</span>
                  <span className="rounded-full border border-gold/60 px-2.5 py-0.5">Evidence to be added</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.objective}</p>
                <p className="mt-4 text-xs text-muted-foreground"><span className="font-semibold text-foreground">Suggested tools:</span> {p.tools}</p>
                <Button variant="outline" className="no-print mt-5 self-start" onClick={() => setProject(p)}>View Project <ArrowRight className="h-4 w-4" /></Button>
              </article>
            ))}
          </div>
        </Section>

        <Section id="development" eyebrow="Professional development" title="Learning Today. Contributing Tomorrow.">
          <p className="-mt-4 mb-8 max-w-2xl text-muted-foreground">I am committed to developing in accounting, internal auditing, risk management, financial analysis and business systems. Verified credentials will appear here as I complete them.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {DEVELOPMENT.map((d) => (
              <div key={d} className="rounded-lg border border-dashed bg-card/60 p-5">
                <BookOpen className="h-5 w-5 text-gold" />
                <h3 className="mt-3 text-sm font-semibold">{d}</h3>
                <p className="mt-1 text-xs text-muted-foreground">Coming soon</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="resume" eyebrow="Interactive résumé" title="My Résumé at a Glance" alt>
          <Resume />
        </Section>

        <Section id="contact" eyebrow="Contact" title="Let's Build the Next Chapter.">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="leading-relaxed text-muted-foreground">I am open to opportunities where I can apply my accounting foundation, strengthen my internal auditing knowledge, and continue developing professionally.</p>
              <ul className="mt-8 space-y-4 text-sm">
                <li><a href={`mailto:${PROFILE.email}`} className="flex items-center gap-3 font-medium hover:text-teal"><Mail className="h-4 w-4 text-teal" />{PROFILE.email}</a></li>
                <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-teal" />{PROFILE.location}</li>
                {PROFILE.linkedin && <li><a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-teal"><Linkedin className="h-4 w-4 text-teal" />LinkedIn</a></li>}
              </ul>
            </div>
            <ContactForm />
          </div>
        </Section>
      </main>

      <footer className="border-t py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <div className="font-display font-bold">Ngceba Esethu</div>
            <div className="text-muted-foreground">{PROFILE.title} · {PROFILE.location}</div>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-muted-foreground">
            <a href={`mailto:${PROFILE.email}`} className="hover:text-foreground">Email</a>
            {PROFILE.linkedin && <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LinkedIn</a>}
            <Link to="/" className="no-print inline-flex items-center gap-1 hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" />SparkleCore</Link>
            <span>© {new Date().getFullYear()} Ngceba Esethu</span>
          </div>
        </div>
      </footer>

      <Dialog open={!!project} onOpenChange={(o) => !o && setProject(null)}>
        <DialogContent className={themeCls}>
          {project && (
            <>
              <DialogHeader>
                <DialogTitle>{project.title}</DialogTitle>
                <DialogDescription>{project.category} · Placeholder — project evidence not yet added</DialogDescription>
              </DialogHeader>
              <dl className="space-y-4 text-sm">
                {[["Objective", project.objective], ["Approach & methodology", project.approach], ["Tools", project.tools], ["Findings & learning outcomes", project.outcomes]].map(([k, v]) => (
                  <div key={k}><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{k}</dt><dd className="mt-1">{v}</dd></div>
                ))}
              </dl>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SkillsBoard() {
  const cats = Object.keys(SKILLS) as (keyof typeof SKILLS)[];
  const [active, setActive] = useState<"All" | keyof typeof SKILLS>("All");
  const shown = active === "All" ? cats : [active];
  return (
    <>
      <div className="no-print mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter skills">
        {(["All", ...cats] as const).map((c) => (
          <Button key={c} size="sm" variant={active === c ? "default" : "outline"} aria-pressed={active === c} onClick={() => setActive(c)}>{c}</Button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {shown.map((c) => (
          <div key={c} className="rounded-lg border bg-card p-6">
            <h3 className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4 text-gold" />{c}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SKILLS[c].map((s) => <li key={s} className="rounded-md border bg-background px-3 py-1.5 text-sm">{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

function Resume() {
  return (
    <div className="rounded-lg border bg-card p-5 md:p-8">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{PROFILE.cvUrl ? "Download the full CV below." : "A downloadable CV will be added once the file is supplied."}</p>
        <div className="flex gap-2">
          {PROFILE.cvUrl && <Button asChild><a href={PROFILE.cvUrl} download><FileText className="h-4 w-4" />Download CV</a></Button>}
          <Button variant="outline" onClick={() => window.print()}><Printer className="h-4 w-4" />Print résumé</Button>
        </div>
      </div>
      <Tabs defaultValue="profile">
        <TabsList className="no-print h-auto flex-wrap">
          {["Profile", "Education", "Experience", "Skills", "Projects"].map((t) => <TabsTrigger key={t} value={t.toLowerCase()}>{t}</TabsTrigger>)}
        </TabsList>
        <TabsContent value="profile" className="mt-6 space-y-2 text-sm leading-relaxed">
          <h3 className="text-lg font-semibold">{PROFILE.name}</h3>
          <p className="text-muted-foreground">{PROFILE.title} · {PROFILE.location} · {PROFILE.email}</p>
          <p>Accounting graduate pursuing an Advanced Diploma in Internal Auditing, motivated to contribute to risk management, internal controls and organisational performance.</p>
        </TabsContent>
        <TabsContent value="education" className="mt-6 space-y-3 text-sm">
          {EDUCATION.map((e) => <div key={e.qualification}><div className="font-semibold">{e.qualification}</div><div className="text-muted-foreground">{e.school} · {e.status}</div></div>)}
        </TabsContent>
        <TabsContent value="experience" className="mt-6 text-sm">
          <div className="font-semibold">{EXPERIENCE.role} — {EXPERIENCE.organisation}</div>
          <div className="text-muted-foreground">{EXPERIENCE.period}</div>
          <ul className="mt-3 list-disc space-y-1 pl-5">{EXPERIENCE.duties.map((d) => <li key={d}>{d}</li>)}</ul>
        </TabsContent>
        <TabsContent value="skills" className="mt-6 space-y-3 text-sm">
          {Object.entries(SKILLS).map(([c, list]) => <div key={c}><span className="font-semibold">{c}: </span>{list.join(", ")}</div>)}
        </TabsContent>
        <TabsContent value="projects" className="mt-6 text-sm text-muted-foreground">
          Project evidence will be listed here once supplied: {PROJECTS.map((p) => p.title).join(", ")}.
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof values, string>>>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof values) => (e: { target: { value: string } }) => setValues({ ...values, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (values.name.trim().length < 2) err.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) err.email = "Please enter a valid email address.";
    if (values.subject.trim().length < 3) err.subject = "Please add a subject.";
    if (values.message.trim().length < 10) err.message = "Please write a message of at least 10 characters.";
    setErrors(err);
    if (Object.keys(err).length) return;
    const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field = (k: keyof typeof values, label: string, el: ReactNode) => (
    <div className="space-y-1.5">
      <Label htmlFor={`c-${k}`}>{label}</Label>
      {el}
      {errors[k] && <p id={`c-${k}-err`} className="text-xs text-destructive">{errors[k]}</p>}
    </div>
  );
  const aria = (k: keyof typeof values) => ({ id: `c-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `c-${k}-err` : undefined });

  return (
    <form onSubmit={submit} noValidate className="no-print space-y-4 rounded-lg border bg-card p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {field("name", "Full name", <Input {...aria("name")} value={values.name} onChange={set("name")} autoComplete="name" />)}
        {field("email", "Email address", <Input {...aria("email")} type="email" value={values.email} onChange={set("email")} autoComplete="email" />)}
      </div>
      {field("subject", "Subject", <Input {...aria("subject")} value={values.subject} onChange={set("subject")} />)}
      {field("message", "Message", <Textarea {...aria("message")} rows={5} value={values.message} onChange={set("message")} />)}
      <Button type="submit" size="lg"><Send className="h-4 w-4" />Send message</Button>
      <p className="text-xs text-muted-foreground">Sending opens your email app with the message ready to send.</p>
      {sent && <p role="status" className="flex items-center gap-2 text-sm text-teal"><CheckCircle2 className="h-4 w-4" />Your email app should now be open — press send there to deliver the message.</p>}
    </form>
  );
}
