/**
 * TIER 2 ENGINE — brand-gate sanity.
 *
 * The template ships with a Token Saver placeholder by default. Slash brand
 * only appears when NEXT_PUBLIC_SLASH_BRAND=1 is set at build time (a variable
 * only Slash's own Vercel project has). A forker who clones and deploys must
 * never see Slash red/gold/logo unless they opt in.
 *
 * app.config.ts evaluates `slashBrand` at import time, so we don't mutate
 * env + re-import here — that's brittle across runtimes. Instead we assert
 * on the exported brand objects directly: their shape, their distinctness,
 * and the contract each one implements.
 */
import { describe, it, expect } from 'vitest';
import { brandDefault, brandSlash } from '@/app.config';

describe('brand-gate', () => {
  it('default brand is Token Saver (safe placeholder for forks)', () => {
    expect(brandDefault.name).toBe('Token Saver');
    expect(brandDefault.name.startsWith('/')).toBe(false); // no "/" prefix leak
  });

  it('slash brand is distinct from default in name + color', () => {
    expect(brandSlash.name).not.toBe(brandDefault.name);
    expect(brandSlash.primary).not.toBe(brandDefault.primary);
    expect(brandSlash.accent).not.toBe(brandDefault.accent);
  });

  it('default brand uses no Slash-protected colors', () => {
    expect(brandDefault.primary).not.toBe('#FF4400'); // Slash red
    expect(brandDefault.accent).not.toBe('#FFAA00');  // Slash gold
  });

  it('both brands share a consistent shape', () => {
    const keys = ['name', 'tagline', 'logo', 'primary', 'accent', 'bg', 'fg', 'border'] as const;
    for (const k of keys) {
      expect(brandDefault[k]).toBeDefined();
      expect(brandSlash[k]).toBeDefined();
    }
  });
});
