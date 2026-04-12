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
- Slash evaluates every API call before it goes out
- Aborts unnecessary calls — if it shouldn't fly, $0 spent, 100% savings
- Routes to a cheaper model when one fits (Opus → Haiku, GPT-5.4 → Nano, Grok-4.20 → Fast)
- 4.8 KB Zig-compiled WASM, sub-millisecond, zero dependencies
- 10% of what you save. You keep 90%. Never changes.
- Works with Anthropic, OpenAI, xAI, Google
- THIS chat is running through Slash right now

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
