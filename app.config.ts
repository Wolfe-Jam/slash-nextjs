/**
 * App configuration for this template.
 *
 * Change these to your brand before deploying.
 *
 * Every field is required. If you don't have a logo, leave it empty —
 * the splash will render `brand.name` as a wordmark.
 */

export const appConfig = {
  brand: {
    name: 'Token Saver',
    tagline: 'Every call optimized.',
    /** Optional. Path under /public — e.g. '/brand/logo.svg'. Empty = use name as wordmark. */
    logo: '',
    /** Primary accent — used for buttons, highlights, focus states. */
    primary: '#10B981', // emerald green
    /** Secondary accent — used for cost savings, positive signals. */
    accent: '#EAB308',  // amber gold
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
