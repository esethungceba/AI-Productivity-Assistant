import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";
import { SYSTEM_PROMPTS, type AiTool } from "./prompts";

const MODEL = "openai/gpt-6-astra";
const TOOLS: AiTool[] = ["email", "schedule", "meeting", "research", "chat"];
const RUN_ID = "X-Lovable-AIG-Run-ID";

type Body = { tool?: string; messages?: { role: string; content: string }[] };

function json(status: number, error: string) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function friendly(err: unknown): string {
  const status = (err as { statusCode?: number })?.statusCode;
  if (status === 429) return "The AI service is busy right now. Please wait a moment and try again.";
  if (status === 402) return "AI credits have run out for this workspace. Please add credits to continue using the AI features.";
  if (status === 403) return "AI access is currently blocked for this workspace. Please contact your administrator.";
  if (status === 401) return "The AI service is not configured correctly. Please contact your administrator.";
  return "Something went wrong while generating the response. Please try again.";
}

export async function handleAi(request: Request): Promise<Response> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) return json(500, "The AI service is not configured.");

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return json(400, "Invalid request.");
  }
  const tool = body.tool as AiTool;
  if (!TOOLS.includes(tool)) return json(400, "Unknown AI tool.");
  const messages: ModelMessage[] = (body.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-30)
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content.slice(0, 20000) }));
  if (!messages.length || !messages[messages.length - 1].content.trim()) {
    return json(400, "Please provide the required information before generating a result.");
  }

  let runId: string | undefined;
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (input, init) => {
      const headers = new Headers(init?.headers);
      if (runId) headers.set(RUN_ID, runId);
      const res = await fetch(input, { ...init, headers });
      runId ??= res.headers.get(RUN_ID) ?? undefined;
      return res;
    },
  });

  const result = streamText({
    model: provider.responses(MODEL),
    instructions: SYSTEM_PROMPTS[tool],
    messages,
    abortSignal: request.signal,
    maxRetries: 1,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const part of result.fullStream) {
          if (part.type === "text-delta") controller.enqueue(encoder.encode(part.text));
          else if (part.type === "error") {
            console.error("AI stream error", part.error);
            controller.enqueue(encoder.encode(`\n[[ERROR]]${friendly(part.error)}`));
          }
        }
      } catch (err) {
        if (!request.signal.aborted) {
          console.error("AI error", err);
          controller.enqueue(encoder.encode(`\n[[ERROR]]${friendly(err)}`));
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-cache, no-transform" },
  });
}
