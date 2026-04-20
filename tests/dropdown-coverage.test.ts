/**
 * TIER 1 BRAKE — the test that would have caught the v1.3.0 orphan class of bug.
 *
 * Every model in the UI dropdown, once mapped through toSdkModelId(), must
 * exist in slash-tokens' PROVIDER_MODELS. If this drifts, the routing pill
 * silently becomes wrong (or disappears), and the chat still works — so the
 * only way to notice is a test.
 */
import { describe, it, expect } from 'vitest';
import { PROVIDER_MODELS, providerOf } from 'slash-tokens';
import { UI_MODELS, toSdkModelId } from '@/lib/ui-models';

const ALL_SDK_IDS = new Set(Object.values(PROVIDER_MODELS).flat());

describe('UI dropdown ↔ slash-tokens SDK registry', () => {
  it('every UI model id resolves to an id the SDK knows', () => {
    for (const m of UI_MODELS) {
      const sdkId = toSdkModelId(m.id);
      expect(
        ALL_SDK_IDS.has(sdkId),
        `UI id "${m.id}" → SDK id "${sdkId}" — not found in PROVIDER_MODELS`,
      ).toBe(true);
    }
  });

  it('every UI model id belongs to a known provider', () => {
    for (const m of UI_MODELS) {
      const sdkId = toSdkModelId(m.id);
      const provider = providerOf(sdkId);
      expect(provider, `no provider for UI id "${m.id}" (sdk: "${sdkId}")`).not.toBeNull();
    }
  });

  it('UI provider label matches SDK provider', () => {
    for (const m of UI_MODELS) {
      const sdkProvider = providerOf(toSdkModelId(m.id));
      expect(sdkProvider).toBe(m.provider);
    }
  });
});
