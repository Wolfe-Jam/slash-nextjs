import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { xai } from '@ai-sdk/xai';
import { google } from '@ai-sdk/google';

export type ModelId = 'claude-sonnet' | 'claude-haiku' | 'gpt-5.4' | 'gpt-5.4-mini' | 'grok-4.20' | 'grok-fast' | 'gemini-flash';

interface ModelConfig {
  name: string;
  provider: string;
  create: () => any;
}

const models: Record<ModelId, ModelConfig> = {
  'claude-sonnet': {
    name: 'Claude Sonnet',
    provider: 'Anthropic',
    create: () => anthropic('claude-sonnet-4-20250514'),
  },
  'claude-haiku': {
    name: 'Claude Haiku',
    provider: 'Anthropic',
    create: () => anthropic('claude-haiku-4-5-20251001'),
  },
  'gpt-5.4': {
    name: 'GPT-5.4',
    provider: 'OpenAI',
    create: () => openai('gpt-5.4'),
  },
  'gpt-5.4-mini': {
    name: 'GPT-5.4 Mini',
    provider: 'OpenAI',
    create: () => openai('gpt-5.4-mini'),
  },
  'grok-4.20': {
    name: 'Grok-4.20',
    provider: 'xAI',
    create: () => xai('grok-4.20'),
  },
  'grok-fast': {
    name: 'Grok Fast',
    provider: 'xAI',
    create: () => xai('grok-4-1-fast'),
  },
  'gemini-flash': {
    name: 'Gemini Flash',
    provider: 'Google',
    create: () => google('gemini-2.5-flash'),
  },
};

export function getModel(id?: string) {
  const modelId = (id || 'claude-sonnet') as ModelId;
  const config = models[modelId];
  if (!config) return models['claude-sonnet'].create();
  return config.create();
}

export function listModels(): Array<{ id: ModelId; name: string; provider: string }> {
  return Object.entries(models).map(([id, config]) => ({
    id: id as ModelId,
    name: config.name,
    provider: config.provider,
  }));
}
