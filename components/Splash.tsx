'use client';

import { useEffect, useState } from 'react';
import { appConfig } from '@/app.config';
import BrandMark from '@/components/BrandMark';

const slashBrand = process.env.NEXT_PUBLIC_SLASH_BRAND === '1';

/**
 * Intro splash.
 *
 * On the Slash brand deploy (NEXT_PUBLIC_SLASH_BRAND=1) we show the Evaluator
 * hero image — same pattern slashtokens.com uses. On forks, we show a
 * neutral wordmark splash so the brand doesn't leak.
 *
 * Duration: 2.2s either way. Click to dismiss early.
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

  // Slash brand — full-image splash, matches slashtokens.com exactly
  if (slashBrand) {
    return (
      <div
        onClick={() => setVisible(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0a0a0a',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          animation: `evalFade ${duration}ms ease forwards`,
        }}
        aria-hidden="true"
      >
        <img
          src="/evaluator-splash.jpg"
          alt="The Evaluator"
          style={{
            maxWidth: '80%',
            maxHeight: '70vh',
            borderRadius: '12px',
            animation: `evalZoom ${duration}ms ease forwards`,
          }}
        />
        <style>{`
          @keyframes evalZoom {
            0%   { transform: scale(0.3);  opacity: 0; }
            30%  { transform: scale(1.05); opacity: 1; }
            50%  { transform: scale(1);    opacity: 1; }
            100% { transform: scale(1);    opacity: 0; }
          }
          @keyframes evalFade {
            0%   { opacity: 1; }
            70%  { opacity: 1; }
            100% { opacity: 0; pointer-events: none; }
          }
        `}</style>
      </div>
    );
  }

  // Default — neutral wordmark splash for forks
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
