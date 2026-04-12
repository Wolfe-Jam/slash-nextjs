import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { createXai } from '@ai-sdk/xai';
import { google } from '@ai-sdk/google';

const SLASH_KEY = process.env.SLASH_KEY || '';
const SLASH_PROXY = 'https://mcpaas.live/slash/v1';

// Anthropic via Slash proxy
const slashAnthropic = createAnthropic({
  baseURL: SLASH_PROXY,
  headers: {
    'X-Slash-Key': SLASH_KEY,
    'X-Slash-App': 'slash-nextjs',
  },
});

// OpenAI via Slash proxy
const slashOpenAI = createOpenAI({
  baseURL: SLASH_PROXY,
  headers: {
    'X-Slash-Key': SLASH_KEY,
    'X-Slash-App': 'slash-nextjs',
  },
});

// xAI via Slash proxy
const slashXai = createXai({
  baseURL: SLASH_PROXY,
  headers: {
    'X-Slash-Key': SLASH_KEY,
    'X-Slash-Provider': 'xai',
    'X-Slash-App': 'slash-nextjs',
  },
});

export function getModel(id?: string) {
  switch (id) {
    case 'claude-sonnet':
      return slashAnthropic('claude-sonnet-4-20250514');
    case 'claude-haiku':
      return slashAnthropic('claude-haiku-4-5-20251001');
    case 'gpt-5.4':
      return slashOpenAI('gpt-4o');
    case 'gpt-5.4-mini':
      return slashOpenAI('gpt-4o-mini');
    case 'grok-4.20':
      return slashXai('grok-3');
    case 'grok-fast':
      return slashXai('grok-3-fast');
    case 'gemini-flash':
      return google('gemini-2.0-flash'); // Gemini stays direct for now
    case 'claude-opus':
    default:
      return slashAnthropic('claude-opus-4-20250514');
  }
}
