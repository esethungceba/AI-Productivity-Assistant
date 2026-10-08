import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CalendarCheck, ClipboardList, CheckCircle2, Mail, Clock, CalendarClock, NotebookPen, Search,
  MessageSquare, ArrowRight, MapPin, User, Timer,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { JOBS, formatDate, type Job } from "@/lib/demo-data";
import { StatusBadge, DemoTag } from "@/components/StatusBadge";
import { getTimeSaved, formatMinutes, BASELINE_MINUTES } from "@/lib/time-saved";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageMeta("Dashboard", "Overview of today's cleaning jobs, tasks, communications and AI time savings for SparkleCore Cleaning Services."),
  component: Dashboard,
});

const STATS = [
  { label: "Today's Cleaning Jobs", value: "8", sub: "jobs scheduled", icon: CalendarCheck },
  { label: "Pending Tasks", value: "5", sub: "tasks requiring attention", icon: ClipboardList },
  { label: "Completed Jobs", value: "12", sub: "completed this week", icon: CheckCircle2 },
  { label: "Client Communications", value: "4", sub: "emails requiring responses", icon: Mail },
];

const TOOLS = [
  { to: "/email", label: "Write a client email", icon: Mail, desc: "Professional emails in seconds" },
  { to: "/scheduler", label: "Plan cleaning schedule", icon: CalendarClock, desc: "Assign cleaners, avoid clashes" },
  { to: "/meetings", label: "Summarise a meeting", icon: NotebookPen, desc: "Decisions & action items" },
  { to: "/research", label: "Research a question", icon: Search, desc: "Practical business insight" },
  { to: "/chat", label: "Ask the AI Assistant", icon: MessageSquare, desc: "Help with any workplace task" },
] as const;

const SAVINGS = [
  "Faster client email preparation",
  "Easier cleaning scheduling",
  "Faster meeting summaries",
  "Improved task prioritisation",
  "Faster workplace research",
  "Reduced repetitive administrative work",
];

function Dashboard() {
  const [selected, setSelected] = useState<Job | null>(null);
  const [minutes, setMinutes] = useState(BASELINE_MINUTES);
  useEffect(() => setMinutes(getTimeSaved().minutes), []);
  const upcoming = JOBS.filter((j) => j.status === "Scheduled").sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl bg-brand p-6 text-primary-foreground shadow-card md:p-8">
        <p className="text-sm font-medium opacity-90">Good day, Zanele</p>
        <h1 className="mt-1 text-2xl font-bold md:text-3xl">Smarter Operations. Cleaner Spaces.</h1>
        <p className="mt-2 max-w-xl text-sm opacity-90">
          Choose a workplace task below. Enter your details, let the AI prepare a draft, then review and use it.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {TOOLS.map((t) => (
            <Link key={t.to} to={t.to} className="inline-flex items-center gap-2 rounded-full bg-card/15 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-card/25">
              <t.icon className="h-4 w-4" /> {t.label}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2"><h2 className="text-lg font-bold">Operations overview</h2><DemoTag /></div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-3 font-display text-3xl font-bold">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border bg-card shadow-card xl:col-span-2">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div className="flex items-center gap-2"><h2 className="font-bold">Upcoming Jobs</h2><DemoTag /></div>
            <Link to="/jobs" className="flex items-center gap-1 text-sm font-medium text-primary">View all <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <ul className="divide-y">
            {upcoming.map((j) => (
              <li key={j.id}>
                <button onClick={() => setSelected(j)} className="grid w-full grid-cols-2 gap-2 px-5 py-4 text-left transition hover:bg-muted/60 md:grid-cols-[1.4fr_1fr_1.2fr_1fr_auto] md:items-center">
                  <div>
                    <div className="font-semibold">{j.client}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{j.location}</div>
                  </div>
                  <div className="text-sm">{j.service}</div>
                  <div className="text-sm text-muted-foreground">{formatDate(j.date)} · {j.time}</div>
                  <div className="flex items-center gap-1 text-sm"><User className="h-3.5 w-3.5 text-muted-foreground" />{j.cleaner}</div>
                  <StatusBadge value={j.status} />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border bg-soft p-5 shadow-card">
          <h2 className="font-bold">How SparkleCore AI Saves Time</h2>
          <div className="mt-4 rounded-xl bg-card p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Timer className="h-4 w-4 text-primary" /> Estimated time saved this week</div>
            <div className="mt-1 font-display text-2xl font-bold text-secondary-foreground">{formatMinutes(minutes)}</div>
            <p className="mt-1 text-xs text-muted-foreground">An estimate based on typical task times, not a guaranteed measurement. Increases each time you complete an AI task.</p>
          </div>
          <ul className="mt-4 space-y-2">
            {SAVINGS.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 shrink-0 text-success" />{s}</li>
            ))}
          </ul>
        </section>
      </div>

      <section>
        <h2 className="mb-3 text-lg font-bold">AI workplace tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TOOLS.map((t) => (
            <Link key={t.to} to={t.to} className="group rounded-2xl border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-primary/50">
              <t.icon className="h-6 w-6 text-primary" />
              <div className="mt-3 font-semibold">{t.label}</div>
              <div className="text-sm text-muted-foreground">{t.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.client}</DialogTitle>
                <DialogDescription>Job {selected.id} · Demo data</DialogDescription>
              </DialogHeader>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Area", selected.location], ["Service", selected.service], ["Date", formatDate(selected.date)],
                  ["Time", selected.time], ["Cleaner", selected.cleaner], ["Duration", `${selected.duration} hours`],
                  ["Priority", selected.priority],
                ].map(([k, v]) => (
                  <div key={k}><dt className="text-xs text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>
                ))}
                <div><dt className="text-xs text-muted-foreground">Status</dt><dd><StatusBadge value={selected.status} /></dd></div>
                <div className="col-span-2"><dt className="text-xs text-muted-foreground">Notes</dt><dd>{selected.notes || "None"}</dd></div>
              </dl>
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" />Need to reschedule? Use the Email Generator to notify the client.</div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
