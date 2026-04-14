import { streamText } from 'ai';
import { getModel } from '@/lib/models';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';

// Load system prompt from project.faf — FAF built Slash, Slash runs on FAF
let systemPrompt = '';
try {
  const fafPath = join(process.cwd(), 'project.faf');
  const fafContent = readFileSync(fafPath, 'utf-8');
  const faf = parse(fafContent);
  systemPrompt = faf.system_prompt || '';
} catch {
  systemPrompt = 'You are the Slash assistant — a token optimization tool. slashtokens.com';
}

export async function POST(req: Request) {
  try {
    const { messages, model: modelId } = await req.json();
    const model = getModel(modelId);

    const result = streamText({
      model,
      messages,
      system: systemPrompt,
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
