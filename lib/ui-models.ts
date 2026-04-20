/**
 * The model dropdown seen in the UI.
 *
 * Kept in its own module so tests can assert every `id` here resolves to a
 * model the slash-tokens SDK knows about (see tests/dropdown-coverage.test.ts).
 * This is the check that would have caught the v1.3.0 "claude-opus-4.7
 * orphan" class of bug on the consumer side.
 */

export type UIModel = {
  id: string;       // canonical id the app sends to the API route
  name: string;     // display name shown in the <select>
  provider: string; // for grouping / optional UI
};

export const UI_MODELS: readonly UIModel[] = [
  { id: 'claude-opus',     name: 'Claude Opus 4.7',   provider: 'Anthropic' },
  { id: 'claude-sonnet',   name: 'Claude Sonnet 4.6', provider: 'Anthropic' },
  { id: 'claude-haiku',    name: 'Claude Haiku 4.5',  provider: 'Anthropic' },
  { id: 'gpt-5.4',         name: 'GPT-5.4',           provider: 'OpenAI' },
  { id: 'gpt-5.4-mini',    name: 'GPT-5.4 Mini',      provider: 'OpenAI' },
  { id: 'gpt-5.4-nano',    name: 'GPT-5.4 Nano',      provider: 'OpenAI' },
  { id: 'grok-4.20',       name: 'Grok-4.20',         provider: 'xAI' },
  { id: 'grok-4-1-fast',   name: 'Grok-4.1 Fast',     provider: 'xAI' },
  { id: 'gemini-3.1-pro',  name: 'Gemini 3.1 Pro',    provider: 'Google' },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'Google' },
] as const;

/**
 * UI → SDK id mapping.
 *
 * Our UI uses short ids (`claude-opus`) as the default; slash-tokens' MODELS
 * registry keys include the versioned `claude-opus-4.7`. Keep this in sync
 * with `toPreflightModel()` in `app/api/chat/route.ts`.
 */
export function toSdkModelId(id: string): string {
  if (id === 'claude-opus') return 'claude-opus-4.7';
  return id;
}
