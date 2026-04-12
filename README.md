# ⚡ slash-nextjs — Token-Optimized Next.js AI Chat

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Wolfe-Jam/slash-nextjs&project-name=slash-nextjs&env=ANTHROPIC_API_KEY)

A clean **Next.js + Vercel AI SDK** starter with **slash-tokens** built in.

One import gives you intelligent routing and cost control on every LLM call.

**Stop burning money on Claude Opus (or GPT-5) when Haiku/Flash/Mini is enough.**

## What it does

```ts
import 'slash-tokens/auto';
```

That's it. Every API call is evaluated at the Gate before it leaves your app:

- **Unnecessary calls are prevented** — $0 spent
- **Expensive models are automatically routed down** (e.g. Claude Opus → Haiku) when full power isn't needed
- **Same response quality** — dramatically lower token cost

Lightweight: **4.8 KB WASM** • **Sub-millisecond** decisions • **Zero extra dependencies**

## Why this matters

Most AI apps default to expensive models for every call. A simple "What is 2+2?" on Claude Opus costs 5x more than Haiku — and gets the same answer.

At scale, this adds up fast:

| Scenario | Without Slash | With Slash | Savings |
|----------|--------------|------------|---------|
| 1,000 simple queries/day on Opus | $150/mo | $30/mo | $120/mo |
| Agentic app, 10K calls/day | $1,500/mo | $300/mo | $1,200/mo |
| SaaS with AI features | $5,000/mo | $1,000/mo | $4,000/mo |

Don't go to the corner shop in a Ferrari.

## Features

- Works with **Anthropic, OpenAI, xAI, and Google**
- Real-time routing logs in development
- 7 models across 4 providers in one dropdown
- Optional analytics dashboard for cost tracking
- Perfect for agentic workflows, coding agents, and high-volume chat apps

## Supported Providers & Models

| Provider | High-End | Mid / Cheap |
|----------|----------|-------------|
| Anthropic | Claude Opus, Sonnet | Haiku |
| OpenAI | GPT-5.4 | Mini, Nano |
| xAI | Grok-4.20 | Fast |
| Google | Gemini Pro | Flash |

## Quick Start

```bash
git clone https://github.com/Wolfe-Jam/slash-nextjs.git
cd slash-nextjs
npm install
cp .env.example .env.local
```

Add your API keys to `.env.local`, then:

```bash
npm run dev
```

Open http://localhost:3000 and start chatting.

## Environment Variables

```env
# Required — pick one or more providers
ANTHROPIC_API_KEY=sk-ant-...
# OPENAI_API_KEY=sk-...
# XAI_API_KEY=xai-...
# GOOGLE_GENERATIVE_AI_API_KEY=...

# Optional — enables Slash dashboard tracking
# SLASH_KEY=mcp_slash_...
```

## Optional: Track Your Savings

Add your Slash key to `.env.local`:

```env
SLASH_KEY=mcp_slash_...
```

Get a free key at [mcpaas.live/slash/setup](https://mcpaas.live/slash/setup). View live cost savings at [mcpaas.live/slash/dashboard](https://mcpaas.live/slash/dashboard).

## Links

- **Live Demo:** [slash-tokens.vercel.app](https://slash-tokens.vercel.app)
- **npm:** [slash-tokens](https://www.npmjs.com/package/slash-tokens)
- **Docs:** [slashtokens.com](https://slashtokens.com)
- **FAQ:** [slashtokens.com/faq](https://slashtokens.com/faq)
- **GitHub:** [Wolfe-Jam/slash-tokens](https://github.com/Wolfe-Jam/slash-tokens)

## License

MIT

Built by [FAF](https://faf.one) — the team behind the IANA-registered AI context format.
