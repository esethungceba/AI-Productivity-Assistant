import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, Plus, Trash2, Copy, Droplets, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/AppShell";
import { Markdown, copyText, Disclaimer } from "@/components/AiOutput";
import { streamAi, type ChatMsg } from "@/lib/use-ai-stream";
import { recordTimeSaved } from "@/lib/time-saved";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/chat")({
  head: () => pageMeta("SparkleCore AI Assistant", "Chat with the SparkleCore AI Assistant for help with schedules, emails, complaints and daily operations."),
  component: ChatPage,
});

const KEY = "sparklecore-chat";
const SUGGESTIONS = [
  "Help me plan tomorrow's cleaning operations.",
  "Write an email to a client whose appointment needs to be moved.",
  "What should we consider before accepting five new cleaning jobs?",
  "Help me prioritise today's cleaning tasks.",
  "Create a professional response to a customer complaint.",
];

function ChatPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try { setMessages(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ }
    inputRef.current?.focus();
  }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const save = (m: ChatMsg[]) => { setMessages(m); localStorage.setItem(KEY, JSON.stringify(m)); };

  const send = async (text = input) => {
    if (!text.trim() || loading) return;
    const history: ChatMsg[] = [...messages, { role: "user", content: text.trim() }];
    save(history);
    setInput("");
    setError(null);
    setLoading(true);
    const ac = new AbortController();
    abortRef.current = ac;
    let reply = "";
    try {
      reply = await streamAi("chat", history, (full) => {
        reply = full;
        setMessages([...history, { role: "assistant", content: full }]);
      }, ac.signal);
      save([...history, { role: "assistant", content: reply }]);
      recordTimeSaved("chat");
    } catch (e) {
      if (ac.signal.aborted) save(reply ? [...history, { role: "assistant", content: reply + "\n\n_(stopped)_" }] : history);
      else { setError((e as Error).message); save(reply ? [...history, { role: "assistant", content: reply }] : history); }
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const reset = () => { abortRef.current?.abort(); save([]); setError(null); inputRef.current?.focus(); };
  const waiting = loading && messages[messages.length - 1]?.role === "user";

  return (
    <>
      <PageHeader icon={MessageSquare} title="SparkleCore AI Assistant" description="Ask for help with any workplace task. The assistant remembers this conversation (saved in this browser)."
        actions={<div className="flex gap-2">
          <Button variant="outline" onClick={reset}><Plus className="h-4 w-4" /> New conversation</Button>
          <Button variant="ghost" onClick={reset} disabled={!messages.length}><Trash2 className="h-4 w-4" /> Clear chat</Button>
        </div>} />
      <div className="flex h-[calc(100vh-14rem)] min-h-[480px] flex-col rounded-2xl border bg-card shadow-card">
        <div className="flex-1 space-y-5 overflow-y-auto p-4 md:p-6">
          {!messages.length && (
            <div className="mx-auto max-w-xl py-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-primary-foreground"><Droplets className="h-7 w-7" /></div>
              <h2 className="mt-4 text-lg font-bold">How can I help today?</h2>
              <p className="text-sm text-muted-foreground">Pick a suggestion or type your own question below.</p>
              <div className="mt-5 flex flex-col gap-2">
                {SUGGESTIONS.map((s) => <button key={s} onClick={() => send(s)} className="rounded-lg border px-3 py-2 text-left text-sm transition hover:border-primary/50 hover:bg-accent">{s}</button>)}
              </div>
            </div>
          )}
          {messages.map((m, i) => m.role === "user" ? (
            <div key={i} className="flex justify-end"><div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">{m.content}</div></div>
          ) : (
            <div key={i} className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary"><Droplets className="h-4 w-4" /></div>
              <div className="min-w-0 flex-1">
                <Markdown>{m.content}</Markdown>
                {!(loading && i === messages.length - 1) && (
                  <Button size="sm" variant="ghost" className="mt-1 h-7 px-2 text-xs text-muted-foreground" onClick={() => copyText(m.content)}><Copy className="h-3 w-3" /> Copy response</Button>
                )}
              </div>
            </div>
          ))}
          {waiting && (
            <div className="flex gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary"><Droplets className="h-4 w-4" /></div>
              <div className="flex items-center gap-1 pt-2">{[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: `${d * 150}ms` }} />)}</div></div>
          )}
          {error && <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
          <div ref={endRef} />
        </div>
        <div className="space-y-2 border-t p-3 md:p-4">
          <div className="flex items-end gap-2">
            <Textarea ref={inputRef} rows={2} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question… (Enter to send, Shift+Enter for new line)" className="min-h-[52px] resize-none"
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
            {loading
              ? <Button size="icon" variant="outline" className="h-[52px] w-[52px]" onClick={() => abortRef.current?.abort()} aria-label="Stop"><Square className="h-4 w-4" /></Button>
              : <Button size="icon" className="h-[52px] w-[52px]" onClick={() => send()} disabled={!input.trim()} aria-label="Send"><Send className="h-4 w-4" /></Button>}
          </div>
          <Disclaimer />
        </div>
      </div>
    </>
  );
}
