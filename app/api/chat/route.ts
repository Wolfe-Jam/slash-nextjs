import { createDataStreamResponse, streamText } from 'ai';
import { getModel } from '@/lib/models';
import { preflightRoute } from 'slash-tokens';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';

/**
 * Minimum savings threshold to surface a routing pill.
 * Savings below $0.005 display as "$0.00" which reads broken.
 * We still *track* these saves in the session counter — they just don't
 * earn a standalone pill.
 */
const PILL_MIN_USD = 0.005;

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
          // preflightRoute (slash-tokens v1.4.0+) matches the mcpaas-cf proxy's
          // findCheapestRoute exactly — same-provider only. This is the actual
          // routing decision, not the cross-provider analysis preflight() returns.
          try {
            const assistantId = response.messages?.[0]?.id;
            if (!assistantId || !lastUserMsg || !modelId) return;
            const route = preflightRoute(lastUserMsg, toPreflightModel(modelId));
            if (route && route.salvaged >= PILL_MIN_USD) {
              writer.writeMessageAnnotation({
                type: 'route',
                messageId: assistantId,
                from: modelId,
                to: route.model,
                savedUsd: route.salvaged,
              });
            }
          } catch {
            // Routing prediction failures shouldn't break chat response.
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
