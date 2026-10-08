import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AlertTriangle, Copy, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="ai-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  } catch {
    toast.error("Could not copy. Please select and copy manually.");
  }
}

export function Disclaimer() {
  return (
    <div className="flex gap-2 rounded-lg border border-warning/40 bg-warning/10 p-3 text-xs text-warning-foreground">
      <ShieldCheck className="h-4 w-4 shrink-0" />
      <span>
        AI-generated content is provided as an assistance tool. Always verify important information and review outputs
        before making business or client-related decisions.
      </span>
    </div>
  );
}

export function AiOutput({
  output, loading, error, emptyText, actions, children,
}: {
  output: string; loading: boolean; error: string | null; emptyText: string; actions?: ReactNode; children?: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border bg-card shadow-card">
      <div className="flex items-center justify-between gap-2 border-b px-5 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-primary" /> AI Result
          {loading && (
            <span className="flex items-center gap-1 text-xs font-normal text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> Generating & validating…
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {output && !loading && (
            <Button size="sm" variant="outline" onClick={() => copyText(output)}>
              <Copy className="h-3.5 w-3.5" /> Copy
            </Button>
          )}
          {actions}
        </div>
      </div>
      <div className="flex-1 p-5">
        {error && (
          <div className="mb-4 flex gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}
        {children ?? (output ? (
          <Markdown>{output}</Markdown>
        ) : loading ? (
          <div className="space-y-3">
            {[80, 95, 70, 88].map((w) => (
              <div key={w} className="h-3 animate-pulse rounded bg-muted" style={{ width: `${w}%` }} />
            ))}
          </div>
        ) : (
          !error && <p className="py-10 text-center text-sm text-muted-foreground">{emptyText}</p>
        ))}
      </div>
      {output && !loading && (
        <div className="space-y-2 border-t px-5 py-3">
          <p className="text-xs font-medium text-muted-foreground">✔ Human review required — please check this result before using it.</p>
          <Disclaimer />
        </div>
      )}
    </div>
  );
}

export function FieldLabel({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <label className="mb-1.5 block text-sm font-medium">
      {children}
      {hint && <span className="ml-1 font-normal text-muted-foreground">— {hint}</span>}
    </label>
  );
}
