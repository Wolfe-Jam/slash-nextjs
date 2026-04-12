# ⚡ slash-nextjs — Token-Optimized Next.js AI Chat

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Wolfe-Jam/slash-nextjs&project-name=slash-nextjs&env=ANTHROPIC_API_KEY)

<p align="center">
  <img src="public/demo.gif" alt="slash-nextjs demo — Token-Optimized Chat" width="600" />
</p>

A clean **Next.js + Vercel AI SDK** starter with **[slash-tokens](https://www.npmjs.com/package/slash-tokens)** built in.

**One import.** Intelligent routing. Real cost savings.

Stop burning money on Claude Opus (or GPT-5) when Haiku/Flash/Mini is enough.

## What it does

```ts
import 'slash-tokens/auto';
```

Every API call hits the Gate first:

- **Unnecessary calls are prevented** → $0 spent
- **Expensive models are intelligently routed down** (e.g. Claude Opus → Haiku) when full power isn't needed
- **Same quality, dramatically lower token cost**

Lightweight: **4.8 KB WASM** • **Sub-millisecond** decisions • **Zero extra dependencies**

## Why this matters

Most apps default to frontier models for everything. A simple query on Opus can cost 5x more than on Haiku — for the same answer.

At scale, the savings add up fast:

| Scenario | Without Slash | With Slash | Savings |
|----------|--------------|------------|---------|
| 1,000 simple queries/day | $150/mo | $30/mo | **$120/mo** |
| Agentic app (10K calls/day) | $1,500/mo | $300/mo | **$1,200/mo** |
| SaaS with AI features | $5,000/mo | $1,000/mo | **$4,000/mo** |

Don't go to the corner shop in a Ferrari.

## Features

- Works with **Anthropic, OpenAI, xAI, and Google**
- Real-time routing logs in dev
- 7 models across 4 providers in one dropdown
- Optional cost-tracking dashboard
- Perfect for agents, coding tools, and high-volume chat

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
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start chatting. Watch the Slash routing logs in your terminal.

## Environment Variables

```env
# Required — at least one provider
ANTHROPIC_API_KEY=sk-ant-...
# OPENAI_API_KEY=sk-...
# XAI_API_KEY=xai-...
# GOOGLE_GENERATIVE_AI_API_KEY=...

# Optional — enables savings dashboard
# SLASH_KEY=mcp_slash_...
```

## Track Your Savings (Optional)

- Get a free Slash key → [mcpaas.live/slash/setup](https://mcpaas.live/slash/setup)
- View live dashboard → [mcpaas.live/slash/dashboard](https://mcpaas.live/slash/dashboard)

## Links

- **Live Demo:** [slash-tokens.vercel.app](https://slash-tokens.vercel.app)
- **npm:** [slash-tokens](https://www.npmjs.com/package/slash-tokens)
- **Docs:** [slashtokens.com](https://slashtokens.com)
- **FAQ:** [slashtokens.com/faq](https://slashtokens.com/faq)
- **Core library:** [Wolfe-Jam/slash-tokens](https://github.com/Wolfe-Jam/slash-tokens)

## License

MIT — Built for token-conscious developers.
