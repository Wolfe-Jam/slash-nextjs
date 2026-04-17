import { createDataStreamResponse, streamText } from 'ai';
import { getModel } from '@/lib/models';
import { preflight } from 'slash-tokens';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';

// System prompt loaded from project.faf once at module init.
let systemPrompt = '';
try {
  const fafPath = join(process.cwd(), 'project.faf');
  const fafContent = readFileSync(fafPath, 'utf-8');
  const faf = parse(fafContent);
  systemPrompt = faf.system_prompt || '';
} catch {
  systemPrompt = 'You are a helpful AI assistant.';
}

function toPreflightModel(id: string): string {
  // Our UI uses short IDs (claude-opus). slash-tokens MODELS keys use the
  // same short names, but we preview Opus 4.7 pricing for the "claude-opus" default.
  if (id === 'claude-opus') return 'claude-opus-4.7';
  return id;
}

export async function POST(req: Request) {
  const { messages, model: modelId } = await req.json();
  const lastUserMsg =
    [...(messages as Array<{ role: string; content: string }>)]
      .reverse()
      .find((m) => m.role === 'user')?.content ?? '';

  return createDataStreamResponse({
    execute: (writer) => {
      const result = streamText({
        model: getModel(modelId),
        messages,
        system: systemPrompt,
        onFinish: ({ response }) => {
          // Predict the Slash Gate decision using slash-tokens' own routing logic.
          // The SDK and the live proxy share the same pricing table, so this
          // reflects what the proxy would do for a given prompt + model.
          try {
            const assistantId = response.messages?.[0]?.id;
            if (!assistantId || !lastUserMsg || !modelId) return;
            const pre = preflight(lastUserMsg, toPreflightModel(modelId));
            const cheaper = pre.options?.[0];
            if (cheaper && cheaper.model !== toPreflightModel(modelId) && cheaper.salvaged > 0) {
              writer.writeMessageAnnotation({
                type: 'route',
                messageId: assistantId,
                from: modelId,
                to: cheaper.model,
                savedUsd: cheaper.salvaged,
              });
            }
          } catch {
            // Preflight failures shouldn't break chat response.
          }
        },
      });
      result.mergeIntoDataStream(writer);
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : 'Chat error';
      console.error('Chat API error:', message);
      return message;
    },
  });
}
