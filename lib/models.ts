import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { xai } from '@ai-sdk/xai';
import { google } from '@ai-sdk/google';

export function getModel(id?: string) {
  switch (id) {
    case 'claude-sonnet':
      return anthropic('claude-sonnet-4-20250514');
    case 'claude-haiku':
      return anthropic('claude-haiku-4-5-20251001');
    case 'gpt-5.4':
      return openai('gpt-4o');
    case 'gpt-5.4-mini':
      return openai('gpt-4o-mini');
    case 'grok-4.20':
      return xai('grok-3');
    case 'grok-fast':
      return xai('grok-3-fast');
    case 'gemini-flash':
      return google('gemini-2.0-flash');
    case 'claude-opus':
    default:
      return anthropic('claude-opus-4-20250514');
  }
}
