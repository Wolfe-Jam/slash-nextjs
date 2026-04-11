import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
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
