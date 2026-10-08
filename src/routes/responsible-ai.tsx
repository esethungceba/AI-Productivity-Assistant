import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Target, Lock, Eye, Scale, Ban, Gavel } from "lucide-react";
import { PageHeader } from "@/components/AppShell";
import { Disclaimer } from "@/components/AiOutput";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/responsible-ai")({
  head: () => pageMeta("Responsible AI", "How SparkleCore uses AI responsibly: accuracy, privacy, human review, bias and management decisions."),
  component: ResponsiblePage,
});

const ITEMS = [
  { icon: Target, title: "Accuracy", text: "AI-generated information should be checked before important business decisions are made." },
  { icon: Lock, title: "Privacy", text: "Do not enter unnecessary confidential or sensitive client information (ID numbers, banking details, alarm codes). Client contact details are masked in this app." },
  { icon: Eye, title: "Human Review", text: "Emails, schedules and recommendations must be reviewed by a staff member before being used or sent." },
  { icon: Scale, title: "Bias", text: "AI recommendations may contain bias or assumptions and should be evaluated fairly, especially where people are affected." },
  { icon: Ban, title: "No fabricated information", text: "The system is instructed never to invent client details, prices, dates, policies or business commitments. Missing details are flagged instead." },
];

const DECISIONS = ["Employees", "Client disputes", "Pricing", "Contracts", "Legal matters", "Financial decisions", "Safety issues"];

function ResponsiblePage() {
  return (
    <>
      <PageHeader icon={ShieldCheck} title="Responsible AI" description="AI is an assistant. It supports SparkleCore staff but does not replace human judgement." />
      <div className="mb-6"><Disclaimer /></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ITEMS.map((i) => (
          <div key={i.title} className="rounded-2xl border bg-card p-5 shadow-card">
            <i.icon className="h-6 w-6 text-primary" />
            <h2 className="mt-3 font-bold">{i.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{i.text}</p>
          </div>
        ))}
        <div className="rounded-2xl border bg-soft p-5 shadow-card">
          <Gavel className="h-6 w-6 text-primary" />
          <h2 className="mt-3 font-bold">Important decisions</h2>
          <p className="mt-1 text-sm text-muted-foreground">Management must make the final decision regarding:</p>
          <ul className="mt-2 grid grid-cols-2 gap-1 text-sm font-medium">{DECISIONS.map((d) => <li key={d}>• {d}</li>)}</ul>
        </div>
      </div>
    </>
  );
}
