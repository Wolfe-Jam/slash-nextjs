import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { createXai } from '@ai-sdk/xai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const SLASH_KEY = process.env.SLASH_KEY || '';
const SLASH_PROXY = process.env.SLASH_PROXY_URL || 'https://mcpaas.live/slash/v1';
const GOOGLE_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY || '';

const slashHeaders = {
  'X-Slash-Key': SLASH_KEY,
  'X-Slash-App': 'slash-nextjs',
};

const slashAnthropic = createAnthropic({
  baseURL: SLASH_PROXY,
  headers: slashHeaders,
});

const slashOpenAI = createOpenAI({
  baseURL: SLASH_PROXY,
  headers: slashHeaders,
});

const slashXai = createXai({
  baseURL: SLASH_PROXY,
  headers: { ...slashHeaders, 'X-Slash-Provider': 'xai' },
});

const slashGoogle = createGoogleGenerativeAI({
  baseURL: `${SLASH_PROXY}/gemini`,
  apiKey: GOOGLE_KEY,
  headers: {
    ...slashHeaders,
    'X-Gemini-Key': GOOGLE_KEY,
  },
});

export function getModel(id?: string) {
  switch (id) {
    case 'claude-sonnet':
      return slashAnthropic('claude-sonnet-4-6');
    case 'claude-haiku':
      return slashAnthropic('claude-haiku-4-5-20251001');
    case 'gpt-5.4':
      return slashOpenAI('gpt-5.4');
    case 'gpt-5.4-mini':
      return slashOpenAI('gpt-5.4-mini');
    case 'gpt-5.4-nano':
      return slashOpenAI('gpt-5.4-nano');
    case 'grok-4.20':
      return slashXai('grok-4.20');
    case 'grok-4-1-fast':
      return slashXai('grok-4-1-fast');
    case 'gemini-3.1-pro':
      return slashGoogle('gemini-3.1-pro');
    case 'gemini-2.5-flash':
      return slashGoogle('gemini-2.5-flash');
    case 'claude-opus':
    default:
      return slashAnthropic('claude-opus-4-7');
  }
}
