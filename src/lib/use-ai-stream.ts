import { useCallback, useRef, useState } from "react";
import type { AiTool } from "./prompts";
import { recordTimeSaved } from "./time-saved";

export type ChatMsg = { role: "user" | "assistant"; content: string };

export async function streamAi(
  tool: AiTool,
  messages: ChatMsg[],
  onText: (full: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ tool, messages }),
    signal,
  });
  if (!res.ok || !res.body) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let full = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    full += decoder.decode(value, { stream: true });
    const errIdx = full.indexOf("[[ERROR]]");
    if (errIdx >= 0) throw new Error(full.slice(errIdx + 9).trim());
    onText(full);
  }
  if (!full.trim()) throw new Error("I don't have enough information to provide a reliable recommendation. Please provide more details.");
  return full;
}

export function useAiStream(tool: AiTool) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const run = useCallback(
    async (prompt: string) => {
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;
      setLoading(true);
      setError(null);
      setOutput("");
      try {
        await streamAi(tool, [{ role: "user", content: prompt }], setOutput, ac.signal);
        recordTimeSaved(tool);
        return true;
      } catch (e) {
        if (!ac.signal.aborted) setError((e as Error).message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [tool],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setLoading(false);
  }, []);

  return { output, setOutput, loading, error, run, stop };
}
