/**
 * App configuration for this template.
 *
 * ⚠️  This is the SLASH-BRANDED version (what deploys to slash-tokens.vercel.app).
 * If you forked this template, change these to your brand BEFORE you deploy.
 * Don't ship Slash's identity — see the brand clause at the bottom of README.md.
 *
 * Every field is required. If you don't have a logo, leave it empty —
 * the splash will render `brand.name` as a wordmark.
 */

export const appConfig = {
  brand: {
    name: '/slash',
    tagline: 'Token-Optimized AI Chat',
    /** Optional. Path under /public — e.g. '/brand/logo.svg'. Empty = use name as wordmark. */
    logo: '',
    /** Primary accent — used for buttons, highlights, focus states. */
    primary: '#FF4400', // Slash red
    /** Secondary accent — used for cost savings, positive signals. */
    accent: '#FFAA00',  // Slash gold
    bg: '#0a0a0a',
    fg: '#f5f5f5',
    /** Border color for inputs, dividers. Derived from bg if not set. */
    border: '#222',
  },

  splash: {
    /** Show the intro splash on first page load of a session. */
    enabled: true,
    /** Full splash duration in ms. Site uses 2200. */
    duration: 2200,
    /** Short-flash duration (ms) when user has opted out of the full splash. */
    shortDuration: 500,
  },

  dashboard: {
    /** Slash dashboard — remove if not using Slash's savings tracking. */
    enabled: true,
    setupUrl: 'https://mcpaas.live/slash/setup',
    dashboardUrl: 'https://mcpaas.live/slash/dashboard',
  },

  /** Optional: GitHub repo for star CTA. Leave empty to hide. */
  repoUrl: 'https://github.com/Wolfe-Jam/slash-nextjs',
} as const;

export type AppConfig = typeof appConfig;
