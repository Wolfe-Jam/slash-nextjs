'use client';

import { useEffect, useState } from 'react';
import { appConfig } from '@/app.config';
import BrandMark from '@/components/BrandMark';

/**
 * Intro splash. Matches the slashtokens.com site pattern — dark full-screen
 * overlay, fade + zoom the brand mark, auto-remove after `splash.duration` ms.
 * Always shows on page load. No opt-out.
 */

export default function Splash() {
  const [visible, setVisible] = useState<boolean>(appConfig.splash.enabled);
  const duration = appConfig.splash.duration;

  useEffect(() => {
    if (!appConfig.splash.enabled) return;
    const t = setTimeout(() => setVisible(false), duration + 100);
    return () => clearTimeout(t);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      onClick={() => setVisible(false)}
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
        {appConfig.brand.name.startsWith('/') ? (
          <>
            {appConfig.brand.name[0]}
            <span style={{ color: appConfig.brand.primary }}>{appConfig.brand.name.slice(1)}</span>
          </>
        ) : (
          appConfig.brand.name
        )}
      </div>
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
