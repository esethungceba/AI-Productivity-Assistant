import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/AppShell";
import { AiOutput, FieldLabel } from "@/components/AiOutput";
import { useAiStream } from "@/lib/use-ai-stream";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/research")({
  head: () => pageMeta("AI Research Assistant", "Practical, clearly-labelled business research for SparkleCore Cleaning Services management."),
  component: ResearchPage,
});

const EXAMPLES = [
  "How can SparkleCore improve customer satisfaction?",
  "How can a small cleaning company reduce employee turnover?",
  "What should we consider before expanding into office cleaning?",
  "How can we reduce travel time between jobs in Johannesburg?",
];

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const ai = useAiStream("research");

  const generate = async (t = topic) => {
    if (!t.trim()) {
      toast.error("Please provide the required information before generating a result. Enter a research question.");
      return;
    }
    const ok = await ai.run(`Research question: ${t.trim()}\n\nBusiness information provided by the user: ${context.trim() || "None provided"}`);
    if (ok) toast.success("Research ready — verify flagged items.");
  };

  return (
    <>
      <PageHeader icon={Search} title="AI Research Assistant" description="Ask a business question. The AI separates your information, its recommendations, and facts that need checking." />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="space-y-4 rounded-2xl border bg-card p-5 shadow-card">
          <div><FieldLabel>Research question</FieldLabel><Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. How can we improve customer satisfaction?" onKeyDown={(e) => e.key === "Enter" && generate()} /></div>
          <div><FieldLabel hint="optional">Extra business context</FieldLabel><Textarea rows={4} value={context} onChange={(e) => setContext(e.target.value)} placeholder="e.g. We have 4 cleaners and 30 regular home clients." /></div>
          <Button className="w-full" size="lg" onClick={() => generate()} disabled={ai.loading}><Wand2 className="h-4 w-4" /> {ai.loading ? "Researching…" : "Research Topic"}</Button>
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Try an example:</p>
            <div className="flex flex-col gap-2">
              {EXAMPLES.map((e) => (
                <button key={e} onClick={() => { setTopic(e); generate(e); }} className="rounded-lg border px-3 py-2 text-left text-sm transition hover:border-primary/50 hover:bg-accent">{e}</button>
              ))}
            </div>
          </div>
        </div>
        <AiOutput output={ai.output} loading={ai.loading} error={ai.error} emptyText="Your research summary and recommendations will appear here." />
      </div>
    </>
  );
}
