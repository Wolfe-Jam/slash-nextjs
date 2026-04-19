'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import { appConfig } from '@/app.config';
import Splash from '@/components/Splash';
import BrandMark from '@/components/BrandMark';

const models = [
  { id: 'claude-opus', name: 'Claude Opus 4.7', provider: 'Anthropic' },
  { id: 'claude-sonnet', name: 'Claude Sonnet 4.6', provider: 'Anthropic' },
  { id: 'claude-haiku', name: 'Claude Haiku 4.5', provider: 'Anthropic' },
  { id: 'gpt-5.4', name: 'GPT-5.4', provider: 'OpenAI' },
  { id: 'gpt-5.4-mini', name: 'GPT-5.4 Mini', provider: 'OpenAI' },
  { id: 'gpt-5.4-nano', name: 'GPT-5.4 Nano', provider: 'OpenAI' },
  { id: 'grok-4.20', name: 'Grok-4.20', provider: 'xAI' },
  { id: 'grok-4-1-fast', name: 'Grok-4.1 Fast', provider: 'xAI' },
  { id: 'gemini-3.1-pro', name: 'Gemini 3.1 Pro', provider: 'Google' },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'Google' },
];

type RouteInfo = {
  messageId: string;
  from: string;
  to: string;
  savedUsd: number;
};

export default function Chat() {
  const [selectedModel, setSelectedModel] = useState('claude-opus');
  const [routes, setRoutes] = useState<Record<string, RouteInfo>>({});
  const [sessionSaved, setSessionSaved] = useState(0);
  const [sessionRouted, setSessionRouted] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { model: selectedModel },
  });

  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    setHasKey(!!localStorage.getItem('slash_key'));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Consume per-message routing annotations attached by the /api/chat route
  useEffect(() => {
    for (const msg of messages) {
      if (msg.role !== 'assistant' || !msg.annotations) continue;
      for (const a of msg.annotations) {
        if (a && typeof a === 'object' && 'type' in a && (a as { type: string }).type === 'route') {
          const r = a as unknown as RouteInfo;
          setRoutes((prev) => {
            if (prev[r.messageId]) return prev;
            setSessionSaved((s) => s + r.savedUsd);
            setSessionRouted((c) => c + 1);
            return { ...prev, [r.messageId]: r };
          });
        }
      }
    }
  }, [messages]);

  const brandName = appConfig.brand.name;

  return (
    <>
      <Splash />
      <div className="flex flex-col h-screen max-w-3xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <BrandMark size={24} />
            <span className="font-bold text-lg">{brandName}</span>
            <span className="hidden sm:inline text-xs text-[var(--muted)]">{appConfig.brand.tagline}</span>
          </div>
          <div className="flex items-center gap-2">
            {sessionSaved > 0 && (
              <span
                className="hidden sm:inline text-xs font-semibold px-2 py-1 rounded-md"
                style={{ color: appConfig.brand.accent, background: 'rgba(234,179,8,0.08)' }}
                title={`${sessionRouted} call${sessionRouted === 1 ? '' : 's'} re-routed this session`}
              >
                Saved ${sessionSaved.toFixed(2)}
              </span>
            )}
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-[#111] border border-[var(--border)] rounded-lg px-3 py-1.5 text-sm text-[var(--fg)] outline-none focus:border-[var(--primary)]"
            >
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 relative">
          {messages.length > 1 && (
            <button
              onClick={() => {
                const text = messages
                  .map((m) => `${m.role === 'user' ? 'You' : brandName}: ${m.content}`)
                  .join('\n\n');
                navigator.clipboard.writeText(text);
              }}
              className="sticky top-0 right-0 float-right bg-[#111] border border-[var(--border)] rounded-md px-2 py-1 text-[10px] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--fg)] transition-colors z-10"
            >
              Copy All
            </button>
          )}

          {messages.length === 0 && (
            <div className="pt-8 text-center">
              <div className="mx-auto mb-3 opacity-60">
                <BrandMark size={40} />
              </div>
              <p className="text-[var(--fg)] text-lg font-bold mb-1">Every call optimized.</p>
              <p className="text-[var(--muted)] text-sm mb-4">Evaluate, route, and save — automatically.</p>
              <div className="flex flex-col gap-2 max-w-xs mx-auto text-left text-sm">
                <div className="flex items-center gap-2 text-[var(--muted)]">
                  <span style={{ color: appConfig.brand.primary }}>✓</span>
                  <span>
                    <b className="text-[var(--fg)]">Prevent</b> — unnecessary calls blocked, $0 spent
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[var(--muted)]">
                  <span style={{ color: appConfig.brand.primary }}>✓</span>
                  <span>
                    <b className="text-[var(--fg)]">Re-route</b> — cheaper model when one fits
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[var(--muted)]">
                  <span style={{ color: appConfig.brand.primary }}>✓</span>
                  <span>
                    <b className="text-[var(--fg)]">Pass</b> — right model, right cost, let it fly
                  </span>
                </div>
              </div>
              <p className="text-[var(--muted)] text-xs mt-4 opacity-50">4.8 KB WASM · sub-ms · zero deps</p>
            </div>
          )}

          {messages.map((msg) => {
            const route = msg.role === 'assistant' ? routes[msg.id] : undefined;
            return (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="group relative max-w-[80%]">
                  <div
                    className={`rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'text-white'
                        : 'bg-[#111] border border-[var(--border)] text-[var(--fg)]'
                    }`}
                    style={msg.role === 'user' ? { background: appConfig.brand.primary } : undefined}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    ) : (
                      msg.content
                    )}
                  </div>
                  {route && (
                    <div
                      className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ color: appConfig.brand.accent, background: 'rgba(234,179,8,0.08)' }}
                      title={`Slash re-routed ${route.from} → ${route.to}`}
                    >
                      ⚡ routed {shortModel(route.from)} → {shortModel(route.to)} · saved ${route.savedUsd.toFixed(2)}
                    </div>
                  )}
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => navigator.clipboard.writeText(msg.content)}
                      className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 bg-[#222] border border-[var(--border)] rounded-md px-1.5 py-0.5 text-[10px] text-[var(--muted)] hover:text-[var(--fg)] transition-opacity"
                    >
                      Copy
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#111] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--muted)]">
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--border)]">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="flex-1 bg-[#111] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--fg)] outline-none focus:border-[var(--primary)] placeholder:text-[#555]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-30 hover:opacity-90 transition-opacity"
              style={{ background: appConfig.brand.primary }}
            >
              Send
            </button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <div className="flex items-center gap-3 text-[var(--muted)]">
              {appConfig.dashboard.enabled && (
                <a href={appConfig.dashboard.setupUrl} target="_blank" rel="noopener" className="hover:text-[var(--fg)]">
                  🔑 Your Key
                </a>
              )}
            </div>
            {appConfig.dashboard.enabled && (
              <div className="flex items-center gap-3">
                {hasKey ? (
                  <a
                    href={appConfig.dashboard.dashboardUrl}
                    target="_blank"
                    rel="noopener"
                    className="bg-[#111] border border-[#333] text-white font-bold px-3 py-1 rounded-lg text-xs hover:border-[var(--fg)] transition-colors"
                  >
                    Top Up
                  </a>
                ) : (
                  <a
                    href={appConfig.dashboard.setupUrl}
                    target="_blank"
                    rel="noopener"
                    className="bg-[#111] border border-[#333] text-white font-bold px-3 py-1 rounded-lg text-xs hover:border-[var(--fg)] transition-colors"
                  >
                    Get $5 Free Key
                  </a>
                )}
                <a
                  href={appConfig.dashboard.dashboardUrl}
                  target="_blank"
                  rel="noopener"
                  className="bg-[#111] font-bold px-3 py-1 rounded-lg text-xs border transition-colors"
                  style={{ color: appConfig.brand.accent, borderColor: appConfig.brand.accent }}
                >
                  Dashboard
                </a>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

function shortModel(id: string): string {
  // Trim noisy date suffixes: "claude-haiku-4-5-20251001" → "claude-haiku-4-5"
  return id.replace(/-\d{8}$/, '');
}
