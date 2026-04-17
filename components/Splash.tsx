'use client';

import { useEffect, useState } from 'react';
import { appConfig } from '@/app.config';
import BrandMark from '@/components/BrandMark';

/**
 * Intro splash. Mirrors the slashtokens.com site pattern — dark full-screen
 * overlay that fades and zooms the brand mark, then removes itself.
 *
 * Users can opt out of the full splash with one click ("skip next time").
 * That flag is stored in localStorage; subsequent visits show a brief
 * 500ms flash instead of the full 2.2s sequence.
 */

const SKIP_KEY = 'splash_skip';

export default function Splash() {
  const [visible, setVisible] = useState<boolean>(appConfig.splash.enabled);
  const [duration, setDuration] = useState<number>(appConfig.splash.duration);

  useEffect(() => {
    if (!appConfig.splash.enabled) return;
    const skip = typeof window !== 'undefined' && localStorage.getItem(SKIP_KEY) === '1';
    const d = skip ? appConfig.splash.shortDuration : appConfig.splash.duration;
    setDuration(d);
    const t = setTimeout(() => setVisible(false), d + 100);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const handleDismiss = () => setVisible(false);
  const handleSkipNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.setItem(SKIP_KEY, '1');
    setVisible(false);
  };

  return (
    <div
      onClick={handleDismiss}
      style={{
        position: 'fixed',
        inset: 0,
        background: appConfig.brand.bg,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        cursor: 'pointer',
        animation: `splashFade ${duration}ms ease forwards`,
      }}
      aria-hidden="true"
    >
      <div style={{ animation: `splashZoom ${duration}ms ease forwards` }}>
        <BrandMark size={120} />
      </div>
      <div
        style={{
          fontSize: '1.5rem',
          fontWeight: 900,
          color: appConfig.brand.fg,
          letterSpacing: '-0.02em',
        }}
      >
        {appConfig.brand.name}
      </div>
      <button
        onClick={handleSkipNext}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          background: 'transparent',
          border: 'none',
          color: appConfig.brand.fg,
          opacity: 0.4,
          fontSize: '0.75rem',
          cursor: 'pointer',
          padding: '0.5rem 0.75rem',
        }}
      >
        skip next time
      </button>
      <style>{`
        @keyframes splashFade {
          0%   { opacity: 1; }
          70%  { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }
        @keyframes splashZoom {
          0%   { transform: scale(0.85); opacity: 0; }
          20%  { transform: scale(1);    opacity: 1; }
          80%  { transform: scale(1);    opacity: 1; }
          100% { transform: scale(1.15); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
