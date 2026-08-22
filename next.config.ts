import type { NextConfig } from 'next';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(`${__dirname}/package.json`, 'utf-8')) as { version: string };

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
  },
  // slash-tokens.vercel.app is a stale brand alias. Canonical cash door is slashtokens.com.
  // Host-gated so slash-nextjs-*.vercel.app (the chat demo) stays up.
  async redirects() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: 'slash-tokens.vercel.app' }],
        destination: 'https://slashtokens.com',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'slash-tokens.vercel.app' }],
        destination: 'https://slashtokens.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
