# ⚡/slash — Token-Optimized AI Chat

Every LLM call optimized. One import. 4.8 KB WASM. Sub-millisecond. Zero dependencies.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Wolfe-Jam/slash-nextjs&project-name=slash-nextjs&env=ANTHROPIC_API_KEY)

## What it does

This is a standard Next.js + Vercel AI SDK chat app with one difference:

```typescript
import 'slash-tokens/auto';
```

That single import evaluates every API call before it goes out. Routes to a cheaper model when one fits. Aborts unnecessary calls. Same answer. Less cost.

Don't go to the corner shop in a Ferrari.

## Providers

Works with all four frontier providers:

- **Anthropic** — Claude Opus, Sonnet, Haiku
- **OpenAI** — GPT-5.4, Mini, Nano
- **xAI** — Grok-4.20, Fast
- **Google** — Gemini Pro, Flash

Set your API keys in `.env.local` and pick a model from the dropdown.

## Quick start

```bash
git clone https://github.com/Wolfe-Jam/slash-nextjs.git
cd slash-nextjs
npm install
cp .env.example .env.local
# Add your API key(s) to .env.local
npm run dev
```

Open http://localhost:3000. Chat. Check your terminal for Slash routing logs.

## Dashboard

Add your Slash key to `.env.local` to track savings:

```env
SLASH_KEY=mcp_slash_...
```

Get a key at [mcpaas.live/slash/setup](https://mcpaas.live/slash/setup). View your dashboard at [mcpaas.live/slash/dashboard](https://mcpaas.live/slash/dashboard).

## Links

- [slashtokens.com](https://slashtokens.com)
- [npm: slash-tokens](https://www.npmjs.com/package/slash-tokens)
- [GitHub: slash-tokens](https://github.com/Wolfe-Jam/slash-tokens)
- [FAQ](https://slashtokens.com/faq)

## License

MIT

Built by the [FAF](https://faf.one) team — IANA-registered standard for AI Context.
