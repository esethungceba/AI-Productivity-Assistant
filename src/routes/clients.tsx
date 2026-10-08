import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Users, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/AppShell";
import { StatusBadge, DemoTag } from "@/components/StatusBadge";
import { CLIENTS } from "@/lib/demo-data";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/clients")({
  head: () => pageMeta("Client Information", "SparkleCore client list with services, booking dates, frequency and status."),
  component: ClientsPage,
});

const STATUSES = ["All", "New", "Active", "Pending", "Completed", "Cancelled"];

function ClientsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const list = CLIENTS.filter((c) => (status === "All" || c.status === status) && (c.name + c.location + c.service).toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHeader icon={Users} title="Client Information" description="Basic client records. Contact details are partly hidden to protect client privacy." />
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input className="sm:max-w-xs" placeholder="Search clients…" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => <button key={s} onClick={() => setStatus(s)} className={`rounded-full border px-3 py-1 text-sm ${status === s ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50"}`}>{s}</button>)}
        </div>
        <div className="sm:ml-auto"><DemoTag /></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((c) => (
          <div key={c.id} className="rounded-2xl border bg-card p-5 shadow-card">
            <div className="flex items-start justify-between gap-2">
              <div><div className="font-display font-bold">{c.name}</div><div className="text-xs text-muted-foreground">{c.id} · {c.location}</div></div>
              <StatusBadge value={c.status} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-xs text-muted-foreground">Service</dt><dd className="font-medium">{c.service}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Booking date</dt><dd className="font-medium">{c.bookingDate}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Frequency</dt><dd className="font-medium">{c.frequency}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Special requirements</dt><dd className="font-medium">{c.requirements}</dd></div>
              <div className="col-span-2"><dt className="flex items-center gap-1 text-xs text-muted-foreground"><Lock className="h-3 w-3" /> Contact (masked)</dt><dd className="font-medium">{c.contact}</dd></div>
            </dl>
          </div>
        ))}
        {!list.length && <p className="col-span-full py-10 text-center text-sm text-muted-foreground">No clients match your filters.</p>}
      </div>
    </>
  );
}
