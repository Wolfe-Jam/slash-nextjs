import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { appConfig } from '../app.config';
import './globals.css';

const slashBrand = process.env.NEXT_PUBLIC_SLASH_BRAND === '1';

// Favicon matches the active brand.
// Slash: original lightning polygon on dark rounded square.
// Placeholder: gold coin with $ glyph.
const favicon = slashBrand
  ? "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='15' fill='%230a0a0a'/><polygon points='58,8 22,52 46,52 38,92 78,44 54,44' fill='%23FFAA00'/></svg>"
  : "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='15' fill='%230a0a0a'/><circle cx='50' cy='50' r='32' fill='%23EAB308' stroke='%23fff' stroke-width='2'/><text x='50' y='60' font-size='28' text-anchor='middle' fill='%230a0a0a' font-family='system-ui' font-weight='900'>$</text></svg>";

export const metadata: Metadata = {
  icons: {
    icon: favicon,
  },
  title: `${appConfig.brand.name} — ${appConfig.brand.tagline}`,
  description: 'Token-optimized AI chat. One proxy. Every call through the Gate.',
  openGraph: {
    title: `${appConfig.brand.name} — ${appConfig.brand.tagline}`,
    description: 'Token-optimized AI chat. Every LLM call optimized pre-send.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cssVars = {
    ['--bg' as string]: appConfig.brand.bg,
    ['--fg' as string]: appConfig.brand.fg,
    ['--primary' as string]: appConfig.brand.primary,
    ['--accent' as string]: appConfig.brand.accent,
    ['--border' as string]: appConfig.brand.border,
  } as React.CSSProperties;

  return (
    <html lang="en" style={cssVars}>
      <body className="antialiased">
        {children}
        <Analytics />
        <Script src="https://buttons.github.io/buttons.js" strategy="afterInteractive" async defer />
      </body>
    </html>
  );
}
