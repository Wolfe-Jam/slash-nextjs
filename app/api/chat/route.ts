// import 'slash-tokens/auto'; // TODO: re-enable after testing base chat works
// import { init } from 'slash-tokens';
import { streamText } from 'ai';
import { getModel } from '@/lib/models';

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
