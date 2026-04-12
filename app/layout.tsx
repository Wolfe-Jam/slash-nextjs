import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='15' fill='%230a0a0a'/><polygon points='58,8 22,52 46,52 38,92 78,44 54,44' fill='%23FFAA00'/></svg>",
  },
  title: '/slash — Token-Optimized AI Chat',
  description: 'Every LLM call optimized. One import. 4.8 KB WASM. Sub-millisecond. Zero dependencies.',
  openGraph: {
    title: '/slash — Token-Optimized AI Chat',
    description: 'Every LLM call optimized. 4.8 KB WASM. Sub-ms. 90%+ tokens salvaged.',
    url: 'https://slashtokens.com',
    images: ['https://slashtokens.com/og.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
