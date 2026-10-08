import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock, Plus, Trash2, Wand2, FlaskConical } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/AppShell";
import { AiOutput, FieldLabel } from "@/components/AiOutput";
import { useAiStream } from "@/lib/use-ai-stream";
import { SERVICES } from "@/lib/demo-data";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/scheduler")({
  head: () => pageMeta("AI Cleaning Scheduler", "Plan realistic daily cleaning schedules, assign cleaners and detect conflicts with AI."),
  component: SchedulerPage,
});

type JobRow = { client: string; location: string; service: string; duration: string; priority: string; time: string; notes: string };
type Cleaner = { name: string; available: boolean };

const empty: JobRow = { client: "", location: "", service: "Standard Home Cleaning", duration: "3", priority: "Medium", time: "", notes: "" };

const DEMO_JOBS: JobRow[] = [
  { client: "Sarah Williams", location: "Cape Town CBD", service: "Standard Home Cleaning", duration: "3", priority: "High", time: "08:00", notes: "Pet-friendly products" },
  { client: "David Jacobs", location: "Observatory", service: "Deep Cleaning", duration: "4", priority: "Medium", time: "", notes: "Kitchen & bathrooms" },
  { client: "Cape Town Office Solutions", location: "City Bowl", service: "Office Cleaning", duration: "3", priority: "High", time: "", notes: "Must finish by 16:00" },
  { client: "Fatima Abrahams", location: "Woodstock", service: "Move-out Cleaning", duration: "6", priority: "High", time: "09:00", notes: "Agent inspection at 15:00" },
  { client: "Michael van der Merwe", location: "Rondebosch", service: "Standard Home Cleaning", duration: "2", priority: "Low", time: "14:00", notes: "" },
];

const sel = "h-9 w-full rounded-md border border-input bg-background px-2 text-sm";

function SchedulerPage() {
  const [date, setDate] = useState("2026-10-10");
  const [cleaners, setCleaners] = useState<Cleaner[]>([{ name: "Thandi", available: true }, { name: "Lerato", available: true }]);
  const [jobs, setJobs] = useState<JobRow[]>([{ ...empty }]);
  const [requirements, setRequirements] = useState("");
  const ai = useAiStream("schedule");

  const updJob = (i: number, k: keyof JobRow, v: string) => setJobs((js) => js.map((j, idx) => (idx === i ? { ...j, [k]: v } : j)));

  const loadDemo = () => {
    setDate("2026-10-10");
    setCleaners([{ name: "Thandi", available: true }, { name: "Lerato", available: true }, { name: "Nomsa", available: true }, { name: "Ayanda", available: false }]);
    setJobs(DEMO_JOBS);
    setRequirements("Thandi must finish by 16:00 for training.");
  };

  const generate = async () => {
    const validJobs = jobs.filter((j) => j.client.trim() && j.location.trim());
    const avail = cleaners.filter((c) => c.name.trim());
    if (!date || !validJobs.length || !avail.length) {
      toast.error("Please provide the required information before generating a result. Add a date, at least one job (client + location) and one cleaner.");
      return;
    }
    const prompt = `Date: ${date}
Number of cleaning jobs: ${validJobs.length}
Cleaners (${avail.filter((c) => c.available).length} available):
${avail.map((c) => `- ${c.name}: ${c.available ? "Available" : "UNAVAILABLE"}`).join("\n")}

Jobs:
${validJobs.map((j, i) => `Job ${i + 1}: Client: ${j.client}; Location: ${j.location}; Service: ${j.service}; Estimated duration: ${j.duration} hours; Priority: ${j.priority}; Preferred start: ${j.time || "flexible"}; Notes: ${j.notes || "none"}`).join("\n")}

Special requirements: ${requirements.trim() || "None"}`;
    const ok = await ai.run(prompt);
    if (ok) toast.success("Schedule created — please review the warnings.");
  };

  return (
    <>
      <PageHeader icon={CalendarClock} title="AI Cleaning Scheduler" description="Enter your cleaning jobs and available cleaners, then click Generate Schedule."
        actions={<Button variant="outline" onClick={loadDemo}><FlaskConical className="h-4 w-4" /> Load demo (5 jobs, 3 cleaners)</Button>} />
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 rounded-2xl border bg-card p-5 shadow-card">
            <div><FieldLabel>Date</FieldLabel><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
            <div>
              <FieldLabel hint="toggle availability">Cleaners</FieldLabel>
              <div className="space-y-2">
                {cleaners.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input value={c.name} placeholder="Cleaner name" onChange={(e) => setCleaners((cs) => cs.map((x, idx) => (idx === i ? { ...x, name: e.target.value } : x)))} />
                    <Switch checked={c.available} onCheckedChange={(v) => setCleaners((cs) => cs.map((x, idx) => (idx === i ? { ...x, available: v } : x)))} aria-label="Available" />
                    <Button variant="ghost" size="icon" onClick={() => setCleaners((cs) => cs.filter((_, idx) => idx !== i))} aria-label="Remove cleaner"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setCleaners((cs) => [...cs, { name: "", available: true }])}><Plus className="h-4 w-4" /> Add cleaner</Button>
              </div>
            </div>
            <div><FieldLabel>Special client requirements</FieldLabel><Textarea rows={3} value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="e.g. Office must be cleaned after 17:00" /></div>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-card lg:col-span-2">
            <div className="mb-3 flex items-center justify-between"><h2 className="font-bold">Cleaning jobs ({jobs.length})</h2>
              <Button variant="outline" size="sm" onClick={() => setJobs((js) => [...js, { ...empty }])}><Plus className="h-4 w-4" /> Add job</Button></div>
            <div className="space-y-3">
              {jobs.map((j, i) => (
                <div key={i} className="grid gap-2 rounded-xl border bg-muted/40 p-3 sm:grid-cols-2 md:grid-cols-6">
                  <Input className="md:col-span-2" placeholder="Client" value={j.client} onChange={(e) => updJob(i, "client", e.target.value)} />
                  <Input className="md:col-span-2" placeholder="Location (e.g. Observatory)" value={j.location} onChange={(e) => updJob(i, "location", e.target.value)} />
                  <select className={`${sel} md:col-span-2`} value={j.service} onChange={(e) => updJob(i, "service", e.target.value)}>{SERVICES.map((s) => <option key={s}>{s}</option>)}</select>
                  <Input type="number" min="0.5" step="0.5" placeholder="Hours" value={j.duration} onChange={(e) => updJob(i, "duration", e.target.value)} />
                  <select className={sel} value={j.priority} onChange={(e) => updJob(i, "priority", e.target.value)}>{["High", "Medium", "Low"].map((p) => <option key={p}>{p}</option>)}</select>
                  <Input type="time" value={j.time} onChange={(e) => updJob(i, "time", e.target.value)} title="Preferred start (optional)" />
                  <Input className="md:col-span-2" placeholder="Notes" value={j.notes} onChange={(e) => updJob(i, "notes", e.target.value)} />
                  <Button variant="ghost" size="icon" onClick={() => setJobs((js) => js.filter((_, idx) => idx !== i))} aria-label="Remove job"><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full" size="lg" onClick={generate} disabled={ai.loading}><Wand2 className="h-4 w-4" /> {ai.loading ? "Building schedule…" : "Generate Schedule"}</Button>
          </div>
        </div>
        <AiOutput output={ai.output} loading={ai.loading} error={ai.error} emptyText="Your timetable, conflict warnings and recommendations will appear here." />
      </div>
    </>
  );
}
