// import 'slash-tokens/auto'; // TODO: re-enable after base chat verified
import { streamText } from 'ai';
import { getModel } from '@/lib/models';

export async function POST(req: Request) {
  try {
    const { messages, model: modelId } = await req.json();
    const model = getModel(modelId);

    const result = streamText({
      model,
      messages,
      system: 'You are a helpful assistant. Be concise.',
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
