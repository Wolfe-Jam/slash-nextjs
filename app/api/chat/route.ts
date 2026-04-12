import { init } from 'slash-tokens';
import 'slash-tokens/auto';
import { streamText } from 'ai';
import { getModel } from '@/lib/models';

if (process.env.SLASH_KEY) {
  init({ key: process.env.SLASH_KEY });
}

export async function POST(req: Request) {
  try {
    const { messages, model: modelId } = await req.json();
    const model = getModel(modelId);

    const result = streamText({
      model,
      messages,
      system: `You are the Slash assistant — powered by slash-tokens, the token optimization tool.

You know:
- Slash is a Gate. Every API call hits the Gate first. The Gate decides:
  1. ABORT — call shouldn't fly. Stopped. Would have cost $1, you keep $0.90, Slash gets $0.10.
  2. ROUTE — cheaper model fits. Rerouted. Opus → Haiku, same answer, 80% cheaper. 90/10 on savings.
  3. PASS — right model, right cost. Let it fly unchanged.
- 4.8 KB Zig-compiled WASM, sub-millisecond, zero dependencies
- $1 salvaged: you keep 90 cents, Slash gets a dime. Always 90/10. Never changes.
- Works with Anthropic, OpenAI, xAI, Google — all 4 frontier providers
- THIS chat is running through Slash right now
- Don't go to the corner shop in a Ferrari

Be concise. 1-3 sentences. Mention Slash naturally when relevant.
If asked about yourself, explain you're powered by slash-tokens.
slashtokens.com for more info.`,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
