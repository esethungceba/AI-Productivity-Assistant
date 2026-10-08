import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Wand2, RefreshCw, Pencil, Check, FlaskConical } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/AppShell";
import { AiOutput, FieldLabel } from "@/components/AiOutput";
import { useAiStream } from "@/lib/use-ai-stream";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/email")({
  head: () => pageMeta("Smart Email Generator", "Generate professional client and workplace emails for SparkleCore Cleaning Services with AI."),
  component: EmailPage,
});

const RECIPIENTS = ["Client", "Manager", "Employee", "Supplier", "Institution", "Office Client"];
const PURPOSES = ["Booking confirmation", "Appointment reminder", "Cleaning quotation", "Cleaning completed", "Rescheduling", "Cancellation", "Late arrival", "Customer complaint response", "Follow-up", "Payment reminder", "Thank-you email", "General enquiry"];
const TONES = ["Formal", "Professional", "Friendly", "Persuasive", "Apologetic"];

function EmailPage() {
  const [recipient, setRecipient] = useState("Client");
  const [purpose, setPurpose] = useState("Rescheduling");
  const [tone, setTone] = useState("Professional");
  const [info, setInfo] = useState("");
  const [editing, setEditing] = useState(false);
  const ai = useAiStream("email");

  const generate = async (t = tone) => {
    if (!info.trim()) {
      toast.error("Please provide the required information before generating a result.");
      return;
    }
    setEditing(false);
    const ok = await ai.run(
      `Recipient type: ${recipient}\nEmail purpose: ${purpose}\nTone: ${t}\nImportant information supplied by the user:\n"""\n${info.trim()}\n"""`,
    );
    if (ok) toast.success("Email generated — please review before sending.");
  };

  const loadDemo = () => {
    setRecipient("Client");
    setPurpose("Rescheduling");
    setTone("Apologetic");
    setInfo("A client needs to move tomorrow's cleaning appointment from 09:00 to 14:00 because the cleaner is unavailable.");
  };

  return (
    <>
      <PageHeader icon={Mail} title="Smart Email Generator" description="Choose who the email is for, what it's about and the tone. Add the key details, then click Generate Email."
        actions={<Button variant="outline" onClick={loadDemo}><FlaskConical className="h-4 w-4" /> Load demo</Button>} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="space-y-4 rounded-2xl border bg-card p-5 shadow-card">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div><FieldLabel>Recipient type</FieldLabel>
              <Select value={recipient} onValueChange={setRecipient}><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{RECIPIENTS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select></div>
            <div><FieldLabel>Email purpose</FieldLabel>
              <Select value={purpose} onValueChange={setPurpose}><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{PURPOSES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select></div>
          </div>
          <div><FieldLabel hint="names, dates, times, reasons">Important information</FieldLabel>
            <Textarea rows={8} value={info} onChange={(e) => setInfo(e.target.value)} placeholder="e.g. Sarah Williams' deep clean on 10 October at 09:00 must move to 14:00 because Thandi is unavailable." /></div>
          <div><FieldLabel>Tone</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button key={t} onClick={() => setTone(t)} className={`rounded-full border px-3 py-1.5 text-sm transition ${tone === t ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50"}`}>{t}</button>
              ))}
            </div></div>
          <Button className="w-full" size="lg" onClick={() => generate()} disabled={ai.loading}><Wand2 className="h-4 w-4" /> {ai.loading ? "Generating…" : "Generate Email"}</Button>
          <p className="text-xs text-muted-foreground">The AI only uses the details you provide. Missing details are flagged, not invented.</p>
        </div>

        <AiOutput output={ai.output} loading={ai.loading} error={ai.error}
          emptyText="Fill in the details on the left, then click Generate Email. Your draft will appear here."
          actions={ai.output && !ai.loading ? (
            <>
              <Button size="sm" variant="outline" onClick={() => setEditing((e) => !e)}>{editing ? <><Check className="h-3.5 w-3.5" /> Done</> : <><Pencil className="h-3.5 w-3.5" /> Edit</>}</Button>
              <Button size="sm" variant="outline" onClick={() => generate()}><RefreshCw className="h-3.5 w-3.5" /> Regenerate</Button>
              <Select value={tone} onValueChange={(t) => { setTone(t); generate(t); }}>
                <SelectTrigger className="h-8 w-[150px] text-xs"><SelectValue placeholder="Change tone" /></SelectTrigger>
                <SelectContent>{TONES.map((t) => <SelectItem key={t} value={t}>Tone: {t}</SelectItem>)}</SelectContent>
              </Select>
            </>
          ) : null}>
          {editing ? <Textarea rows={18} value={ai.output} onChange={(e) => ai.setOutput(e.target.value)} className="font-mono text-sm" /> : undefined}
        </AiOutput>
      </div>
    </>
  );
}
