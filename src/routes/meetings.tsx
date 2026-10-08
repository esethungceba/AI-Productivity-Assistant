import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NotebookPen, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/AppShell";
import { AiOutput, FieldLabel } from "@/components/AiOutput";
import { useAiStream } from "@/lib/use-ai-stream";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/meetings")({
  head: () => pageMeta("Meeting Notes Summarizer", "Turn SparkleCore meeting notes into summaries, decisions and action items with AI."),
  component: MeetingsPage,
});

function MeetingsPage() {
  const [notes, setNotes] = useState("");
  const ai = useAiStream("meeting");

  const generate = async () => {
    if (notes.trim().length < 20) {
      toast.error("Please provide the required information before generating a result. Paste your meeting notes first.");
      return;
    }
    const ok = await ai.run(`Meeting notes:\n"""\n${notes.trim()}\n"""`);
    if (ok) toast.success("Summary ready — check names and deadlines.");
  };

  return (
    <>
      <PageHeader icon={NotebookPen} title="Meeting Notes Summarizer" description="Meeting records and action items" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border bg-card p-5 shadow-card">
          <FieldLabel hint="rough notes are fine">Meeting notes</FieldLabel>
          <Textarea rows={18} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Paste your meeting notes here…" />
          <Button className="w-full" size="lg" onClick={generate} disabled={ai.loading}><Wand2 className="h-4 w-4" /> {ai.loading ? "Summarising…" : "Summarise Meeting"}</Button>
          <p className="text-xs text-muted-foreground">Anything not in your notes is shown as "Not specified".</p>
        </div>
        <AiOutput output={ai.output} loading={ai.loading} error={ai.error} emptyText="Your summary, decisions and action items will appear here." />
      </div>
    </>
  );
}
