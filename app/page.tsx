'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';

const models = [
  { id: 'claude-opus', name: 'Claude Opus', provider: 'Anthropic' },
  { id: 'claude-sonnet', name: 'Claude Sonnet', provider: 'Anthropic' },
  { id: 'claude-haiku', name: 'Claude Haiku', provider: 'Anthropic' },
  { id: 'gpt-5.4', name: 'GPT-5.4', provider: 'OpenAI' },
  { id: 'gpt-5.4-mini', name: 'GPT-5.4 Mini', provider: 'OpenAI' },
  { id: 'grok-4.20', name: 'Grok-4.20', provider: 'xAI' },
  { id: 'grok-fast', name: 'Grok Fast', provider: 'xAI' },
  { id: 'gemini-flash', name: 'Gemini Flash', provider: 'Google' },
];

export default function Chat() {
  const [selectedModel, setSelectedModel] = useState('claude-opus');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { model: selectedModel },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="24" height="24">
            <polygon points="60,0 20,55 48,55 38,100 80,42 52,42" fill="#FFAA00"/>
          </svg>
          <span className="font-bold text-lg">
            /<span className="text-[var(--slash-red)]">slash</span>
          </span>
          <span className="text-xs text-[var(--muted)]">Token-Optimized Chat</span>
        </div>
        <div className="flex items-center gap-2">
        <a href="https://slashtokens.com/faq" target="_blank" rel="noopener" className="w-6 h-6 flex items-center justify-center rounded-full border border-[var(--muted)] text-[var(--muted)] text-xs hover:bg-[var(--fg)] hover:text-[#0a0a0a] hover:border-[var(--fg)] active:bg-[var(--slash-red)] active:border-[var(--slash-red)] active:text-white transition-colors">?</a>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="bg-[#111] border border-[var(--border)] rounded-lg px-3 py-1.5 text-sm text-[var(--fg)] outline-none focus:border-[var(--slash-red)]"
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
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="pt-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40" className="mx-auto mb-3 opacity-40">
              <polygon points="60,0 20,55 48,55 38,100 80,42 52,42" fill="#FFAA00"/>
            </svg>
            <p className="text-[var(--fg)] text-lg font-bold mb-1">Every call optimized.</p>
            <p className="text-[var(--muted)] text-sm mb-4">
              Slash evaluates, routes, and saves — automatically.
            </p>
            <div className="flex flex-col gap-2 max-w-xs mx-auto text-left text-sm">
              <div className="flex items-center gap-2 text-[var(--muted)]">
                <span className="text-[var(--slash-green)]">✓</span> Evaluates every call before it leaves your machine
              </div>
              <div className="flex items-center gap-2 text-[var(--muted)]">
                <span className="text-[var(--slash-green)]">✓</span> Prevents unnecessary calls — $0 spent
              </div>
              <div className="flex items-center gap-2 text-[var(--muted)]">
                <span className="text-[var(--slash-green)]">✓</span> Routes to cheaper model when one fits
              </div>
            </div>
            <p className="text-[var(--muted)] text-xs mt-4 opacity-50">
              4.8 KB WASM · sub-ms · zero deps
            </p>
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="group relative max-w-[80%]">
              <div
                className={`rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[var(--slash-red)] text-white'
                    : 'bg-[#111] border border-[var(--border)] text-[var(--fg)]'
                }`}
              >
                {msg.content}
              </div>
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
        ))}
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
            placeholder="Type a message... or ask about Slash"
            className="flex-1 bg-[#111] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--fg)] outline-none focus:border-[var(--slash-red)] placeholder:text-[#555]"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-[var(--slash-red)] text-white rounded-xl px-5 py-3 text-sm font-semibold disabled:opacity-30 hover:opacity-90 transition-opacity"
          >
            Send
          </button>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs">
          <div className="flex items-center gap-3 text-[var(--muted)]">
            <a href="https://slashtokens.com" target="_blank" rel="noopener" className="hover:text-[var(--fg)]">
              slashtokens.com
            </a>
            <a href="https://github.com/Wolfe-Jam/slash-nextjs" target="_blank" rel="noopener" className="hover:text-[var(--fg)]">
              ⭐ GitHub
            </a>
            {messages.length > 1 && (
              <button
                onClick={() => {
                  const text = messages.map(m => `${m.role === 'user' ? 'You' : 'Slash'}: ${m.content}`).join('\n\n');
                  navigator.clipboard.writeText(text);
                }}
                className="hover:text-[var(--fg)] cursor-pointer"
              >
                Copy All
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <a href="https://twitter.com/intent/tweet?text=Token-optimized%20AI%20chat%20for%20Next.js.%20Every%20call%20through%20the%20Gate.%20%E2%9A%A1%2Fslash&url=https%3A%2F%2Fslash-tokens.vercel.app" target="_blank" rel="noopener" className="text-[var(--muted)] hover:text-[var(--fg)]">
              Share on X
            </a>
            <a href="https://mcpaas.live/slash/dashboard" target="_blank" rel="noopener" className="bg-[#111] text-[var(--slash-green)] font-bold px-3 py-1 rounded-lg text-xs border border-[var(--slash-green)] hover:bg-[var(--slash-green)] hover:text-[#0a0a0a] transition-colors">
              ⚡ Dashboard
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
