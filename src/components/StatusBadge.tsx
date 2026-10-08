const STYLES: Record<string, string> = {
  Scheduled: "bg-info/15 text-info",
  "In Progress": "bg-primary/15 text-primary",
  Completed: "bg-success/15 text-success",
  Delayed: "bg-warning/20 text-warning-foreground",
  Cancelled: "bg-destructive/10 text-destructive",
  New: "bg-info/15 text-info",
  Active: "bg-success/15 text-success",
  Pending: "bg-warning/20 text-warning-foreground",
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/20 text-warning-foreground",
  Low: "bg-muted text-muted-foreground",
};

export function StatusBadge({ value }: { value: string }) {
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${STYLES[value] ?? "bg-muted"}`}>
      {value}
    </span>
  );
}

export function DemoTag() {
  return (
    <span className="inline-flex items-center rounded-full border border-dashed border-primary/50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
      Demo data
    </span>
  );
}
