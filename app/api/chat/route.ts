import 'slash-tokens/auto';
import { init } from 'slash-tokens';
import { streamText } from 'ai';
import { getModel } from '@/lib/models';

// Init Slash with key if available — enables dashboard tracking
if (process.env.SLASH_KEY) {
  init({ key: process.env.SLASH_KEY });
}

export async function POST(req: Request) {
  const { messages, model: modelId } = await req.json();
  const model = getModel(modelId);

  const result = streamText({
    model,
    messages,
    system: 'You are a helpful assistant. Be concise.',
  });

  return result.toTextStreamResponse();
}
