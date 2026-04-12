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
      system: 'You are a helpful assistant. Be concise.',
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
