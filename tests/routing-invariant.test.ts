/**
 * TIER 1 BRAKE — same-provider routing invariant.
 *
 * The SDK's own tests assert preflightRoute() is same-provider only, but our
 * UI has its own id namespace ("claude-opus" default → "claude-opus-4.7" at
 * the SDK). This test runs the invariant across the consumer's mapping.
 *
 * If preflightRoute ever returns a cross-provider route for a UI id, the pill
 * in the header would show e.g. "⚡ routed claude-opus → grok-4-1-fast" —
 * which is the bug that shipped in v1.3.0 under a different code path.
 */
import { describe, it, expect } from 'vitest';
import { preflightRoute, providerOf } from 'slash-tokens';
import { UI_MODELS, toSdkModelId } from '@/lib/ui-models';

const LONG_PROMPT = 'hello world '.repeat(50); // trigger potential routing

describe('preflightRoute same-provider invariant (UI ids)', () => {
  it('never returns a cross-provider route for any UI model', () => {
    for (const m of UI_MODELS) {
      const sdkId = toSdkModelId(m.id);
      const route = preflightRoute(LONG_PROMPT, sdkId);
      if (route === null) continue; // null is a valid "no cheaper same-provider" result
      const originProvider = providerOf(sdkId);
      const routedProvider = providerOf(route.model);
      expect(
        routedProvider,
        `UI id "${m.id}" routed to "${route.model}" — provider changed from ${originProvider} to ${routedProvider}`,
      ).toBe(originProvider);
    }
  });

  it('returned routes always name a cheaper model', () => {
    for (const m of UI_MODELS) {
      const route = preflightRoute(LONG_PROMPT, toSdkModelId(m.id));
      if (route === null) continue;
      expect(route.salvaged, `route for "${m.id}" claims non-positive savings`).toBeGreaterThan(0);
    }
  });
});
