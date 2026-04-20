/**
 * App configuration.
 *
 * Default brand is a safe placeholder (Token Saver, green + gold).
 * If you fork this template and deploy, you'll see the placeholder — change
 * `brandDefault` below to your own brand before customizing further.
 *
 * The Slash-branded variant is gated behind NEXT_PUBLIC_SLASH_BRAND=1, set
 * only on Slash's own Vercel project. Do not enable this in your fork.
 * Slash's brand (name, red/gold colors, wordmark) is protected by the brand
 * clause — see README.
 */

const slashBrand = process.env.NEXT_PUBLIC_SLASH_BRAND === '1';

/** Placeholder brand — safe default for forks. Change this to yours. */
export const brandDefault = {
  name: 'Token Saver',
  tagline: 'Every call optimized.',
  logo: '',
  primary: '#10B981', // emerald green
  accent: '#EAB308',  // amber gold
  bg: '#0a0a0a',
  fg: '#f5f5f5',
  border: '#222',
} as const;

/** Slash brand — only rendered when NEXT_PUBLIC_SLASH_BRAND=1. Not for forks. */
export const brandSlash = {
  name: '/slash',
  tagline: 'Token-Optimized AI Chat',
  logo: '',
  primary: '#FF4400', // Slash red
  accent: '#FFAA00',  // Slash gold
  bg: '#0a0a0a',
  fg: '#f5f5f5',
  border: '#222',
} as const;

export const appConfig = {
  brand: slashBrand ? brandSlash : brandDefault,

  /** Copy variants — some lines read differently per brand. */
  copy: {
    heroTitle: 'Every call optimized.',
    heroSubtitle: slashBrand
      ? 'Slash evaluates, routes, and saves — automatically.'
      : 'Evaluate, route, and save — automatically.',
  },

  /** Optional FAQ URL — renders a small "?" in the header when set. Empty = hidden. */
  faqUrl: slashBrand ? 'https://slashtokens.com/faq' : '',

  splash: {
    enabled: true,
    duration: 2200,
    shortDuration: 500,
  },

  dashboard: {
    enabled: true,
    setupUrl: 'https://mcpaas.live/slash/setup',
    dashboardUrl: 'https://mcpaas.live/slash/dashboard',
  },

  repoUrl: 'https://github.com/Wolfe-Jam/slash-nextjs',
} as const;

export type AppConfig = typeof appConfig;
