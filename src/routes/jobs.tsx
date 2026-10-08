import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ClipboardList, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/AppShell";
import { StatusBadge, DemoTag } from "@/components/StatusBadge";
import { JOBS, CLEANERS, SERVICES, formatDate } from "@/lib/demo-data";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/jobs")({
  head: () => pageMeta("Cleaning Job Management", "Filter and manage SparkleCore cleaning jobs by date, cleaner, status, priority and service."),
  component: JobsPage,
});

const sel = "h-9 rounded-md border border-input bg-background px-2 text-sm";

function JobsPage() {
  const [date, setDate] = useState("");
  const [cleaner, setCleaner] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [service, setService] = useState("");

  const list = useMemo(() => JOBS.filter((j) =>
    (!date || j.date === date) && (!cleaner || j.cleaner === cleaner) && (!status || j.status === status) &&
    (!priority || j.priority === priority) && (!service || j.service === service),
  ), [date, cleaner, status, priority, service]);

  const clear = () => { setDate(""); setCleaner(""); setStatus(""); setPriority(""); setService(""); };

  return (
    <>
      <PageHeader icon={ClipboardList} title="Cleaning Tasks" description="All cleaning jobs. Use the filters to find jobs by date, cleaner, status, priority or service." />
      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border bg-card p-3 shadow-card">
        <Input type="date" className="h-9 w-auto" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Date" />
        <select className={sel} value={cleaner} onChange={(e) => setCleaner(e.target.value)} aria-label="Cleaner"><option value="">All cleaners</option>{CLEANERS.map((c) => <option key={c.name}>{c.name}</option>)}</select>
        <select className={sel} value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status"><option value="">All statuses</option>{["Scheduled", "In Progress", "Completed", "Delayed", "Cancelled"].map((s) => <option key={s}>{s}</option>)}</select>
        <select className={sel} value={priority} onChange={(e) => setPriority(e.target.value)} aria-label="Priority"><option value="">All priorities</option>{["High", "Medium", "Low"].map((s) => <option key={s}>{s}</option>)}</select>
        <select className={sel} value={service} onChange={(e) => setService(e.target.value)} aria-label="Service"><option value="">All services</option>{SERVICES.map((s) => <option key={s}>{s}</option>)}</select>
        <Button variant="ghost" size="sm" onClick={clear}><RotateCcw className="h-4 w-4" /> Clear</Button>
        <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">{list.length} jobs <DemoTag /></div>
      </div>
      <div className="overflow-x-auto rounded-2xl border bg-card shadow-card">
        <table className="w-full min-w-[960px] text-sm">
          <thead className="bg-secondary text-left text-xs uppercase tracking-wide text-secondary-foreground">
            <tr>{["Job #", "Client", "Location", "Service", "Date", "Time", "Cleaner", "Duration", "Priority", "Status", "Notes"].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y">
            {list.map((j) => (
              <tr key={j.id} className="hover:bg-muted/50">
                <td className="px-4 py-3 font-mono text-xs">{j.id}</td>
                <td className="px-4 py-3 font-medium">{j.client}</td>
                <td className="px-4 py-3">{j.location}</td>
                <td className="px-4 py-3">{j.service}</td>
                <td className="px-4 py-3 whitespace-nowrap">{formatDate(j.date)}</td>
                <td className="px-4 py-3">{j.time}</td>
                <td className="px-4 py-3">{j.cleaner}</td>
                <td className="px-4 py-3">{j.duration} h</td>
                <td className="px-4 py-3"><StatusBadge value={j.priority} /></td>
                <td className="px-4 py-3"><StatusBadge value={j.status} /></td>
                <td className="max-w-[220px] px-4 py-3 text-muted-foreground">{j.notes || "—"}</td>
              </tr>
            ))}
            {!list.length && <tr><td colSpan={11} className="py-10 text-center text-muted-foreground">No jobs match these filters. Try clearing them.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
