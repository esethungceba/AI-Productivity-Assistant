import { createFileRoute, Link } from "@tanstack/react-router";
import { LifeBuoy, ArrowDown, Wand2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHeader } from "@/components/AppShell";
import { Markdown } from "@/components/AiOutput";
import { useAiStream } from "@/lib/use-ai-stream";
import { BASIC_PROMPT_EXAMPLE, IMPROVED_PROMPT_EXAMPLE, SYSTEM_PROMPTS } from "@/lib/prompts";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/help")({
  head: () => pageMeta("Help & About This Project", "How to use SparkleCore AI, how the AI workflow and prompt engineering work, and the project's goals."),
  component: HelpPage,
});

const FLOW = ["User input", "Context", "Structured prompt", "AI model", "Validation", "AI output", "Human review", "Final action"];
const DEMOS = [
  { to: "/email", t: "Demo 1 – Email", d: "Click “Load demo” to reschedule a 09:00 appointment to 14:00." },
  { to: "/scheduler", t: "Demo 2 – Scheduler", d: "Load 5 jobs and 3 available cleaners; the AI flags conflicts." },
  { to: "/meetings", t: "Demo 3 – Meeting notes", d: "Load sample notes to extract decisions and action items." },
  { to: "/research", t: "Demo 4 – Research", d: "Ask “How can SparkleCore improve customer satisfaction?”" },
  { to: "/chat", t: "Demo 5 – Chatbot", d: "Ask “Help me plan tomorrow's cleaning operations.”" },
] as const;

function PromptTester() {
  const basic = useAiStream("chat");
  const improved = useAiStream("email");
  const run = () => { basic.run(BASIC_PROMPT_EXAMPLE); improved.run(IMPROVED_PROMPT_EXAMPLE); };
  return (
    <section className="rounded-2xl border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h2 className="text-lg font-bold">Prompt testing</h2><p className="text-sm text-muted-foreground">Compare a basic prompt with an improved, structured prompt.</p></div>
        <Button onClick={run} disabled={basic.loading || improved.loading}><Wand2 className="h-4 w-4" /> Run both prompts</Button>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {[
          { label: "Basic prompt", icon: X, prompt: BASIC_PROMPT_EXAMPLE, s: basic, tone: "text-destructive", note: "Vague — the AI must guess the client, reason and details, or ask for them." },
          { label: "Improved prompt", icon: Check, prompt: IMPROVED_PROMPT_EXAMPLE, s: improved, tone: "text-success", note: "Role, context, task, constraints and format — a specific, controlled and usable result." },
        ].map((p) => (
          <div key={p.label} className="rounded-xl border p-4">
            <div className={`flex items-center gap-1 text-sm font-bold ${p.tone}`}><p.icon className="h-4 w-4" /> {p.label}</div>
            <p className="mt-2 rounded-lg bg-muted p-3 text-sm italic">“{p.prompt}”</p>
            <p className="mt-2 text-xs text-muted-foreground">{p.note}</p>
            <div className="mt-3 max-h-80 overflow-y-auto">
              {p.s.error ? <p className="text-sm text-destructive">{p.s.error}</p> : p.s.output ? <Markdown>{p.s.output}</Markdown> : p.s.loading ? <p className="text-sm text-muted-foreground">Generating…</p> : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HelpPage() {
  return (
    <>
      <PageHeader icon={LifeBuoy} title="Help & About This Project" description="How to use the assistant, how the AI works, and why SparkleCore built it." />
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <h2 className="text-lg font-bold">About this project</h2>
            <h3 className="mt-3 text-sm font-bold text-primary">Problem</h3>
            <p className="text-sm text-muted-foreground">Cleaning businesses spend significant time on repetitive admin such as scheduling, client communication, meeting documentation and research — time taken away from serving clients.</p>
            <h3 className="mt-3 text-sm font-bold text-primary">Solution</h3>
            <p className="text-sm text-muted-foreground">SparkleCore AI Cleaning Operations Assistant uses AI to automate and support these repetitive workplace tasks, with human review built in.</p>
            <h3 className="mt-3 text-sm font-bold text-primary">Target users</h3>
            <p className="text-sm text-muted-foreground">Business owner · Operations manager · Cleaning supervisors · Administrative employees</p>
            <h3 className="mt-3 text-sm font-bold text-primary">Expected benefits</h3>
            <p className="text-sm text-muted-foreground">Improved productivity, faster communication, better organisation, reduced repetitive work, more structured scheduling and better access to information.</p>
          </div>
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <h2 className="text-lg font-bold">Demo mode</h2>
            <p className="text-sm text-muted-foreground">Prepared examples for a quick demonstration:</p>
            <ul className="mt-3 space-y-2">
              {DEMOS.map((d) => (
                <li key={d.to}><Link to={d.to} className="block rounded-lg border p-3 transition hover:border-primary/50 hover:bg-accent"><div className="text-sm font-semibold">{d.t}</div><div className="text-xs text-muted-foreground">{d.d}</div></Link></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-5 shadow-card">
          <h2 className="text-lg font-bold">AI technology</h2>
          <p className="text-sm text-muted-foreground">Every request follows the same workflow. Prompt engineering — giving the AI a role, context, task, constraints, output format and validation step — improves the quality, relevance and consistency of results.</p>
          <div className="mt-4 flex flex-col items-center gap-1 md:flex-row md:flex-wrap md:justify-center">
            {FLOW.map((f, i) => (
              <div key={f} className="flex flex-col items-center gap-1 md:flex-row">
                <span className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide ${i === 3 ? "bg-brand text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{f}</span>
                {i < FLOW.length - 1 && <ArrowDown className="h-4 w-4 text-muted-foreground md:-rotate-90" />}
              </div>
            ))}
          </div>
        </section>

        <PromptTester />

        <section className="rounded-2xl border bg-card p-5 shadow-card">
          <h2 className="text-lg font-bold">Structured system prompts used</h2>
          <p className="text-sm text-muted-foreground">These internal instructions are sent with every request — your text is never sent to the AI on its own.</p>
          <Accordion type="single" collapsible className="mt-2">
            {Object.entries(SYSTEM_PROMPTS).map(([k, v]) => (
              <AccordionItem key={k} value={k}>
                <AccordionTrigger className="capitalize">{k === "schedule" ? "Cleaning scheduler" : k === "meeting" ? "Meeting summarizer" : k === "chat" ? "Workplace chatbot" : k === "email" ? "Email generator" : "Research assistant"}</AccordionTrigger>
                <AccordionContent><pre className="whitespace-pre-wrap rounded-lg bg-muted p-3 text-xs">{v}</pre></AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="rounded-2xl border bg-card p-5 shadow-card">
          <h2 className="text-lg font-bold">Quick help</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Choose a tool from the menu, fill in the form, then click the Generate button.</li>
            <li>Use “Load demo” on any tool to see an example instantly.</li>
            <li>Always read the result, edit it if needed, then click Copy to use it.</li>
            <li>If you see “Please provide the required information”, a required field is empty.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
